export const showSection = (sectionId) => {
    const sections = ["section-accueil", "section-aventure", "section-defi", "section-profil"];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.hidden = (id !== sectionId);
    });
};

export const updateVerse = (verse) => {
    const container = document.getElementById("verse-container");
    if (container) container.innerHTML = `<strong>${verse.text}</strong><br><small>${verse.ref}</small>`;
};

export const updateScoreDisplay = (score) => {
    const display = document.getElementById("display-score");
    if (display) display.textContent = `Score actuel : ${score} points`;
};

export const renderStory = (story, pageIndex) => {
    const content = document.getElementById("story-content");
    if (content) {
        content.innerHTML = `<h3>${story.title} (${story.ref})</h3><p>${story.pages[pageIndex]}</p><small>Page ${pageIndex + 1} / ${story.pages.length}</small>`;
    }
};
