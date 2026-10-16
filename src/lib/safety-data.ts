import type { LanguageCode } from './translations';

export type ScamScenario = {
  id: string;
  icon: string;
  titleEn: string;
  titleTe: string;
  descEn: string;
  descTe: string;
  urgency: 'critical' | 'high' | 'moderate';
};

export type ChecklistStep = {
  id: string;
  textEn: string;
  textTe: string;
  explainEn: string;
  explainTe: string;
  urgent: boolean;
};

export type ScenarioChecklist = {
  scenarioId: string;
  steps: ChecklistStep[];
};

export const scamScenarios: ScamScenario[] = [
  {
    id: 'otp-shared',
    icon: 'KeyRound',
    titleEn: 'OTP or PIN shared with someone',
    titleTe: 'OTP లేదా PIN ఎవరితోనైనా పంచుకున్నారు',
    descEn: 'You shared a one-time password, UPI PIN, or bank password with a caller or message sender.',
    descTe: 'మీరు కాలర్ లేదా సందేశం పంపినవారితో OTP, UPI PIN లేదా బ్యాంక్ పాస్‌వర్డ్ పంచుకున్నారు.',
    urgency: 'critical',
  },
  {
    id: 'upi-suspicious',
    icon: 'Smartphone',
    titleEn: 'Suspicious UPI payment or payment request',
    titleTe: 'అనుమానాస్పద UPI చెల్లింపు లేదా చెల్లింపు అభ్యర్థన',
    descEn: 'You received a UPI collect request or were asked to approve a payment you did not initiate.',
    descTe: 'మీరు UPI అభ్యర్థన పొందారు లేదా మీరు ప్రారంభించని చెల్లింపును ఆమోదించమని అడిగారు.',
    urgency: 'high',
  },
  {
    id: 'money-transferred',
    icon: 'Banknote',
    titleEn: 'Money transferred to a suspected scammer',
    titleTe: 'అనుమానిత మోసగాడికి డబ్బు బదిలీ చేశారు',
    descEn: 'You sent money to someone who may be a scammer, or a fraudulent transaction was made from your account.',
    descTe: 'మీరు మోసగాడు కావచ్చు అని అనుమానించిన వ్యక్తికి డబ్బు పంపారు లేదా మీ ఖాతా నుండి మోసపూరిత లావాదేవీ జరిగింది.',
    urgency: 'critical',
  },
  {
    id: 'fake-bank-kyc',
    icon: 'Building2',
    titleEn: 'Fake bank or KYC message',
    titleTe: 'నకిలీ బ్యాంక్ లేదా KYC సందేశం',
    descEn: 'You received a message or call claiming your bank account, card, or KYC will be suspended or blocked.',
    descTe: 'మీ బ్యాంక్ ఖాతా, కార్డ్ లేదా KYC నిలిపివేయబడుతుందని సందేశం లేదా కాల్ వచ్చింది.',
    urgency: 'high',
  },
  {
    id: 'link-clicked',
    icon: 'MousePointerClick',
    titleEn: 'Suspicious link clicked',
    titleTe: 'అనుమానాస్పద లింక్‌పై క్లిక్ చేశారు',
    descEn: 'You clicked a link in a suspicious message, email, or website that may have been fraudulent.',
    descTe: 'మీరు అనుమానాస్పద సందేశం, ఇమెయిల్ లేదా వెబ్‌సైట్‌లోని లింక్‌పై క్లిక్ చేశారు.',
    urgency: 'moderate',
  },
  {
    id: 'remote-access',
    icon: 'MonitorSmartphone',
    titleEn: 'Remote-access app installed after a suspicious call',
    titleTe: 'అనుమానాస్పద కాల్ తర్వాత రిమోట్-యాక్సెస్ యాప్ ఇన్‌స్టాల్ చేశారు',
    descEn: 'You installed an app like AnyDesk or TeamViewer after someone asked you to during a call.',
    descTe: 'కాల్ సమయంలో ఎవరో అడిగిన తర్వాత AnyDesk లేదా TeamViewer వంటి యాప్ ఇన్‌స్టాల్ చేశారు.',
    urgency: 'critical',
  },
  {
    id: 'fake-prize',
    icon: 'Gift',
    titleEn: 'Fake government scheme or prize message',
    titleTe: 'నకిలీ ప్రభుత్వ పథకం లేదా బహుమతి సందేశం',
    descEn: 'You received a message about a prize, lottery, or government scheme you did not apply for.',
    descTe: 'మీరు దరఖాస్తు చేయని బహుమతి, లాటరీ లేదా ప్రభుత్వ పథకం గురించి సందేశం అందుకున్నారు.',
    urgency: 'moderate',
  },
  {
    id: 'account-compromise',
    icon: 'UserCog',
    titleEn: 'Suspected account compromise',
    titleTe: 'ఖాతా భంగపాటు అనుమానం',
    descEn: 'You notice unusual activity in your email, bank, or social media account that you did not perform.',
    descTe: 'మీ ఇమెయిల్, బ్యాంక్ లేదా సోషల్ మీడియా ఖాతాలో మీరు చేయని అసాధారణ కార్యకలాపాలు గమనించారు.',
    urgency: 'critical',
  },
];

