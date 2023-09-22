import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "assets/images/helmet-1.png", matched: false },
  { src: "assets/images/potion-1.png", matched: false },
  { src: "assets/images/ring-1.png", matched: false },
  { src: "assets/images/scroll-1.png", matched: false },
  { src: "assets/images/shield-1.png", matched: false },
  { src: "assets/images/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setFirstChoice(null);
    setSecondChoice(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        firstChoice.matched = true;
        secondChoice.matched = true;
        console.log("That is a match");
        setCards((prevCards) =>
          prevCards.map((card) => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          })
        );
        resetTurns();
      } else {
        setTimeout(() => {
          resetTurns();
        }, 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  const resetTurns = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  return (
    <div className="app ">
      <h1>Magic Memory</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards &&
          cards.map((card) => (
            <SingleCard
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={
                card === firstChoice ||
                card === secondChoice ||
                card.matched === true
              }
              disabled={disabled}
            />
          ))}
      </div>
      <h3>Turns: {turns}</h3>
    </div>
  );
}

export default App;
