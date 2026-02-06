import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const BLOCK_SIZE = 160; // Block dimensions

interface ScrollRevealSectionProps {
  imageSrc: string;
  className?: string;
}

export default function ScrollRevealSection({
  imageSrc,
  className = "",
}: ScrollRevealSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const masksContainerRef = useRef<HTMLDivElement>(null);
  const [maskBlocks, setMaskBlocks] = useState<
    Array<{
      x: number;
      y: number;
      delay: number;
      col: number;
      row: number;
    }>
  >([]);

  // Generate perfect grid with random reveal order
  useEffect(() => {
    const generateMaskPositions = () => {
      const gridWidth = window.innerWidth;
      const gridHeight = window.innerHeight;

      // Calculate how many blocks fit perfectly
      const columns = Math.ceil(gridWidth / BLOCK_SIZE);
      const rows = Math.ceil(gridHeight / BLOCK_SIZE);

      // Calculate offset to center the grid if there's remaining space
      const totalGridWidth = columns * BLOCK_SIZE;
      const totalGridHeight = rows * BLOCK_SIZE;
      const offsetX = (gridWidth - totalGridWidth) / 2;
      const offsetY = (gridHeight - totalGridHeight) / 2;

      const blocks: Array<{
        x: number;
        y: number;
        delay: number;
        col: number;
        row: number;
      }> = [];

      // Create a perfect grid
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          blocks.push({
            x: col * BLOCK_SIZE + offsetX,
            y: row * BLOCK_SIZE + offsetY,
            delay: Math.random(), // Random delay for reveal order
            col,
            row,
          });
        }
      }

      // Sort by delay so they appear in random order
      blocks.sort((a, b) => a.delay - b.delay);

      console.log(`Grid: ${columns} columns × ${rows} rows = ${blocks.length} blocks`);
      console.log(`Viewport: ${gridWidth}px × ${gridHeight}px`);
      console.log(`Grid size: ${totalGridWidth}px × ${totalGridHeight}px`);
      console.log(`Offset: ${offsetX}px, ${offsetY}px`);

      setMaskBlocks(blocks);
    };

    generateMaskPositions();
    window.addEventListener("resize", generateMaskPositions);
    return () => window.removeEventListener("resize", generateMaskPositions);
  }, []);

  // Setup scroll-triggered animation
  useEffect(() => {
    if (!sectionRef.current || !masksContainerRef.current || maskBlocks.length === 0) return;

    const maskElements = masksContainerRef.current.querySelectorAll(".reveal-mask");

    // Initially hide all masks (image is hidden)
    gsap.set(maskElements, { opacity: 0 });

    // Create scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: `+=1500px`,
        scrub: 1,
        // markers: true, // Uncomment for debugging
      },
    });

    // Animate masks appearing progressively
    maskBlocks.forEach((block, index) => {
      tl.to(
        maskElements[index],
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        index / maskBlocks.length // Stagger based on position in sorted array
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [maskBlocks]);

  return (
    <div
      ref={sectionRef}
      className={`scroll-reveal-section ${className}`}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Background Image (hidden initially) */}
      <div
        ref={imageRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0,
        }}
      />

      {/* Mask Layer - reveals the image through blocks */}
      <div
        ref={masksContainerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {maskBlocks.map((block, index) => (
          <div
            key={`${block.col}-${block.row}`}
            className="reveal-mask"
            style={{
              position: "absolute",
              left: `${block.x}px`,
              top: `${block.y}px`,
              width: `${BLOCK_SIZE}px`,
              height: `${BLOCK_SIZE}px`,
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: `${window.innerWidth}px ${window.innerHeight}px`,
              backgroundPosition: `-${block.x}px -${block.y}px`,
              opacity: 0,
              // Optional: Add border to visualize grid during development
              // border: '1px solid rgba(255,0,0,0.2)'
            }}
          />
        ))}
      </div>
    </div>
  );
}
