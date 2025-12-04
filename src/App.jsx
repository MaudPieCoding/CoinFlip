import { useState, useTransition } from "react";
import "./App.css";
const audioFlip = new Audio("/coin/coin_sound.wav");
const audioReset01 = new Audio("/coin/reset01.ogg");
const audioReset02 = new Audio("/coin/reset02.ogg");
function App() {
  const [streak, setStreak] = useState(0);
  const [coinSprite, setCoinSprite] = useState("/coin/coin_heads0.png");
  const [coinState, setCoinState] = useState("heads");
  const flip = () => {
    if (coinState == "flipping") {
      return;
    }
    let st = streak;
    if (Math.random() > 0.5) {
      st += 1;
    } else {
      st = 0;
    }
    setCoinSprite("/coin/coin_animation.gif");
    setCoinState("flipping");
    audioFlip.play();

    setTimeout(() => {
      timeFlip(st);
    }, 507);
  };
  const timeFlip = (st) => {
    if (st == 0) {
      setCoinSprite("/coin/coin_tails.png");
      setCoinState("tails");
      if (streak > 2) {
        audioReset01.play();
      }
    } else {
      setCoinSprite(`/coin/coin_heads${Math.min(Math.round(st / 2), 5)}.png`);
      setCoinState("heads");
      const audioHeads = new Audio(`/coin/heads${Math.min(st, 7)}.ogg`);
      audioHeads.play();
    }

    setStreak(st);
  };

  const colorLerp = (color1, color2, st) => {
    let color3;
    color3 = [
      (1 - st) * color1[0] + st * color2[0],
      (1 - st) * color1[1] + st * color2[1],
      (1 - st) * color1[2] + st * color2[2],
    ];
    return color3;
  };

  const defineShake = (st) => {
    if (st > 4 && coinState != "flipping") {
      return 1 / (st * 1.5);
    } else return 0;
  };

  /*   const defineSprite = (st) => {
    return Math.min(Math.round(st / 2), 5);
  }; */

  return (
    <>
      <div
        className="background"
        style={{
          backgroundColor: `rgb(${colorLerp(
            [10, 10, 40],
            [236, 217, 144],
            Math.min(streak / 10, 1)
          )})`,
        }}
      >
        <div>
          <img
            /* onMouseDown={() => {
              if (coinState == "flipping") {
                return;
              }
              setCoinSprite("/coin/coin_click.png");
            }} */
            onClick={() => flip()}
            className="image"
            src={coinSprite}
            alt=""
            style={{
              animation: `horizontal-shaking ${defineShake(streak)}s infinite`,
            }}
          />
        </div>
        <div className="scoreBox">
          <span className="score">{streak}</span>
        </div>
      </div>
    </>
  );
}

export default App;
