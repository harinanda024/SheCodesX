import { HazardType, LanguageCode } from './types';

export const languageNames: Record<LanguageCode, string> = {
  en: 'English',
  hi: 'हिन्दी · Hindi',
  kn: 'ಕನ್ನಡ · Kannada',
  ta: 'தமிழ் · Tamil',
  te: 'తెలుగు · Telugu',
};

export const speechLocales: Record<LanguageCode, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  kn: 'kn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
};

export const hazardIcons: Record<HazardType, string> = {
  'Pothole': '🕳️',
  'Open manhole': '⚠️',
  'Exposed electrical wire': '⚡',
  'Waterlogging': '🌊',
  'Broken footpath': '🚧',
  'Broken streetlight': '💡',
  'Other': '📍',
};

export interface AppTranslation {
  workspace: string;
  home: string;
  report: string;
  issues: string;
  profile: string;
  greetingStatic: string;
  reportTitle: string;
  hazardType: string;
  severity: string;
  location: string;
  description: string;
  photo: string;
  coordinates: string;
  submit: string;
  safety: string;
  quick: string;
  recent: string;
  myReports: string;
  speak: string;
  listening: string;
  voiceHelp: string;
  mapTitle: string;
  mapSubtitle: string;
  mapLoading: string;
  mapFallback: string;
  mapHelp: string;
  locate: string;
  locating: string;
  locDenied: string;
  search: string;
  searchBtn: string;
  allReports: string;
  highPriority: string;
  inProgress: string;
  resolved: string;
  startWork: string;
  resolveWithPhoto: string;
  viewEvidence: string;
  deleteReport: string;
  noReportsYet: string;
  logOut: string;
  useMyLocation: string;
  chooseHazard: string;
  immediateDanger: string;
  publicRisk: string;
  minorIssue: string;
  demoDataBadge: string;
  prototypeNotice: string;
}

