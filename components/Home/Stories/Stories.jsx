"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Stories.module.css";

import story1 from "../Stories/story1.jpg";
import story2 from "./story2.png";
import story3 from "../Stories/story3.jpg";

const IMAGES = [story1, story2, story3];
const TOTAL = IMAGES.length;
const DUR = 1100;
const GAP = 3000;

function mod(n, m) { return ((n % m) + m) % m; }

export default function AboutSection() {
  const cur = useRef(0);
  const busy = useRef(false);

  const refs = {
    flTop: useRef(null), flBg: useRef(null),
    fcTop: useRef(null), fcBg: useRef(null),
    frTop: useRef(null), frBg: useRef(null),
  };

  function fill(ref, idx) {
    if (!ref.current) return;
    const img = ref.current.querySelector("img");
    if (img) img.src = IMAGES[mod(idx, TOTAL)].src;
  }

  function setTf(ref, tx, sc, animate) {
    if (!ref.current) return;
    ref.current.style.transition = animate
      ? `transform ${DUR}ms cubic-bezier(0.4,0,0.2,1)`
      : "none";
    ref.current.style.transform = `translateX(${tx}px) scale(${sc})`;
    ref.current.style.transformOrigin = "center center";
  }

  function init() {
    const c = cur.current;
    fill(refs.flTop, c - 1); fill(refs.fcTop, c);
    fill(refs.frTop, c + 1); fill(refs.frBg,  c + 2);
    fill(refs.flBg,  c);     fill(refs.fcBg,  c + 1);

    setTf(refs.flTop, 0,   1.0, false);
    setTf(refs.fcTop, 0,   1.5, false);
    setTf(refs.frTop, 0,   1.0, false);
    setTf(refs.frBg,  180, 1.0, false);
    setTf(refs.flBg,  180, 1.2, false);
    setTf(refs.fcBg,  180, 1.0, false);
  }

  function rotate() {
    if (busy.current) return;
    busy.current = true;

    setTf(refs.flTop, -180, 1.0, true);
    setTf(refs.flBg,     0, 1.0, true);

    setTf(refs.fcTop, -180, 1.2, true);
    setTf(refs.fcBg,     0, 1.5, true);

    setTf(refs.frTop, -180, 1.5, true);
    setTf(refs.frBg,     0, 1.0, true);

    setTimeout(() => {
      cur.current = mod(cur.current + 1, TOTAL);
      const c = cur.current;

      fill(refs.flTop, c - 1); fill(refs.fcTop, c);
      fill(refs.frTop, c + 1); fill(refs.frBg,  c + 2);
      fill(refs.flBg,  c);     fill(refs.fcBg,  c + 1);

      setTf(refs.flTop, 0,   1.0, false);
      setTf(refs.fcTop, 0,   1.5, false);
      setTf(refs.frTop, 0,   1.0, false);
      setTf(refs.frBg,  180, 1.0, false);
      setTf(refs.flBg,  180, 1.2, false);
      setTf(refs.fcBg,  180, 1.0, false);

      busy.current = false;
    }, DUR + 60);
  }

  useEffect(() => {
    init();
    const interval = setInterval(rotate, GAP);
    return () => clearInterval(interval);
  }, []);

  const layer = (ref, zIndex) => (
    <div
      ref={ref}
      style={{ position: "absolute", inset: 0, zIndex }}
    >
      {/* plain img tag — we mutate src directly via ref */}
      <img
        alt="Surge Story"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.layoutWrapper}>
        <div className={styles.textStack}>
          <h2 className={styles.title}>Built in Dubai, Brewed with Purpose</h2>
          <p className={styles.description}>
            Surge is an Emirati-owned specialty coffee brand driven by quality,
            authenticity, and community. Since 2016, we've been crafting coffee
            experiences inspired by global standards and elevated by local
            values—bringing culture and creativity into every cup.
          </p>
          <button className={styles.button}>Explore About Us</button>
        </div>

        <div className={styles.imageFlexContainer}>

          <div className={`${styles.frame} ${styles.frameLeft}`}>
            {layer(refs.flBg, 1)}
            {layer(refs.flTop, 2)}
          </div>

          <div className={`${styles.frame} ${styles.frameCenter}`}>
            {layer(refs.fcBg, 1)}
            {layer(refs.fcTop, 2)}
          </div>

          <div className={`${styles.frame} ${styles.frameRight}`}>
            {layer(refs.frBg, 1)}
            {layer(refs.frTop, 2)}
          </div>

        </div>
      </div>
    </section>
  );
}