export default function CardPopup({card, onClose}) {
    return (
        <div className={`popup popup_type_image ${card ? 'popup_is-opened' : ''}`}>
            <div className='popup__content popup__content_content_image'>
                <button className='popup__close' type='button' onClick={onClose} />
                <img alt={card ? card.name : ''} className='popup__image' src={card ? card.link : undefined} />
                <p className='popup__caption'>{card ? card.name : ''}</p>
            </div>
        </div>
    );
}
