/**
 * Game Logic for Periodic Pursuit
 * Handles core game mechanics and state management
 */

import periodicTableData from './periodicTableData.js';
import questionData from './questionData.js';

// Define constants for Lanthanide and Actinide series
const LANTHANIDE_ATOMIC_NUMBERS = { start: 57, end: 71 }; // La to Lu
const ACTINIDE_ATOMIC_NUMBERS = { start: 89, end: 103 }; // Ac to Lr

class GameLogic {
    constructor(uiController) {
        this.uiController = uiController;
        this.gameActive = false;
        this.currentElement = null; // Full element object
        this.score = 0;
        this.turns = 0;
        this.questionsCorrect = 0;
        this.questionsAttempted = 0;
        this.currentQuestion = null; // Full question object
        this.pathTaken = []; // Array of element symbols
        this.gameStarted = false;
        this.gameEnded = false;
        this.questionActive = false;
        
        this.currentSeries = null; // null, 'lanthanide', or 'actinide'
        this.seriesProgress = new Set(); // Set of atomic numbers visited in the current series
        
        this.unseenQuestionIndices = {}; // { contextKey: Set of original indices for unseen questions }
        this.failedQuestionIndices = {}; // { contextKey: Set of original indices for failed questions }

        this.currentContextQuestions = []; // Holds questions for the current period/series
        this.currentContextKey = ''; // e.g. 'period1', 'lanthanide'

        this.visitedMainTableSymbols = new Set(); // For main table navigation, store symbols

        // Callbacks, can be set by app.js or UI controller
        this.onTileClick = null;
        this.onUpdateDisplay = null;
        this.onShowQuestion = null;
        this.onEndGame = null;
        this.onUpdateValidMoves = null;
        
        this.resetGame(); // Initialize/re-initialize state
    }

    resetGame() {
        this.gameActive = false;
        this.currentElement = null;
        this.score = 0;
        this.turns = 0;
        this.questionsCorrect = 0;
        this.questionsAttempted = 0;
        this.currentQuestion = null;
        this.pathTaken = [];
        this.gameStarted = false;
        this.gameEnded = false;
        this.questionActive = false;
        this.currentSeries = null;
        this.seriesProgress.clear();
        this.unseenQuestionIndices = {};
        this.failedQuestionIndices = {};
        this.currentContextQuestions = [];
        this.currentContextKey = '';
        this.visitedMainTableSymbols.clear();
        this.pendingMoveTargetElement = null;

        questionData.clearCache();
        if (this.onUpdateDisplay) {
            this.onUpdateDisplay(this.getDisplayState());
        }
    }

    async startGame(startingElementSymbol) {
        this.resetGame(); // Ensure clean state
        this.gameStarted = true;
        this.gameActive = true; // Game is active once started
        
        const element = periodicTableData.elements.find(e => e.symbol === startingElementSymbol);
        if (element) {
            this.currentElement = element; // Set current element first
            // Add to pathTaken and visitedMainTableSymbols *without* series logic here, as it's the start
            if (!this.pathTaken.includes(element.symbol)) {
                this.pathTaken.push(element.symbol);
            }
            this.visitedMainTableSymbols.add(element.symbol);
            
            // Initial question context loading (for future questions when moving FROM this element)
            // This is important so that if the first move is into a series, the context is ready.
            let periodNumber = element.period;
            let isLanthanide = element.category === 'lanthanide' && element.atomicNumber >= LANTHANIDE_ATOMIC_NUMBERS.start && element.atomicNumber <= LANTHANIDE_ATOMIC_NUMBERS.end;
            let isActinide = element.category === 'actinide' && element.atomicNumber >= ACTINIDE_ATOMIC_NUMBERS.start && element.atomicNumber <= ACTINIDE_ATOMIC_NUMBERS.end;
            
            // Special check: if starting directly on La or Ac, set currentSeries immediately.
            if (element.atomicNumber === LANTHANIDE_ATOMIC_NUMBERS.start) { // Lanthanum
                this.currentSeries = 'lanthanide';
                this.seriesProgress.add(element.atomicNumber);
                isLanthanide = true; 
                periodNumber = null;
            } else if (element.atomicNumber === ACTINIDE_ATOMIC_NUMBERS.start) { // Actinium
                this.currentSeries = 'actinide';
                this.seriesProgress.add(element.atomicNumber);
                isActinide = true; 
                periodNumber = null;
            }

            this.currentContextKey = this._getContextKey(periodNumber, isLanthanide, isActinide);
            try {
                this.currentContextQuestions = await questionData.getQuestionsForContext(periodNumber, isLanthanide, isActinide);
                if (!this.unseenQuestionIndices[this.currentContextKey]) {
                    this.unseenQuestionIndices[this.currentContextKey] = new Set(
                        this.currentContextQuestions.map((_, index) => index)
                    );
                    this.failedQuestionIndices[this.currentContextKey] = new Set();
                }
            } catch (error) {
                console.error("Failed to load initial questions for context:", this.currentContextKey, error);
                this.uiController.showError("Could not load initial questions.");
                // Potentially allow game to continue without questions for this context, or halt.
            }

            if (this.onUpdateDisplay) this.onUpdateDisplay(this.getDisplayState());
            if (this.onUpdateValidMoves) this.onUpdateValidMoves(this.getValidMoves());
            
            // DO NOT ask a question immediately. Player makes the first move.
            // await this.askQuestion(); // Removed this line

        } else {
            console.error("Starting element not found:", startingElementSymbol);
            this.uiController.showError(`Starting element ${startingElementSymbol} not found.`);
        }
    }

