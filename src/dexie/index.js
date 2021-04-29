import Dexie from 'dexie';

const db = new Dexie('getJackedDb');
db.version(1).stores({
    days: 'id,foodsList,totalNutrients'
});

export default db;
