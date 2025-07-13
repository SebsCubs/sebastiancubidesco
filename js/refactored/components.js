/**
 * Base Component class for reactive UI components
 */
export class Component {
    constructor(stateManager, i18nManager) {
        this.stateManager = stateManager;
        this.i18nManager = i18nManager;
        this.element = null;
        this.subscriptions = [];
        this.mounted = false;
    }
    
    /**
     * Mount component to DOM
     * @param {HTMLElement} container - Container element
     */
    mount(container) {
        if (this.mounted) {
            this.unmount();
        }
        
        this.element = this.render();
        container.appendChild(this.element);
        this.mounted = true;
        
        // Subscribe to state changes
        this.setupSubscriptions();
        
        // Translate initial content
        this.i18nManager.translateContainer(this.element);
    }
    
    /**
     * Unmount component from DOM
     */
    unmount() {
        if (!this.mounted) return;
        
        // Clean up subscriptions
        this.subscriptions.forEach(unsubscribe => unsubscribe());
        this.subscriptions = [];
        
        // Remove from DOM
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        
        this.mounted = false;
    }
    
    /**
     * Render component - must be implemented by subclasses
     * @returns {HTMLElement} Component element
     */
    render() {
        throw new Error('render() must be implemented by subclass');
    }
    
    /**
     * Update component on state change
     * @param {Object} newState - New state
     * @param {Object} prevState - Previous state
     * @param {string[]} changedKeys - Changed state keys
     */
    update(newState, prevState, changedKeys) {
        // Default implementation - re-translate
        this.i18nManager.translateContainer(this.element);
    }
    
    /**
     * Setup state subscriptions - can be overridden by subclasses
     */
    setupSubscriptions() {
        // Default: subscribe to language changes
        const unsubscribe = this.stateManager.subscribe('language', 
            (newState, prevState, changedKeys) => {
                this.update(newState, prevState, changedKeys);
            }
        );
        this.subscriptions.push(unsubscribe);
    }
}

/**
 * Header Component
 */
