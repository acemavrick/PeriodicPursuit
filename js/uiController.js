/**
 * UI Controller for Periodic Pursuit
 * Handles DOM interactions and UI updates
 */

import periodicTableData from './periodicTableData.js';
import GameLogic from './gameLogic.js';

class UIController {
    constructor(gameLogic) {
        this.gameLogic = gameLogic; // Store reference to game logic
        this.elements = {
            startScreen: document.getElementById('start-screen'),
            gameScreen: document.getElementById('game-screen'),
            periodicTable: document.getElementById('periodic-table'),
            // elementInfo: document.getElementById('element-info'), // If you add this element back
            currentElementDisplay: document.getElementById('current-element'),
            currentSeriesContainer: document.getElementById('current-series-container'),
            currentSeriesName: document.getElementById('current-series-name'),
            scoreDisplay: document.getElementById('score'),
            turnsDisplay: document.getElementById('turns'),
            // Corrected ID to match index.html for the main question area
            questionScreen: document.getElementById('question-container'), 
            questionText: document.getElementById('question-text'),
            // Corrected ID to match index.html
            answersContainer: document.getElementById('answer-options'), 
            // Corrected ID to match index.html
            feedbackMessage: document.getElementById('feedback'), 
            continueButton: document.getElementById('continue-button'),
            restartGameButton: document.getElementById('restart-game-button'), 
            finalScoreDisplay: document.getElementById('final-score'),
            // gameEndMessage: document.getElementById('game-end-message'), // This ID is not in index.html, endgame screen uses final-points, final-turns etc.
            // Let's use a general endgame screen element if needed for show/hide, or rely on specific content updates.
            endgameScreen: document.getElementById('endgame-screen'), // For showing/hiding the whole endgame block
            // Corrected ID to match index.html
            startSelectionContainer: document.getElementById('start-element-selection'), 
            // Add other UI elements as needed, e.g., for settings if re-added
            // For Lanthanide/Actinide rows, if they need direct manipulation beyond tiles:
            lanthanideRow: null, // Will be assigned in createPeriodicTableDOM
            actinideRow: null   // Will be assigned in createPeriodicTableDOM
        };
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // Changed restartGameButton to perform a page reload
        if (this.elements.restartGameButton) {
            this.elements.restartGameButton.addEventListener('click', () => window.location.reload());
        }
        if (this.elements.continueButton) {
            this.elements.continueButton.addEventListener('click', () => this.continueGame());
        }
        
        // Ensure start screen is shown if elements are found
        if(this.elements.startScreen) {
          this.showScreen('start');
        } else {
          console.error("Start screen element not found during initialization.");
        }
    }

    showScreen(screenName) {
        // Ensure all elements exist before trying to access their style property
        const screensToHide = [
            this.elements.startScreen,
            this.elements.startSelectionContainer,
            this.elements.gameScreen,
            this.elements.questionScreen, // This is now question-container
            this.elements.endgameScreen  // Added endgameScreen to the hide list
        ];
        
        screensToHide.forEach(s => {
            if (s && s.style) s.style.display = 'none';
        });
        
        // Hide answersContainer separately as it's within questionScreen but managed independently
        if (this.elements.answersContainer && this.elements.answersContainer.style) {
            this.elements.answersContainer.style.display = 'none';
        }

        if (screenName === 'start' && this.elements.startScreen && this.elements.startScreen.style) {
            this.elements.startScreen.style.display = 'block';
        } else if (screenName === 'elementSelection' && this.elements.startSelectionContainer && this.elements.startSelectionContainer.style) {
            this.elements.startSelectionContainer.style.display = 'block'; // Changed from grid to block, can be styled by CSS if grid needed
        } else if (screenName === 'game' && this.elements.gameScreen && this.elements.gameScreen.style) {
            this.elements.gameScreen.style.display = 'flex'; 
            if (this.elements.questionScreen && this.elements.questionScreen.style) {
                 // questionScreen (question-container) is part of gameScreen's sidebar, so it should be visible if gameScreen is flex
                 // It will be managed by game state (questionActive)
            }
            // answersContainer's display is handled by showQuestion/continueGame
        } else if (screenName === 'endgame' && this.elements.endgameScreen && this.elements.endgameScreen.style) {
            this.elements.endgameScreen.style.display = 'block'; // Show the endgame screen
            if (this.elements.gameScreen && this.elements.gameScreen.style) { // Hide main game screen if showing endgame
                this.elements.gameScreen.style.display = 'none';
            }
        }
    }

