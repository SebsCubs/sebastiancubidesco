function loadCommonScripts() {
    // Load marked.js
    const markedScript = document.createElement('script');
    markedScript.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
    document.head.appendChild(markedScript);

    // Configure MathJax
    const mathJaxConfig = document.createElement('script');
    mathJaxConfig.textContent = `
        MathJax = {
            tex: {
                inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
            }
        };
    `;
    document.head.appendChild(mathJaxConfig);

    // Load MathJax
    const mathJaxScript = document.createElement('script');
    mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    document.head.appendChild(mathJaxScript);
}