export const translations: Record<LanguageCode, AppTranslation> = {
  en: {
    workspace: 'Workspace',
    home: 'Home',
    report: 'Report',
    issues: 'My reports',
    profile: 'Profile',
    greetingStatic: 'Safer streets start with you.',
    reportTitle: 'Report a hazard',
    hazardType: 'Hazard type *',
    severity: 'Severity *',
    location: 'Location / landmark *',
    description: 'What did you notice?',
    photo: 'Photo evidence (optional)',
    coordinates: 'Coordinates (optional)',
    submit: 'Submit report →',
    safety: 'Safety first: do not approach exposed wires, open manholes, or moving traffic to take a photo. This prototype does not contact emergency services.',
    quick: 'Quick actions',
    recent: 'Recent reports',
    myReports: 'My reports',
    speak: '🎙 Speak',
    listening: '🔴 Listening…',
    voiceHelp: 'Tap Speak and talk; recognized words will be added to the field.',
    mapTitle: 'Neighborhood hazard map',
    mapSubtitle: 'Overview of active community reports',
    mapLoading: 'Loading interactive map…',
    mapFallback: 'The map could not load. Check your internet connection and reload this page.',
    mapHelp: 'Map data © OpenStreetMap contributors. Coordinates will pinpoint the hazard on the map.',
    locate: 'My location',
    locating: 'Finding your location…',
    locDenied: 'Location is unavailable or permission was denied. You can still pan and zoom the map.',
    search: 'Search a place or address…',
    searchBtn: 'Search',
    allReports: 'All reports',
    highPriority: 'High priority',
    inProgress: 'In progress',
    resolved: 'Resolved',
    startWork: 'Start work',
    resolveWithPhoto: 'Resolve + photo',
    viewEvidence: 'View evidence',
    deleteReport: 'Delete',
    noReportsYet: 'No reports yet. Start by reporting a hazard.',
    logOut: 'Log out',
    useMyLocation: 'Use my location',
    chooseHazard: 'Choose hazard',
    immediateDanger: 'High — immediate danger',
    publicRisk: 'Medium — public risk',
    minorIssue: 'Low — minor issue',
    demoDataBadge: 'Demo Data',
    prototypeNotice: 'Sadak Saathi is a civic prototype. Reports are saved in this browser only. No emergency services are alerted.',
  },
  hi: {
    workspace: 'कार्यस्थल',
    home: 'होम',
    report: 'रिपोर्ट करें',
    issues: 'मेरी रिपोर्ट',
    profile: 'प्रोफ़ाइल',
    greetingStatic: 'सुरक्षित सड़कें, आपकी भागीदारी से।',
    reportTitle: 'खतरे की रिपोर्ट करें',
    hazardType: 'खतरे का प्रकार *',
    severity: 'गंभीरता *',
    location: 'स्थान / पहचान *',
    description: 'आपने क्या देखा?',
    photo: 'फ़ोटो (वैकल्पिक)',
    coordinates: 'निर्देशांक (वैकल्पिक)',
    submit: 'रिपोर्ट भेजें →',
    safety: 'सुरक्षा पहले: खुले तारों, खुले मैनहोल या चलते ट्रैफ़िक के पास फ़ोटो लेने न जाएँ। यह प्रोटोटाइप आपातकालीन सेवाओं को सूचित नहीं करता।',
    quick: 'त्वरित विकल्प',
    recent: 'हाल की रिपोर्ट',
    myReports: 'मेरी रिपोर्ट',
    speak: '🎙 बोलें',
    listening: '🔴 सुन रहे हैं…',
    voiceHelp: 'बोलें बटन दबाकर बोलें; पहचाने गए शब्द फ़ील्ड में जुड़ेंगे।',
    mapTitle: 'मोहल्ला सड़क सुरक्षा मानचित्र',
    mapSubtitle: 'सक्रिय सड़क खतरों का वास्तविक दृश्य',
    mapLoading: 'इंटरैक्टिव मानचित्र लोड हो रहा है…',
    mapFallback: 'मानचित्र लोड नहीं हुआ। इंटरनेट जाँचें और पेज फिर से खोलें।',
    mapHelp: 'मानचित्र डेटा © OpenStreetMap योगदानकर्ता। निर्देशांक वाले खतरे सीधे मानचित्र पर दिखेंगे।',
    locate: 'मेरी लोकेशन',
    locating: 'आपकी लोकेशन खोज रहे हैं…',
    locDenied: 'लोकेशन उपलब्ध नहीं है या अनुमति नहीं मिली। आप मानचित्र को चला सकते हैं।',
    search: 'स्थान या पता खोजें…',
    searchBtn: 'खोजें',
    allReports: 'कुल रिपोर्ट',
    highPriority: 'अति आवश्यक',
    inProgress: 'प्रगति में',
    resolved: 'समाधान हुआ',
    startWork: 'काम शुरू करें',
    resolveWithPhoto: 'समाधान + फ़ोटो',
    viewEvidence: 'प्रमाण देखें',
    deleteReport: 'हटाएँ',
    noReportsYet: 'अभी कोई रिपोर्ट नहीं है। सड़क खतरे की रिपोर्ट करें।',
    logOut: 'लॉग आउट',
    useMyLocation: 'मेरी लोकेशन उपयोग करें',
    chooseHazard: 'खतरा चुनें',
    immediateDanger: 'उच्च — तत्काल खतरा',
    publicRisk: 'मध्यम — सार्वजनिक जोखिम',
    minorIssue: 'कम — सामान्य समस्या',
    demoDataBadge: 'डेमो डेटा',
    prototypeNotice: 'सड़क साथी एक नागरिक प्रोटोटाइप है। रिपोर्ट केवल इस ब्राउज़र में सहेजी जाती हैं।',
  },
  kn: {
    workspace: 'ಕಾರ್ಯಸ್ಥಳ',
    home: 'ಮುಖಪುಟ',
    report: 'ವರದಿ',
    issues: 'ನನ್ನ ವರದಿಗಳು',
    profile: 'ಪ್ರೊಫೈಲ್',
    greetingStatic: 'ಸುರಕ್ಷಿತ ರಸ್ತೆಗಳು ನಿಮ್ಮಿಂದ ಆರಂಭ.',
    reportTitle: 'ಅಪಾಯವನ್ನು ವರದಿ ಮಾಡಿ',
    hazardType: 'ಅಪಾಯದ ಪ್ರಕಾರ *',
    severity: 'ತೀವ್ರತೆ *',
    location: 'ಸ್ಥಳ / ಗುರುತು *',
    description: 'ನೀವು ಏನು ಗಮನಿಸಿದ್ದೀರಿ?',
    photo: 'ಫೋಟೋ (ಐಚ್ಛಿಕ)',
    coordinates: 'ಸ್ಥಳಾಂಕಗಳು (ಐಚ್ಛಿಕ)',
    submit: 'ವರದಿ ಸಲ್ಲಿಸಿ →',
    safety: 'ಸುರಕ್ಷತೆ ಮೊದಲು: ವಿದ್ಯುತ್ ತಂತಿ, ತೆರೆದ ಮ್ಯಾನ್‌ಹೋಲ್ ಅಥವಾ ಸಂಚಾರದ ಹತ್ತಿರ ಹೋಗಬೇಡಿ.',
    quick: 'ತ್ವರಿತ ಆಯ್ಕೆಗಳು',
    recent: 'ಇತ್ತೀಚಿನ ವರದಿಗಳು',
    myReports: 'ನನ್ನ ವರದಿಗಳು',
    speak: '🎙 ಮಾತನಾಡಿ',
    listening: '🔴 ಆಲಿಸುತ್ತಿದೆ…',
    voiceHelp: 'ಮಾತನಾಡಿ ಬಟನ್ ಒತ್ತಿ ಮಾತನಾಡಿ; ಗುರುತಿಸಿದ ಪದಗಳು ಇಲ್ಲಿ ಸೇರುತ್ತವೆ.',
    mapTitle: 'ಬಡಾವಣೆಯ ಅಪಾಯದ ನಕ್ಷೆ',
    mapSubtitle: 'ಸಮುದಾಯದ ವರದಿಗಳ ಪಕ್ಷಿನೋಟ',
    mapLoading: 'ಸಂವಾದಾತ್ಮಕ ನಕ್ಷೆ ಲೋಡ್ ಆಗುತ್ತಿದೆ…',
    mapFallback: 'ನಕ್ಷೆ ಲೋಡ್ ಆಗಲಿಲ್ಲ. ಇಂಟರ್ನೆಟ್ ಪರಿಶೀಲಿಸಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    mapHelp: 'ನಕ್ಷೆ ಡೇಟಾ © OpenStreetMap ಕೊಡುಗೆದಾರರು.',
    locate: 'ನನ್ನ ಸ್ಥಳ',
    locating: 'ನಿಮ್ಮ ಸ್ಥಳ ಹುಡುಕಲಾಗುತ್ತಿದೆ…',
    locDenied: 'ಸ್ಥಳ ಲಭ್ಯವಿಲ್ಲ ಅಥವಾ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ.',
    search: 'ಸ್ಥಳ ಅಥವಾ ವಿಳಾಸ ಹುಡುಕಿ…',
    searchBtn: 'ಹುಡುಕಿ',
    allReports: 'ಎಲ್ಲಾ ವರದಿಗಳು',
    highPriority: 'ಹೆಚ್ಚು ತುರ್ತು',
    inProgress: 'ಪ್ರಗತಿಯಲ್ಲಿದೆ',
    resolved: 'ಪರಿಹರಿಸಲಾಗಿದೆ',
    startWork: 'ಕೆಲಸ ಪ್ರಾರಂಭಿಸಿ',
    resolveWithPhoto: 'ಪರಿಹಾರ + ಫೋಟೋ',
    viewEvidence: 'ಸಾಕ್ಷ್ಯ ವೀಕ್ಷಿಸಿ',
    deleteReport: 'ಅಳಿಸಿ',
    noReportsYet: 'ಇನ್ನೂ ವರದಿಗಳಿಲ್ಲ. ಅಪಾಯವನ್ನು ವರದಿ ಮಾಡಿ.',
    logOut: 'ಲಾಗ್ ಔಟ್',
    useMyLocation: 'ನನ್ನ ಸ್ಥಳ ಬಳಸಿ',
    chooseHazard: 'ಅಪಾಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    immediateDanger: 'ಹೆಚ್ಚು — ತಕ್ಷಣದ ಅಪಾಯ',
    publicRisk: 'ಮಧ್ಯಮ — ಸಾರ್ವಜನಿಕ ಅಪಾಯ',
    minorIssue: 'ಕಡಿಮೆ — ಸಣ್ಣ ಸಮಸ್ಯೆ',
    demoDataBadge: 'ಡೆಮೊ ಮಾಹಿತಿ',
    prototypeNotice: 'ಸಡಕ್ ಸಾಥಿ ಒಂದು ಮಾದರಿ ತಂತ್ರಾಂಶ. ವರದಿಗಳು ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮಾತ್ರ ಸಂಗ್ರಹವಾಗುತ್ತವೆ.',
  },
  ta: {
    workspace: 'பணிப்பகுதி',
    home: 'முகப்பு',
    report: 'புகார்',
    issues: 'என் புகார்கள்',
    profile: 'சுயவிவரம்',
    greetingStatic: 'பாதுகாப்பான சாலைகள் உங்களிடமிருந்து தொடங்கும்.',
    reportTitle: 'ஆபத்தைப் புகாரளிக்கவும்',
    hazardType: 'ஆபத்து வகை *',
    severity: 'தீவிரம் *',
    location: 'இடம் / அடையாளம் *',
    description: 'நீங்கள் என்ன கவனித்தீர்கள்?',
    photo: 'புகைப்படம் (விருப்பம்)',
    coordinates: 'ஆயத்தொலைவுகள் (விருப்பம்)',
    submit: 'புகாரை சமர்ப்பிக்கவும் →',
    safety: 'முதலில் பாதுகாப்பு: மின்கம்பிகள், திறந்த மேன்ஹோல்கள் அல்லது போக்குவரத்துக்கு அருகில் செல்ல வேண்டாம்.',
    quick: 'விரைவு செயல்கள்',
    recent: 'சமீபத்திய புகார்கள்',
    myReports: 'என் புகார்கள்',
    speak: '🎙 பேசவும்',
    listening: '🔴 கேட்கிறது…',
    voiceHelp: 'பேசவும் என்பதை அழுத்தி பேசுங்கள்; அறியப்பட்ட சொற்கள் இங்கே சேர்க்கப்படும்.',
    mapTitle: 'பகுதி சாலை பாதுகாப்பு வரைபடம்',
    mapSubtitle: 'செயலில் உள்ள புகார்களின் கண்ணோட்டம்',
    mapLoading: 'ஊடாடும் வரைபடம் ஏற்றப்படுகிறது…',
    mapFallback: 'வரைபடத்தை ஏற்ற முடியவில்லை. இணையத்தைச் சரிபார்க்கவும்.',
    mapHelp: 'வரைபடத் தரவு © OpenStreetMap பங்களிப்பாளர்கள்.',
    locate: 'என் இருப்பிடம்',
    locating: 'இருப்பிடம் கண்டறியப்படுகிறது…',
    locDenied: 'இருப்பிடம் கிடைக்கவில்லை அல்லது அனுமதி மறுக்கப்பட்டது.',
    search: 'இடம் அல்லது முகவரியைத் தேடுங்கள்…',
    searchBtn: 'தேடு',
    allReports: 'அனைத்து புகார்கள்',
    highPriority: 'அதிக முன்னுரிமை',
    inProgress: 'நடைபெறுகிறது',
    resolved: 'தீர்க்கப்பட்டது',
    startWork: 'பணியைத் தொடங்கு',
    resolveWithPhoto: 'தீர்வு + படம்',
    viewEvidence: 'சான்றைக் காண்க',
    deleteReport: 'நீக்கு',
    noReportsYet: 'அறிக்கைகள் இல்லை. சாலை ஆபத்தைப் புகாரளிக்கவும்.',
    logOut: 'வெளியேறு',
    useMyLocation: 'என் இருப்பிடத்தைப் பயன்படுத்து',
    chooseHazard: 'ஆபத்தைத் தேர்வுசெய்க',
    immediateDanger: 'அதிகம் — உடனடி ஆபத்து',
    publicRisk: 'நடுத்தரம் — பொது ஆபத்து',
    minorIssue: 'குறைவு — சிறிய சிக்கல்',
    demoDataBadge: 'டெமோ தரவு',
    prototypeNotice: 'சடக் சாதி ஒரு மாதிரி தளம். அறிக்கைகள் இந்த உலாவியில் மட்டுமே சேமிக்கப்படுகின்றன.',
  },
  te: {
    workspace: 'పని ప్రదేశం',
    home: 'హోమ్',
    report: 'నివేదించండి',
    issues: 'నా నివేదికలు',
    profile: 'ప్రొఫైల్',
    greetingStatic: 'సురక్షిత రహదారులు మీతోనే ప్రారంభమవుతాయి.',
    reportTitle: 'ప్రమాదాన్ని నివేదించండి',
    hazardType: 'ప్రమాద రకం *',
    severity: 'తీవ్రత *',
    location: 'ప్రదేశం / గుర్తింపు *',
    description: 'మీరు ఏమి గమనించారు?',
    photo: 'ఫోటో (ఐచ్ఛికం)',
    coordinates: 'కోఆర్డినేట్లు (ఐచ్ఛికం)',
    submit: 'నివేదిక సమర్పించండి →',
    safety: 'భద్రత ముఖ్యం: విద్యుత్ తీగలు, తెరిచి ఉన్న మ్యాన్‌హోల్‌లు లేదా ట్రాఫిక్ దగ్గరకు వెళ్లవద్దు.',
    quick: 'త్వరిత చర్యలు',
    recent: 'ఇటీవలి నివేదికలు',
    myReports: 'నా నివేదికలు',
    speak: '🎙 మాట్లాడండి',
    listening: '🔴 వింటోంది…',
    voiceHelp: 'మాట్లాడండి బటన్ నొక్కి చెప్పండి; గుర్తించిన పదాలు ఇక్కడ చేరతాయి.',
    mapTitle: 'ప్రాంతపు ప్రమాదాల మ్యాప్',
    mapSubtitle: 'యాక్టివ్ కమ్యూనిటీ నివేదికల అవలోకనం',
    mapLoading: 'ఇంటరాక్టివ్ మ్యాప్ లోడ్ అవుతోంది…',
    mapFallback: 'మ్యాప్ లోడ్ కాలేదు. ఇంటర్నెట్‌ను తనిఖీ చేయండి.',
    mapHelp: 'మ్యాప్ డేటా © OpenStreetMap సహకారులు.',
    locate: 'నా స్థానం',
    locating: 'మీ స్థానాన్ని కనుగొంటోంది…',
    locDenied: 'స్థానం అందుబాటులో లేదు లేదా అనుమతి నిరాకరించబడింది.',
    search: 'ప్రదేశం లేదా చిరునామా వెతకండి…',
    searchBtn: 'వెతకండి',
    allReports: 'మొత్తం నివేదికలు',
    highPriority: 'అత్యవసరం',
    inProgress: 'పురోగతిలో ఉంది',
    resolved: 'పరిష్కరించబడింది',
    startWork: 'పని ప్రారంభించండి',
    resolveWithPhoto: 'పరిష్కారం + ఫోటో',
    viewEvidence: 'రుజువు చూడండి',
    deleteReport: 'తొలగించు',
    noReportsYet: 'ఇంకా నివేదికలు లేవు. రహదారి ప్రమాదాన్ని నివేదించండి.',
    logOut: 'లాగ్ అవుట్',
    useMyLocation: 'నా స్థానాన్ని వాడండి',
    chooseHazard: 'ప్రమాదాన్ని ఎంచుకోండి',
    immediateDanger: 'అధిక — తక్షణ ప్రమాదం',
    publicRisk: 'మధ్యస్థ — ప్రజా ప్రమాదం',
    minorIssue: 'తక్కువ — చిన్న సమస్య',
    demoDataBadge: 'డెమో డేటా',
    prototypeNotice: 'సడక్ సాథి ఒక నమూనా వేదిక. నివేదికలు ఈ బ్రౌజర్‌లో మాత్రమే నిల్వ చేయబడతాయి.',
  },
};
