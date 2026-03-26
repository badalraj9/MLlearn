import { useState, useCallback } from "react";
import type { QuizQuestion } from "@/types";

interface QuizWidgetProps {
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

export default function QuizWidget({ questions, onComplete }: QuizWidgetProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleAnswer = useCallback(
    (idx: number) => {
      if (answered) return;
      setSelected(idx);
      setAnswered(true);
      if (idx === q.correctIndex) {
        setScore((s) => s + 1);
      }
    },
    [answered, q.correctIndex],
  );

  const handleNext = useCallback(() => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
      onComplete?.(
        score + (selected === q.correctIndex ? 0 : 0),
        questions.length,
      );
    }
  }, [current, questions.length, onComplete, score, selected, q.correctIndex]);

  if (questions.length === 0) return null;

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <span className="playground-badge">📝 Quiz Complete</span>
        </div>
        <div className="quiz-result">
          <div className="quiz-result-score">{pct}%</div>
          <p>
            You got <strong>{score}</strong> out of{" "}
            <strong>{questions.length}</strong> correct
          </p>
          {pct >= 80 && <div className="quiz-result-badge">🏆 Great job!</div>}
          {pct >= 50 && pct < 80 && (
            <div className="quiz-result-badge">💪 Keep practicing!</div>
          )}
          {pct < 50 && (
            <div className="quiz-result-badge">📖 Review the material</div>
          )}
          <button
            className="btn-secondary"
            onClick={() => {
              setCurrent(0);
              setSelected(null);
              setAnswered(false);
              setScore(0);
              setFinished(false);
            }}
          >
            Retry Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <span className="playground-badge">📝 Quiz</span>
        <span className="equation-stepper-count">
          {current + 1} / {questions.length}
        </span>
      </div>

      <div className="quiz-question">{q.question}</div>

      <div className="quiz-options">
        {q.options.map((opt, i) => {
          let cls = "quiz-option";
          if (answered) {
            if (i === q.correctIndex) cls += " quiz-option--correct";
            else if (i === selected) cls += " quiz-option--wrong";
          } else if (i === selected) {
            cls += " quiz-option--selected";
          }
          return (
            <button key={i} className={cls} onClick={() => handleAnswer(i)}>
              <span className="quiz-option-letter">
                {String.fromCharCode(65 + i)}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="quiz-explanation">
          <strong>
            {selected === q.correctIndex ? "✅ Correct!" : "❌ Incorrect."}
          </strong>{" "}
          {q.explanation}
        </div>
      )}

      {answered && (
        <button className="btn-primary" onClick={handleNext}>
          {current < questions.length - 1 ? "Next Question →" : "See Results"}
        </button>
      )}
    </div>
  );
}
