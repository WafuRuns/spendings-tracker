<script setup lang="ts">
import Spendings from './Spendings.vue';
import Statistics from './Statistics.vue';
import firebaseConfig from '../firebase.config';
import {
    getAuth,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
} from 'firebase/auth';
import { useLoginStore } from '../store';
import { ref } from 'vue';

firebaseConfig;

const store = useLoginStore();
const provider = new GoogleAuthProvider();
const auth = getAuth();

const totalCost = ref<number>(0);

const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            store.setUser(result.user);
            store.setLoggedIn(true);
        })
        .catch((error) => {
            console.error(error);
        });
};

const logoutWithGoogle = () => {
    signOut(auth)
        .then(() => {
            store.setLoggedIn(false);
            store.setUser(null);
        })
        .catch((error) => {
            console.error(error);
        });
};

const updateTotalCost = (value: number) => {
    totalCost.value = value;
};
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title>Spendings Tracker</q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-page-container v-if="store.loggedIn">
            <q-page class="row justify-center q-pa-md">
                <div class="col-md-9 col-12">
                    <div class="row q-col-gutter-lg">
                        <div class="col-md-7 col-12">
                            <spendings @update-total-cost="updateTotalCost" />
                        </div>
                        <div class="col-md-5 col-12">
                            <q-card>
                                <q-card-section>
                                    <div class="row q-col-gutter-lg">
                                        <div class="col-12">
                                            Logged in as
                                            {{ store.user?.displayName }}
                                        </div>
                                        <div class="col-12">
                                            <q-btn
                                                color="primary"
                                                label="Logout"
                                                @click="logoutWithGoogle"
                                            />
                                        </div>
                                        <statistics :total-cost="totalCost" />
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>
                    </div>
                </div>
            </q-page>
        </q-page-container>
        <q-page-container v-else>
            <q-page class="row justify-center q-pa-md">
                <div class="col-md-9 col-12">
                    <div class="row q-col-gutter-lg">
                        <div class="col-12">
                            <q-card>
                                <q-card-section>
                                    <div class="row q-col-gutter-lg">
                                        <div class="col-12">
                                            Login to continue
                                        </div>
                                        <div class="col-12">
                                            <q-btn
                                                color="primary"
                                                label="Login with Google"
                                                @click="loginWithGoogle"
                                            />
                                        </div>
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>