    async setPositionByElement(elementSymbol) {
        const targetElement = periodicTableData.elements.find(e => e.symbol === elementSymbol);
        if (!targetElement) {
            console.error(`Element with symbol ${elementSymbol} not found during setPositionByElement.`);
            this.uiController.showError(`Element ${elementSymbol} not found.`);
            return;
        }

        this.currentElement = targetElement;
        this.pathTaken.push(targetElement.symbol);

        if (this.currentSeries) {
            this.seriesProgress.add(targetElement.atomicNumber);
        } else {
            this.visitedMainTableSymbols.add(targetElement.symbol);
        }
        
        // Handle series transitions
        if (targetElement.atomicNumber === LANTHANIDE_ATOMIC_NUMBERS.start && this.currentSeries !== 'lanthanide') { // Entering Lanthanides (La)
            this.currentSeries = 'lanthanide';
            this.seriesProgress.clear();
            this.seriesProgress.add(targetElement.atomicNumber); // Add La
        } else if (targetElement.atomicNumber === ACTINIDE_ATOMIC_NUMBERS.start && this.currentSeries !== 'actinide') { // Entering Actinides (Ac)
            this.currentSeries = 'actinide';
            this.seriesProgress.clear();
            this.seriesProgress.add(targetElement.atomicNumber); // Add Ac
        }
        // Exiting series is handled in processMove after a correct answer leading out of the series

        let periodNumber = targetElement.period;
        let isLanthanideContext = this.currentSeries === 'lanthanide';
        let isActinideContext = this.currentSeries === 'actinide';

        if (isLanthanideContext || isActinideContext) {
            periodNumber = null; // In series, use series context for questions
        }

        this.currentContextKey = this._getContextKey(periodNumber, isLanthanideContext, isActinideContext);
        try {
            this.currentContextQuestions = await questionData.getQuestionsForContext(periodNumber, isLanthanideContext, isActinideContext);
            if (!this.unseenQuestionIndices[this.currentContextKey]) {
                this.unseenQuestionIndices[this.currentContextKey] = new Set(
                    this.currentContextQuestions.map((_, index) => index)
                );
                this.failedQuestionIndices[this.currentContextKey] = new Set();
            }
        } catch (error) {
            console.error("Failed to load questions for context:", this.currentContextKey, error);
            this.uiController.showError("Could not load questions for the current element.");
            this.currentContextQuestions = [];
        }

        if (this.onUpdateDisplay) this.onUpdateDisplay(this.getDisplayState());
        if (this.onUpdateValidMoves) this.onUpdateValidMoves(this.getValidMoves());
    }

    _getContextKey(periodNumber, isLanthanide, isActinide) {
        if (isLanthanide) return 'lanthanides';
        if (isActinide) return 'actinides';
        if (periodNumber) return `period${periodNumber}`;
        return 'unknown'; // Should not happen with valid elements
    }

