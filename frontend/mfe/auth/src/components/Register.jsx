import '@/blocks/auth-form/auth-form.css';

import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import InfoTooltip from '@/components/InfoTooltip.jsx';
import useSession from '@/hooks/useSession.js';
import * as auth from '@/utils/auth.js';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
    const [tooltipStatus, setTooltipStatus] = useState('');
    const closeInfoToolTip = () => {
        setIsInfoToolTipOpen(false);
        navigate('/signin');
    };

    useSession();

    const handleSubmit = e => {
        e.preventDefault();

        auth.register(email, password)
            .then(() => {
                setTooltipStatus('success');
                setIsInfoToolTipOpen(true);
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
                        <h3 className='auth-form__title'>Регистрация</h3>
                        <label className='auth-form__input'>
                            <input
                                className='auth-form__textfield'
                                id='email'
                                name='email'
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
                    <div className='auth-form__wrapper'>
                        <button className='auth-form__button' type='submit'>
                            Зарегистрироваться
                        </button>
                        <p className='auth-form__text'>
                            Уже зарегистрированы?{' '}
                            <Link className='auth-form__link' to='/signin'>
                                Войти
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}
