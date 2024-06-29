import { useState } from "react";

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<>
			<h1>Give Feedback</h1>
			<Button setter={setBad} value={bad} text='Bad' />
			<Button setter={setNeutral} value={neutral} text='Neutral' />
			<Button setter={setGood} value={good} text='Good' />
			<table>
				<tbody>
					<Statistics good={good} neutral={neutral} bad={bad} />
					<Metrics good={good} neutral={neutral} bad={bad} />
				</tbody>
			</table>
		</>
	);
};

export default App;

const Button = ({ setter, value, text }) => {
	return <button onClick={() => setter(value + 1)}> {text} </button>;
};

const Statistics = ({ good, neutral, bad }) => {
	return (
		<>
			<tr>
				<td>
					<h1>Statistics</h1>
				</td>
			</tr>
			<Statistic text='Good' value={good} />
			<Statistic text='Neutral' value={neutral} />
			<Statistic text='Bad' value={bad} />
		</>
	);
};

const Statistic = ({ text, value }) => {
	return (
		<tr>
			<td>{text}:</td>
			<td>{value}</td>
		</tr>
	);
};

const Metrics = ({ good, neutral, bad }) => {
	const total = good + neutral + bad;
	const average = ((good - bad) / (good + neutral + bad)).toFixed(2);
	const positive = ((good * 100) / (good + neutral + bad)).toFixed(2);

	return (
		<>
			<tr>
				<td>
					<h3>Aditional stats:</h3>
				</td>
			</tr>

			{total > 0 ? (
				<>
					<tr>
						<td>Total votes:</td>
						<td>{total}</td>
					</tr>
					<tr>
						<td>Average:</td>
						<td>{average}</td>
					</tr>
					<tr>
						<td>Positive:</td>
						<td>{positive}%</td>
					</tr>
				</>
			) : (
				<tr>
					<td>There is no feedback on record.</td>
				</tr>
			)}
		</>
	);
};
