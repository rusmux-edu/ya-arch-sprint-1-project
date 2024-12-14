import '@/blocks/card/card.css';
import '@/blocks/places/places.css';

import useUserStore from '@mesto/mfe/store/userStore';
import {PopupWithForm} from '@mesto/shared/components';
import {useState} from 'react';

import api from '@/utils/api.js';

const onCardLike = (card, userId) => {
    const isLiked = card.likes.some(i => i._id === userId);
    api.changeLikeCardStatus(card._id, !isLiked)
        .then(newCard => {
            dispatchEvent(new CustomEvent('card-like', {detail: newCard}));
        })
        .catch(error => console.error(error));
};

const onCardDelete = card => {
    api.removeCard(card._id)
        .then(() => {
            dispatchEvent(new CustomEvent('card-delete', {detail: card._id}));
        })
        .catch(error => console.error(error));
};

export default function Card({card, onCardClick}) {
    const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = useState(false);
    const cardStyle = {backgroundImage: `url(${card.link})`};
    const userId = useUserStore(state => state._id);

    const isLiked = card.likes.some(i => i._id === userId);
    const cardLikeButtonClassName = `card__like-button ${isLiked && 'card__like-button_is-active'}`;

    const isOwn = card.owner._id === userId;
    const cardDeleteButtonClassName = `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`;

    const handleCardLike = () => onCardLike(card, userId);
    const handleCardDelete = () => setIsCardDeletePopupOpen(true);
    const handleCardDeleteSubmit = e => {
        e.preventDefault();
        onCardDelete(card);
        setIsCardDeletePopupOpen(false);
    };

    return (
        <>
            <PopupWithForm
                isOpen={isCardDeletePopupOpen}
                onClose={() => setIsCardDeletePopupOpen(false)}
                onSubmit={handleCardDeleteSubmit}
                buttonText='Да'
                name='remove-card'
                title='Вы уверены?'
            />
            <li className='places__item card'>
                <div className='card__image' style={cardStyle} onClick={() => onCardClick(card)} />
                <button className={cardDeleteButtonClassName} type='button' onClick={handleCardDelete} />
                <div className='card__description'>
                    <h2 className='card__title'>{card.name}</h2>
                    <div className='card__likes'>
                        <button className={cardLikeButtonClassName} type='button' onClick={handleCardLike} />
                        <p className='card__like-count'>{card.likes.length}</p>
                    </div>
                </div>
            </li>
        </>
    );
}
