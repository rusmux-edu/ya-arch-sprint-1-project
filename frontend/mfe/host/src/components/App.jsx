import useUserStore from '@mesto/mfe/store/userStore';
import {lazy} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import catchCallback from '@/components/Fallback.jsx';
import Footer from '@/components/Footer.jsx';
import Header from '@/components/Header.jsx';

const Register = lazy(() => import('@mesto/mfe/auth/Register').catch(catchCallback));
const Login = lazy(() => import('@mesto/mfe/auth/Login').catch(catchCallback));
const Profile = lazy(() => import('@mesto/mfe/profile/Profile').catch(catchCallback));
const Feed = lazy(() => import('@mesto/mfe/cards/Feed').catch(catchCallback));

export default function App() {
    const isLoggedIn = useUserStore(state => state.isLoggedIn);

    return (
        <div className='page__content'>
            <Header />
            <Routes>
                <Route path='/signup' element={<Register />} />
                <Route path='/signin' element={<Login />} />
                <Route
                    exact
                    path='/'
                    element={
                        isLoggedIn ? (
                            <main className='content'>
                                <Profile />
                                <Feed />
                            </main>
                        ) : (
                            <Navigate to='/signin' />
                        )
                    }
                />
            </Routes>
            <Footer />
        </div>
    );
}
