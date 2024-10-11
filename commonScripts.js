function loadCommonScripts() {
    return new Promise((resolve, reject) => {
        // Load marked.js
        const markedScript = document.createElement('script');
        markedScript.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
        markedScript.onload = () => {
            console.log('Marked library loaded successfully');
            
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
            mathJaxScript.onload = () => {
                console.log('MathJax loaded successfully');
                resolve();
            };
            mathJaxScript.onerror = () => reject(new Error('Failed to load MathJax'));
            document.head.appendChild(mathJaxScript);
        };
        markedScript.onerror = () => reject(new Error('Failed to load Marked library'));
        document.head.appendChild(markedScript);
    });
}