    createPeriodicTableDOM() {
        const periodicTableElement = this.elements.periodicTable;
        periodicTableElement.innerHTML = ''; // Clear previous table

        // Define :root variables for JS access if needed, or ensure CSS uses them
        // const rootStyles = getComputedStyle(document.documentElement);
        // const elementSize = parseInt(rootStyles.getPropertyValue('--element-size-large')) || 60;
        // const gapSize = parseInt(rootStyles.getPropertyValue('--table-gap')) || 2;

        // Create main periodic table grid cells
        periodicTableData.mainTableLayout.grid.forEach((row, rowIndex) => {
            row.forEach((elementSymbol, colIndex) => {
                const tile = document.createElement('div');
                tile.className = 'element-tile empty'; // Default to empty

                if (elementSymbol) {
                    const element = periodicTableData.elements.find(el => el.symbol === elementSymbol);
                    if (element) {
                        tile.className = `element-tile element-category-${element.category}`;
                        tile.dataset.symbol = element.symbol;
                        // tile.style.width = `${elementSize}px`;
                        // tile.style.height = `${elementSize}px`;
                        tile.innerHTML = `<span class="atomic-number">${element.atomicNumber}</span><strong class="symbol">${element.symbol}</strong><small class="name">${element.name}</small>`;
                        
                        if (this.gameLogic && this.gameLogic.handleTileClick) {
                            tile.addEventListener('click', () => this.gameLogic.handleTileClick(element.symbol));
                        }
                    }
                } else {
                    tile.classList.add('placeholder-cell');
                    // tile.style.width = `${elementSize}px`;
                    // tile.style.height = `${elementSize}px`;
                }
                periodicTableElement.appendChild(tile);
            });
        });

        // Create and append Lanthanide series with label and wrappers
        this._createSeriesDOM('Lanthanides', periodicTableData.lanthanides.filter(el => el.atomicNumber > 57 && el.atomicNumber <= 71), 'lanthanideRow', periodicTableElement);
        
        // Create and append Actinide series with label and wrappers
        this._createSeriesDOM('Actinides', periodicTableData.actinides.filter(el => el.atomicNumber > 89 && el.atomicNumber <= 103), 'actinideRow', periodicTableElement);
    }
    
    _createSeriesDOM(labelText, seriesElements, rowElementName, parentContainer) {
        const labelCont = document.createElement('div');
        labelCont.className = 'series-label-container';
        const labelTextEl = document.createElement('div');
        labelTextEl.className = 'series-label-text';
        labelTextEl.textContent = labelText;
        labelCont.appendChild(labelTextEl);
        parentContainer.appendChild(labelCont);

        const rowCont = document.createElement('div');
        rowCont.className = 'series-row-container';
        const rowElement = document.createElement('div');
        rowElement.className = `${rowElementName.replace('Row', '-row')} series-row`; // e.g., lanthanide-row series-row
        
        seriesElements.forEach(element => {
            const tile = this._createSeriesElementTile(element);
            rowElement.appendChild(tile);
        });
        
        rowCont.appendChild(rowElement);
        parentContainer.appendChild(rowCont);
        this.elements[rowElementName] = rowElement; // Store reference e.g., this.elements.lanthanideRow
    }
    
    _createSeriesElementTile(element) {
        const tile = document.createElement('div');
        tile.className = `element-tile element-category-${element.category}`;
        tile.dataset.symbol = element.symbol;
        // const rootStyles = getComputedStyle(document.documentElement);
        // const elementSize = parseInt(rootStyles.getPropertyValue('--element-size-large')) || 60;
        // tile.style.width = `${elementSize}px`;
        // tile.style.height = `${elementSize}px`;
        tile.innerHTML = `<span class="atomic-number">${element.atomicNumber}</span><strong class="symbol">${element.symbol}</strong><small class="name">${element.name}</small>`;
        if (this.gameLogic && this.gameLogic.handleTileClick) {
            tile.addEventListener('click', () => this.gameLogic.handleTileClick(element.symbol));
        }
        return tile;
    }

