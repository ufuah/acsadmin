import React from 'react'
import ProtectedRoute from '../ProtectedRoute/Protected';
import useStore from '../useStore/Store';

const MyApp = ({ Component, pageProps }) => {
    const { isAuthenticated } = useStore();

    const authRoutes = ['/dashboard', '/settings']; // Routes you want to protect
    const isAuthRoute = authRoutes.includes(Component.route);
  
    return isAuthRoute ? (
      <ProtectedRoute>
        <Component {...pageProps} />
      </ProtectedRoute>
    ) : (
      <Component {...pageProps} />
    );
}

export default MyApp
