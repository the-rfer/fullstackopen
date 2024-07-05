import axios from 'axios';

const BASE_URL = '/api/persons';

const createContact = (contact) => axios.post(BASE_URL, contact);

const retrieveContacts = () => axios.get(BASE_URL);

const deleteContact = (id) => axios.delete(`${BASE_URL}/${id}`);

const updateContact = (id, contact) => axios.put(`${BASE_URL}/${id}`, contact);

export default {
    createContact,
    retrieveContacts,
    deleteContact,
    updateContact,
};
