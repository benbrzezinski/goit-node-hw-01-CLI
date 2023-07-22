const { Command } = require("commander");
require("colors");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts.cjs");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone")
  .parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.table(contacts);
        break;

      case "get":
        const contact = await getContactById(id);
        console.log(contact);
        break;

      case "add":
        const result = await addContact(name, email, phone);
        console.log(result);
        break;

      case "remove":
        const outcome = await removeContact(id);
        console.log(outcome);
        break;

      default:
        console.warn("Unknown action type".yellow);
    }
  } catch (err) {
    console.error(err.message);
  }
}

invokeAction(argv);
