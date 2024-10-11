// Theme Switcher
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeLabel = document.getElementById('theme-label');

// Check for saved theme in localStorage
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
    themeLabel.textContent = 'Light Mode';
} else {
    themeLabel.textContent = 'Dark Mode';
}

themeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    if (themeToggle.checked) {
        localStorage.setItem('theme', 'dark');
        themeLabel.textContent = 'Light Mode';
    } else {
        localStorage.setItem('theme', 'light');
        themeLabel.textContent = 'Dark Mode';
    }
});



// Language Switcher
const languageToggle = document.getElementById('language-toggle');
const languageLabel = document.getElementById('language-label');
const elementsToTranslate = document.querySelectorAll('[data-key]');

// Translation data
const translations = {
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
        'contact': 'Contact',
        'home': 'Home',
        'projects': 'Projects',
        'blog': 'Blog'
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
        'contact': 'Contacto',
        'home': 'Inicio',
        'projects': 'Proyectos',
        'blog': 'Blog'
    }
};

// Set default language
let currentLang = 'en';

// Check for saved language in localStorage
if (localStorage.getItem('lang')) {
    currentLang = localStorage.getItem('lang');
    translatePage(currentLang);
    if (currentLang === 'es') {
        languageToggle.checked = true;
        languageLabel.textContent = translations[currentLang]['light-mode'];
    } else {
        languageLabel.textContent = translations[currentLang]['dark-mode'];
    }
} else {
    languageLabel.textContent = translations[currentLang]['light-mode'];
}

// Update language when toggle changes
languageToggle.addEventListener('change', () => {
    let selectedLang = 'en';
    if (languageToggle.checked) {
        selectedLang = 'es';
        languageLabel.textContent = translations[selectedLang]['dark-mode'];
    } else {
        selectedLang = 'en';
        languageLabel.textContent = translations[selectedLang]['light-mode'];
    }
    translatePage(selectedLang);
    localStorage.setItem('lang', selectedLang);
});

// Function to translate page content
function translatePage(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[lang][key];
    });

    // Translate header elements
    document.getElementById('theme-label').textContent = translations[lang]['theme-label'];
    document.getElementById('language-label').textContent = translations[lang]['language-label'];
    
    document.querySelectorAll('nav a').forEach(link => {
        const key = link.getAttribute('href').substring(1); // Remove the '#' from the href
        if (translations[lang][key]) {
            link.textContent = translations[lang][key];
        }
    });
}

function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-content').innerHTML = data;
            // Re-render MathJax equations if needed
            if (typeof MathJax !== 'undefined') {
                MathJax.typesetPromise();
            }
        })
        .catch(error => console.error('Error loading content:', error));
}

function loadMarkdown(url) {
    // Ensure the URL starts with a forward slash
    const absoluteUrl = url.startsWith('/') ? url : `/${url}`;
    
    fetch(absoluteUrl)
        .then(response => response.text())
        .then(text => {
            // Parse the markdown
            const content = marked.parse(text);
            
            // Insert the content into the DOM with the centered-content class
            document.getElementById('main-content').innerHTML = `<div class="centered-content">${content}</div>`;
            
            // Trigger MathJax to process the newly added content
            if (window.MathJax) {
                MathJax.typesetPromise([document.getElementById('main-content')]).then(() => {
                    console.log('MathJax processing complete');
                });
            }
        })
        .catch(error => console.error('Error loading markdown:', error));
}


function loadHeader() {
    const headerHTML = `
        <header>
            <!-- Your header content -->
        </header>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    loadCommonScripts();
}

function loadFooter() {
    const footerHTML = `
        <footer>
            <!-- Your footer content -->
        </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

window.onload = function() {
    loadHeader();
    loadFooter();
};
