import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle, ArrowRight, BadgeCheck, BookOpen, CheckCircle2, ChevronLeft, CircleHelp,
  FileAudio, FileImage, HeartHandshake, History, Home, Languages, Link2, LockKeyhole,
  LogOut, Mail, Menu, MessageCircle, Mic, Phone, Search, ShieldCheck,
  Siren, Sparkles, Trash2, Upload, UserRound, UsersRound, Volume2, X, Zap,
} from 'lucide-react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { getCopy, getSafetyCopy, isRtl, languages, type LanguageCode, type SafetyCopy } from '@/lib/translations';

type Screen = 'welcome' | 'auth' | 'profile' | 'app';
type AppView = 'home' | 'history' | 'learn';
type AuthMode = 'login' | 'signup';
type AnalyzeSource = 'message' | 'screenshot' | 'audio' | 'voice';
type Analysis = { score: number; label: string; summary: string; indicators: string[]; evidence: string[]; actions: string[]; uncertain: boolean; source: AnalyzeSource; text: string; language: LanguageCode };
type Profile = { full_name: string; language_code: LanguageCode; trusted_name: string | null; trusted_phone: string | null; trusted_relationship: string | null };
type HistoryItem = { id: string; content_type: string; source_text: string; risk_score: number; risk_label: string; summary: string; created_at: string; indicators: string[] };

const indicatorRules = [
  { key: 'otp', words: ['otp', 'one time password', 'verification code', 'पासवर्ड', 'ओटीपी'], message: 'It asks for an OTP or verification code.' , points: 34 },
  { key: 'pin', words: ['upi pin', 'pin', 'password', 'पासवर्ड', 'पिन'], message: 'It asks for a private PIN or password.', points: 28 },
  { key: 'urgent', words: ['urgent', 'immediately', 'today', 'now', 'तुरंत', 'आज', 'जल्दी'], message: 'It creates pressure to act quickly.', points: 18 },
  { key: 'threat', words: ['blocked', 'arrest', 'police', 'legal action', 'suspend', 'बंद', 'गिरफ्तार', 'पुलिस'], message: 'It uses a threat about an account, police, or legal action.', points: 20 },
  { key: 'money', words: ['pay', 'payment', 'transfer', 'fee', 'refund', 'upi', 'money', '₹', 'रुपये', 'भुगतान'], message: 'It asks for money or an unusual payment.', points: 22 },
  { key: 'link', words: ['http://', 'https://', 'www.', '.com/', 'click here', 'लिंक'], message: 'It includes a link or asks you to click one.', points: 18 },
  { key: 'remote', words: ['screen share', 'remote access', 'anydesk', 'install this app', 'स्क्रीन शेयर'], message: 'It asks for remote access or an unknown app.', points: 28 },
  { key: 'prize', words: ['lottery', 'winner', 'prize', 'reward', 'इनाम', 'लॉटरी'], message: 'It promises a prize or reward you did not expect.', points: 21 },
  { key: 'job', words: ['job offer', 'registration fee', 'work from home', 'नौकरी', 'रजिस्ट्रेशन फीस'], message: 'It offers a job while asking for a fee or personal action.', points: 20 },
];

function analyzeText(text: string, language: LanguageCode, source: AnalyzeSource = 'message'): Analysis {
  const safety = getSafetyCopy(language);
  const lower = text.toLowerCase();
  const matched = indicatorRules.filter((rule) => rule.words.some((word) => lower.includes(word.toLowerCase())));
  const score = Math.min(100, matched.reduce((total, rule) => total + rule.points, 0) + (text.length > 180 ? 4 : 0));
  const uncertain = text.trim().length < 16 || matched.length === 0;
  const adjustedScore = uncertain ? Math.min(score, 38) : score;
  const label = adjustedScore >= 85 ? (language === 'te' ? 'చాలా ఎక్కువ ప్రమాదం' : language === 'hi' ? 'बहुत अधिक जोखिम' : 'Very high risk') : adjustedScore >= 60 ? (language === 'te' ? 'ఎక్కువ ప్రమాదం' : language === 'hi' ? 'अधिक जोखिम' : 'High risk') : adjustedScore >= 30 ? (language === 'te' ? 'జాగ్రత్త' : language === 'hi' ? 'सावधानी' : 'Caution') : (language === 'te' ? 'తక్కువ ప్రమాదం' : language === 'hi' ? 'कम जोखिम' : 'Low risk');
  const summary = uncertain ? safety.uncertain : adjustedScore >= 85 ? (language === 'te' ? 'ఈ సందేశంలో అనేక బలమైన హెచ్చరికలు ఉన్నాయి. జవాబు ఇవ్వకండి, లింక్ తెరవకండి, డబ్బు పంపకండి.' : language === 'hi' ? 'इस संदेश में कई मजबूत चेतावनी संकेत हैं। जवाब न दें, लिंक न खोलें और पैसे न भेजें।' : 'This message shows several strong warning signs. Do not reply, click, or send money.') : adjustedScore >= 60 ? (language === 'te' ? 'ఈ సందేశంలో హెచ్చరిక సంకేతాలు ఉన్నాయి. ఆగి, అధికారిక మార్గంలో తనిఖీ చేయండి.' : language === 'hi' ? 'इस संदेश में चेतावनी संकेत हैं। रुकें और आधिकारिक माध्यम से जांच करें।' : 'This message has warning signs. Pause and verify it using an official channel.') : (language === 'te' ? 'కొన్ని విషయాలు తనిఖీ చేయాలి. పంపిన వ్యక్తిని నిర్ధారించే వరకు వ్యక్తిగత సమాచారం చెప్పకండి.' : language === 'hi' ? 'कुछ बातें जांचने लायक हैं। भेजने वाले की पुष्टि होने तक निजी जानकारी साझा न करें।' : 'There are some signs worth checking. Do not share private information until you verify the sender.');
  const localizedIndicators = matched.map((rule) => localizeIndicator(rule.key, safety));
  const evidence = matched.map((rule) => findEvidence(text, rule.words));
  const actions = adjustedScore >= 60 ? safety.actions : [safety.actions[0], safety.actions[1], safety.actions[2], safety.actions[3]];
  return { score: adjustedScore, label, summary, indicators: localizedIndicators, evidence, actions, uncertain, source, text, language };
}

