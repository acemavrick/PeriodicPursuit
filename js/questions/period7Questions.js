// period7Questions.js
export const questions = [

  // Basic recall (10 pts)
  {
    text: "What is the chemical symbol for Francium?",
    options: ["Fr", "Fc", "Fn", "Fm"],
    correct: 0,
    points: 10
  },
  {
    text: "Radium belongs to which group of the periodic table?",
    options: ["Group 1 (Alkali metals)", "Group 2 (Alkaline earth)", "Group 16 (Chalcogens)", "Group 17 (Halogens)"],
    correct: 1,
    points: 10
  },
  {
    text: "Rutherfordium has the atomic number:",
    options: ["102", "104", "106", "108"],
    correct: 1,
    points: 10
  },
  {
    text: "Copernicium is named after which scientist?",
    options: ["Copernicus", "Einstein", "Newton", "Curie"],
    correct: 0,
    points: 10
  },
  {
    text: "Oganesson is classified as a:",
    options: ["Noble gas", "Halogen", "Alkali metal", "Transition metal"],
    correct: 0,
    points: 10
  },

  // Conceptual / Trends (15 pts)
  {
    text: "Across Period 7 from Fr to Og, atomic radius generally:",
    options: ["Increases", "Decreases", "Peaks at the center", "Remains constant"],
    correct: 1,
    points: 15
  },
  {
    text: "First ionization energy across Period 7 generally:",
    options: ["Increases", "Decreases", "Is constant", "Fluctuates without trend"],
    correct: 0,
    points: 15
  },
  {
    text: "Relativistic effects in element 112 (Copernicium) are predicted to make it:",
    options: ["A noble gas", "A volatile liquid", "Highly reactive metal", "A radioactive gas"],
    correct: 1,
    points: 15
  },
  {
    text: "Lanthanide contraction influences Period 7 elements such that Hafnium and Rutherfordium have:",
    options: ["Very different sizes", "Nearly identical atomic radii", "Different valence shells", "Unusual magnetism"],
    correct: 1,
    points: 15
  },
  {
    text: "Tennessine (Element 117) is predicted to behave chemically as a:",
    options: ["Metallic halogen", "Noble gas", "Alkali metal", "Transition metal"],
    correct: 0,
    points: 15
  },

  // Nuclear stoichiometry & calculations (20 pts)
  {
    text: "What is the activity (in becquerel) of 1.00 μg of Ra-226 (t₁/₂ = 1600 yr)? (λ=ln2/t₁/₂; NA=6.02×10²³)",
    options: [
      "3.7×10⁴ Bq",
      "1.2×10³ Bq",
      "2.5×10⁵ Bq",
      "6.0×10⁶ Bq"
    ],
    correct: 0,
    points: 20
  },
  {
    text: "After 13.4 billion years (≈3 half-lives), the fraction of an initial U-238 sample remaining is:",
    options: ["1/8", "1/4", "1/2", "1/16"],
    correct: 0,
    points: 20
  },
  {
    text: "How many moles are in 1.00 g of Radon gas (Rn, M=222.0 g/mol)?",
    options: ["4.50×10⁻³ mol", "2.22×10⁻² mol", "1.00×10⁻³ mol", "9.00×10⁻³ mol"],
    correct: 0,
    points: 20
  },
  {
    text: "What volume (L) would those moles of Rn (from 1.00 g) occupy at STP?",
    options: ["0.10 L", "0.50 L", "1.00 L", "5.00 L"],
    correct: 0,
    points: 20
  },
  {
    text: "Convert 2.00 mCi of activity into becquerel (1 Ci = 3.70×10¹⁰ Bq).",
    options: [
      "7.40×10⁷ Bq",
      "1.85×10⁸ Bq",
      "2.00×10⁶ Bq",
      "3.70×10¹² Bq"
    ],
    correct: 1,
    points: 20
  },

  // Acid–Base & Titrations (25 pts)
  {
    text: "What is the pH of a 0.0500 M FrOH solution? (Assume complete dissociation)",
    options: ["12.30", "13.00", "11.70", "7.00"],
    correct: 0,
    points: 25
  },
  {
    text: "25.00 mL of 0.100 M Ra(OH)₂ is titrated with 0.100 M HCl. Volume at equivalence is:",
    options: ["50.00 mL", "25.00 mL", "12.50 mL", "100.0 mL"],
    correct: 2,
    points: 25
  },
  {
    text: "Which indicator is best for titrating a strong base with a strong acid?",
    options: ["Methyl orange (pH 3.1–4.4)", "Phenolphthalein (pH 8.2–10)", "Bromothymol blue (pH 6.0–7.6)", "Thymol blue (pH 8.0–9.6)"],
    correct: 0,
    points: 25
  },
  {
    text: "At half-equivalence in titrating RnOH with HCl, pH equals:",
    options: ["pKa of RnOH", "7.00", "pKb of OH⁻", "pKw/2"],
    correct: 3,
    points: 25
  },
  {
    text: "Which Period 7 oxide is amphoteric and dissolves in both acid and base?",
    options: ["RnO₂", "Fr₂O", "RaO₂", "HsO₄"],
    correct: 2,
    points: 25
  },

  // Advanced interdisciplinary (30 pts)
  {
    text: "Element 114 (Flerovium) is predicted to lie on the 'island of stability.' Its most stable isotope has a half-life of about:",
    options: ["30 s", "1 s", "1 μs", "10 min"],
    correct: 0,
    points: 30
  },
  {
    text: "Mendelevium (Md) was first produced by bombarding Einsteinium with:",
    options: ["Alpha particles", "Protons", "Neutrons", "Gamma rays"],
    correct: 0,
    points: 30
  },
  {
    text: "Which superheavy element’s chemistry has been probed by isolating a single atom in a gas-phase chromatography experiment?",
    options: ["Copernicium (Cn)", "Livermorium (Lv)", "Tennessine (Ts)", "Oganesson (Og)"],
    correct: 0,
    points: 30
  },
  {
    text: "The r-process in supernovae is responsible for creating elements heavier than iron via:",
    options: ["Rapid neutron capture", "Slow neutron capture", "Proton capture", "Alpha capture"],
    correct: 0,
    points: 30
  },
  {
    text: "Spectroscopic studies of Hassium (Hs) compounds probe its oxidation state via:",
    options: ["X-ray absorption near-edge structure", "UV–Vis d–d transitions", "IR vibrational modes", "NMR chemical shifts"],
    correct: 0,
    points: 30
  },
  {
    text: "Relativistic stabilization of 7s electrons in gold (Period 6) explains its color; similar effects in Oganesson (Og) may make it a:",
    options: ["Semi-metal at STP", "Transparent gas", "Superconducting solid", "Radioactive liquid"],
    correct: 0,
    points: 30
  },
  {
    text: "A frustrated chemist said \"Alright,\nHere's flouride and chlorate and bromite,\nAnd iodate too,\nBut I've looked through and through,\nAnd I can't find the sodium _________!\"",
    options: ["chlorite", "nitrite", "flourite", "sulfite", "phosphite"],
    correct: 2,
    points: 90
  }
];
