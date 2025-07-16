/**
 * Centralized State Management System
 * Provides reactive state updates and persistence
 */
export class StateManager {
    constructor() {
        this.state = {
            language: this.getStoredLanguage(),
            theme: this.getStoredTheme(),
            currentContent: null,
            loading: false,
            error: null,
            route: { path: '', params: {} }
        };
        
        this.subscribers = new Map();
        this.cache = new Map();
        
        // Debounce timers for performance
        this.debounceTimers = new Map();
    }
    
    /**
     * Subscribe to state changes
     * @param {string|string[]} keys - State keys to watch
     * @param {Function} callback - Callback function
     * @returns {Function} Unsubscribe function
     */
    subscribe(keys, callback) {
        const keyArray = Array.isArray(keys) ? keys : [keys];
        const id = Symbol();
        
        this.subscribers.set(id, { keys: keyArray, callback });
        
        // Return unsubscribe function
        return () => this.subscribers.delete(id);
    }
    
    /**
     * Update state and notify subscribers
     * @param {Object} updates - State updates
     */
    setState(updates) {
        const prevState = { ...this.state };
        this.state = { ...this.state, ...updates };
        
        // Persist certain state changes
        if (updates.language) {
            this.debounce('language', () => {
                localStorage.setItem('language', updates.language);
            }, 100);
        }
        
        if (updates.theme) {
            this.debounce('theme', () => {
                localStorage.setItem('theme', updates.theme);
            }, 100);
        }
        
        // Notify subscribers
        this.notifySubscribers(prevState, this.state);
    }
    
    /**
     * Get current state
     * @param {string} key - Optional key to get specific state
     * @returns {*} State value
     */
    getState(key) {
        return key ? this.state[key] : { ...this.state };
    }
    
    /**
     * Cache data with expiration
     * @param {string} key - Cache key
     * @param {*} data - Data to cache
     * @param {number} ttl - Time to live in milliseconds
     */
    setCache(key, data, ttl = 5 * 60 * 1000) { // 5 minutes default
        this.cache.set(key, {
            data,
            expires: Date.now() + ttl
        });
    }
    
    /**
     * Get cached data
     * @param {string} key - Cache key
     * @returns {*} Cached data or null
     */
    getCache(key) {
        const cached = this.cache.get(key);
        
        if (!cached) return null;
        
        if (Date.now() > cached.expires) {
            this.cache.delete(key);
            return null;
        }
        
        return cached.data;
    }
    
    /**
     * Clear cache
     * @param {string} pattern - Optional pattern to match keys
     */
    clearCache(pattern) {
        if (pattern) {
            const regex = new RegExp(pattern);
            for (const [key] of this.cache) {
                if (regex.test(key)) {
                    this.cache.delete(key);
                }
            }
        } else {
            this.cache.clear();
        }
    }
    
    /**
     * Get all cache keys
     * @returns {string[]} Array of cache keys
     */
    getAllCacheKeys() {
        return Array.from(this.cache.keys());
    }
    
    // Private methods
    
    notifySubscribers(prevState, newState) {
        for (const [id, { keys, callback }] of this.subscribers) {
            const changedKeys = keys.filter(key => prevState[key] !== newState[key]);
            
            if (changedKeys.length > 0) {
                try {
                    callback(newState, prevState, changedKeys);
                } catch (error) {
                    console.error('Error in state subscriber:', error);
                }
            }
        }
    }
    
    debounce(key, fn, delay) {
        if (this.debounceTimers.has(key)) {
            clearTimeout(this.debounceTimers.get(key));
        }
        
        this.debounceTimers.set(key, setTimeout(() => {
            fn();
            this.debounceTimers.delete(key);
        }, delay));
    }
    
    getStoredLanguage() {
        try {
            return localStorage.getItem('language') || 'en';
        } catch (error) {
            console.warn('localStorage not available, using default language');
            return 'en';
        }
    }
    
    getStoredTheme() {
        try {
            const stored = localStorage.getItem('theme');
            return stored || 'light';
        } catch (error) {
            console.warn('localStorage not available, using default theme');
            return 'light';
        }
    }
}