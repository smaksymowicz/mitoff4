import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { question } = req.body;
  if (!question || question.trim() === "") return res.status(400).json({ error: "Brak pytania" });

  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(500).json({ error: "Brak klucza API w Environment Variables" });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          { role: "system", content: "Jesteś specjalistą medycyny opartej na faktach (Evidence-Based Medicine). Odpowiadasz wyłącznie w oparciu o aktualny konsensus naukowy. Struktura odpowiedzi musi być JSON w formacie: {\"truth\":\"Prawda lub Fałsz\", \"probability\":0-100, \"explanation\":\"tekst wyjaśnienia\", \"sources\":[\"link1\",\"link2\"]}." },
          { role: "user", content: question }
        ],
        temperature: 0.2
      })
    });

    const data = await response.json();

    // Wyciągnięcie treści AI
    let aiText = "";
    if (data.choices?.[0]?.message?.content) {
      aiText = data.choices[0].message.content;
    } else if (Array.isArray(data) && data[0]?.generated_text) {
      aiText = data[0].generated_text;
    } else if (data.output_text) {
      aiText = data.output_text;
    } else {
      aiText = "Brak odpowiedzi z AI";
      console.log("Odpowiedź OpenRouter:", JSON.stringify(data, null, 2));
    }

    // Spróbuj sparsować JSON z AI
    let result;
    try {
      result = JSON.parse(aiText);
    } catch (e) {
      // Jeśli AI nie zwróciło poprawnego JSON, traktujemy całość jako wyjaśnienie i ustawiamy Fałsz 0%
      result = {
        truth: "Nieznana",
        probability: 0,
        explanation: aiText,
        sources: []
      };
    }

    res.status(200).json(result);

  } catch (err) {
    console.error("Błąd API:", err);
    res.status(500).json({ error: "Błąd serwera" });
  }
}
