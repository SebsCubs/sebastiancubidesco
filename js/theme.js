// theme.js

import { getThemeLabel } from './translation.js';

export function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    if (!themeToggle) {
        return;
    }

    const isDarkMode = localStorage.getItem('theme') === 'dark';
    body.classList.toggle('dark-mode', isDarkMode);
    themeToggle.checked = isDarkMode;
    updateThemeLabel(isDarkMode);

    themeToggle.addEventListener('change', () => {
        const isDark = themeToggle.checked;
        body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeLabel(isDark);
    });
}

export function refreshThemeLabel() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        updateThemeLabel(themeToggle.checked);
    }
}

function updateThemeLabel(isDark) {
    const themeLabel = document.getElementById('theme-label');
    if (themeLabel) {
        themeLabel.textContent = getThemeLabel(isDark);
    }
}
