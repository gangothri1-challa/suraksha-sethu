export type LanguageCode = string;

export type Language = {
  code: LanguageCode;
  native: string;
  english: string;
};

export const languages: Language[] = [
  { code: 'as', native: 'অসমীয়া', english: 'Assamese' },
  { code: 'bn', native: 'বাংলা', english: 'Bengali' },
  { code: 'brx', native: 'बड़ो', english: 'Bodo' },
  { code: 'doi', native: 'डोगरी', english: 'Dogri' },
  { code: 'gu', native: 'ગુજરાતી', english: 'Gujarati' },
  { code: 'hi', native: 'हिन्दी', english: 'Hindi' },
  { code: 'kn', native: 'ಕನ್ನಡ', english: 'Kannada' },
  { code: 'ks', native: 'کٲشُر', english: 'Kashmiri' },
  { code: 'kok', native: 'कोंकणी', english: 'Konkani' },
  { code: 'mai', native: 'मैथिली', english: 'Maithili' },
  { code: 'ml', native: 'മലയാളം', english: 'Malayalam' },
  { code: 'mni', native: 'মেইতেই', english: 'Manipuri (Meitei)' },
  { code: 'mr', native: 'मराठी', english: 'Marathi' },
  { code: 'ne', native: 'नेपाली', english: 'Nepali' },
  { code: 'or', native: 'ଓଡ଼ିଆ', english: 'Odia' },
  { code: 'pa', native: 'ਪੰਜਾਬੀ', english: 'Punjabi' },
  { code: 'sa', native: 'संस्कृतम्', english: 'Sanskrit' },
  { code: 'sat', native: 'ᱥᱟᱱᱛᱟᱲᱤ', english: 'Santali' },
  { code: 'sd', native: 'سنڌي', english: 'Sindhi' },
  { code: 'ta', native: 'தமிழ்', english: 'Tamil' },
  { code: 'te', native: 'తెలుగు', english: 'Telugu' },
  { code: 'ur', native: 'اردو', english: 'Urdu' },
  { code: 'en', native: 'English', english: 'English' },
];

type Copy = {
  welcome: string;
  welcomeBody: string;
  member: string;
  newUser: string;
  chooseLanguage: string;
  searchLanguage: string;
  continue: string;
  signIn: string;
  createAccount: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  dashboard: string;
  history: string;
  learn: string;
  emergency: string;
  pasteMessage: string;
  screenshot: string;
  audio: string;
  talk: string;
  typeQuestion: string;
  signOut: string;
  greeting: string;
  greetingBody: string;
  analyze: string;
  clear: string;
  yourMessage: string;
  trustedContact: string;
  save: string;
  relationship: string;
  notConfigured: string;
};

const english: Copy = {
  welcome: 'Your Digital Safety Bridge', welcomeBody: 'A calm, simple way to check suspicious messages, calls and payment requests.', member: 'Already a Member', newUser: 'New User', chooseLanguage: 'Choose your language', searchLanguage: 'Search languages', continue: 'Continue', signIn: 'Sign in', createAccount: 'Create account', fullName: 'Full name', email: 'Email address', phone: 'Phone number', password: 'Password', confirmPassword: 'Confirm password', dashboard: 'Safety assistant', history: 'My history', learn: 'Learn safety', emergency: 'Emergency help', pasteMessage: 'Paste a message', screenshot: 'Upload screenshot', audio: 'Upload audio', talk: 'Talk to assistant', typeQuestion: 'Type a question', signOut: 'Sign out', greeting: 'Hello! I am your Suraksha Sethu safety assistant.', greetingBody: 'Send me a suspicious message or tell me about a phone call. I will help you understand what to do next.', analyze: 'Check this message', clear: 'Clear', yourMessage: 'Paste or type the message here', trustedContact: 'Trusted family member', save: 'Save details', relationship: 'Relationship', notConfigured: 'This feature needs a connected service. You can still use the text checker.'
};

