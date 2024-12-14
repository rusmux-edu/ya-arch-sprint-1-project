import ErrorIcon from '@/images/error-icon.svg';
import SuccessIcon from '@/images/success-icon.svg';

export default function InfoTooltip({isOpen, onClose, status}) {
    const icon = status === 'success' ? SuccessIcon : ErrorIcon;
    const text = status === 'success' ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так! Попробуйте ещё раз.';

    return (
        <div className={`popup ${isOpen && 'popup_is-opened'}`}>
            <div className='popup__content'>
                <form className='popup__form' noValidate>
                    <button className='popup__close' type='button' onClick={onClose} />
                    <div>
                        <img alt='' className='popup__icon' src={icon} />
                        <p className='popup__status-message'>{text}</p>
                    </div>
                </form>
            </div>
        </div>
    );
}
