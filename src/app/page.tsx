"use client";

import gsap from "gsap";
import "./css/index.css";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import Image from "next/image";
import { js } from "../../public/assets";

gsap.registerPlugin(TextPlugin);
interface CommandMap {
  play: () => void;
  pause: () => void;
  restart: () => void;
  repeat: () => void;
  reverse: () => void;
}
type Command = keyof CommandMap;

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number>(0);
  const buttonCommands: Command[] = ["play", "pause", "restart", "repeat", "reverse"];

  useGSAP(
    () => {
      const tl = gsap.timeline();
      const commandMap: CommandMap = {
        play: () => tl.play(),
        pause: () => tl.pause(),
        restart: () => tl.restart(),
        repeat: () => tl.repeat(),
        reverse: () => tl.reverse(),
      };

      tl.from(".jsOne", {
        y: 100,
        duration: 3,
      }).from(".jsTwo", { y: 100, duration: 2 });

      gsap.to(".text", {
        duration: 2,
        text: {
          value: "Hello World!",
          delimiter: "",
        },
        ease: "none",
      });
      buttonCommands.forEach((item) => {
        document.getElementById(item)?.addEventListener("click", () => commandMap[item]());
      });
    },
    { scope: container, dependencies: [count], revertOnUpdate: true }
  );
  return (
    <div className="main_container">
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {buttonCommands.map((button, i) => (
        <button id={button}>{button}</button>
      ))}
      <div className="textContainer">
        <h1>New next app</h1>
        <div className="trial" ref={container}>
          <p className="text"></p>
          <Image src={js} width={100} height={100} alt="svg_image" className="jsOne" />
          <Image src={js} width={100} height={100} alt="svg_image" className="jsTwo" />
        </div>
      </div>
    </div>
  );
}