    getValidMoves() {
        console.log('[GameLogic.getValidMoves] Called. questionActive:', this.questionActive, 'currentElement:', this.currentElement ? this.currentElement.symbol : null);
        if (!this.currentElement || this.questionActive) return [];

        let possibleMoves = [];
        const currentAtomicNum = this.currentElement.atomicNumber;

        if (this.currentSeries === 'lanthanide') {
            const lanthanides = periodicTableData.lanthanides; // La-Lu
            if (currentAtomicNum === LANTHANIDE_ATOMIC_NUMBERS.start) { // La
                const nextInSeries = lanthanides.find(el => el.atomicNumber === 58); // Ce
                if (nextInSeries && !this.seriesProgress.has(58)) possibleMoves.push(nextInSeries);
            } else if (currentAtomicNum < LANTHANIDE_ATOMIC_NUMBERS.end) { // Ce to Yb
                const currentIndex = lanthanides.findIndex(el => el.atomicNumber === currentAtomicNum);
                if (currentIndex !== -1 && currentIndex < lanthanides.length - 1) {
                    const nextElement = lanthanides[currentIndex + 1];
                    if (!this.seriesProgress.has(nextElement.atomicNumber)) {
                        possibleMoves.push(nextElement);
                    }
                }
            } else if (currentAtomicNum === LANTHANIDE_ATOMIC_NUMBERS.end) { // Lu
                const hafnium = periodicTableData.elements.find(el => el.atomicNumber === 72); // Hf
                if (hafnium) possibleMoves.push(hafnium);
            }
        } else if (this.currentSeries === 'actinide') {
            const actinides = periodicTableData.actinides; // Ac-Lr
            if (currentAtomicNum === ACTINIDE_ATOMIC_NUMBERS.start) { // Ac
                const nextInSeries = actinides.find(el => el.atomicNumber === 90); // Th
                if (nextInSeries && !this.seriesProgress.has(90)) possibleMoves.push(nextInSeries);
            } else if (currentAtomicNum < ACTINIDE_ATOMIC_NUMBERS.end) { // Th to No
                const currentIndex = actinides.findIndex(el => el.atomicNumber === currentAtomicNum);
                if (currentIndex !== -1 && currentIndex < actinides.length - 1) {
                    const nextElement = actinides[currentIndex + 1];
                    if (!this.seriesProgress.has(nextElement.atomicNumber)) {
                        possibleMoves.push(nextElement);
                    }
                }
            } else if (currentAtomicNum === ACTINIDE_ATOMIC_NUMBERS.end) { // Lr
                const rutherfordium = periodicTableData.elements.find(el => el.atomicNumber === 104); // Rf
                if (rutherfordium) possibleMoves.push(rutherfordium);
            }
        } else {
            // Main table navigation
            let currentGridPos = null;
            for (let r = 0; r < periodicTableData.mainTableLayout.rows; r++) {
                for (let c = 0; c < periodicTableData.mainTableLayout.cols; c++) {
                    if (periodicTableData.mainTableLayout.grid[r][c] === this.currentElement.symbol) {
                        currentGridPos = { r, c };
                        break;
                    }
                }
                if (currentGridPos) break;
            }

            if (currentGridPos) {
                const directions = [ {r: -1, c: 0}, {r: 1, c: 0}, {r: 0, c: -1}, {r: 0, c: 1} ];
                directions.forEach(dir => {
                    const nextR = currentGridPos.r + dir.r;
                    const nextC = currentGridPos.c + dir.c;
                    if (nextR >= 0 && nextR < periodicTableData.mainTableLayout.rows &&
                        nextC >= 0 && nextC < periodicTableData.mainTableLayout.cols) {
                        const symbol = periodicTableData.mainTableLayout.grid[nextR][nextC];
                        if (symbol) {
                            const element = periodicTableData.elements.find(el => el.symbol === symbol);
                            if (element && !this.visitedMainTableSymbols.has(symbol)) {
                                possibleMoves.push(element);
                            }
                        }
                    }
                });
            }
        }
        return possibleMoves;
    }

