// main.js

import { loadHeader } from './header.js';
import { loadProjects } from './projects.js';
import { loadBlogPosts } from './blog.js';
import { initializeThemeToggle } from './theme.js';
import { initializeLanguageToggle, currentLang, getLocalizedUrl, translations } from './translation.js';
import { loadMarkdown } from './content.js';

let currentContentUrl = '';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    
    // Initialize toggles
    initializeThemeToggle();
    initializeLanguageToggle(() => loadContent(window.location.pathname.split('/').pop()));
    
    // Load content based on the current page
    loadContent(window.location.pathname.split('/').pop());
    
    // Add event listeners for navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            history.pushState(null, '', href);
            loadContent(href);
        });
    });
});


function loadContent(href) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Clear existing content
    mainContent.className = 'centered-content'; // Add the centered-content class

    switch (href) {
        case 'index.html':
        case '':
            createSection('projects', translations[currentLang]['projects-title']);
            createSection('blog', translations[currentLang]['blog-title']);
            loadProjects();
            loadBlogPosts();
            break;
        case 'projects.html':
            createSection('projects', translations[currentLang]['projects-title']);
            loadProjects();
            break;
        case 'blogs.html':
            createSection('blog', translations[currentLang]['blog-title']);
            loadBlogPosts();
            break;
        default:
            // Load markdown content for other pages
            loadMarkdown(getLocalizedUrl(href, currentLang));
    }
}


function createSection(id, title) {
    const mainContent = document.getElementById('main-content');
    const section = document.createElement('section');
    section.id = id;
    const h1 = document.createElement('h1');
    h1.setAttribute('data-key', `${id}-title`);
    h1.textContent = title;
    const ul = document.createElement('ul');
    ul.id = `${id}-list`;
    section.appendChild(h1);
    section.appendChild(ul);
    mainContent.appendChild(section);
}

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
    loadContent(window.location.pathname.split('/').pop());
});