// period6Questions.js
export const questions = [

  // Basic recall (10 pts)
  {
    text: "What is the chemical symbol for Cesium?",
    options: ["Cs", "Ce", "Cz", "Ci"],
    correct: 0,
    points: 10
  },
  {
    text: "Barium belongs to which group of the periodic table?",
    options: ["Group 1 (Alkali metals)", "Group 2 (Alkaline earth)", "Group 16 (Chalcogens)", "Group 17 (Halogens)"],
    correct: 1,
    points: 10
  },
  {
    text: "What is the atomic number of Hafnium (Hf)?",
    options: ["72", "73", "74", "75"],
    correct: 0,
    points: 10
  },
  {
    text: "Which Period 6 element is a liquid at room temperature?",
    options: ["Gold", "Mercury", "Lead", "Thallium"],
    correct: 1,
    points: 10
  },
  {
    text: "Gold (Au) is used in electronics due to its excellent conductivity and corrosion resistance. What is its atomic number?",
    options: ["79", "78", "80", "81"],
    correct: 0,
    points: 10
  },
  {
    text: "Lead–acid batteries use elemental lead and lead dioxide as electrodes. What is the formula for lead dioxide?",
    options: ["PbO₂", "Pb₂O", "PbO", "Pb₂O₃"],
    correct: 0,
    points: 10
  },

  // Conceptual / Periodic Trends (15 pts)
  {
    text: "Across Period 6 from Cs to Rn, atomic radius generally ____.",
    options: ["Increases", "Decreases", "Remains constant", "Fluctuates randomly"],
    correct: 1,
    points: 15
  },
  {
    text: "Ionization energy generally ____ across Period 6 from Cs to Rn.",
    options: ["Increases", "Decreases", "Is constant", "Peaks at the center"],
    correct: 0,
    points: 15
  },
  {
    text: "Electronegativity across Period 6 ____ from Cs to Rn.",
    options: ["Increases", "Decreases", "Remains the same", "Peaks at Ba"],
    correct: 0,
    points: 15
  },
  {
    text: "Which Period 6 element’s ionic radius is notably similar to its Period 5 congener due to lanthanide contraction?",
    options: ["Hafnium (Hf)", "Tantalum (Ta)", "Lead (Pb)", "Bismuth (Bi)"],
    correct: 0,
    points: 15
  },
  {
    text: "Metallic character generally ____ across Period 6 from Cs to Rn.",
    options: ["Decreases", "Increases", "Peaks at the center", "Is random"],
    correct: 0,
    points: 15
  },
  {
    text: "Radon (Rn) is a noble gas. Under extreme conditions, it can form compounds with highly electronegative elements such as:",
    options: ["Fluorine", "Oxygen", "Chlorine", "Bromine"],
    correct: 0,
    points: 15
  },

  // Stoichiometry & Calculations (20 pts)
  {
    text: "How many moles of H₂ gas are produced when 1.00 mol Ba reacts with excess HCl? (Ba + 2 HCl → BaCl₂ + H₂)",
    options: ["0.50 mol", "1.00 mol", "2.00 mol", "0.25 mol"],
    correct: 0,
    points: 20
  },
  {
    text: "When 13.7 g of Cs reacts with water, how many liters of H₂ at STP form? (2 Cs + 2 H₂O → 2 CsOH + H₂; M(Cs)=132.91)",
    options: ["0.58 L", "1.16 L", "2.32 L", "0.29 L"],
    correct: 0,
    points: 20
  },
  {
    text: "5.00 g of BaSO₄ precipitate is formed when Ba(NO₃)₂ reacts with Na₂SO₄. How many moles of Ba(NO₃)₂ were consumed? (M(BaSO₄)=233.39)",
    options: ["0.0214 mol", "0.107 mol", "0.0215 mol", "0.0463 mol"],
    correct: 0,
    points: 20
  },
  {
    text: "What is the molarity of a solution containing 0.250 mol Hg(NO₃)₂ in 500.0 mL?",
    options: ["0.500 M", "0.250 M", "0.125 M", "1.00 M"],
    correct: 0,
    points: 20
  },
  {
    text: "Calculate the mass of 0.100 mol Au (M(Au)=196.97 g/mol).",
    options: ["19.70 g", "1.97 g", "196.97 g", "98.49 g"],
    correct: 0,
    points: 20
  },
  {
    text: "At STP, what volume does 0.0500 mol H₂ occupy?",
    options: ["1.12 L", "0.50 L", "11.2 L", "2.24 L"],
    correct: 0,
    points: 20
  },

  // Equilibrium & Kinetics (25 pts)
  {
    text: "Given Ksp(PbI₂)=8.5×10⁻⁹, what is the molar solubility (s) of PbI₂? (PbI₂ ⇌ Pb²⁺ + 2 I⁻)",
    options: ["1.9×10⁻³ M", "2.9×10⁻³ M", "4.3×10⁻³ M", "8.5×10⁻³ M"],
    correct: 0,
    points: 25
  },
  {
    text: "For the oxidation half-reaction AuCl₄⁻ + 3 e⁻ → Au + 4 Cl⁻ with E°=1.00 V, calculate ΔG° (n=3; F=96,485 C/mol).",
    options: ["–290 kJ", "–193 kJ", "–145 kJ", "–387 kJ"],
    correct: 0,
    points: 30
  },
  {
    text: "Rate law for decomposition of CF₂Cl₂: rate = k[CF₂Cl₂]². If [CF₂Cl₂] halves, rate becomes:",
    options: ["¼ as fast", "½ as fast", "The same", "Twice as fast"],
    correct: 0,
    points: 25
  },
  {
    text: "At equilibrium for 2 HgO ⇌ 2 Hg + O₂ (Kp=0.24 at 400 °C), increasing pressure favors:",
    options: ["Reactants", "Products", "No change", "Impossible to predict"],
    correct: 0,
    points: 25
  },
  {
    text: "The rate constant for a zero-order reaction changes with temperature according to the Arrhenius equation. A catalyst lowers which parameter?",
    options: ["Activation energy (Ea)", "Pre-exponential factor (A)", "Reaction order", "Concentration"],
    correct: 0,
    points: 25
  },
  {
    text: "Which Period 6 element forms a complex with ammonia ([M(NH₃)₆]²⁺) that is intensely violet due to d–d transitions?",
    options: ["Cobalt", "Palladium", "Copper", "Platinum"],
    correct: 2,
    points: 25
  },

  // Acid–Base & Titrations (25 pts)
  {
    text: "What is the pH of a 0.100 M Ba(OH)₂ solution? (Complete dissociation)",
    options: ["12.30", "13.30", "11.30", "10.30"],
    correct: 0,
    points: 25
  },
  {
    text: "25.00 mL of 0.100 M HCl is titrated with 0.100 M NaOH. What is the pH at the equivalence point?",
    options: ["7.00", "1.00", "14.00", "Greater than 7"],
    correct: 0,
    points: 25
  },
  {
    text: "Which indicator is best for titrating a strong acid with a strong base?",
    options: ["Phenolphthalein (pH 8.2–10)", "Methyl orange (pH 3.1–4.4)", "Bromothymol blue (pH 6.0–7.6)", "Thymol blue (pH 8.0–9.6)"],
    correct: 2,
    points: 25
  },
  {
    text: "What is the pH at half-neutralization when titrating HCl with NaOH?",
    options: ["Equal to pKa of HCl", "7.00", "Equal to pKb of Cl⁻", "14.00"],
    correct: 1,
    points: 25
  },
  {
    text: "Which Period 6 oxide is amphoteric, dissolving in both acids and bases?",
    options: ["PbO", "BaO₂", "Cs₂O", "HgO"],
    correct: 0,
    points: 25
  },
  {
    text: "Calculate the pH of a 0.0500 M solution of TlOH (a strong base).",
    options: ["12.70", "1.30", "13.00", "11.00"],
    correct: 0,
    points: 25
  },

  // Advanced interdisciplinary (30 pts)
  {
    text: "Mercury-203 is used in nuclear medicine. It decays by ____ emission.",
    options: ["Electron capture", "Alpha", "Beta", "Gamma"],
    correct: 0,
    points: 30
  },
  {
    text: "Gold nanoparticles exhibit surface plasmon resonance around ____ nm.",
    options: ["520 nm", "650 nm", "400 nm", "800 nm"],
    correct: 0,
    points: 30
  },
  {
    text: "Lead halide perovskites (e.g., CH₃NH₃PbI₃) have a band gap ~1.5 eV. This corresponds to light of wavelength ____ nm.",
    options: ["830", "450", "300", "1050"],
    correct: 0,
    points: 30
  },
  {
    text: "Thallium-based superconductors have critical temperatures above ____ K.",
    options: ["120 K", "20 K", "4 K", "300 K"],
    correct: 0,
    points: 30
  },
  {
    text: "Cesium-137 (t₁/₂ ≈30 yr) is used as a gamma source. After 60 yr, the activity is ____ of original.",
    options: ["¼", "½", "⅛", "¾"],
    correct: 0,
    points: 30
  },
  {
    text: "Barium-star (Ba II) spectral lines are observed in some supernova ejecta. Ba II ion arises from ____ of Ba I.",
    options: ["Removal of one electron", "Addition of one electron", "Loss of two electrons", "Photoexcitation only"],
    correct: 0,
    points: 30
  }
];
