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
            // Game over overlay elements
            gameOverOverlay: document.getElementById('game-over-overlay'),
            gameOverMessage: document.getElementById('game-over-message'),
            overlayFinalScore: document.getElementById('overlay-final-score'),
            restartFromOverlay: document.getElementById('restart-from-overlay'),
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
        }            // Add event listener for the restart button in the game-over overlay
        if (this.elements.restartFromOverlay) {
            this.elements.restartFromOverlay.addEventListener('click', () => {
                console.log('Restart from overlay button clicked');
                window.location.reload();
            });
            console.log('Added event listener to restart-from-overlay button');
        } else {
            console.error('Restart from overlay button element not found');
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
            // Update question text if it doesn't match (e.g. if askQuestion set it, or if it was cleared)
            if (this.elements.questionText && this.elements.questionText.textContent !== state.currentQuestion.text) {
                this.elements.questionText.textContent = state.currentQuestion.text;
            }
            // Ensure answer options container is visible. Its content is managed by showQuestion (initial) and showAnswerFeedback (styling).
            if (this.elements.answersContainer && this.elements.answersContainer.style) {
                this.elements.answersContainer.style.display = 'block';
            }
            const pointsDisplay = document.getElementById('question-points-value');
            if (pointsDisplay) pointsDisplay.textContent = state.currentQuestion.points || '0';
            // The actual content and styling of questionText and answersContainer
            // are handled by showQuestion (when new) and showAnswerFeedback (after answer).
            // updateDisplay just ensures they are visible if a question is active.

        } else if (state.gameActive) { // No question active (e.g. after continue, before new selection), but game is active
            this.showScreen('game');
            if (this.elements.questionScreen && this.elements.questionScreen.style) {
                 this.elements.questionScreen.style.display = 'block'; // Question container is part of game, always block
            }
            if (this.elements.answersContainer && this.elements.answersContainer.style) {
                 this.elements.answersContainer.style.display = 'none'; // Hide answers if no active question
                 this.elements.answersContainer.innerHTML = ''; // Clear them too, ready for next question
            }
            if (this.elements.questionText && !state.questionActive) { // Clear question text if no question
                if (state.gameOver) {
                    // Handle finalScore regardless of whether it's already a string or a number
                    const formattedScore = typeof state.finalScore === 'number' ? 
                        state.finalScore.toFixed(4) : state.finalScore;
                    this.elements.questionText.innerHTML = `Congratulations! You reached a noble gas. Final score: ${formattedScore}\nReload to play again, or click on more elements to get more questions!.`;
                } else {
                    this.elements.questionText.innerHTML = 'Click on an adjacent element to move.';
                }
            }
            const pointsDisplay = document.getElementById('question-points-value');
            if (pointsDisplay) pointsDisplay.textContent = '0'; // Clear points display

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
            const pointsDisplayValue = document.getElementById('question-points-value');
            if (pointsDisplayValue) pointsDisplayValue.textContent = '0';
            return;
        }

        // Check if game is over (noble gas reached)
        const gameState = this.gameLogic.getDisplayState();
        
        const pointsDisplayValue = document.getElementById('question-points-value');
        if (pointsDisplayValue) {
            if (gameState.gameOver) {
                pointsDisplayValue.textContent = 'N/A';
            } else {
                pointsDisplayValue.textContent = question.points || '0';
            }
        }

        if (this.elements.questionText) this.elements.questionText.textContent = question.text;
        if (this.elements.answersContainer) this.elements.answersContainer.innerHTML = '';
        if (this.elements.feedbackMessage) {
            this.elements.feedbackMessage.innerHTML = '';
            this.elements.feedbackMessage.className = '';
        }
        if (this.elements.continueButton) this.elements.continueButton.style.display = 'none';

        // Create a flag to track if an answer has been selected already
        let answerSelected = false;
        
        // Create an answer lock overlay that will be shown immediately on selection
        const answerLockOverlay = document.createElement('div');
        answerLockOverlay.className = 'answer-lock-overlay';
        answerLockOverlay.style.display = 'none';
        answerLockOverlay.style.position = 'absolute';
        answerLockOverlay.style.top = '0';
        answerLockOverlay.style.left = '0';
        answerLockOverlay.style.width = '100%';
        answerLockOverlay.style.height = '100%';
        answerLockOverlay.style.zIndex = '100';
        answerLockOverlay.style.backgroundColor = 'transparent';
        answerLockOverlay.style.cursor = 'not-allowed';
        
        // Add the overlay to the answers container, but keep it hidden initially
        if (this.elements.answersContainer) {
            this.elements.answersContainer.style.position = 'relative'; // Ensure positioning context
            this.elements.answersContainer.appendChild(answerLockOverlay);
        }

        // Create form to contain the radio button group
        const form = document.createElement('form');
        form.onsubmit = (e) => e.preventDefault(); // Prevent form submission
        
        question.options.forEach((option, index) => {
            // Create a container for each radio button and its label
            const optionContainer = document.createElement('div');
            optionContainer.classList.add('answer-option-container');
            optionContainer.dataset.index = index.toString();

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
            
            // Combined handler for both radio and label
            const handleSelection = async (e) => {
                // If an answer is already selected, prevent and ignore this interaction
                if (answerSelected) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                
                // Mark as selected immediately
                answerSelected = true;
                
                // Set the input as checked
                radioInput.checked = true;
                
                // Disable all radio buttons immediately
                form.querySelectorAll('input[type="radio"]').forEach(input => {
                    input.disabled = true;
                });
                
                // Show the overlay immediately to block all interactions
                answerLockOverlay.style.display = 'block';
                
                // Apply the no-hover class to all options to disable hover effects
                form.querySelectorAll('.answer-option-container').forEach(opt => {
                    opt.classList.add('no-hover');
                });
                
                console.log(`[UIController.showQuestion] Answer option ${index} ('${option}') selected via radio/label.`);
                
                // Process the answer with game logic
                if (this.gameLogic && typeof this.gameLogic.handleAnswer === 'function') {
                    const result = await this.gameLogic.handleAnswer(index);
                    
                    // Display the feedback (the overlay remains active)
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
            
            // Attach event listeners to both radio and label
            radioInput.addEventListener('click', handleSelection);
            radioInput.addEventListener('change', handleSelection);
            
            // Also attach to the label to ensure all clicks are captured
            label.addEventListener('click', (e) => {
                if (answerSelected) {
                    e.preventDefault();
                    e.stopPropagation();
                } else {
                    // Only handle if not already handled by radio
                    if (!radioInput.checked) {
                        handleSelection(e);
                    }
                }
            });
            
            // Attach to the container too for extra security
            optionContainer.addEventListener('click', (e) => {
                if (answerSelected) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });

            optionContainer.appendChild(radioInput);
            optionContainer.appendChild(label);
            form.appendChild(optionContainer);
        });
        
        // Add the form to the answers container
        if (this.elements.answersContainer) this.elements.answersContainer.appendChild(form);
        if (this.elements.answersContainer) this.elements.answersContainer.style.display = 'block';
    }

    showAnswerFeedback(result) {
        // Get the containers from within the form we created
        const form = this.elements.answersContainer.querySelector('form');
        if (!form) {
            console.error("Could not find form in answers container");
            return;
        }
        
        const radioContainers = form.querySelectorAll('.answer-option-container');

        radioContainers.forEach((container, i) => {
            const radio = container.querySelector('.answer-radio-input');
            if (radio) {
                radio.disabled = true; // Ensure all radios are disabled (should already be from handleSelection)
            }
            
            // Clear ALL specific feedback styling classes first to prevent conflicts
            container.classList.remove('selected-incorrect', 'actual-correct', 'other-incorrect-dimmed');
            // Also remove older, more generic classes if they were somehow still there or applied elsewhere
            container.classList.remove('correct-container', 'incorrect-container');

            if (i === result.correctIndex) {
                // This is the actual correct answer, regardless of user selection
                container.classList.add('actual-correct');
            } else {
                // This is an incorrect answer option
                if (result.selectedIndex === i) {
                    // User selected this incorrect option
                    container.classList.add('selected-incorrect');
                } else {
                    // This is an incorrect option that the user did NOT select
                    container.classList.add('other-incorrect-dimmed');
                }
            }
        });

        if (this.elements.feedbackMessage) {
            if (result.gameOver) {
                // Game is over, show different feedback
                this.elements.feedbackMessage.textContent = result.correct ? 'Correct!' : 'Incorrect.';
                this.elements.feedbackMessage.className = result.correct ? 'correct' : 'incorrect';
            } else {
                this.elements.feedbackMessage.textContent = result.correct ? `Correct! +${result.pointsAwarded} points` : 'Incorrect.';
                this.elements.feedbackMessage.className = result.correct ? 'correct' : 'incorrect';
            }
        }
        if (this.elements.continueButton) this.elements.continueButton.style.display = 'block';
    }

    continueGame() {
        this.elements.feedbackMessage.innerHTML = '';
        this.elements.feedbackMessage.className = '';
        this.elements.continueButton.style.display = 'none';
        this.elements.answersContainer.innerHTML = ''; // This will clear the form, radio buttons, and lock overlay
        
        // Check if the game is over and show congratulations message
        const gameState = this.gameLogic.getDisplayState();
        if (gameState.gameOver) {
            // Handle finalScore regardless of whether it's already a string or a number
            const formattedScore = typeof gameState.finalScore === 'number' ? 
                gameState.finalScore.toFixed(4) : gameState.finalScore;
            this.elements.questionText.innerHTML = `Congratulations! You reached a noble gas. Final score: ${formattedScore}`;
        } else {
            this.elements.questionText.innerHTML = 'Click on an adjacent element to move.';
        }
        
        const pointsDisplayValue = document.getElementById('question-points-value');
        if (pointsDisplayValue) pointsDisplayValue.textContent = '0';
        
        this.gameLogic.continueAfterQuestion(); // This will update display and valid moves
    }

    endGame(playerWon, score, turns) {
        // If player won by reaching a noble gas, show the game-over overlay
        if (playerWon) {
            // Get the final score from game state
            const gameState = this.gameLogic.getDisplayState();
            // Handle finalScore regardless of whether it's already a string or a number
            const finalScore = typeof gameState.finalScore === 'number' ? 
                gameState.finalScore.toFixed(4) : gameState.finalScore;
            
            // Update the overlay content
            if (this.elements.overlayFinalScore) {
                this.elements.overlayFinalScore.textContent = finalScore;
            }
            
            // Create the mini periodic table with highlighted path
            if (gameState.pathTaken && gameState.pathTaken.length > 0) {
                this.createMiniPeriodicTable(gameState.pathTaken);
                // Call drawPathConnections after a short delay to ensure the table is rendered
                setTimeout(() => this.drawPathConnections(gameState.pathTaken), 100);
            }
            
            // Show the game-over overlay
            if (this.elements.gameOverOverlay) {
                this.elements.gameOverOverlay.style.display = 'flex';
                console.log('Game over overlay displayed');
            } else {
                console.error('Game over overlay element not found');
            }
        }
        
        // If player did not win (e.g., quit or lost, though current logic focuses on win)
        // you might want to handle this case differently, perhaps showing a different message
        // or not showing the path visualization. For now, it only shows on win.

        // Hide the main game screen elements if they are not already hidden
        if (this.elements.gameScreen && this.elements.gameScreen.style.display !== 'none') {
            this.elements.gameScreen.style.display = 'none';
        }
        if (this.elements.questionScreen && this.elements.questionScreen.style.display !== 'none') {
            this.elements.questionScreen.style.display = 'none';
        }
    }

    createMiniPeriodicTable(pathTaken) {
        const miniTableContainer = document.getElementById('mini-periodic-table');
        if (!miniTableContainer) return;
        
        // Clear any existing content
        miniTableContainer.innerHTML = '';
        
        // Ensure periodicTableData is available (it should be if imported correctly)
        if (typeof periodicTableData === 'undefined' || !periodicTableData.mainTableLayout || !periodicTableData.elements) {
            console.error("periodicTableData is not available or not structured as expected.");
            return;
        }
        
        // Use the same grid layout as the main table
        periodicTableData.mainTableLayout.grid.forEach((row, rowIndex) => {
            row.forEach((elementSymbol, colIndex) => {
                const tile = document.createElement('div');
                tile.className = 'mini-element-tile';
                
                if (elementSymbol) {
                    tile.textContent = elementSymbol;
                    tile.dataset.symbol = elementSymbol;
                    
                    // Check if this element is in the path
                    if (pathTaken.includes(elementSymbol)) {
                        tile.classList.add('path-element');
                        
                        // Mark start and end
                        if (elementSymbol === pathTaken[0]) {
                            tile.classList.add('path-start');
                        } else if (elementSymbol === pathTaken[pathTaken.length - 1]) {
                            tile.classList.add('path-end');
                        }
                    }
                } else {
                    tile.classList.add('empty');
                }
                
                miniTableContainer.appendChild(tile);
            });
        });
        
        // Add lanthanides and actinides rows if they were visited or part of the path
        const lanthanidePathElements = pathTaken.filter(symbol => {
            const element = periodicTableData.elements.find(el => el.symbol === symbol);
            return element && element.category === 'lanthanide';
        });
        
        const actinidePathElements = pathTaken.filter(symbol => {
            const element = periodicTableData.elements.find(el => el.symbol === symbol);
            return element && element.category === 'actinide';
        });

        // A more robust check: display series if any element from that series is in the path
        const shouldDisplayLanthanides = lanthanidePathElements.length > 0;
        const shouldDisplayActinides = actinidePathElements.length > 0;

        if (shouldDisplayLanthanides) {
            this._createMiniSeriesRow(miniTableContainer, 'lanthanide', pathTaken);
        }
        
        if (shouldDisplayActinides) {
            this._createMiniSeriesRow(miniTableContainer, 'actinide', pathTaken);
        }
    }
    
    _createMiniSeriesRow(container, seriesType, pathTaken) {
        // Ensure periodicTableData and its series are available
        if (typeof periodicTableData === 'undefined' || !periodicTableData.lanthanides || !periodicTableData.actinides) {
            console.error("periodicTableData series data is not available.");
            return;
        }

        const seriesElements = seriesType === 'lanthanide' ? 
            periodicTableData.lanthanides : periodicTableData.actinides;
        
        // Create spacer cells to align with the main table structure (approximate)
        // For Lanthanides/Actinides, they usually appear below Group 3.
        // The number of spacers might need adjustment based on your exact CSS grid for mini-periodic-table.
        // Assuming 18 columns, and series starts effectively under column 3.
        for (let i = 0; i < 2; i++) { // 2 spacer cells before the series starts
            const spacer = document.createElement('div');
            spacer.className = 'mini-element-tile empty';
            container.appendChild(spacer);
        }
        
        // Create series elements
        seriesElements.forEach(element => {
            // Validate element structure
            if (!element || typeof element.symbol === 'undefined' || typeof element.atomicNumber === 'undefined') {
                console.warn("Skipping invalid element in series data:", element);
                return;
            }
            // Filter for the actual elements in the series range (La-Lu for Lanthanides, Ac-Lr for Actinides)
            // This ensures we only add the 15 elements of each series.
            const isLanthanideElement = seriesType === 'lanthanide' && element.atomicNumber >= 57 && element.atomicNumber <= 71;
            const isActinideElement = seriesType === 'actinide' && element.atomicNumber >= 89 && element.atomicNumber <= 103;

            if (isLanthanideElement || isActinideElement) {
                const tile = document.createElement('div');
                tile.className = 'mini-element-tile';
                tile.textContent = element.symbol;
                tile.dataset.symbol = element.symbol;
                
                if (pathTaken.includes(element.symbol)) {
                    tile.classList.add('path-element');
                    
                    if (element.symbol === pathTaken[0]) {
                        tile.classList.add('path-start');
                    } else if (element.symbol === pathTaken[pathTaken.length - 1]) {
                        tile.classList.add('path-end');
                    }
                }
                container.appendChild(tile);
            }
        });
        
        // Calculate remaining spacer cells to fill up to 18 columns
        // 2 (start spacers) + 15 (series elements) = 17. So 1 more spacer.
        const remainingSpacers = 18 - 2 - seriesElements.filter(el => {
             const isLanthanideElement = seriesType === 'lanthanide' && el.atomicNumber >= 57 && el.atomicNumber <= 71;
             const isActinideElement = seriesType === 'actinide' && el.atomicNumber >= 89 && el.atomicNumber <= 103;
             return isLanthanideElement || isActinideElement;
        }).length;

        for (let i = 0; i < remainingSpacers; i++) {
            const spacer = document.createElement('div');
            spacer.className = 'mini-element-tile empty';
            container.appendChild(spacer);
        }
    }

    drawPathConnections(pathTaken) {
        const miniTable = document.getElementById('mini-periodic-table');
        if (!miniTable || pathTaken.length < 2) return;
        
        // Get all tiles in the mini table that have a symbol (i.e., are not empty)
        const allTiles = miniTable.querySelectorAll('.mini-element-tile[data-symbol]');
        
        // For each consecutive pair of elements in the path
        for (let i = 0; i < pathTaken.length - 1; i++) {
            const currentSymbol = pathTaken[i];
            const nextSymbol = pathTaken[i + 1];
            
            // Find the corresponding tiles
            const currentTile = Array.from(allTiles).find(tile => tile.dataset.symbol === currentSymbol);
            const nextTile = Array.from(allTiles).find(tile => tile.dataset.symbol === nextSymbol);
            
            if (currentTile && nextTile) {
                // Get the positions relative to the miniTable container
                const currentRect = currentTile.getBoundingClientRect();
                const nextRect = nextTile.getBoundingClientRect();
                const tableRect = miniTable.getBoundingClientRect();
                
                // Calculate center points relative to the table's top-left corner
                const currentX = currentRect.left - tableRect.left + currentRect.width / 2;
                const currentY = currentRect.top - tableRect.top + currentRect.height / 2;
                const nextX = nextRect.left - tableRect.left + nextRect.width / 2;
                const nextY = nextRect.top - tableRect.top + nextRect.height / 2;
                
                // Calculate line properties
                const deltaX = nextX - currentX;
                const deltaY = nextY - currentY;
                const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
                
                // Create line element
                const line = document.createElement('div');
                line.className = 'path-line';
                line.style.width = `${length}px`;
                line.style.height = '2px'; // Line thickness
                line.style.left = `${currentX}px`;
                line.style.top = `${currentY - 1}px`; // Adjust top for line thickness to center it
                line.style.transform = `rotate(${angle}deg)`;
                
                // Add to mini table
                miniTable.appendChild(line);
            } else {
                if (!currentTile) console.warn(`Path connection: Could not find tile for current symbol ${currentSymbol}`);
                if (!nextTile) console.warn(`Path connection: Could not find tile for next symbol ${nextSymbol}`);
            }
        }
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