/// <reference path="./react-shim.d.ts" />
"use client";

import React, { useEffect, useRef, useState } from "react";
import "./birthday.css";

/*
  PERSONALISE THIS PAGE
  Photos: put your photos in public/images/ using the filenames below.
  Birthday song: public/audio/birthday-song.mp3
  Your poem recording: public/audio/poem-recording.mp3
*/

const memories = [
  { src: "/images/memory-01.jpg", alt: "A favourite funny memory together", note: "The kind of day I wish I could live twice.", tag: "THE LAUGHTER" },
  { src: "/images/memory-02.jpg", alt: "A sweet memory together", note: "Some moments become home without us noticing.", tag: "MY FAVOURITE" },
  { src: "/images/memory-03.jpg", alt: "A little adventure together", note: "A little chaos, a lot of happiness.", tag: "OUR LITTLE ADVENTURE" },
  { src: "/images/memory-04.jpg", alt: "A gentle moment together", note: "Even the quiet moments mean everything.", tag: "THE QUIET MAGIC" },
  { src: "/images/memory-05.jpg", alt: "A funny moment together", note: "Still smiling whenever I remember this.", tag: "CAN'T STOP SMILING" },
  { src: "/images/memory-06.jpg", alt: "A special memory together", note: "One picture. A thousand feelings.", tag: "A LITTLE FOREVER" },
];

const reasons = [
  ["01", "Your smile", "It can turn an ordinary day into one I want to remember."],
  ["02", "Your beautiful heart", "The kindness in the little things you do never goes unnoticed."],
  ["03", "Your wonderfully funny side", "You make even the most random moments worth keeping."],
  ["04", "The way you dream", "I hope life gives you every chance to become all you imagine."],
];

function Photo({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`photoPlaceholder ${className}`}>
      {!failed ? <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} /> : null}
      {failed && <div className="photoPlaceholderLabel"><span>✳</span><b>YOUR PHOTO GOES HERE</b><small>{src.replace("/", "")}</small></div>}
    </div>
  );
}

