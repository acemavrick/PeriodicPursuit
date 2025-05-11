/**
 * Complete Periodic Table Data
 */

// Single source of truth for all element data
const allElements = [
    { atomicNumber: 1, symbol: 'H', name: 'Hydrogen', period: 1, group: 1, category: 'other-nonmetal' },
    { atomicNumber: 2, symbol: 'He', name: 'Helium', period: 1, group: 18, category: 'noble-gas' },
    { atomicNumber: 3, symbol: 'Li', name: 'Lithium', period: 2, group: 1, category: 'alkali-metal' },
    { atomicNumber: 4, symbol: 'Be', name: 'Beryllium', period: 2, group: 2, category: 'alkaline-earth-metal' },
    { atomicNumber: 5, symbol: 'B', name: 'Boron', period: 2, group: 13, category: 'metalloid' },
    { atomicNumber: 6, symbol: 'C', name: 'Carbon', period: 2, group: 14, category: 'other-nonmetal' },
    { atomicNumber: 7, symbol: 'N', name: 'Nitrogen', period: 2, group: 15, category: 'other-nonmetal' },
    { atomicNumber: 8, symbol: 'O', name: 'Oxygen', period: 2, group: 16, category: 'other-nonmetal' },
    { atomicNumber: 9, symbol: 'F', name: 'Fluorine', period: 2, group: 17, category: 'halogen' },
    { atomicNumber: 10, symbol: 'Ne', name: 'Neon', period: 2, group: 18, category: 'noble-gas' },
    { atomicNumber: 11, symbol: 'Na', name: 'Sodium', period: 3, group: 1, category: 'alkali-metal' },
    { atomicNumber: 12, symbol: 'Mg', name: 'Magnesium', period: 3, group: 2, category: 'alkaline-earth-metal' },
    { atomicNumber: 13, symbol: 'Al', name: 'Aluminum', period: 3, group: 13, category: 'post-transition-metal' },
    { atomicNumber: 14, symbol: 'Si', name: 'Silicon', period: 3, group: 14, category: 'metalloid' },
    { atomicNumber: 15, symbol: 'P', name: 'Phosphorus', period: 3, group: 15, category: 'other-nonmetal' },
    { atomicNumber: 16, symbol: 'S', name: 'Sulfur', period: 3, group: 16, category: 'other-nonmetal' },
    { atomicNumber: 17, symbol: 'Cl', name: 'Chlorine', period: 3, group: 17, category: 'halogen' },
    { atomicNumber: 18, symbol: 'Ar', name: 'Argon', period: 3, group: 18, category: 'noble-gas' },
    { atomicNumber: 19, symbol: 'K', name: 'Potassium', period: 4, group: 1, category: 'alkali-metal' },
    { atomicNumber: 20, symbol: 'Ca', name: 'Calcium', period: 4, group: 2, category: 'alkaline-earth-metal' },
    { atomicNumber: 21, symbol: 'Sc', name: 'Scandium', period: 4, group: 3, category: 'transition-metal' },
    { atomicNumber: 22, symbol: 'Ti', name: 'Titanium', period: 4, group: 4, category: 'transition-metal' },
    { atomicNumber: 23, symbol: 'V', name: 'Vanadium', period: 4, group: 5, category: 'transition-metal' },
    { atomicNumber: 24, symbol: 'Cr', name: 'Chromium', period: 4, group: 6, category: 'transition-metal' },
    { atomicNumber: 25, symbol: 'Mn', name: 'Manganese', period: 4, group: 7, category: 'transition-metal' },
    { atomicNumber: 26, symbol: 'Fe', name: 'Iron', period: 4, group: 8, category: 'transition-metal' },
    { atomicNumber: 27, symbol: 'Co', name: 'Cobalt', period: 4, group: 9, category: 'transition-metal' },
    { atomicNumber: 28, symbol: 'Ni', name: 'Nickel', period: 4, group: 10, category: 'transition-metal' },
    { atomicNumber: 29, symbol: 'Cu', name: 'Copper', period: 4, group: 11, category: 'transition-metal' },
    { atomicNumber: 30, symbol: 'Zn', name: 'Zinc', period: 4, group: 12, category: 'transition-metal' },
    { atomicNumber: 31, symbol: 'Ga', name: 'Gallium', period: 4, group: 13, category: 'post-transition-metal' },
    { atomicNumber: 32, symbol: 'Ge', name: 'Germanium', period: 4, group: 14, category: 'metalloid' },
    { atomicNumber: 33, symbol: 'As', name: 'Arsenic', period: 4, group: 15, category: 'metalloid' },
    { atomicNumber: 34, symbol: 'Se', name: 'Selenium', period: 4, group: 16, category: 'other-nonmetal' },
    { atomicNumber: 35, symbol: 'Br', name: 'Bromine', period: 4, group: 17, category: 'halogen' },
    { atomicNumber: 36, symbol: 'Kr', name: 'Krypton', period: 4, group: 18, category: 'noble-gas' },
    { atomicNumber: 37, symbol: 'Rb', name: 'Rubidium', period: 5, group: 1, category: 'alkali-metal' },
    { atomicNumber: 38, symbol: 'Sr', name: 'Strontium', period: 5, group: 2, category: 'alkaline-earth-metal' },
    { atomicNumber: 39, symbol: 'Y', name: 'Yttrium', period: 5, group: 3, category: 'transition-metal' },
    { atomicNumber: 40, symbol: 'Zr', name: 'Zirconium', period: 5, group: 4, category: 'transition-metal' },
    { atomicNumber: 41, symbol: 'Nb', name: 'Niobium', period: 5, group: 5, category: 'transition-metal' },
    { atomicNumber: 42, symbol: 'Mo', name: 'Molybdenum', period: 5, group: 6, category: 'transition-metal' },
    { atomicNumber: 43, symbol: 'Tc', name: 'Technetium', period: 5, group: 7, category: 'transition-metal' },
    { atomicNumber: 44, symbol: 'Ru', name: 'Ruthenium', period: 5, group: 8, category: 'transition-metal' },
    { atomicNumber: 45, symbol: 'Rh', name: 'Rhodium', period: 5, group: 9, category: 'transition-metal' },
    { atomicNumber: 46, symbol: 'Pd', name: 'Palladium', period: 5, group: 10, category: 'transition-metal' },
    { atomicNumber: 47, symbol: 'Ag', name: 'Silver', period: 5, group: 11, category: 'transition-metal' },
    { atomicNumber: 48, symbol: 'Cd', name: 'Cadmium', period: 5, group: 12, category: 'transition-metal' },
    { atomicNumber: 49, symbol: 'In', name: 'Indium', period: 5, group: 13, category: 'post-transition-metal' },
    { atomicNumber: 50, symbol: 'Sn', name: 'Tin', period: 5, group: 14, category: 'post-transition-metal' },
    { atomicNumber: 51, symbol: 'Sb', name: 'Antimony', period: 5, group: 15, category: 'metalloid' },
    { atomicNumber: 52, symbol: 'Te', name: 'Tellurium', period: 5, group: 16, category: 'metalloid' },
    { atomicNumber: 53, symbol: 'I', name: 'Iodine', period: 5, group: 17, category: 'halogen' },
    { atomicNumber: 54, symbol: 'Xe', name: 'Xenon', period: 5, group: 18, category: 'noble-gas' },
    { atomicNumber: 55, symbol: 'Cs', name: 'Cesium', period: 6, group: 1, category: 'alkali-metal' },
    { atomicNumber: 56, symbol: 'Ba', name: 'Barium', period: 6, group: 2, category: 'alkaline-earth-metal' },
    { atomicNumber: 57, symbol: 'La', name: 'Lanthanum', period: 6, group: 3, category: 'lanthanide' },
    { atomicNumber: 58, symbol: 'Ce', name: 'Cerium', period: 6, group: null, category: 'lanthanide' },
    { atomicNumber: 59, symbol: 'Pr', name: 'Praseodymium', period: 6, group: null, category: 'lanthanide' },
    { atomicNumber: 60, symbol: 'Nd', name: 'Neodymium', period: 6, group: null, category: 'lanthanide' },
    { atomicNumber: 61, symbol: 'Pm', name: 'Promethium', period: 6, group: null, category: 'lanthanide' },
    { atomicNumber: 62, symbol: 'Sm', name: 'Samarium', period: 6, group: null, category: 'lanthanide' },
    { atomicNumber: 63, symbol: 'Eu', name: 'Europium', period: 6, group: null, category: 'lanthanide' },
    { atomicNumber: 64, symbol: 'Gd', name: 'Gadolinium', period: 6, group: null, category: 'lanthanide' },
    { atomicNumber: 65, symbol: 'Tb', name: 'Terbium', period: 6, group: null, category: 'lanthanide' },
    { atomicNumber: 66, symbol: 'Dy', name: 'Dysprosium', period: 6, group: null, category: 'lanthanide' },
    { atomicNumber: 67, symbol: 'Ho', name: 'Holmium', period: 6, group: null, category: 'lanthanide' },
    { atomicNumber: 68, symbol: 'Er', name: 'Erbium', period: 6, group: null, category: 'lanthanide' },
    { atomicNumber: 69, symbol: 'Tm', name: 'Thulium', period: 6, group: null, category: 'lanthanide' },
    { atomicNumber: 70, symbol: 'Yb', name: 'Ytterbium', period: 6, group: null, category: 'lanthanide' },
    { atomicNumber: 71, symbol: 'Lu', name: 'Lutetium', period: 6, group: null, category: 'lanthanide' }, // Lu is a transition metal by some, but often grouped with Ln for convenience
    { atomicNumber: 72, symbol: 'Hf', name: 'Hafnium', period: 6, group: 4, category: 'transition-metal' },
    { atomicNumber: 73, symbol: 'Ta', name: 'Tantalum', period: 6, group: 5, category: 'transition-metal' },
    { atomicNumber: 74, symbol: 'W', name: 'Tungsten', period: 6, group: 6, category: 'transition-metal' },
    { atomicNumber: 75, symbol: 'Re', name: 'Rhenium', period: 6, group: 7, category: 'transition-metal' },
    { atomicNumber: 76, symbol: 'Os', name: 'Osmium', period: 6, group: 8, category: 'transition-metal' },
    { atomicNumber: 77, symbol: 'Ir', name: 'Iridium', period: 6, group: 9, category: 'transition-metal' },
    { atomicNumber: 78, symbol: 'Pt', name: 'Platinum', period: 6, group: 10, category: 'transition-metal' },
    { atomicNumber: 79, symbol: 'Au', name: 'Gold', period: 6, group: 11, category: 'transition-metal' },
    { atomicNumber: 80, symbol: 'Hg', name: 'Mercury', period: 6, group: 12, category: 'transition-metal' },
    { atomicNumber: 81, symbol: 'Tl', name: 'Thallium', period: 6, group: 13, category: 'post-transition-metal' },
    { atomicNumber: 82, symbol: 'Pb', name: 'Lead', period: 6, group: 14, category: 'post-transition-metal' },
    { atomicNumber: 83, symbol: 'Bi', name: 'Bismuth', period: 6, group: 15, category: 'post-transition-metal' },
    { atomicNumber: 84, symbol: 'Po', name: 'Polonium', period: 6, group: 16, category: 'metalloid' }, // Sometimes post-transition metal
    { atomicNumber: 85, symbol: 'At', name: 'Astatine', period: 6, group: 17, category: 'halogen' }, // Sometimes metalloid
    { atomicNumber: 86, symbol: 'Rn', name: 'Radon', period: 6, group: 18, category: 'noble-gas' },
    { atomicNumber: 87, symbol: 'Fr', name: 'Francium', period: 7, group: 1, category: 'alkali-metal' },
    { atomicNumber: 88, symbol: 'Ra', name: 'Radium', period: 7, group: 2, category: 'alkaline-earth-metal' },
    { atomicNumber: 89, symbol: 'Ac', name: 'Actinium', period: 7, group: 3, category: 'actinide' },
    { atomicNumber: 90, symbol: 'Th', name: 'Thorium', period: 7, group: null, category: 'actinide' },
    { atomicNumber: 91, symbol: 'Pa', name: 'Protactinium', period: 7, group: null, category: 'actinide' },
    { atomicNumber: 92, symbol: 'U', name: 'Uranium', period: 7, group: null, category: 'actinide' },
    { atomicNumber: 93, symbol: 'Np', name: 'Neptunium', period: 7, group: null, category: 'actinide' },
    { atomicNumber: 94, symbol: 'Pu', name: 'Plutonium', period: 7, group: null, category: 'actinide' },
    { atomicNumber: 95, symbol: 'Am', name: 'Americium', period: 7, group: null, category: 'actinide' },
    { atomicNumber: 96, symbol: 'Cm', name: 'Curium', period: 7, group: null, category: 'actinide' },
    { atomicNumber: 97, symbol: 'Bk', name: 'Berkelium', period: 7, group: null, category: 'actinide' },
    { atomicNumber: 98, symbol: 'Cf', name: 'Californium', period: 7, group: null, category: 'actinide' },
    { atomicNumber: 99, symbol: 'Es', name: 'Einsteinium', period: 7, group: null, category: 'actinide' },
    { atomicNumber: 100, symbol: 'Fm', name: 'Fermium', period: 7, group: null, category: 'actinide' },
    { atomicNumber: 101, symbol: 'Md', name: 'Mendelevium', period: 7, group: null, category: 'actinide' },
    { atomicNumber: 102, symbol: 'No', name: 'Nobelium', period: 7, group: null, category: 'actinide' },
    { atomicNumber: 103, symbol: 'Lr', name: 'Lawrencium', period: 7, group: null, category: 'actinide' }, // Lr is a transition metal by some, but often grouped with Ac for convenience
    { atomicNumber: 104, symbol: 'Rf', name: 'Rutherfordium', period: 7, group: 4, category: 'transition-metal' },
    { atomicNumber: 105, symbol: 'Db', name: 'Dubnium', period: 7, group: 5, category: 'transition-metal' },
    { atomicNumber: 106, symbol: 'Sg', name: 'Seaborgium', period: 7, group: 6, category: 'transition-metal' },
    { atomicNumber: 107, symbol: 'Bh', name: 'Bohrium', period: 7, group: 7, category: 'transition-metal' },
    { atomicNumber: 108, symbol: 'Hs', name: 'Hassium', period: 7, group: 8, category: 'transition-metal' },
    { atomicNumber: 109, symbol: 'Mt', name: 'Meitnerium', period: 7, group: 9, category: 'transition-metal' },
    { atomicNumber: 110, symbol: 'Ds', name: 'Darmstadtium', period: 7, group: 10, category: 'transition-metal' },
    { atomicNumber: 111, symbol: 'Rg', name: 'Roentgenium', period: 7, group: 11, category: 'transition-metal' },
    { atomicNumber: 112, symbol: 'Cn', name: 'Copernicium', period: 7, group: 12, category: 'transition-metal' },
    { atomicNumber: 113, symbol: 'Nh', name: 'Nihonium', period: 7, group: 13, category: 'post-transition-metal' },
    { atomicNumber: 114, symbol: 'Fl', name: 'Flerovium', period: 7, group: 14, category: 'post-transition-metal' },
    { atomicNumber: 115, symbol: 'Mc', name: 'Moscovium', period: 7, group: 15, category: 'post-transition-metal' },
    { atomicNumber: 116, symbol: 'Lv', name: 'Livermorium', period: 7, group: 16, category: 'post-transition-metal' },
    { atomicNumber: 117, symbol: 'Ts', name: 'Tennessine', period: 7, group: 17, category: 'halogen' }, // Sometimes post-transition-metal or metalloid
    { atomicNumber: 118, symbol: 'Og', name: 'Oganesson', period: 7, group: 18, category: 'noble-gas' }, // Predicted, properties unknown
];

