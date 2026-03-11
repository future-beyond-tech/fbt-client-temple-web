import { useState, useEffect, useRef } from "react";
import qrImage from "./QR.jpeg";
import receiptImage from "./Receipt.jpeg";

const translations = {
  en: {
    nav: "Jai Maa Kali Mandir, Birnia",
    tagline: "Divine Renovation • Sacred Renewal",
    heroTitle: "Rebuild the Abode of",
    heroHighlight: "Maa Durga",
    heroSub: "Join us in the sacred mission to renovate and restore the divine Jai Maa Kali Mandir. Every contribution brings us closer to creating a magnificent spiritual sanctuary for generations to come.",
    donateNow: "Donate Now",
    viewDonors: "View Donors",
    aboutTitle: "About the Renovation",
    aboutP1: "For centuries, the Jai Maa Kali Mandir has been a beacon of spiritual light and devotion. The temple, originally built over 200 years ago, has served as a sacred sanctuary for millions of devotees seeking the divine blessings of Maa Durga.",
    aboutP2: "Due to natural wear and the passage of time, the temple structure requires significant restoration and renovation. Our vision is to renew this divine abode into a magnificent spiritual complex that honors the ancient traditions while providing modern facilities for devotees.",
    aboutP3: "The renovation project includes restoration of the main sanctum, construction of new prayer halls, renovation of the temple gopuram, landscaping of the temple premises, and installation of proper drainage and lighting systems.",
    oldTemple: "Current Temple",
    oldTempleDesc: "The existing temple structure showing signs of age and wear, requiring urgent restoration to preserve its sacred heritage.",
    newTemple: "Proposed New Temple",
    newTempleDesc: "The envisioned magnificently renovated temple — a divine masterpiece blending ancient architecture with modern amenities.",
    donateTitle: "Make a Sacred Offering",
    donateSub: "Scan the QR code below to make your divine contribution. Every offering, big or small, brings us closer to realizing this sacred vision.",
    scanQR: "Scan to Donate",
    qrNote: "Scan this QR code with any UPI app (Google Pay, PhonePe, Paytm) to make your sacred offering",
    afterPayment: "After Making Your Offering (Jai Maa Kali Mandir, Birnia)",
    afterPaymentDesc: "After completing your donation, please send a screenshot of the payment confirmation along with your full name, phone number, and address via WhatsApp to the number below:",
    whatsappPlace: "Jai Maa Kali Mandir, Birnia",
    whatsappName: "Dheeraj Kumar",
    whatsappNumber: "+91 99114 14416",
    whatsappNote: "Our temple committee will acknowledge your donation and add your name to our sacred donor records within 24 hours.",
    donorsTitle: "Sacred Donor Records",
    donorsSub: "We maintain complete transparency. View the full list of all devotees who have contributed to this divine cause.",
    viewSheet: "View Donation Records (Excel)",
    donorsNote: "This sheet is updated regularly with all verified donations. Your name will appear within 24 hours of verification.",
    totalRaised: "Total Raised",
    totalGoal: "Goal Amount",
    totalDonors: "Blessed Donors",
    daysLeft: "Days Remaining",
    committeeTitle: "Temple Treasurer",
    member1: "Shri Arvind Singh",
    member1Role: "कोषाध्यक्ष (Treasurer)",
    blessingLine: "With the blessings of Maa Kali and the generous support of the villagers of Birnia (Post–Jotha, Dhoraiya, Banka, Bihar-813109).",
    footerText: "Jai Maa Kali Mandir Renovation Trust",
    footerAddress: "Village Birnia, Post–Jotha, Dhoraiya, Banka, Bihar - 813109",
    footerRights: "© 2024 All Rights Reserved. Built with devotion.",
    langLabel: "Language",
    progressLabel: "Renovation Progress",
    reasonTitle: "Reason to Donate",
    reasonP1: "The existing Maa Kali Mandir is very old and its structure has weakened over time. During the rainy season, road water enters the temple premises, which creates difficulty for devotees and affects the sanctity of the temple.",
    reasonP2: "Therefore, with the blessings of Maa Kali and the support of all villagers, we are planning to reconstruct and uplift the temple roof with proper pillars so that the temple remains safe, strong, and protected for future generations.",
    noticeLabel: "Notice Message",
    noticeTitle: "Important Notice:",
    noticeP1: "We will collect donations only until the required amount for the construction is achieved.",
    noticeP2: "Once sufficient funds are collected, no further donations will be requested.",
    viewDonorList: "Total Fund Received",
    depositedLabel: "Confirmed Depositors",
    pendingLabel: "Yet to Deposit",
    closeModal: "Close",
    loadingDonors: "Loading donor data...",
    fetchError: "Could not load data. Please open the spreadsheet directly.",
    amountLabel: "Amount",
    noDonors: "No confirmed donors yet.",
    noPending: "No pending entries.",
  },
  hi: {
    nav: "जय माँ काली मंदिर, बिरनिया",
    tagline: "दिव्य नवीनीकरण • पवित्र नवीनीकरण",
    heroTitle: "का धाम पुनर्निर्माण करें",
    heroHighlight: "माँ दुर्गा",
    heroSub: "जय माँ काली मंदिर के नवीनीकरण और जीर्णोद्धार के पवित्र मिशन में हमारे साथ जुड़ें। हर योगदान आने वाली पीढ़ियों के लिए एक भव्य आध्यात्मिक अभयारण्य बनाने के करीब लाता है।",
    donateNow: "अभी दान करें",
    viewDonors: "दाताओं को देखें",
    aboutTitle: "नवीनीकरण के बारे में",
    aboutP1: "सदियों से, जय माँ काली मंदिर आध्यात्मिक प्रकाश और भक्ति का प्रतीक रहा है। 200 से अधिक वर्ष पहले निर्मित यह मंदिर माँ काली के दिव्य आशीर्वाद की कामना करने वाले लाखों भक्तों के लिए एक पवित्र अभयारण्य रहा है।",
    aboutP2: "प्राकृतिक क्षरण और समय बीतने के कारण, मंदिर संरचना को महत्वपूर्ण जीर्णोद्धार और पुनर्निर्माण की आवश्यकता है। हमारी दृष्टि इस दिव्य धाम को एक भव्य आध्यात्मिक परिसर में पुनर्निर्मित करना है।",
    aboutP3: "पुनर्निर्माण परियोजना में मुख्य गर्भगृह की बहाली, नए प्रार्थना हॉल का निर्माण, मंदिर गोपुरम का नवीनीकरण, और आधुनिक सुविधाओं की स्थापना शामिल है।",
    oldTemple: "वर्तमान मंदिर",
    oldTempleDesc: "मौजूदा मंदिर संरचना जो समय के साथ जीर्ण हो गई है, इसकी पवित्र विरासत को संरक्षित करने के लिए तत्काल जीर्णोद्धार की आवश्यकता है।",
    newTemple: "प्रस्तावित नया मंदिर",
    newTempleDesc: "कल्पित भव्य नवीनीकृत मंदिर — प्राचीन वास्तुकला और आधुनिक सुविधाओं का दिव्य मिश्रण।",
    donateTitle: "पवित्र दान करें",
    donateSub: "अपना दिव्य योगदान देने के लिए नीचे दिए गए QR कोड को स्कैन करें। हर चढ़ावा इस पवित्र दृष्टि को साकार करने के करीब लाता है।",
    scanQR: "दान के लिए स्कैन करें",
    qrNote: "अपना पवित्र चढ़ावा देने के लिए किसी भी UPI ऐप से इस QR कोड को स्कैन करें",
    afterPayment: "दान करने के बाद (जय माँ काली मंदिर, बिरनिया)",
    afterPaymentDesc: "दान पूरा करने के बाद, कृपया भुगतान पुष्टि का स्क्रीनशॉट अपने पूरे नाम, फोन नंबर और पते के साथ नीचे दिए गए नंबर पर व्हाट्सएप करें:",
    whatsappPlace: "जय माँ काली मंदिर, बिरनिया",
    whatsappName: "धीरज कुमार",
    whatsappNumber: "+91 99114 14416",
    whatsappNote: "हमारी मंदिर समिति 24 घंटे के भीतर आपके दान की पुष्टि करेगी और आपका नाम पवित्र दाता रिकॉर्ड में जोड़ेगी।",
    donorsTitle: "पवित्र दाता रिकॉर्ड",
    donorsSub: "हम पूर्ण पारदर्शिता बनाए रखते हैं। इस दिव्य कार्य में योगदान देने वाले सभी भक्तों की पूरी सूची देखें।",
    viewSheet: "दान रिकॉर्ड देखें (Excel)",
    donorsNote: "यह शीट सभी सत्यापित दानों के साथ नियमित रूप से अपडेट की जाती है।",
    totalRaised: "कुल एकत्रित",
    totalGoal: "लक्ष्य राशि",
    totalDonors: "आशीर्वादित दाता",
    daysLeft: "शेष दिन",
    committeeTitle: "मंदिर कोषाध्यक्ष",
    member1: "श्री अरविंद सिंह",
    member1Role: "कोषाध्यक्ष (Treasurer)",
    blessingLine: "माँ काली की कृपा और बिरनिया ग्राम (पोस्ट–जोत्था, धोरैया, बांका, बिहार-813109) के ग्रामवासियों के उदार सहयोग से।",
    footerText: "जय माँ काली मंदिर नवीनीकरण ट्रस्ट",
    footerAddress: "ग्राम बिरनिया, पोस्ट–जोत्था, धोरैया, बांका, बिहार - 813109",
    footerRights: "© 2024 सर्वाधिकार सुरक्षित। भक्ति से निर्मित।",
    langLabel: "भाषा",
    progressLabel: "नवीनीकरण प्रगति",
    reasonTitle: "दान करने का कारण",
    reasonP1: "वर्तमान माँ काली मंदिर बहुत पुराना हो चुका है और समय के साथ इसकी संरचना कमजोर हो गई है। बरसात के मौसम में सड़क का पानी मंदिर परिसर में आ जाता है, जिससे भक्तों को परेशानी होती है और मंदिर की पवित्रता पर भी प्रभाव पड़ता है।",
    reasonP2: "इसीलिए माँ काली की कृपा और सभी ग्रामवासियों के सहयोग से हम मंदिर की छत को मज़बूत खंभों के साथ ऊँचा कर पुनर्निर्माण करने की योजना बना रहे हैं, ताकि यह मंदिर आने वाली पीढ़ियों के लिए सुरक्षित, मजबूत और संरक्षित रह सके।",
    noticeLabel: "सूचना संदेश",
    noticeTitle: "महत्वपूर्ण सूचना:",
    noticeP1: "निर्माण कार्य के लिए जितनी राशि की आवश्यकता है, केवल उतनी ही राशि तक दान एकत्र किया जाएगा।",
    noticeP2: "जब पर्याप्त धनराशि एकत्र हो जाएगी, उसके बाद किसी प्रकार का अतिरिक्त दान नहीं लिया जाएगा।",
    viewDonorList: "कुल प्राप्त राशि",
    depositedLabel: "जमा किए गए दाता",
    pendingLabel: "अभी जमा नहीं",
    closeModal: "बंद करें",
    loadingDonors: "डेटा लोड हो रहा है...",
    fetchError: "डेटा लोड नहीं हो सका। कृपया स्प्रेडशीट सीधे खोलें।",
    amountLabel: "राशि",
    noDonors: "अभी कोई पुष्ट दाता नहीं।",
    noPending: "कोई लंबित प्रविष्टि नहीं।",
  },
  te: {
    nav: "జై మా కాలి ఆలయం, బిర్నియా",
    tagline: "దివ్య పునర్వ్యవస్థీకరణ • పవిత్ర నవీకరణ",
    heroTitle: "యొక్క నివాసాన్ని పునర్నిర్మించండి",
    heroHighlight: "అమ్మవారు దుర్గా",
    heroSub: "జై మా కాలి ఆలయాన్ని నూతనీకరించే పవిత్ర మిషన్‌లో మాతో చేరండి. ప్రతి సహకారం రాబోయే తరాలకు ఒక అద్భుతమైన ఆధ్యాత్మిక ఆశ్రయాన్ని సృష్టించడానికి మనల్ని దగ్గరగా తీసుకువస్తుంది.",
    donateNow: "ఇప్పుడు దానం చేయండి",
    viewDonors: "దాతలను చూడండి",
    aboutTitle: "పునర్వ్యవస్థీకరణ (Renovation) గురించి",
    aboutP1: "శతాబ్దాలుగా, జై మా కాలి ఆలయం ఆధ్యాత్మిక వెలుగు మరియు భక్తి యొక్క దీపస్తంభంగా ఉంది. 200 సంవత్సరాల కిందట నిర్మించబడిన ఈ ఆలయం లక్షలాది భక్తులకు పవిత్ర ఆశ్రయంగా ఉంది.",
    aboutP2: "సహజ క్షీణత మరియు కాలం గడవడం వలన, ఆలయ నిర్మాణానికి గణనీయమైన పునరుద్ధరణ అవసరం. ఈ దివ్య నివాసాన్ని అద్భుతమైన ఆధ్యాత్మిక సముదాయంగా పునర్నిర్మించడం మా దృష్టి.",
    aboutP3: "పునర్నిర్మాణ ప్రాజెక్ట్‌లో ప్రధాన గర్భగృహ పునరుద్ధరణ, కొత్త ప్రార్థనా మందిరాల నిర్మాణం, ఆలయ గోపురం నవీకరణ మరియు ఆధునిక సౌకర్యాల ఏర్పాటు ఉన్నాయి.",
    oldTemple: "ప్రస్తుత ఆలయం",
    oldTempleDesc: "కాలం గడవడంతో శిథిలమైన ఆలయ నిర్మాణం, దాని పవిత్ర వారసత్వాన్ని సంరక్షించడానికి తక్షణ పునరుద్ధరణ అవసరం.",
    newTemple: "ప్రతిపాదిత కొత్త ఆలయం",
    newTempleDesc: "ఊహించిన అద్భుతమైన పునర్నిర్మిత ఆలయం — ప్రాచీన వాస్తుశిల్పం మరియు ఆధునిక సౌకర్యాల దివ్య మిశ్రమం.",
    donateTitle: "పవిత్ర అర్పణ చేయండి",
    donateSub: "మీ దివ్య సహకారం అందించడానికి క్రింది QR కోడ్‌ను స్కాన్ చేయండి. ప్రతి అర్పణ ఈ పవిత్ర దృష్టిని సాకారం చేయడానికి మనల్ని దగ్గరగా తీసుకువస్తుంది.",
    scanQR: "దానం కోసం స్కాన్ చేయండి",
    qrNote: "మీ పవిత్ర అర్పణ చేయడానికి ఏదైనా UPI యాప్‌తో ఈ QR కోడ్‌ను స్కాన్ చేయండి",
    afterPayment: "మీ అర్పణ చేసిన తర్వాత (జై మా కాలి మందిరం, బిర్నియా)",
    afterPaymentDesc: "దానం పూర్తి చేసిన తర్వాత, దయచేసి చెల్లింపు నిర్ధారణ స్క్రీన్‌షాట్‌ను మీ పూర్తి పేరు, ఫోన్ నంబర్ మరియు చిరునామాతో క్రింది నంబర్‌కు WhatsApp చేయండి:",
    whatsappPlace: "జై మా కాలి మందిరం, బిర్నియా",
    whatsappName: "ధీరజ్ కుమార్",
    whatsappNumber: "+91 99114 14416",
    whatsappNote: "మా ఆలయ కమిటీ 24 గంటల్లో మీ దానాన్ని నిర్ధారిస్తుంది మరియు మీ పేరును పవిత్ర దాత రికార్డులలో చేరుస్తుంది.",
    donorsTitle: "పవిత్ర దాత రికార్డులు",
    donorsSub: "మేము పూర్తి పారదర్శకతను కొనసాగిస్తాము. ఈ దివ్య కార్యానికి సహకరించిన భక్తుల పూర్తి జాబితాను చూడండి.",
    viewSheet: "దాన రికార్డులు చూడండి (Excel)",
    donorsNote: "ఈ షీట్ అన్ని ధృవీకరించబడిన దానాలతో క్రమం తప్పకుండా అప్‌డేట్ చేయబడుతుంది.",
    totalRaised: "మొత్తం సేకరించబడింది",
    totalGoal: "లక్ష్య మొత్తం",
    totalDonors: "ఆశీర్వదించబడిన దాతలు",
    daysLeft: "మిగిలిన రోజులు",
    committeeTitle: "ఆలయ ఖజాంచి",
    member1: "శ్రీ అర్వింద్ సింగ్",
    member1Role: "ఖజాంచి (Treasurer)",
    blessingLine: "మా కాలీ అమ్మ ఆశీర్వాదంతో మరియు బిర్నియా గ్రామ (పోస్ట్–జోతా, ధొరయ్యా, బాంకా, బీహార్-813109) గ్రామస్తుల ఉదార సహకారంతో.",
    footerText: "జై మా కాలి ఆలయ పునర్వ్యవస్థీకరణ ట్రస్ట్",
    footerAddress: "గ్రామం బిర్నియా, పోస్టు–జోతా, ధొరయ్యా, బాంకా, బీహార్ - 813109",
    footerRights: "© 2024 అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి. భక్తితో నిర్మించబడింది.",
    langLabel: "భాష",
    progressLabel: "పునర్వ్యవస్థీకరణ పురోగతి",
    reasonTitle: "దానం చేయడానికి కారణం",
    reasonP1: "ప్రస్తుతం ఉన్న మా కాళీ అమ్మ ఆలయం చాలా పాతది, కాలక్రమేణా దాని నిర్మాణం బలహీనమైంది. వర్షాకాలంలో రోడ్డు నీరు ఆలయ ప్రాంగణంలోకి వచ్చి, భక్తులకు ఇబ్బంది కలిగిస్తూ ఆలయ పవిత్రతపై ప్రభావం చూపుతోంది.",
    reasonP2: "అందువల్ల మా కాళీ అమ్మ ఆశీర్వాదంతో మరియు సమస్త గ్రామస్థుల సహకారంతో, ఆలయ పైకప్పును బలమైన స్తంభాలతో ఎత్తుగా పునర్నిర్మాణం చేయాలని సంకల్పించాము, తద్వారా ఈ ఆలయం భవిష్యత్ తరాల కోసం సురక్షితంగా, బలంగా మరియు రక్షితంగా ఉండగలదు.",
    noticeLabel: "ప్రకటన సందేశం",
    noticeTitle: "ముఖ్య ప్రకటన:",
    noticeP1: "నిర్మాణానికి అవసరమైన మొత్తం చేరేవరకు మాత్రమే దానాలు స్వీకరించబడతాయి.",
    noticeP2: "సరిపడిన నిధులు సేకరించిన తర్వాత, ఇకపై ఏ విధమైన దానం కోరబడదు.",
    viewDonorList: "Total Fund Received",
    depositedLabel: "Confirmed Depositors",
    pendingLabel: "Yet to Deposit",
    closeModal: "Close",
    loadingDonors: "Loading...",
    fetchError: "Could not load data. Please open the spreadsheet directly.",
    amountLabel: "Amount",
    noDonors: "No confirmed donors yet.",
    noPending: "No pending entries.",
  },
  mr: {
    nav: "जय माँ काली मंदिर, बिरनिया",
    tagline: "दिव्य नूतनीकरण • पवित्र नूतनीकरण",
    heroTitle: "चे धाम पुनर्बांधणी करा",
    heroHighlight: "माँ दुर्गा",
    heroSub: "जय माँ काली मंदिराच्या नूतनीकरणाच्या पवित्र मोहिमेत सामील व्हा. प्रत्येक योगदान येणाऱ्या पिढ्यांसाठी एक भव्य आध्यात्मिक अभयारण्य निर्माण करण्याच्या जवळ आणते.",
    donateNow: "आता दान करा",
    viewDonors: "दाते पहा",
    aboutTitle: "नूतनीकरणाबद्दल",
    aboutP1: "शतकानुशतके, जय माँ काली मंदिर हे आध्यात्मिक प्रकाश आणि भक्तीचे प्रतीक आहे. 200 वर्षांपूर्वी बांधलेले हे मंदिर लाखो भक्तांसाठी पवित्र अभयारण्य आहे.",
    aboutP2: "नैसर्गिक झीज आणि काळाच्या ओघामुळे, मंदिर संरचनेला महत्त्वपूर्ण जीर्णोद्धार आवश्यक आहे.",
    aboutP3: "पुनर्बांधणी प्रकल्पात मुख्य गर्भगृहाची पुनर्स्थापना, नवीन प्रार्थना सभागृहांचे बांधकाम आणि आधुनिक सुविधांची स्थापना समाविष्ट आहे.",
    oldTemple: "सध्याचे मंदिर",
    oldTempleDesc: "काळाच्या ओघात जीर्ण झालेली मंदिर रचना, तिच्या पवित्र वारशाचे जतन करण्यासाठी तातडीने जीर्णोद्धार आवश्यक.",
    newTemple: "प्रस्तावित नवीन मंदिर",
    newTempleDesc: "कल्पित भव्य पुनर्निर्मित मंदिर — प्राचीन वास्तुकला आणि आधुनिक सुविधांचे दिव्य मिश्रण.",
    donateTitle: "पवित्र अर्पण करा",
    donateSub: "तुमचे दिव्य योगदान देण्यासाठी खालील QR कोड स्कॅन करा.",
    scanQR: "दानासाठी स्कॅन करा",
    qrNote: "तुमचे पवित्र अर्पण करण्यासाठी कोणत्याही UPI अॅपने हा QR कोड स्कॅन करा",
    afterPayment: "दान केल्यानंतर (जय माँ काली मंदिर, बिरनिया)",
    afterPaymentDesc: "दान पूर्ण केल्यानंतर, कृपया पेमेंट पुष्टीकरणाचा स्क्रीनशॉट तुमचे पूर्ण नाव, फोन नंबर आणि पत्त्यासह खालील नंबरवर WhatsApp करा:",
    whatsappPlace: "जय माँ काली मंदिर, बिरनिया",
    whatsappName: "धीरज कुमार",
    whatsappNumber: "+91 99114 14416",
    whatsappNote: "आमची मंदिर समिती 24 तासांत तुमच्या दानाची पुष्टी करेल.",
    donorsTitle: "पवित्र दाता नोंदी",
    donorsSub: "आम्ही पूर्ण पारदर्शकता राखतो. या दिव्य कार्यात योगदान दिलेल्या सर्व भक्तांची यादी पहा.",
    viewSheet: "दान नोंदी पहा (Excel)",
    donorsNote: "ही शीट सर्व सत्यापित दानांसह नियमितपणे अपडेट केली जाते.",
    totalRaised: "एकूण जमा",
    totalGoal: "लक्ष्य रक्कम",
    totalDonors: "आशीर्वादित दाते",
    daysLeft: "उरलेले दिवस",
    committeeTitle: "मंदिर कोषाध्यक्ष",
    member1: "श्री अरविंद सिंह",
    member1Role: "कोषाध्यक्ष (Treasurer)",
    blessingLine: "माँ कालीच्या कृपेने आणि बिरनिया गाव (पोस्ट–जोत्था, धोरैया, बांका, बिहार-813109) येथील ग्रामस्थांच्या उदार सहकार्याने.",
    footerText: "जय माँ काली मंदिर नूतनीकरण ट्रस्ट",
    footerAddress: "गाव बिरनिया, पोस्ट–जोत्था, धोरैया, बांका, बिहार - 813109",
    footerRights: "© 2024 सर्व हक्क राखीव. भक्तीने निर्मित.",
    langLabel: "भाषा",
    progressLabel: "नूतनीकरण प्रगती",
    reasonTitle: "दान करण्याचे कारण",
    reasonP1: "सध्या असलेले माँ काली मंदिर अतिशय जुने झाले आहे आणि कालांतराने त्याची रचना कमकुवत झाली आहे. पावसाळ्यात रस्त्याचे पाणी मंदिर परिसरात येते, ज्यामुळे भक्तांना अडचण होते आणि मंदिराची पावित्र्यभावना बाधित होते.",
    reasonP2: "म्हणूनच, माँ कालीच्या कृपेने आणि सर्व ग्रामस्थांच्या सहकार्याने आम्ही योग्य खांबांसह मंदिराची छत उंच करून त्याचे पुनर्बांधकाम करण्याचा संकल्प केला आहे, जेणेकरून हे मंदिर भावी पिढ्यांसाठी सुरक्षित, मजबूत आणि संरक्षित राहील.",
    noticeLabel: "सूचना संदेश",
    noticeTitle: "महत्वाची सूचना:",
    noticeP1: "बांधकामासाठी जितकी रक्कम आवश्यक आहे, तेवढ्याच रकमेपर्यंत दान स्वीकारले जाईल.",
    noticeP2: "पुरेशी निधी जमा झाल्यानंतर पुढे कोणतेही दान मागितले जाणार नाही.",
    viewDonorList: "Total Fund Received",
    depositedLabel: "Confirmed Depositors",
    pendingLabel: "Yet to Deposit",
    closeModal: "Close",
    loadingDonors: "Loading...",
    fetchError: "Could not load data. Please open the spreadsheet directly.",
    amountLabel: "Amount",
    noDonors: "No confirmed donors yet.",
    noPending: "No pending entries.",
  },
  bn: {
    nav: "জয় মা কালী মন্দির, বিরনিয়া",
    tagline: "দিব্য সংস্কার (Renovation) • পবিত্র নবায়ন",
    heroTitle: "এর আবাস পুনর্নির্মাণ করুন",
    heroHighlight: "মা দুর্গা",
    heroSub: "শ্রী দুর্গা আম্মা দেবীর দিব্য মন্দির পুনর্নির্মাণের পবিত্র মিশনে আমাদের সাথে যোগ দিন। প্রতিটি অবদান আগামী প্রজন্মের জন্য একটি মহিমান্বিত আধ্যাত্মিক অভয়ারণ্য তৈরির কাছাকাছি নিয়ে আসে।",
    donateNow: "এখনই দান করুন",
    viewDonors: "দাতাদের দেখুন",
    aboutTitle: "সংস্কার (Renovation) সম্পর্কে",
    aboutP1: "শতাব্দী ধরে, জয় মা কালী মন্দির আধ্যাত্মিক আলো এবং ভক্তির প্রতীক। ২০০ বছরেরও বেশি আগে নির্মিত এই মন্দির লক্ষ লক্ষ ভক্তের পবিত্র আশ্রয়স্থল।",
    aboutP2: "প্রাকৃতিক ক্ষয় এবং সময়ের কারণে, মন্দির কাঠামোর উল্লেখযোগ্য সংস্কার প্রয়োজন।",
    aboutP3: "পুনর্নির্মাণ প্রকল্পে মূল গর্ভগৃহ পুনরুদ্ধার, নতুন প্রার্থনা হল নির্মাণ এবং আধুনিক সুবিধা স্থাপন অন্তর্ভুক্ত।",
    oldTemple: "বর্তমান মন্দির",
    oldTempleDesc: "সময়ের সাথে জীর্ণ মন্দির কাঠামো, এর পবিত্র ঐতিহ্য সংরক্ষণের জন্য জরুরি সংস্কার প্রয়োজন।",
    newTemple: "প্রস্তাবিত নতুন মন্দির",
    newTempleDesc: "কল্পিত মহিমান্বিত পুনর্নির্মিত মন্দির — প্রাচীন স্থাপত্য এবং আধুনিক সুবিধার দিব্য মিশ্রণ।",
    donateTitle: "পবিত্র অর্পণ করুন",
    donateSub: "আপনার দিব্য অবদান দিতে নীচের QR কোড স্ক্যান করুন।",
    scanQR: "দানের জন্য স্ক্যান করুন",
    qrNote: "যেকোনো UPI অ্যাপ দিয়ে এই QR কোড স্ক্যান করুন",
    afterPayment: "দান করার পরে (জয় মা কালী মন্দির, বিরনিয়া)",
    afterPaymentDesc: "দান সম্পূর্ণ করার পর, অনুগ্রহ করে পেমেন্ট নিশ্চিতকরণের স্ক্রিনশট আপনার পুরো নাম, ফোন নম্বর এবং ঠিকানা সহ নীচের নম্বরে WhatsApp করুন:",
    whatsappPlace: "জয় মা কালী মন্দির, বিরনিয়া",
    whatsappName: "ধীরজ কুমার",
    whatsappNumber: "+91 99114 14416",
    whatsappNote: "আমাদের মন্দির কমিটি ২৪ ঘন্টার মধ্যে আপনার দান নিশ্চিত করবে।",
    donorsTitle: "পবিত্র দাতা রেকর্ড",
    donorsSub: "আমরা সম্পূর্ণ স্বচ্ছতা বজায় রাখি। এই দিব্য কাজে অবদানকারী সমস্ত ভক্তদের তালিকা দেখুন।",
    viewSheet: "দান রেকর্ড দেখুন (Excel)",
    donorsNote: "এই শীট সমস্ত যাচাইকৃত দান সহ নিয়মিত আপডেট করা হয়।",
    totalRaised: "মোট সংগৃহীত",
    totalGoal: "লক্ষ্য পরিমাণ",
    totalDonors: "আশীর্বাদিত দাতা",
    daysLeft: "বাকি দিন",
    committeeTitle: "মন্দির কোষাধ্যক্ষ",
    member1: "শ্রী অরবিন্দ সিংহ",
    member1Role: "কোষাধ্যক্ষ (Treasurer)",
    blessingLine: "মা কালীের আশীর্বাদ এবং বিরনিয়া গ্রামের (পোস্ট–জোঠা, ধোরাইয়া, বাঙ্কা, বিহার-৮১৩১০৯) গ্রামবাসীদের উদার সহযোগিতায়।",
    footerText: "জয় মা কালী মন্দির সংস্কার ট্রাস্ট",
    footerAddress: "গ্রাম বিরনিয়া, পোস্ট–জোঠা, ধোরাইয়া, বাঙ্কা, বিহার - ৮১৩১০৯",
    footerRights: "© 2024 সর্বস্বত্ব সংরক্ষিত। ভক্তি দিয়ে নির্মিত।",
    langLabel: "ভাষা",
    progressLabel: "সংস্কার অগ্রগতি",
    reasonTitle: "দান করার কারণ",
    reasonP1: "বর্তমান মা কালী মন্দিরটি অনেক পুরনো এবং সময়ের সাথে সাথে এর কাঠামো দুর্বল হয়ে পড়েছে। বর্ষাকালে রাস্তার জল মন্দির প্রাঙ্গণে ঢুকে পড়ে, যার ফলে ভক্তদের অসুবিধা হয় এবং মন্দিরের পবিত্রতাও নষ্ট হয়।",
    reasonP2: "তাই মা কালীের আশীর্বাদে এবং সকল গ্রামবাসীর সহযোগিতায় আমরা মন্দিরের ছাদটি মজবুত স্তম্ভসহ উঁচু করে পুনর্নির্মাণের পরিকল্পনা করছি, যাতে ভবিষ্যৎ প্রজন্মের জন্য মন্দিরটি নিরাপদ, সবল ও সুরক্ষিত থাকে।",
    noticeLabel: "নোটিশ বার্তা",
    noticeTitle: "গুরুত্বপূর্ণ নোটিশ:",
    noticeP1: "নির্মাণের জন্য যতটুকু অর্থের প্রয়োজন, কেবল সেই পরিমাণ পর্যন্তই দান সংগ্রহ করা হবে।",
    noticeP2: "যখন পর্যাপ্ত অর্থ জমা হয়ে যাবে, তখন আর কোনও দান গ্রহণ করা হবে না।",
    viewDonorList: "Total Fund Received",
    depositedLabel: "Confirmed Depositors",
    pendingLabel: "Yet to Deposit",
    closeModal: "Close",
    loadingDonors: "Loading...",
    fetchError: "Could not load data. Please open the spreadsheet directly.",
    amountLabel: "Amount",
    noDonors: "No confirmed donors yet.",
    noPending: "No pending entries.",
  },
  od: {
    nav: "ଜୟ ମା କାଳୀ ମନ୍ଦିର, ବିରନିଆ",
    tagline: "ଦିବ୍ୟ ପୁନରୁଦ୍ଧାର (Renovation) • ପବିତ୍ର ନବୀକରଣ",
    heroTitle: "ଙ୍କ ନିବାସ ପୁନର୍ନିର୍ମାଣ କରନ୍ତୁ",
    heroHighlight: "ମା ଦୁର୍ଗା",
    heroSub: "ଶ୍ରୀ ଦୁର୍ଗା ଆମ୍ମା ଦେବୀଙ୍କ ଦିବ୍ୟ ମନ୍ଦିର ପୁନର୍ନିର୍ମାଣର ପବିତ୍ର ମିଶନରେ ଆମ ସହ ଯୋଗ ଦିଅନ୍ତୁ। ପ୍ରତ୍ୟେକ ଅବଦାନ ଆସନ୍ତା ପିଢ଼ି ପାଇଁ ଏକ ମହିମାନ୍ବିତ ଆଧ୍ୟାତ୍ମିକ ଅଭୟାରଣ୍ୟ ସୃଷ୍ଟି କରିବାକୁ ଆମକୁ ନିକଟତର କରେ।",
    donateNow: "ବର୍ତ୍ତମାନ ଦାନ କରନ୍ତୁ",
    viewDonors: "ଦାତାମାନଙ୍କୁ ଦେଖନ୍ତୁ",
    aboutTitle: "ପୁନରୁଦ୍ଧାର (Renovation) ବିଷୟରେ",
    aboutP1: "ଶତାବ୍ଦୀ ଧରି, ଜୟ ମା କାଳୀ ମନ୍ଦିର ଆଧ୍ୟାତ୍ମିକ ଆଲୋକ ଏବଂ ଭକ୍ତିର ପ୍ରତୀକ। ୨୦୦ ବର୍ଷରୁ ଅଧିକ ପୂର୍ବେ ନିର୍ମିତ ଏହି ମନ୍ଦିର ଲକ୍ଷ ଲକ୍ଷ ଭକ୍ତଙ୍କ ପବିତ୍ର ଆଶ୍ରୟସ୍ଥଳ।",
    aboutP2: "ପ୍ରାକୃତିକ କ୍ଷୟ ଏବଂ ସମୟ ଯୋଗୁଁ, ମନ୍ଦିର ସଂରଚନାର ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସଂସ୍କାର ଆବଶ୍ୟକ।",
    aboutP3: "ପୁନର୍ନିର୍ମାଣ ପ୍ରକଳ୍ପରେ ମୁଖ୍ୟ ଗର୍ଭଗୃହ ପୁନରୁଦ୍ଧାର, ନୂଆ ପ୍ରାର୍ଥନା ହଲ ନିର୍ମାଣ ଏବଂ ଆଧୁନିକ ସୁବିଧା ସ୍ଥାପନ ଅନ୍ତର୍ଭୁକ୍ତ।",
    oldTemple: "ବର୍ତ୍ତମାନର ମନ୍ଦିର",
    oldTempleDesc: "ସମୟ ସହ ଜୀର୍ଣ୍ଣ ମନ୍ଦିର, ଏହାର ପବିତ୍ର ଐତିହ୍ୟ ସଂରକ୍ଷଣ ପାଇଁ ତୁରନ୍ତ ସଂସ୍କାର ଆବଶ୍ୟକ।",
    newTemple: "ପ୍ରସ୍ତାବିତ ନୂଆ ମନ୍ଦିର",
    newTempleDesc: "କଳ୍ପିତ ମହିମାନ୍ବିତ ପୁନର୍ନିର୍ମିତ ମନ୍ଦିର — ପ୍ରାଚୀନ ସ୍ଥାପତ୍ୟ ଏବଂ ଆଧୁନିକ ସୁବିଧାର ଦିବ୍ୟ ମିଶ୍ରଣ।",
    donateTitle: "ପବିତ୍ର ଅର୍ପଣ କରନ୍ତୁ",
    donateSub: "ଆପଣଙ୍କ ଦିବ୍ୟ ଅବଦାନ ଦେବା ପାଇଁ ତଳେ QR କୋଡ୍ ସ୍କାନ କରନ୍ତୁ।",
    scanQR: "ଦାନ ପାଇଁ ସ୍କାନ କରନ୍ତୁ",
    qrNote: "ଯେକୌଣସି UPI ଆପ୍ ସହ ଏହି QR କୋଡ୍ ସ୍କାନ କରନ୍ତୁ",
    afterPayment: "ଦାନ କରିବା ପରେ (ଜୟ ମା କାଳୀ ମନ୍ଦିର, ବିରନିଆ)",
    afterPaymentDesc: "ଦାନ ସମ୍ପୂର୍ଣ୍ଣ କରିବା ପରେ, ଦୟାକରି ପେମେଣ୍ଟ ନିଶ୍ଚିତକରଣର ସ୍କ୍ରିନସଟ ଆପଣଙ୍କ ସମ୍ପୂର୍ଣ୍ଣ ନାମ, ଫୋନ ନମ୍ବର ଏବଂ ଠିକଣା ସହ ତଳେ ନମ୍ବରରେ WhatsApp କରନ୍ତୁ:",
    whatsappPlace: "ଜୟ ମା କାଳୀ ମନ୍ଦିର, ବିରନିଆ",
    whatsappName: "ଧୀରଜ କୁମାର",
    whatsappNumber: "+91 99114 14416",
    whatsappNote: "ଆମ ମନ୍ଦିର କମିଟି ୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ ଆପଣଙ୍କ ଦାନ ନିଶ୍ଚିତ କରିବ।",
    donorsTitle: "ପବିତ୍ର ଦାତା ରେକର୍ଡ",
    donorsSub: "ଆମେ ସମ୍ପୂର୍ଣ୍ଣ ସ୍ୱଚ୍ଛତା ବଜାୟ ରଖୁ। ଏହି ଦିବ୍ୟ କାର୍ଯ୍ୟରେ ଅବଦାନ ଦେଇଥିବା ସମସ୍ତ ଭକ୍ତଙ୍କ ତାଲିକା ଦେଖନ୍ତୁ।",
    viewSheet: "ଦାନ ରେକର୍ଡ ଦେଖନ୍ତୁ (Excel)",
    donorsNote: "ଏହି ସିଟ୍ ସମସ୍ତ ଯାଞ୍ଚ ହୋଇଥିବା ଦାନ ସହ ନିୟମିତ ଅପଡେଟ ହୁଏ।",
    totalRaised: "ମୋଟ ସଂଗ୍ରହ",
    totalGoal: "ଲକ୍ଷ୍ୟ ପରିମାଣ",
    totalDonors: "ଆଶୀର୍ବାଦିତ ଦାତା",
    daysLeft: "ବାକି ଦିନ",
    committeeTitle: "ମନ୍ଦିର କୋଷାଧ୍ୟକ୍ଷ",
    member1: "ଶ୍ରୀ ଅରବିନ୍ଦ ସିଂହ",
    member1Role: "କୋଷାଧ୍ୟକ୍ଷ (Treasurer)",
    blessingLine: "ମା କାଳୀଙ୍କ କୃପା ଏବଂ ବିରନିଆ ଗ୍ରାମ (ପୋଷ୍ଟ–ଜୋଥା, ଧୋରାଇୟା, ବାଙ୍କା, ବିହାର-813109) ଗ୍ରାମବାସୀଙ୍କ ଉଦାର ସହଯୋଗରେ।",
    footerText: "ଜୟ ମା କାଳୀ ମନ୍ଦିର ପୁନରୁଦ୍ଧାର ଟ୍ରଷ୍ଟ",
    footerAddress: "ଗାଁ ବିରନିଆ, ପୋଷ୍ଟ–ଜୋଥା, ଧୋରାଇୟା, ବାଙ୍କା, ବିହାର - 813109",
    footerRights: "© 2024 ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ। ଭକ୍ତି ସହ ନିର୍ମିତ।",
    langLabel: "ভାষা",
    progressLabel: "ପୁନରୁଦ୍ଧାର ଅଗ୍ରଗତି",
    reasonTitle: "ଦାନ କରିବାର କାରଣ",
    reasonP1: "ବର୍ତ୍ତମାନର ମା କାଳୀ ମନ୍ଦିର ଅତ୍ୟନ୍ତ ପୁରୁଣା ଏବଂ ସମୟ ସହ ଏହାର ସଂରଚନା ଦୁର୍ବଳ ହୋଇଯାଇଛି। ବର୍ଷା ଋତୁରେ ରାସ୍ତାର ପାଣି ମନ୍ଦିର ପ୍ରାଙ୍ଗଣଭିତରକୁ ପ୍ରବେଶ କରେ, ଯାହାର ଫଳରେ ଭକ୍ତମାନଙ୍କୁ ଅସୁବିଧା ହୁଏ ଏବଂ ମନ୍ଦିରର ପବିତ୍ରତା ଉପରେ ପ୍ରଭାବ ପଡ଼େ।",
    reasonP2: "ସେହିକାରଣେ ମା କାଳୀଙ୍କ କୃପା ଏବଂ ସମସ୍ତ ଗ୍ରାମବାସୀଙ୍କ ସହଯୋଗରେ, ଆମେ ମନ୍ଦିରର ଛାଦକୁ ମଜବୁତ ଖମ୍ଭା ସହ ପୁନର୍ନିର୍ମାଣ ଓ ଉଚ୍ଚ କରିବାର ଯୋଜନା କରୁଛୁ, ଯାହାଦ୍ୱାରା ଏହି ମନ୍ଦିର ଭବିଷ୍ୟତ ପିଢ଼ି ପାଇଁ ସୁରକ୍ଷିତ, ଶକ୍ତିଶାଳୀ ଓ ସୁରକ୍ଷିତ ରହିପାରିବ।",
    noticeLabel: "ସୂଚନା ବାର୍ତ୍ତା",
    noticeTitle: "ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସୂଚନା:",
    noticeP1: "ନିର୍ମାଣ କାମ ପାଇଁ ଯେତେଟିକି ଟଙ୍କା ଆବଶ୍ୟକ, କେବଳ ସେତେଟିକି ପରିମାଣ ପର୍ଯ୍ୟନ୍ତ ଦାନ ଗ୍ରହଣ କରାଯିବ।",
    noticeP2: "ଯେତେବେଳେ ପ୍ରଚୁର ପରିମାଣର ଧନରାଶି ସଂଗ୍ରହ ହେବ, ସେତେବେଳେ ଆଉ ଅତିରିକ୍ତ ଦାନ ନିଆଯିବ ନାହିଁ।",
    viewDonorList: "Total Fund Received",
    depositedLabel: "Confirmed Depositors",
    pendingLabel: "Yet to Deposit",
    closeModal: "Close",
    loadingDonors: "Loading...",
    fetchError: "Could not load data. Please open the spreadsheet directly.",
    amountLabel: "Amount",
    noDonors: "No confirmed donors yet.",
    noPending: "No pending entries.",
  },
};

