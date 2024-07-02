import { useState, useEffect } from 'react';
import axios from 'axios';
import Numbers from './components/Numbers';
import ContactForm from './components/ContactForm';
import Search from './components/Search';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [search, setSearch] = useState('');
    const [filteredResults, setFilteredResults] = useState(persons);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newName === '' || newNumber === '') {
            alert('Please enter a name and a number');
            return;
        }

        if (persons.some((person) => person.name === newName)) {
            alert(`${newName} is already in the phonebook`);
            return;
        }

        if (persons.some((person) => person.number === newNumber)) {
            alert(`${newNumber} is already in the phonebook`);
            return;
        }

        const newId =
            persons.length > 0
                ? (Math.max(...persons.map((p) => p.id)) + 1).toString()
                : '1';

        const newPerson = { name: newName, number: newNumber, id: newId };

        axios.post('http://localhost:3001/persons', newPerson);

        setPersons(persons.concat(newPerson));
        setFilteredResults(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
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

    useEffect(() => {
        axios.get('http://localhost:3001/persons').then((response) => {
            setPersons(response.data);
            setFilteredResults(response.data);
        });
    }, []);

    return (
        <div>
            <h1>Phonebook</h1>
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

            <Numbers filteredResults={filteredResults} />
        </div>
    );
};

export default App;
