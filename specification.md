TITLE:
Periodic Pursuit: Elemental Ascent

PROJECT TYPE:
Single-player, educational, chemistry-based web game. Deployed as a static website using any technology stack that produces client-side assets only.

GOAL:
The player begins on any element in Group 1 and navigates the periodic table by answering chemistry questions to reach any noble gas (Group 18). The player may choose their path freely, with scoring based on question difficulty and efficiency. The final score is calculated as total points divided by turns taken. More difficult paths yield more points.

PLATFORM REQUIREMENTS:
The game must run entirely client-side and be deployable as a static site.
All code must compile down to static HTML, CSS, and JavaScript.
All assets must be embedded or locally referenced.
No backend logic, server-side APIs, or database access is allowed.
Any language or framework may be used as long as the final result is static and browser-executable.

USER INTERFACE LAYOUT:
	1.	Periodic Table Grid

	•	A visual grid laid out to match the periodic table’s shape and structure.
	•	Each element is a clickable tile representing an element.
	•	Group and period positions must match real periodic table placement.
	•	Tiles should be color-coded by group type (e.g., alkali metals, noble gases).
	•	Empty positions should be used to maintain grid alignment.
	•	The current player tile must be highlighted.
	•	The path taken should be visibly traced.
	•	Adjacent valid move options may be visually indicated.

	2.	Sidebar or Modal Interface

	•	Displays the current chemistry question and answer choices.
	•	Shows the current score.
	•	Shows the turn count.
	•	Shows active powerups.
	•	Provides feedback after each question.
	•	Includes a restart option.

MOVEMENT RULES:
	•	Player begins on any Group 1 element (e.g., H, Li, Na).
	•	On each turn, the player may move to any directly adjacent element tile in the up, down, left, or right direction.
	•	Diagonal moves are not allowed.
	•	The player cannot revisit any tile they have already visited.
	•	Reaching a noble gas tile (Group 18) ends the game.
	•	Clicking on a valid destination tile triggers a chemistry question.

QUESTION SYSTEM:
	•	Each valid movement triggers a multiple-choice question with four options.
	•	Questions are associated with the target tile’s group and period.
	•	A correct answer allows the move and adds points.
	•	An incorrect answer prevents the move; the player remains on their current tile.
	•	Each attempt, correct or not, counts as one turn.

QUESTION DIFFICULTY:
	•	Questions increase in difficulty as the player moves to higher periods or more complex element types.
	•	Periods 1 to 2: basic knowledge, scoring 1–2 points.
	•	Periods 3 to 4: moderate difficulty, scoring 3–4 points.
	•	Periods 5 to 6: advanced difficulty, scoring 5–6 points.

CHECKPOINT CHALLENGES:
	•	Entering a new period (row) for the first time triggers a checkpoint challenge.
	•	These are more advanced questions or problems such as ICE tables, redox reactions, pH calculations.
	•	The player must pass the checkpoint to move into the new period.
	•	Failing the checkpoint means the player must retry in a future turn.
	•	Completing a checkpoint awards bonus points (typically 5) and may grant powerups.

SCORING SYSTEM:
	•	Points are awarded for each correct question based on difficulty.
	•	Checkpoint questions provide bonus points.
	•	Final score is calculated as total points divided by turns taken.
	•	Optional scoring bonuses include reaching a deeper noble gas, using few powerups, or completing under a turn limit.

POWERUPS (OPTIONAL):
	•	Powerups may be earned by correct streaks, checkpoint success, or random tile events.
	•	Examples of powerups:
Skip question
Double points for next move
Eliminate one incorrect choice
Move to any valid adjacent tile without question

SETBACKS (OPTIONAL):
	•	Setbacks may be triggered by wrong answers or designated tiles.
	•	Examples of setbacks:
Forced to miss a turn
Required to answer a higher difficulty question
Redirected to a lower period

QUESTION TOPICS BY ELEMENT REGION:

Group 1–2 (s-block): ion formation, atomic structure, periodic trends
Transition metals (d-block): oxidation states, ion colors
Group 13–17 (p-block): bonding, molecular geometry, electronegativity
Group 18: noble gas properties, stability
Periods 5–6: thermodynamics, equilibrium, redox, acids and bases

Questions should be stored in a structured format and should contain metadata such as:
	•	Group
	•	Period
	•	Difficulty
	•	Question text
	•	Four answer options
	•	Correct answer

ENDGAME:
	•	The game ends when the player successfully lands on a noble gas tile (Group 18).
	•	The end screen displays:
Total points
Turns taken
Score = Points ÷ Turns
Number of questions correct and attempted
The final path taken
Optional player rank based on performance

STATE TRACKING:

The game must keep track of:
	•	Current tile (group, period)
	•	Tiles already visited
	•	Number of turns taken
	•	Total score
	•	Active question
	•	Powerup availability and usage
	•	Whether the player is currently in a checkpoint challenge

SUMMARY:

Periodic Pursuit: Elemental Ascent is a single-player educational strategy game that takes place on a stylized periodic table. The player must navigate the table by answering chemistry questions correctly, while optimizing for score and efficiency. Movement is allowed in any direction to adjacent unvisited tiles. The game ends when a noble gas is reached. All gameplay and content must function client-side and be deployable as a static website.