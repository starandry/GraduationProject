import React, { Component, ErrorInfo, ReactNode } from 'react';
import styles from './errorBoundary.module.scss';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary component catches JavaScript errors anywhere in the child component tree
 * Logs errors and displays a fallback UI
 */
class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
            errorInfo: null,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({
            error,
            errorInfo,
        });
    }

    handleReload = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            const isDevelopment = process.env.NODE_ENV === 'development';

            return (
                <div className={styles.errorContainer}>
                    <div className={styles.errorIcon}>💥</div>
                    <h1 className={styles.errorTitle}>Упс! Что-то пошло не так</h1>
                    <p className={styles.errorMessage}>
                        Произошла непредвиденная ошибка. Мы уже работаем над её исправлением.
                    </p>

                    {isDevelopment && this.state.error && (
                        <div className={styles.errorDetails}>
                            <strong>Error:</strong> {this.state.error.toString()}
                            <br />
                            <br />
                            <strong>Stack trace:</strong>
                            <pre>{this.state.errorInfo?.componentStack}</pre>
                        </div>
                    )}

                    <div className={styles.errorActions}>
                        <button
                            className={`${styles.button} ${styles.buttonPrimary}`}
                            onClick={this.handleReload}
                        >
                            🔄 Перезагрузить страницу
                        </button>
                        <button
                            className={`${styles.button} ${styles.buttonSecondary}`}
                            onClick={this.handleGoHome}
                        >
                            🏠 На главную
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
