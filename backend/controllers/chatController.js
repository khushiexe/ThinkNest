console.log("chatController loaded");
import ai from "../config/gemini.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: `
      You are ThinkNest AI, a friendly AI tutor.
      
      Instructions:
      - If the user greets you (hello, hi, hey, good morning, etc.), respond with a short friendly greeting in 1–2 sentences.
      - If the user asks an academic or programming question, answer in Markdown.
      - Use headings, bullet points and tables when useful.
      - Wrap every code example inside triple backticks and specify the language.
      - Keep answers concise unless the user asks for a detailed explanation.
      
      User:
      ${message}
      `,
    });

    console.log(response);

    res.json({
      success: true,
      reply: response.text,
    });
  } catch (error) {
    console.error("FULL ERROR:");
    console.dir(error, { depth: null });

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};