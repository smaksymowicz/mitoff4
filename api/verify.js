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
          { role: "system", content: "Jesteś ekspertem medycyny opartej na dowodach. Odpowiedz w formacie WERDYKT, PRAWDOPODOBIEŃSTWO, WYJAŚNIENIE, ŹRÓDŁA." },
          { role: "user", content: question }
        ],
        temperature: 0.2
      })
    });

    const data = await response.json();

    let resultText = "";
    if (data.choices?.[0]?.message?.content) {
      resultText = data.choices[0].message.content;
    } else if (Array.isArray(data) && data[0]?.generated_text) {
      resultText = data[0].generated_text;
    } else if (data.output_text) {
      resultText = data.output_text;
    } else {
      resultText = "Brak odpowiedzi z AI";
      console.log("Odpowiedź OpenRouter:", JSON.stringify(data, null, 2));
    }

    res.status(200).json({ result: resultText });

  } catch (err) {
    console.error("Błąd API:", err);
    res.status(500).json({ error: "Błąd serwera" });
  }
}
