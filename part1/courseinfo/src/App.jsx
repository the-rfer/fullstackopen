const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State of a component",
				exercises: 14,
			},
		],
	};

	return (
		<div>
			<Header course={course} />
			<Content parts={course} />
			<Total parts={course} />
		</div>
	);
};

export default App;

const Header = ({ course }) => {
	return <h1>{course.name}</h1>;
};

const Content = ({ parts }) => {
	return (
		<div>
			{parts.parts.map((part, i) => {
				return <Part part={part} key={i} />;
			})}
		</div>
	);
};

const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

const Total = ({ parts }) => {
	const total = parts.parts.reduce(
		(accumulator, current) => accumulator + current.exercises,
		0
	);

	return <p>Number of exercises {total}</p>;
};