export const scenarioChecklists: Record<string, ScenarioChecklist> = {
  'otp-shared': {
    scenarioId: 'otp-shared',
    steps: [
      {
        id: 'stop-contact',
        textEn: 'Stop communicating with the suspicious caller immediately. Do not share any more OTPs, PINs, or passwords.',
        textTe: 'అనుమానాస్పద కాలర్‌తో మాట్లాడటం ఆపండి. మరిన్ని OTP, PIN లేదా పాస్‌వర్డ్‌లు పంచుకోకండి.',
        explainEn: 'Scammers may try calling again. Block the number if possible and do not engage further.',
        explainTe: 'మోసగాళ్లు మళ్లీ కాల్ చేయవచ్చు. వీలైతే నంబర్‌ను బ్లాక్ చేయండి.',
        urgent: true,
      },
      {
        id: 'contact-bank',
        textEn: 'Contact your bank or service provider immediately through its official app, website, or verified phone number.',
        textTe: 'మీ బ్యాంక్ లేదా సేవా సంస్థను వారి అధికారిక యాప్, వెబ్‌సైట్ లేదా ధృవీకృత ఫోన్ నంబర్ ద్వారా సంప్రదించండి.',
        explainEn: 'Use the number printed on the back of your card or the official bank website. Never use a number from the suspicious message.',
        explainTe: 'మీ కార్డ్ వెనుక ఉన్న నంబర్ లేదా అధికారిక బ్యాంక్ వెబ్‌సైట్‌లోని నంబర్ ఉపయోగించండి.',
        urgent: true,
      },
      {
        id: 'secure-account',
        textEn: 'Ask the bank to secure the affected account, card, or payment service. Request a freeze or block on unauthorized transactions.',
        textTe: 'ప్రభావిత ఖాతా, కార్డ్ లేదా చెల్లింపు సేవను భద్రపరచమని బ్యాంక్‌ను అడగండి.',
        explainEn: 'The bank can block further transactions, issue a new card, or reset your credentials to prevent unauthorized access.',
        explainTe: 'బ్యాంక్ మరిన్ని లావాదేవీలను నిలిపివేయవచ్చు, కొత్త కార్డ్ ఇవ్వవచ్చు.',
        urgent: true,
      },
      {
        id: 'call-1930',
        textEn: 'If money has been lost or financial cyber fraud is suspected, call India\'s cybercrime helpline at 1930 as soon as possible.',
        textTe: 'డబ్బు పోయినా లేదా సైబర్ మోసం అనుమానం ఉంటే 1930కి వీలైనంత త్వరగా ఫోన్ చేయండి.',
        explainEn: 'The 1930 helpline can help initiate the process to freeze fraudulent transactions and potentially recover funds.',
        explainTe: '1930 హెల్ప్‌లైన్ మోసపూరిత లావాదేవీలను నిలిపివేయడంలో సహాయపడుతుంది.',
        urgent: true,
      },
      {
        id: 'file-complaint',
        textEn: 'Register a complaint on the National Cyber Crime Reporting Portal: https://cybercrime.gov.in/',
        textTe: 'జాతీయ సైబర్ క్రైమ్ రిపోర్టింగ్ పోర్టల్‌లో ఫిర్యాదు నమోదు చేయండి: https://cybercrime.gov.in/',
        explainEn: 'Keep a record of your complaint reference number for future follow-up.',
        explainTe: 'భవిష్యత్తు అవసరం కోసం ఫిర్యాదు రిఫరెన్స్ నంబర్ నిల్వ చేసుకోండి.',
        urgent: false,
      },
      {
        id: 'preserve-evidence',
        textEn: 'Preserve all relevant transaction IDs, messages, screenshots, and complaint references as evidence.',
        textTe: 'సంబంధిత లావాదేవీ IDలు, సందేశాలు, స్క్రీన్‌షాట్‌లు మరియు ఫిర్యాదు రిఫరెన్స్‌లను ఆధారాలుగా భద్రపరచండి.',
        explainEn: 'Take screenshots of messages and note down dates, times, and numbers. Do not delete anything.',
        explainTe: 'సందేశాల స్క్రీన్‌షాట్‌లు తీసి, తేదీలు, సమయాలు, నంబర్‌లు రాయండి.',
        urgent: false,
      },
      {
        id: 'change-passwords',
        textEn: 'Change passwords for affected accounts from a device you trust. Use strong, unique passwords.',
        textTe: 'ప్రభావిత ఖాతాల పాస్‌వర్డ్‌లను మీకు నమ్మకమైన పరికరం నుండి మార్చండి.',
        explainEn: 'Do not reuse passwords. Consider using a password manager if available.',
        explainTe: 'పాస్‌వర్డ్‌లను మళ్లీ ఉపయోగించకండి.',
        urgent: false,
      },
    ],
  },
  'upi-suspicious': {
    scenarioId: 'upi-suspicious',
    steps: [
      {
        id: 'do-not-approve',
        textEn: 'Do not approve or enter your UPI PIN for any request you did not initiate.',
        textTe: 'మీరు ప్రారంభించని ఎలాంటి అభ్యర్థనను ఆమోదించకండి లేదా UPI PIN నమోదు చేయకండి.',
        explainEn: 'Approving a collect request transfers money from your account. Only approve requests you initiated.',
        explainTe: 'అభ్యర్థనను ఆమోదించడం వలన మీ ఖాతా నుండి డబ్బు బదిలీ అవుతుంది.',
        urgent: true,
      },
      {
        id: 'check-upi-app',
        textEn: 'Open your official UPI app and check pending requests and recent transactions.',
        textTe: 'మీ అధికారిక UPI యాప్‌ను తెరిచి పెండింగ్ అభ్యర్థనలు మరియు ఇటీవలి లావాదేవీలను తనిఖీ చేయండి.',
        explainEn: 'Look for any unauthorized transactions. If you see one, report it immediately.',
        explainTe: 'అనధికృత లావాదేవీల కోసం చూడండి. ఉంటే వెంటనే నివేదించండి.',
        urgent: true,
      },
      {
        id: 'block-sender',
        textEn: 'Block the contact who sent the suspicious request and report them in your UPI app if possible.',
        textTe: 'అనుమానాస్పద అభ్యర్థన పంపిన వ్యక్తిని బ్లాక్ చేయండి.',
        explainEn: 'Blocking prevents future requests from the same person.',
        explainTe: 'బ్లాక్ చేయడం వలన అదే వ్యక్తి నుండి భవిష్యత్తు అభ్యర్థనలు రావు.',
        urgent: false,
      },
      {
        id: 'call-1930',
        textEn: 'If any money was debited without your consent, call 1930 immediately to report the fraud.',
        textTe: 'మీ అనుమతి లేకుండా డబ్బు డెబిట్ అయితే వెంటనే 1930కి ఫోన్ చేయండి.',
        explainEn: 'The sooner you report, the better the chance of stopping the transaction.',
        explainTe: 'మీరు ఎంత త్వరగా నివేదిస్తే లావాదేవీని ఆపడం అంత సులభం.',
        urgent: true,
      },
      {
        id: 'file-complaint',
        textEn: 'File a complaint on the National Cyber Crime Reporting Portal: https://cybercrime.gov.in/',
        textTe: 'జాతీయ సైబర్ క్రైమ్ రిపోర్టింగ్ పోర్టల్‌లో ఫిర్యాదు దాఖలు చేయండి.',
        explainEn: 'Save your complaint reference number.',
        explainTe: 'ఫిర్యాదు రిఫరెన్స్ నంబర్ సేవ్ చేయండి.',
        urgent: false,
      },
    ],
  },
  'money-transferred': {
    scenarioId: 'money-transferred',
    steps: [
      {
        id: 'call-1930-immediate',
        textEn: 'Call 1930 immediately. This is the most important step. Every minute matters.',
        textTe: 'వెంటనే 1930కి ఫోన్ చేయండి. ఇది అత్యంత ముఖ్యమైన అడుగు.',
        explainEn: 'The 1930 helpline can coordinate with banks to freeze the fraudulent transaction before the money is withdrawn.',
        explainTe: '1930 హెల్ప్‌లైన్ డబ్బు ఉపసంహరించబడే లోపల మోసపూరిత లావాదేవీని నిలిపివేయగలదు.',
        urgent: true,
      },
      {
        id: 'contact-bank-fraud',
        textEn: 'Call your bank\'s fraud department using the number on the back of your card or the official website.',
        textTe: 'మీ కార్డ్ వెనుక ఉన్న నంబర్ లేదా అధికారిక వెబ్‌సైట్‌లోని నంబర్ ఉపయోగించి బ్యాంక్ మోసాల విభాగాన్ని సంప్రదించండి.',
        explainEn: 'Inform them of the fraudulent transaction and request a chargeback or transaction reversal.',
        explainTe: 'మోసపూరిత లావాదేవీ గురించి చెప్పి రద్దును అభ్యర్థించండి.',
        urgent: true,
      },
      {
        id: 'file-complaint-portal',
        textEn: 'Register a complaint on the National Cyber Crime Reporting Portal: https://cybercrime.gov.in/',
        textTe: 'జాతీయ సైబర్ క్రైమ్ రిపోర్టింగ్ పోర్టల్‌లో ఫిర్యాదు నమోదు చేయండి.',
        explainEn: 'Provide all transaction details including UPI reference number, date, time, and amount.',
        explainTe: 'UPI రిఫరెన్స్ నంబర్, తేదీ, సమయం, మొత్తం సహా అన్ని వివరాలు ఇవ్వండి.',
        urgent: true,
      },
      {
        id: 'preserve-evidence',
        textEn: 'Save all transaction IDs, receipts, messages, call recordings, and screenshots as evidence.',
        textTe: 'అన్ని లావాదేవీ IDలు, రసీదులు, సందేశాలు, స్క్రీన్‌షాట్‌లను ఆధారాలుగా సేవ్ చేయండి.',
        explainEn: 'Do not delete any messages or call logs. These are important for your complaint.',
        explainTe: 'ఏ సందేశాలు లేదా కాల్ లాగ్‌లను తొలగించకండి.',
        urgent: false,
      },
      {
        id: 'block-cards',
        textEn: 'If your card or account details were shared, ask the bank to block the card temporarily.',
        textTe: 'మీ కార్డ్ లేదా ఖాతా వివరాలు పంచుకున్నట్లయితే కార్డ్‌ను తాత్కాలికంగా బ్లాక్ చేయమని అడగండి.',
        explainEn: 'A temporary block prevents further unauthorized transactions while keeping the account active.',
        explainTe: 'తాత్కాలిక బ్లాక్ మరిన్ని అనధికృత లావాదేవీలను నిరోధిస్తుంది.',
        urgent: true,
      },
    ],
  },
  'fake-bank-kyc': {
    scenarioId: 'fake-bank-kyc',
    steps: [
      {
        id: 'do-not-share',
        textEn: 'Do not share any personal or banking information with the caller or message sender.',
        textTe: 'కాలర్ లేదా సందేశం పంపినవారితో ఏ వ్యక్తిగత లేదా బ్యాంకింగ్ సమాచారం పంచుకోకండి.',
        explainEn: 'Banks never ask for KYC details over phone calls. They use official app notifications or branch visits.',
        explainTe: 'బ్యాంకులు ఫోన్ కాల్‌ల ద్వారా KYC వివరాలను అడగవు.',
        urgent: true,
      },
      {
        id: 'verify-official',
        textEn: 'Verify the claim by logging into your bank\'s official app or website directly.',
        textTe: 'మీ బ్యాంక్ అధికారిక యాప్ లేదా వెబ్‌సైట్‌లో లాగిన్ చేసి వాదనను తనిఖీ చేయండి.',
        explainEn: 'Type the bank website address yourself. Do not click any link in the message.',
        explainTe: 'బ్యాంక్ వెబ్‌సైట్ చిరునామా మీరే టైప్ చేయండి. సందేశంలోని లింక్‌పై క్లిక్ చేయకండి.',
        urgent: true,
      },
      {
        id: 'report-bank',
        textEn: 'Report the fraudulent message or call to your bank through its official customer care.',
        textTe: 'మోసపూరిత సందేశం లేదా కాల్‌ను బ్యాంక్ అధికారిక కస్టమర్ కేర్ ద్వారా నివేదించండి.',
        explainEn: 'Banks have dedicated fraud reporting channels and can warn other customers.',
        explainTe: 'బ్యాంకులకు ప్రత్యేక మోస నివేదన ఛానెళ్లు ఉంటాయి.',
        urgent: false,
      },
      {
        id: 'forward-1930',
        textEn: 'Forward suspicious messages to 1930 or report on https://cybercrime.gov.in/',
        textTe: 'అనుమానాస్పద సందేశాలను 1930కి ఫార్వర్డ్ చేయండి.',
        explainEn: 'Forwarding helps authorities track scam campaigns and warn others.',
        explainTe: 'ఫార్వర్డ్ చేయడం అధికారులకు మోసాలను ట్రాక్ చేయడంలో సహాయపడుతుంది.',
        urgent: false,
      },
    ],
  },
  'link-clicked': {
    scenarioId: 'link-clicked',
    steps: [
      {
        id: 'close-page',
        textEn: 'Close the page that opened immediately. Do not enter any information on it.',
        textTe: 'తెరిచిన పేజీని వెంటనే మూసివేయండి. అందులో ఏ సమాచారం నమోదు చేయకండి.',
        explainEn: 'Phishing pages are designed to steal credentials. Closing them prevents further exposure.',
        explainTe: 'ఫిషింగ్ పేజీలు ఆధారాలను దొంగిలించడానికి రూపొందించబడతాయి.',
        urgent: true,
      },
      {
        id: 'check-browser',
        textEn: 'Check your browser for any unexpected downloads, extensions, or pop-ups and remove them.',
        textTe: 'మీ బ్రౌజర్‌లో అనుకోని డౌన్‌లోడ్‌లు, ఎక్స్‌టెన్షన్‌లు ఉన్నాయో తనిఖీ చేసి తొలగించండి.',
        explainEn: 'Malicious pages may install browser extensions or download malware silently.',
        explainTe: 'దురుదేశపూరిత పేజీలు ఎక్స్‌టెన్షన్‌లను ఇన్‌స్టాల్ చేయవచ్చు.',
        urgent: true,
      },
      {
        id: 'change-passwords-link',
        textEn: 'If you entered any credentials on the page, change the password for that account immediately.',
        textTe: 'పేజీలో ఏ ఆధారాలు నమోదు చేసినట్లయితే ఆ ఖాతా పాస్‌వర్డ్ వెంటనే మార్చండి.',
        explainEn: 'Assume any information you entered has been compromised and act accordingly.',
        explainTe: 'మీరు నమోదు చేసిన సమాచారం దొంగిలించబడిందని భావించండి.',
        urgent: true,
      },
      {
        id: 'enable-2fa',
        textEn: 'Enable two-factor authentication on the affected account if available.',
        textTe: 'ప్రభావిత ఖాతాలో అందుబాటులో ఉంటే ద్వి-అంశ ధృవీకరణ ప్రారంభించండి.',
        explainEn: '2FA adds an extra layer of protection even if your password was stolen.',
        explainTe: '2FA అదనపు రక్షణ ఇస్తుంది.',
        urgent: false,
      },
      {
        id: 'run-antivirus',
        textEn: 'Run a full antivirus scan on your device if you suspect malware was downloaded.',
        textTe: 'మాల్వేర్ డౌన్‌లోడ్ అయిందని అనుమానిస్తే పూర్తి యాంటీవైరస్ స్కాన్ నడపండి.',
        explainEn: 'A full scan can detect and remove malware that may have been silently installed.',
        explainTe: 'పూర్తి స్కాన్ మాల్వేర్‌ను కనుగొని తొలగించగలదు.',
        urgent: false,
      },
    ],
  },
  'remote-access': {
    scenarioId: 'remote-access',
    steps: [
      {
        id: 'uninstall-app',
        textEn: 'Uninstall the remote-access app (AnyDesk, TeamViewer, etc.) immediately from your phone.',
        textTe: 'రిమోట్-యాక్సెస్ యాప్‌ను (AnyDesk, TeamViewer మొదలైనవి) వెంటనే మీ ఫోన్ నుండి అన్‌ఇన్‌స్టాల్ చేయండి.',
        explainEn: 'As long as the app is installed, the scammer may still have access to your device.',
        explainTe: 'యాప్ ఇన్‌స్టాల్ ఉన్నంతవరకు మోసగాడు మీ పరికరానికి యాక్సెస్ కలిగి ఉండవచ్చు.',
        urgent: true,
      },
      {
        id: 'revoke-permissions',
        textEn: 'Revoke all permissions granted to the app in your phone settings.',
        textTe: 'మీ ఫోన్ సెట్టింగ్‌లలో యాప్‌కు ఇచ్చిన అన్ని అనుమతులను రద్దు చేయండి.',
        explainEn: 'Even after uninstalling, check for any residual accessibility or screen-sharing permissions.',
        explainTe: 'అన్‌ఇన్‌స్టాల్ తర్వాత కూడా అనుమతులు తనిఖీ చేయండి.',
        urgent: true,
      },
      {
        id: 'check-bank-transactions',
        textEn: 'Check all bank and UPI transactions for any unauthorized transfers made while the app was active.',
        textTe: 'యాప్ యాక్టివ్‌గా ఉన్నప్పుడు చేసిన అనధికృత బదిలీల కోసం అన్ని బ్యాంక్ మరియు UPI లావాదేవీలను తనిఖీ చేయండి.',
        explainEn: 'Remote access apps can be used to approve UPI payments or access banking apps without your knowledge.',
        explainTe: 'రిమోట్ యాక్సెస్ యాప్‌లు మీకు తెలియకుండా చెల్లింపులు ఆమోదించగలవు.',
        urgent: true,
      },
      {
        id: 'change-all-passwords',
        textEn: 'Change passwords for your banking apps, email, and any accounts that were accessible on the device.',
        textTe: 'మీ బ్యాంకింగ్ యాప్‌లు, ఇమెయిల్ మరియు పరికరంలో యాక్సెస్ చేయగల ఖాతాల పాస్‌వర్డ్‌లను మార్చండి.',
        explainEn: 'Do this from a different, trusted device if possible.',
        explainTe: 'వీలైతే వేరే నమ్మకమైన పరికరం నుండి చేయండి.',
        urgent: true,
      },
      {
        id: 'call-1930-remote',
        textEn: 'If any money was lost, call 1930 immediately and file a complaint on https://cybercrime.gov.in/',
        textTe: 'డబ్బు పోయితే వెంటనే 1930కి ఫోన్ చేయండి.',
        explainEn: 'Remote access fraud is serious. Report it as soon as possible.',
        explainTe: 'రిమోట్ యాక్సెస్ మోసం తీవ్రమైనది. వీలైనంత త్వరగా నివేదించండి.',
        urgent: true,
      },
    ],
  },
  'fake-prize': {
    scenarioId: 'fake-prize',
    steps: [
      {
        id: 'do-not-pay',
        textEn: 'Do not pay any fee, tax, or registration charge to claim the prize. Real prizes do not require upfront payment.',
        textTe: 'బహుమతి పొందడానికి ఎలాంటి రుసుము, పన్ను లేదా రిజిస్ట్రేషన్ ఛార్జీ చెల్లించకండి.',
        explainEn: 'Asking for payment to release a prize is a classic scam technique.',
        explainTe: 'బహుమతి ఇవ్వడానికి చెల్లింపు అడగడం సంప్రదాయ మోసం.',
        urgent: true,
      },
      {
        id: 'do-not-share-info',
        textEn: 'Do not share personal details, bank account numbers, or Aadhaar numbers with the sender.',
        textTe: 'పంపినవారితో వ్యక్తిగత వివరాలు, బ్యాంక్ ఖాతా నంబర్‌లు లేదా ఆధార్ నంబర్‌లు పంచుకోకండి.',
        explainEn: 'Scammers use this information for identity theft or to target you with more specific scams.',
        explainTe: 'మోసగాళ్లు ఈ సమాచారాన్ని గుర్తింపు దొంగలకు ఉపయోగిస్తారు.',
        urgent: true,
      },
      {
        id: 'block-report',
        textEn: 'Block the sender and report the message as spam in your messaging app.',
        textTe: 'పంపినవారిని బ్లాక్ చేయండి మరియు సందేశాన్ని స్పామ్‌గా నివేదించండి.',
        explainEn: 'Blocking prevents future scam attempts from the same number.',
        explainTe: 'బ్లాక్ చేయడం భవిష్యత్తు మోసాలను నిరోధిస్తుంది.',
        urgent: false,
      },
      {
        id: 'verify-scheme',
        textEn: 'If it claims to be a government scheme, verify on the official government website or with a trusted source.',
        textTe: 'ప్రభుత్వ పథకం అని చెప్పినట్లయితే అధికారిక ప్రభుత్వ వెబ్‌సైట్‌లో తనిఖీ చేయండి.',
        explainEn: 'Government schemes are announced through official channels, not random messages.',
        explainTe: 'ప్రభుత్వ పథకాలు అధికారిక ఛానెళ్ల ద్వారా ప్రకటించబడతాయి.',
        urgent: false,
      },
      {
        id: 'report-portal',
        textEn: 'Report the scam on the National Cyber Crime Reporting Portal: https://cybercrime.gov.in/',
        textTe: 'జాతీయ సైబర్ క్రైమ్ రిపోర్టింగ్ పోర్టల్‌లో మోసాన్ని నివేదించండి.',
        explainEn: 'Reporting helps authorities track and shut down scam operations.',
        explainTe: 'నివేదన అధికారులకు మోసాలను ట్రాక్ చేయడంలో సహాయపడుతుంది.',
        urgent: false,
      },
    ],
  },
  'account-compromise': {
    scenarioId: 'account-compromise',
    steps: [
      {
        id: 'change-password-urgent',
        textEn: 'Change the password for the compromised account immediately from a trusted device.',
        textTe: 'భంగపాటు ఖాతా పాస్‌వర్డ్‌ను వెంటనే నమ్మకమైన పరికరం నుండి మార్చండి.',
        explainEn: 'This is the fastest way to lock out an attacker who has your current password.',
        explainTe: 'ఇది హ్యాకర్‌ను బయటకు పంపడానికి వేగవంతమైన మార్గం.',
        urgent: true,
      },
      {
        id: 'enable-2fa-account',
        textEn: 'Enable two-factor authentication on the account if it is available.',
        textTe: 'ఖాతాలో ద్వి-అంశ ధృవీకరణ ప్రారంభించండి.',
        explainEn: '2FA requires a second verification step, making it much harder for attackers to get back in.',
        explainTe: '2FA ద్వితీయ ధృవీకరణ అవసరం, హ్యాకర్‌లను నిరోధిస్తుంది.',
        urgent: true,
      },
      {
        id: 'check-sessions',
        textEn: 'Check for and log out of all active sessions on the account. Most platforms have this under security settings.',
        textTe: 'ఖాతాలో అన్ని యాక్టివ్ సెషన్‌లను తనిఖీ చేసి లాగౌట్ చేయండి.',
        explainEn: 'This forces anyone currently logged in to your account to authenticate again.',
        explainTe: 'ఇది ప్రస్తుతం లాగిన్ అయిన ఎవరినైనా మళ్లీ ధృవీకరించమని బలవంతపెడుతుంది.',
        urgent: true,
      },
      {
        id: 'check-recovery',
        textEn: 'Verify that your recovery email and phone number have not been changed.',
        textTe: 'మీ రికవరీ ఇమెయిల్ మరియు ఫోన్ నంబర్ మార్చబడలేదని తనిఖీ చేయండి.',
        explainEn: 'Attackers often change recovery options to maintain access even after a password change.',
        explainTe: 'హ్యాకర్‌లు తరచుగా రికవరీ ఎంపికలను మారుస్తారు.',
        urgent: true,
      },
      {
        id: 'scan-device',
        textEn: 'Run a full antivirus scan on your device to check for malware or keyloggers.',
        textTe: 'మాల్వేర్ లేదా కీలాగర్‌ల కోసం పూర్తి యాంటీవైరస్ స్కాన్ నడపండి.',
        explainEn: 'Malware on your device may have captured your password. Remove it before changing passwords again.',
        explainTe: 'పరికరంలో మాల్వేర్ మీ పాస్‌వర్డ్‌ను పట్టివేసి ఉండవచ్చు.',
        urgent: false,
      },
      {
        id: 'report-compromise',
        textEn: 'If financial accounts are involved, call 1930 and report on https://cybercrime.gov.in/',
        textTe: 'ఆర్థిక ఖాతాలు సంబంధించి ఉంటే 1930కి ఫోన్ చేయండి.',
        explainEn: 'Financial account compromise should be reported as potential cyber fraud.',
        explainTe: 'ఆర్థిక ఖాతా భంగపాటును సైబర్ మోసంగా నివేదించాలి.',
        urgent: true,
      },
    ],
  },
};

