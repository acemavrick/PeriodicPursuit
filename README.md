# Periodic Pursuit: Elemental Ascent

An interactive chemistry educational game where players strategically navigate the periodic table by answering chemistry questions.

**Important note:** A full playthrough of this game has not been completed, so there may be latent bugs. If you find any bugs, 
**please create an issue**

## Game Overview

Periodic Pursuit is a single-player educational strategy game that challenges players to navigate across the periodic table by answering chemistry questions. Players start on any element in Group 1 (alkali metals) and attempt to reach any noble gas in Group 18, while maximizing their score and minimizing their turn count.

The game combines chemistry knowledge with strategic path planning across a visually accurate periodic table that includes all elements, including lanthanides and actinides.

## How to Play

1. **Starting Position**: Select any element in Group 1 (H, Li, Na, K, Rb, Cs, Fr) to begin your journey
2. **Movement**: On each turn, move to any directly adjacent element (up, down, left, right - no diagonals)
3. **Questions**: Each move triggers a chemistry question related to the target element's properties
4. **Scoring**: Earn points for correct answers based on the difficulty (higher periods = more points)
5. **Checkpoints**: Moving to a new period triggers a special checkpoint challenge
6. **Victory**: Successfully reach any noble gas (He, Ne, Ar, Kr, Xe, Rn, Og) to complete the game

## Game Mechanics

### Movement Rules
- Players may only move to adjacent unvisited elements
- No diagonal moves are allowed
- Cannot revisit elements already in your path
- Game ends upon reaching any noble gas element (Group 18)

### Question System
- Questions are tailored to the element groups and periods
- Multiple-choice format with four possible answers
- Correct answers allow movement and award points
- Incorrect answers prevent movement but still count as a turn
- Question difficulty increases with higher periods

### Score Calculation
- Each correctly answered question awards points
- Players receive points for both answering questions correctly and successful movement
- Final score = Total points ÷ Total turns taken

### Question Topics by Element Region
- **Group 1-2 (s-block)**: Ion formation, atomic structure, periodic trends
- **Transition metals (d-block)**: Oxidation states, ion colors, complex formation
- **Group 13-17 (p-block)**: Bonding, molecular geometry, electronegativity
- **Group 18**: Noble gas properties, stability, applications
- **Lanthanides & Actinides**: Special properties, applications, nuclear chemistry

## Getting Started

### To play the game:

1. Open `index.html` in any modern web browser
2. Click "Start Game" on the welcome screen
3. Choose your starting element from Group 1
4. Navigate by clicking on adjacent elements and answering questions correctly

### To add new questions:

1. Read the documentation in `js/questions/README.md`
2. Edit the appropriate question file based on the type of question
3. Follow the question structure format
4. The game will automatically incorporate your new questions

## Development

### Prerequisites

- Any modern web browser
- Basic knowledge of HTML, CSS, and JavaScript

### Setup for Development

1. Clone the repository
2. Navigate to the project directory
3. Open `index.html` in a browser to test changes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Periodic table data source: [Periodic Table of Elements](https://en.wikipedia.org/wiki/Periodic_table)
- Chemistry question inspiration: Various chemistry textbooks and educational resources