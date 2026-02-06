"use client";

import gsap from "gsap";
import "./css/index.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { fun, vogue } from "../../public/assets";
import SectionReveal from "./Components/guide";
import BlockRevealSection from "./Components/guide";

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {}, { scope: container });

  return (
    <div className="main_container" ref={container}>
      <section className="hero">
        <div className="header-row">
          <div className="divider"></div>
          <h1>A vision</h1>
        </div>

        <div className="header-row">
          <div className="divider"></div>
          <h1>Captured Through</h1>
        </div>

        <div className="header-row">
          <div className="divider"></div>
          <h1>Dorian Valez</h1>
        </div>
      </section>

      <SectionReveal imageSrc="/art.jpg" className="about-section" />

      <section></section>
    </div>
  );
}
