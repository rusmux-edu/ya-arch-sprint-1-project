import {PopupWithForm} from '@mesto/shared/components';
import {useState} from 'react';

import api from '@/utils/api.js';

export default function CardAddPopup({isOpen, onClose}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        api.addCard({name, link})
            .then(newCardFull => {
                dispatchEvent(new CustomEvent('card-add-feed', {detail: newCardFull}));
                setName('');
                setLink('');
            })
            .catch(error => console.error(error));
    };

    return (
        <PopupWithForm isOpen={isOpen} name='new-card' title='Новое место' onClose={onClose} onSubmit={handleSubmit}>
            <label className='popup__label'>
                <input
                    className='popup__input popup__input_type_card-name'
                    id='place-name'
                    maxLength='30'
                    minLength='1'
                    name='name'
                    placeholder='Название'
                    required
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <span className='popup__error' id='place-name-error' />
            </label>
            <label className='popup__label'>
                <input
                    className='popup__input popup__input_type_url'
                    id='place-link'
                    name='link'
                    placeholder='Ссылка на картинку'
                    required
                    type='url'
                    value={link}
                    onChange={e => setLink(e.target.value)}
                />
                <span className='popup__error' id='place-link-error' />
            </label>
        </PopupWithForm>
    );
}
