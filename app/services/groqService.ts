import Groq from "groq-sdk";

// Cria o cliente GROQ
const groq = new Groq({
  apiKey: import.meta.env.VITE_API_KEY, // Use sua chave de API
  dangerouslyAllowBrowser: true,
});

// Função que faz a chamada para a API do GROQ
export async function getGroqChatCompletion(userTranslate: string): Promise<string> {
  if (!userTranslate) {
    throw new Error("O texto do usuário não pode estar vazio.");
  }

  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: userTranslate,
        },
        {
          role: "system",
          content: "you are a translator app.",
        },
      ],
      model: "gemma2-9b-it",
    });

    // Retorna apenas o conteúdo da resposta
    return response.choices[0]?.message?.content || "Sem resposta.";
  } catch (error) {
    console.error("Erro ao obter resposta do GROQ:", error);
    throw new Error("Erro ao carregar a resposta.");
  }
}
