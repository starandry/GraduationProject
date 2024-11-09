/*import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores/store.ts';
import { addPoints } from '../stores/slices/pathSlice.ts';

export const useActivePath = () => {
    const dispatch = useDispatch();
    const activePath = useSelector((state: RootState) => state.paths.value);

    const handleLinkClick = (path: string) => {
        dispatch(addPoints(path));
    };

    return { activePath, handleLinkClick };
};*/