    showStartElementSelection() {
        this.showScreen('elementSelection');
        this.elements.startSelectionContainer.innerHTML = '<h2>Choose your starting element:</h2>';
        
        const startingElements = this.gameLogic.getStartingElements();
        startingElements.forEach(element => {
            const button = document.createElement('button');
            button.className = 'element-tile'; // Use the new .element-tile style from CSS for consistency
            button.innerHTML = `<strong>${element.symbol}</strong><br>${element.name}<br>(Period ${element.period})`;
            button.addEventListener('click', () => {
                this.gameLogic.startGame(element.symbol); 
                this.showScreen('game');
            });
            this.elements.startSelectionContainer.appendChild(button);
        });
    }
    
    updateDisplay(state) {
        if (!state) return;

        if (this.elements.scoreDisplay) this.elements.scoreDisplay.textContent = state.score;
        if (this.elements.turnsDisplay) this.elements.turnsDisplay.textContent = state.turns;
        if (this.elements.currentElementDisplay) this.elements.currentElementDisplay.textContent = state.currentElement ? `${state.currentElement.symbol} (${state.currentElement.name})` : '-';

        if (this.elements.currentSeriesContainer && this.elements.currentSeriesName) {
            if (state.currentSeries) {
                this.elements.currentSeriesContainer.style.display = 'flex'; 
                let seriesName = state.currentSeries.charAt(0).toUpperCase() + state.currentSeries.slice(1);
                if (!seriesName.endsWith('s')) { seriesName += 's'; }
                this.elements.currentSeriesName.textContent = seriesName;
            } else {
                this.elements.currentSeriesContainer.style.display = 'none';
                this.elements.currentSeriesName.textContent = '-';
            }
        }

        const allTiles = [];
        if (this.elements.periodicTable) {
            this.elements.periodicTable.querySelectorAll('.element-tile[data-symbol]').forEach(t => allTiles.push(t));
        }
        if (this.elements.lanthanideRow) {
            this.elements.lanthanideRow.querySelectorAll('.element-tile[data-symbol]').forEach(t => allTiles.push(t));
        }
        if (this.elements.actinideRow) {
            this.elements.actinideRow.querySelectorAll('.element-tile[data-symbol]').forEach(t => allTiles.push(t));
        }
        
        allTiles.forEach(tile => {
            tile.classList.remove('current', 'active', 'valid-move');
        });
        
        if (state.currentElement) {
            const currentTile = allTiles.find(tile => tile.dataset.symbol === state.currentElement.symbol);
            if (currentTile) {
                currentTile.classList.add('current');
            }
        }

        allTiles.forEach(tile => {
            const symbol = tile.dataset.symbol;
            const element = periodicTableData.elements.find(e => e.symbol === symbol);
            if (!element) return;

            let isVisited = false;
            if (state.currentSeries && state.seriesProgress) { // Added check for seriesProgress
                if (state.seriesProgress.has(element.atomicNumber)) {
                    isVisited = true;
                }
            } else if (state.visitedMainTableSymbols) { // Added check for visitedMainTableSymbols
                if (state.visitedMainTableSymbols.has(symbol)) {
                    isVisited = true;
                }
            }
            if (isVisited) {
                tile.classList.add('active');
            }
            if (state.currentElement && state.currentElement.symbol === symbol) {
                tile.classList.remove('active'); 
                tile.classList.add('current'); 
            }
        });

        // Highlight the element for which a question is currently being asked (pending move)
        if (state.questionActive && state.pendingMoveTargetElement) {
            const pendingMoveTile = allTiles.find(tile => tile.dataset.symbol === state.pendingMoveTargetElement.symbol);
            if (pendingMoveTile) {
                pendingMoveTile.classList.add('preview-move');
            }
        } else {
            // Ensure any previous preview-move highlights are removed if state changes
            allTiles.forEach(tile => tile.classList.remove('preview-move'));
        }
        
        // Screen visibility based on game state
        if (state.gameEnded) {
            this.showScreen('endgame');
            // Populate endgame stats (assuming these IDs exist from index.html)
            const finalPointsEl = document.getElementById('final-points');
            const finalTurnsEl = document.getElementById('final-turns');
            const finalScoreCalcEl = document.getElementById('final-score'); // This is the calculated score element
            const questionsCorrectEl = document.getElementById('questions-correct');
            const questionsAttemptedEl = document.getElementById('questions-attempted');

            if (finalPointsEl) finalPointsEl.textContent = state.score;
            if (finalTurnsEl) finalTurnsEl.textContent = state.turns;
            if (finalScoreCalcEl) finalScoreCalcEl.textContent = state.turns > 0 ? (state.score / state.turns).toFixed(2) : 0;
            if (questionsCorrectEl) questionsCorrectEl.textContent = state.questionsCorrect;
            if (questionsAttemptedEl) questionsAttemptedEl.textContent = state.questionsAttempted;

        } else if (state.questionActive && state.currentQuestion) {
            // Game screen should be visible, and question container within it shown
            if (this.elements.gameScreen && this.elements.gameScreen.style.display === 'none') {
                this.showScreen('game'); // Ensure game screen is visible first
            }
            if (this.elements.questionScreen && this.elements.questionScreen.style) { 
                this.elements.questionScreen.style.display = 'block'; // Show question area
            }
            this.showQuestion(state.currentQuestion); // Populate question
        } else if (state.gameActive) {
            this.showScreen('game');
            if (this.elements.questionScreen && this.elements.questionScreen.style) {
                 this.elements.questionScreen.style.display = 'block'; // Question container is part of game, always block
            }
            if (this.elements.answersContainer && this.elements.answersContainer.style) {
                 this.elements.answersContainer.style.display = 'none'; // Hide answers if no active question
            }
            if (this.elements.questionText && !state.questionActive) { // Clear question text if no question
                 this.elements.questionText.innerHTML = 'Click on an adjacent element to move.';
            }
        } else if (!state.gameStarted) { // Initial state before game starts
            this.showScreen('start');
        }
    }
    