export type OfflineSafetyTopic = {
  id: string;
  category: 'scam-types' | 'safety-rules' | 'emergency' | 'lessons';
  icon: string;
  titleEn: string;
  titleTe: string;
  contentEn: string[];
  contentTe: string[];
};

export const offlineSafetyTopics: OfflineSafetyTopic[] = [
  {
    id: 'otp-safety',
    category: 'safety-rules',
    icon: 'KeyRound',
    titleEn: 'OTP, UPI PIN, and Password Safety',
    titleTe: 'OTP, UPI PIN మరియు పాస్‌వర్డ్ భద్రత',
    contentEn: [
      'Never share your OTP (One-Time Password) with anyone, not even bank officials, police, or family members claiming to need it.',
      'Your UPI PIN should only be entered in the official UPI app. Never enter it on a website or share it over a call.',
      'Banks will never call you to ask for your password, PIN, or OTP. If someone does, it is a scam.',
      'Use strong, unique passwords for each important account. A strong password has at least 12 characters with letters, numbers, and symbols.',
      'Enable two-factor authentication (2FA) wherever available. It adds an extra layer of security.',
    ],
    contentTe: [
      'మీ OTPను ఎవరితోనూ పంచుకోకండి - బ్యాంక్ అధికారులు, పోలీసులు లేదా కుటుంబ సభ్యులు కూడా.',
      'మీ UPI PINను అధికారిక UPI యాప్‌లో మాత్రమే నమోదు చేయండి. వెబ్‌సైట్‌లో లేదా కాల్‌లో పంచుకోకండి.',
      'బ్యాంకులు మీ పాస్‌వర్డ్, PIN లేదా OTP అడగడానికి కాల్ చేయవు. ఎవరైనా అడిగితే అది మోసం.',
      'ప్రతి ముఖ్యమైన ఖాతాకు బలమైన, ప్రత్యేక పాస్‌వర్డ్‌లు ఉపయోగించండి.',
      'అందుబాటులో ఉంటే ద్వి-అంశ ధృవీకరణ (2FA) ప్రారంభించండి.',
    ],
  },
  {
    id: 'upi-payment-safety',
    category: 'safety-rules',
    icon: 'Smartphone',
    titleEn: 'UPI and Payment Safety Rules',
    titleTe: 'UPI మరియు చెల్లింపు భద్రతా నియమాలు',
    contentEn: [
      'Only approve UPI collect requests that you initiated. Do not approve requests from unknown people.',
      'Always verify the recipient name and UPI ID before sending money. Scammers use similar-looking names.',
      'Do not scan QR codes from unknown sources. Some QR codes are designed to deduct money, not receive it.',
      'If someone asks you to enter your PIN to "receive" money, it is a scam. Entering your PIN always sends money.',
      'Check your bank statements and UPI transaction history regularly for unauthorized transactions.',
    ],
    contentTe: [
      'మీరు ప్రారంభించిన UPI అభ్యర్థనలను మాత్రమే ఆమోదించండి.',
      'డబ్బు పంపే ముందు స్వీకర్త పేరు మరియు UPI ID తనిఖీ చేయండి.',
      'తెలియని మూలాల నుండి QR కోడ్‌లను స్కాన్ చేయకండి.',
      'డబ్బు "స్వీకరించడానికి" PIN నమోదు చేయమని అడిగితే అది మోసం.',
      'అనధికృత లావాదేవీల కోసం రెగ్యులర్‌గా బ్యాంక్ స్టేట్‌మెంట్లు తనిఖీ చేయండి.',
    ],
  },
  {
    id: 'fake-bank-calls',
    category: 'scam-types',
    icon: 'Building2',
    titleEn: 'Fake Bank Calls and KYC Scams',
    titleTe: 'నకిలీ బ్యాంక్ కాల్‌లు మరియు KYC మోసాలు',
    contentEn: [
      'Scammers pretend to be from your bank and claim your account or card will be blocked due to KYC pending.',
      'They ask you to share card details, OTP, or click a link to "complete KYC". This is always a scam.',
      'Banks send KYC reminders through official app notifications, SMS from official numbers, or email.',
      'If you receive such a call, hang up and call the bank using the number on the back of your card.',
      'Never call a number provided by the suspicious caller. Always use the number printed on your card or passbook.',
    ],
    contentTe: [
      'మోసగాళ్లు మీ బ్యాంకు నుండి వచ్చారని చెప్పి KYC పెండింగ్‌గా ఉందని ఖాతా బ్లాక్ అవుతుందని బెదిరిస్తారు.',
      'కార్డ్ వివరాలు, OTP పంచుకోమని లేదా లింక్‌పై క్లిక్ చేయమని అడుగుతారు. ఇది ఎల్లప్పుడూ మోసం.',
      'బ్యాంకులు KYC రిమైండర్‌లను అధికారిక యాప్ నోటిఫికేషన్‌ల ద్వారా పంపుతాయి.',
      'అలాంటి కాల్ వస్తే కట్ చేసి కార్డ్ వెనుక ఉన్న నంబర్‌కు ఫోన్ చేయండి.',
      'అనుమానాస్పద కాలర్ ఇచ్చిన నంబర్‌కు ఎప్పుడూ ఫోన్ చేయకండి.',
    ],
  },
  {
    id: 'suspicious-links',
    category: 'scam-types',
    icon: 'MousePointerClick',
    titleEn: 'Suspicious Links and Screen-Sharing Safety',
    titleTe: 'అనుమానాస్పద లింక్‌లు మరియు స్క్రీన్-షేరింగ్ భద్రత',
    contentEn: [
      'Do not click links in SMS, WhatsApp, or email from unknown senders. They may lead to fake websites.',
      'If a message says your package is delayed, your account is locked, or you won a prize, verify through the official app first.',
      'Never install screen-sharing apps like AnyDesk or TeamViewer when someone asks you to during a call.',
      'Remote access apps let scammers see and control your phone, including approving UPI payments.',
      'If you accidentally installed such an app, uninstall it immediately and check your bank transactions.',
    ],
    contentTe: [
      'తెలియని పంపినవారి SMS, WhatsApp లేదా ఇమెయిల్‌లోని లింక్‌లపై క్లిక్ చేయకండి.',
      'ప్యాకేజీ ఆలస్యం, ఖాతా లాక్, బహుమతి అని సందేశం వస్తే అధికారిక యాప్‌లో తనిఖీ చేయండి.',
      'కాల్ సమయంలో ఎవరైనా AnyDesk లేదా TeamViewer వంటి స్క్రీన్-షేరింగ్ యాప్‌లను ఇన్‌స్టాల్ చేయకండి.',
      'రిమోట్ యాక్సెస్ యాప్‌లు మోసగాళ్లకు మీ ఫోన్ చూడటానికి మరియు నియంత్రించడానికి అనుమతిస్తాయి.',
      'అలాంటి యాప్ అనుకోకుండా ఇన్‌స్టాల్ అయితే వెంటనే అన్‌ఇన్‌స్టాల్ చేయండి.',
    ],
  },
  {
    id: 'common-scams',
    category: 'scam-types',
    icon: 'AlertTriangle',
    titleEn: 'Common Scam Examples and Warning Signs',
    titleTe: 'సాధారణ మోసాల ఉదాహరణలు మరియు హెచ్చరిక సంకేతాలు',
    contentEn: [
      'Urgency: "Act now or your account will be closed today." Scammers create false urgency to make you act without thinking.',
      'Too good to be true: "You won a lottery you never entered." If you did not enter, you did not win.',
      'Authority: "I am calling from the Reserve Bank of India." Real officials do not ask for OTPs or PINs.',
      'Requests for money: "Pay a small fee to release your prize." Real prizes never require upfront payment.',
      'Requests for remote access: "Install this app so I can help you." No legitimate support needs remote access to your phone.',
      'Threats: "There is a legal case against you." Verify with official channels before responding to any threat.',
    ],
    contentTe: [
      'అత్యవసరం: "ఇప్పుడే చేయకపోతే ఖాతా మూసివేయబడుతుంది." మోసగాళ్లు తప్పుడు అత్యవసరం సృష్టిస్తారు.',
      'నమ్మశక్యం కానంత మంచిది: "మీరు పాల్గొనని లాటరీ గెలిచారు." పాల్గొనకపోతే గెలవలేరు.',
      'అధికారం: "నేను రిజర్వ్ బ్యాంక్ ఆఫ్ ఇండియా నుండి వస్తున్నాను." నిజమైన అధికారులు OTP లేదా PIN అడగరు.',
      'డబ్బు అభ్యర్థనలు: "బహుమతి ఇవ్వడానికి చిన్న రుసుము చెల్లించండి." నిజమైన బహుమతులకు చెల్లింపు అవసరం లేదు.',
      'రిమోట్ యాక్సెస్ అభ్యర్థన: "ఈ యాప్ ఇన్‌స్టాల్ చేయండి, నేను సహాయం చేస్తాను." ఎలాంటి సపోర్ట్‌కు రిమోట్ యాక్సెస్ అవసరం లేదు.',
      'బెదిరింపులు: "మీపై కేసు ఉంది." అధికారిక ఛానెళ్లలో తనిఖీ చేయండి.',
    ],
  },
  {
    id: 'emergency-info',
    category: 'emergency',
    icon: 'Siren',
    titleEn: 'Emergency Cybercrime Reporting Information',
    titleTe: 'అత్యవసర సైబర్ క్రైమ్ నివేదన సమాచారం',
    contentEn: [
      'National Cyber Crime Helpline: Call 1930 (toll-free, available 24x7) to report financial cyber fraud.',
      'National Cyber Crime Reporting Portal: Visit https://cybercrime.gov.in/ to file a complaint online.',
      'When calling 1930, keep your bank details, transaction ID, and the scammer\'s phone number ready.',
      'Report the fraud as early as possible. Faster reporting improves the chance of recovering money.',
      'You can also contact your local police station\'s cyber crime cell for assistance.',
      'Save all evidence: screenshots, messages, call recordings, transaction receipts, and complaint reference numbers.',
    ],
    contentTe: [
      'జాతీయ సైబర్ క్రైమ్ హెల్ప్‌లైన్: 1930కి ఫోన్ చేయండి (టోల్ ఫ్రీ, 24x7).',
      'జాతీయ సైబర్ క్రైమ్ రిపోర్టింగ్ పోర్టల్: https://cybercrime.gov.in/ సందర్శించండి.',
      '1930కి ఫోన్ చేసేటప్పుడు బ్యాంక్ వివరాలు, లావాదేవీ ID, మోసగాడి ఫోన్ నంబర్ సిద్ధంగా ఉంచండి.',
      'మోసాన్ని వీలైనంత త్వరగా నివేదించండి.',
      'మీ స్థానిక పోలీస్ స్టేషన్ సైబర్ క్రైమ్ సెల్‌ను కూడా సంప్రదించండి.',
      'అన్ని ఆధారాలు సేవ్ చేయండి: స్క్రీన్‌షాట్‌లు, సందేశాలు, కాల్ రికార్డింగ్‌లు.',
    ],
  },
  {
    id: 'telugu-lesson-1',
    category: 'lessons',
    icon: 'BookOpen',
    titleEn: 'Lesson 1: Recognizing Scam Calls (Telugu Audio)',
    titleTe: 'పాఠం 1: మోసపూరిత కాల్‌లను గుర్తించడం',
    contentEn: [
      'This lesson is available in Telugu audio. Press the play button to listen.',
      'Scam calls often create urgency. The caller may say your account will be blocked or money will be lost.',
      'They may pretend to be from a bank, government office, or police. Real officials do not ask for OTPs.',
      'If you feel pressured, hang up. You can always call back using an official number.',
      'Talk to a trusted family member before taking any action based on a phone call.',
    ],
    contentTe: [
      'ఈ పాఠం తెలుగు ఆడియోలో అందుబాటులో ఉంది. ప్లే బటన్ నొక్కండి.',
      'మోసపూరిత కాల్‌లు తరచుగా అత్యవసరం సృష్టిస్తాయి.',
      'వారు బ్యాంక్, ప్రభుత్వ కార్యాలయం లేదా పోలీసుల నుండి వచ్చారని నటించవచ్చు.',
      'ఒత్తిడి అనిపిస్తే కట్ చేయండి. అధికారిక నంబర్‌కు తిరిగి ఫోన్ చేయవచ్చు.',
      'కాల్ ఆధారంగా ఏ చర్య తీసుకుంటే ముందు నమ్మకమైన కుటుంబ సభ్యుడితో మాట్లాడండి.',
    ],
  },
  {
    id: 'telugu-lesson-2',
    category: 'lessons',
    icon: 'BookOpen',
    titleEn: 'Lesson 2: Safe Digital Payments (Telugu Audio)',
    titleTe: 'పాఠం 2: సురక్షిత డిజిటల్ చెల్లింపులు',
    contentEn: [
      'This lesson is available in Telugu audio. Press the play button to listen.',
      'Always check the recipient name before confirming a UPI payment.',
      'Never enter your UPI PIN to "receive" money. PIN entry always sends money from your account.',
      'Do not scan unknown QR codes. Some fraudulent QR codes deduct money instead of receiving it.',
      'If you make a mistake, call 1930 immediately to report the fraudulent transaction.',
    ],
    contentTe: [
      'ఈ పాఠం తెలుగు ఆడియోలో అందుబాటులో ఉంది. ప్లే బటన్ నొక్కండి.',
      'UPI చెల్లింపు నిర్ధారించే ముందు స్వీకర్త పేరు తనిఖీ చేయండి.',
      'డబ్బు "స్వీకరించడానికి" UPI PIN నమోదు చేయకండి.',
      'తెలియని QR కోడ్‌లను స్కాన్ చేయకండి.',
      'తప్పు చేసినట్లయితే వెంటనే 1930కి ఫోన్ చేయండి.',
    ],
  },
];

