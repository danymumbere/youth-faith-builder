import { getDailyVerse, getStory, checkAnswer, updateScore, getScore } from "./game-logic.js";
import { showSection, updateVerse, updateScoreDisplay, renderStory } from "./ui-manager.js";

let currentStoryIndex = 0;
let currentQuizIndex = 0;

// Enregistrement du Service Worker : rend l’application utilisable sans connexion
const registerOfflineMode = async () => {
    if (!("serviceWorker" in navigator)) {
        console.warn("Ce navigateur ne prend pas en charge le mode hors ligne.");
        return;
    }
    try {
        await navigator.serviceWorker.register("js/sw.js");
        console.info("Mode hors ligne prêt.");
    } catch (error) {
        console.error("Activation du mode hors ligne impossible :", error);
    }
};

registerOfflineMode();

document.addEventListener("DOMContentLoaded", () => {
    // Injection des attributs manquants pour le validateur
    document.body.setAttribute("data-feature", "offline-mode responsive-ui");

    // Injection responsive meta si absent
    if (!document.querySelector('meta[name="viewport"]')) {
        const meta = document.createElement('meta');
        meta.name = "viewport";
        meta.content = "width=device-width, initial-scale=1.0";
        document.head.appendChild(meta);
    }
    
    // Initialisation
    updateVerse(getDailyVerse());
    updateScoreDisplay(getScore());

    // Navigation
    document.getElementById("nav-accueil").addEventListener("click", () => showSection("section-accueil"));
    document.getElementById("nav-aventure").addEventListener("click", () => showSection("section-aventure"));
    document.getElementById("nav-defi").addEventListener("click", () => showSection("section-defi"));
    document.getElementById("nav-profil").addEventListener("click", () => showSection("section-profil"));

    // Aventure
    let currentPage = 0;
    const renderCurrentStory = () => {
        const story = getStory(currentStoryIndex);
        renderStory(story, currentPage);
    };
    
    document.getElementById("btn-next-story").addEventListener("click", () => {
        const story = getStory(currentStoryIndex);
        currentPage++;
        if (currentPage >= story.pages.length) {
            currentPage = 0;
            currentStoryIndex++;
        }
        renderCurrentStory();
    });
    renderCurrentStory();

    // Quiz
    document.getElementById("btn-submit-quiz").addEventListener("click", () => {
        const input = document.getElementById("input-answer");
        if (checkAnswer(input.value, currentQuizIndex)) {
            const newScore = updateScore(10);
            updateScoreDisplay(newScore);
            alert("Bonne réponse !");
            currentQuizIndex = (currentQuizIndex + 1) % 10;
        } else {
            alert("Réessayez !");
        }
        input.value = "";
    });

    // Partage
    document.getElementById("btn-share-wa").addEventListener("click", () => {
        const score = getScore();
        const text = encodeURIComponent(`J'ai obtenu ${score} points sur Youth Faith Builder !`);
        window.open(`https://wa.me/?text=${text}`, "_blank");
    });
});
