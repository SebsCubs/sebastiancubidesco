// content.js

import { currentLang, getLocalizedUrl } from './translation.js';

export async function loadMarkdown(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let markdown = await response.text();

        // Process image paths
        markdown = markdown.replace(/!\[([^\]]*)\]\((\/static\/images\/[^\)]+)\)/g, (match, alt, src) => {
            const newSrc = src.replace(/^\/static/, '');
            return `![${alt}](${newSrc})`;
        });

        const html = marked.parse(markdown);
        
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `<div class="centered-content" data-current-url="${url}">${html}</div>`;

        // Process LaTeX after content is loaded
        MathJax.typesetPromise().then(() => {
            console.log('MathJax processing complete');
        }).catch((err) => console.log('MathJax processing failed: ' + err.message));

    } catch (error) {
        console.error('Error loading markdown:', error);
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
