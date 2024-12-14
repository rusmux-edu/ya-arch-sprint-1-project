export default function PopupWithForm({buttonText = 'Сохранить', children, isOpen, name, onClose, onSubmit, title}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_is-opened' : ''}`}>
            <div className='popup__content'>
                <form className='popup__form' name={name} noValidate onSubmit={onSubmit}>
                    <button className='popup__close' type='button' onClick={onClose} />
                    <h3 className='popup__title'>{title}</h3>
                    {children}
                    <button className='button popup__button' type='submit'>
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}