    updateValidMoves(validMovesArray) {
        // Clear previous valid moves highlights from all tiles
        const allTiles = [];
        this.elements.periodicTable.querySelectorAll('.element-tile[data-symbol]').forEach(t => allTiles.push(t));
        if (this.elements.lanthanideRow) {
            this.elements.lanthanideRow.querySelectorAll('.element-tile[data-symbol]').forEach(t => allTiles.push(t));
        }
        if (this.elements.actinideRow) {
            this.elements.actinideRow.querySelectorAll('.element-tile[data-symbol]').forEach(t => allTiles.push(t));
        }
        allTiles.forEach(tile => tile.classList.remove('valid-move'));

        // Highlight new valid moves
        if (validMovesArray && Array.isArray(validMovesArray)) {
            validMovesArray.forEach(element => {
                const tile = allTiles.find(t => t.dataset.symbol === element.symbol);
                if (tile) {
                    tile.classList.add('valid-move');
                }
            });
        }
    }
    
    showQuestion(question) {
        console.log("[UIController.showQuestion] Displaying question:", question ? question.text : "N/A");
        if (!question || !question.options) {
            console.error("[UIController.showQuestion] Invalid question object received:", question);
            if (this.elements.questionText) this.elements.questionText.textContent = "Error: Could not load question.";
            if (this.elements.answersContainer) this.elements.answersContainer.innerHTML = '';
            return;
        }

        if (this.elements.questionText) this.elements.questionText.textContent = question.text;
        if (this.elements.answersContainer) this.elements.answersContainer.innerHTML = '';
        if (this.elements.feedbackMessage) {
            this.elements.feedbackMessage.innerHTML = '';
            this.elements.feedbackMessage.className = '';
        }
        if (this.elements.continueButton) this.elements.continueButton.style.display = 'none';

        question.options.forEach((option, index) => {
            // Create a container for each radio button and its label
            const optionContainer = document.createElement('div');
            optionContainer.classList.add('answer-option-container');

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'answerOption'; // Group radio buttons
            radioInput.id = `answerOption${index}`;
            radioInput.value = index.toString();
            radioInput.classList.add('answer-radio-input');

            const label = document.createElement('label');
            label.htmlFor = `answerOption${index}`;
            label.textContent = option;
            label.classList.add('answer-radio-label');

            // Add event listener to the container or label for better clickability
            // Or rely on default radio button click. For now, click on radio itself is fine.
            // But to trigger on label click properly which calls gameLogic:
            const handleClick = async () => {
                console.log(`[UIController.showQuestion] Answer option ${index} ('${option}') selected via radio/label.`);
                if (this.gameLogic && typeof this.gameLogic.handleAnswer === 'function') {
                    radioInput.checked = true; // Ensure the clicked one is visually checked
                    // Disable all radio buttons after selection
                    const allRadios = this.elements.answersContainer.querySelectorAll('.answer-radio-input');
                    allRadios.forEach(r => r.disabled = true);

                    const result = await this.gameLogic.handleAnswer(index);
                    if (result) {
                        this.showAnswerFeedback(result);
                    } else {
                        console.log("[UIController.showQuestion] handleAnswer did not return a result or game has ended.");
                        if (this.gameLogic.gameEnded) {
                            // Handled by updateDisplay
                        } else {
                            if(this.elements.continueButton) this.elements.continueButton.style.display = 'block';
                        }
                    }
                } else {
                    console.error("[UIController.showQuestion] gameLogic.handleAnswer is not available.");
                }
            };

            label.addEventListener('click', handleClick); // Allow click on label
            // Radio input itself will also trigger its change/click if not stopped
            // To avoid double firing if label click also triggers radio change that has its own listener:
            radioInput.addEventListener('click', (e) => {
                // If label already handled it, or to prevent default radio behavior if needed
                // For now, let label handle the logic, and radio click can be a passthrough or also call handleClick.
                // To prevent double console logs, only label has the full handler for now.
                // However, direct radio click should also work.
                 if (!radioInput.disabled) handleClick(); // If not yet disabled by a previous click
            }); 


            optionContainer.appendChild(radioInput);
            optionContainer.appendChild(label);
            if (this.elements.answersContainer) this.elements.answersContainer.appendChild(optionContainer);
        });
        if (this.elements.answersContainer) this.elements.answersContainer.style.display = 'block';
    }