    async askQuestion(targetElementForQuestionContext = null) {
        if (this.gameEnded) return;

        this.questionActive = true;
        let questionToAsk = null;
        let contextElement = targetElementForQuestionContext || this.currentElement;

        // Determine context for the question based on the target of the move
        let periodNumber, isLanthanideContext, isActinideContext;

        if (contextElement) {
            periodNumber = contextElement.period;
            isLanthanideContext = this.currentSeries === 'lanthanide' || 
                                 (contextElement.category === 'lanthanide' && 
                                  contextElement.atomicNumber >= LANTHANIDE_ATOMIC_NUMBERS.start && 
                                  contextElement.atomicNumber <= LANTHANIDE_ATOMIC_NUMBERS.end);
            isActinideContext = this.currentSeries === 'actinide' ||
                               (contextElement.category === 'actinide' &&
                                contextElement.atomicNumber >= ACTINIDE_ATOMIC_NUMBERS.start &&
                                contextElement.atomicNumber <= ACTINIDE_ATOMIC_NUMBERS.end);
            
            // Special handling for entering series: La or Ac target
            if (contextElement.atomicNumber === LANTHANIDE_ATOMIC_NUMBERS.start && this.currentSeries !== 'lanthanide') { // Targeting La to enter series
                isLanthanideContext = true;
                isActinideContext = false;
                periodNumber = null;
            } else if (contextElement.atomicNumber === ACTINIDE_ATOMIC_NUMBERS.start && this.currentSeries !== 'actinide') { // Targeting Ac to enter series
                isActinideContext = true;
                isLanthanideContext = false;
                periodNumber = null;
            } else if (this.currentSeries === 'lanthanide') {
                 isLanthanideContext = true;
                 periodNumber = null;
            } else if (this.currentSeries === 'actinide') {
                 isActinideContext = true;
                 periodNumber = null;
            }
        } else {
            // Fallback if contextElement is somehow null (should not happen in normal flow)
            console.error("Context element is null in askQuestion. Cannot determine question context.");
            this.uiController.showError("Error determining question context.");
            this.questionActive = false;
            if (this.onUpdateDisplay) this.onUpdateDisplay(this.getDisplayState());
            if (this.onUpdateValidMoves) this.onUpdateValidMoves(this.getValidMoves());
            return;
        }
        
        const newContextKey = this._getContextKey(periodNumber, isLanthanideContext, isActinideContext);

        // If context changes, load new questions
        if (this.currentContextKey !== newContextKey || this.currentContextQuestions.length === 0) {
            this.currentContextKey = newContextKey;
            try {
                this.currentContextQuestions = await questionData.getQuestionsForContext(periodNumber, isLanthanideContext, isActinideContext);
                
                // Initialize question pools for this new context if they don't exist
                if (!this.unseenQuestionIndices[this.currentContextKey] && !this.failedQuestionIndices[this.currentContextKey]) {
                    this.unseenQuestionIndices[this.currentContextKey] = new Set(
                        this.currentContextQuestions.map((_, index) => index)
                    );
                    this.failedQuestionIndices[this.currentContextKey] = new Set();
                } else if (!this.unseenQuestionIndices[this.currentContextKey]) {
                    // This might happen if all unseen were exhausted and then context reloaded, ensure it exists
                    this.unseenQuestionIndices[this.currentContextKey] = new Set();
                }
                if (!this.failedQuestionIndices[this.currentContextKey]) {
                    this.failedQuestionIndices[this.currentContextKey] = new Set();
                }

            } catch (error) {
                console.error("Failed to load questions for new context:", this.currentContextKey, error);
                this.uiController.showError("Could not load questions for the selected element.");
                this.questionActive = false;
                if (this.onUpdateDisplay) this.onUpdateDisplay(this.getDisplayState());
                if (this.onUpdateValidMoves) this.onUpdateValidMoves(this.getValidMoves());
                return;
            }
        }
        
        questionToAsk = await this._getQuestionFromPool();

        if (questionToAsk) {
            this.currentQuestion = questionToAsk;
            if (this.onShowQuestion) {
                this.onShowQuestion(this.currentQuestion);
            }
        } else {
            console.warn("No more unasked questions for this context:", this.currentContextKey);
            this.uiController.showError("No more questions available for this section. You may need to restart or add more questions.");
            this.questionActive = false; // No question to ask, so not active
            // Potentially allow movement without question or handle differently
        }
        if (this.onUpdateDisplay) this.onUpdateDisplay(this.getDisplayState());
        // No need to update valid moves here as question is now active
    }
    
