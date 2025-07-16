/**
 * Internationalization Manager
 * Handles translations with lazy loading, fallbacks, and smart caching
 */
export class I18nManager {
    constructor(stateManager) {
        this.stateManager = stateManager;
        this.translations = new Map();
        this.loadedLanguages = new Set();
        this.defaultLanguage = 'en';
        this.loadingPromises = new Map();
        
        // Base translations for immediate use
        this.baseTranslations = {
            en: {
                'loading': 'Loading...',
                'error': 'Error',
                'projects': 'Projects',
                'blog': 'Blog',
                'home': 'Home',
                'dark-mode': 'Dark Mode',
                'light-mode': 'Light Mode',
                'language-toggle': 'Language',
                'espanol': 'Español'
            },
            es: {
                'loading': 'Cargando...',
                'error': 'Error',
                'projects': 'Proyectos',
                'blog': 'Blog',
                'home': 'Inicio',
                'dark-mode': 'Modo Oscuro',
                'light-mode': 'Modo Claro',
                'language-toggle': 'Idioma',
                'espanol': 'Español'
            }
        };
        
        // Initialize with base translations
        this.translations.set('en', this.baseTranslations.en);
        this.translations.set('es', this.baseTranslations.es);
        this.loadedLanguages.add('en');
        this.loadedLanguages.add('es');
        
        // Subscribe to language changes
        this.stateManager.subscribe('language', (newState) => {
            this.handleLanguageChange(newState.language);
        });
    }
    
    /**
     * Load language translations
     * @param {string} lang - Language code
     * @returns {Promise<void>}
     */
    async loadLanguage(lang) {
        if (this.loadedLanguages.has(lang)) {
            return;
        }
        
        // Return existing promise if loading
        if (this.loadingPromises.has(lang)) {
            return this.loadingPromises.get(lang);
        }
        
        const loadPromise = this.doLoadLanguage(lang);
        this.loadingPromises.set(lang, loadPromise);
        
        try {
            await loadPromise;
            this.loadedLanguages.add(lang);
        } catch (error) {
            console.error(`Failed to load language ${lang}:`, error);
        } finally {
            this.loadingPromises.delete(lang);
        }
    }
    
    /**
     * Get translation for key
     * @param {string} key - Translation key
     * @param {string} fallback - Fallback text
     * @param {Object} variables - Variables for interpolation
     * @returns {string} Translated text
     */
    t(key, fallback = null, variables = {}) {
        const lang = this.stateManager.getState('language');
        const translations = this.translations.get(lang) || {};
        
        let text = translations[key];
        
        // Try fallback language
        if (!text && lang !== this.defaultLanguage) {
            const defaultTranslations = this.translations.get(this.defaultLanguage) || {};
            text = defaultTranslations[key];
        }
        
        // Use provided fallback or return key
        if (!text) {
            text = fallback || key;
        }
        
        // Variable interpolation
        return this.interpolate(text, variables);
    }
    
    /**
     * Translate DOM element
     * @param {HTMLElement} element - Element to translate
     */
    translateElement(element) {
        const key = element.getAttribute('data-i18n');
        const fallback = element.getAttribute('data-i18n-fallback');
        
        if (key) {
            const translated = this.t(key, fallback);
            element.textContent = translated;
        }
        
        // Translate attributes
        const attrs = element.getAttributeNames().filter(attr => attr.startsWith('data-i18n-'));
        attrs.forEach(attr => {
            if (attr === 'data-i18n' || attr === 'data-i18n-fallback') return;
            
            const attrKey = element.getAttribute(attr);
            const targetAttr = attr.replace('data-i18n-', '');
            const translated = this.t(attrKey);
            element.setAttribute(targetAttr, translated);
        });
    }
    
    /**
     * Translate all elements in container
     * @param {HTMLElement} container - Container element
     */
    translateContainer(container = document.body) {
        const elements = container.querySelectorAll('[data-i18n]');
        elements.forEach(element => this.translateElement(element));
    }
    
    /**
     * Get localized URL for content
     * @param {string} url - Base URL
     * @param {string} lang - Language code
     * @returns {string} Localized URL
     */
    getLocalizedUrl(url, lang = null) {
        const currentLang = lang || this.stateManager.getState('language');
        
        // Remove leading slash
        url = url.replace(/^\//, '');
        
        if (currentLang === 'es') {
            // Add _es suffix before file extension
            return url.replace(/\.([^.]+)$/, '_es.$1');
        } else {
            // Remove _es suffix for English
            return url.replace(/_es\.([^.]+)$/, '.$1');
        }
    }
    
    /**
     * Get content metadata for current language
     * @param {Object} content - Content object with multilingual titles
     * @returns {Object} Localized content metadata
     */
    getLocalizedContent(content) {
        const lang = this.stateManager.getState('language');
        
        return {
            ...content,
            title: content.title?.[lang] || content.title?.en || content.title,
            description: content.description?.[lang] || content.description?.en || content.description,
            url: this.getLocalizedUrl(content.url, lang)
        };
    }
    
    // Private methods
    
    async doLoadLanguage(lang) {
        try {
            // In a real implementation, this would load from external files
            // For now, we'll simulate loading additional translations
            const additionalTranslations = await this.fetchTranslations(lang);
            
            const existing = this.translations.get(lang) || {};
            this.translations.set(lang, { ...existing, ...additionalTranslations });
            
        } catch (error) {
            console.error(`Failed to load translations for ${lang}:`, error);
        }
    }
    
    async fetchTranslations(lang) {
        // Simulate API call to load translations
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    // Additional translations would be loaded here
                    'content-loading': lang === 'es' ? 'Cargando contenido...' : 'Loading content...',
                    'not-found': lang === 'es' ? 'Contenido no encontrado' : 'Content not found',
                    'retry': lang === 'es' ? 'Reintentar' : 'Retry'
                });
            }, 100);
        });
    }
    
    interpolate(text, variables) {
        return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return variables[key] !== undefined ? variables[key] : match;
        });
    }
    
    async handleLanguageChange(newLang) {
        await this.loadLanguage(newLang);
        
        // Re-translate the page
        this.translateContainer();
        
        // Update HTML lang attribute
        document.documentElement.lang = newLang;
    }
}