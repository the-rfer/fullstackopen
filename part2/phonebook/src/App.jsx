import { useState, useEffect } from 'react';
import Contacts from './api/Contacts';
import Numbers from './components/Numbers';
import ContactForm from './components/ContactForm';
import Search from './components/Search';
import Notification from './components/Notification';
import './index.css';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [search, setSearch] = useState('');
    const [filteredResults, setFilteredResults] = useState(persons);
    const [status, setStatus] = useState({
        display: false,
        message: '',
        type: 'error',
    });

    const updateStatus = (message, type) => {
        setStatus({
            ...status,
            display: true,
            message: message,
            type: type,
        });
        setTimeout(
            () =>
                setStatus({
                    ...status,
                    display: false,
                    message: '',
                }),
            3000
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // prevent empty entries
        if (newName === '' || newNumber === '') {
            alert('Please enter a name and a number');
            return;
        }

        // prevent duplicate entries
        if (
            persons.some(
                (person) =>
                    person.name === newName && person.number === newNumber
            )
        ) {
            alert(`${newName} is already in the phonebook`);
            return;
        }

        // prevent duplicate numbers for different contacts
        if (
            persons.some(
                (person) =>
                    person.name !== newName && person.number === newNumber
            )
        ) {
            alert(
                `${newNumber} is already in the phonebook for a different contact`
            );
            return;
        }

        // verify if user wants to update new phone number to existing contact
        if (
            persons.some(
                (person) =>
                    person.name === newName && person.number !== newNumber
            )
        ) {
            if (
                window.confirm(
                    `${newName} is already a contact. Do you wish to update the number to ${newNumber}?`
                )
            ) {
                const contactToUpdate = persons.find(
                    (person) => person.name === newName
                );

                const updatedContact = {
                    ...contactToUpdate,
                    number: newNumber,
                };

                Contacts.updateContact(updatedContact.id, updatedContact)
                    .then(() => {
                        const updatedContactList = persons.map((person) =>
                            person.id === updatedContact.id
                                ? updatedContact
                                : person
                        );

                        setPersons(updatedContactList);
                        setFilteredResults(updatedContactList);
                        setNewName('');
                        setNewNumber('');
                        updateStatus(
                            `Updated ${newName}'s contact number`,
                            'success'
                        );
                    })
                    .catch(() => {
                        updateStatus(
                            `Error updating ${updatedContact.name}'s contact`,
                            'error'
                        );
                    });
            }
            return;
        }

        // previous checks OK, create new contact
        Contacts.createContact({ name: newName, number: newNumber })
            .then((res) => {
                setPersons(persons.concat(res.data));
                setFilteredResults(persons.concat(res.data));
                updateStatus(`Created ${newName}'s contact`, 'success');
                setNewName('');
                setNewNumber('');
            })
            .catch((error) => {
                updateStatus(error.response.data.error, 'error');
                return;
            });
    };

    const handleSearch = (e) => {
        let searchValue = e.target.value;
        setSearch(searchValue);

        if (searchValue === '') {
            setFilteredResults(persons);
            return;
        }

        setFilteredResults(
            persons.filter(
                (person) =>
                    person.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    person.number.includes(searchValue)
            )
        );
    };

    const handleDelete = (id) => {
        Contacts.deleteContact(id)
            .then(() => {
                const filteredContacts = persons.filter(
                    (person) => person.id !== id
                );
                setPersons(filteredContacts);
                setFilteredResults(filteredContacts);
            })
            .then(() => {
                let deletedPerson = persons.find((person) => person.id === id);
                updateStatus(
                    `Deleted ${deletedPerson.name}'s contact`,
                    'success'
                );
            })
            .catch(() => {
                let person = persons.find((person) => person.id === id);
                updateStatus(
                    `Error deleting ${person.name}'s contact`,
                    'error'
                );
            });
    };

    useEffect(() => {
        Contacts.retrieveContacts().then((response) => {
            setPersons(response.data);
            setFilteredResults(response.data);
        });
    }, []);

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification status={status} setStatus={setStatus} />
            <Search
                search={search}
                persons={persons}
                setSearch={setSearch}
                handleSearch={handleSearch}
                setFilteredResults={setFilteredResults}
            />

            <ContactForm
                handleSubmit={handleSubmit}
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
            />

            <Numbers
                filteredResults={filteredResults}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default App;
