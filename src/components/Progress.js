export default function Progress({ index, total, points, possiblePoints, answer }) {
    return (
        <header className="progress">
            <progress max={total} value={index + Number(answer !== null)} />
            <p>

                Question<strong> {index + 1} </strong>/ {total} Questions
            </p>
            <p>
                <strong>Points: {points}</strong>/{possiblePoints}
            </p>
        </header>
    );
}
