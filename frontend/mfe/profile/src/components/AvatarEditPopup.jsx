import useUserStore from '@mesto/mfe/store/userStore';
import {PopupWithForm} from '@mesto/shared/components';
import {useRef} from 'react';

import api from '@/utils/api.js';

export default function AvatarEditPopup({isOpen, onClose}) {
    const inputRef = useRef();
    const setUserData = useUserStore(state => state.setUserData);

    const handleSubmit = e => {
        e.preventDefault();

        api.setUserAvatar({avatar: inputRef.current.value})
            .then(newUserData => {
                setUserData(newUserData);
                dispatchEvent(new CustomEvent('profile-update'));
            })
            .catch(error => console.error(error));
    };

    return (
        <PopupWithForm
            isOpen={isOpen}
            name='edit-avatar'
            title='Обновить аватар'
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className='popup__label'>
                <input
                    className='popup__input popup__input_type_description'
                    id='owner-avatar'
                    name='avatar'
                    placeholder='Ссылка на изображение'
                    ref={inputRef}
                    required
                    type='url'
                />
                <span className='popup__error' id='owner-avatar-error' />
            </label>
        </PopupWithForm>
    );
}
