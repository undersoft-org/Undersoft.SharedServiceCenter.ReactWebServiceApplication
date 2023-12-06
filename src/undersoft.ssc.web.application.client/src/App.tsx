import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import Profile from './app/pages/Profile';
import SignIn from './app/pages/Authentication/SignIn';
import SignUp from './app/pages/Authentication/SignUp';
import ResetPassword from './app/pages/Authentication/ResetPassword';
import EmailVerification from './app/pages/Authentication/EmailVerification';
import Loader from './app/loader';
import routes from './app/routes';
import { SecuredRoute } from './app/routes/secure';
import './App.css';

const MainLayout = lazy(() => import('./app/MainLayout'));

function App() {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
                containerClassName="overflow-auto"
            />
            <Routes>
                <Route path="/auth/resetpw"
                    element={<ResetPassword />} />
                <Route path="/auth/signin"
                    element={<SignIn />} />
                <Route path="/auth/signup"
                    element={<SignUp />} />
                <Route
                    element={<MainLayout />}>
                    <Route index
                        element={<Profile />} />
                    {routes.map((routes, index) => {
                        const { path, component: Component } = routes;
                        return (
                            <Route
                                key={index}
                                path={path}
                                element={
                                    <Suspense fallback={<Loader />}>
                                        <Component />
                                    </Suspense>
                                }
                            />
                        );
                    })}
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
}

export default App;