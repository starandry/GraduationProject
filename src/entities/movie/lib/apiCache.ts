/**
 * Simple in-memory cache for API responses
 * Reduces redundant API calls and improves performance
 */

interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

class ApiCache {
    private cache: Map<string, CacheEntry<unknown>>;
    private readonly ttl: number; // Time to live in milliseconds

    constructor(ttlMinutes: number = 15) {
        this.cache = new Map();
        this.ttl = ttlMinutes * 60 * 1000;
    }

    /**
     * Get cached data if it exists and is not expired
     */
    get<T>(key: string): T | null {
        const entry = this.cache.get(key);
        if (!entry) return null;

        const isExpired = Date.now() - entry.timestamp > this.ttl;
        if (isExpired) {
            this.cache.delete(key);
            return null;
        }

        return entry.data as T;
    }

    /**
     * Store data in cache with current timestamp
     */
    set<T>(key: string, data: T): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
        });
    }

    /**
     * Clear all cached data
     */
    clear(): void {
        this.cache.clear();
    }

    /**
     * Remove specific cache entry
     */
    remove(key: string): void {
        this.cache.delete(key);
    }

    /**
     * Get cache size
     */
    size(): number {
        return this.cache.size;
    }
}

// Export singleton instance
export const movieCache = new ApiCache(15);
