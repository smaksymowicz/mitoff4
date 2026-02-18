export const predefinedAnswers = {
  "Czy antybiotyki działają na infekcje wirusowe?": {
    probability: 0,
    truth: "Fałsz",
    explanation: "Antybiotyki działają tylko na bakterie, nie na wirusy.",
    sources: [
      "https://www.cdc.gov/antibiotic-use",
      "https://www.who.int/news-room/fact-sheets/detail/antibiotic-resistance"
    ]
  },
  "Czy witamina C leczy przeziębienie?": {
    probability: 20,
    truth: "Fałsz",
    explanation: "Badania pokazują minimalny efekt witaminy C w zapobieganiu przeziębieniom u osób zdrowych, nie ma dowodów na leczenie.",
    sources: [
      "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD000980.pub4/full"
    ]
  },
  "Czy szczepionki powodują autyzm?": {
    probability: 0,
    truth: "Fałsz",
    explanation: "Nie ma dowodów naukowych, że szczepionki powodują autyzm.",
    sources: [
      "https://www.cdc.gov/vaccinesafety/concerns/autism.html",
      "https://www.who.int/news-room/fact-sheets/detail/vaccine-safety"
    ]
  }
  // tutaj możesz dodać resztę pytań z listy rozwijanej
};
