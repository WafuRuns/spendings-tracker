<script setup lang="ts">
import { Spending } from '../models';

defineProps<{
    modelValue: boolean;
    item?: Spending;
}>();

defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'removeItem'): void;
}>();
</script>
<template>
    <q-dialog
        :model-value="modelValue"
        @hide="$emit('update:modelValue', false)"
    >
        <q-card>
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Confirmation</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
                Do you really want to remove {{ item?.item }} ({{ item?.price }}
                Kč)?
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn
                    flat
                    label="Remove item"
                    color="primary"
                    @click="$emit('removeItem')"
                    v-close-popup
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