export class Header extends Component {
    render() {
        const header = document.createElement('header');
        header.innerHTML = `
            <div class="centered-content">
                <div class="header-content">
                    <nav>
                        <ul>
                            <li><a href="index.html" data-i18n="home">Home</a></li>
                            <li><a href="projects.html" data-i18n="projects">Projects</a></li>
                            <li><a href="blogs.html" data-i18n="blog">Blog</a></li>
                        </ul>
                    </nav>
                    <div id="switchers">
                        <div class="theme-toggle-container"></div>
                        <div class="language-toggle-container"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners for navigation
        const navLinks = header.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                // Dispatch custom navigation event
                document.dispatchEvent(new CustomEvent('navigate', {
                    detail: { href }
                }));
            });
        });
        
        return header;
    }
    
    setupSubscriptions() {
        super.setupSubscriptions();
        
        // Subscribe to theme changes to update navigation styles
        const themeUnsubscribe = this.stateManager.subscribe('theme', 
            (newState) => {
                this.element.classList.toggle('dark', newState.theme === 'dark');
            }
        );
        this.subscriptions.push(themeUnsubscribe);
    }
}

/**
 * Theme Toggle Component
 */
export class ThemeToggle extends Component {
    render() {
        const container = document.createElement('div');
        container.className = 'toggle-container';
        
        container.innerHTML = `
            <label class="switch">
                <input type="checkbox" id="theme-toggle">
                <span class="slider round"></span>
            </label>
            <span id="theme-label" data-i18n="dark-mode">Dark Mode</span>
        `;
        
        const toggle = container.querySelector('#theme-toggle');
        const currentTheme = this.stateManager.getState('theme');
        
        // Set initial state
        toggle.checked = currentTheme === 'dark';
        document.body.classList.toggle('dark-mode', currentTheme === 'dark');
        
        // Add event listener
        toggle.addEventListener('change', () => {
            const newTheme = toggle.checked ? 'dark' : 'light';
            this.stateManager.setState({ theme: newTheme });
            document.body.classList.toggle('dark-mode', newTheme === 'dark');
        });
        
        return container;
    }
    
    setupSubscriptions() {
        super.setupSubscriptions();
        
        // Subscribe to theme changes
        const themeUnsubscribe = this.stateManager.subscribe('theme', 
            (newState) => {
                const toggle = this.element.querySelector('#theme-toggle');
                const label = this.element.querySelector('#theme-label');
                
                if (toggle) {
                    toggle.checked = newState.theme === 'dark';
                }
                
                if (label) {
                    const labelKey = newState.theme === 'dark' ? 'light-mode' : 'dark-mode';
                    label.setAttribute('data-i18n', labelKey);
                    label.textContent = this.i18nManager.t(labelKey);
                }
            }
        );
        this.subscriptions.push(themeUnsubscribe);
    }
}

/**
 * Language Toggle Component
 */
export class LanguageToggle extends Component {
    render() {
        const container = document.createElement('div');
        container.className = 'toggle-container';
        
        container.innerHTML = `
            <label class="switch">
                <input type="checkbox" id="language-toggle">
                <span class="slider round"></span>
            </label>
            <span id="language-label">English</span>
        `;
        
        const toggle = container.querySelector('#language-toggle');
        const currentLang = this.stateManager.getState('language');
        
        // Set initial state
        toggle.checked = currentLang === 'es';
        
        // Add event listener
        toggle.addEventListener('change', () => {
            const newLang = toggle.checked ? 'es' : 'en';
            this.stateManager.setState({ language: newLang });
        });
        
        return container;
    }
    
    setupSubscriptions() {
        super.setupSubscriptions();
        
        // Subscribe to language changes
        const langUnsubscribe = this.stateManager.subscribe('language', 
            (newState) => {
                const toggle = this.element.querySelector('#language-toggle');
                const label = this.element.querySelector('#language-label');
                
                if (toggle) {
                    toggle.checked = newState.language === 'es';
                }
                
                if (label) {
                    label.textContent = newState.language === 'es' ? 'English' : 'Español';
                }
            }
        );
        this.subscriptions.push(langUnsubscribe);
    }
}

/**
 * Content List Component
 */
export class ContentList extends Component {
    constructor(stateManager, i18nManager, contentManager, contentType) {
        super(stateManager, i18nManager);
        this.contentManager = contentManager;
        this.contentType = contentType;
    }
    
    render() {
        const section = document.createElement('section');
        section.id = this.contentType;
        section.className = 'content-section';
        
        const title = document.createElement('h1');
        title.setAttribute('data-i18n', this.contentType);
        title.textContent = this.i18nManager.t(this.contentType);
        
        const listContainer = document.createElement('div');
        listContainer.id = `${this.contentType}-list`;
        listContainer.className = 'content-list-container';
        
        section.appendChild(title);
        section.appendChild(listContainer);
        
        // Initial render
        this.renderList();
        
        return section;
    }
    
    renderList() {
        const container = this.element?.querySelector('.content-list-container');
        if (!container) return;
        
        this.contentManager.renderContentList(this.contentType, container);
        
        // Translate after rendering
        this.i18nManager.translateContainer(container);
    }
    
    setupSubscriptions() {
        super.setupSubscriptions();
        
        // Re-render list on language change
        const langUnsubscribe = this.stateManager.subscribe('language', 
            () => {
                this.renderList();
            }
        );
        this.subscriptions.push(langUnsubscribe);
    }
}

/**
 * Loading Component
 */
export class LoadingSpinner extends Component {
    render() {
        const container = document.createElement('div');
        container.className = 'loading-spinner';
        
        container.innerHTML = `
            <div class="spinner"></div>
            <p data-i18n="loading">Loading...</p>
        `;
        
        return container;
    }
    
    setupSubscriptions() {
        super.setupSubscriptions();
        
        // Subscribe to loading state
        const loadingUnsubscribe = this.stateManager.subscribe('loading', 
            (newState) => {
                this.element.style.display = newState.loading ? 'block' : 'none';
            }
        );
        this.subscriptions.push(loadingUnsubscribe);
    }
}

/**
 * Error Component
 */
export class ErrorDisplay extends Component {
    render() {
        const container = document.createElement('div');
        container.className = 'error-display';
        container.style.display = 'none';
        
        container.innerHTML = `
            <div class="error-content">
                <h2 data-i18n="error">Error</h2>
                <p class="error-message"></p>
                <button class="retry-button" data-i18n="retry">Retry</button>
            </div>
        `;
        
        // Add retry functionality
        const retryButton = container.querySelector('.retry-button');
        retryButton.addEventListener('click', () => {
            location.reload();
        });
        
        return container;
    }
    
    setupSubscriptions() {
        super.setupSubscriptions();
        
        // Subscribe to error state
        const errorUnsubscribe = this.stateManager.subscribe('error', 
            (newState) => {
                const isVisible = !!newState.error;
                this.element.style.display = isVisible ? 'block' : 'none';
                
                if (newState.error) {
                    const messageElement = this.element.querySelector('.error-message');
                    if (messageElement) {
                        messageElement.textContent = newState.error;
                    }
                }
            }
        );
        this.subscriptions.push(errorUnsubscribe);
    }
}