function localizeIndicator(key: string, safety: SafetyCopy): string {
  const messages: Record<string, string> = {
    otp: safety.neverShareTitle,
    pin: safety.neverShareTitle,
    urgent: safety.simpleSummary,
    threat: safety.whatCouldHappenTitle,
    money: safety.moneyLostBody,
    link: safety.originalEvidence,
    remote: safety.neverShare,
    prize: safety.uncertain,
    job: safety.uncertain,
  };
  return messages[key] ?? safety.uncertain;
}

function findEvidence(text: string, words: string[]): string {
  const lower = text.toLowerCase();
  const found = words.find((word) => lower.includes(word.toLowerCase()));
  if (!found) return text.slice(0, 80);
  const start = Math.max(0, lower.indexOf(found.toLowerCase()) - 24);
  return text.slice(start, Math.min(text.length, start + found.length + 48)).trim();
}

function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [appView, setAppView] = useState<AppView>('home');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [languageSearch, setLanguageSearch] = useState('');
  const [showLanguages, setShowLanguages] = useState(false);
  const [sessionUser, setSessionUser] = useState<{ id: string; email?: string } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');
  const [showSplash, setShowSplash] = useState(true);
  const copy = useMemo(() => getCopy(language), [language]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowSplash(false), 5000);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    let active = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      if (data.session?.user) {
        setSessionUser({ id: data.session.user.id, email: data.session.user.email });
        await loadPrivateData(data.session.user.id);
        setScreen('app');
      }
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_, nextSession) => {
      (async () => {
        if (!active) return;
        if (nextSession?.user) {
          setSessionUser({ id: nextSession.user.id, email: nextSession.user.email });
          await loadPrivateData(nextSession.user.id);
        } else {
          setSessionUser(null);
          setProfile(null);
          setHistory([]);
        }
      })();
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  async function loadPrivateData(userId: string) {
    const [{ data: savedProfile }, { data: savedHistory }] = await Promise.all([
      supabase.from('suraksha_profiles').select('full_name, language_code, trusted_name, trusted_phone, trusted_relationship').eq('user_id', userId).maybeSingle(),
      supabase.from('suraksha_scan_history').select('id, content_type, source_text, risk_score, risk_label, summary, created_at, indicators').eq('user_id', userId).order('created_at', { ascending: false }).limit(30),
    ]);
    if (savedProfile) { setProfile(savedProfile); setLanguage(savedProfile.language_code); }
    if (savedHistory) setHistory(savedHistory as HistoryItem[]);
    setScreen(savedProfile ? 'app' : 'profile');
  }

  async function signOut() { await supabase.auth.signOut(); setScreen('welcome'); setAppView('home'); }

  if (showSplash) return <SplashScreen copy={copy} />;
  if (!isSupabaseConfigured) return <DeploymentSetupNotice />;
  if (loading) return <div className="loading-screen"><ShieldCheck size={52} /><p>Opening your safety bridge…</p></div>;
  return <div dir={isRtl(language) ? 'rtl' : 'ltr'} className="app-shell">
    {screen === 'welcome' && <Welcome language={language} setLanguage={setLanguage} setScreen={setScreen} setAuthMode={setAuthMode} copy={copy} showLanguages={showLanguages} setShowLanguages={setShowLanguages} languageSearch={languageSearch} setLanguageSearch={setLanguageSearch} />}
    {screen === 'auth' && <Auth copy={copy} mode={authMode} setMode={setAuthMode} onBack={() => setScreen('welcome')} onSuccess={async (userId) => { setSessionUser({ id: userId }); await loadPrivateData(userId); }} />}
    {screen === 'profile' && <ProfileSetup language={language} setLanguage={setLanguage} copy={copy} existing={profile} userId={sessionUser?.id ?? ''} onDone={async () => { if (sessionUser) await loadPrivateData(sessionUser.id); }} onSignOut={signOut} />}
    {screen === 'app' && <MainApp copy={copy} language={language} profile={profile} history={history} setHistory={setHistory} appView={appView} setAppView={setAppView} notice={notice} setNotice={setNotice} onSignOut={signOut} onLanguageChange={(next) => { setLanguage(next); setProfile((current) => current ? { ...current, language_code: next } : current); }} />}
  </div>;
}

