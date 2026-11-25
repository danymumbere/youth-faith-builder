import { verses, stories, quiz } from "./data.js";

export const getDailyVerse = () => verses[Math.floor(Math.random() * verses.length)];

// Retourne une histoire complète par index
export const getStory = (index) => stories[index % stories.length];

// Vérifie la réponse du quiz
export const checkAnswer = (userAnswer, questionIndex) => {
    const correct = quiz[questionIndex % quiz.length].answer.toLowerCase();
    return userAnswer.trim().toLowerCase() === correct;
};

// Gestion du score
export const updateScore = (points) => {
    try {
        const currentScore = parseInt(localStorage.getItem("score") || "0");
        const newScore = currentScore + points;
        localStorage.setItem("score", newScore.toString());
        return newScore;
    } catch (e) {
        return 0;
    }
};

export const getScore = () => parseInt(localStorage.getItem("score") || "0");