const langNames = {
  en: "English",
  hi: "हिन्दी",
  te: "తెలుగు",
  mr: "मराठी",
  bn: "বাংলা",
  od: "ଓଡ଼ିଆ",
};

// OM Symbol SVG
const OmSymbol = ({ size = 24, color = "#C4922A" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill={color}>
    <text x="50" y="75" textAnchor="middle" fontSize="80" fontFamily="serif">ॐ</text>
  </svg>
);

const TempleBadgeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 20h16" />
    <path d="M7 20v-5m5 5v-5m5 5v-5" />
    <path d="M5.5 15h13" />
    <path d="M7 15v-3.6L12 7l5 4.4V15" />
    <path d="M9.5 11.5h5" />
    <path d="M12 4.5v1.7" />
    <circle cx="12" cy="3.25" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const GlobeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.8 2.5 4.4 5.7 4.4 9S14.8 18.5 12 21c-2.8-2.5-4.4-5.7-4.4-9S9.2 5.5 12 3Z" />
  </svg>
);

const ChartIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 20h16" />
    <path d="M7 18v-5" />
    <path d="M12 18V9" />
    <path d="M17 18V6" />
    <path d="m6 10 4-3 3 2 5-4" />
  </svg>
);

// Decorative Divider
const Divider = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, margin: "40px 0" }}>
    <div style={{ height: 1, width: 80, background: "linear-gradient(to right, transparent, #C4922A)" }} />
    <OmSymbol size={28} />
    <div style={{ height: 1, width: 80, background: "linear-gradient(to left, transparent, #C4922A)" }} />
  </div>
);

