/**
 * Password hashing utility using Web Crypto API
 * Provides secure password hashing for client-side storage
 *
 * NOTE: This is for demo purposes. In production, passwords should
 * NEVER be stored client-side. Use proper backend authentication.
 */

/**
 * Hash a password using SHA-256
 * @param password - Plain text password
 * @returns Hex string of hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
    // Convert password string to Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Hash the password using SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convert buffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
};

/**
 * Verify a password against a hash
 * @param password - Plain text password to verify
 * @param hash - Stored hash to compare against
 * @returns True if password matches hash
 */
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
    const passwordHash = await hashPassword(password);
    return passwordHash === hash;
};

/**
 * Check if a password hash is already hashed (for migration)
 * SHA-256 hashes are always 64 characters in hex
 */
export const isHashed = (password: string): boolean => {
    return /^[a-f0-9]{64}$/.test(password);
};
