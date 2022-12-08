<script setup lang="ts">
import { computed, ref } from 'vue';
import { readMoney } from '../database';
import { Money } from '../models';

const money = ref<Money>({ monthlyIncome: 0, monthlySpendings: 0 });

const freeMoney = computed(() => {
    return money.value.monthlyIncome - money.value.monthlySpendings;
});

const remainingMoney = computed(() => {
    return freeMoney.value - props.totalCost;
});

const daysUntilPaycheck = () => {
    const date = new Date();
    const paycheckDate = new Date(date.getFullYear(), date.getMonth() + 1, 15);
    return new Date(paycheckDate.getTime() - date.getTime()).getDate();
};

const maxSpending = computed(() => {
    return remainingMoney.value / daysUntilPaycheck();
});

readMoney().then((fetchedMoney) => {
    money.value = fetchedMoney;
});

const props = defineProps<{
    totalCost: number;
}>();
</script>
<template>
    <div class="col-12">
        <span class="text-h4"
            >Monthly income: {{ money.monthlyIncome }} Kč</span
        >
    </div>
    <div class="col-12">
        <span class="text-h4"
            >Monthly spendings: {{ money.monthlySpendings }} Kč</span
        >
    </div>
    <div class="col-12">
        <span class="text-h4">At disposal: {{ freeMoney }} Kč</span>
    </div>
    <div>
        <span class="text-h4">Remaining money: {{ remainingMoney }} Kč</span>
    </div>
    <div>
        <span class="text-h4"
            >Days until paycheck: {{ daysUntilPaycheck() }}</span
        >
    </div>
    <div>
        <span class="text-h4">Max spending per day: {{ maxSpending }}</span>
    </div>
</template>
