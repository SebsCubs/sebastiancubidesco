// theme.js

import { translations, currentLang } from './translation.js';

export function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeLabel = document.getElementById('theme-label');

    function updateThemeLabel(isDark) {
        themeLabel.textContent = isDark 
            ? translations[currentLang]['light-mode'] 
            : translations[currentLang]['dark-mode'];
    }

    // Check for saved theme in localStorage
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    body.classList.toggle('dark-mode', isDarkMode);
    themeToggle.checked = isDarkMode;
    updateThemeLabel(isDarkMode);

    themeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeLabel(isDark);
    });
}