export default function Home() {
  const [candleLit, setCandleLit] = useState(true);
  const [giftOpen, setGiftOpen] = useState(false);
  const songRef = useRef<HTMLAudioElement>(null);
  const hasNotifiedRef = useRef(false);

  function notifyArrival(eventDetail: string) {
    if (hasNotifiedRef.current) return;
    hasNotifiedRef.current = true;
    const url = "https://ntfy.sh/rashmi-surprise-alert-2026?title=Birthday+Surprise+Alert&priority=high&tags=tada,heart,birthday";
    const message = `🎉 She just reached the end of the birthday page! (${eventDetail}) ❤️`;
    try {
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        navigator.sendBeacon(url, message);
      }
    } catch {
      // Silently handled
    }
    try {
      fetch(url, { method: "POST", body: message, mode: "no-cors" }).catch(() => {});
    } catch {
      // Silently handled
    }
  }

  function startBirthdaySong() {
    const song = songRef.current;
    if (!song) return;
    song.volume = 0.55;
    song.loop = true;
    if (song.paused) {
      song.play().catch(() => {});
    }
  }

  useEffect(() => {
    const song = songRef.current;
    if (song) {
      song.loop = true;
      song.addEventListener("ended", () => {
        song.currentTime = 0;
        song.play().catch(() => {});
      });
    }

    startBirthdaySong();

    const ensurePlay = () => startBirthdaySong();
    const interactionEvents = ["pointerdown", "click", "touchstart", "scroll", "keydown", "wheel"];
    interactionEvents.forEach((evt) => window.addEventListener(evt, ensurePlay, { passive: true }));

    const handleVisibility = () => {
      if (!document.hidden) startBirthdaySong();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const interval = setInterval(() => {
      if (songRef.current && songRef.current.paused) {
        startBirthdaySong();
      }
    }, 1200);

    return () => {
      interactionEvents.forEach((evt) => window.removeEventListener(evt, ensurePlay));
      document.removeEventListener("visibilitychange", handleVisibility);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const finalSection = document.querySelector(".finalWish");
    if (!finalSection || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          notifyArrival("Scrolled to Final Wish");
          observer.disconnect();
        }
      });
    }, { threshold: 0.35 });
    observer.observe(finalSection);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="birthdayPage">
      <audio ref={songRef} loop preload="auto" autoPlay playsInline>
        <source src="/audio/birthday-song.mp3" type="audio/mpeg" />
        <source src="/birthday-song.mp3" type="audio/mpeg" />
      </audio>

      {/* 00 / OPENING SCENE */}
      <div className="openingScene openingComplete" id="top">
        <div className="openingStars" aria-hidden="true">✦　·　✧　　·　✦　　✧　·　✦</div>
        <p className="openingOverline">🌹 A LITTLE MOMENT, MADE JUST FOR YOU 🌹</p>

        {/* ARTISAN REALISTIC LUXURY CAKE STAGE */}
        <div className={`cakeStage ${candleLit ? "cakeLit" : ""}`} aria-label="A realistic artisan birthday cake with blooming roses and candle">
          <div className="cakeGlow" />

          <svg className="artisanCakeSvg" viewBox="0 0 340 370" width="100%" height="100%" aria-hidden="true">
            <defs>
              <filter id="cakeSoftShadow" x="-25%" y="-25%" width="150%" height="150%">
                <feDropShadow dx="0" dy="7" stdDeviation="5" flood-color="#000000" flood-opacity="0.55" />
              </filter>
              <filter id="dripShadow" x="-20%" y="-10%" width="140%" height="130%">
                <feDropShadow dx="0" dy="3" stdDeviation="2.5" flood-color="#3d141e" flood-opacity="0.45" />
              </filter>
              <filter id="flameGlowFilter" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient id="pedestalGold" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#fff0dc" />
                <stop offset="25%" stop-color="#ddba8b" />
                <stop offset="60%" stop-color="#9a7147" />
                <stop offset="100%" stop-color="#54371e" />
              </linearGradient>
              <radialGradient id="platterSurface" cx="50%" cy="35%" r="55%">
                <stop offset="0%" stop-color="#fff8f0" />
                <stop offset="60%" stop-color="#ecd9c2" />
                <stop offset="90%" stop-color="#caa784" />
                <stop offset="100%" stop-color="#8c6442" />
              </radialGradient>

              <linearGradient id="tier1Body" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#5e2c38" />
                <stop offset="15%" stop-color="#82424f" />
                <stop offset="38%" stop-color="#b66d7b" />
                <stop offset="50%" stop-color="#d9919e" />
                <stop offset="58%" stop-color="#e8a8b4" />
                <stop offset="75%" stop-color="#c47d8b" />
                <stop offset="90%" stop-color="#7a3a47" />
                <stop offset="100%" stop-color="#52242f" />
              </linearGradient>

              <radialGradient id="tier1Top" cx="48%" cy="40%" r="50%">
                <stop offset="0%" stop-color="#fff6f0" />
                <stop offset="45%" stop-color="#f8ded9" />
                <stop offset="85%" stop-color="#e0b2ab" />
                <stop offset="100%" stop-color="#b57d76" />
              </radialGradient>

              <linearGradient id="tier2Body" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#69323f" />
                <stop offset="16%" stop-color="#914c5b" />
                <stop offset="36%" stop-color="#c57b8a" />
                <stop offset="52%" stop-color="#e5a0ad" />
                <stop offset="60%" stop-color="#f2b4c0" />
                <stop offset="78%" stop-color="#ce8695" />
                <stop offset="92%" stop-color="#833f4e" />
                <stop offset="100%" stop-color="#5c2633" />
              </linearGradient>

              <radialGradient id="tier2Top" cx="50%" cy="48%" r="50%">
                <stop offset="0%" stop-color="#fff8f2" />
                <stop offset="40%" stop-color="#fae3dd" />
                <stop offset="80%" stop-color="#e5b8b1" />
                <stop offset="100%" stop-color="#be857f" />
              </radialGradient>

              <linearGradient id="creamDripGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ffffff" />
                <stop offset="40%" stop-color="#fff3eb" />
                <stop offset="85%" stop-color="#edd2cb" />
                <stop offset="100%" stop-color="#d9b1a8" />
              </linearGradient>

              <linearGradient id="rosePetalDeep" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#e27c91" />
                <stop offset="40%" stop-color="#b83f58" />
                <stop offset="100%" stop-color="#6e192c" />
              </linearGradient>
              <linearGradient id="rosePetalMid" x1="0%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stop-color="#ffb8c7" />
                <stop offset="50%" stop-color="#d95d77" />
                <stop offset="100%" stop-color="#91283e" />
              </linearGradient>
              <linearGradient id="rosePetalLight" x1="0%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stop-color="#fff2f5" />
                <stop offset="35%" stop-color="#fca8b9" />
                <stop offset="100%" stop-color="#c44662" />
              </linearGradient>
              <linearGradient id="roseLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#849b74" />
                <stop offset="45%" stop-color="#4e6d42" />
                <stop offset="100%" stop-color="#263b20" />
              </linearGradient>

              <linearGradient id="candleWax" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#ded4c8" />
                <stop offset="25%" stop-color="#fbf8f2" />
                <stop offset="55%" stop-color="#ffffff" />
                <stop offset="82%" stop-color="#eee2d5" />
                <stop offset="100%" stop-color="#cbbbae" />
              </linearGradient>

              <radialGradient id="flameCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#ffffff" />
                <stop offset="60%" stop-color="#fff5cc" />
                <stop offset="100%" stop-color="#ffd54f" />
              </radialGradient>
              <radialGradient id="flameOuter" cx="50%" cy="80%" r="65%">
                <stop offset="0%" stop-color="#3b72ff" stop-opacity="0.95" />
                <stop offset="15%" stop-color="#ffdd55" />
                <stop offset="45%" stop-color="#ff8c1a" />
                <stop offset="80%" stop-color="#f53d10" stop-opacity="0.85" />
                <stop offset="100%" stop-color="#d01804" stop-opacity="0" />
              </radialGradient>
            </defs>

            <ellipse cx="170" cy="335" rx="145" ry="16" fill="#000000" opacity="0.65" filter="url(#cakeSoftShadow)" />
            <path d="M 120 316 C 120 326 220 326 220 316 L 210 298 C 210 298 130 298 130 298 Z" fill="url(#pedestalGold)" />
            <path d="M 152 284 L 148 298 C 148 300 192 300 192 298 L 188 284 Z" fill="#6d4625" />
            <ellipse cx="170" cy="284" rx="140" ry="20" fill="url(#pedestalGold)" filter="url(#cakeSoftShadow)" />
            <ellipse cx="170" cy="281" rx="136" ry="17" fill="url(#platterSurface)" />
            <ellipse cx="170" cy="280" rx="132" ry="15" fill="none" stroke="#fff4e6" stroke-width="1.2" opacity="0.6" />

            <g className="tierGroup tierBottom">
              <path d="M 50 185 L 50 248 C 50 274 290 274 290 248 L 290 185 Z" fill="url(#tier1Body)" />

              <path d="M 58 190 C 85 220 100 240 120 258" stroke="#ffffff" stroke-width="1.5" opacity="0.15" fill="none" />
              <path d="M 160 188 C 168 215 170 238 172 260" stroke="#ffffff" stroke-width="2.5" opacity="0.25" fill="none" />

              <path d="M 50 248 C 50 273 290 273 290 248" fill="none" stroke="#fff4eb" stroke-width="6.5" stroke-linecap="round" stroke-dasharray="0.1 11" opacity="0.95" filter="url(#cakeSoftShadow)" />
              <path d="M 50 248 C 50 273 290 273 290 248" fill="none" stroke="#cca175" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 11" opacity="0.45" />

              <ellipse cx="170" cy="185" rx="120" ry="19" fill="url(#tier1Top)" />
              <ellipse cx="170" cy="184" rx="118" ry="17.5" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.4" />

              {/* Real Patisserie Cream Drips on Tier 1 */}
              <path d="M 50 185 
                       C 55 195 62 205 68 205 C 74 205 78 192 84 192 
                       C 90 192 96 215 104 215 C 112 215 116 195 124 195 
                       C 132 195 138 218 148 218 C 158 218 164 195 174 195 
                       C 184 195 190 220 198 220 C 206 220 212 196 220 196 
                       C 228 196 236 216 244 216 C 252 216 258 194 266 194 
                       C 274 194 282 206 290 185
                       C 290 185 50 185 50 185 Z"
                fill="url(#creamDripGrad)" filter="url(#dripShadow)" />
            </g>

            <g className="tierGroup tierTop">
              <path d="M 85 110 L 85 162 C 85 184 255 184 255 162 L 255 110 Z" fill="url(#tier2Body)" />

              <path d="M 85 162 C 85 183 255 183 255 162" fill="none" stroke="#fff4eb" stroke-width="5.5" stroke-linecap="round" stroke-dasharray="0.1 9.5" opacity="0.95" filter="url(#cakeSoftShadow)" />
              <path d="M 85 162 C 85 183 255 183 255 162" fill="none" stroke="#cca175" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="0.1 9.5" opacity="0.45" />

              <ellipse cx="170" cy="110" rx="85" ry="15" fill="url(#tier2Top)" className="tier2Crown" />
              <ellipse cx="170" cy="109" rx="83" ry="14" fill="none" stroke="#ffffff" stroke-width="1.2" opacity="0.4" />

              {/* Real Patisserie Cream Drips on Tier 2 */}
              <path d="M 85 110 
                       C 90 120 95 130 102 130 C 108 130 112 118 118 118 
                       C 124 118 130 135 138 135 C 146 135 150 118 158 118 
                       C 166 118 172 138 180 138 C 188 138 194 120 202 120 
                       C 210 120 216 134 224 134 C 232 134 238 116 244 116 
                       C 248 116 252 124 255 110 
                       C 255 110 85 110 85 110 Z"
                fill="url(#creamDripGrad)" filter="url(#dripShadow)" />

              {/* Buttercream Rosettes along top rim */}
              <g className="frostingRosettes" fill="#ffffff" opacity="0.85">
                <ellipse cx="94" cy="112" rx="4" ry="2.5" />
                <ellipse cx="114" cy="116" rx="4" ry="2.5" />
                <ellipse cx="138" cy="120" rx="4.5" ry="2.5" />
                <ellipse cx="162" cy="122" rx="5" ry="2.8" />
                <ellipse cx="186" cy="122" rx="5" ry="2.8" />
                <ellipse cx="210" cy="120" rx="4.5" ry="2.5" />
                <ellipse cx="232" cy="116" rx="4" ry="2.5" />
                <ellipse cx="248" cy="112" rx="4" ry="2.5" />
              </g>
            </g>

            <circle cx="152" cy="115" r="1.5" fill="#ffd700" opacity="0.8" />
            <circle cx="186" cy="112" r="1.8" fill="#ffd700" opacity="0.9" />
            <circle cx="105" cy="190" r="2" fill="#ffd700" opacity="0.75" />
            <circle cx="218" cy="192" r="1.6" fill="#ffd700" opacity="0.85" />

            <g className="candleGroup" transform="translate(170, 102)">
              <ellipse cx="0" cy="0" rx="6" ry="2.5" fill="#7a3a47" opacity="0.6" />
              <path d="M -4.5 0 L -3.5 -54 C -3.5 -55 3.5 -55 3.5 -54 L 4.5 0 Z" fill="url(#candleWax)" />
              <ellipse cx="0" cy="-54" rx="3.5" ry="1.4" fill="#fffaf2" />
              <path d="M 3.5 -52 C 4.5 -48 4.2 -42 4.6 -36 C 4.8 -34 3.8 -34 3.7 -36 C 3.5 -42 3.8 -48 3.5 -52 Z" fill="#ffffff" opacity="0.7" />
              {/* Candle Wick */}
              <path d="M 0 -54 C -0.4 -58 -0.8 -62 -0.8 -66" stroke="#2b1c1d" stroke-width="1.6" stroke-linecap="round" fill="none" />
              <circle cx="-0.8" cy="-66" r="1.5" fill="#ff5500" className="candleEmber" />

              {/* THE FLAME FIRMLY ANCHORED ON THE WICK TIP */}
              <g className="flameAnchor" transform="translate(-0.8, -66)">
                <g className="candleFlameWrapper">
                  <g className="candleFlame">
                    <path d="M 0 0 C -8 -7 -10 -22 0 -35 C 10 -22 8 -7 0 0 Z" fill="url(#flameOuter)" filter="url(#flameGlowFilter)" className="flameAuraShape" />
                    <path d="M 0 -1 C -5 -6 -5 -16 0 -26 C 5 -16 5 -6 0 -1 Z" fill="url(#flameCore)" className="flameCoreShape" />
                    <ellipse cx="0" cy="-9" rx="2" ry="5.5" fill="#ffffff" className="flameCenter" />
                  </g>
                </g>
              </g>
            </g>
          </svg>

          <div className="cakeSpark sparkA">✧</div>
          <div className="cakeSpark sparkB">✦</div>
          <div className="cakeSpark sparkC">✧</div>
        </div>

        <div className="openingGreeting">
          <p className="tinyKicker">TODAY, THE WORLD CELEBRATES YOU</p>
          <h1>Happy Birthday,<br /><em>my favourite person.</em></h1>
        </div>


        <div className="openingBottom">NOVEMBER 09 · A DAY I LOVE</div>
      </div>

      <section className="storyIntro" id="our-story" data-reveal>
        <div className="sectionRoseIcon">🌹</div>
        <p className="chapterNo">A LITTLE STORY</p>
        <h2>Some people make<br />ordinary days <em>golden.</em></h2>
        <p className="introCopy">And somehow, you became one of the most beautiful parts of mine. This is a little collection of moments, feelings, and all the things I don't always say out loud.</p>
        <div className="handwrittenNote">for you, with all my heart <span>♡</span></div>
      </section>

      <section className="memoryChapter" id="memories">
        <div className="chapterHeader" data-reveal>
          <div className="sectionRoseIcon">🌹</div>
          <p className="chapterNo">THE MEMORIES</p>
          <h2>Little moments.<br /><em>Endless meaning.</em></h2>
          <p>Funny, sweet, silly, gentle — every version of us is worth remembering.</p>
        </div>
        <div className="memoryStream">
          <article className="memoryItem memoryOne" data-reveal><Photo src={memories[0].src} alt={memories[0].alt} className="photoTall" /><div className="memoryCaption"><span>{memories[0].tag}</span><p>{memories[0].note}</p></div></article>
          <article className="memoryItem memoryTwo" data-reveal><div className="memoryCaption"><span>{memories[1].tag}</span><p>{memories[1].note}</p></div><Photo src={memories[1].src} alt={memories[1].alt} className="photoSquare" /></article>
          <div className="memoryInterlude" data-reveal><span>🌹</span><p>Not every favourite memory is a big adventure. Sometimes it's just being silly together.</p></div>
          <article className="memoryItem memoryThree" data-reveal><Photo src={memories[2].src} alt={memories[2].alt} className="photoWide" /><div className="memoryCaption"><span>{memories[2].tag}</span><p>{memories[2].note}</p></div></article>
          <div className="memoryPair" data-reveal><article><Photo src={memories[3].src} alt={memories[3].alt} className="photoSquare" /><div className="memoryCaption"><span>{memories[3].tag}</span><p>{memories[3].note}</p></div></article><article><Photo src={memories[4].src} alt={memories[4].alt} className="photoSquare" /><div className="memoryCaption"><span>{memories[4].tag}</span><p>{memories[4].note}</p></div></article></div>
          <article className="memoryItem memorySix" data-reveal><div className="memoryCaption"><span>{memories[5].tag}</span><p>{memories[5].note}</p></div><Photo src={memories[5].src} alt={memories[5].alt} className="photoTall" /></article>
        </div>
      </section>

      <section className="loveReasons" data-reveal>
        <div className="sectionRoseIcon">🌹</div>
        <p className="chapterNo">IN CASE I DON'T SAY IT ENOUGH</p>
        <h2>Things I adore<br /><em>about you.</em></h2>
        <div className="reasonList">{reasons.map(([number, title, text]) => <article className="reasonLine" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><b>♡</b></article>)}</div>
        <p className="reasonFoot">And a thousand little things I still haven't found the words for.</p>
      </section>

      <section className="poemChapter" id="poem">
        <div className="poemBackdrop" />
        <div className="poemInner" data-reveal>
          <div className="sectionRoseIcon">🌹</div>
          <p className="chapterNo">WORDS I WROTE FOR YOU</p>
          <div className="poemMark">“</div>
          <h2>A little piece<br />of my <em>heart.</em></h2>
          <p className="poemInstruction">I could never fit what I feel for you into words… but here are a few unfinished ones.</p>

          <div className="poemRevealBox">
            <div className="heartStage" aria-hidden="true">
              <svg className="heartSvg" viewBox="0 0 100 90">
                <defs>
                  <linearGradient id="heartGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ff758f" />
                    <stop offset="45%" stop-color="#e01e4a" />
                    <stop offset="100%" stop-color="#7a0624" />
                  </linearGradient>
                  <linearGradient id="heartGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#ff859d" />
                    <stop offset="45%" stop-color="#ed2d56" />
                    <stop offset="100%" stop-color="#8a0928" />
                  </linearGradient>
                  <filter id="heartGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#ff2a5f" flood-opacity="0.85" />
                  </filter>
                </defs>
                <g className="heartGroup" filter="url(#heartGlow)">
                  <path className="heartHalf heartLeft" fill="url(#heartGradLeft)" d="M 50 82 C 45 76 15 54 10 32 C 6 16 18 4 33 4 C 42 4 48 10 50 16 L 50 82 Z" />
                  <path className="heartHalf heartRight" fill="url(#heartGradRight)" d="M 50 82 C 55 76 85 54 90 32 C 94 16 82 4 67 4 C 58 4 52 10 50 16 L 50 82 Z" />
                </g>
              </svg>
            </div>

            <div className="poemLines" lang="si">
              <div className="poemStanza">
                <p>සිනහවන් පළඳා මඳහසින් ගිගිරි නඟනා සමනලියකට</p>
                <p>මිතුරුදම් පරදා හදවතින් නැඟී ආ මල් පිපුණු රුකකට</p>
                <p>ගොඩ වදින්නට පැතුම් පිරුවෙමි මුණිවතින් සැඟවූව පෙමකට</p>
                <p>පැතුම් හැඩවූ සොඳුරු දිනකදි පියතැබූවෙමි අපේ ලොවකට</p>
              </div>
              <div className="poemStanza">
                <p>නිදහසේ පියසලා අහසේ ඉගිල යමු මා ප්‍රේමියේ</p>
                <p>වැහි වලාවන් තිබෙයි එහි මඟ නොයන් අතහැර දෙව්ලියේ</p>
                <p>අඳුර දුරුකර එළිය වූ සඳ ඔබම වෙයි මා හදවතේ</p>
                <p>වදන් මදි මට පද බඳින්නට ලොවක් ඔබ මට ජීවිතේ</p>
              </div>
              <div className="poemStanza">
                <p>ඇරඹි පරිචය හැඩ කරන්නට පළපුරුදු වූ සිත්තරෙකු සේ</p>
                <p>හැබෑවන ඒ පැතුම් පොදි බැඳ ඉගිල යන්නට ගඟන රිසි සේ</p>
                <p>තුටින් පතනෙමි, සවිය වන්නෙමි, සවියක්ම වූ ඔබට සිත් සේ</p>
                <p>ඉතින් ප්‍රේමිය අවසරද මට එක් කරන්නට පැතුම් මෙලෙසේ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="afterPoem" data-reveal>
        <div className="sectionRoseIcon">🌹</div>
        <p className="chapterNo">AND THERE IS SO MUCH MORE</p>
        <h2>If I could pause time,<br />I'd keep a few more <em>moments.</em></h2>
        <div className="afterPoemPhotos"><Photo src="/images/memory-07.jpg" alt="Another favourite memory" /><Photo src="/images/memory-08.jpg" alt="One more happy memory" /></div>
        <p className="afterPoemCopy">More laughter. More little adventures. More ordinary days that become extraordinary just because we're in them.</p>
      </section>

      <section className="futureLetter" id="wish" data-reveal>
        <p className="chapterNo">FOR ALL THE DAYS AHEAD</p>
        <div className="letterSeal">🌹</div>
        <h2>My wish for you<br /><em>and all your tomorrows.</em></h2>
        <div className="letterBody">
          <p>Sudu , I hope this new chapter brings you the kind of happiness that stays. I hope your mornings feel hopeful, your nights feel peaceful, and your heart always has a reason to smile.</p>
          <p>May the dreams you keep quietly in your heart find their way into the world. May you meet beautiful opportunities, kind people, and moments that remind you how capable and wonderful you are.</p>
          <p>When life feels heavy, I hope you remember that you never have to carry everything perfectly. I hope we keep learning, growing, laughing at our silly little jokes, making memories, and choosing each other through every season.</p>
          <p>Thank you for being you. For every laugh, every little moment, and every feeling that words can never quite hold.</p>
          <p className="letterEnd">Happy birthday, Raththaran 😘.<br />Here's to your dreams, our memories,<br />and all the beautiful days still waiting for us. <span>♡</span></p>
        </div>
        <div className="signature">With all my love, always.</div>
      </section>

      <section className="finalWish" data-reveal>
        <div className="finalWishStars">✦　✧　·　🌹　·　✧</div>
        <p className="chapterNo">ONE LAST THING</p>
        <h2>Keep shining,<br /><em>beautiful soul.</em></h2>
        <p>May this year be gentle with you, generous to your dreams, and full of reasons to laugh. I hope the future is even more beautiful than everything we've imagined.</p>
        <button className="wishButton" onClick={() => { notifyArrival("Opened 'One more wish for you ♡'"); setGiftOpen(!giftOpen); }}>{giftOpen ? "Close my little wish" : "One more wish for you ♡"}</button>
        {giftOpen && <div className="hiddenWish"><span>🌹</span><p>Wherever life takes us, I hope we never run out of reasons to make each other smile. You are my favourite hello, my sweetest memory, and one of my brightest hopes for tomorrow.</p><b>Happy Birthday, Love. ❤️</b></div>}
        <div className="finalDate">NOVEMBER 09, 2026 <span>·</span> MADE WITH LOVE</div>
      </section>
      <footer className="siteFooter"><a href="#top">Back to the candle ↑</a><p>A little page for someone who means a lot.</p></footer>
    </main>
  );
}
