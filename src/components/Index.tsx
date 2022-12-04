import React, { useEffect, useState, KeyboardEvent, FC } from "react";
import _sample from "lodash/sample";
import _round from "lodash/round";

import ConfettiSplash from "./ConfettiSplash";
import LettersCount from "./LettersCount";
import Status from "./Status";
import Victory from "./Victory";
//@ts-ignore
import quotes from "../data/quotes.json";

import "./index.scss";

const returnQuoteLetters = (quote: string) =>
  quote.replace(/s/g, "").split("_").join("");
const generateQuote = () => _sample(quotes);

const Index = () => {
  const [confetti, setConfetti] = useState(false);
  const [start, setStart] = useState<boolean>();
  const [victory, setVictory] = useState(0);
  const [quote, setQuote] = useState(generateQuote);
  const quoteLetters = returnQuoteLetters(quote);
  const [counter, setCounter] = useState(_round(quoteLetters.length / 2));

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      const { key } = event;
      const underscore = "_";
      const space = " ";

      if (key !== underscore && key !== space) {
        setQuote(quote.replace(key, underscore));
      }
    };
    //@ts-ignore
    window.addEventListener("keydown", keyDownHandler, false);
    //@ts-ignore
    return () => window.removeEventListener("keydown", keyDownHandler, false);
  }, [quote]);

  useEffect(() => {
    const timer =
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);

    if (counter === 0) {
      setStart(false);
    }
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    if (!quoteLetters) {
      const newQuote = generateQuote();
      setVictory(victory + 1);
      setConfetti(true);
      setQuote(newQuote);
      setCounter(_round(returnQuoteLetters(newQuote).length / 2));
      console.log("You win");
      setTimeout(() => setConfetti(false), 4000);
    }
  }, [victory, quote]);

  useEffect(() => {
    if (start) {
      const newQuote = generateQuote();
      setVictory(0);
      setQuote(newQuote);
      setCounter(_round(returnQuoteLetters(newQuote).length / 2));
    }
  }, [start]);

  return (
    <>
      <ConfettiSplash confetti={confetti} />
      <div className="section-quote">
        <div className="wrapper">
          {start ? (
            <>
              <div className="timer">Таймер:{counter}</div>
              <h1>{quote}</h1>
              <div className="info-wrapper">
                <LettersCount quoteLetters={quoteLetters} />
                <Victory victory={victory} />
              </div>
            </>
          ) : (
            <Status start={start} setStart={setStart} />
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
