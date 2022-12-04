import React, { FC } from "react";

type StatusType = {
  start: boolean | undefined;
  setStart: (value: boolean) => void;
};

const Status = ({ start, setStart }: StatusType) => (
  <>
    <h1>
      {typeof start === "undefined"
        ? `⏱ Цель игры, как можно быстрее напечатать буквы и
                знаки, кроме пробелов, чтобы уложиться в таймер.`
        : `🥺 Вы проиграли.`}
    </h1>
    <div className="start-btn-wrapper">
      <button onClick={() => setStart(true)}>Старт</button>
    </div>
  </>
);

export default Status;
