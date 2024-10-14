// translation.js

import { loadMarkdown } from './content.js';

export const translations = {
    en: {
        'projects': 'Projects',
        'blog': 'Blog',
        'projects-title': 'Projects',
        'blog-title': 'Blog',
        'home': 'Home',
        'dark-mode': 'Dark Mode',
        'light-mode': 'Light Mode',
        'theme-label': 'Dark Mode',
        'language-label': 'Español',
        'about': 'About',
        'contact': 'Contact'
    },
    es: {
        'projects': 'Proyectos',
        'blog': 'Blog',
        'projects-title': 'Proyectos',
        'blog-title': 'Blog',
        'home': 'Inicio',
        'dark-mode': 'Modo Oscuro',
        'light-mode': 'Modo Claro',
        'theme-label': 'Modo Claro',
        'language-label': 'English',
        'about': 'Acerca',
        'contact': 'Contacto'
    }
};

export let currentLang = localStorage.getItem('language') || 'en';

export function initializeLanguageToggle(onLanguageChange) {
    const toggle = document.getElementById('language-toggle');
    const label = document.getElementById('language-label');

    // Check for saved language preference in localStorage
    if (localStorage.getItem('language') === 'es') {
        currentLang = 'es';
        toggle.checked = true;
        label.textContent = 'English';
    } else {
        currentLang = 'en';
        toggle.checked = false;
        label.textContent = 'Español';
    }

    toggle.addEventListener('change', () => {
        currentLang = toggle.checked ? 'es' : 'en';
        label.textContent = toggle.checked ? 'English' : 'Español';
        localStorage.setItem('language', currentLang);
        if (typeof onLanguageChange === 'function') {
            onLanguageChange();
        }
    });

    // Initial translation
    if (typeof onLanguageChange === 'function') {
        onLanguageChange();
    }
}


export function translatePage(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Translate header elements
    document.getElementById('theme-label').textContent = translations[lang]['theme-label'];
    document.getElementById('language-label').textContent = translations[lang]['language-label'];
    
    // Translate navigation links
    document.querySelectorAll('nav a').forEach(link => {
        const key = link.getAttribute('href').replace('.html', '');
        if (translations[lang][key]) {
            link.textContent = translations[lang][key];
        }
    });

    // Translate page-specific content
    const pageSpecificContent = document.querySelector('main h1[data-key]');
    if (pageSpecificContent) {
        const key = pageSpecificContent.getAttribute('data-key');
        if (translations[lang][key]) {
            pageSpecificContent.textContent = translations[lang][key];
        }
    }

    // Update theme toggle label
    const body = document.body;
    const isDark = body.classList.contains('dark-mode');
    const themeLabel = document.getElementById('theme-label');
    themeLabel.textContent = isDark 
        ? translations[lang]['light-mode'] 
        : translations[lang]['dark-mode'];
}

export function getLocalizedUrl(url, lang) {
    // Remove leading slash if present
    url = url.replace(/^\//, '');
    if (lang === 'es') {
        return url.replace('.md', '_es.md');
    } else {
        return url.replace('_es.md', '.md');
    }
}

function reloadCurrentContent() {
    const mainContent = document.getElementById('main-content');
    const currentContent = mainContent.querySelector('.centered-content');
    
    if (currentContent) {
        const currentUrl = currentContent.getAttribute('data-current-url');
        if (currentUrl) {
            loadMarkdown(getLocalizedUrl(currentUrl, currentLang));
        }
    }
}