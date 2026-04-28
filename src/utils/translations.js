export const translations = {
  en: { discover: "Discover", pantry: "Pantry", market: "Market", saved: "Saved", cooked: "Cooked", search: "Search...", welcome: "Welcome", start: "Start Browsing", voice: "Voice Search", read: "Listen", ingredients: "Ingredients", steps: "Steps", exit: "Exit" },
  zh: { discover: "发现", pantry: "食品室", market: "市场", saved: "已保存", cooked: "已烹饪", search: "搜索...", welcome: "欢迎", start: "开始浏览", voice: "语音搜索", read: "听取", ingredients: "配料", steps: "步骤", exit: "退出" },
  hi: { discover: "खोजें", pantry: "भंडार", market: "बाज़ार", saved: "सहेजा गया", cooked: "पकाया हुआ", search: "खोजें...", welcome: "स्वागत है", start: "शुरू करें", voice: "आवाज खोज", read: "सुनें", ingredients: "सामग्री", steps: "चरण", exit: "निकास" },
  ar: { discover: "اكتشف", pantry: "المخزن", market: "السوق", saved: "المحفوظات", cooked: "مطبوخ", search: "بحث...", welcome: "أهلاً بك", start: "ابدأ التصفح", voice: "بحث صوتي", read: "استمع", ingredients: "المكونات", steps: "الخطوات", exit: "خروج" },
  es: { discover: "Descubrir", pantry: "Despensa", market: "Mercado", saved: "Guardado", cooked: "Cocinado", search: "Buscar...", welcome: "Bienvenido", start: "Comenzar", voice: "Voz", read: "Escuchar", ingredients: "Ingredientes", steps: "Pasos", exit: "Salir" },
  de: { discover: "Entdecken", pantry: "Speisekammer", market: "Markt", saved: "Gespeichert", cooked: "Gekocht", search: "Suchen...", welcome: "Willkommen", start: "Starten", voice: "Sprachsuche", read: "Hören", ingredients: "Zutaten", steps: "Schritte", exit: "Beenden" },
  yo: { discover: "Ṣawari", pantry: "Iyẹfun", market: "Ọja", saved: "Ti fipamọ", cooked: "Ti sè", search: "Wa...", welcome: "Kaabo", start: "Bẹrẹ", voice: "Ohùn", read: "Gbọ", ingredients: "Eroja", steps: "Igbese", exit: "Jade" },
  ig: { discover: "Chọpụta", pantry: "Ebe Nri", market: "Ahịa", saved: "Echekwara", cooked: "Esiri esi", search: "Chọọ...", welcome: "Nnọọ", start: "Malite", voice: "Okwu", read: "Gee ntị", ingredients: "Ihe eji esi nri", steps: "Nzọụkwụ", exit: "Pụọ" }
};

export const speechLangMap = {
  en: 'en-US', zh: 'zh-CN', hi: 'hi-IN', ar: 'ar-SA', es: 'es-ES', de: 'de-DE', yo: 'en-NG', ig: 'en-NG'
};

export const translateAPI = async (text, target) => {
  if (target === 'en' || !text) return text;
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURI(text)}`);
    const data = await res.json();
    return data[0].map(x => x[0]).join("");
  } catch (e) { return text; }
};