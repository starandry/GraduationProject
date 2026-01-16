import { MainLayout } from './widgets/layout';
import { AuthPage } from './pages/auth';
import './app/styles/app.scss';
import { useAppSelector } from './app/store/hooks';
import { ToastContainer } from './entities/notification/ui/Toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth, RequireGuest } from './processes/auth/guards';
import { HomePage } from './pages/home';
import { TrendsPage } from './pages/trends';
import { FavoritesPage } from './pages/favorites';
import { SettingsPage } from './pages/settings';
import { MovieDetailsPage } from './pages/movie-details';
import { LoginForm } from './features/auth/ui/LoginForm';
import { RegistrationForm } from './features/auth/ui/RegistrationForm';
import { ResetPasswordForm } from './features/auth/ui/ResetPasswordForm';
import { NewPasswordForm } from './features/auth/ui/NewPasswordForm';

function App() {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    return (
        <>
            <Routes>
                <Route element={<RequireGuest isAuthenticated={isAuthenticated} />}>
                    <Route path="/auth" element={<AuthPage />}>
                        <Route index element={<LoginForm />} />
                        <Route path="signup" element={<RegistrationForm />} />
                        <Route path="reset" element={<ResetPasswordForm />} />
                        <Route path="password" element={<NewPasswordForm />} />
                        <Route path="*" element={<Navigate to="/auth" replace />} />
                    </Route>
                </Route>
                <Route element={<RequireAuth isAuthenticated={isAuthenticated} />}>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="trends" element={<TrendsPage />} />
                        <Route path="favorites" element={<FavoritesPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="movie/:imdbID" element={<MovieDetailsPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Route>
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
