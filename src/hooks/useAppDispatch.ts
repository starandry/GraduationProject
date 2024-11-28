import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../stores/store.ts'; // путь к вашему store

export const useAppDispatch: () => AppDispatch = useDispatch;
