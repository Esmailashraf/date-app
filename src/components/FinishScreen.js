export default function FinishScreen({ points, possiblePoints, highScore, dispatch }) {
    const percentage = Math.round((points / possiblePoints) * 100);
    let emoji = "😐";

    if (percentage >= 80) {
        emoji = "🎉";
    } else if (percentage >= 60) {
        emoji = "👍";
    } else {
        emoji = "😢";
    }

    return (
        <><p className="result"> <span>{emoji}</span> Points: {points}/{possiblePoints}
            <br />
            Percentage: {percentage}%
        </p>
            <p className="highscore">High Score: {highScore}</p>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "START_QUIZ" })}
            >
                Restart
            </button>
        </>
    );
}