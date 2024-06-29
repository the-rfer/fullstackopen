const Course = ({ courses }) => {
	return courses.map((course) => {
		return (
			<div key={course.id}>
				<Header name={course.name} />
				<Content parts={course.parts} />
				<Total parts={course.parts} />
			</div>
		);
	});
};

export default Course;

const Header = ({ name }) => {
	return <h1>{name}</h1>;
};

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map((part) => {
				return <Part part={part} key={part.id} />;
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
	const total = parts.reduce(
		(accumulator, currentPart) => accumulator + currentPart.exercises,
		0
	);

	return (
		<p>
			<b>Number of exercises {total}.</b>
		</p>
	);
};
