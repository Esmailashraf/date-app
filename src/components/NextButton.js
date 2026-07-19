export default function NextButton({ dispatch, answer, questionsCount , index }) {
  if (answer === null) { return null; }
  if (index < questionsCount - 1) return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "NEXT_QUESTION" })}
      disabled={answer === null}
    >
      Next
    </button>
  );
  if (index === questionsCount - 1) return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "FINISH_QUIZ" })}
      disabled={answer === null}
    >
      Finish
    </button>
  );
}
