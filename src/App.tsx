import { Main, Auth } from './layouts';
import './app.scss';
import { useSelector } from 'react-redux';
import { RootState } from './stores/store.ts';
import { ToastContainer } from './components/UI/Toast';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

const RequireAuth = ({ isAuthenticated }: { isAuthenticated: boolean }) =>
    isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;

const RequireGuest = ({ isAuthenticated }: { isAuthenticated: boolean }) =>
    !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;

function App() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    return (
        <>
            <Routes>
                <Route element={<RequireGuest isAuthenticated={isAuthenticated} />}>
                    <Route path="/auth/*" element={<Auth />} />
                </Route>
                <Route element={<RequireAuth isAuthenticated={isAuthenticated} />}>
                    <Route path="/*" element={<Main />} />
                </Route>
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
