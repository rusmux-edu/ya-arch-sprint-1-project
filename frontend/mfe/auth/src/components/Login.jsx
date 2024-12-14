import '@/blocks/auth-form/auth-form.css';

import useUserStore from '@mesto/mfe/store/userStore';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import InfoTooltip from '@/components/InfoTooltip.jsx';
import useSession from '@/hooks/useSession.js';
import * as auth from '@/utils/auth.js';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setUserData = useUserStore(state => state.setUserData);
    const navigate = useNavigate();

    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
    const [tooltipStatus, setTooltipStatus] = useState('');
    const closeInfoToolTip = () => setIsInfoToolTipOpen(false);

    useSession();

    const handleSubmit = e => {
        e.preventDefault();

        auth.login(email, password)
            .then(() => {
                setUserData({email: email, isLoggedIn: true});
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                setTooltipStatus('fail');
                setIsInfoToolTipOpen(true);
            });
    };

    return (
        <>
            <InfoTooltip isOpen={isInfoToolTipOpen} status={tooltipStatus} onClose={closeInfoToolTip} />
            <div className='auth-form'>
                <form className='auth-form__form' onSubmit={handleSubmit}>
                    <div className='auth-form__wrapper'>
                        <h3 className='auth-form__title'>Вход</h3>
                        <label className='auth-form__input'>
                            <input
                                className='auth-form__textfield'
                                id='email'
                                name='name'
                                placeholder='Email'
                                required
                                type='text'
                                onChange={e => setEmail(e.target.value)}
                            />
                        </label>
                        <label className='auth-form__input'>
                            <input
                                className='auth-form__textfield'
                                id='password'
                                name='password'
                                placeholder='Пароль'
                                required
                                type='password'
                                onChange={e => setPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    <button className='auth-form__button' type='submit'>
                        Войти
                    </button>
                </form>
            </div>
        </>
    );
}
