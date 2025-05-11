// actinideQuestions.js
export const questions = [

  // Basic recall (10 pts)
  {
    text: "What is the chemical symbol for Uranium?",
    options: ["Un", "Ur", "U", "Ui"],
    correct: 2,
    points: 10
  },
  {
    text: "Thorium belongs to which series in the periodic table?",
    options: ["Lanthanides", "Actinides", "Transition metals", "Post-transition metals"],
    correct: 1,
    points: 10
  },
  {
    text: "All actinide elements share which property?",
    options: ["They are gaseous at STP", "They are noble metals", "They are radioactive", "They form diatomic molecules"],
    correct: 2,
    points: 10
  },
  {
    text: "Which actinide is named after Albert Einstein?",
    options: ["Einsteinium", "Mendelevium", "Curium", "Fermium"],
    correct: 0,
    points: 10
  },
  {
    text: "Which actinide is the primary fuel in most current nuclear reactors?",
    options: ["Plutonium-239", "Uranium-235", "Thorium-232", "Americium-241"],
    correct: 1,
    points: 10
  },
  {
    text: "Which naturally occurring actinide is most abundant in Earth's crust?",
    options: ["Uranium", "Thorium", "Actinium", "Protactinium"],
    correct: 1,
    points: 10
  },

  // Conceptual / Trends (15 pts)
  {
    text: "Actinide contraction refers to the trend of:",
    options: [
      "Increasing atomic radii across the series",
      "Decreasing atomic radii across the series",
      "Increasing melting points",
      "Uniform half-lives"
    ],
    correct: 1,
    points: 15
  },
  {
    text: "The most common oxidation state exhibited by actinide elements is:",
    options: ["+2", "+3", "+4", "+5"],
    correct: 1,
    points: 15
  },
  {
    text: "Which actinide oxide is amphoteric, dissolving in both acids and bases?",
    options: ["Uranium dioxide (UO₂)", "Thorium dioxide (ThO₂)", "Protactinium pentoxide (Pa₂O₅)", "Plutonium dioxide (PuO₂)"],
    correct: 0,
    points: 15
  },
  {
    text: "Across the actinide series, shielding of 5f electrons by inner electrons leads to:",
    options: ["Strong paramagnetism", "Large ionic radii", "Actinide contraction", "High electronegativity"],
    correct: 2,
    points: 15
  },
  {
    text: "Which actinide is commonly used in smoke detector ionization sources?",
    options: ["Uranium-238", "Americium-241", "Plutonium-239", "Thorium-232"],
    correct: 1,
    points: 15
  },
  {
    text: "Plutonium-239 undergoes which primary decay mode?",
    options: ["Alpha emission", "Beta minus emission", "Beta plus emission", "Spontaneous fission"],
    correct: 0,
    points: 15
  },

  // Stoichiometry & Calculations (20 pts)
  {
    text: "How many grams of UO₂ are produced from 1.00 mol of U (M U=238.05, M O=16.00)?",
    options: ["270.05 g", "286.05 g", "254.05 g", "302.05 g"],
    correct: 0,
    points: 20
  },
  {
    text: "In reactors, 1 fission of U-235 releases ~200 MeV. How many joules per mole of U-235 fissions? (1 eV = 1.602×10⁻¹⁹ J, NA=6.02×10²³)",
    options: ["1.93×10¹⁰ J", "1.93×10¹³ J", "3.20×10⁻⁸ J", "1.20×10⁷ J"],
    correct: 1,
    points: 20
  },
  {
    text: "What mass of Pu-239 is produced by neutron capture and β-decay from 1.00 mol of U-238? (Atomic masses nearly equal)",
    options: ["239 g", "238 g", "240 g", "237 g"],
    correct: 0,
    points: 20
  },
  {
    text: "Calculate the activity (in Bq) of 1.00 μg of Am-241 (t₁/₂=432.2 yr). (λ = ln2/t₁/₂)",
    options: ["8.00×10³ Bq", "3.80×10⁴ Bq", "1.20×10² Bq", "5.00×10⁵ Bq"],
    correct: 1,
    points: 20
  },
  {
    text: "How many moles of Th(NO₃)₄ are in 0.500 mol of Th metal converted completely (Th + 4 HNO₃ → Th(NO₃)₄ + 2 H₂)?",
    options: ["0.500 mol", "0.125 mol", "1.000 mol", "0.250 mol"],
    correct: 0,
    points: 20
  },
  {
    text: "What volume of 0.200 M HCl is required to dissolve 1.00 g of UO₃ (M=270.03) by UO₃ + 6 HCl → UCl₄ + Cl₂ + 3 H₂O?",
    options: ["45.0 mL", "60.0 mL", "90.0 mL", "30.0 mL"],
    correct: 0,
    points: 20
  },

  // Nuclear Chemistry & Decay (25 pts)
  {
    text: "After 24,000 years (one half-life) of Pu-239 (t₁/₂=24,000 yr), the fraction remaining is:",
    options: ["1/2", "1/4", "1/8", "1/16"],
    correct: 0,
    points: 25
  },
  {
    text: "Which decay chain culminates in stable Pb-206?",
    options: ["U-235 series", "U-238 series", "Th-232 series", "Pu-239 series"],
    correct: 1,
    points: 25
  },
  {
    text: "Np-237 undergoes which decay to form U-237?",
    options: ["Beta minus", "Alpha", "Electron capture", "Beta plus"],
    correct: 2,
    points: 25
  },
  {
    text: "What is the decay constant λ (in yr⁻¹) for Th-232 (t₁/₂=1.405×10¹⁰ yr)?",
    options: ["4.93×10⁻¹¹", "1.52×10⁻⁹", "2.33×10⁻⁵", "7.85×10⁻¹³"],
    correct: 0,
    points: 25
  },
  {
    text: "Which actinide primarily undergoes spontaneous fission?",
    options: ["Californium-252", "Uranium-238", "Plutonium-239", "Thorium-232"],
    correct: 0,
    points: 25
  },
  {
    text: "Which isotope is used in RTGs for spacecraft power?",
    options: ["Pu-238", "Am-241", "U-235", "Th-232"],
    correct: 0,
    points: 25
  },

  // Advanced interdisciplinary (30 pts)
  {
    text: "The r-process in supernovae generates heavy actinides via:",
    options: ["Rapid neutron capture", "Slow neutron capture", "Proton capture", "Alpha capture"],
    correct: 0,
    points: 30
  },
  {
    text: "MOX fuel contains a mixture of UO₂ and PuO₂. Typical Pu content is around:",
    options: ["5–10%", "50%", "90%", "25–30%"],
    correct: 0,
    points: 30
  },
  {
    text: "Actinium-225 (t₁/₂=10.0 d) is used in targeted alpha therapy. What makes alpha particles effective in cancer treatment?",
    options: [
      "High linear energy transfer (LET)",
      "Long penetration depth",
      "Low ionization",
      "Emits gamma rays only"
    ],
    correct: 0,
    points: 30
  },
  {
    text: "Spectroscopic speciation of U(VI) in solution often uses:",
    options: ["UV–Vis charge-transfer bands", "IR Pd–Cl bands", "NMR of ¹⁷O", "Raman of metal–metal bonds"],
    correct: 0,
    points: 30
  },
  {
    text: "Environmental remediation of Pu contamination uses which technique?",
    options: [
      "Ion-exchange with chelators",
      "Thermal decomposition",
      "Combustion",
      "Electroplating"
    ],
    correct: 0,
    points: 30
  },
  {
    text: "Critical mass for a bare sphere of Pu-239 is approximately:",
    options: ["10 kg", "1 kg", "100 kg", "0.1 kg"],
    correct: 0,
    points: 30
  }

];
