const DeleteIcon = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            width={25}
            height={25}
            color='red'
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
            />
        </svg>
    );
};

const Numbers = ({ filteredResults, handleDelete }) => {
    return (
        <>
            <h2>Contact list</h2>
            {filteredResults.length === 0 && <p>No contacts found.</p>}
            <List
                filteredResults={filteredResults}
                handleDelete={handleDelete}
            />
        </>
    );
};

const List = ({ filteredResults, handleDelete }) => {
    const startDelete = (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            handleDelete(id);
        }
    };
    return (
        <ul>
            {filteredResults.map((person) => (
                <li key={person.name}>
                    {person.name} : {person.number}
                    <span
                        onClick={() => startDelete(person.id, person.name)}
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        <DeleteIcon />
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default Numbers;
