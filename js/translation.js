// translation.js

export const translations = {
    en: {
        'nav.home': 'Home',
        'nav.projects': 'Projects',
        'nav.blog': 'Blog',
        'headings.projects': 'Projects',
        'headings.blog': 'Blog',
        'headings.notFound': 'Content not found',
        'messages.notFound': 'The content you are looking for could not be found.',
        'toggle.dark': 'Dark Mode',
        'toggle.light': 'Light Mode',
        'toggle.language.label': 'Español',
        'toggle.language.checkedLabel': 'English',
        'page-title.base': 'Sebastian Cubides',
        'page-title.home': 'Sebastian Cubides',
        'page-title.projects': 'Projects | Sebastian Cubides',
        'page-title.blog': 'Blog | Sebastian Cubides',
        'page-title.notFound': 'Not Found | Sebastian Cubides'
    },
    es: {
        'nav.home': 'Inicio',
        'nav.projects': 'Proyectos',
        'nav.blog': 'Blog',
        'headings.projects': 'Proyectos',
        'headings.blog': 'Blog',
        'headings.notFound': 'Contenido no encontrado',
        'messages.notFound': 'No pudimos encontrar el contenido que solicitaste.',
        'toggle.dark': 'Modo oscuro',
        'toggle.light': 'Modo claro',
        'toggle.language.label': 'Español',
        'toggle.language.checkedLabel': 'Inglés',
        'page-title.base': 'Sebastian Cubides',
        'page-title.home': 'Sebastian Cubides',
        'page-title.projects': 'Proyectos | Sebastian Cubides',
        'page-title.blog': 'Blog | Sebastian Cubides',
        'page-title.notFound': 'No encontrado | Sebastian Cubides'
    }
};

export let currentLang = localStorage.getItem('language') || 'en';

export function t(key) {
    return translations[currentLang][key] || translations.en[key] || key;
}

export function initializeLanguageToggle(onLanguageChange) {
    const toggle = document.getElementById('language-toggle');
    const label = document.getElementById('language-label');

    if (!toggle || !label) {
        return;
    }

    toggle.checked = currentLang === 'es';
    updateLanguageLabel(toggle, label);
    document.documentElement.setAttribute('lang', currentLang);

    toggle.addEventListener('change', () => {
        currentLang = toggle.checked ? 'es' : 'en';
        localStorage.setItem('language', currentLang);
        document.documentElement.setAttribute('lang', currentLang);
        updateLanguageLabel(toggle, label);
        if (typeof onLanguageChange === 'function') {
            onLanguageChange(currentLang);
        }
    });
}

export function translatePage() {
    document.documentElement.setAttribute('lang', currentLang);
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key) {
            element.textContent = t(key);
        }
    });
    const toggle = document.getElementById('language-toggle');
    const label = document.getElementById('language-label');
    if (toggle && label) {
        updateLanguageLabel(toggle, label);
    }
}

export function getThemeLabel(isDark) {
    return isDark ? t('toggle.light') : t('toggle.dark');
}

export function getLocalizedUrl(url, lang) {
    url = url.replace(/^\//, '');
    if (lang === 'es') {
        return url.replace('.md', '_es.md');
    }
    return url.replace('_es.md', '.md');
}

function updateLanguageLabel(toggle, label) {
    const key = toggle.checked ? 'toggle.language.checkedLabel' : 'toggle.language.label';
    label.textContent = t(key);
}
