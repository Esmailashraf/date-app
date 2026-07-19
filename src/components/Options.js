export default function Options({ question, answer, dispatch }) {
    const hasAnswer = answer !== null;
    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button className={`btn btn-option ${answer === index ? "answer" : ""} 
${hasAnswer ? (index === question.correctOption ? "correct" : "wrong") : ""}
                `}
                disabled={hasAnswer}
                    key={index}
                    onClick={() => dispatch({ type: "SELECT_ANSWER", payload: index })}>
                    {option}
                </button>
            ))}
        </div>
    )
}