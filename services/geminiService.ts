import { GoogleGenAI } from "@google/genai";
import { partners } from "./data";

// Initialize Gemini AI
// Note: In a real production app, API keys should be handled via backend proxy.
// Since this is a client-side demo, we assume process.env.API_KEY is available.
const apiKey = process.env.API_KEY || 'demo-key';
const ai = new GoogleGenAI({ apiKey });

export const generateAiTip = async (partnerName: string, category: string): Promise<string> => {
  if (!process.env.API_KEY) {
      // Fallback if no key is present for the demo
      return `Dica IA: Aproveite os benefícios exclusivos da ${partnerName} para economizar em ${category}!`;
  }

  try {
    const model = "gemini-2.5-flash";
    const prompt = `Crie uma frase curta, divertida e motivadora (máximo 20 palavras) para um aluno do colégio Salesiano sobre por que ele deve visitar o parceiro "${partnerName}" da categoria "${category}". Use emojis.`;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Benefício exclusivo para você! 🚀";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Benefício incrível esperando por você! ✨";
  }
};

export const getAiRecommendation = async (query: string): Promise<string> => {
    if (!process.env.API_KEY) return "Explore nossas categorias para encontrar o que precisa!";

    try {
        const partnerList = partners.map(p => `${p.name} (${p.category}): ${p.offer}`).join(", ");
        const prompt = `Atue como um assistente do Clube de Vantagens Salesiano. O usuário perguntou: "${query}". Com base nestes parceiros: [${partnerList}], sugira a melhor opção. Responda curto e amigável.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text || "Não encontrei nada específico, mas confira nossas categorias!";
    } catch (error) {
        return "Desculpe, não consegui processar sua busca agora.";
    }
}

export const sendChatMessage = async (userMessage: string, history: {role: string, text: string}[]): Promise<string> => {
    if (!process.env.API_KEY) return "Olá! Sou o assistente virtual do Salesiano. Como não tenho uma chave de API configurada neste demo, não posso processar respostas reais, mas estou aqui para ajudar a encontrar os melhores descontos!";

    try {
        // Construct context with partner data
        const partnersContext = partners.map(p => 
            `- ${p.name} (${p.category}): Oferta de ${p.offer}. Detalhes: ${p.offerDetails}. Local: ${p.address}.`
        ).join("\n");

        const systemInstruction = `
            Você é o "Leo", o assistente virtual especialista do Clube de Vantagens do Colégio Salesiano Santa Terezinha.
            
            Sua missão é ajudar alunos e pais a encontrarem os melhores descontos e parceiros.
            
            DADOS DOS PARCEIROS ATUAIS:
            ${partnersContext}

            DIRETRIZES:
            1. Seja muito educado, entusiasta e jovem. Use emojis.
            2. Responda APENAS com base nos dados dos parceiros fornecidos acima. Se não souber, diga que ainda não temos esse parceiro.
            3. Mantenha as respostas curtas e diretas (máximo 3 frases).
            4. Sempre incentive o uso do app.
        `;

        // Since we are using a simple request/response model for this demo (stateless wrapper), 
        // we construct the prompt with history manually or use the chat model.
        // Here we simply concatenate for a single turn strong context.
        
        const prompt = `${systemInstruction}\n\nHistórico da conversa:\n${history.map(h => `${h.role}: ${h.text}`).join('\n')}\n\nUsuário: ${userMessage}\nLeo:`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text || "Desculpe, não entendi. Pode repetir?";
    } catch (error) {
        console.error("Chat Error", error);
        return "Tive um pequeno problema técnico, mas tente navegar pelas categorias!";
    }
};