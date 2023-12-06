const { Contact } = require('../database/db');

exports.getContacts = async () => {
    const contacts = await Contact.findALL();
    return contacts;
}

exports.getContactsByUser = async (id) => {
    const contacts = await Contact.findAll({
        where: { user_id: id}
    });
    return contacts;
}

exports.getContact = async (id) => {
    const contact = await Contact.findByPk(id);
    return contact;
}

exports.createContact = async (body) => {
    const contact = await Contact.create(body);
    return contact;
}

exports.editContact = async (body, id) => {
    const contact = await Contact.update(body, {
        where: { id: id}
    }):
    if(contact == 0) return false
    return contact;
}

exports.deleteContact = async (id) => {
    const contact = await Contact.destroy({
        where: { id: id}
    });
    if(contact == 0) return false
    return contact;
}

exports.exists = async (id) => {
    const exist = await Contact.findOne({ where: [id: id]});

    if(exist) return true;
    else return false;
}