// header.js

export function loadHeader() {
    const header = document.createElement('header');
    header.innerHTML = `
        <div class="centered-content">
            <div class="header-content">
                <nav>
                    <ul>
                        <li><a href="index.html" data-translate="home">Home</a></li>
                        <li><a href="projects.html" data-translate="projects">Projects</a></li>
                        <li><a href="blogs.html" data-translate="blog">Blog</a></li>
                    </ul>
                </nav>
                <div id="switchers">
                    <div class="toggle-container">
                        <label class="switch">
                            <input type="checkbox" id="theme-toggle">
                            <span class="slider round"></span>
                        </label>
                        <span id="theme-label">Dark Mode</span>
                    </div>
                    <div class="toggle-container">
                        <label class="switch">
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
