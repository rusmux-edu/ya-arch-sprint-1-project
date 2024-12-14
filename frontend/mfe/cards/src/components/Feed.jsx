import '@/blocks/places/places.css';

import {useCallback, useEffect, useState} from 'react';

import Card from '@/components/Card.jsx';
import CardAddPopup from '@/components/CardAddPopup.jsx';
import CardPopup from '@/components/CardPopup.jsx';
import api from '@/utils/api.js';

export default function Feed() {
    const [cards, setCards] = useState([]);
    const [isCardAddPopupOpen, setIsCardAddPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState();

    const handleCardLike = useCallback(event => {
        const newCard = event.detail;
        setCards(cards => cards.map(c => (c._id === newCard._id ? newCard : c)));
    }, []);

    const handleCardAddPopup = useCallback(() => setIsCardAddPopupOpen(true), []);
    const handleCardAddFeed = useCallback(event => {
        setCards(cards => [event.detail, ...cards]);
        setIsCardAddPopupOpen(false);
    }, []);
    const handleCardDelete = useCallback(event => setCards(cards => cards.filter(c => c._id !== event.detail)), []);

    useEffect(() => {
        addEventListener('card-like', handleCardLike);
        addEventListener('card-add-popup', handleCardAddPopup);
        addEventListener('card-add-feed', handleCardAddFeed);
        addEventListener('card-delete', handleCardDelete);
        return () => {
            removeEventListener('card-like', handleCardLike);
            removeEventListener('card-add-popup', handleCardAddPopup);
            removeEventListener('card-add-feed', handleCardAddFeed);
            removeEventListener('card-delete', handleCardDelete);
        };
    }, [handleCardLike, handleCardAddPopup, handleCardAddFeed, handleCardDelete]);

    useEffect(() => {
        api.getCardList()
            .then(cardData => setCards(cardData))
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <section className='places page__section'>
                <ul className='places__list'>
                    {cards.map(card => (
                        <Card card={card} key={card._id} onCardClick={setSelectedCard} />
                    ))}
                </ul>
            </section>
            <CardAddPopup
                isOpen={isCardAddPopupOpen}
                onClose={() => setIsCardAddPopupOpen(false)}
            />
            <CardPopup card={selectedCard} onClose={() => setSelectedCard(undefined)} />
        </>
    );
}