function DeploymentSetupNotice() {
  return <main className="splash-screen" aria-label="Suraksha Sethu deployment setup"><img src="/WhatsApp_Image_2026-10-15_at_2.52.18_PM.jpeg" alt="Suraksha Sethu shield and bridge logo" /><div className="deployment-notice"><h1>Suraksha <em>Sethu</em></h1><p>This deployment is missing its secure connection settings.</p><span>Please add the two public Supabase Vite settings in Vercel, then redeploy.</span></div></main>;
}

function SplashScreen({ copy }: { copy: ReturnType<typeof getCopy> }) {
  return <main className="splash-screen" aria-label="Suraksha Sethu welcome screen"><img src="/WhatsApp_Image_2026-10-15_at_2.52.18_PM.jpeg" alt="Suraksha Sethu shield and bridge logo" /><div><h1>Suraksha <em>Sethu</em></h1><p>{copy.welcome}</p></div></main>;
}

function Welcome({ language, setLanguage, setScreen, setAuthMode, copy, showLanguages, setShowLanguages, languageSearch, setLanguageSearch }: { language: string; setLanguage: (value: string) => void; setScreen: (value: Screen) => void; setAuthMode: (value: AuthMode) => void; copy: ReturnType<typeof getCopy>; showLanguages: boolean; setShowLanguages: (value: boolean) => void; languageSearch: string; setLanguageSearch: (value: string) => void }) {
  const visibleLanguages = languages.filter((item) => `${item.native} ${item.english}`.toLowerCase().includes(languageSearch.toLowerCase()));
  return <main className="welcome-page">
    <div className="welcome-visual"><div className="grid-glow" /><img className="welcome-logo" src="/WhatsApp_Image_2026-10-15_at_2.52.18_PM.jpeg" alt="Suraksha Sethu shield and bridge logo" /><div className="shield-orbit"><ShieldCheck size={88} strokeWidth={1.4} /></div><div className="bridge-line"><span /><span /><span /></div><div className="trust-figures"><UsersRound size={28} /><HeartHandshake size={34} /><LockKeyhole size={28} /></div></div>
    <section className="welcome-content"><div className="brand"><div className="brand-mark"><ShieldCheck size={25} /></div><div><strong>Suraksha <em>Sethu</em></strong><small>Bridging generations · Securing tomorrow</small></div></div><div className="welcome-copy"><p className="eyebrow">A safer digital India</p><h1>{copy.welcome}</h1><p>{copy.welcomeBody}</p></div>
      <div className="language-picker"><button className="language-current" onClick={() => setShowLanguages(!showLanguages)}><Languages size={19} /><span>{languages.find((item) => item.code === language)?.native}</span><ChevronLeft className={showLanguages ? 'rotate-90' : 'rotate-270'} size={18} /></button>{showLanguages && <div className="language-panel"><div className="search-field"><Search size={17} /><input value={languageSearch} onChange={(event) => setLanguageSearch(event.target.value)} placeholder={copy.searchLanguage} /></div><div className="language-list">{visibleLanguages.map((item) => <button key={item.code} className={item.code === language ? 'language-option selected' : 'language-option'} onClick={() => { setLanguage(item.code); setShowLanguages(false); }}><span>{item.native}</span><small>{item.english}</small></button>)}</div></div>}</div>
      <div className="welcome-actions"><button className="primary-button large" onClick={() => { setAuthMode('login'); setScreen('auth'); }}><UserRound size={21} />{copy.member}<ArrowRight size={20} /></button><button className="secondary-button large" onClick={() => { setAuthMode('signup'); setScreen('auth'); }}><Sparkles size={21} />{copy.newUser}<ArrowRight size={20} /></button></div><div className="welcome-footer"><LockKeyhole size={16} /> Your messages are treated with care. We never ask for OTPs, PINs or passwords.</div>
    </section>
  </main>;
}

