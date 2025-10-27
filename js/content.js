// content.js

export async function loadMarkdown(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let markdown = await response.text();

        markdown = markdown.replace(/!\[([^\]]*)\]\((\/static\/images\/[^\)]+)\)/g, (match, alt, src) => {
            const newSrc = src.replace(/^\/static\//, '');
            return `![${alt}](${newSrc})`;
        });

        const html = marked.parse(markdown);

        const mainContent = document.getElementById('main-content');
        if (!mainContent) {
            return;
        }
        mainContent.innerHTML = `<div class="centered-content" data-current-url="${url}">${html}</div>`;

        if (typeof MathJax !== 'undefined') {
            MathJax.typesetPromise().catch((err) => console.log('MathJax processing failed: ' + err.message));
        }
    } catch (error) {
        console.error('Error loading markdown:', error);
    }
}
