import {create} from 'zustand';

const useUserStore = create(set => ({
    _id: '',
    isLoggedIn: false,
    email: '',
    name: '',
    about: '',
    avatar: '',
    cohort: '',
    setUserData: userData => set(state => ({...state, ...userData})),
}));

export default useUserStore;
