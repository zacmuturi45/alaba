"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GSDevTools } from "../GSAP/gsap_plugins";

export default function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="navbar" ref={containerRef}>
      <div className="navContainer">
        <div className="logo">
          <h4>Carousel</h4>
        </div>

        <div className="nav_time">
          <p>21:30:00 PM (NAIROBI)</p>
        </div>

        <div className="nav_links_container">
          <div className="link_div">
            <Link href={"/"} className="nav_links">
              About
            </Link>
          </div>
          <div className="link_div">
            <Link href={"/"} className="nav_links">
              Work
            </Link>
          </div>
          <div className="link_div">
            <Link href={"/generous"} className="nav_links">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