const copies: Record<string, Partial<Copy>> = {
  hi: { welcome: 'आपका डिजिटल सुरक्षा सेतु', welcomeBody: 'संदिग्ध संदेशों, कॉल और भुगतान अनुरोधों को समझने का सरल तरीका।', member: 'पहले से सदस्य हैं', newUser: 'नया उपयोगकर्ता', chooseLanguage: 'अपनी भाषा चुनें', continue: 'आगे बढ़ें', signIn: 'साइन इन करें', createAccount: 'खाता बनाएं', fullName: 'पूरा नाम', email: 'ईमेल पता', phone: 'फ़ोन नंबर', password: 'पासवर्ड', confirmPassword: 'पासवर्ड की पुष्टि करें', dashboard: 'सुरक्षा सहायक', history: 'मेरा इतिहास', learn: 'सुरक्षा सीखें', emergency: 'आपातकालीन सहायता', pasteMessage: 'संदेश चिपकाएं', screenshot: 'स्क्रीनशॉट डालें', audio: 'ऑडियो डालें', talk: 'सहायक से बात करें', typeQuestion: 'सवाल लिखें', signOut: 'साइन आउट', greeting: 'नमस्ते! मैं आपका सुरक्षा सहायक हूँ।', greetingBody: 'संदिग्ध संदेश भेजें या फ़ोन कॉल के बारे में बताएं। मैं आगे क्या करना है समझाने में मदद करूंगा।', analyze: 'संदेश जांचें', clear: 'हटाएं', yourMessage: 'संदेश यहां लिखें या चिपकाएं', trustedContact: 'भरोसेमंद परिवार का सदस्य', save: 'जानकारी सहेजें', relationship: 'रिश्ता' },
  bn: { welcome: 'আপনার ডিজিটাল সুরক্ষা সেতু', member: 'আগের সদস্য', newUser: 'নতুন ব্যবহারকারী', chooseLanguage: 'আপনার ভাষা বেছে নিন', continue: 'এগিয়ে যান', signIn: 'সাইন ইন', createAccount: 'অ্যাকাউন্ট তৈরি করুন', dashboard: 'সুরক্ষা সহায়ক', history: 'আমার ইতিহাস', learn: 'সুরক্ষা শিখুন', emergency: 'জরুরি সাহায্য', pasteMessage: 'বার্তা পেস্ট করুন', screenshot: 'স্ক্রিনশট আপলোড করুন', talk: 'সহায়কের সাথে কথা বলুন', analyze: 'বার্তা পরীক্ষা করুন' },
  te: { welcome: 'మీ డిజిటల్ భద్రతా వంతెన', member: 'ఇప్పటికే సభ్యులా', newUser: 'కొత్త వినియోగదారు', chooseLanguage: 'మీ భాషను ఎంచుకోండి', continue: 'కొనసాగించండి', signIn: 'సైన్ ఇన్', createAccount: 'ఖాతా సృష్టించండి', dashboard: 'భద్రతా సహాయకుడు', history: 'నా చరిత్ర', learn: 'భద్రత నేర్చుకోండి', emergency: 'అత్యవసర సహాయం', pasteMessage: 'సందేశాన్ని పేస్ట్ చేయండి', screenshot: 'స్క్రీన్‌షాట్ అప్‌లోడ్ చేయండి', talk: 'సహాయకుడితో మాట్లాడండి', analyze: 'సందేశాన్ని తనిఖీ చేయండి' },
  ta: { welcome: 'உங்கள் டிஜிட்டல் பாதுகாப்புப் பாலம்', member: 'ஏற்கனவே உறுப்பினரா', newUser: 'புதிய பயனர்', chooseLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்', continue: 'தொடரவும்', signIn: 'உள்நுழைக', createAccount: 'கணக்கை உருவாக்கவும்', dashboard: 'பாதுகாப்பு உதவியாளர்', history: 'என் வரலாறு', learn: 'பாதுகாப்பைக் கற்றுக்கொள்ளுங்கள்', emergency: 'அவசர உதவி', pasteMessage: 'செய்தியை ஒட்டவும்', screenshot: 'ஸ்கிரீன்ஷாட்டைப் பதிவேற்றவும்', talk: 'உதவியாளருடன் பேசுங்கள்', analyze: 'செய்தியைச் சரிபார்க்கவும்' },
  mr: { welcome: 'तुमचा डिजिटल सुरक्षा सेतू', member: 'आधीच सदस्य आहात', newUser: 'नवीन वापरकर्ता', chooseLanguage: 'तुमची भाषा निवडा', continue: 'पुढे जा', signIn: 'साइन इन', createAccount: 'खाते तयार करा', dashboard: 'सुरक्षा सहाय्यक', history: 'माझा इतिहास', learn: 'सुरक्षा शिका', emergency: 'आपत्कालीन मदत', pasteMessage: 'संदेश पेस्ट करा', screenshot: 'स्क्रीनशॉट अपलोड करा', talk: 'सहाय्यकाशी बोला', analyze: 'संदेश तपासा' },
  gu: { welcome: 'તમારો ડિજિટલ સુરક્ષા સેતુ', member: 'પહેલેથી સભ્ય છો', newUser: 'નવા વપરાશકર્તા', chooseLanguage: 'તમારી ભાષા પસંદ કરો', continue: 'ચાલુ રાખો', signIn: 'સાઇન ઇન', createAccount: 'ખાતું બનાવો', dashboard: 'સુરક્ષા સહાયક', history: 'મારો ઇતિહાસ', learn: 'સુરક્ષા શીખો', emergency: 'કટોકટી મદદ', pasteMessage: 'સંદેશ પેસ્ટ કરો', screenshot: 'સ્ક્રીનશોટ અપલોડ કરો', talk: 'સહાયક સાથે વાત કરો', analyze: 'સંદેશ તપાસો' },
};

export type SafetyCopy = {
  riskTitle: string;
  estimatedNote: string;
  whyTitle: string;
  whatCouldHappenTitle: string;
  whatShouldDoTitle: string;
  neverShareTitle: string;
  followUp: string;
  listen: string;
  pause: string;
  resume: string;
  stop: string;
  simplify: string;
  originalEvidence: string;
  noEvidence: string;
  uncertain: string;
  simpleSummary: string;
  impact: string;
  neverShare: string;
  actions: string[];
  speechUnavailable: string;
  moneyLost: string;
  moneyLostBody: string;
  call1930: string;
  openPortal: string;
  callTrusted: string;
  addTrusted: string;
  confirmCall: string;
  yesCall: string;
  cancel: string;
};

const safetyEnglish: SafetyCopy = {
  riskTitle: 'Risk level', estimatedNote: 'This is an estimate based only on the words we found. It is not proof that a scam happened.', whyTitle: 'Why is this suspicious?', whatCouldHappenTitle: 'What could happen?', whatShouldDoTitle: 'What should I do now?', neverShareTitle: 'What should I never share?', followUp: 'Ask a follow-up question', listen: 'Listen to explanation', pause: 'Pause', resume: 'Resume', stop: 'Stop', simplify: 'Explain more simply', originalEvidence: 'Exact evidence found', noEvidence: 'No specific warning sign was found in the text. That does not prove it is safe.', uncertain: 'We cannot confidently decide from this message alone. Please verify it through an official source.', simpleSummary: 'Please pause. Do not reply, click, or pay until you check this with an official source.', impact: 'A scammer may use this request to take your money or gain access to your account. For example, sharing one code can allow someone else to approve a payment.', neverShare: 'Never share an OTP, UPI PIN, password, card PIN, bank login, or screen access. Suraksha Sethu will never ask you for these.', actions: ['Do not reply or click any link.', 'Check the claim in the official bank or organisation app.', 'Ask a trusted family member to help you verify it.', 'If money may be lost, call 1930 and your bank promptly.'], speechUnavailable: 'Speech is not available in this language on this device. The complete explanation is still shown on screen.', moneyLost: 'Act quickly if money may be lost', moneyLostBody: 'Call India’s cybercrime helpline at 1930 as soon as possible. Then contact your bank or payment provider. You can also visit the official cybercrime portal.', call1930: 'Call cybercrime helpline 1930', openPortal: 'Open official cybercrime portal', callTrusted: 'Call trusted family member', addTrusted: 'No trusted family member is saved yet. Add one in your profile. The 1930 helpline is still available.', confirmCall: 'Call your trusted family member now?', yesCall: 'Yes, call', cancel: 'Cancel'
};

const safetyHindi: SafetyCopy = {
  riskTitle: 'जोखिम का स्तर', estimatedNote: 'यह अनुमान केवल संदेश में मिले शब्दों पर आधारित है। यह इस बात का पक्का सबूत नहीं है कि धोखा हुआ है।', whyTitle: 'यह संदिग्ध क्यों है?', whatCouldHappenTitle: 'क्या हो सकता है?', whatShouldDoTitle: 'मुझे अभी क्या करना चाहिए?', neverShareTitle: 'मुझे क्या कभी साझा नहीं करना चाहिए?', followUp: 'आगे का सवाल पूछें', listen: 'व्याख्या सुनें', pause: 'रोकें', resume: 'फिर चलाएं', stop: 'बंद करें', simplify: 'और आसान भाषा में समझाएं', originalEvidence: 'मिले हुए सही संकेत', noEvidence: 'इस संदेश में कोई खास चेतावनी नहीं मिली। इसका मतलब यह सुरक्षित है, ऐसा पक्का नहीं है।', uncertain: 'केवल इस संदेश से हम पक्का निर्णय नहीं कर सकते। कृपया आधिकारिक स्रोत से जांच करें।', simpleSummary: 'कृपया रुकें। आधिकारिक स्रोत से जांच किए बिना जवाब न दें, लिंक न खोलें और पैसे न भेजें।', impact: 'धोखेबाज़ आपके पैसे लेने या खाते तक पहुंचने की कोशिश कर सकता है। उदाहरण के लिए, एक कोड साझा करने से कोई दूसरा व्यक्ति भुगतान मंजूर कर सकता है।', neverShare: 'OTP, UPI PIN, पासवर्ड, कार्ड PIN, बैंक लॉगिन या स्क्रीन की पहुंच कभी साझा न करें। Suraksha Sethu भी ये चीजें नहीं पूछेगा।', actions: ['जवाब न दें और कोई लिंक न खोलें।', 'बैंक या संस्था के आधिकारिक ऐप में बात की जांच करें।', 'किसी भरोसेमंद परिवार के सदस्य से जांच में मदद लें।', 'पैसे जाने की आशंका हो तो तुरंत 1930 और अपने बैंक को फोन करें।'], speechUnavailable: 'इस भाषा की आवाज़ इस डिवाइस पर उपलब्ध नहीं है। पूरी जानकारी स्क्रीन पर दिखाई गई है।', moneyLost: 'अगर पैसे जा सकते हैं तो जल्दी मदद लें', moneyLostBody: 'भारत की साइबर अपराध हेल्पलाइन 1930 पर जल्द से जल्द फोन करें। फिर अपने बैंक या भुगतान सेवा को बताएं। आप आधिकारिक साइबर अपराध पोर्टल भी खोल सकते हैं।', call1930: 'साइबर अपराध हेल्पलाइन 1930 पर फोन करें', openPortal: 'आधिकारिक साइबर अपराध पोर्टल खोलें', callTrusted: 'भरोसेमंद परिवार के सदस्य को फोन करें', addTrusted: 'अभी कोई भरोसेमंद परिवार का सदस्य सेव नहीं है। अपनी प्रोफ़ाइल में एक व्यक्ति जोड़ें। 1930 हेल्पलाइन उपलब्ध है।', confirmCall: 'क्या आप अभी अपने भरोसेमंद व्यक्ति को फोन करना चाहते हैं?', yesCall: 'हां, फोन करें', cancel: 'रद्द करें'
};

const safetyTelugu: SafetyCopy = {
  riskTitle: 'ప్రమాద స్థాయి', estimatedNote: 'మేము కనుగొన్న పదాల ఆధారంగా మాత్రమే ఇది ఒక అంచనా. మోసం జరిగిందని ఇది ఖచ్చితమైన రుజువు కాదు.', whyTitle: 'ఇది ఎందుకు అనుమానాస్పదంగా ఉంది?', whatCouldHappenTitle: 'ఏం జరగవచ్చు?', whatShouldDoTitle: 'నేను ఇప్పుడు ఏం చేయాలి?', neverShareTitle: 'నేను ఏ విషయాలను ఎప్పుడూ పంచుకోకూడదు?', followUp: 'తదుపరి ప్రశ్న అడగండి', listen: 'వివరణ వినండి', pause: 'ఆపండి', resume: 'మళ్లీ వినండి', stop: 'ముగించండి', simplify: 'ఇంకా సులభంగా చెప్పండి', originalEvidence: 'కనిపించిన ఖచ్చితమైన ఆధారాలు', noEvidence: 'ఈ సందేశంలో ప్రత్యేక హెచ్చరిక కనిపించలేదు. అందుకే ఇది సురక్షితమని ఖచ్చితంగా చెప్పలేము.', uncertain: 'ఈ సందేశం ఒక్కటితో ఖచ్చితంగా నిర్ణయించలేము. అధికారిక మార్గంలో తనిఖీ చేయండి.', simpleSummary: 'దయచేసి ఆగండి. అధికారికంగా తనిఖీ చేయకుండా జవాబు ఇవ్వకండి, లింక్ తెరవకండి, డబ్బు పంపకండి.', impact: 'మోసగాడు మీ డబ్బు తీసుకోవడానికి లేదా మీ ఖాతాలోకి వెళ్లడానికి ప్రయత్నించవచ్చు. ఉదాహరణకు, ఒక కోడ్ చెప్పితే మరొకరు మీ చెల్లింపును ఆమోదించవచ్చు.', neverShare: 'OTP, UPI PIN, పాస్‌వర్డ్, కార్డ్ PIN, బ్యాంక్ లాగిన్ లేదా స్క్రీన్ యాక్సెస్ ఎప్పుడూ చెప్పకండి. Suraksha Sethu కూడా ఇవి అడగదు.', actions: ['జవాబు ఇవ్వకండి. ఏ లింక్‌నూ తెరవకండి.', 'బ్యాంక్ లేదా సంస్థ అధికారిక యాప్‌లో వివరాలు తనిఖీ చేయండి.', 'మీకు నమ్మకమైన కుటుంబ సభ్యుడి సహాయం తీసుకోండి.', 'డబ్బు పోయి ఉండవచ్చని అనిపిస్తే వెంటనే 1930కి, మీ బ్యాంక్‌కి ఫోన్ చేయండి.'], speechUnavailable: 'ఈ భాషలో మాట వినిపించే సదుపాయం ఈ పరికరంలో లేదు. పూర్తి వివరణ స్క్రీన్‌పై ఉంది.', moneyLost: 'డబ్బు పోయి ఉంటే వెంటనే సహాయం తీసుకోండి', moneyLostBody: 'భారత సైబర్ క్రైమ్ హెల్ప్‌లైన్ 1930కి వీలైనంత త్వరగా ఫోన్ చేయండి. తరువాత మీ బ్యాంక్ లేదా చెల్లింపు సంస్థకు చెప్పండి. అధికారిక సైబర్ క్రైమ్ పోర్టల్‌ను కూడా తెరవండి.', call1930: 'సైబర్ క్రైమ్ హెల్ప్‌లైన్ 1930కి ఫోన్ చేయండి', openPortal: 'అధికారిక సైబర్ క్రైమ్ పోర్టల్ తెరవండి', callTrusted: 'నమ్మకమైన కుటుంబ సభ్యుడికి ఫోన్ చేయండి', addTrusted: 'నమ్మకమైన కుటుంబ సభ్యుడి వివరాలు ఇంకా సేవ్ కాలేదు. మీ ప్రొఫైల్‌లో ఒకరిని జోడించండి. 1930 హెల్ప్‌లైన్ అందుబాటులో ఉంది.', confirmCall: 'మీ నమ్మకమైన వ్యక్తికి ఇప్పుడే ఫోన్ చేయాలా?', yesCall: 'అవును, ఫోన్ చేయండి', cancel: 'రద్దు చేయండి'
};

export function getCopy(code: string): Copy {
  return { ...english, ...(copies[code] ?? {}) };
}

export function getSafetyCopy(code: string): SafetyCopy {
  if (code === 'hi') return safetyHindi;
  if (code === 'te') return safetyTelugu;
  return safetyEnglish;
}

export function isRtl(code: string): boolean {
  return code === 'ur' || code === 'sd' || code === 'ks';
}
