/**
 * Content Management System
 * Handles loading, caching, and rendering of markdown content
 */
export class ContentManager {
    constructor(stateManager, i18nManager) {
        this.stateManager = stateManager;
        this.i18nManager = i18nManager;
        this.mathJaxQueue = [];
        this.mathJaxProcessing = false;
        
        // Content type definitions
        this.contentTypes = {
            page: {
                basePath: 'content/',
                extension: '.md'
            },
            blog: {
                basePath: 'content/blogs/',
                extension: '.md',
                metadata: this.getBlogMetadata()
            },
            project: {
                basePath: 'content/projects/',
                extension: '.md',
                metadata: this.getProjectMetadata()
            }
        };
    }
    
    /**
     * Load content with caching
     * @param {string} type - Content type (page, blog, project)
     * @param {string} id - Content ID
     * @param {string} lang - Language code
     * @returns {Promise<Object>} Content object
     */
    async loadContent(type, id, lang = null) {
        const language = lang || this.stateManager.getState('language');
        const cacheKey = `${type}:${id}:${language}`;
        
        // Check cache first
        const cached = this.stateManager.getCache(cacheKey);
        if (cached) {
            return cached;
        }
        
        this.stateManager.setState({ loading: true, error: null });
        
        try {
            const content = await this.fetchContent(type, id, language);
            
            // Cache the content
            this.stateManager.setCache(cacheKey, content);
            
            this.stateManager.setState({ 
                loading: false, 
                currentContent: content 
            });
            
            return content;
            
        } catch (error) {
            console.error(`Failed to load content ${type}:${id}:${language}:`, error);
            
            this.stateManager.setState({ 
                loading: false, 
                error: error.message 
            });
            
            throw error;
        }
    }
    
    /**
     * Render markdown content
     * @param {string} markdown - Markdown content
     * @param {HTMLElement} container - Container element
     * @returns {Promise<void>}
     */
    async renderMarkdown(markdown, container) {
        if (!markdown || !container) return;
        
        try {
            // Process image paths
            const processedMarkdown = this.processImagePaths(markdown);
            
            // Convert markdown to HTML
            const html = marked.parse(processedMarkdown);
            
            // Create a temporary container for processing
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            
            // Process math expressions
            await this.processMathJax(tempDiv);
            
            // Update the container
            container.innerHTML = tempDiv.innerHTML;
            
            // Add event listeners for internal links
            this.addInternalLinkHandlers(container);
            
        } catch (error) {
            console.error('Error rendering markdown:', error);
            container.innerHTML = `<div class="error">Error rendering content: ${error.message}</div>`;
        }
    }
    
    /**
     * Get content list for type
     * @param {string} type - Content type
     * @returns {Array} Content list
     */
    getContentList(type) {
        const contentType = this.contentTypes[type];
        if (!contentType || !contentType.metadata) {
            return [];
        }
        
        return contentType.metadata.map(item => 
            this.i18nManager.getLocalizedContent(item)
        );
    }
    
    /**
     * Render content list
     * @param {string} type - Content type
     * @param {HTMLElement} container - Container element
     */
    renderContentList(type, container) {
        const contentList = this.getContentList(type);
        
        if (!contentList.length) {
            container.innerHTML = `<p data-i18n="no-content">No content available</p>`;
            return;
        }
        
        const ul = document.createElement('ul');
        ul.className = 'content-list';
        
        contentList.forEach(item => {
            const li = document.createElement('li');
            li.className = 'content-item';
            
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = item.title;
            a.className = 'content-link';
            a.setAttribute('data-content-type', type);
            a.setAttribute('data-content-id', item.id);
            
            // Add click handler
            a.addEventListener('click', (e) => {
                e.preventDefault();
                this.loadAndRenderContent(type, item.id);
            });
            
            li.appendChild(a);
            ul.appendChild(li);
        });
        
        container.innerHTML = '';
        container.appendChild(ul);
    }
    
    /**
     * Load and render content in main container
     * @param {string} type - Content type
     * @param {string} id - Content ID
     */
    async loadAndRenderContent(type, id) {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;
        
        try {
            const content = await this.loadContent(type, id);
            
            // Clear and add loading state
            mainContent.innerHTML = '<div class="loading" data-i18n="loading">Loading...</div>';
            this.i18nManager.translateContainer(mainContent);
            
            // Render the content
            await this.renderMarkdown(content.markdown, mainContent);
            
        } catch (error) {
            mainContent.innerHTML = `
                <div class="error">
                    <h2 data-i18n="error">Error</h2>
                    <p>${error.message}</p>
                    <button onclick="location.reload()" data-i18n="retry">Retry</button>
                </div>
            `;
            this.i18nManager.translateContainer(mainContent);
        }
    }
    
    // Private methods
    
    async fetchContent(type, id, language) {
        const contentType = this.contentTypes[type];
        if (!contentType) {
            throw new Error(`Unknown content type: ${type}`);
        }
        
        const url = this.buildContentUrl(type, id, language);
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch content: ${response.status} ${response.statusText}`);
        }
        
        const markdown = await response.text();
        
        return {
            type,
            id,
            language,
            markdown,
            url,
            timestamp: Date.now()
        };
    }
    
    buildContentUrl(type, id, language) {
        const contentType = this.contentTypes[type];
        const baseUrl = contentType.basePath + id + contentType.extension;
        
        return this.i18nManager.getLocalizedUrl(baseUrl, language);
    }
    
    processImagePaths(markdown) {
        return markdown.replace(/!\[([^\]]*)\]\((\/static\/images\/[^\)]+)\)/g, (match, alt, src) => {
            const newSrc = src.replace(/^\/static\//, '');
            return `![${alt}](${newSrc})`;
        });
    }
    
    async processMathJax(container) {
        if (typeof MathJax === 'undefined') {
            console.warn('MathJax not loaded');
            return;
        }
        
        return new Promise((resolve) => {
            this.mathJaxQueue.push({ container, resolve });
            this.processMathJaxQueue();
        });
    }
    
    async processMathJaxQueue() {
        if (this.mathJaxProcessing || this.mathJaxQueue.length === 0) {
            return;
        }
        
        this.mathJaxProcessing = true;
        
        while (this.mathJaxQueue.length > 0) {
            const { container, resolve } = this.mathJaxQueue.shift();
            
            try {
                await MathJax.typesetPromise([container]);
                resolve();
            } catch (error) {
                console.error('MathJax processing failed:', error);
                resolve();
            }
        }
        
        this.mathJaxProcessing = false;
    }
    
    addInternalLinkHandlers(container) {
        const internalLinks = container.querySelectorAll('a[href^="#"], a[href^="/"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    // Handle anchor links
                    e.preventDefault();
                    const target = document.getElementById(href.slice(1));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
    
    getBlogMetadata() {
        return [
            {
                id: 'post1',
                title: {
                    en: 'A whitepaper on my website',
                    es: 'Un whitepaper sobre mi sitio web'
                },
                url: 'content/blogs/post1.md'
            },
            {
                id: 'post2',
                title: {
                    en: 'My Second Post',
                    es: 'Mi segunda publicación'
                },
                url: 'content/blogs/post2.md'
            }
        ];
    }
    
    getProjectMetadata() {
        return [
            {
                id: 'project1',
                title: {
                    en: 'Awesome Project',
                    es: 'Proyecto Impresionante'
                },
                url: 'content/projects/project1.md'
            },
            {
                id: 'project2',
                title: {
                    en: 'Another Project',
                    es: 'Otro Proyecto'
                },
                url: 'content/projects/project2.md'
            }
        ];
    }
}