import useUserStore from '@mesto/mfe/store/userStore';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import * as auth from '@/utils/auth.js';

export default function useSession() {
    const setUserData = useUserStore(state => state.setUserData);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            auth.checkToken(token)
                .then(res => {
                    setUserData({email: res.data.email, isLoggedIn: true});
                    navigate('/');
                })
                .catch(error => {
                    console.error(error);
                    localStorage.removeItem('jwt');
                });
        }
    }, [navigate, setUserData]);
}
