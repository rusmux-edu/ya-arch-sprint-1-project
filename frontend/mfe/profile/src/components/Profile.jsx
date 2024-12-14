import '@/blocks/profile/profile.css';

import useUserStore from '@mesto/mfe/store/userStore';
import {useCallback, useEffect, useState} from 'react';

import AvatarEditPopup from '@/components/AvatarEditPopup.jsx';
import ProfileEditPopup from '@/components/ProfileEditPopup.jsx';
import api from '@/utils/api.js';

const handleCardAddClick = () => dispatchEvent(new CustomEvent('card-add-popup'));

export default function Profile() {
    const [isProfileEditPopupOpen, setIsProfileEditPopupOpen] = useState(false);
    const [isAvatarEditPopupOpen, setIsAvatarEditPopupOpen] = useState(false);

    const name = useUserStore(state => state.name);
    const about = useUserStore(state => state.about);
    const avatar = useUserStore(state => state.avatar);
    const setUserData = useUserStore(state => state.setUserData);

    useEffect(() => {
        api.getUserInfo()
            .then(userData => setUserData(userData))
            .catch(error => console.error(error));
    }, [setUserData]);

    const handleAvatarEditClick = () => setIsAvatarEditPopupOpen(true);
    const handleProfileEditClick = () => setIsProfileEditPopupOpen(true);

    const handleProfileUpdate = useCallback(() => {
        setIsProfileEditPopupOpen(false);
        setIsAvatarEditPopupOpen(false);
    }, []);

    useEffect(() => {
        addEventListener('profile-update', handleProfileUpdate);
        return () => removeEventListener('profile-update', handleProfileUpdate);
    }, [handleProfileUpdate]);

    const imageStyle = {backgroundImage: `url(${avatar})`};
    return (
        <>
            <section className='profile page__section'>
                <div className='profile__image' style={imageStyle} onClick={handleAvatarEditClick} />
                <div className='profile__info'>
                    <h1 className='profile__title'>{name}</h1>
                    <button className='profile__edit-button' type='button' onClick={handleProfileEditClick} />
                    <p className='profile__description'>{about}</p>
                </div>
                <button className='profile__add-button' type='button' onClick={handleCardAddClick} />
            </section>
            <ProfileEditPopup isOpen={isProfileEditPopupOpen} onClose={() => setIsProfileEditPopupOpen(false)} />
            <AvatarEditPopup isOpen={isAvatarEditPopupOpen} onClose={() => setIsAvatarEditPopupOpen(false)} />
        </>
    );
}
