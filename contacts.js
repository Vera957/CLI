const fs = require('fs/promises');

const uniqid = require('uniqid'); 

const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function getDb() {
    const dbRaw = await fs.readFile(contactsPath);
    const db = JSON.parse(dbRaw);
    return db;
}

async function listContacts() {
    const list = await fs.readFile(contactsPath);
    const parsedList = JSON.parse(list);
    console.table(parsedList);
    return parsedList;
}

async function getContactById(contactId) {
    const items = await getDb();
    const finden = items.filter(item => item.id == contactId);
    console.table(finden)
}

async function removeContact(contactId) {
    const items = await getDb()
    const newList = items.filter(item => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newList));
    await listContacts();
}

async function addContact(name, email, phone) {
    const id = uniqid();
    const newItem = { id, name, email, phone };
    const db = await getDb();
    db.push(newItem);
    await fs.writeFile(contactsPath, JSON.stringify(db));
    await listContacts();
}

module.exports = {
    listContacts, 
    getContactById,
    removeContact,
    addContact,
}


