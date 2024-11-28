import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase.ts';

// Функция проверки учетных данных пользователя
export const checkUserCredentials = async (
    email: string,
    password: string
): Promise<{ success: boolean; error?: string; username?: string }> => {
    try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();
            const storedPassword = userDoc.password;
            const username = userDoc.username; //  имя пользователя

            if (password === storedPassword) {
                return { success: true, username }; //имя пользователя вместе с успехом
            } else {
                return { success: false, error: 'Invalid password. Please try again.' };
            }
        } else {
            return { success: false, error: 'User does not exist. Please register.' };
        }
    } catch (error) {
        console.error('Error checking user credentials: ', error);
        return { success: false, error: 'An error occurred while checking credentials.' };
    }
};

