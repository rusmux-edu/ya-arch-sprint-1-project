import useUserStore from '@mesto/mfe/store/userStore';
import {Link, Route, Routes, useNavigate} from 'react-router-dom';

import logoPath from '@/images/logo.svg';

export default function Header() {
    const email = useUserStore(state => state.email);
    const setUserData = useUserStore(state => state.setUserData);

    const navigate = useNavigate();

    const onSignOut = () => {
        localStorage.removeItem('jwt');
        setUserData({isLoggedIn: false});
        navigate('/signin');
    };

    return (
        <header className='header page__section'>
            <img alt='Логотип проекта Mesto' className='logo header__logo' src={logoPath} />
            <Routes>
                <Route
                    exact
                    path='/'
                    element={
                        <div className='header__wrapper'>
                            <p className='header__user'>{email}</p>
                            <button className='header__logout' type='submit' onClick={onSignOut}>
                                Выйти
                            </button>
                        </div>
                    }
                />
                <Route
                    path='/signup'
                    element={
                        <Link className='header__auth-link' to='/signin'>
                            Войти
                        </Link>
                    }
                />
                <Route
                    path='/signin'
                    element={
                        <Link className='header__auth-link' to='/signup'>
                            Регистрация
                        </Link>
                    }
                />
            </Routes>
        </header>
    );
}
