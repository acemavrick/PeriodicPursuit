// period5Questions.js
export const questions = [

  // Basic recall (10 pts)
  {
    text: "What is the chemical symbol for Rubidium?",
    options: ["Rb", "Ru", "Rd", "Re"],
    correct: 0,
    points: 10
  },
  {
    text: "Strontium is in which group of the periodic table?",
    options: ["Group 1 (Alkali metals)", "Group 2 (Alkaline earth)", "Group 17 (Halogens)", "Group 18 (Noble gases)"],
    correct: 1,
    points: 10
  },
  {
    text: "What is the atomic number of Yttrium (Y)?",
    options: ["38", "39", "40", "41"],
    correct: 1,
    points: 10
  },
  {
    text: "Zirconium (Zr) is widely used in nuclear reactor cladding because it has a ____ neutron absorption cross-section.",
    options: ["High", "Low", "Variable", "Negligible"],
    correct: 1,
    points: 10
  },
  {
    text: "Niobium (Nb) is named after Niobe in Greek myth. What is its atomic number?",
    options: ["40", "41", "42", "43"],
    correct: 3,
    points: 10
  },
  {
    text: "Technetium (Tc) is unique among the lighter elements because it has no ____.",
    options: ["Stable isotopes", "Radioactive isotopes", "Metallic properties", "Atomic weight"],
    correct: 0,
    points: 10
  },

  // Conceptual / Periodic Trends (15 pts)
  {
    text: "Across Period 5, which factor primarily causes atomic radius to decrease?",
    options: ["Increasing shielding", "Increasing effective nuclear charge", "Electron–electron repulsion", "Relativistic effects"],
    correct: 1,
    points: 15
  },
  {
    text: "Which Period 5 element has the highest electronegativity?",
    options: ["Strontium", "Zirconium", "Tellurium", "Xenon"],
    correct: 2,
    points: 15
  },
  {
    text: "First ionization energy generally ____ across Period 5 from Rb to Xe.",
    options: ["Increases", "Decreases", "Remains constant", "Fluctuates randomly"],
    correct: 0,
    points: 15
  },
  {
    text: "Metallic character ____ across Period 5 from Rb to Xe.",
    options: ["Increases", "Decreases", "Peaks at the center", "Is unaffected"],
    correct: 1,
    points: 15
  },
  {
    text: "Which of these is NOT a transition metal in Period 5?",
    options: ["Rhodium", "Palladium", "Silver", "Tin"],
    correct: 3,
    points: 15
  },
  {
    text: "The concept of lanthanide contraction explains similarities in size\nbetween Zr (Period 5) and which Period 6 element?",
    options: ["Hafnium", "Tantalum", "Lead", "Mercury"],
    correct: 0,
    points: 15
  },

  // Stoichiometry & Calculations (20 pts)
  {
    text: "How many moles of H₂ gas are produced when 0.500 mol Rb reacts with excess H₂O? (2 Rb + 2 H₂O → 2 RbOH + H₂)",
    options: ["0.125 mol", "0.250 mol", "0.500 mol", "1.000 mol"],
    correct: 1,
    points: 20
  },
  {
    text: "When 5.00 g of Sr reacts with excess HCl, how many liters of H₂ at STP are formed? (Sr + 2 HCl → SrCl₂ + H₂)",
    options: ["0.30 L", "0.60 L", "1.20 L", "2.40 L"],
    correct: 1,
    points: 20
  },
  {
    text: "10.0 g of Yttrium metal reacts with O₂: 4 Y + 3 O₂ → 2 Y₂O₃. What mass of Y₂O₃ is produced? (M Y=88.91, M Y₂O₃=225.81)",
    options: ["12.7 g", "18.0 g", "22.6 g", "31.5 g"],
    correct: 2,
    points: 20
  },
  {
    text: "How many grams of ZrO₂ form when 1.00 mol Zr reacts with excess O₂? (2 Zr + O₂ → 2 ZrO₂; M ZrO₂=123.22)",
    options: ["123.2 g", "246.4 g", "61.6 g", "184.8 g"],
    correct: 1,
    points: 20
  },
  {
    text: "What volume of 0.150 M NbCl₅ solution contains 0.225 mol NbCl₅?",
    options: ["0.50 L", "1.50 L", "0.225 L", "2.25 L"],
    correct: 1,
    points: 20
  },
  {
    text: "Molar mass of Technetium-99m (⁹⁹ᵐTc) is ~99 amu. How many grams are in 5.00×10¹⁹ atoms? (NA=6.02×10²³)",
    options: ["8.20×10⁻³ g", "5.00×10⁻³ g", "1.65×10⁻² g", "3.30×10⁻³ g"],
    correct: 0,
    points: 20
  },

  // Equilibrium & Kinetics (25 pts)
  {
    text: "For 2 NO₂ ⇌ N₂O₄ at 298 K, Kc=0.113. If [NO₂]₀=0.200 M, what is [N₂O₄] at equilibrium?",
    options: ["0.011 M", "0.020 M", "0.040 M", "0.080 M"],
    correct: 2,
    points: 25
  },
  {
    text: "Rate law for decomposition of N₂O₅: rate = k[N₂O₅]. If [N₂O₅] doubles, rate:",
    options: ["Remains same", "Doubles", "Quadruples", "Halves"],
    correct: 1,
    points: 25
  },
  {
    text: "At equilibrium for 2 SO₂ + O₂ ⇌ 2 SO₃, adding more O₂ shifts the reaction ____.",
    options: ["Right (more SO₃)", "Left (more SO₂)", "No change", "Forms solid"],
    correct: 0,
    points: 25
  },
  {
    text: "Calculate E°cell for Y³⁺ + 3 e⁻ → Y if E°(Y³⁺/Y)=–2.37 V and compare to Sr²⁺/Sr (–2.89 V). Which metal is easier to oxidize?",
    options: ["Yttrium", "Strontium", "Both equal", "Not enough data"],
    correct: 1,
    points: 25
  },
  {
    text: "In the reaction MoO₃ + H₂ → Mo + H₂O, if ΔH=–185 kJ, the reaction is ____.",
    options: ["Exothermic", "Endothermic", "Athermal", "Equilibrium only"],
    correct: 0,
    points: 25
  },

  // Acid–Base & Titrations (25 pts)
  {
    text: "What is the pH of a 0.0500 M Sr(OH)₂ solution? (Assume full dissociation)",
    options: ["12.40", "1.60", "13.00", "11.70"],
    correct: 0,
    points: 25
  },
  {
    text: "25.00 mL of 0.100 M HNO₃ is titrated with 0.100 M NaOH. What volume of NaOH reaches equivalence?",
    options: ["25.00 mL", "12.50 mL", "50.00 mL", "0 mL"],
    correct: 0,
    points: 25
  },
  {
    text: "At the half-equivalence point in titrating HBr with NaOH, the pH equals ____ of the acid (pKa≈–9).",
    options: ["pKa", "pKb", "7", "½ pKa"],
    correct: 0,
    points: 25
  },
  {
    text: "What is the pH at equivalence when titrating MoO₃ (amphoteric oxide) with HCl?",
    options: ["<7", "=7", ">7", "Depends on concentration"],
    correct: 2,
    points: 25
  },
  {
    text: "Which buffer system would best maintain pH around 9.2?",
    options: ["NH₃/NH₄⁺", "H₂CO₃/HCO₃⁻", "HPO₄²⁻/PO₄³⁻", "CH₃COOH/CH₃COO⁻"],
    correct: 0,
    points: 25
  },

  // Advanced interdisciplinary (30 pts)
  {
    text: "Strontium-90 (t₁/₂ = 28.8 yr) is used in radiotherapy. After 57.6 yr, the activity remaining is ____ of the original.",
    options: ["½", "¼", "⅛", "¾"],
    correct: 1,
    points: 30
  },
  {
    text: "Y-89 is 100% abundant and has I = ½. It is used in NMR at 11.7 T; its Larmor frequency is about ____ MHz.",
    options: ["19.9", "500", "250", "100"],
    correct: 0,
    points: 30
  },
  {
    text: "Nb becomes superconducting below 9.3 K. Which property drops to zero at Tc?",
    options: ["Electrical resistance", "Magnetic susceptibility", "Thermal conductivity", "Density"],
    correct: 0,
    points: 30
  },
  {
    text: "Tc-99m (Eγ ~140 keV) is used in medical imaging because it emits ____ radiation.",
    options: ["Gamma", "Alpha", "Beta", "Neutron"],
    correct: 0,
    points: 30
  },
  {
    text: "Ru(bpy)₃²⁺ complexes luminesce around 600 nm via ____ transitions.",
    options: ["d–d", "MLCT", "LMCT", "σ–σ*"],
    correct: 1,
    points: 30
  },
  {
    text: "Palladium catalysts in automotive converters oxidize CO to CO₂. This is a ____ reaction.",
    options: ["Redox", "Acid–base", "Precipitation", "Complexation"],
    correct: 0,
    points: 30
  },
  {
    text: "Cadmium telluride (CdTe) is used in solar cells; its band gap is ~1.5 eV, which corresponds to light of wavelength ____ nm.",
    options: ["830", "450", "1200", "300"],
    correct: 0,
    points: 30
  },
  {
    text: "Tin exhibits a phase transition at 13.2 °C between gray (α) and white (β) allotropes, known as ’tin pest.’ Which allotrope is metallic?",
    options: ["White (β)", "Gray (α)", "Both", "Neither"],
    correct: 0,
    points: 30
  },
  {
    text: "A frustrated chemist said \"Alright,\nHere's flouride and chlorate and bromite,\nAnd iodate too,\nBut I've looked through and through,\nAnd I can't find the sodium _________!\"",
    options: ["chlorite", "nitrite", "flourite", "sulfite", "phosphite"],
    correct: 2,
    points: 90
  },
  {
    text: "Hydrogen’s emission line at 656 nm is called?",
    options: ["H-alpha", "Lyman-alpha", "Paschen-beta", "Brackett-gamma"],
    correct: 0,
    points: 25
  }
];
