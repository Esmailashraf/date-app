import Header from "./Header";
import Main from "./Main";
import { useEffect, useReducer } from "react";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
const initialState = { questions: [], status: "loading", index: 0, answer: null, points: 0, highScore: 0 ,secondsremaining: 30};
function reducer(state, action) {
  switch (action.type) {
    case "SET_QUESTIONS":
      return { ...state, questions: action.payload, status: "ready" };
    case "SET_ERROR":
      return { ...state, status: "error" };
    case "START_QUIZ":
      return { ...state, status: "active" , secondsremaining: state.questions.length * 30};
    case "SELECT_ANSWER":
      const question = state.questions.at(state.index);
      return {
        ...state, answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points
      };
    case "NEXT_QUESTION":
      return { ...state, index: state.index + 1, answer: null };
    case "FINISH_QUIZ":
      return { ...state, status: "finished", highScore: state.points > state.highScore ? state.points : state.highScore };
    case "RESTART":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "DECREMENT_TIMER":
      return { ...state, secondsremaining: state.secondsremaining - 1 };
    default:
      throw new Error("Unknown action type");
  }
}
export default function App() {

  const [{ questions, status, index, answer, points, highScore, secondsremaining }, dispatch] = useReducer(reducer, initialState);
  var questionsCount = questions.length;

  useEffect(function () {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((questions) => {
        dispatch({ type: "SET_QUESTIONS", payload: questions });
      }).catch((err) => {
        dispatch({ type: "SET_ERROR" });
      });
  }, []);
  const possiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && console.error("Error occurred while fetching questions") && <Error />}
        {status === "ready" && <StartScreen questionsCount={questionsCount} dispatch={dispatch} />}
        {status === "active" && <>
          <Progress index={index}
            total={questionsCount}
            points={points} possiblePoints={possiblePoints}
            answer={answer} />
          <Question question={questions[index]} answer={answer} dispatch={dispatch} />
          <NextButton dispatch={dispatch} answer={answer} questionsCount={questionsCount} index={index} />
        </>
        }
        {status === "finished" && <FinishScreen points={points} possiblePoints={possiblePoints} highScore={highScore} dispatch={dispatch} />}
      </Main>
      <Footer>
        <Timer secondsremaining={secondsremaining} dispatch={dispatch} />
      </Footer>

    </div>
  );
}