    async _getQuestionFromPool() {
        if (!this.currentContextQuestions || this.currentContextQuestions.length === 0) {
            console.warn("Attempted to get question with no context questions loaded for:", this.currentContextKey);
            return null;
        }

        let poolToUse = null;
        let indicesSet = null;

        const unseenIndices = this.unseenQuestionIndices[this.currentContextKey];
        if (unseenIndices && unseenIndices.size > 0) {
            console.log(`[GameLogic._getQuestionFromPool] Trying unseen questions for ${this.currentContextKey}. Count: ${unseenIndices.size}`);
            indicesSet = unseenIndices;
        } else {
            const failedIndices = this.failedQuestionIndices[this.currentContextKey];
            if (failedIndices && failedIndices.size > 0) {
                console.log(`[GameLogic._getQuestionFromPool] Trying failed questions for ${this.currentContextKey}. Count: ${failedIndices.size}`);
                indicesSet = failedIndices;
            } else {
                console.log("All questions exhausted for context:", this.currentContextKey);
                return null; // No questions left in any pool for this context
            }
        }

        // Pick a random index from the chosen set
        const availableIndicesArray = Array.from(indicesSet);
        const randomOriginalIndex = availableIndicesArray[Math.floor(Math.random() * availableIndicesArray.length)];
        
        const question = this.currentContextQuestions[randomOriginalIndex];
        // We don't remove it from the set here. Removal/transfer happens in handleAnswer.
        // We store the original index with the question object temporarily for handleAnswer to use
        question.originalIndexInContext = randomOriginalIndex; 
        return question;
    }

