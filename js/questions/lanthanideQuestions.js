// lanthanideQuestions.js
export const questions = [

  // Basic recall (10 pts)
  {
    text: "What is the chemical symbol for Lanthanum?",
    options: ["La", "Ln", "Lt", "Lm"],
    correct: 0,
    points: 10
  },
  {
    text: "What is the atomic number of Cerium?",
    options: ["56", "57", "58", "59"],
    correct: 2,
    points: 10
  },
  {
    text: "Which lanthanide is named after the dwarf planet Ceres?",
    options: ["Cerium", "Promethium", "Europium", "Gadolinium"],
    correct: 0,
    points: 10
  },
  {
    text: "Which lanthanide has no stable isotopes?",
    options: ["Promethium (Pm)", "Neodymium (Nd)", "Samarium (Sm)", "Lanthanum (La)"],
    correct: 0,
    points: 10
  },
  {
    text: "Which lanthanide is most abundant in Earth's crust?",
    options: ["Cerium", "Lanthanum", "Neodymium", "Praseodymium"],
    correct: 0,
    points: 10
  },

  // Conceptual / Trends (15 pts)
  {
    text: "What does the term 'lanthanide contraction' describe?",
    options: [
      "Increasing size across the series",
      "Decreasing size across the series",
      "Increasing electronegativity across the series",
      "Decreasing ionization energy across the series"
    ],
    correct: 1,
    points: 15
  },
  {
    text: "What is the most common oxidation state exhibited by lanthanides?",
    options: ["+2", "+3", "+4", "+5"],
    correct: 1,
    points: 15
  },
  {
    text: "Which lanthanide has the highest magnetic moment in its +3 oxidation state?",
    options: ["Gadolinium (Gd)", "Europium (Eu)", "Terbium (Tb)", "Dysprosium (Dy)"],
    correct: 0,
    points: 15
  },
  {
    text: "Across the lanthanide series, ionic radii generally:",
    options: ["Increase", "Decrease", "Remain constant", "Fluctuate"],
    correct: 1,
    points: 15
  },
  {
    text: "Separation of adjacent lanthanides is difficult primarily because of:",
    options: ["Similar ionic radii", "Identical electronegativities", "Varied oxidation states", "Differing ionization energies"],
    correct: 0,
    points: 15
  },

  // Stoichiometry & Calculations (20 pts)
  {
    text: "What mass of 0.100 mol Ce is that? (M Ce = 140.12 g/mol)",
    options: ["14.01 g", "140.12 g", "1.40 g", "28.02 g"],
    correct: 0,
    points: 20
  },
  {
    text: "If 2.00 mol La reacts with oxygen to form La₂O₃, what mass of La₂O₃ is produced? (2 La + 3/2 O₂ → La₂O₃; M La₂O₃ = 325.81 g/mol)",
    options: ["325.8 g", "251.5 g", "162.9 g", "651.6 g"],
    correct: 1,
    points: 20
  },
  {
    text: "Calculate the molarity of a solution containing 0.250 mol Nd(NO₃)₃ in 500.0 mL.",
    options: ["0.500 M", "0.250 M", "0.125 M", "1.00 M"],
    correct: 0,
    points: 20
  },
  {
    text: "How many moles of F⁻ are produced when 0.100 mol LaF₃ dissolves? (LaF₃ → La³⁺ + 3 F⁻)",
    options: ["0.100 mol", "0.300 mol", "0.050 mol", "0.400 mol"],
    correct: 1,
    points: 20
  },
  {
    text: "What volume (L) does 0.0500 mol of a monatomic lanthanide gas occupy at STP?",
    options: ["1.12 L", "0.50 L", "11.2 L", "2.24 L"],
    correct: 2,
    points: 20
  },

  // Equilibrium & Kinetics (25 pts)
  {
    text: "For the cell Ce⁴⁺ + e⁻ → Ce³⁺ (E° = +1.61 V), what is E when [Ce³⁺]=0.010 M and [Ce⁴⁺]=1.0 M at 25°C? (Nernst eqn)",
    options: ["1.64 V", "1.58 V", "1.61 V", "1.53 V"],
    correct: 0,
    points: 25
  },
  {
    text: "The rate law for oxidation of Ce³⁺ by H₂O₂ in acidic solution is rate = k[Ce³⁺][H₂O₂][H⁺]. If [H⁺] doubles, the rate:",
    options: ["Halves", "Doubles", "Quadruples", "No change"],
    correct: 1,
    points: 25
  },
  {
    text: "At equilibrium, La³⁺ + 3 OH⁻ ⇌ La(OH)₃(s). Adding NaOH beyond the solubility limit will:",
    options: ["Precipitate La(OH)₃", "Dissolve La(OH)₃", "No change", "Form a complex ion"],
    correct: 0,
    points: 25
  },
  {
    text: "Which lanthanide’s +2 oxidation state is stabilized by a half-filled f⁷ configuration?",
    options: ["Europium (Eu²⁺)", "Samarium (Sm²⁺)", "Ytterbium (Yb²⁺)", "Gadolinium (Gd²⁺)"],
    correct: 0,
    points: 25
  },
  {
    text: "The formation constant (Kf) of [Ce(NO₃)₆]²⁻ is 10³. At [Ce⁴⁺]=0.01 M and [NO₃⁻]=1.0 M, the complex concentration is approximately:",
    options: ["1×10² M", "1×10¹ M", "1×10⁰ M", "1×10⁻¹ M"],
    correct: 2,
    points: 25
  },

  // Acid–Base & Titrations (25 pts)
  {
    text: "What is the pH of a 0.100 M La(OH)₃ solution? (Assume complete dissociation)",
    options: ["13.52", "1.48", "12.00", "11.52"],
    correct: 0,
    points: 25
  },
  {
    text: "25.00 mL of 0.100 M Ce(SO₄)₂ is titrated with 0.100 M NaOH. Volume at equivalence (Ce⁴⁺ + 4 OH⁻)?",
    options: ["100.0 mL", "25.00 mL", "50.00 mL", "75.00 mL"],
    correct: 2,
    points: 25
  },
  {
    text: "Which indicator is most suitable for titrating a trivalent lanthanide with NaOH?",
    options: ["Phenolphthalein (pH 8.2–10)", "Bromocresol green (pH 3.8–5.4)", "Phenol red (pH 6.8–8.4)", "Methyl orange (pH 3.1–4.4)"],
    correct: 2,
    points: 25
  },
  {
    text: "At half-equivalence in titrating a Ce⁴⁺ solution with reducing agent, pH equals:",
    options: ["pKa", "7.00", "pH where [Ce³⁺]=[Ce⁴⁺]", "Kw/pKa"],
    correct: 2,
    points: 25
  },
  {
    text: "Which lanthanide oxide is amphoteric, reacting with both acids and bases?",
    options: ["CeO₂", "La₂O₃", "Tb₄O₇", "Yb₂O₃"],
    correct: 0,
    points: 25
  },

  // Advanced interdisciplinary (30 pts)
  {
    text: "Gadolinium compounds are used as contrast agents in MRI because Gd³⁺ has:",
    options: [
      "Seven unpaired f-electrons",
      "A half-filled d-subshell",
      "High nuclear spin",
      "Low toxicity"
    ],
    correct: 0,
    points: 30
  },
  {
    text: "Neodymium-doped yttrium aluminum garnet (Nd:YAG) lasers emit at ~1064 nm via:",
    options: ["4f–4f transitions", "5d–4f transitions", "Charge-transfer bands", "Ligand-to-metal CT"],
    correct: 0,
    points: 30
  },
  {
    text: "Europium phosphors in LEDs typically emit which color?",
    options: ["Red", "Green", "Blue", "Yellow"],
    correct: 0,
    points: 30
  },
  {
    text: "Lanthanide lines in stellar spectra are used to study:",
    options: ["Nucleosynthesis in stars", "Planetary atmospheres", "Earth’s core composition", "DNA sequencing"],
    correct: 0,
    points: 30
  },
  {
    text: "Separation of lanthanides by solvent extraction exploits differences in:",
    options: ["Complex formation strength", "Oxidation state", "Ionic radius", "Electronegativity"],
    correct: 0,
    points: 30
  },
  {
    text: "Cerium oxide (CeO₂) is used in automotive catalytic converters as a:",
    options: ["Oxygen buffer", "NOx adsorbent", "Hydrocarbon oxidizer", "Fuel additive"],
    correct: 0,
    points: 30
  },
  {
    text: "Praseodymium-doped glass is used in fiber optics because of:",
    options: ["Sharp emission bands", "High refractive index", "Low dispersion", "High thermal conductivity"],
    correct: 0,
    points: 30
  },
  {
    text: "Samarium–cobalt magnets rely on Sm₂Co₁₇ phase; what property makes them useful at high temperatures?",
    options: ["High Curie temperature", "Low coercivity", "High conductivity", "Low density"],
    correct: 0,
    points: 30
  }
];