// Animated Counter
const Counter = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const SHEET_ID = "1NYPlaHIUdomegVHvgGYnESoEU0JQf7tZ2i8N2LyNetQ";

function parseSheetCSV(csvText) {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) return [];

  const parseRow = (line) => {
    const result = [];
    let inQuotes = false;
    let current = "";
    for (let ci = 0; ci < line.length; ci++) {
      if (line[ci] === '"') { inQuotes = !inQuotes; }
      else if (line[ci] === "," && !inQuotes) { result.push(current.trim()); current = ""; }
      else { current += line[ci]; }
    }
    result.push(current.trim());
    return result;
  };

  const headers = parseRow(lines[0]).map((h) => h.toLowerCase().replace(/"/g, ""));
  const statIdx = headers.findIndex((h) => h.includes("status") || h.includes("paid") || h.includes("payment") || h.includes("स्थिति") || h.includes("deposited"));

  const rows = [];
  for (let ri = 1; ri < lines.length; ri++) {
    const cols = parseRow(lines[ri]);
    // Force mapping: Column C = Name, Column F = Amount
    const name = cols[2]?.replace(/"/g, "").trim();
    if (!name) continue;
    const amount = cols[5]?.replace(/"/g, "").trim() || "";
    const rawStatus = statIdx >= 0 ? cols[statIdx]?.replace(/"/g, "").trim().toLowerCase() : "";
    const isPaid = statIdx < 0 || ["paid", "yes", "confirmed", "deposited", "done", "हाँ", "जमा"].some((k) => rawStatus.includes(k));
    rows.push({ name, amount, isPaid });
  }
  return rows;
}

export default function TempleDonation() {
  const [lang, setLang] = useState("hi");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showDonorModal, setShowDonorModal] = useState(false);
  const [donorRows, setDonorRows] = useState([]);
  const [loadingDonors, setLoadingDonors] = useState(false);
  const [donorError, setDonorError] = useState("");
  const [showFundModal, setShowFundModal] = useState(false);
  const [totalFundReceived, setTotalFundReceived] = useState("");
  const [loadingFund, setLoadingFund] = useState(false);
  const [fundError, setFundError] = useState("");
  const t = translations[lang];

  const fetchAndShowTotalFund = async () => {
    setShowFundModal(true);
    setLoadingFund(true);
    setFundError("");
    try {
      const gid = "1116878055";
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}&range=B5`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const text = (await res.text()).trim();
      const value = text.replace(/"/g, "").split(/[\n,]/)[0]?.trim() || "";
      setTotalFundReceived(value);
    } catch {
      setFundError(t.fetchError || "Could not load data. Please open the spreadsheet directly.");
    } finally {
      setLoadingFund(false);
    }
  };

  const fetchAndShowDonors = async () => {
    setShowDonorModal(true);
    if (donorRows.length > 0) return; // already loaded
    setLoadingDonors(true);
    setDonorError("");
    try {
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const text = await res.text();
      const parsed = parseSheetCSV(text);
      setDonorRows(parsed);
    } catch {
      setDonorError(t.fetchError || "Could not load data. Please open the spreadsheet directly.");
    } finally {
      setLoadingDonors(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Noto+Sans+Devanagari:wght@300;400;500;600;700&family=Noto+Sans+Telugu:wght@300;400;500;600;700&family=Noto+Sans+Bengali:wght@300;400;500;600;700&family=Noto+Sans+Oriya:wght@300;400;500;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --gold: #C4922A;
      --gold-light: #E8C56D;
      --gold-dark: #8B6914;
      --crimson: #8B1A1A;
      --crimson-deep: #5C0E0E;
      --saffron: #FF6F00;
      --cream: #FFF8E7;
      --dark: #1A0A0A;
      --dark-warm: #2D1410;
      --vermillion: #E23D28;
    }

    body {
      font-family: 'Cormorant Garamond', 'Noto Sans Devanagari', 'Noto Sans Telugu', 'Noto Sans Bengali', 'Noto Sans Oriya', serif;
      background: var(--dark);
      color: var(--cream);
      overflow-x: hidden;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: var(--dark); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 4px; }

    /* Animations */
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    @keyframes glow { 0%,100% { box-shadow: 0 0 20px rgba(196,146,42,0.3); } 50% { box-shadow: 0 0 40px rgba(196,146,42,0.6); } }
    @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
    @keyframes fadeUp { from { opacity:0; transform: translateY(30px); } to { opacity:1; transform: translateY(0); } }
    @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
    @keyframes diyas { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
    @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    .fade-up { animation: fadeUp 0.8s ease forwards; }
    .fade-up-d1 { animation: fadeUp 0.8s ease 0.1s forwards; opacity: 0; }
    .fade-up-d2 { animation: fadeUp 0.8s ease 0.2s forwards; opacity: 0; }
    .fade-up-d3 { animation: fadeUp 0.8s ease 0.3s forwards; opacity: 0; }
    .fade-up-d4 { animation: fadeUp 0.8s ease 0.4s forwards; opacity: 0; }

    /* Mandala Pattern BG */
    .mandala-bg {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 0; opacity: 0.03;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='80' fill='none' stroke='%23C4922A' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='60' fill='none' stroke='%23C4922A' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='40' fill='none' stroke='%23C4922A' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='20' fill='none' stroke='%23C4922A' stroke-width='0.5'/%3E%3Cpath d='M100 20 L100 180 M20 100 L180 100 M35 35 L165 165 M165 35 L35 165' stroke='%23C4922A' stroke-width='0.3'/%3E%3C/svg%3E");
      background-size: 200px 200px;
    }

    /* Nav */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 12px 40px;
      display: flex; align-items: center; justify-content: space-between;
      transition: all 0.3s ease;
    }
    .nav-scrolled {
      background: rgba(26,10,10,0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(196,146,42,0.3);
    }
    .nav-brand {
      display: flex; align-items: center; gap: 12px;
      font-family: 'Cinzel Decorative', serif;
      font-size: 16px; font-weight: 700; color: var(--gold);
      letter-spacing: 1px;
    }
    .nav-brand-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--gold);
      flex-shrink: 0;
    }
    .nav-brand-icon svg { width: 28px; height: 28px; }
    .nav-right { display: flex; align-items: center; gap: 20px; }
    .lang-selector {
      position: relative;
    }
    .lang-btn {
      background: rgba(196,146,42,0.15);
      border: 1px solid rgba(196,146,42,0.4);
      color: var(--gold); padding: 6px 16px;
      border-radius: 6px; cursor: pointer;
      font-family: inherit; font-size: 14px;
      display: inline-flex; align-items: center; gap: 8px;
      transition: all 0.3s;
    }
    .lang-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .lang-icon svg { width: 16px; height: 16px; }
    .lang-btn:hover { background: rgba(196,146,42,0.3); }
    .lang-dropdown {
      position: absolute; top: 100%; right: 0; margin-top: 4px;
      background: var(--dark-warm);
      border: 1px solid rgba(196,146,42,0.4);
      border-radius: 8px; overflow: hidden;
      min-width: 140px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    }
    .lang-option {
      display: block; width: 100%; padding: 10px 16px;
      background: none; border: none; color: var(--cream);
      font-family: inherit; font-size: 14px; cursor: pointer;
      text-align: left; transition: all 0.2s;
    }
    .lang-option:hover { background: rgba(196,146,42,0.2); }
    .lang-option.active { background: rgba(196,146,42,0.3); color: var(--gold); }
    .donate-nav-btn {
      background: linear-gradient(135deg, var(--gold), var(--gold-dark));
      color: var(--dark); padding: 8px 20px;
      border: none; border-radius: 6px; cursor: pointer;
      font-family: 'Cinzel Decorative', serif;
      font-size: 12px; font-weight: 700;
      letter-spacing: 1px; text-transform: uppercase;
      transition: all 0.3s;
    }
    .donate-nav-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(196,146,42,0.4); }

    /* Hero */
    .hero {
      position: relative; min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      text-align: center; overflow: hidden;
      background: linear-gradient(180deg, var(--dark) 0%, var(--crimson-deep) 50%, var(--dark) 100%);
    }
    .hero::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at center, rgba(196,146,42,0.1) 0%, transparent 70%);
    }
    .hero-particles {
      position: absolute; inset: 0; overflow: hidden;
    }
    .particle {
      position: absolute; width: 3px; height: 3px;
      background: var(--gold); border-radius: 50%;
      animation: diyas 3s infinite;
    }
    .hero-content {
      position: relative; z-index: 2;
      max-width: 800px; padding: 0 24px;
    }
    .hero-om {
      font-size: 72px; color: var(--gold);
      text-shadow: 0 0 30px rgba(196,146,42,0.5);
      animation: float 4s ease-in-out infinite;
      margin-bottom: 20px;
    }
    .hero-title {
      font-family: 'Cinzel Decorative', serif;
      font-size: clamp(24px, 5vw, 48px);
      color: var(--cream); font-weight: 400;
      line-height: 1.3; margin-bottom: 8px;
    }
    .hero-highlight {
      font-family: 'Cinzel Decorative', serif;
      font-size: clamp(36px, 7vw, 72px);
      font-weight: 900;
      background: linear-gradient(135deg, var(--gold-light), var(--gold), var(--saffron), var(--gold-light));
      background-size: 200% auto;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      animation: shimmer 4s linear infinite;
      line-height: 1.2; margin-bottom: 24px;
    }
    .hero-sub-wrap {
      max-width: 650px;
      margin: 0 auto 40px;
    }
    .hero-sub {
      font-size: clamp(16px, 2vw, 20px);
      color: rgba(255,248,231,0.8);
      line-height: 1.8;
      margin: 0;
      font-weight: 300;
    }
    .hero-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    .btn-primary {
      background: linear-gradient(135deg, var(--gold), var(--saffron));
      color: var(--dark); padding: 16px 40px;
      border: none; border-radius: 8px; cursor: pointer;
      font-family: 'Cinzel Decorative', serif;
      font-size: 14px; font-weight: 700;
      letter-spacing: 2px; text-transform: uppercase;
      transition: all 0.3s; text-decoration: none;
      animation: glow 3s infinite;
    }
    .btn-primary:hover { transform: translateY(-2px) scale(1.02); }
    .btn-secondary {
      background: transparent;
      border: 2px solid var(--gold);
      color: var(--gold); padding: 14px 36px;
      border-radius: 8px; cursor: pointer;
      font-family: 'Cinzel Decorative', serif;
      font-size: 14px; font-weight: 700;
      letter-spacing: 2px; text-transform: uppercase;
      transition: all 0.3s; text-decoration: none;
    }
    .btn-secondary:hover { background: rgba(196,146,42,0.15); transform: translateY(-2px); }

    /* Sections */
    .section {
      position: relative; z-index: 1;
      padding: 100px 20px;
      max-width: 1200px; margin: 0 auto;
    }
    .section-title {
      font-family: 'Cinzel Decorative', serif;
      font-size: clamp(28px, 4vw, 44px);
      color: var(--gold); text-align: center;
      margin-bottom: 16px; font-weight: 700;
    }
    .section-sub {
      text-align: center; font-size: 18px;
      color: rgba(255,248,231,0.7); max-width: 700px;
      margin: 0 auto 60px; line-height: 1.7; font-weight: 300;
    }

    /* About */
    .about-text {
      max-width: 800px; margin: 0 auto;
      font-size: 18px; line-height: 2;
      color: rgba(255,248,231,0.85);
      font-weight: 300;
    }
    .about-text p { margin-bottom: 20px; }

    /* Top notice bar (hero) */
    .top-notice-bar {
      max-width: 900px;
      margin: 20px auto 20px;
      border-radius: 999px;
      border: 1px solid rgba(196,146,42,0.6);
      background: radial-gradient(circle at left, rgba(226,61,40,0.25), transparent 60%);
      overflow: hidden;
      display: flex;
      align-items: center;
      font-size: 13px;
    }
    .top-notice-label {
      padding: 8px 14px;
      background: rgba(226,61,40,0.85);
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 700;
      white-space: nowrap;
    }
    .top-notice-text {
      flex: 1;
      padding: 6px 22px;
      color: rgba(255,248,231,0.9);
      overflow: hidden;
      white-space: nowrap;
    }
    .top-notice-inner {
      display: inline-flex;
      width: max-content;
      animation: topNoticeScroll 30s linear infinite;
      will-change: transform;
    }
    .top-notice-item {
      display: inline-flex;
      align-items: center;
      white-space: nowrap;
      padding-right: 48px; /* space between loops */
    }
    @keyframes topNoticeScroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* Temple Comparison */
    .temple-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 40px; margin-top: 60px;
    }
    @media (max-width: 768px) { .temple-grid { grid-template-columns: 1fr; } }
    .temple-card {
      border-radius: 16px; overflow: hidden;
      border: 1px solid rgba(196,146,42,0.3);
      background: rgba(45,20,16,0.6);
      transition: all 0.5s;
    }
    .temple-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 60px rgba(196,146,42,0.15);
      border-color: rgba(196,146,42,0.6);
    }
    .temple-img {
      width: 100%; height: 300px;
      object-fit: cover;
      border-bottom: 2px solid rgba(196,146,42,0.3);
    }
    .temple-label {
      padding: 24px;
    }
    .temple-label h3 {
      font-family: 'Cinzel Decorative', serif;
      font-size: 22px; color: var(--gold);
      margin-bottom: 8px;
    }
    .temple-label p {
      font-size: 16px; line-height: 1.7;
      color: rgba(255,248,231,0.7);
    }

    /* Stats */
    .stats-grid {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 24px; margin: 60px 0;
    }
    @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
    .stat-card {
      text-align: center; padding: 32px 16px;
      background: linear-gradient(135deg, rgba(45,20,16,0.8), rgba(92,14,14,0.4));
      border: 1px solid rgba(196,146,42,0.25);
      border-radius: 16px;
      transition: all 0.3s;
    }
    .stat-card:hover { border-color: var(--gold); transform: translateY(-3px); }
    .stat-number {
      font-family: 'Cinzel Decorative', serif;
      font-size: 36px; font-weight: 900;
      color: var(--gold);
      margin-bottom: 8px;
    }
    .stat-label {
      font-size: 14px; color: rgba(255,248,231,0.6);
      text-transform: uppercase; letter-spacing: 2px;
    }

    /* Progress Bar */
    .progress-wrap {
      max-width: 700px; margin: 0 auto 60px;
      padding: 24px; border-radius: 12px;
      background: rgba(45,20,16,0.6);
      border: 1px solid rgba(196,146,42,0.2);
    }
    .progress-header {
      display: flex; justify-content: space-between;
      margin-bottom: 12px; font-size: 14px;
      color: rgba(255,248,231,0.7);
    }
    .progress-bar {
      height: 12px; background: rgba(196,146,42,0.15);
      border-radius: 6px; overflow: hidden;
    }
    .progress-fill {
      height: 100%; border-radius: 6px;
      background: linear-gradient(90deg, var(--gold-dark), var(--gold), var(--saffron));
      background-size: 200% auto;
      animation: shimmer 3s linear infinite;
      transition: width 2s ease;
    }

    /* Donate Section */
    .donate-section {
      background: linear-gradient(180deg, var(--dark) 0%, var(--crimson-deep) 50%, var(--dark) 100%);
      padding: 100px 20px;
    }
    .donate-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 40px; max-width: 1000px; margin: 0 auto;
    }
    @media (max-width: 768px) { .donate-grid { grid-template-columns: 1fr; } }
    .qr-card {
      background: rgba(255,248,231,0.05);
      border: 2px solid rgba(196,146,42,0.4);
      border-radius: 20px; padding: 40px;
      text-align: center;
      animation: glow 4s infinite;
    }
    .qr-placeholder {
      width: 220px; height: 220px;
      margin: 20px auto;
      border-radius: 12px;
      overflow: hidden;
      display: flex; align-items: center; justify-content: center;
    }
    .qr-img { width: 100%; height: 100%; object-fit: cover; }
    .qr-label {
      font-family: 'Cinzel Decorative', serif;
      font-size: 18px; color: var(--gold);
      margin-bottom: 12px;
    }
    .qr-note {
      font-size: 14px; color: rgba(255,248,231,0.6);
      line-height: 1.6; margin-top: 16px;
    }
    .bank-card {
      background: rgba(45,20,16,0.8);
      border: 1px solid rgba(196,146,42,0.3);
      border-radius: 20px; padding: 40px;
    }
    .bank-card h3 {
      font-family: 'Cinzel Decorative', serif;
      font-size: 20px; color: var(--gold);
      margin-bottom: 24px;
    }
    .bank-detail {
      padding: 12px 0;
      border-bottom: 1px solid rgba(196,146,42,0.1);
      font-size: 15px; color: rgba(255,248,231,0.8);
      line-height: 1.6;
    }
    .receipt-card {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .receipt-card .receipt-img {
      max-width: 100%;
      width: auto;
      height: auto;
      border-radius: 12px;
      border: 1px solid rgba(196,146,42,0.4);
      box-shadow: 0 12px 30px rgba(0,0,0,0.4);
    }

    /* WhatsApp Section */
    .whatsapp-card {
      max-width: 700px; margin: 60px auto 0;
      background: linear-gradient(135deg, rgba(37,211,102,0.1), rgba(37,211,102,0.05));
      border: 2px solid rgba(37,211,102,0.4);
      border-radius: 20px; padding: 40px;
      text-align: center;
    }
    .whatsapp-icon {
      width: 60px; height: 60px;
      background: #25D366; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 20px;
      font-size: 30px; color: white;
    }
    .whatsapp-card h3 {
      font-family: 'Cinzel Decorative', serif;
      font-size: 22px; color: #25D366;
      margin-bottom: 16px;
    }
    .whatsapp-card p {
      font-size: 16px; color: rgba(255,248,231,0.8);
      line-height: 1.7; margin-bottom: 16px;
    }
    .whatsapp-place {
      font-family: 'Cinzel Decorative', serif;
      font-size: 17px;
      color: var(--gold);
      margin-top: 4px;
      margin-bottom: 4px;
      letter-spacing: 0.3px;
    }
    .whatsapp-name {
      font-family: 'Cinzel Decorative', serif;
      font-size: 18px;
      color: rgba(255,248,231,0.92);
      margin-top: 8px;
      margin-bottom: 6px;
      letter-spacing: 0.2px;
    }
    .whatsapp-number {
      font-family: 'Cinzel Decorative', serif;
      font-size: 32px; color: #25D366;
      margin: 16px 0;
      letter-spacing: 2px;
    }
    .whatsapp-link {
      display: inline-flex; align-items: center; gap: 10px;
      background: #25D366; color: white;
      padding: 14px 32px; border-radius: 50px;
      text-decoration: none; font-size: 16px;
      font-weight: 600; transition: all 0.3s;
      margin-top: 16px;
    }
    .whatsapp-link:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(37,211,102,0.3); }
    .whatsapp-note {
      font-size: 14px !important;
      color: rgba(255,248,231,0.5) !important;
      margin-top: 16px;
    }

    /* Donors */
    .donors-section { padding: 100px 20px; }
    .excel-btn {
      display: inline-flex; align-items: center; gap: 12px;
      background: linear-gradient(135deg, #217346, #185C37);
      color: white; padding: 18px 40px;
      border-radius: 12px; font-size: 16px;
      font-weight: 600; text-decoration: none;
      transition: all 0.3s;
      border: 1px solid rgba(33,115,70,0.5);
    }
    .excel-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(33,115,70,0.3); }
    .excel-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .excel-icon svg { width: 24px; height: 24px; }

    /* Committee */
    .committee-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 24px;
      margin-top: 40px;
      justify-items: center;
    }
    @media (max-width: 768px) {
      .committee-grid {
        grid-template-columns: 1fr;
      }
    }
    .member-card {
      text-align: center; padding: 32px;
      background: rgba(45,20,16,0.6);
      border: 1px solid rgba(196,146,42,0.2);
      border-radius: 16px;
      transition: all 0.4s;
    }
    .member-card:hover { border-color: var(--gold); transform: translateY(-3px); }
    .member-avatar {
      width: 80px; height: 80px;
      background: linear-gradient(135deg, var(--gold), var(--gold-dark));
      border-radius: 50%; margin: 0 auto 16px;
      display: flex; align-items: center; justify-content: center;
      font-size: 32px; color: var(--dark);
      font-family: 'Cinzel Decorative', serif;
    }
    .member-card h3 {
      font-size: 18px; color: var(--cream);
      margin-bottom: 4px;
    }
    .member-card p {
      font-size: 14px; color: var(--gold);
      letter-spacing: 1px;
    }

    /* Footer */
    .footer {
      background: linear-gradient(180deg, var(--dark), #0D0505);
      padding: 60px 20px;
      text-align: center;
      border-top: 1px solid rgba(196,146,42,0.2);
    }
    .footer-brand {
      font-family: 'Cinzel Decorative', serif;
      font-size: 20px; color: var(--gold);
      margin-bottom: 8px;
    }
    .footer-addr {
      font-size: 14px; color: rgba(255,248,231,0.4);
      margin-bottom: 24px;
    }
    .footer-copy {
      font-size: 13px; color: rgba(255,248,231,0.3);
    }
    .footer-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--gold);
      margin-bottom: 16px;
    }
    .footer-icon svg { width: 40px; height: 40px; }

    /* Diya lamp line */
    .diya-line {
      display: flex; justify-content: center; gap: 40px;
      margin: 40px 0;
    }
    .diya {
      width: 6px; height: 6px; background: var(--saffron);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--saffron), 0 0 20px rgba(255,111,0,0.4);
      animation: diyas 2s infinite;
    }
    .diya:nth-child(2) { animation-delay: 0.3s; }
    .diya:nth-child(3) { animation-delay: 0.6s; }
    .diya:nth-child(4) { animation-delay: 0.9s; }
    .diya:nth-child(5) { animation-delay: 1.2s; }

    /* Responsive tweaks */
    @media (max-width: 1024px) {
      .nav { padding: 10px 24px; }
      .section { padding: 80px 16px; }
      .donate-section { padding: 80px 16px; }
      .footer { padding: 40px 16px; }
    }

    @media (max-width: 768px) {
      .nav-brand { font-size: 14px; }
      .nav-brand-icon svg { width: 22px; height: 22px; }
      .hero {
        min-height: auto;
        padding: 112px 16px 72px;
        align-items: flex-start;
        justify-content: flex-start;
        overflow: visible;
      }
      .hero-content {
        width: 100%;
        max-width: 100%;
        padding: 0 4px;
      }
      .hero-sub-wrap {
        max-width: 100%;
        margin: 0 auto 20px;
        background: linear-gradient(180deg, rgba(45,20,16,0.9), rgba(92,14,14,0.62));
        border: 1px solid rgba(196,146,42,0.35);
        border-radius: 18px;
        box-shadow: inset 0 1px 0 rgba(232,197,109,0.12), 0 14px 32px rgba(0,0,0,0.28);
        backdrop-filter: blur(8px);
      }
      .hero-sub {
        display: block;
        position: relative;
        z-index: 3;
        font-size: 14px;
        line-height: 1.6;
        padding: 16px 18px;
        color: rgba(255,248,231,0.92);
        white-space: normal;
        overflow-wrap: anywhere;
      }
      .hero-sub-wrap.fade-up-d3 { animation: none; opacity: 1; }
      .hero-btns { flex-direction: column; }
      .btn-primary,
      .btn-secondary {
        width: 100%;
        max-width: 320px;
        justify-content: center;
        margin-inline: auto;
      }
      .section-sub { font-size: 16px; padding: 0 4px; }
      .about-text { font-size: 16px; }
      .qr-card,
      .bank-card,
      .whatsapp-card {
        padding: 24px 20px;
      }
      .stats-grid { gap: 16px; }
      .stat-card { padding: 24px 12px; }
    }

    @media (max-width: 480px) {
      .nav { padding: 8px 14px; }
      .hero-title { font-size: 20px; }
      .hero-highlight { font-size: 32px; }
      .section { padding: 70px 12px; }
      .donate-section { padding: 70px 12px; }
      .section-title { font-size: 24px; }
      .whatsapp-number { font-size: 24px; }
      .excel-btn {
        width: 100%;
        justify-content: center;
        padding-inline: 20px;
      }
    }

    /* Donor List Button */
    .donor-list-btn {
      display: inline-flex; align-items: center; gap: 10px;
      background: linear-gradient(135deg, rgba(196,146,42,0.2), rgba(196,146,42,0.1));
      border: 2px solid var(--gold);
      color: var(--gold); padding: 14px 32px;
      border-radius: 12px; font-size: 15px;
      font-weight: 600; cursor: pointer;
      font-family: inherit;
      transition: all 0.3s; margin-top: 16px;
    }
    .donor-list-btn:hover { background: rgba(196,146,42,0.3); transform: translateY(-2px); }

    /* Modal Overlay */
    .modal-overlay {
      position: fixed; inset: 0; z-index: 2000;
      background: rgba(10,4,4,0.85);
      backdrop-filter: blur(6px);
      display: flex; align-items: center; justify-content: center;
      padding: 16px;
    }
    .modal-box {
      background: linear-gradient(160deg, var(--dark-warm), var(--dark));
      border: 1px solid rgba(196,146,42,0.5);
      border-radius: 20px;
      width: 100%; max-width: 680px;
      max-height: 85vh; display: flex; flex-direction: column;
      box-shadow: 0 30px 80px rgba(0,0,0,0.7);
    }
    .modal-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 24px 28px 16px;
      border-bottom: 1px solid rgba(196,146,42,0.2);
    }
    .modal-title {
      font-family: 'Cinzel Decorative', serif;
      font-size: 20px; color: var(--gold);
    }
    .modal-close {
      background: rgba(196,146,42,0.15); border: 1px solid rgba(196,146,42,0.4);
      color: var(--gold); width: 36px; height: 36px;
      border-radius: 50%; cursor: pointer; font-size: 18px;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .modal-close:hover { background: rgba(196,146,42,0.35); }
    .modal-body { overflow-y: auto; padding: 20px 28px 28px; flex: 1; }
    .modal-section-title {
      font-size: 13px; text-transform: uppercase;
      letter-spacing: 1.5px; font-weight: 700;
      margin-bottom: 12px; margin-top: 20px;
      display: flex; align-items: center; gap: 8px;
    }
    .modal-section-title:first-child { margin-top: 0; }
    .modal-section-title .dot {
      width: 8px; height: 8px; border-radius: 50%;
      display: inline-block; flex-shrink: 0;
    }
    .donor-table { width: 100%; border-collapse: collapse; }
    .donor-table th {
      text-align: left; font-size: 12px; text-transform: uppercase;
      letter-spacing: 1px; color: rgba(255,248,231,0.4);
      padding: 6px 10px; border-bottom: 1px solid rgba(196,146,42,0.15);
    }
    .donor-table td {
      padding: 10px 10px; font-size: 15px;
      border-bottom: 1px solid rgba(196,146,42,0.08);
      color: rgba(255,248,231,0.9);
    }
    .donor-table tr:last-child td { border-bottom: none; }
    .donor-table tr:hover td { background: rgba(196,146,42,0.06); }
    .amount-cell { color: var(--gold); font-weight: 600; }
    .modal-empty { font-size: 14px; color: rgba(255,248,231,0.4); padding: 12px 10px; }
    .modal-loading { text-align: center; padding: 40px 0; color: rgba(255,248,231,0.6); font-size: 15px; }
    .modal-error { padding: 20px; text-align: center; color: var(--vermillion); font-size: 15px; line-height: 1.6; }
  `;

  // Generate particles
  const particles = Array.from({ length: 30 }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    size: `${2 + Math.random() * 3}px`,
  }));

  return (
    <>
      <style>{css}</style>
      <div className="mandala-bg" />

      {/* Navigation */}
      <nav className={`nav ${scrollY > 50 ? "nav-scrolled" : ""}`}>
        <div className="nav-brand">
          <span className="nav-brand-icon">
            <TempleBadgeIcon size={28} />
          </span>
          <span>{t.nav}</span>
        </div>
        <div className="nav-right">
          <div className="lang-selector">
            <button className="lang-btn" onClick={() => setShowLangMenu(!showLangMenu)}>
              <span className="lang-icon">
                <GlobeIcon size={16} />
              </span>
              {langNames[lang]}
            </button>
            {showLangMenu && (
              <div className="lang-dropdown">
                {Object.entries(langNames).map(([code, name]) => (
                  <button
                    key={code}
                    className={`lang-option ${lang === code ? "active" : ""}`}
                    onClick={() => { setLang(code); setShowLangMenu(false); }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="donate-nav-btn" onClick={() => scrollTo("donate")}>
            {t.donateNow}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-particles">
          {particles.map((p, i) => (
            <div key={i} className="particle" style={{
              left: p.left, top: p.top,
              animationDelay: p.delay,
              width: p.size, height: p.size,
            }} />
          ))}
        </div>
        <div className="hero-content">
          <div className="hero-om fade-up">ॐ</div>
          <h1 className="hero-title fade-up-d1">{t.heroTitle}</h1>
          <div className="hero-highlight fade-up-d2">{t.heroHighlight}</div>
          <div className="hero-sub-wrap fade-up-d3">
            <p className="hero-sub">{t.heroSub}</p>
          </div>
          {t.reasonP1 && (
            <div className="top-notice-bar fade-up-d4">
              <div className="top-notice-label">
                {t.noticeLabel || "Notice"}
              </div>
              <div className="top-notice-text">
                <div className="top-notice-inner">
                  <span className="top-notice-item">{t.reasonP1}</span>
                  <span className="top-notice-item" aria-hidden="true">{t.reasonP1}</span>
                </div>
              </div>
            </div>
          )}
          <div className="hero-btns fade-up-d4">
            <button className="btn-primary" onClick={() => scrollTo("donate")}>{t.donateNow}</button>
            <button className="btn-secondary" onClick={() => scrollTo("donors")}>{t.viewDonors}</button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: "linear-gradient(180deg, var(--dark), rgba(92,14,14,0.2), var(--dark))" }}>
        <div className="section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number"><Counter end={10000} prefix="₹" /></div>
              <div className="stat-label">{t.totalRaised}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number"><span style={{ fontFamily: "'Cinzel Decorative', serif" }}>₹4–5 Lakh</span></div>
              <div className="stat-label">{t.totalGoal}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number"><Counter end={15} /></div>
              <div className="stat-label">{t.totalDonors}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number"><Counter end={142} /></div>
              <div className="stat-label">{t.daysLeft}</div>
            </div>
          </div>

          <div className="progress-wrap">
            <div className="progress-header">
              <span>{t.progressLabel}</span>
              <span>42.6%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "42.6%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="section">
        <h2 className="section-title">{t.aboutTitle}</h2>
        <Divider />
        <div className="about-text">
          <p>{t.aboutP1}</p>
          <p>{t.aboutP2}</p>
          <p>{t.aboutP3}</p>
        </div>

        {/* Reason to Donate */}
        {t.reasonTitle && (
          <div style={{ marginTop: 50 }}>
            <h2 className="section-title" style={{ fontSize: 26 }}>{t.reasonTitle}</h2>
            <div className="about-text" style={{ marginTop: 10 }}>
              <p>{t.reasonP1}</p>
              <p>{t.reasonP2}</p>
            </div>
          </div>
        )}

        {/* Important Notice */}
        {t.noticeTitle && (
          <div
            style={{
              marginTop: 40,
              padding: 26,
              borderRadius: 18,
              border: "1px solid rgba(226,61,40,0.6)",
              background:
                "linear-gradient(135deg, rgba(92,14,14,0.9), rgba(45,20,16,0.9))",
              boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 30% 30%, #FFEAD5, #FF6F00)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  color: "#1A0A0A",
                }}
              >
                !
              </span>
              <div
                style={{
                  fontSize: 14,
                  textTransform: "uppercase",
                  letterSpacing: 1.4,
                  color: "var(--saffron)",
                  fontWeight: 700,
                }}
              >
                {t.noticeLabel || "Notice Message"}
              </div>
            </div>
            <div
              style={{
                fontSize: 16,
                color: "rgba(255,248,231,0.95)",
                lineHeight: 1.9,
              }}
            >
              <strong>{t.noticeTitle}</strong>{" "}
              {t.noticeP1}{" "}
              {t.noticeP2}
            </div>
          </div>
        )}

        {/* Temple Comparison */}
        <div className="temple-grid">
          <div className="temple-card">
            <img
              className="temple-img"
              src="https://images.unsplash.com/photo-1621427637840-04735b084ef9?w=600&h=400&fit=crop"
              alt="Current Temple"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop"; }}
            />
            <div className="temple-label">
              <h3>{t.oldTemple}</h3>
              <p>{t.oldTempleDesc}</p>
            </div>
          </div>
          <div className="temple-card">
            <img
              className="temple-img"
              src="https://images.unsplash.com/photo-1564804955922-3f48a4f90a7c?w=600&h=400&fit=crop"
              alt="Proposed New Temple"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=600&h=400&fit=crop"; }}
            />
            <div className="temple-label">
              <h3>{t.newTemple}</h3>
              <p>{t.newTempleDesc}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="diya-line">
        <div className="diya" /><div className="diya" /><div className="diya" /><div className="diya" /><div className="diya" />
      </div>

      {/* Donate Section */}
      <div className="donate-section" id="donate">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 className="section-title">{t.donateTitle}</h2>
          <p className="section-sub">{t.donateSub}</p>

          <div className="donate-grid">
            <div className="qr-card">
              <div className="qr-label">{t.scanQR}</div>
              <div className="qr-placeholder">
                <img
                  src={qrImage}
                  alt="UPI QR code for temple donation"
                  className="qr-img"
                />
              </div>
              <p className="qr-note">{t.qrNote}</p>
            </div>

            <div className="bank-card receipt-card">
              <img
                src={receiptImage}
                alt="Donation receipt example"
                className="receipt-img"
              />
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="whatsapp-card">
            <div className="whatsapp-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <h3>{t.afterPayment}</h3>
            <p>{t.afterPaymentDesc}</p>
            <div className="whatsapp-place">{t.whatsappPlace}</div>
            <div className="whatsapp-name">{t.whatsappName}</div>
            <div className="whatsapp-number">{t.whatsappNumber}</div>
            <a
              href={`https://wa.me/919911414416?text=${encodeURIComponent("Jai Maa Kali! I have made a donation to Jai Maa Kali Mandir Renovation Trust. Attaching my payment screenshot.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Send via WhatsApp
            </a>
            <p className="whatsapp-note">{t.whatsappNote}</p>
          </div>
        </div>
      </div>

      <div className="diya-line">
        <div className="diya" /><div className="diya" /><div className="diya" /><div className="diya" /><div className="diya" />
      </div>

      {/* Donors Section */}
      <div className="section" id="donors">
        <h2 className="section-title">{t.donorsTitle}</h2>
        <p className="section-sub">{t.donorsSub}</p>
        <div style={{ textAlign: "center" }}>
          <a
            href="https://docs.google.com/spreadsheets/d/1NYPlaHIUdomegVHvgGYnESoEU0JQf7tZ2i8N2LyNetQ/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="excel-btn"
          >
            <span className="excel-icon">
              <ChartIcon size={24} />
            </span>
            {t.viewSheet}
          </a>
          <br />
          <button className="donor-list-btn" onClick={fetchAndShowTotalFund}>
            👁 {t.viewDonorList}
          </button>
          <p style={{ marginTop: 20, fontSize: 14, color: "rgba(255,248,231,0.5)" }}>
            {t.donorsNote}
          </p>
        </div>
      </div>

      {/* Total Fund Modal */}
      {showFundModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowFundModal(false); }}>
          <div className="modal-box">
            <div className="modal-header">
              <span className="modal-title">🙏 {t.viewDonorList}</span>
              <button className="modal-close" onClick={() => setShowFundModal(false)}>✕</button>
            </div>
            <div className="modal-body" style={{ textAlign: "center" }}>
              {loadingFund && <div className="modal-loading">⏳ {t.loadingDonors}</div>}
              {fundError && <div className="modal-error">⚠️ {fundError}</div>}
              {!loadingFund && !fundError && (
                <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 42, color: "var(--gold)", marginTop: 10 }}>
                  ₹{(totalFundReceived || "—").toString().replace(/[^\d.]/g, "") || totalFundReceived || "—"}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Donor Modal */}
      {showDonorModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowDonorModal(false); }}>
          <div className="modal-box">
            <div className="modal-header">
              <span className="modal-title">🙏 {t.donorsTitle}</span>
              <button className="modal-close" onClick={() => setShowDonorModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              {loadingDonors && <div className="modal-loading">⏳ {t.loadingDonors}</div>}
              {donorError && (
                <div className="modal-error">
                  ⚠️ {donorError}
                  <br /><br />
                  <a href={`https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit?usp=sharing`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)" }}>
                    {t.viewSheet}
                  </a>
                </div>
              )}
              {!loadingDonors && !donorError && (() => {
                const deposited = donorRows.filter((r) => r.isPaid);
                const pending   = donorRows.filter((r) => !r.isPaid);
                return (
                  <>
                    <div className="modal-section-title" style={{ color: "#4CAF50" }}>
                      <span className="dot" style={{ background: "#4CAF50" }} />
                      ✅ {t.depositedLabel} ({deposited.length})
                    </div>
                    {deposited.length === 0
                      ? <p className="modal-empty">{t.noDonors}</p>
                      : (
                        <table className="donor-table">
                          <thead><tr><th>#</th><th>Name</th><th>{t.amountLabel}</th></tr></thead>
                          <tbody>
                            {deposited.map((d, idx) => (
                              <tr key={idx}>
                                <td style={{ color: "rgba(255,248,231,0.4)", width: 36 }}>{idx + 1}</td>
                                <td>{d.name}</td>
                                <td className="amount-cell">{d.amount ? `₹${d.amount}` : "—"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )
                    }

                    {pending.length > 0 && (
                      <>
                        <div className="modal-section-title" style={{ color: "var(--saffron)", marginTop: 28 }}>
                          <span className="dot" style={{ background: "var(--saffron)" }} />
                          ⏳ {t.pendingLabel} ({pending.length})
                        </div>
                        <table className="donor-table">
                          <thead><tr><th>#</th><th>Name</th><th>{t.amountLabel}</th></tr></thead>
                          <tbody>
                            {pending.map((d, idx) => (
                              <tr key={idx}>
                                <td style={{ color: "rgba(255,248,231,0.4)", width: 36 }}>{idx + 1}</td>
                                <td>{d.name}</td>
                                <td className="amount-cell">{d.amount ? `₹${d.amount}` : "—"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Committee (same gradient block, no Trust section) */}
      <div style={{ background: "linear-gradient(180deg, var(--dark), rgba(92,14,14,0.15), var(--dark))" }}>
        <div className="section">
          <h2 className="section-title" style={{ fontSize: 28 }}>{t.committeeTitle}</h2>
            <div className="committee-grid">
              <div className="member-card" style={{ maxWidth: 320 }}>
                <div className="member-avatar">
                  {t.member1?.charAt(0) || "A"}
                </div>
                <h3>{t.member1}</h3>
                <p>{t.member1Role}</p>
                {t.blessingLine && (
                  <p style={{ marginTop: 16, fontSize: 14, color: "rgba(255,248,231,0.7)", lineHeight: 1.7 }}>
                    {t.blessingLine}
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-icon">
          <TempleBadgeIcon size={40} />
        </div>
        <div className="footer-brand">{t.footerText}</div>
        <div className="footer-addr">{t.footerAddress}</div>
        <Divider />
        <div className="footer-copy">{t.footerRights}</div>
      </footer>
    </>
  );
}
