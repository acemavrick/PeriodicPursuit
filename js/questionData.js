/**
 * Question Data Loader for Periodic Pursuit
 * Dynamically loads questions based on period or series (Lanthanides/Actinides).
 */

// Helper function to dynamically import question modules
async function loadQuestions(filePath) {
    try {
        const module = await import(filePath);
        return module.questions || []; // Expecting an exported 'questions' array
    } catch (error) {
        console.error(`Error loading questions from ${filePath}:`, error);
        return []; // Return empty array on error to prevent game crash
    }
}

const questionData = {
    // Cache for loaded questions to avoid re-fetching
    _questionCache: {},

    /**
     * Retrieves questions for a given period, or for Lanthanides/Actinides.
     * @param {number} periodNumber - The period number (1-7).
     * @param {boolean} isLanthanide - True if Lanthanide series questions are needed.
     * @param {boolean} isActinide - True if Actinide series questions are needed.
     * @returns {Promise<Array>} A promise that resolves to an array of question objects.
     */
    getQuestionsForContext: async function(periodNumber, isLanthanide = false, isActinide = false) {
        let cacheKey;
        let filePath;

        if (isLanthanide) {
            cacheKey = 'lanthanides';
            filePath = './questions/lanthanideQuestions.js';
        } else if (isActinide) {
            cacheKey = 'actinides';
            filePath = './questions/actinideQuestions.js';
        } else if (periodNumber >= 1 && periodNumber <= 7) {
            cacheKey = `period${periodNumber}`;
            filePath = `./questions/period${periodNumber}Questions.js`;
        } else {
            console.error(`Invalid period number or context: ${periodNumber}, Ln: ${isLanthanide}, Ac: ${isActinide}`);
            return []; // Return empty for invalid parameters
        }

        if (this._questionCache[cacheKey]) {
            return this._questionCache[cacheKey]; // Return from cache if available
        }

        const questions = await loadQuestions(filePath);
        this._questionCache[cacheKey] = questions; // Cache the loaded questions
        return questions;
    },

    /**
     * Clears the question cache. Useful if questions are updated live or for a new game session
     * to ensure fresh loads if necessary, though dynamic imports often handle this.
     */
    clearCache: function() {
        this._questionCache = {};
    }
};

export default questionData; 