const lowdb = require('lowdb');
const file = require('lowdb/adapters/FileAsync');

let dataBase;
async function connectDB() {

    const adapter = new file('test-db.json');
    dataBase = await lowdb(adapter);
    dataBase.defaults({ users: [], favorites: [], blacklist_tokens: [] }).write();
}

const getConnection = () => dataBase;
module.exports = {
    connectDB,
    getConnection
};