import { lazy, Suspense, useEffect } from 'react';
import { MainLayout } from '@widgets/layout';
import './app/styles/app.scss';
import { useAppSelector } from './app/store/hooks';
import { ToastContainer } from '@entities/notification/ui/Toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth, RequireGuest } from './processes/auth/guards';
import { GallerySkeleton } from './shared/ui/Skeleton';

// Lazy load pages for better initial bundle size
const AuthPage = lazy(() => import('@pages/auth').then(m => ({ default: m.AuthPage })));
const MovieGallery = lazy(() => import('@widgets/movie-gallery').then(m => ({ default: m.MovieGallery })));
const SettingsPage = lazy(() => import('@pages/settings').then(m => ({ default: m.SettingsPage })));
const MovieDetailsPage = lazy(() => import('@pages/movie-details').then(m => ({ default: m.MovieDetailsPage })));
const LoginForm = lazy(() => import('@features/auth/ui/LoginForm').then(m => ({ default: m.LoginForm })));
const RegistrationForm = lazy(() => import('@features/auth/ui/RegistrationForm').then(m => ({ default: m.RegistrationForm })));
const ResetPasswordForm = lazy(() => import('@features/auth/ui/ResetPasswordForm').then(m => ({ default: m.ResetPasswordForm })));
const NewPasswordForm = lazy(() => import('@features/auth/ui/NewPasswordForm').then(m => ({ default: m.NewPasswordForm })));

// Loading fallback component
const PageLoader = () => <GallerySkeleton count={8} />;

function App() {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }
    }, []);

    return (
        <>
            <Suspense fallback={<PageLoader />}>
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
                            <Route index element={<MovieGallery />} />
                            <Route path="trends" element={<MovieGallery />} />
                            <Route path="favorites" element={<MovieGallery />} />
                            <Route path="settings" element={<SettingsPage />} />
                            <Route path="movie/:imdbID" element={<MovieDetailsPage />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
            <ToastContainer />
        </>
    );
}

export default App;
