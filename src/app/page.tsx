"use client";

import gsap from "gsap";
import "./css/index.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { vogue } from "../../public/assets";

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {}, { scope: container });

  return (
    <div className="main_container" ref={container}>
      <Image src={vogue} width={100} height={100} alt="vogue" unoptimized />
    </div>
  );
}
