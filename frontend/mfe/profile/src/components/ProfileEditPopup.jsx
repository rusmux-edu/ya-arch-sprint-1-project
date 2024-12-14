import useUserStore from '@mesto/mfe/store/userStore';
import {PopupWithForm} from '@mesto/shared/components';
import {useEffect, useState} from 'react';

import api from '@/utils/api.js';

export default function ProfileEditPopup({isOpen, onClose}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const userName = useUserStore(state => state.name);
    const about = useUserStore(state => state.about);
    const setUserData = useUserStore(state => state.setUserData);

    useEffect(() => {
        setName(userName);
        setDescription(about);
    }, [userName, about]);

    const handleSubmit = e => {
        e.preventDefault();

        api.setUserInfo({name, about: description})
            .then(newUserData => {
                setUserData(newUserData);
                dispatchEvent(new CustomEvent('profile-update'));
            })
            .catch(error => console.error(error));
    };

    return (
        <PopupWithForm
            isOpen={isOpen}
            name='edit'
            title='Редактировать профиль'
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className='popup__label'>
                <input
                    className='popup__input popup__input_type_name'
                    id='owner-name'
                    maxLength='40'
                    minLength='2'
                    name='userName'
                    pattern='[a-zA-Zа-яА-Я -]{1,}'
                    placeholder='Имя'
                    required
                    type='text'
                    value={name || ''}
                    onChange={e => setName(e.target.value)}
                />
                <span className='popup__error' id='owner-name-error' />
            </label>
            <label className='popup__label'>
                <input
                    className='popup__input popup__input_type_description'
                    id='owner-description'
                    maxLength='200'
                    minLength='2'
                    name='userDescription'
                    placeholder='Занятие'
                    required
                    type='text'
                    value={description || ''}
                    onChange={e => setDescription(e.target.value)}
                />
                <span className='popup__error' id='owner-description-error' />
            </label>
        </PopupWithForm>
    );
}
