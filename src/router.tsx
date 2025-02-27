import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import RegisterView from './views/RegisterView';
import LoginView from './views/LoginView';

import AppLayout from './layouts/AppLayout';
import LinkTreeView from './views/LinkTreeView';
import ProfileView from './views/ProfileView';

import HandleView from './views/HandleView';

import NotFoundView from './views/NotFoundView';
import HomeView from './views/HomeView';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={ <AuthLayout /> }>
                    <Route path='/auth/login' element={ <LoginView /> } />
                    <Route path='/auth/register' element={ <RegisterView /> } />
                </Route>

                <Route path={ '/admin' } element={ <AppLayout /> }>
                    <Route index={ true } element={ <LinkTreeView /> } />
                    <Route path='profile' element={ <ProfileView /> } />
                </Route>

                <Route path='/:handle' element={ <AuthLayout /> }>
                    <Route index={ true } element={ <HandleView /> } />
                </Route>

                <Route path='/404' element={ <AuthLayout /> }>
                    <Route index={ true } element={ <NotFoundView /> } />
                </Route>

                <Route path='/' element={ <HomeView /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;