// header.js

export function loadHeader() {
    const header = document.createElement('header');
    header.innerHTML = `
        <div class="centered-content">
            <div class="header-content">
                <nav>
                    <ul>
                        <li><a href="index.html" data-route="index.html" data-i18n="nav.home">Home</a></li>
                        <li><a href="projects.html" data-route="projects.html" data-i18n="nav.projects">Projects</a></li>
                        <li><a href="blogs.html" data-route="blogs.html" data-i18n="nav.blog">Blog</a></li>
                    </ul>
                </nav>
                <div id="switchers">
                    <div class="toggle-container">
                        <label class="switch" aria-label="Toggle dark mode">
                            <input type="checkbox" id="theme-toggle">
                            <span class="slider round"></span>
                        </label>
                        <span id="theme-label">Dark Mode</span>
                    </div>
                    <div class="toggle-container">
                        <label class="switch" aria-label="Toggle language">
                            <input type="checkbox" id="language-toggle">
                            <span class="slider round"></span>
                        </label>
                        <span id="language-label">Español</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.prepend(header);
}
