// period4Questions.js
export const questions = [
  // Basic recall (10 pts)
  {
    text: "What is the chemical symbol for potassium?",
    options: ["P", "Po", "Pt", "K"],
    correct: 3,
    points: 10
  },
  {
    text: "Calcium is an alkaline earth metal in Period 4. What is its atomic number?",
    options: ["19", "20", "21", "22"],
    correct: 1,
    points: 10
  },
  {
    text: "Which Period 4 element is a transition metal used in aerospace alloys due to its high strength-to-weight ratio?",
    options: ["Scandium", "Titanium", "Vanadium", "Chromium"],
    correct: 1,
    points: 10
  },
  {
    text: "Which Period 4 element exists as a liquid at room temperature?",
    options: ["Bromine", "Mercury", "Gallium", "Cesium"],
    correct: 0,
    points: 10
  },
  {
    text: "Which of these Period 4 elements commonly forms a +2 cation in aqueous solution?",
    options: ["Scandium", "Titanium", "Calcium", "Chromium"],
    correct: 2,
    points: 10
  },

  // Conceptual / Trends (15 pts)
  {
    text: "In a flame test, calcium imparts what color to the flame?",
    options: ["Brick-red", "Yellow", "Lilac", "Orange-red"],
    correct: 3,
    points: 15
  },
  {
    text: "Which Period 4 element is ferromagnetic at room temperature?",
    options: ["Manganese", "Iron", "Cobalt", "Nickel"],
    correct: 1,
    points: 15
  },
  {
    text: "Chromium(VI) in dichromate (Cr₂O₇²⁻) is reduced to Cr³⁺. How many electrons are transferred per chromium atom?",
    options: ["1", "2", "3", "6"],
    correct: 2,
    points: 15
  },
  {
    text: "Which Period 4 metal is used to galvanize steel to prevent rusting?",
    options: ["Nickel", "Zinc", "Tin", "Iron"],
    correct: 1,
    points: 15
  },
  {
    text: "Gallium has a melting point near 30 °C. Which demonstration illustrates this property?",
    options: ["It melts in your hand", "It evaporates quickly", "It sparks in air", "It glows faintly"],
    correct: 0,
    points: 15
  },

  // Stoichiometry & Calculations (20 pts)
  {
    text: "How many moles of KCl are produced when 0.500 mol KOH reacts with excess HCl? (KOH + HCl → KCl + H₂O)",
    options: ["0.250 mol", "0.500 mol", "1.000 mol", "0.750 mol"],
    correct: 1,
    points: 20
  },
  {
    text: "If 40.0 g of Ca reacts completely with O₂ to form CaO (2 Ca + O₂ → 2 CaO), how many grams of CaO are produced? (M Ca=40.08, M CaO=56.08)",
    options: ["40.0 g", "55.9 g", "80.0 g", "112.2 g"],
    correct: 1,
    points: 20
  },
  {
    text: "What is the pH of a 0.100 M Ca(OH)₂ solution? (Assume complete dissociation)",
    options: ["1.70", "12.30", "13.00", "14.00"],
    correct: 1,
    points: 20
  },
  {
    text: "How many milliliters of 0.100 M HCl are needed to neutralize 25.0 mL of 0.150 M Ca(OH)₂? (2 HCl + Ca(OH)₂ → CaCl₂ + 2 H₂O)",
    options: ["75.0 mL", "37.5 mL", "125.0 mL", "50.0 mL"],
    correct: 0,
    points: 20
  },
  {
    text: "Given Ksp for CaF₂ is 1.4×10⁻¹⁰, what is [Ca²⁺] in a saturated solution? (CaF₂ → Ca²⁺ + 2 F⁻)",
    options: ["3.2×10⁻⁴ M", "2.4×10⁻⁴ M", "5.2×10⁻³ M", "1.2×10⁻² M"],
    correct: 0,
    points: 20
  },

  // Equilibrium & Kinetics (25 pts)
  {
    text: "For the half-reaction Cr₂O₇²⁻ + 14 H⁺ + 6 e⁻ → 2 Cr³⁺ + 7 H₂O, what is E°cell if E°(Cr₂O₇²⁻/Cr³⁺)=1.33 V?",
    options: ["1.33 V", "0.67 V", "2.00 V", "1.67 V"],
    correct: 0,
    points: 25
  },
  {
    text: "The rate law for H₂O₂ decomposition catalyzed by MnO₂ is rate=k[H₂O₂]. If [H₂O₂] doubles, the rate:",
    options: ["Remains the same", "Doubles", "Quadruples", "Halves"],
    correct: 1,
    points: 25
  },
  {
    text: "At equilibrium, 2 Fe³⁺ + 2 I⁻ ⇌ 2 Fe²⁺ + I₂. If [I⁻] is increased, [Fe²⁺] will:",
    options: ["Increase", "Decrease", "Remain unchanged", "Shift to reactants"],
    correct: 0,
    points: 25
  },
  {
    text: "Calculate ΔH°rxn for formation of TiO₂ from elements if ΔHf°(TiO₂)=−944 kJ/mol.",
    options: ["−944 kJ", "0 kJ", "+944 kJ", "Insufficient data"],
    correct: 0,
    points: 25
  },
  {
    text: "Which Period 4 complex exhibits a UV–Vis d–d transition giving a pale violet color?",
    options: ["[Ti(H₂O)₆]³⁺", "[Sc(H₂O)₆]³⁺", "[Ca(H₂O)₈]²⁺", "[K(H₂O)₈]⁺"],
    correct: 0,
    points: 25
  },

  // Advanced interdisciplinary (30 pts)
  {
    text: "Which iron oxidation state binds O₂ reversibly in hemoglobin?",
    options: ["Fe⁰", "Fe²⁺", "Fe³⁺", "Fe⁴⁺"],
    correct: 1,
    points: 30
  },
  {
    text: "In nickel-metal hydride batteries, Ni(OH)₂ → NiOOH exhibits what color change upon charging?",
    options: ["Green to brown", "White to yellow", "Blue to red", "No change"],
    correct: 0,
    points: 30
  },
  {
    text: "Gallium’s electron configuration exhibits an Aufbau violation. Which subshell fills after 4p?",
    options: ["4d", "5s", "5p", "6s"],
    correct: 1,
    points: 30
  },
  {
    text: "Germanium sits below silicon. Which property diverges most due to relativistic effects?",
    options: ["Melting point", "Ionization energy", "Atomic radius", "Electron affinity"],
    correct: 1,
    points: 30
  },
  {
    text: "Arsenic-75 decays by which process?",
    options: ["Alpha emission", "Beta emission", "Electron capture", "Gamma emission"],
    correct: 2,
    points: 30
  },
  {
    text: "Bromine undergoes photodissociation (Br₂ + hν → 2 Br·). What minimum wavelength corresponds to the bond energy (~193 kJ/mol)?",
    options: ["620 nm", "350 nm", "150 nm", "1000 nm"],
    correct: 0,
    points: 30
  },
  {
    text: "Which of these is the correct electron configuration anomaly for copper?",
    options: ["[Ar]3d¹⁰ 4s¹", "[Ar]3d⁹ 4s²", "[Ar]3d¹⁰ 4p¹", "[Ar]3d⁵ 4s¹"],
    correct: 0,
    points: 30
  },
  {
    text: "Which element has the ground-state configuration [Ar]3d⁵ 4s¹?",
    options: ["Chromium", "Copper", "Scandium", "Titanium"],
    correct: 0,
    points: 30
  },
  {
    text: "Manganese forms the permanganate ion (MnO₄⁻). What is the oxidation state of Mn?",
    options: ["+4", "+6", "+7", "+5"],
    correct: 2,
    points: 30
  },
  {
    text: "What is the formula and charge of the permanganate ion?",
    options: ["MnO₄⁻", "MnO₄²⁻", "MnO₃⁻", "Mn₂O₇²⁻"],
    correct: 0,
    points: 10
  },
  {
    text: "When titrating 25.00 mL of 0.100 M Fe²⁺ with 0.100 M KMnO₄ (5 Fe²⁺ : 1 MnO₄⁻), what volume of KMnO₄ is required?",
    options: ["5.00 mL", "12.50 mL", "25.00 mL", "50.00 mL"],
    correct: 0,
    points: 25
  },
  {
    text: "When Zn(s) reacts with excess HCl, how many liters of H₂ gas at STP are produced from 0.500 mol Zn?",
    options: ["11.2 L", "22.4 L", "5.60 L", "44.8 L"],
    correct: 0,
    points: 20
  },
  {
    text: "Which complex ion is deep blue due to formation of [Cu(NH₃)₄]²⁺?",
    options: ["[Cu(H₂O)₆]²⁺", "[Cu(NH₃)₄]²⁺", "[Ni(NH₃)₆]²⁺", "[Zn(NH₃)₄]²⁺"],
    correct: 1,
    points: 20
  },
  {
    text: "Which of these complexes is colorless and diamagnetic?",
    options: ["[Ni(H₂O)₆]²⁺", "[Zn(H₂O)₆]²⁺", "[Cu(H₂O)₆]²⁺", "[Fe(H₂O)₆]²⁺"],
    correct: 1,
    points: 15
  },
  {
    text: "Which buffer system is most effective near pH 7.2?",
    options: ["Acetic acid/acetate", "Ammonia/ammonium", "Phosphate", "Bicarbonate"],
    correct: 2,
    points: 20
  },
  {
    text: "0.100 mol Na₂HPO₄ is mixed with 0.100 mol NaH₂PO₄ in 1.00 L. What is the pH? (pKa₂ of H₂PO₄⁻ = 7.2)",
    options: ["7.20", "6.80", "7.00", "8.20"],
    correct: 0,
    points: 20
  },
  {
    text: "A frustrated chemist said \"Alright,\nHere's flouride and chlorate and bromite,\nAnd iodate too,\nBut I've looked through and through,\nAnd I can't find the sodium _________!\"",
    options: ["chlorite", "nitrite", "flourite", "sulfite", "phosphite"],
    correct: 3,
    points: 90
  }
];
