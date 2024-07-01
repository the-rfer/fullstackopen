const ContactForm = ({
	handleSubmit,
	newName,
	setNewName,
	newNumber,
	setNewNumber,
}) => {
	return (
		<>
			<h2>Add a new contact</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<p>
						name:{" "}
						<input
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
						/>
					</p>
					<p>
						number:{" "}
						<input
							value={newNumber}
							onChange={(e) => setNewNumber(e.target.value)}
						/>
					</p>
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
		</>
	);
};
export default ContactForm;