    async processMove(targetElementSymbol, isCorrect) {
        this.questionActive = false; // Question is no longer active
        this.currentQuestion = null; // Clear the current question
        this.pendingMoveTargetElement = null; // Clear preview once move is processed

        const targetElement = this.currentQuestionTarget || periodicTableData.elements.find(el => el.symbol === targetElementSymbol);
        this.currentQuestionTarget = null; // Clear after use

        if (!targetElement) {
            console.error("Target element for processMove is missing or not found:", targetElementSymbol);
            this.uiController.showError("Error processing move: target element not found.");
            if (this.onUpdateDisplay) this.onUpdateDisplay(this.getDisplayState());
            if (this.onUpdateValidMoves) this.onUpdateValidMoves(this.getValidMoves());
            return;
        }

        if (isCorrect) {
            this.score += 10; // Or some other scoring logic
            this.questionsCorrect++;
            
            // Exit series mode if moving from Lu to Hf or Lr to Rf
            const currentAtomic = this.currentElement.atomicNumber;
            if (this.currentSeries === 'lanthanide' && currentAtomic === LANTHANIDE_ATOMIC_NUMBERS.end && targetElement.atomicNumber === 72) { // Lu to Hf
                this.currentSeries = null;
                this.seriesProgress.clear();
                this.visitedMainTableSymbols.add(this.currentElement.symbol); // Mark Lu as visited on main concept
                this.visitedMainTableSymbols.add(targetElement.symbol);    // Mark Hf as visited
            } else if (this.currentSeries === 'actinide' && currentAtomic === ACTINIDE_ATOMIC_NUMBERS.end && targetElement.atomicNumber === 104) { // Lr to Rf
                this.currentSeries = null;
                this.seriesProgress.clear();
                this.visitedMainTableSymbols.add(this.currentElement.symbol); // Mark Lr
                this.visitedMainTableSymbols.add(targetElement.symbol);    // Mark Rf
            }
            
            this.setPositionByElement(targetElementSymbol); // This handles setting currentElement and pushing to pathTaken

            // Series handling should occur AFTER currentElement is updated by setPositionByElement
            // and primarily focus on setting this.currentSeries and managing seriesProgress.
            // The visitedMainTableSymbols for La/Ac themselves is handled in setPositionByElement (conditionally)
            // Let's refine series entry/exit based on the NEW this.currentElement

            const newCurrentElement = this.currentElement; // Already set by setPositionByElement

            if (newCurrentElement.atomicNumber === LANTHANIDE_ATOMIC_NUMBERS.start && this.currentSeries !== 'lanthanide') {
                console.log("Entering Lanthanide series from La");
                this.currentSeries = 'lanthanide';
                this.seriesProgress.clear(); // Clear progress from any previous series
                this.seriesProgress.add(newCurrentElement.atomicNumber); // Add La
                this.visitedMainTableSymbols.add(newCurrentElement.symbol); // Mark La as visited on main table context too
            } else if (newCurrentElement.atomicNumber === ACTINIDE_ATOMIC_NUMBERS.start && this.currentSeries !== 'actinide') {
                console.log("Entering Actinide series from Ac");
                this.currentSeries = 'actinide';
                this.seriesProgress.clear();
                this.seriesProgress.add(newCurrentElement.atomicNumber); // Add Ac
                this.visitedMainTableSymbols.add(newCurrentElement.symbol); // Mark Ac as visited
            } else if (this.currentSeries === 'lanthanide' && newCurrentElement.category === 'lanthanide') {
                this.seriesProgress.add(newCurrentElement.atomicNumber);
            } else if (this.currentSeries === 'actinide' && newCurrentElement.category === 'actinide') {
                this.seriesProgress.add(newCurrentElement.atomicNumber);
            } else {
                 // If we moved to a main table element (e.g. Hf from Lu, or Rf from Lr, or any other main table)
                if (this.currentSeries && (newCurrentElement.category !== 'lanthanide' && newCurrentElement.category !== 'actinide')) {
                    console.log(`Exiting ${this.currentSeries} series to ${newCurrentElement.symbol}`);
                    this.currentSeries = null; // Exited the series
                    this.seriesProgress.clear();
                }
                this.visitedMainTableSymbols.add(newCurrentElement.symbol);
            }

            this.score += this.currentQuestion ? (this.currentQuestion.points || 1) : 1; // Add points based on question
            this.questionsCorrect++;

            // Check for win condition
            if (newCurrentElement.group === 18 && newCurrentElement.category === 'noble-gas') {
                this.endGame(true); // Player won
                return; // End processing here
            }
            
            // Update question context for the *new* current element
            let periodNumber = newCurrentElement.period;
            let isLanthanideContext = this.currentSeries === 'lanthanide';
            let isActinideContext = this.currentSeries === 'actinide';
            if (isLanthanideContext || isActinideContext) periodNumber = null;

            const newContextKey = this._getContextKey(periodNumber, isLanthanideContext, isActinideContext);
            if (this.currentContextKey !== newContextKey) {
                this.currentContextKey = newContextKey;
                try {
                    // Ensure this await is handled because processMove is now async
                    this.currentContextQuestions = await questionData.getQuestionsForContext(periodNumber, isLanthanideContext, isActinideContext);
                    if (!this.unseenQuestionIndices[this.currentContextKey]) {
                        this.unseenQuestionIndices[this.currentContextKey] = new Set(
                            this.currentContextQuestions.map((_, index) => index)
                        );
                        this.failedQuestionIndices[this.currentContextKey] = new Set();
                    }
                } catch (error) {
                    console.error("Failed to load questions for new context after move:", this.currentContextKey, error);
                    this.uiController.showError("Could not load new questions.");
                    // Potentially revert move or handle error state more gracefully
                }
            }

        } else {
            // Incorrect answer
            // Player remains on the current tile, no change in position
            // Score might be penalized or turn simply incremented
        }
        
        if (this.onUpdateDisplay) this.onUpdateDisplay(this.getDisplayState());
        if (this.onUpdateValidMoves && !this.gameEnded) { // Don't show valid moves if game ended
            this.onUpdateValidMoves(this.getValidMoves());
        }
    }

