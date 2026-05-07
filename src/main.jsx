import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Compass, Hammer, Mail, MapPin, Phone, Ruler, ShieldCheck } from "lucide-react";
import "./styles.css";

const services = [
  ["Dachstühle", "Tragwerke, Aufstockungen und Reparaturen mit sauberem Abbund und klaren Anschlüssen."],
  ["Holzbau", "Carports, Anbauten, Nebengebäude und individuelle Konstruktionen für Bestand und Neubau."],
  ["Sanierung", "Bestandsprüfung, Austausch geschädigter Hölzer und langlebige Lösungen für ältere Gebäude."],
  ["Innenausbau", "Decken, Verkleidungen, Ausbauanschlüsse und Holzdetails, die präzise in den Raum passen."]
];

const gallery = ["Dachstuhl", "Holzrahmenbau", "Innenausbau", "Sanierung", "Carport", "Detailarbeit"];

const editorialFrames = [
  ["Dachwerk", "/assets/Dachstuhl.png"],
  ["Holzbau", "/assets/Holzbau.png"],
  ["Sanierung", "/assets/Sanierung.png"],
  ["Innenausbau", "/assets/Innenausbau.png"]
];

function FadeIn({ children, delay = 0, duration = 1000, className = "" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timeout);
  }, [delay]);

  return (
    <div className={`fade-in ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDuration: `${duration}ms` }}>
      {children}
    </div>
  );
}

function AnimatedHeading({ text, initialDelay = 200, charDelay = 30 }) {
  const [active, setActive] = useState(false);
  const lines = text.split("\n");

  useEffect(() => {
    const timeout = window.setTimeout(() => setActive(true), initialDelay);
    return () => window.clearTimeout(timeout);
  }, [initialDelay]);

  return (
    <h1 className="hero-title" style={{ letterSpacing: "-0.04em" }}>
      {lines.map((line, lineIndex) => (
        <span className="hero-title-line" key={line}>
          {Array.from(line).map((char, charIndex) => {
            const delay = lineIndex * line.length * charDelay + charIndex * charDelay;
            return (
              <span
                className={`hero-title-char ${active ? "is-visible" : ""}`}
                key={`${char}-${charIndex}`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function HeroSection() {
  return (
    <section className="hero" id="start">
      <img className="hero-bg" src="/assets/Hero.jpeg" alt="Zimmererarbeit an einer Holzkonstruktion" />

      <div className="hero-nav-wrap">
        <nav className="liquid-glass hero-nav" aria-label="Hauptnavigation">
          <a className="hero-logo" href="#start">Kurth</a>
          <div className="hero-links">
            <a href="#betrieb">Betrieb</a>            
            <a href="#projekte">Projekte</a>
            <a href="#handwerk">Handwerk</a>
            <a href="#kontakt">Kontakt</a>
          </div>
        </nav>
      </div>

      <div className="hero-content">
        <div className="hero-bottom-grid">
          <div>
            <AnimatedHeading text={"Holzbau mit Haltung\nfür Dach und Bestand."} />
            <FadeIn delay={1200}>
              <div className="hero-actions">
                <a className="hero-button hero-button-primary" href="#kontakt">Projekt besprechen</a>
                <a className="liquid-glass hero-button hero-button-secondary" href="#projekte">Leistungen ansehen</a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function CinematicBackground() {
  return (
    <div className="cinematic-stage" aria-hidden="true">
      <div className="cinematic-bg-panel bg-craft is-active" data-bg="craft" />
      <div className="cinematic-bg-panel bg-workshop" data-bg="workshop" />
      <div className="cinematic-bg-panel bg-structure" data-bg="structure" />
      <div className="cinematic-bg-panel bg-editorial" data-bg="editorial" />
      <div className="cinematic-bg-panel bg-contact" data-bg="contact" />
      <div className="cinematic-bg-grain" />
    </div>
  );
}

function App() {
  useEffect(() => {
    let frameId = 0;
    const root = document.documentElement;
    const stage = document.querySelector(".cinematic-stage");
    const panels = document.querySelectorAll(".cinematic-bg-panel");
    const sections = Array.from(document.querySelectorAll(".scroll-slide"));

    const setActivePanel = (key) => {
      if (!key || stage?.dataset.activeBg === key) return;
      stage?.setAttribute("data-active-bg", key);
      panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.bg === key));
    };

    const updateActiveBackground = () => {
      const viewportCenter = window.innerHeight * 0.52;
      let activeSection = sections[0];
      let smallestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height * 0.5 - viewportCenter);

        if (rect.bottom > 0 && rect.top < window.innerHeight && distance < smallestDistance) {
          smallestDistance = distance;
          activeSection = section;
        }
      });

      setActivePanel(activeSection?.dataset.bg || "craft");
    };

    const updateScrollLayer = () => {
      root.style.setProperty("--scroll-y", `${window.scrollY}`);
      updateActiveBackground();
      frameId = 0;
    };

    const onScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateScrollLayer);
    };

    updateScrollLayer();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target.classList.contains("metric-band")) {
            entry.target.querySelectorAll(".metric-item").forEach((item, index) => {
              window.setTimeout(() => item.classList.add("is-visible"), index * 260);
            });
            observer.unobserve(entry.target);
            return;
          }

          entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    );

    document.querySelectorAll(".scroll-slide, .reveal-item:not(.metric-item), .metric-band").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CinematicBackground />
      <main className="content-layer">
        <HeroSection />

        <section className="metric-band foreground-panel" data-bg="craft" aria-label="Schwerpunkte">
          <article className="reveal-item metric-item"><strong>Aufmaß vor Ort</strong><p>Bestand prüfen, Maße klären, Anschlüsse verstehen.</p></article>
          <article className="reveal-item metric-item"><strong>Handwerk aus Meisterhand</strong><p>Sauberer Abbund und tragfähige Ausführung.</p></article>
          <article className="reveal-item metric-item"><strong>Region Aachen</strong><p>Kurze Wege rund um Alsdorf, Aachen und Umgebung.</p></article>
        </section>

        <section className="about section scroll-slide foreground-panel" data-bg="workshop" id="ueber-uns">
          <div className="section-label" id="betrieb">Über uns</div>
          <div className="about-copy">
            <h2>Handwerk, das nicht lauter sein muss als seine Ausführung.</h2>
            <p>Bei Kurth steht nicht nur der Effekt im Zentrum, sondern Vertrauen: klare Leistungen, direkte Ansprechpartner und sichtbare Materialkompetenz.</p>
          </div>
          <div className="about-card"><ShieldCheck size={34} /><strong>Josef Kurth Zimmerermeister</strong><span>Grenzweg 19 · 52477 Alsdorf</span></div>
        </section>


        <section className="craft-split scroll-slide foreground-panel" data-bg="structure">
          <div className="craft-copy">
            <p className="eyebrow">Holz und Dach</p>
            <h2>Alles, was am Haus aus Holz trägt, schützt oder prägt.</h2>
          </div>
          <div className="craft-tile-grid">
            {services.map(([title, text]) => (
              <article className="craft-tile" key={`craft-${title}`}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="references section scroll-slide foreground-panel" data-bg="editorial" id="projekte">
          <div className="section-heading compact"><p className="eyebrow">Projekte</p><h2>Projektarten statt Stock-Galerie.</h2></div>
          <div className="gallery-grid">{gallery.map((item, index) => <article key={item} className={`gallery-item item-${index + 1}`}><span>{item}</span></article>)}</div>
        </section>

        <section className="image-direction scroll-slide foreground-panel" data-bg="editorial" id="handwerk">
          <div className="image-direction-header">
            <p className="eyebrow" id="eyebrow-handwerk">Handwerk</p>
            <h2>
              <span>Schwarz, Weiß, Holz.</span>
            </h2>
          </div>
          <div className="editorial-wall">
            {editorialFrames.map(([title, image], index) => (
              <article className={`editorial-frame editorial-${index + 1}`} key={title}>
                <img src={image} alt={`${title} der Zimmerei Kurth`} />
                <div className="editorial-overlay"><h3>{title}</h3></div>
              </article>
            ))}
          </div>
        </section>

        <section className="service section scroll-slide foreground-panel" data-bg="workshop" id="kontakt">
          <div className="service-intro"><p className="eyebrow">Kontakt</p><h2>Vom ersten Anruf bis zur sauberen Baustelle.</h2></div>
          <div className="steps">
            <article><Compass size={28} /><strong>Beratung</strong><p>Projektziel, Bestand und Zeitfenster werden direkt geklärt.</p></article>
            <article><Ruler size={28} /><strong>Aufmaß</strong><p>Maße, Höhen, Anschlüsse und Materialbedarf werden vor Ort geprüft.</p></article>
            <article><Hammer size={28} /><strong>Ausführung</strong><p>Die Arbeit wird mit ruhigem Ablauf und sauberer Übergabe umgesetzt.</p></article>
          </div>
        </section>

        <section className="contact scroll-slide foreground-panel" data-bg="contact" id="kontaktdaten">
          <div className="contact-copy"><p className="eyebrow">Kontakt</p><h2>Projekt in Alsdorf oder der Städteregion Aachen?</h2></div>
          <div className="contact-panel">
            <a href="tel:+49240425360"><Phone size={22} /><span>Telefon</span><strong>+49 2404 25360</strong></a>
            <a href="mailto:zimmerei-kurth@t-online.de"><Mail size={22} /><span>E-Mail</span><strong>zimmerei-kurth@t-online.de</strong></a>
            <a href="https://www.google.com/maps/place/Josef+Kurth/@50.8718007,6.1594408,982m/data=!3m2!1e3!4b1!4m6!3m5!1s0x417229fd4d8a1841:0x48b33a771f5840f0!8m2!3d50.8717973!4d6.1620157!16s%2Fg%2F1xg5rtj2" target="_blank" rel="noreferrer"><MapPin size={22} /><span>Adresse</span><strong>Grenzweg 19, 52477 Alsdorf</strong></a>
          </div>
        </section>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
