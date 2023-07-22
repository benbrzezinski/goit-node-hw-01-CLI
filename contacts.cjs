const { nanoid } = require("nanoid");
const colors = require("colors");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const fileContent = await fs.readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(fileContent);

    return contacts.length ? contacts : "No contacts found".red;
  } catch (err) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);

    return contact
      ? `${colors.green("Contact:")} ${colors.blue(
          JSON.stringify(contact, null, 2)
        )}`
      : "Contact not found".red;
  } catch (err) {
    console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const id = nanoid();
    const contact = { id, name, email, phone };

    if (contact.name && contact.email && contact.phone) {
      contacts.push(contact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

      return `${colors.green("Contact added:")} ${colors.blue(
        JSON.stringify(contact, null, 2)
      )}`;
    } else {
      return "Not enough information to create a contact".red;
    }
  } catch (err) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const i = contacts.findIndex(({ id }) => id === contactId);

    if (i > -1) {
      const contact = contacts[i];
      contacts.splice(i, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

      return `${colors.green("Contact removed:")} ${colors.blue(
        JSON.stringify(contact, null, 2)
      )}`;
    } else {
      return "Contact not found".red;
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
