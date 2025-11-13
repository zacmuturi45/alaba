"use client";

import gsap from "gsap";
import "./css/index.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Image from "next/image";
import { scramble } from "../../public/assets";

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrambleTextPlugin);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        id: "text-scramble",
        defaults: { ease: "none" },
      });

      const cursorTl = gsap.timeline({ repeat: -1 });

      gsap.set("#scramble-text-original", {
        opacity: 0,
      });

      cursorTl
        .to("#scramble-cursor", {
          opacity: 0,
          duration: 0.5,
          ease: "none",
          delay: 0.2,
        })
        .to("#scramble-cursor", {
          opacity: 1,
          duration: 0.5,
          ease: "none",
          delay: 0.2,
        });

      tl.to("#scramble-text-1", {
        scrambleText: {
          text: "Mix it up with ScrambleText.",
          chars: "lowercase",
        },
        duration: 4,
      })
        .to("#scramble-text-2", {
          scrambleText: {
            text: " Animate using characters",
            chars: "XO",
            speed: 0.4,
          },
          duration: 2,
        })
        .to("#scramble-text-3", {
          scrambleText: { text: " numbers,", chars: "0123456789" },
          duration: 2,
        })
        .to("#scramble-text-4", {
          scrambleText: { text: "UPPERCASE", chars: "uppercase", speed: 0.3 },
          duration: 1,
        })
        .to("#scramble-text-5", {
          scrambleText: {
            text: "or lowercase.",
            speed: 0.3,
          },
          duration: 1.5,
        })
        .add(cursorTl);

      window.onclick = () => tl.play(0);
    },
    { scope: container }
  );

  return (
    <div className="main_container" ref={container}>
      {/* <h1>New next app</h1> */}
      <div className="trial">
        <p id="scramble-text-original">
          Mix it up with ScrambleText. Animate <br /> using charactres, numbers, <br /> UPPERCASE or
          lowercase.
        </p>

        <p className="text-scramble__text" aria-hidden="true">
          <span id="scramble-text-1"></span>
          <span id="scramble-text-2"></span>
          <span id="scramble-text-3"></span>
          <span id="scramble-text-4"></span>
          <span id="scramble-text-5"></span>

          <Image
            src={scramble}
            width={30}
            height={30}
            alt="scramble"
            className="img"
            unoptimized
            id="scramble-cursor"
          />
        </p>
      </div>
    </div>
  );
}
