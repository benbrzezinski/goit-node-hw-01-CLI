const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, { encoding: "utf8" });
    console.log(contacts);
  } catch (err) {
    console.error(err.message);
  }
}

function getContactById(contactId) {}

function removeContact(contactId) {}

function addContact(name, email, phone) {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
