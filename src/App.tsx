import {Main, Auth} from './layouts';
import './app.scss';
import { useSelector } from 'react-redux';
import { RootState } from './stores/store.ts';
import { ToastContainer } from './components/UI/Toast';

function App() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    return <>
        {isAuthenticated ? <Main /> : <Auth />}
        <ToastContainer />
    </>
}

export default App;