    showAnswerFeedback(result) {
        // const buttons = this.elements.answersContainer.querySelectorAll('button'); // Old
        const radioContainers = this.elements.answersContainer.querySelectorAll('.answer-option-container');

        radioContainers.forEach((container, i) => {
            const radio = container.querySelector('.answer-radio-input');
            const label = container.querySelector('.answer-radio-label');
            if (radio) radio.disabled = true;
            
            if (label) {
                // Clear previous feedback classes
                label.classList.remove('correct', 'incorrect');
                container.classList.remove('correct-container', 'incorrect-container');

                if (i === result.correctIndex) {
                    // label.classList.add('correct'); // Styling the label text
                    container.classList.add('correct-container'); // Styling the container
                }
                if (i === result.selectedIndex && !result.correct) {
                    // label.classList.add('incorrect');
                    container.classList.add('incorrect-container');
                }
            }
        });

        if (this.elements.feedbackMessage) {
            this.elements.feedbackMessage.textContent = result.correct ? `Correct! +${result.pointsAwarded} points` : 'Incorrect.';
            this.elements.feedbackMessage.className = result.correct ? 'correct' : 'incorrect';
        }
        if (this.elements.continueButton) this.elements.continueButton.style.display = 'block';
    }

    continueGame() {
        this.elements.feedbackMessage.innerHTML = '';
        this.elements.feedbackMessage.className = '';
        this.elements.continueButton.style.display = 'none';
        this.elements.answersContainer.innerHTML = '';
        this.elements.questionText.innerHTML = 'Click on an adjacent element to move.';
        
        this.gameLogic.continueAfterQuestion(); // This will update display and valid moves
    }

    endGame(playerWon, score, turns) {
        // gameLogic will set its state. updateDisplay will call showScreen('endgame')
        // Here, we can just ensure gameLogic knows about the endgame details for its state.
        // The actual display of score and turns on the endgame screen is handled by updateDisplay.
        // No direct DOM manipulation for endgame stats here, as updateDisplay handles it when state.gameEnded is true.
        // This method is called by gameLogic, primarily to trigger the UI state change via gameLogic's state.
    }

    // This method is no longer directly used by the restart button if it simply reloads.
    // It might still be useful if a programmatic reset without reload is needed elsewhere.
    restartGame() {
        this.gameLogic.resetGame(); 
        this.createPeriodicTableDOM(); 
        if (this.elements.questionText) this.elements.questionText.innerHTML = 'Click on an adjacent element to move.';
        if (this.elements.endgameScreen && this.elements.endgameScreen.style) {
            this.elements.endgameScreen.style.display = 'none';
        }
        this.showScreen('start');
    }

    showError(message) {
        console.error("[UIController.showError]", message);
        // For now, using a simple alert. Could be improved to use a modal or dedicated error area.
        alert(`Error: ${message}`);
        // Optionally, you could try to display this in the feedbackMessage area
        if (this.elements.feedbackMessage) {
            this.elements.feedbackMessage.textContent = message;
            this.elements.feedbackMessage.className = 'incorrect'; // Use error styling
        }
    }
}

export default UIController; 