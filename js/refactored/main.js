/**
 * Main Application Entry Point
 * Refactored architecture with centralized state management
 */
import { StateManager } from './state.js';
import { I18nManager } from './i18n.js';
import { ContentManager } from './contentManager.js';
import { 
    Header, 
    ThemeToggle, 
    LanguageToggle, 
    ContentList, 
    LoadingSpinner, 
    ErrorDisplay 
} from './components.js';

class App {
    constructor() {
        // Initialize core systems
        this.stateManager = new StateManager();
        this.i18nManager = new I18nManager(this.stateManager);
        this.contentManager = new ContentManager(this.stateManager, this.i18nManager);
        
        // Initialize components
        this.components = {
            header: new Header(this.stateManager, this.i18nManager),
            themeToggle: new ThemeToggle(this.stateManager, this.i18nManager),
            languageToggle: new LanguageToggle(this.stateManager, this.i18nManager),
            loadingSpinner: new LoadingSpinner(this.stateManager, this.i18nManager),
            errorDisplay: new ErrorDisplay(this.stateManager, this.i18nManager)
        };
        
        // Initialize router
        this.routes = new Map();
        this.setupRoutes();
        
        // Bind methods
        this.handleNavigation = this.handleNavigation.bind(this);
        this.handlePopState = this.handlePopState.bind(this);
    }
    
    /**
     * Initialize the application
     */
    async init() {
        try {
            // Load initial language
            await this.i18nManager.loadLanguage(this.stateManager.getState('language'));
            
            // Mount core components
            this.mountComponents();
            
            // Setup navigation
            this.setupNavigation();
            
            // Load initial content
            await this.loadInitialContent();
            
            // Setup performance monitoring
            this.setupPerformanceMonitoring();
            
            console.log('App initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.stateManager.setState({ error: error.message });
        }
    }
    
    /**
     * Mount components to DOM
     */
    mountComponents() {
        // Mount header
        this.components.header.mount(document.body);
        
        // Mount toggles to header
        const themeContainer = document.querySelector('.theme-toggle-container');
        const langContainer = document.querySelector('.language-toggle-container');
        
        if (themeContainer) {
            this.components.themeToggle.mount(themeContainer);
        }
        
        if (langContainer) {
            this.components.languageToggle.mount(langContainer);
        }
        
        // Mount utility components
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            this.components.loadingSpinner.mount(mainContent);
            this.components.errorDisplay.mount(mainContent);
        }
    }
    
    /**
     * Setup routing
     */
    setupRoutes() {
        this.routes.set('index.html', {
            handler: () => this.loadPageContent('index'),
            title: 'Home'
        });
        
        this.routes.set('', {
            handler: () => this.loadPageContent('index'),
            title: 'Home'
        });
        
        this.routes.set('projects.html', {
            handler: () => this.loadProjectsPage(),
            title: 'Projects'
        });
        
        this.routes.set('blogs.html', {
            handler: () => this.loadBlogsPage(),
            title: 'Blog'
        });
    }
    
    /**
     * Setup navigation event listeners
     */
    setupNavigation() {
        // Listen for custom navigation events
        document.addEventListener('navigate', this.handleNavigation);
        
        // Listen for browser back/forward
        window.addEventListener('popstate', this.handlePopState);
    }
    
    /**
     * Handle navigation events
     * @param {CustomEvent} event - Navigation event
     */
    async handleNavigation(event) {
        const href = event.detail.href;
        
        // Update URL without triggering popstate
        history.pushState({ href }, '', href);
        
        // Load content
        await this.loadContent(href);
    }
    
    /**
     * Handle browser back/forward
     * @param {PopStateEvent} event - Pop state event
     */
    async handlePopState(event) {
        const href = event.state?.href || window.location.pathname.split('/').pop();
        await this.loadContent(href);
    }
    
    /**
     * Load content based on route
     * @param {string} href - Route href
     */
    async loadContent(href) {
        const route = this.routes.get(href);
        
        if (!route) {
            console.warn(`Unknown route: ${href}`);
            return;
        }
        
        // Update route state
        this.stateManager.setState({ 
            route: { path: href, params: {} } 
        });
        
        // Execute route handler
        try {
            await route.handler();
            
            // Update page title
            document.title = `${this.i18nManager.t(route.title)} - Sebastian Cubides`;
            
        } catch (error) {
            console.error(`Error loading route ${href}:`, error);
            this.stateManager.setState({ error: error.message });
        }
    }
    
    /**
     * Load page content (markdown files)
     * @param {string} pageId - Page ID
     */
    async loadPageContent(pageId) {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;
        
        try {
            const content = await this.contentManager.loadContent('page', pageId);
            
            // Clear main content
            mainContent.innerHTML = '<div class="centered-content"></div>';
            const container = mainContent.querySelector('.centered-content');
            
            // Render markdown
            await this.contentManager.renderMarkdown(content.markdown, container);
            
        } catch (error) {
            console.error('Error loading page content:', error);
            this.stateManager.setState({ error: error.message });
        }
    }
    
    /**
     * Load projects page
     */
    async loadProjectsPage() {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;
        
        // Clear main content
        mainContent.innerHTML = '<div class="centered-content"></div>';
        const container = mainContent.querySelector('.centered-content');
        
        // Create and mount projects list component
        const projectsList = new ContentList(
            this.stateManager, 
            this.i18nManager, 
            this.contentManager, 
            'project'
        );
        
        projectsList.mount(container);
        
        // Store reference for cleanup
        this.currentPageComponent = projectsList;
    }
    
    /**
     * Load blogs page
     */
    async loadBlogsPage() {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;
        
        // Clear main content
        mainContent.innerHTML = '<div class="centered-content"></div>';
        const container = mainContent.querySelector('.centered-content');
        
        // Create and mount blogs list component
        const blogsList = new ContentList(
            this.stateManager, 
            this.i18nManager, 
            this.contentManager, 
            'blog'
        );
        
        blogsList.mount(container);
        
        // Store reference for cleanup
        this.currentPageComponent = blogsList;
    }
    
    /**
     * Load initial content based on current URL
     */
    async loadInitialContent() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        await this.loadContent(currentPath);
    }
    
    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        // Monitor cache hit rates
        let cacheHits = 0;
        let cacheMisses = 0;
        
        const originalGetCache = this.stateManager.getCache.bind(this.stateManager);
        this.stateManager.getCache = (key) => {
            const result = originalGetCache(key);
            if (result !== null) {
                cacheHits++;
            } else {
                cacheMisses++;
            }
            return result;
        };
        
        // Log performance metrics periodically
        setInterval(() => {
            const total = cacheHits + cacheMisses;
            if (total > 0) {
                const hitRate = (cacheHits / total * 100).toFixed(1);
                console.log(`Cache hit rate: ${hitRate}% (${cacheHits}/${total})`);
            }
        }, 30000); // Every 30 seconds
    }
    
    /**
     * Cleanup resources
     */
    destroy() {
        // Unmount all components
        Object.values(this.components).forEach(component => {
            component.unmount();
        });
        
        if (this.currentPageComponent) {
            this.currentPageComponent.unmount();
        }
        
        // Remove event listeners
        document.removeEventListener('navigate', this.handleNavigation);
        window.removeEventListener('popstate', this.handlePopState);
        
        // Clear cache
        this.stateManager.clearCache();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
    
    // Make app globally available for debugging
    window.app = app;
});

// Handle app cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.app) {
        window.app.destroy();
    }
});