// Extract Lanthanides (La-Lu, atomic numbers 57-71)
const lanthanides = allElements.filter(el => el.atomicNumber >= 57 && el.atomicNumber <= 71);

// Extract Actinides (Ac-Lr, atomic numbers 89-103)
const actinides = allElements.filter(el => el.atomicNumber >= 89 && el.atomicNumber <= 103);

// Define the main 7x18 grid layout for the periodic table display
// Cells contain element SYMBOLS or null for empty spots.
const mainTableLayoutGrid = [
    // Row 1 (Period 1)
    ['H', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'He'],
    // Row 2 (Period 2)
    ['Li', 'Be', null, null, null, null, null, null, null, null, null, null, 'B', 'C', 'N', 'O', 'F', 'Ne'],
    // Row 3 (Period 3)
    ['Na', 'Mg', null, null, null, null, null, null, null, null, null, null, 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'],
    // Row 4 (Period 4)
    ['K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'],
    // Row 5 (Period 5)
    ['Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe'],
    // Row 6 (Period 6)
    ['Cs', 'Ba', 'La', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn'], // La (57) here, Hf (72) follows.
    // Row 7 (Period 7)
    ['Fr', 'Ra', 'Ac', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og']  // Ac (89) here, Rf (104) follows.
];

const periodicTableData = {
    elements: allElements,
    lanthanides: lanthanides, // Includes La (57) up to Lu (71)
    actinides: actinides,   // Includes Ac (89) up to Lr (103)
    mainTableLayout: {
        rows: 7,
        cols: 18,
        grid: mainTableLayoutGrid
    },
    getStartingElements: function() {
        return this.elements.filter(el => el.group === 1 && el.period >= 1 && el.period <= 7);
    }
};

export default periodicTableData; 