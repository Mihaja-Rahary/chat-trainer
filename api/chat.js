export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, persona } = req.body;

  const systemPrompt = `
You simulate a male fan on an adult platform.
Persona: ${persona}

Behaviors:
- Respond naturally, sometimes short, sometimes hesitant.
- Do NOT help the user sell directly.
- React emotionally and realistically.
- Stay in character.
- The goal is to train GFE discovery and escalation skills.
`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: systemPrompt + "\nUser: " + message }] }
          ]
        })
      }
    );

    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    res.status(200).json({ reply: text });
  } catch (e) {
    res.status(500).json({ error: "AI error" });
  }
}
