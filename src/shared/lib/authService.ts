import { EMAILREGEX, PASSWORDREGEX } from '../config/auth';
import { verifyPassword, hashPassword, isHashed } from './crypto';

interface User {
    username: string;
    email: string;
    password: string;
}

export class AuthService {
    private static getUsers(): User[] {
        return JSON.parse(localStorage.getItem('users') || '[]');
    }

    private static saveUsers(users: User[]): void {
        localStorage.setItem('users', JSON.stringify(users));
    }

    static validateEmail(email: string): boolean {
        return EMAILREGEX.test(email);
    }

    static validatePassword(password: string): boolean {
        return PASSWORDREGEX.test(password);
    }

    static async checkCredentials(email: string, password: string): Promise<{ valid: boolean; error?: string }> {
        const users = this.getUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            return { valid: false, error: 'email' };
        }

        if (isHashed(user.password)) {
            const isValid = await verifyPassword(password, user.password);
            if (!isValid) {
                return { valid: false, error: 'password' };
            }
        } else {
            if (user.password !== password) {
                return { valid: false, error: 'password' };
            }
            user.password = await hashPassword(password);
            this.saveUsers(users);
        }

        return { valid: true };
    }

    static checkEmailExists(email: string): boolean {
        const users = this.getUsers();
        return users.some(u => u.email === email);
    }

    static checkUsernameExists(username: string): boolean {
        const users = this.getUsers();
        return users.some(u => u.username === username);
    }

    static checkUsernameOrEmailExists(username: string, email: string): 'username' | 'email' | null {
        const users = this.getUsers();
        const user = users.find(u => u.username === username || u.email === email);

        if (!user) return null;
        return user.username === username ? 'username' : 'email';
    }

    static async registerUser(username: string, email: string, password: string): Promise<void> {
        const users = this.getUsers();
        const hashedPassword = await hashPassword(password);

        users.push({
            username,
            email,
            password: hashedPassword,
        });

        this.saveUsers(users);
    }

    static async updatePassword(email: string, newPassword: string): Promise<boolean> {
        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.email === email);

        if (userIndex === -1) return false;

        users[userIndex].password = await hashPassword(newPassword);
        this.saveUsers(users);
        return true;
    }
}
