"use client";

import Image, { StaticImageData } from "next/image";
import React, { useEffect } from "react";
import { alaba1, alaba2, alaba3, alaba4, alaba5, alaba6 } from "../../../../public/assets";
import Link from "next/link";
import { SplitText } from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";
import gsap from "gsap";
import { StaticMetadata } from "next/dist/lib/metadata/types/icons";

gsap.registerPlugin(CustomEase, SplitText);

export default function Preloader() {
  useEffect(() => {
    // Check if fonts loaded
    const checkFontsLoaded = async () => {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      } else {
        // Fallback: wait a bit if Font Loading API is not supported
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    };

    const initAnimations = () => {
      CustomEase.create("hop", "0.9, 0, 0.1, 1");

      const createSplit = (selector: any, type: any, className: any) => {
        return SplitText.create(selector, {
          type: type,
          [type + "Class"]: className,
          mask: type,
        });
      };

      const splitPreloaderHeader = createSplit(".preloader-header", "chars", "char");
      const splitPreloaderCopy = createSplit(".preloader-copy", "lines", "line");
      const splitHeader = createSplit(".header-row h1", "lines", "line");

      const chars = splitPreloaderHeader.chars;
      const lines = splitPreloaderCopy.lines;
      const headerLines = splitHeader.lines;
      const initialChar = chars[0];
      const lastChar = chars[chars.length - 1];

      chars.forEach((char, index) => {
        gsap.set(char, { yPercent: index % 2 === 0 ? -100 : 100 });
      });

      gsap.set(lines, { yPercent: 100 });
      gsap.set(headerLines, { yPercent: 100 });

      const preloaderImages = gsap.utils.toArray(".preloader-images .img");
      const preloaderImagesInner = gsap.utils.toArray(".preloader-images .img img");

      const tl = gsap.timeline({ delay: 0.25 });

      tl.to(".progress-bar", {
        scaleX: 1,
        duration: 4,
        ease: "power3.inOut",
      })
        .set(".progress-bar", { transformOrigin: "right" })
        .to(".progress-bar", { scaleX: 0, duration: 1, ease: "power3.in" });

      preloaderImages.forEach((preloaderImg, index) => {
        const preloader_img = preloaderImg as HTMLImageElement;
        tl.to(
          preloader_img,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "hop",
            delay: index * 0.75,
          },
          "-=5"
        ).set([".preloader-header", ".preloader-copy"], { opacity: 1 }, "<");
      });

      preloaderImagesInner.forEach((preloaderImageInner, index) => {
        const preloaderInner = preloaderImageInner as HTMLImageElement;
        tl.to(
          preloaderInner,
          {
            scale: 1,
            duration: 1.5,
            ease: "hop",
            delay: index * 0.75,
          },
          "-=5.25"
        );
      });

      tl.to(
        lines,
        {
          opacity: 1,
          yPercent: 0,
          duration: 2,
          ease: "circ.inOut",
          stagger: 0.1,
        },
        "-=5.5"
      );

      tl.to(
        chars,
        {
          yPercent: 0,
          duration: 1,
          ease: "hop",
          stagger: 0.025,
        },
        "-=5"
      );

      tl.to(
        ".preloader-images",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          ease: "hop",
        },
        "-=2"
      );

      tl.to(
        lines,
        {
          y: "-125%",
          ease: "hop",
          stagger: 0.1,
        },
        "-=2"
      );

      tl.to(
        chars,
        {
          yPercent: (index) => {
            if (index === 0 || index === chars.length - 1) {
              return 0;
            }
            return index % 2 === 0 ? 100 : -100;
          },
          duration: 1,
          ease: "hop",
          stagger: 0.025,
          delay: 0.5,
          onStart: () => {
            const initialCharMask = initialChar.parentElement;
            const lastCharMask = lastChar.parentElement;

            if (initialChar && initialCharMask?.classList.contains("char-mask")) {
              initialCharMask.style.overflow = "visible";
            }

            if (lastCharMask && lastCharMask.classList.contains("char-mask")) {
              lastCharMask.style.overflow = "visible";
            }

            const viewportWidth = window.innerWidth;
            const centerX = viewportWidth / 2;
            const initialCharRect = initialChar.getBoundingClientRect();
            const lastCharRect = lastChar.getBoundingClientRect();

            gsap.to([initialChar, lastChar], {
              duration: 1,
              ease: "hop",
              delay: 0.5,
              x: (i) => {
                if (i === 0) {
                  return centerX - initialCharRect.left - initialCharRect.width;
                } else {
                  return centerX - lastCharRect.left;
                }
              },
              onComplete: () => {
                gsap.set(".preloader-header", { mixBlendMode: "difference" });
                gsap.to(".preloader-header", {
                  y: "2rem",
                  scale: 0.35,
                  duration: 1.75,
                  ease: "hop",
                });
              },
            });
          },
        },
        "-=2.5"
      );

      tl.to(
        ".preloader",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.75,
          ease: "hop",
        },
        "-=0.5"
      );

      tl.to(
        ".header-row .line",
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
        },
        "-=0.75"
      );

      tl.to(
        ".divider",
        {
          scaleX: 1,
          duration: 1,
          ease: "circ.inOut",
          stagger: 0.1,
        },
        "-=1.5"
      );
    };

    // Wait for fonts, then initialize animations
    checkFontsLoaded().then(() => {
      initAnimations();
    });
  }, []);

  return (
    <div className="preloader-main">
      <div className="preloader">
        <div className="progress-bar"></div>

        <div className="preloader-images">
          <div className="img">
            {" "}
            <Image src={alaba4} width={100} height={100} alt="alaba1" unoptimized />
          </div>
          <div className="img">
            {" "}
            <Image src={alaba2} width={100} height={100} alt="alaba1" unoptimized />
          </div>
          <div className="img">
            {" "}
            <Image src={alaba5} width={100} height={100} alt="alaba1" unoptimized />
          </div>
          <div className="img">
            {" "}
            <Image src={alaba6} width={100} height={100} alt="alaba1" unoptimized />
          </div>
        </div>

        <div className="preloader-copy">
          <p>
            A visual storyteller focused on shaping timeless fashion narratives through bold
            composition and refined tone.
          </p>
        </div>
      </div>

      <div className="preloader-header">
        <Link href={"/"} className="next-link">
          IAN WYG
        </Link>
      </div>
    </div>
  );
}