export function getScenario(id: string): ScamScenario | undefined {
  return scamScenarios.find((s) => s.id === id);
}

export function getChecklist(scenarioId: string): ChecklistStep[] {
  return scenarioChecklists[scenarioId]?.steps ?? [];
}

export function localizeScenario(scenario: ScamScenario, lang: LanguageCode): { title: string; desc: string } {
  if (lang === 'te') return { title: scenario.titleTe, desc: scenario.descTe };
  return { title: scenario.titleEn, desc: scenario.descEn };
}

export function localizeStep(step: ChecklistStep, lang: LanguageCode): { text: string; explain: string } {
  if (lang === 'te') return { text: step.textTe, explain: step.explainTe };
  return { text: step.textEn, explain: step.explainEn };
}

export function localizeTopic(topic: OfflineSafetyTopic, lang: LanguageCode): { title: string; content: string[] } {
  if (lang === 'te') return { title: topic.titleTe, content: topic.contentTe };
  return { title: topic.titleEn, content: topic.contentEn };
}

export const offlineTopicCategories: { id: OfflineSafetyTopic['category']; labelEn: string; labelTe: string }[] = [
  { id: 'safety-rules', labelEn: 'Safety Rules', labelTe: 'భద్రతా నియమాలు' },
  { id: 'scam-types', labelEn: 'Common Scams', labelTe: 'సాధారణ మోసాలు' },
  { id: 'emergency', labelEn: 'Emergency Contacts', labelTe: 'అత్యవసర పరిచయాలు' },
  { id: 'lessons', labelEn: 'Audio Lessons', labelTe: 'ఆడియో పాఠాలు' },
];
