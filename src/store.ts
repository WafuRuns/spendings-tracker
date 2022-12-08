import { defineStore } from 'pinia';
import { ref } from 'vue';
import { User } from 'firebase/auth';

export const useLoginStore = defineStore(
    'login',
    () => {
        const user = ref<User | null>(null);
        const loggedIn = ref<boolean>(false);

        const setUser = (newUser: User | null) => {
            user.value = newUser;
        };

        const setLoggedIn = (newLoggedIn: boolean) => {
            loggedIn.value = newLoggedIn;
        };

        return { user, loggedIn, setUser, setLoggedIn };
    },
    {
        persist: {
            enabled: true,
        },
    }
);
