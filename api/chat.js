export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, persona } = req.body;

  const prompt = `
You simulate a male fan chatting on a platform.
Personality: ${persona}

Rules:
- Answer naturally.
- Sometimes short, sometimes hesitant.
- Stay realistic and emotional.
- Never explain that you are an AI.
- Stay in character.

Agent message: "${message}"
Fan answer:
`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Hmm… je sais pas trop quoi répondre 😅";

    res.status(200).json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Erreur IA" });
  }
}