    continueAfterQuestion() { // Called by UI after question is dismissed/answered
        // This function's role might change slightly.
        // If an answer was processed, processMove would have already updated state.
        // This is more for just hiding the question UI and showing updated game state.

        this.questionActive = false; // Ensure question is marked as inactive
        this.pendingMoveTargetElement = null; // Clear preview when continuing after question

        // The game state (currentElement, path, score, turns) should have been updated by processMove.
        // We just need to refresh the display and valid moves.
        if (this.onUpdateDisplay) {
            this.onUpdateDisplay(this.getDisplayState());
        }
        if (this.onUpdateValidMoves && !this.gameEnded) { // Don't show valid moves if game ended
            this.onUpdateValidMoves(this.getValidMoves());
        }
        
        // If the game ended (e.g. player won on the last move), onEndGame would have been called.
        // If no more questions for a context, that should be handled within askQuestion or processMove.
    }

    endGame(playerWon) {
        this.gameActive = false;
        this.gameEnded = true;
        if (this.onEndGame) {
            this.onEndGame(playerWon, this.score, this.turns);
        }
        if (this.onUpdateDisplay) { // Final display update
            this.onUpdateDisplay(this.getDisplayState());
        }
    }

    getDisplayState() {
        return {
            gameActive: this.gameActive,
            gameStarted: this.gameStarted,
            gameEnded: this.gameEnded,
            currentElement: this.currentElement, // Full element object
            score: this.score,
            turns: this.turns,
            questionsCorrect: this.questionsCorrect,
            questionsAttempted: this.questionsAttempted,
            currentQuestion: this.currentQuestion, // Full question object
            questionActive: this.questionActive,
            currentSeries: this.currentSeries,
            seriesProgress: new Set(this.seriesProgress), // Pass a copy
            visitedMainTableSymbols: new Set(this.visitedMainTableSymbols), // Pass a copy
            pathTaken: [...this.pathTaken], // Pass a copy
            pendingMoveTargetElement: this.pendingMoveTargetElement // Include in state
        };
    }

    getStartingElements() {
        return periodicTableData.getStartingElements();
    }

    async handleTileClick(elementSymbol) {
        console.log('[GameLogic.handleTileClick] Called for symbol:', elementSymbol, 'questionActive:', this.questionActive);
        if (!this.gameActive || this.questionActive || this.gameEnded) {
            console.log('[GameLogic.handleTileClick] Exiting: Game not active, question active, or game ended.');
            return;
        }

        const targetElement = periodicTableData.elements.find(el => el.symbol === elementSymbol);
        if (!targetElement) {
            console.error("[GameLogic.handleTileClick] Target element not found for click:", elementSymbol);
            this.uiController.showError("Invalid element clicked.");
            return;
        }

        if (this.currentElement && this.currentElement.symbol === elementSymbol) {
            console.log("[GameLogic.handleTileClick] Clicked on current element. No action.");
            return; 
        }

        const validMoves = this.getValidMoves();
        console.log('[GameLogic.handleTileClick] Calculated validMoves:', validMoves.map(m => m.symbol));
        const isValidMove = validMoves.some(move => move.symbol === elementSymbol);

        if (!isValidMove) {
            console.log(`[GameLogic.handleTileClick] Clicked element ${elementSymbol} is NOT a valid move.`);
            return;
        }
        
        console.log(`[GameLogic.handleTileClick] Clicked element ${elementSymbol} IS a valid move. Proceeding to ask question.`);
        this.currentQuestionTarget = targetElement; 
        this.pendingMoveTargetElement = targetElement; // Store for preview highlighting
        await this.askQuestion(targetElement); 
    }

