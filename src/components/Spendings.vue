<script setup lang="ts">
import { uuidv4 } from '@firebase/util';
import { onValue } from 'firebase/database';
import { ref } from 'vue';
import { deleteItem, itemsRef, writeItem } from '../database';
import { Spending } from '../models';
import ConfirmationDialog from './ConfirmationDialog.vue';

const spendings = ref<Spending[]>([]);
const item = ref<string>('');
const price = ref<number>(0);
const confirmation = ref<boolean>(false);
const itemToRemove = ref<Spending>();

const addItem = () => {
    writeItem(uuidv4(), item.value, price.value);
};

const removeItem = () => {
    if (itemToRemove.value) {
        deleteItem(itemToRemove.value.id);
    }
};

const openRemoveItemDialog = (index: number) => {
    itemToRemove.value = spendings.value[index];
    confirmation.value = true;
};

onValue(itemsRef, (snapshot) => {
    let totalCost: number = 0;
    const newSpendings: Spending[] = [];
    snapshot.forEach((value) => {
        const data = value.val();
        if (value.key) {
            newSpendings.push({
                id: value.key,
                item: data.item,
                price: data.price,
            });
            totalCost += Number(data.price);
        }
    });
    emit('updateTotalCost', totalCost);
    spendings.value = newSpendings;
});

const emit = defineEmits<{
    (e: 'updateTotalCost', totalCost: number): void;
}>();
</script>
<template>
    <confirmation-dialog
        v-model="confirmation"
        :item="itemToRemove"
        @remove-Item="removeItem"
    />
    <q-card>
        <q-card-section>
            <q-list bordered separator>
                <q-item
                    clickable
                    v-ripple
                    v-for="(spending, index) in spendings"
                    @click="openRemoveItemDialog(index)"
                >
                    <q-item-section>{{ spending.item }}</q-item-section>
                    <q-item-section side
                        >{{ spending.price }} Kč</q-item-section
                    >
                </q-item>
            </q-list>
            <div class="row q-col-gutter-sm q-mt-sm items-center">
                <div class="col-md-5 col-12">
                    <q-input v-model="item" label="Item" />
                </div>
                <div class="col-md-4 col-12">
                    <q-input v-model="price" label="Price" type="number" />
                </div>
                <div class="col-md-3 col-12">
                    <q-btn
                        class="full-width"
                        color="primary"
                        label="Add Item"
                        @click="addItem"
                    />
                </div>
            </div>
        </q-card-section>
    </q-card>
</template>
