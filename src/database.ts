import { uuidv4 } from '@firebase/util';
import { ref, onValue, set, remove, get, child } from 'firebase/database';
import { database } from './firebase.config';
import { Money } from './models';

export const writeItem = (id: string, item: string, price: number) => {
    set(ref(database, 'items/' + id), {
        item: item,
        price: price,
    });
};

export const readMoney = async (): Promise<Money> => {
    let money: Money = { monthlyIncome: 0, monthlySpendings: 0 };
    await get(ref(database, 'money/'))
        .then((snapshot) => {
            const data = snapshot.val();
            money = {
                monthlyIncome: data.monthlyIncome,
                monthlySpendings: data.monthlySpendings,
            };
        })
        .catch((error) => {
            console.error(error);
        });
    return money;
};

export const deleteItem = (id: string) => {
    remove(ref(database, 'items/' + id));
};

export const itemsRef = ref(database, 'items/');
