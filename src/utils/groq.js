import { Groq } from "groq-sdk";

const GROQ_API = import.meta.env.VITE_RENS_BOT;

const groq = new Groq({
  apiKey: GROQ_API,
  dangerouslyAllowBrowser: true,
});

export const reqToGroqAi = async (content) => {
  const reply = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: 'llama3-8b-8192'
  });
  return reply.choices[0].message.content
};
