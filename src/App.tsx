import {Main, Auth} from './layouts';
import './app.scss';
import { useSelector } from 'react-redux';
import { RootState } from './stores/store.ts';

function App() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return <>
        {isAuthenticated ? <Main /> : <Auth />}
    </>
}

export default App;