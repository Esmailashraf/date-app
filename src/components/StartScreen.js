export default function StartScreen({ questionsCount, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the Quiz</h2>
      <h3>
        This is a quiz app that will consist of {questionsCount} questions to test your knowledge on various topics. Click the button below to start the quiz.
      </h3>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "START_QUIZ" })}>
        Start Quiz
      </button>
    </div>
  );
}