import { useEffect, useState } from "react";
import "./Typewriter.css"
import { homeRow, leftHand } from "./keyboardSectionAssignment.ts";
import keyboardSectionAssignment from "./keyboardSectionAssignment.ts";

type TypewriterProps = {
  text?: string;
  speed?: number;
  baseDelay?: number;
  pauseTime?: number;
  sameLetterAffinity?: number;
  complex?: boolean
};

function getKeyboardCoordinate(key: string): Array<number> {
  return keyboardSectionAssignment[key as keyof typeof keyboardSectionAssignment] ?? undefined;
}

const Typewriter: React.FC<TypewriterProps> = ({ text = "", speed = 50, baseDelay = 50, pauseTime = 400, sameLetterAffinity = .8, complex = false }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [leftHandRow, setLeftHandRow] = useState<number>(homeRow);
  const [rightHandRow, setRightHandRow] = useState<number>(homeRow);
  const [textIndex, setTextIndex] = useState<number>(0);
  const hand = 0, row = 1;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let nextCharacter = text[textIndex];
    let lastCharacter = text[textIndex - 1]
    if (nextCharacter !== undefined) {
      let sequenceSpeed = lastCharacter === "," ? pauseTime : speed;
      let nextKey = getKeyboardCoordinate(nextCharacter.toLowerCase());
      if (nextKey && complex) {
        let delay = baseDelay;
        if (nextKey[hand] === leftHand) {
          setLeftHandRow(nextKey[row]);
          delay *= (Math.abs(leftHandRow - nextKey[row]) + 1) / 3;
        } else {
          setRightHandRow(nextKey[row])
          delay *= (Math.abs(rightHandRow - nextKey[row]) + 1) / 3;
        }
        sequenceSpeed += delay
        if (lastCharacter === nextCharacter) {
          sequenceSpeed /= sameLetterAffinity;
        }
      }
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      }, sequenceSpeed);
    }
    return () => clearTimeout(timeout);
  }, [textIndex]);

  useEffect(() => {
    setTextIndex(0);
    setDisplayedText("")
  }, [text, complex, speed])

  return <div className="typewriter">
    {displayedText.split("").map((letter) => <span className="fade-in-letter">{letter}</span>)}
    <span className={"cursor" + (textIndex === text.length ? " blink" : "")}>|</span>
  </div>
};

export default Typewriter;