    async handleAnswer(selectedIndex) {
        console.log(`[GameLogic.handleAnswer] Called with selectedIndex: ${selectedIndex}, questionActive: ${this.questionActive}`);
        if (!this.questionActive || !this.currentQuestion || this.gameEnded) {
            console.warn("[GameLogic.handleAnswer] Exiting: Question not active, no current question, or game ended.");
            return null; 
        }

        this.questionActive = false; 

        this.turns++;
        this.questionsAttempted++;

        const correctAnswerIndex = this.currentQuestion.correct; 
        const isCorrect = selectedIndex === correctAnswerIndex;
        let pointsAwarded = 0;

        // Get the original index of the question that was just answered
        const originalIndexOfAnsweredQuestion = this.currentQuestion.originalIndexInContext;
        if (originalIndexOfAnsweredQuestion === undefined) {
            console.error("[GameLogic.handleAnswer] Original index of question not found. Question management might be broken.");
            // Fallback or error handling - perhaps cannot update question pools correctly
        } else {
            const contextKey = this.currentContextKey;
            if (isCorrect) {
                pointsAwarded = this.currentQuestion.points || 1; 
                // Remove from both pools upon correct answer
                if (this.unseenQuestionIndices[contextKey]) {
                    this.unseenQuestionIndices[contextKey].delete(originalIndexOfAnsweredQuestion);
                }
                if (this.failedQuestionIndices[contextKey]) {
                    this.failedQuestionIndices[contextKey].delete(originalIndexOfAnsweredQuestion);
                }
                console.log(`[GameLogic.handleAnswer] Question (index ${originalIndexOfAnsweredQuestion}) answered correctly. Removed from pools for context ${contextKey}.`);
            } else {
                // Move from unseen to failed, or keep in failed
                if (this.unseenQuestionIndices[contextKey] && this.unseenQuestionIndices[contextKey].has(originalIndexOfAnsweredQuestion)) {
                    this.unseenQuestionIndices[contextKey].delete(originalIndexOfAnsweredQuestion);
                    if (!this.failedQuestionIndices[contextKey]) this.failedQuestionIndices[contextKey] = new Set();
                    this.failedQuestionIndices[contextKey].add(originalIndexOfAnsweredQuestion);
                    console.log(`[GameLogic.handleAnswer] Question (index ${originalIndexOfAnsweredQuestion}) answered incorrectly. Moved from unseen to failed for context ${contextKey}.`);
                } else if (this.failedQuestionIndices[contextKey] && this.failedQuestionIndices[contextKey].has(originalIndexOfAnsweredQuestion)){
                    // Already in failed, keep it there.
                    console.log(`[GameLogic.handleAnswer] Question (index ${originalIndexOfAnsweredQuestion}) answered incorrectly again. Stays in failed for context ${contextKey}.`);
                } else if (!this.failedQuestionIndices[contextKey]){
                    // Should not happen if unseen also doesn't have it, but as a safeguard for failed pool init
                    this.failedQuestionIndices[contextKey] = new Set();
                    this.failedQuestionIndices[contextKey].add(originalIndexOfAnsweredQuestion);
                } else {
                     // If it wasn't in unseen, and not in failed, it implies an issue or it was already correctly answered.
                     // For safety, if it's an incorrect answer to a question not in unseen, add to failed if not already there.
                     if (!this.failedQuestionIndices[contextKey].has(originalIndexOfAnsweredQuestion)) {
                        this.failedQuestionIndices[contextKey].add(originalIndexOfAnsweredQuestion);
                        console.warn(`[GameLogic.handleAnswer] Question (index ${originalIndexOfAnsweredQuestion}) answered incorrectly. Was not in unseen, added to failed for context ${contextKey}. State might be unusual.`);
                     }
                }
            }
        }
        // Clear the temporary property
        if (this.currentQuestion) delete this.currentQuestion.originalIndexInContext;

        await this.processMove(this.currentQuestionTarget ? this.currentQuestionTarget.symbol : null, isCorrect);
        
        // Return result for UI to display feedback
        // processMove itself doesn't return this structure, so we construct it here.
        // The state (score, currentElement etc.) is updated by processMove via its calls to setPosition, etc.
        // The UI will then re-render based on the new overall game state from getDisplayState() via continueAfterQuestion -> onUpdateDisplay

        // If the game ended within processMove (e.g. reached noble gas), this.gameEnded will be true.
        // The onEndGame callback would have been triggered from processMove/endGame.
        // So, we don't need to do special endgame handling here in handleAnswer's return,
        // as the UI flow via continueButton -> continueAfterQuestion -> updateDisplay will catch the gameEnded state.
        if (this.gameEnded) {
             console.log("[GameLogic.handleAnswer] Game has ended after processMove.");
            return null; // No typical feedback result if game ended.
        }

        return {
            correct: isCorrect,
            correctIndex: correctAnswerIndex,
            selectedIndex: selectedIndex,
            pointsAwarded: pointsAwarded // Only relevant if correct
        };
    }
}

export default GameLogic; 