function Auth({ copy, mode, setMode, onBack, onSuccess }: { copy: ReturnType<typeof getCopy>; mode: AuthMode; setMode: (value: AuthMode) => void; onBack: () => void; onSuccess: (id: string) => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' }); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) { event.preventDefault(); setError(''); if (!form.email || !form.password || (mode === 'signup' && (!form.name || form.password !== form.confirm))) { setError(mode === 'signup' && form.password !== form.confirm ? 'Passwords do not match.' : 'Please complete the required fields.'); return; } setBusy(true); const result = mode === 'signup' ? await supabase.auth.signUp({ email: form.email.trim(), password: form.password, options: { data: { full_name: form.name.trim(), phone: form.phone.trim() } } }) : await supabase.auth.signInWithPassword({ email: form.email.trim(), password: form.password }); setBusy(false); if (result.error || !result.data.user) { setError('We could not complete that request. Check your details and try again.'); return; } onSuccess(result.data.user.id); }
  return <main className="center-page"><div className="auth-card"><button className="back-button" onClick={onBack}><ChevronLeft size={18} /> Back</button><div className="brand compact"><div className="brand-mark"><ShieldCheck size={23} /></div><strong>Suraksha <em>Sethu</em></strong></div><div className="auth-heading"><span className="step-label">{mode === 'login' ? 'Welcome back' : 'A few details to get started'}</span><h1>{mode === 'login' ? copy.signIn : copy.createAccount}</h1><p>{mode === 'login' ? 'Use your email and password. We never ask for an OTP here.' : 'Your account keeps your safety history private to you.'}</p></div><form onSubmit={submit} className="form-stack">{mode === 'signup' && <><label>{copy.fullName}<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" /></label><label>{copy.phone}<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} inputMode="tel" autoComplete="tel" /></label></>}<label>{copy.email}<div className="input-icon"><Mail size={18} /><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" autoComplete="email" /></div></label><label>{copy.password}<div className="input-icon"><LockKeyhole size={18} /><input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></div></label>{mode === 'signup' && <label>{copy.confirmPassword}<input value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} type="password" autoComplete="new-password" /></label>}{error && <div className="inline-error"><AlertCircle size={18} />{error}</div>}<button className="primary-button" disabled={busy}>{busy ? 'Please wait…' : mode === 'login' ? copy.signIn : copy.createAccount}<ArrowRight size={18} /></button></form><button className="text-button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>{mode === 'login' ? 'New here? Create an account' : 'Already have an account? Sign in'}</button><p className="privacy-note"><LockKeyhole size={15} /> Your password is handled by secure account protection. It is never stored in plain text.</p></div></main>;
}

function ProfileSetup({ language, setLanguage, copy, existing, userId, onDone, onSignOut }: { language: string; setLanguage: (value: string) => void; copy: ReturnType<typeof getCopy>; existing: Profile | null; userId: string; onDone: () => void; onSignOut: () => void }) {
  const [form, setForm] = useState<Profile>({ full_name: existing?.full_name ?? '', language_code: existing?.language_code ?? language, trusted_name: existing?.trusted_name ?? '', trusted_phone: existing?.trusted_phone ?? '', trusted_relationship: existing?.trusted_relationship ?? '' }); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  async function save(event: FormEvent) { event.preventDefault(); if (!form.full_name.trim()) { setError('Please enter your name.'); return; } setBusy(true); const { error: saveError } = await supabase.from('suraksha_profiles').upsert({ ...form, user_id: userId }, { onConflict: 'user_id' }); setBusy(false); if (saveError) { setError('We could not save these details. Please try again.'); return; } setLanguage(form.language_code); onDone(); }
  return <main className="center-page"><div className="setup-card"><div className="setup-progress"><span className="active" /><span /><span /></div><div className="brand compact"><div className="brand-mark"><ShieldCheck size={23} /></div><strong>Suraksha <em>Sethu</em></strong></div><span className="step-label">A kinder, safer start</span><h1>Tell us a little about you</h1><p className="muted">This helps us greet you correctly and gives you a trusted person to call when you need support. You can change this anytime.</p><form onSubmit={save} className="form-stack"><label>{copy.fullName}<input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></label><label>{copy.chooseLanguage}<select value={form.language_code} onChange={(e) => setForm({ ...form, language_code: e.target.value })}>{languages.map((item) => <option key={item.code} value={item.code}>{item.native} · {item.english}</option>)}</select></label><div className="form-divider"><span>Optional</span></div><label>{copy.trustedContact} name<input value={form.trusted_name ?? ''} onChange={(e) => setForm({ ...form, trusted_name: e.target.value })} placeholder="Someone you trust" /></label><div className="form-row"><label>{copy.phone}<input value={form.trusted_phone ?? ''} onChange={(e) => setForm({ ...form, trusted_phone: e.target.value })} inputMode="tel" /></label><label>{copy.relationship}<input value={form.trusted_relationship ?? ''} onChange={(e) => setForm({ ...form, trusted_relationship: e.target.value })} placeholder="Son, daughter, friend…" /></label></div>{error && <div className="inline-error"><AlertCircle size={18} />{error}</div>}<button className="primary-button" disabled={busy}>{busy ? 'Saving…' : 'Save and open my safety assistant'}<ArrowRight size={18} /></button></form><button className="text-button" onClick={onSignOut}>Sign out</button></div></main>;
}

function MainApp({ copy, language, profile, history, setHistory, appView, setAppView, notice, setNotice, onSignOut, onLanguageChange }: { copy: ReturnType<typeof getCopy>; language: string; profile: Profile | null; history: HistoryItem[]; setHistory: (items: HistoryItem[]) => void; appView: AppView; setAppView: (value: AppView) => void; notice: string; setNotice: (value: string) => void; onSignOut: () => void; onLanguageChange: (value: string) => void }) {
  const [mobileMenu, setMobileMenu] = useState(false); const [analysis, setAnalysis] = useState<Analysis | null>(null); const [input, setInput] = useState(''); const [source, setSource] = useState<AnalyzeSource>('message'); const [uploadName, setUploadName] = useState(''); const [preview, setPreview] = useState(''); const [moneyLost, setMoneyLost] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  function startMode(next: AnalyzeSource) { setSource(next); setAnalysis(null); setNotice(''); if (next === 'message') inputRef.current?.focus(); }
  async function saveAnalysis(result: Analysis) { const { data } = await supabase.from('suraksha_scan_history').insert({ content_type: result.source, source_text: result.text.slice(0, 4000), risk_score: result.score, risk_label: result.label, summary: result.summary, indicators: result.indicators }).select('id, content_type, source_text, risk_score, risk_label, summary, created_at, indicators').maybeSingle(); if (data) setHistory([data as HistoryItem, ...history]); }
  function runAnalysis() { if (!input.trim()) { setNotice('Please paste or type a message first.'); return; } const result = analyzeText(input, language, source); setAnalysis(result); void saveAnalysis(result); }
  function handleFile(file: File) { const allowed = source === 'screenshot' ? ['image/png', 'image/jpeg'] : ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4']; if (!allowed.includes(file.type) || file.size > 8 * 1024 * 1024) { setNotice(source === 'screenshot' ? 'Please choose a PNG or JPG image under 8 MB.' : 'Please choose an MP3, WAV, OGG or M4A file under 8 MB.'); return; } setUploadName(file.name); if (source === 'screenshot') { setPreview(URL.createObjectURL(file)); setNotice('The image is ready. OCR is not connected yet, so please type the message below for a safe analysis.'); } else { setNotice('Audio is selected. Transcription is not connected yet. Please describe the call below for a safe analysis.'); } }
  function setView(view: AppView) { setAppView(view); setMobileMenu(false); setAnalysis(null); }
  const firstName = profile?.full_name?.split(' ')[0] || 'friend';
  return <div className="dashboard-layout"><header className="topbar"><button className="mobile-menu" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Open menu"><Menu size={22} /></button><div className="brand top-brand"><div className="brand-mark"><ShieldCheck size={21} /></div><strong>Suraksha <em>Sethu</em></strong></div><div className="top-actions"><button className="language-mini" onClick={() => { const index = languages.findIndex((item) => item.code === language); onLanguageChange(languages[(index + 1) % languages.length].code); }}><Languages size={17} />{languages.find((item) => item.code === language)?.native}</button><button className="icon-button" onClick={onSignOut} aria-label={copy.signOut}><LogOut size={19} /></button></div></header><aside className={mobileMenu ? 'sidebar open' : 'sidebar'}><div className="sidebar-label">Your safety space</div><button className={appView === 'home' ? 'nav-button active' : 'nav-button'} onClick={() => setView('home')}><Home size={19} />{copy.dashboard}</button><button className={appView === 'history' ? 'nav-button active' : 'nav-button'} onClick={() => setView('history')}><History size={19} />{copy.history}<span className="nav-count">{history.length}</span></button><button className={appView === 'learn' ? 'nav-button active' : 'nav-button'} onClick={() => setView('learn')}><BookOpen size={19} />{copy.learn}</button><div className="sidebar-emergency"><Siren size={22} /><strong>{copy.emergency}</strong><span>Free help, anytime</span><a href="tel:1930"><Phone size={16} /> Call 1930</a></div><div className="sidebar-bottom"><div className="user-chip"><div className="avatar">{firstName.charAt(0).toUpperCase()}</div><span>{profile?.full_name || 'Member'}<small>Protected account</small></span></div></div></aside><main className="main-content">{appView === 'home' && <HomeView copy={copy} language={language} profile={profile} firstName={firstName} input={input} setInput={setInput} source={source} startMode={startMode} runAnalysis={runAnalysis} analysis={analysis} notice={notice} moneyLost={moneyLost} setMoneyLost={setMoneyLost} uploadName={uploadName} preview={preview} inputRef={inputRef} handleFile={handleFile} />} {appView === 'history' && <HistoryView history={history} setHistory={setHistory} />} {appView === 'learn' && <LearnView />}</main></div>;
}

function HomeView({ copy, language, profile, firstName, input, setInput, source, startMode, runAnalysis, analysis, notice, moneyLost, setMoneyLost, uploadName, preview, inputRef, handleFile }: { copy: ReturnType<typeof getCopy>; language: LanguageCode; profile: Profile | null; firstName: string; input: string; setInput: (value: string) => void; source: AnalyzeSource; startMode: (value: AnalyzeSource) => void; runAnalysis: () => void; analysis: Analysis | null; notice: string; moneyLost: boolean; setMoneyLost: (value: boolean) => void; uploadName: string; preview: string; inputRef: React.RefObject<HTMLTextAreaElement>; handleFile: (file: File) => void }) {
  return <div className="home-view"><div className="hero-row"><div><span className="eyebrow">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</span><h1>{copy.greeting}<br /><span>{firstName}.</span></h1><p>{copy.greetingBody}</p></div><div className="hero-badge"><div className="pulse-dot" /><span>Here to help</span><ShieldCheck size={42} /></div></div><div className="quick-actions"><ActionCard icon={<MessageCircle />} title={copy.pasteMessage} detail="SMS, WhatsApp, email or any text" active={source === 'message'} onClick={() => startMode('message')} /><ActionCard icon={<FileImage />} title={copy.screenshot} detail="PNG or JPG · OCR review" onClick={() => startMode('screenshot')} /><ActionCard icon={<FileAudio />} title={copy.audio} detail="MP3, WAV or voice note" onClick={() => startMode('audio')} /><ActionCard icon={<Mic />} title={copy.talk} detail="Turn-by-turn voice chat" onClick={() => startMode('voice')} /></div><div className="workspace-card"><div className="workspace-heading"><div><span className="step-label">{source === 'message' ? 'Message checker' : source === 'screenshot' ? 'Screenshot checker' : source === 'audio' ? 'Audio checker' : 'Voice conversation'}</span><h2>{source === 'voice' ? 'Tell me what happened' : source === 'screenshot' ? 'Review a suspicious screenshot' : source === 'audio' ? 'Describe the call after choosing audio' : 'What did you receive?'}</h2></div><button className="small-help"><CircleHelp size={17} /> How it works</button></div>{(source === 'screenshot' || source === 'audio') && <div className="upload-box">{preview ? <img src={preview} alt="Selected screenshot preview" /> : source === 'audio' ? <FileAudio size={34} /> : <Upload size={34} />}<div><strong>{uploadName || (source === 'audio' ? 'Choose a voice recording' : 'Choose a screenshot')}</strong><span>{source === 'audio' ? 'Transcription is not connected yet' : 'OCR review is not connected yet'}</span></div><label className="outline-button">Choose file<input type="file" accept={source === 'audio' ? 'audio/*' : 'image/png,image/jpeg'} onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFile(file); }} /></label></div>}{source === 'voice' && <div className="voice-prompt"><div className="voice-circle"><Mic size={34} /></div><div><strong>Voice chat is ready for turn-by-turn help</strong><p>Your browser may ask for microphone permission. If voice is unavailable, you can type below instead.</p></div><button className="outline-button" onClick={() => { const SpeechRecognition = (window as Window & { webkitSpeechRecognition?: new () => { start: () => void; onresult: ((event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void) | null } }).webkitSpeechRecognition; if (!SpeechRecognition) return; const recognition = new SpeechRecognition(); recognition.onresult = (event) => setInput(event.results[0][0].transcript); recognition.start(); }}>Start listening</button></div>}<textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder={source === 'voice' ? 'Or type what the caller said…' : copy.yourMessage} rows={6} /><div className="workspace-footer"><label className="loss-check"><input type="checkbox" checked={moneyLost} onChange={(e) => setMoneyLost(e.target.checked)} /> I may have lost money or shared information</label><button className="primary-button" onClick={runAnalysis}><Zap size={18} />{copy.analyze}<ArrowRight size={18} /></button></div>{notice && <div className="info-banner"><AlertCircle size={18} />{notice}</div>}</div>{analysis && <AnalysisCard analysis={analysis} trusted={profile} moneyLost={moneyLost} language={language} />}</div>;
}

function ActionCard({ icon, title, detail, active, onClick }: { icon: React.ReactNode; title: string; detail: string; active?: boolean; onClick: () => void }) { return <button className={active ? 'action-card active' : 'action-card'} onClick={onClick}><span className="action-icon">{icon}</span><span><strong>{title}</strong><small>{detail}</small></span><ArrowRight size={17} /></button>; }

function AnalysisCard({ analysis, trusted, moneyLost, language }: { analysis: Analysis; trusted: Profile | null; moneyLost: boolean; language: LanguageCode }) {
  const safety = getSafetyCopy(language);
  const [speechState, setSpeechState] = useState<'idle' | 'speaking' | 'paused'>('idle');
  const [speechMessage, setSpeechMessage] = useState('');
  const [simplified, setSimplified] = useState(false);
  const [followUpOpen, setFollowUpOpen] = useState(false);
  const highRisk = analysis.score >= 50 || moneyLost;
  const tone = analysis.score >= 85 ? 'danger' : analysis.score >= 60 ? 'orange' : analysis.score >= 30 ? 'warning' : 'safe';
  const speechLanguage = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : language === 'bn' ? 'bn-IN' : language === 'mr' ? 'mr-IN' : language === 'gu' ? 'gu-IN' : 'en-IN';
  const spokenText = [analysis.label, simplified ? safety.simpleSummary : analysis.summary, safety.whyTitle, ...analysis.indicators, safety.whatCouldHappenTitle, safety.impact, safety.whatShouldDoTitle, ...analysis.actions, safety.neverShareTitle, safety.neverShare].join('. ');
  function readAloud() {
    if (!('speechSynthesis' in window)) { setSpeechMessage(safety.speechUnavailable); return; }
    if (speechState === 'speaking') { window.speechSynthesis.pause(); setSpeechState('paused'); return; }
    if (speechState === 'paused') { window.speechSynthesis.resume(); setSpeechState('speaking'); return; }
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = speechLanguage;
    utterance.onend = () => setSpeechState('idle');
    utterance.onerror = () => { setSpeechState('idle'); setSpeechMessage(safety.speechUnavailable); };
    setSpeechMessage(''); setSpeechState('speaking'); window.speechSynthesis.cancel(); window.speechSynthesis.speak(utterance);
  }
  function stopSpeech() { window.speechSynthesis.cancel(); setSpeechState('idle'); }
  const speechLabel = speechState === 'speaking' ? safety.pause : speechState === 'paused' ? safety.resume : safety.listen;
  return <section className={`analysis-card ${tone}`}>
    <div className="analysis-top"><div><span className="step-label">{safety.riskTitle} · {safety.estimatedNote}</span><h2>{analysis.uncertain ? safety.uncertain : analysis.label}</h2></div><div className="score-ring" style={{ '--score': `${analysis.score * 3.6}deg` } as React.CSSProperties}><strong>{analysis.score}</strong><span>/100</span></div></div>
    <div className="score-bar"><span style={{ width: `${analysis.score}%` }} /></div><p className="analysis-summary">{simplified ? safety.simpleSummary : analysis.summary}</p>
    <div className="analysis-columns"><div><h3><AlertCircle size={18} /> {safety.whyTitle}</h3>{analysis.indicators.length ? <ul>{analysis.indicators.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul> : <p className="muted">{safety.noEvidence}</p>}<h3 className="evidence-heading"><Link2 size={18} /> {safety.originalEvidence}</h3>{analysis.evidence.length ? <div className="evidence-list">{analysis.evidence.map((item, index) => <span key={`${item}-${index}`}>“{item}”</span>)}</div> : <p className="muted">{safety.noEvidence}</p>}</div><div><h3><CircleHelp size={18} /> {safety.whatCouldHappenTitle}</h3><p className="detail-copy">{safety.impact}</p><h3><CheckCircle2 size={18} /> {safety.whatShouldDoTitle}</h3><ol>{analysis.actions.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ol><h3><LockKeyhole size={18} /> {safety.neverShareTitle}</h3><p className="detail-copy">{safety.neverShare}</p></div></div>
    <div className="analysis-actions"><button className="outline-button" onClick={readAloud}><Volume2 size={17} />{speechLabel}</button>{speechState !== 'idle' && <button className="outline-button" onClick={stopSpeech}><X size={16} />{safety.stop}</button>}<button className="outline-button" onClick={() => setSimplified(!simplified)}><Sparkles size={16} />{safety.simplify}</button><button className="outline-button" onClick={() => setFollowUpOpen(!followUpOpen)}><MessageCircle size={16} />{safety.followUp}</button>{highRisk && <EmergencyPanel trusted={trusted} moneyLost={moneyLost} language={language} />}</div>
    {speechMessage && <div className="info-banner"><Volume2 size={17} />{speechMessage}</div>}
    {followUpOpen && <div className="follow-up-box"><strong>{safety.followUp}</strong><p>{safety.uncertain}</p><button className="text-button" onClick={() => setFollowUpOpen(false)}>{safety.cancel}</button></div>}
  </section>;
}

function EmergencyPanel({ trusted, moneyLost, language }: { trusted: Profile | null; moneyLost: boolean; language: LanguageCode }) { const [confirm, setConfirm] = useState(false); const safety = getSafetyCopy(language); return <div className="emergency-panel"><div className="emergency-title"><Siren size={21} /><div><strong>{moneyLost ? safety.moneyLost : safety.whatShouldDoTitle}</strong><span>{safety.moneyLostBody}</span></div></div><div className="emergency-buttons"><a href="tel:1930" className="emergency-call"><Phone size={18} /> {safety.call1930}</a>{trusted?.trusted_phone ? <button className="trusted-call" onClick={() => setConfirm(true)}><HeartHandshake size={18} /> {safety.callTrusted}<span className="contact-number">{trusted.trusted_name || ' · '} · {trusted.trusted_phone}</span></button> : <p className="no-contact-message"><UsersRound size={16} /> {safety.addTrusted}</p>}<a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer" className="portal-link">{safety.openPortal} <ArrowRight size={16} /></a></div>{confirm && trusted?.trusted_phone && <div className="confirm-call"><p>{safety.confirmCall}</p><a href={`tel:${trusted.trusted_phone}`} className="primary-button">{safety.yesCall}</a><button className="text-button" onClick={() => setConfirm(false)}>{safety.cancel}</button></div>}</div>; }

function HistoryView({ history, setHistory }: { history: HistoryItem[]; setHistory: (items: HistoryItem[]) => void }) { const [selected, setSelected] = useState<HistoryItem | null>(null); async function remove(id: string) { await supabase.from('suraksha_scan_history').delete().eq('id', id); setHistory(history.filter((item) => item.id !== id)); } async function clear() { await supabase.from('suraksha_scan_history').delete().neq('id', '00000000-0000-0000-0000-000000000000'); setHistory([]); } return <div className="section-view"><div className="section-heading"><div><span className="eyebrow">Private to your account</span><h1>My safety history</h1><p>Past checks help you remember what happened. You can remove them anytime.</p></div>{history.length > 0 && <button className="outline-button danger-text" onClick={() => void clear()}><Trash2 size={16} /> Clear all</button>}</div>{history.length === 0 ? <div className="empty-state"><History size={42} /><h2>No saved checks yet</h2><p>When you check a message, its result will appear here. Images and audio files are never saved.</p></div> : <div className="history-list">{history.map((item) => <div className="history-row" key={item.id} onClick={() => setSelected(item)}><div className={`history-score ${item.risk_score >= 85 ? 'danger' : item.risk_score >= 60 ? 'orange' : item.risk_score >= 30 ? 'warning' : 'safe'}`}>{item.risk_score}</div><div className="history-info"><strong>{item.risk_label}</strong><span>{item.content_type} · {new Date(item.created_at).toLocaleString('en-IN')}</span><p>{item.summary}</p></div><button className="icon-button" onClick={(e) => { e.stopPropagation(); void remove(item.id); }} aria-label="Delete history item"><Trash2 size={17} /></button></div>)}</div>}{selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="detail-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)}><X size={18} /></button><span className="step-label">Saved check</span><h2>{selected.risk_label} · {selected.risk_score}/100</h2><p className="quoted-text">“{selected.source_text}”</p><h3>Why it was flagged</h3><ul>{selected.indicators.length ? selected.indicators.map((item) => <li key={item}>{item}</li>) : <li>No specific warning signs were found.</li>}</ul><p>{selected.summary}</p></div></div>}</div>; }

function LearnView() { const cards = [{ icon: <LockKeyhole />, title: 'Keep OTPs and UPI PINs private', body: 'No bank, police officer, family member, or support person should ask you to share them.' }, { icon: <Link2 />, title: 'Pause before opening links', body: 'Open the official app yourself instead of using a link in an unexpected message.' }, { icon: <Phone />, title: 'Verify callers independently', body: 'End the call and use the phone number printed on your card or official website.' }, { icon: <Siren />, title: 'If money was transferred', body: 'Call 1930 promptly, contact your bank, and save the message or transaction details.' }, { icon: <UsersRound />, title: 'Help an older family member', body: 'Agree on a simple trusted-contact plan. Never blame someone for being targeted.' }, { icon: <BadgeCheck />, title: 'A score is only a guide', body: 'Even a low score does not prove a message is safe. When in doubt, ask someone you trust.' }]; return <div className="section-view learn-view"><div className="section-heading"><div><span className="eyebrow">Small habits, stronger safety</span><h1>Learn without fear</h1><p>Simple reminders for you and the people you care about.</p></div><div className="learn-seal"><ShieldCheck size={25} /><span>Safe choices<br />start with a pause</span></div></div><div className="learn-grid">{cards.map((card) => <article className="learn-card" key={card.title}><div className="learn-icon">{card.icon}</div><h2>{card.title}</h2><p>{card.body}</p></article>)}</div><div className="learn-footer"><Siren size={25} /><div><strong>Need urgent help?</strong><p>Call the cybercrime helpline at <b>1930</b>. You can also visit the official reporting portal.</p></div><a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer" className="outline-button">Open portal <ArrowRight size={16} /></a></div></div>; }

export default App;
