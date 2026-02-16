export const detectLanguage = (text) => {
  const sample = text.toLowerCase().substring(0, 500);
  
  const langPatterns = {
    es: /\b(el|la|los|las|un|una|de|en|por|para|con|que|como|está|son|¿|¡)\b/gi,
    fr: /\b(le|la|les|un|une|de|en|pour|avec|dans|qui|que|est|sont|où)\b/gi,
    de: /\b(der|die|das|ein|eine|und|mit|für|von|ist|sind|zu|auf)\b/gi,
    pt: /\b(o|a|os|as|um|uma|de|em|para|com|que|como|está|são)\b/gi,
    it: /\b(il|lo|la|i|gli|le|un|una|di|in|per|con|che|è|sono)\b/gi,
  };

  let maxMatches = 0;
  let detectedLang = 'en';

  for (const [lang, pattern] of Object.entries(langPatterns)) {
    const matches = (sample.match(pattern) || []).length;
    if (matches > maxMatches && matches > 3) {
      maxMatches = matches;
      detectedLang = lang;
    }
  }

  return detectedLang;
};