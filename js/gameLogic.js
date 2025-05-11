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
        this.gameOver = false; // New flag for noble gas reached state
        this.finalScore = 0; // Store calculated final score
        
        // Debug flag to control testing features
        this.debugMode = false;
        
        this.currentSeries = null; // null, 'lanthanide', or 'actinide'
        this.seriesProgress = new Set(); // Set of atomic numbers visited in the current series
        
        this.unseenQuestionIndices = {}; // { contextKey: Set of original indices for unseen questions }
        this.failedQuestionIndices = {}; // { contextKey: Set of original indices for failed questions }
        this.lastFailedQuestionOriginalIndexByContext = {}; // { contextKey: originalIndex }

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

    // Debug method to trigger end screen immediately
    debugSkipToEndScreen() {
        // Set some reasonable values for testing
        this.score = 100;
        this.turns = 10;
        this.questionsCorrect = 8;
        this.questionsAttempted = 10;
        
        // End the game with a "win" state
        this.endGame(true);
    }
    
    // Toggle debug mode on/off
    toggleDebugMode() {
        this.debugMode = !this.debugMode;
        console.log(`DEBUG MODE: ${this.debugMode ? 'ON' : 'OFF'}`);
        return this.debugMode;
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
        this.gameOver = false;
        this.finalScore = 0;
        // Don't reset debugMode flag so it persists between game resets
        
        this.currentSeries = null;
        this.seriesProgress.clear();
        this.unseenQuestionIndices = {};
        this.failedQuestionIndices = {};
        this.lastFailedQuestionOriginalIndexByContext = {};
        this.currentContextQuestions = [];
        this.currentContextKey = '';
        this.visitedMainTableSymbols.clear();
        this.pendingMoveTargetElement = null;
        // We don't reset debug mode on game reset

        questionData.clearCache();
        if (this.onUpdateDisplay) {
            this.onUpdateDisplay(this.getDisplayState());
        }
    }

    async startGame(startingElementSymbol) {
        this.resetGame(); // Ensure clean state
        this.gameStarted = true;
        this.gameActive = true; // Game is active once started
        
        // Log debug mode status when game starts
        if (this.debugMode) {
            console.log("DEBUG MODE IS ACTIVE - End screen will appear after your first move");
        }
        
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

        let indicesSet = null;
        let randomOriginalIndex = -1; // Initialize with a value indicating not found

        const unseenIndices = this.unseenQuestionIndices[this.currentContextKey];
        if (unseenIndices && unseenIndices.size > 0) {
            console.log(`[GameLogic._getQuestionFromPool] Trying unseen questions for ${this.currentContextKey}. Count: ${unseenIndices.size}`);
            indicesSet = unseenIndices;
            const availableIndicesArray = Array.from(indicesSet);
            randomOriginalIndex = availableIndicesArray[Math.floor(Math.random() * availableIndicesArray.length)];
        } else {
            const failedIndices = this.failedQuestionIndices[this.currentContextKey];
            if (failedIndices && failedIndices.size > 0) {
                console.log(`[GameLogic._getQuestionFromPool] Trying failed questions for ${this.currentContextKey}. Count: ${failedIndices.size}`);
                indicesSet = failedIndices;
                let availableFailedIndicesArray = Array.from(indicesSet);
                const lastFailedIdx = this.lastFailedQuestionOriginalIndexByContext[this.currentContextKey];

                if (availableFailedIndicesArray.length > 1 && lastFailedIdx !== undefined && availableFailedIndicesArray.includes(lastFailedIdx)) {
                    // Try to pick a different one
                    const filteredArray = availableFailedIndicesArray.filter(idx => idx !== lastFailedIdx);
                    if (filteredArray.length > 0) { // Ensure filter didn't empty the array if it only contained lastFailedIdx (which is covered by length > 1 check)
                       availableFailedIndicesArray = filteredArray;
                    } 
                    // If filter results in empty (shouldn't if length > 1 and it contained lastFailedIdx), it will pick randomly from the original list below
                    // but this scenario is less likely due to length > 1. More robustly, if filteredArray.length IS 0, revert to original.
                    // For now, if filteredArray is non-empty, use it.
                }
                // If availableFailedIndicesArray is still the original or filtered (and non-empty)
                if (availableFailedIndicesArray.length > 0) {
                    randomOriginalIndex = availableFailedIndicesArray[Math.floor(Math.random() * availableFailedIndicesArray.length)];
                } else if (Array.from(indicesSet).length > 0) { // Fallback if filtering somehow led to an empty array but original set was not empty
                    const originalFailedArray = Array.from(indicesSet);
                    randomOriginalIndex = originalFailedArray[Math.floor(Math.random() * originalFailedArray.length)];
                }

            } else {
                console.log("All questions exhausted for context:", this.currentContextKey);
                return null; // No questions left in any pool for this context
            }
        }

        if (randomOriginalIndex === -1 || randomOriginalIndex === undefined) {
             console.warn("Could not select a question index for context:", this.currentContextKey, "Unseen size:", unseenIndices ? unseenIndices.size : 'N/A', "Failed size:", this.failedQuestionIndices[this.currentContextKey] ? this.failedQuestionIndices[this.currentContextKey].size : 'N/A');
             return null; // Safety check
        }
        
        const question = this.currentContextQuestions[randomOriginalIndex];
        // We don't remove it from the set here. Removal/transfer happens in handleAnswer.
        // We store the original index with the question object temporarily for handleAnswer to use
        question.originalIndexInContext = randomOriginalIndex; 
        return question;
    }

    async processMove(targetElementSymbol, isCorrect) {
        // this.questionActive = false; // REMOVED: Question remains active during feedback until "Continue"
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
            // Score is updated in handleAnswer now
            // this.questionsCorrect++; // This is also incremented in handleAnswer if we move it there, or keep here.
                                    // Let's keep questionsCorrect increment here as it relates to a *successful move process*.
            
            this.setPositionByElement(targetElementSymbol); // This handles setting currentElement and pushing to pathTaken

            // DEBUG: Skip to end screen after first move if debug mode is enabled
            if (this.debugMode) {
                console.log("DEBUG: Skipping to end screen after move");
                this.debugSkipToEndScreen();
                return;
            }

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
        this.questionActive = false; // Question is now officially inactive.
        this.currentQuestion = null; // Clear the question.
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
        this.gameOver = playerWon;
        
        // Calculate final score rounded to 4 decimal places
        this.finalScore = (this.score / this.turns).toFixed(4);
        
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
            pendingMoveTargetElement: this.pendingMoveTargetElement, // Include in state
            gameOver: this.gameOver, // Include gameOver flag
            finalScore: this.finalScore // Include final score
        };
    }

    getStartingElements() {
        return periodicTableData.getStartingElements();
    }

    async handleTileClick(elementSymbol) {
        console.log('[GameLogic.handleTileClick] Called for symbol:', elementSymbol, 'questionActive:', this.questionActive);
        
        // Special handling for game over state (noble gas reached)
        if (this.gameOver && !this.questionActive) {
            console.log('[GameLogic.handleTileClick] Game over but allowing click for element exploration');
            const targetElement = periodicTableData.elements.find(el => el.symbol === elementSymbol);
            if (targetElement) {
                this.currentQuestionTarget = targetElement;
                await this.askQuestion(targetElement);
            }
            return;
        }
        
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
        if (!this.questionActive || !this.currentQuestion) {
            console.warn("[GameLogic.handleAnswer] Exiting: Question not active or no current question.");
            return null; 
        }
        
        // Special handling for game over state (noble gas reached)
        if (this.gameOver) {
            const correctAnswerIndex = this.currentQuestion.correct;
            const isCorrect = selectedIndex === correctAnswerIndex;
            
            // Don't update score or move - just track for UI feedback
            return {
                correct: isCorrect,
                correctIndex: correctAnswerIndex,
                selectedIndex: selectedIndex,
                pointsAwarded: 0,
                gameOver: true
            };
        }

        // NOTE: this.questionActive remains true throughout this function and processMove.
        // It will be set to false by continueAfterQuestion().

        this.turns++;
        this.questionsAttempted++;

        const correctAnswerIndex = this.currentQuestion.correct; 
        const isCorrect = selectedIndex === correctAnswerIndex;
        let pointsAwarded = 0;

        // Get the original index of the question that was just answered
        const originalIndexOfAnsweredQuestion = this.currentQuestion.originalIndexInContext;
        if (originalIndexOfAnsweredQuestion === undefined) {
            console.error("[GameLogic.handleAnswer] Original index of question not found. Question management might be broken.");
        } else {
            const contextKey = this.currentContextKey;
            if (isCorrect) {
                this.questionsCorrect++; // Increment successful answers
                pointsAwarded = this.currentQuestion.points || 1; 
                this.score += pointsAwarded; // Update score here

                // Remove from both pools upon correct answer
                if (this.unseenQuestionIndices[contextKey]) {
                    this.unseenQuestionIndices[contextKey].delete(originalIndexOfAnsweredQuestion);
                }
                if (this.failedQuestionIndices[contextKey]) {
                    this.failedQuestionIndices[contextKey].delete(originalIndexOfAnsweredQuestion);
                }
                // If it was correct, it can't be the "last failed"
                delete this.lastFailedQuestionOriginalIndexByContext[contextKey]; 
                console.log(`[GameLogic.handleAnswer] Question (index ${originalIndexOfAnsweredQuestion}) answered correctly. Score: ${this.score}. Removed from pools for context ${contextKey}.`);
            } else {
                // Mark as last failed for this context
                this.lastFailedQuestionOriginalIndexByContext[contextKey] = originalIndexOfAnsweredQuestion;

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
                    this.failedQuestionIndices[contextKey] = new Set();
                    this.failedQuestionIndices[contextKey].add(originalIndexOfAnsweredQuestion);
                    console.warn(`[GameLogic.handleAnswer] Question (index ${originalIndexOfAnsweredQuestion}) answered incorrectly. Failed pool for ${contextKey} was missing, created and added.`);
                } else {
                     if (!this.failedQuestionIndices[contextKey].has(originalIndexOfAnsweredQuestion)) {
                        this.failedQuestionIndices[contextKey].add(originalIndexOfAnsweredQuestion);
                        console.warn(`[GameLogic.handleAnswer] Question (index ${originalIndexOfAnsweredQuestion}) answered incorrectly. Was not in unseen, added to failed for context ${contextKey}. State might be unusual.`);
                     }
                }
            }
        }
        
        const questionTargetSymbolForMove = this.currentQuestionTarget ? this.currentQuestionTarget.symbol : null;
        // Clear the temporary property from the question object that was used for pool management.
        if (this.currentQuestion) delete this.currentQuestion.originalIndexInContext;
        // this.currentQuestion itself is cleared by continueAfterQuestion()

        // this.questionActive = false; // Explicitly NOT setting this false here.

        await this.processMove(questionTargetSymbolForMove, isCorrect);
        
        // Return result for UI to display feedback
        // The currentQuestion object is still available here for the UI to use for feedback if needed.
        // But the result object should contain all necessary info for feedback.

        if (this.gameEnded) {
             console.log("[GameLogic.handleAnswer] Game has ended after processMove.");
             // this.currentQuestion = null; // Clear if game ended
            return null; 
        }
        
        // this.currentQuestion = null; // Clear current question *after* its details are used for feedback and processing
                                    // This is effectively done when a new question is asked or game continues.

        return {
            correct: isCorrect,
            correctIndex: correctAnswerIndex,
            selectedIndex: selectedIndex,
            pointsAwarded: pointsAwarded 
        };
    }
}

export default GameLogic;