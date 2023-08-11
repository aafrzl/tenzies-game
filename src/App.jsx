import { useEffect, useState } from 'react';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [totalRoll, setTotalRoll] = useState(0);
  const [time, setTime] = useState(0);

  //get score from local storage
  const score = JSON.parse(localStorage.getItem('score'));

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }

    return newDice;
  }

  function holdDice(id) {
    setDice((oldDice) => oldDice.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die)));
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDice();
        })
      );
      setTotalRoll(totalRoll + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setTotalRoll(0);
    }
  }

  useEffect(() => {
    if (tenzies) {
      localStorage.setItem('score', JSON.stringify(totalRoll));
    }
  });

  return (
    <main>
      {tenzies ? <Confetti /> : ''}
      <h1 className="title">{tenzies ? 'You Won!' : 'Tenzies!'}</h1>
      <p className="instructions">
        Roll until all dice are the same number. <br />
        Click each die to freeze it at it's current value between rolls.
      </p>
      <div className="dice-container">
        {dice.map((die) => (
          <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
          />
        ))}
      </div>
      <button
        className="btn"
        onClick={rollDice}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>
      <div className="score-container">
        <p className="current-total-rolls">Total Roll: {totalRoll}</p>
        <p className="record">Last Roll Record: {score}</p>
      </div>
    </main>
  );
}

export default App;
