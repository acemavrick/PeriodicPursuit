/**
 * Main application file for Periodic Pursuit
 * Initializes the game and sets up the UI
 */

import UIController from './uiController.js';
import GameLogic from './gameLogic.js'; // Import GameLogic

// Game settings
const gameSettings = {
    // Default settings
    difficulty: 'normal', // easy, normal, hard
    questionCategories: 'all', // all, atomic, periodic, bonding, reactions, applications, history
    showHints: true,
    timedQuestions: false,
    questionTimer: 30, // seconds per question
    
    // Load settings from localStorage if available
    loadSettings() {
        const savedSettings = localStorage.getItem('periodicPursuitSettings');
        if (savedSettings) {
            const parsed = JSON.parse(savedSettings);
            Object.assign(this, parsed);
        }
    },
    
    // Save settings to localStorage
    saveSettings() {
        localStorage.setItem('periodicPursuitSettings', JSON.stringify({
            difficulty: this.difficulty,
            questionCategories: this.questionCategories,
            showHints: this.showHints,
            timedQuestions: this.timedQuestions,
            questionTimer: this.questionTimer
        }));
    }
};

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load saved settings if available
    gameSettings.loadSettings();
    
    // Create instances and link them
    const ui = new UIController(null); // Pass null for gameLogic initially
    const game = new GameLogic(ui);    // Create GameLogic, passing the UIController instance
    ui.gameLogic = game;               // Now, set the gameLogic instance on the UIController

    // Setup callbacks from GameLogic to UIController methods
    game.onUpdateDisplay = (state) => ui.updateDisplay(state);
    game.onShowQuestion = (question) => ui.showQuestion(question);
    game.onEndGame = (playerWon, score, turns) => ui.endGame(playerWon, score, turns); // Use updated signature
    game.onUpdateValidMoves = (moves) => ui.updateValidMoves(moves);
    // Example for error display, if you implement showError in UIController:
    // game.onShowError = (message) => ui.showError(message);

    // Initialize the UI, which now has a valid gameLogic reference
    ui.createPeriodicTableDOM(); // Create the table structure, it will be hidden initially by showScreen('start')
    // ui.showStartElementSelection(); // DO NOT call this here. This bypasses the start screen.

    // Add event listener for the main start game button on the start screen
    const startGameButton = document.getElementById('start-game-button');
    if (startGameButton) {
        startGameButton.addEventListener('click', () => {
            ui.showStartElementSelection(); // Now show element selection
        });
    } else {
        console.error("#start-game-button not found. Cannot initialize start game flow.");
    }
    
    // Add settings event listeners (for future settings UI)
    document.querySelectorAll('[data-setting]').forEach(element => {
        element.addEventListener('change', (event) => {
            const setting = event.target.dataset.setting;
            const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
            
            // Update the setting
            gameSettings[setting] = value;
            gameSettings.saveSettings();
            
            // Notify UI of setting change
            // ui.onSettingChanged(setting, value); // Commented out as UIController.onSettingChanged is not defined
        });
    });
});