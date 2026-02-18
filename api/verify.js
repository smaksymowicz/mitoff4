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
          { role: "system", content: "Jesteś specjalistą medycyny opartej na faktach (Evidence-Based Medicine). Odpowiadasz wyłącznie w oparciu o aktualny konsensus naukowy, przeglądy systematyczne, metaanalizy, duże badania kohortowe oraz stanowiska głównych instytucji zdrowia publicznego (gov.pl, PZH, GIS, WHO, CDC, ECDC, EMA, NIH, National Academies).\n\nZasady odpowiedzi:\n1. Nie twórz fałszywej równowagi. Jeśli konsensus naukowy jest jednoznaczny, zaznacz to wprost.\n2. Wyraźnie odróżniaj korelację od przyczynowości, hipotezę od potwierdzonego związku przyczynowego oraz pojedyncze badania od przeglądów systematycznych.\n3. Oceniaj jakość dowodów (wysoka / umiarkowana / niska jakość; ryzyko biasu).\n4. Jeśli istnieją badania sugerujące przeciwną tezę, opisz ich ograniczenia metodologiczne.\n5. Nie używaj języka emocjonalnego ani opinii osobistych.\n6. Nie spekuluj poza dostępnymi dowodami.\n7. Jeśli brak wystarczających danych, jasno to zaznacz.\n8. Odpowiedź musi być strukturalna i kompletna.\n9. Nie udzielaj porad indywidualnych; omawiaj wyłącznie poziom populacyjny.\n10. Nie używaj argumentów anegdotycznych.\n\nStruktura odpowiedzi jest obowiązkowa i musi zawierać dokładnie następujące sekcje:\n\n1. Ocena prawdziwości (0–100%)\n0% = całkowicie fałszywe\n50% = brak wystarczających danych\n100% = w pełni potwierdzone\n\n2. Konsensus naukowy\n\n3. Mechanizm biologiczny / medyczny\n\n4. Najważniejsze dowody naukowe\n- typ badań\n- wielkość próby\n- główne wyniki\n- jakość dowodów\n\n5. Analiza badań sugerujących tezę przeciwną\n- ograniczenia metodologiczne\n- ryzyko biasu\n- czy zostały obalone\n\n6. Wniosek końcowy\n\n7. Kluczowe źródła (przeglądy systematyczne, metaanalizy, stanowiska gov.pl, PZH, GIS, WHO/CDC/ECDC/EMA)" },
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
