import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import { Compass, Hammer, Mail, MapPin, Phone, Ruler, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import "./styles.css";

const dachwerkZero = "/assets/Dachwerk/0.png";
const dachwerkOne = "/assets/Dachwerk/1.jpeg";
const dachwerkTwo = "/assets/Dachwerk/2.jpeg";
const dachwerkThree = "/assets/Dachwerk/3.png";
const dachwerkFour = "/assets/Dachwerk/4.jpeg";
const holzbauZero = "/assets/Holzbau/0.png";
const holzbauOne = "/assets/Holzbau/1.png";
const holzbauTwo = "/assets/Holzbau/2.png";
const holzbauThree = "/assets/Holzbau/3.jpeg";
const holzbauFour = "/assets/Holzbau/4.jpeg";
const sanierungZero = "/assets/Sanierung/0.png";
const sanierungOne = "/assets/Sanierung/1.png";
const sanierungTwo = "/assets/Sanierung/2.jpeg";
const sanierungThree = "/assets/Sanierung/3.jpeg";
const sanierungFour = "/assets/Sanierung/4.jpeg";
const innenausbauZero = "/assets/Innenausbau/0.jpeg";
const innenausbauOne = "/assets/Innenausbau/1.png";
const innenausbauTwo = "/assets/Innenausbau/2.png";
const innenausbauThree = "/assets/Innenausbau/3.png";
const innenausbauFour = "/assets/Innenausbau/4.jpeg";

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

const handwerkSections = [
  {
    id: "dachwerk",
    title: "Dachwerk",
    image: dachwerkZero,
    text: "Tragende Dachkonstruktionen mit klarer Linie, sauberem Abbund und sichtbarer Materiallogik.",
    story: [
      {
        kicker: "Substanz",
        title: "Dachwerke mit Substanz",
        image: dachwerkOne,
        text: "Präzision, die Generationen trägt. Ein Dachstuhl ist mehr als Konstruktion - er ist das tragende Herz eines Hauses. Er entscheidet über Stabilität, Langlebigkeit und den Charakter des gesamten Bauwerks."
      },
      {
        kicker: "Planung",
        title: "Jeder Balken sitzt im System",
        image: dachwerkTwo,
        text: "Wir planen und realisieren hochwertige Dachwerke mit handwerklicher Präzision, modernster Holzbautechnik und einem kompromisslosen Anspruch an Qualität. Jede Verbindung wird exakt auf Ihr Bauvorhaben abgestimmt."
      },
      {
        kicker: "Ausführung",
        title: "Tradition trifft Holzbautechnik",
        image: dachwerkThree,
        text: "Ob Neubau, Anbau oder komplexe Sonderkonstruktion: Wir verbinden traditionelles Zimmererhandwerk mit modernen Lösungen im Holzbau und schaffen Dachkonstruktionen, die nicht nur tragen, sondern Werte schaffen."
      },
      {
        kicker: "Verlässlichkeit",
        title: "Gebaut für Jahrzehnte",
        image: dachwerkFour,
        text: "Unsere Dachwerke stehen für präzise Planung, saubere Ausführung, hochwertige Materialien, individuelle Lösungen und höchste Qualitätsstandards. Lassen Sie uns Ihr Projekt gemeinsam planen - transparent und mit Blick fürs Wesentliche."
      }
    ],
    gallery: [
      ["Sparrenlage", "/assets/Dachstuhl.png", "Präzise gesetzte Linien für ruhige, tragfähige Dachflächen."],
      ["Holzverbindung", "/assets/Holzbau.png", "Verbindungen werden geplant, geprüft und sauber ausgeführt."],
      ["Bestand", "/assets/Sanierung.png", "Alte Konstruktionen werden respektvoll verstärkt oder ersetzt."],
      ["Innenkante", "/assets/Innenausbau.png", "Anschlüsse bleiben sichtbar sauber und passend zum Raum."]
    ]
  },
  {
    id: "holzbau",
    title: "Holzbau",
    image: holzbauZero,
    text: "Konstruktionen aus Holz für Bestand, Anbau und funktionale Erweiterungen rund ums Haus.",
    story: [
      {
        kicker: "Konstruktion",
        title: "Holzbau mit Anspruch",
        image: holzbauOne,
        text: "Qualität, die man sieht und spürt. Holz ist einer der wertvollsten Baustoffe unserer Zeit - nachhaltig, vielseitig und langlebig. Entscheidend ist jedoch nicht nur das Material, sondern die Präzision, mit der es verarbeitet wird."
      },
      {
        kicker: "Montage",
        title: "Tradition trifft moderne Technik",
        image: holzbauTwo,
        text: "Im modernen Holzbau verbinden wir traditionelles Handwerk mit innovativer Technik und schaffen Lösungen, die funktional, ästhetisch und auf Jahrzehnte ausgelegt sind. Ob Tragkonstruktion, Erweiterung, Aufstockung oder Sonderanfertigung - jedes Projekt wird mit höchster Sorgfalt geplant."
      },
      {
        kicker: "Bestand",
        title: "Lebensräume schaffen",
        image: holzbauThree,
        text: "Für uns bedeutet Holzbau mehr als nur Bauen: Es bedeutet, Lebensräume zu schaffen, Werte zu erhalten und nachhaltige Qualität für kommende Generationen zu sichern. Unsere Arbeit steht für maßgeschneiderte Konstruktionen, hochwertige Materialien und präzise Verarbeitung."
      },
      {
        kicker: "Wert",
        title: "Sicherheit und echtes Handwerk",
        image: holzbauFour,
        text: "Nachhaltige und energieeffiziente Bauweisen, moderne Lösungen für Neubau, Umbau und Erweiterung sowie Zuverlässigkeit und Termintreue prägen jedes Projekt. Wer beim Bauen auf Qualität setzt, entscheidet sich für Sicherheit, Wertbeständigkeit und Ergebnisse, die überzeugen."
      }
    ],
    gallery: [
      ["Montage", "/assets/Holzbau.png", "Elemente werden vorbereitet und auf der Baustelle ruhig gesetzt."],
      ["Tragwerk", "/assets/Dachstuhl.png", "Holzbau beginnt mit klarer Lastführung und sauberem Raster."],
      ["Carport", "/assets/Carport.jpeg", "Praktische Außenkonstruktionen mit stimmigem Materialeinsatz."],
      ["Detail", "/assets/Innenausbau.png", "Oberflächen und Anschlüsse werden bis zum Detail geführt."]
    ]
  },
  {
    id: "sanierung",
    title: "Sanierung",
    image: sanierungZero,
    text: "Bestand prüfen, schadhafte Hölzer austauschen und langlebige Lösungen für ältere Gebäude schaffen.",
    story: [
      {
        kicker: "Weitblick",
        title: "Sanierung mit Weitblick",
        image: sanierungOne,
        text: "Werte erhalten, Zukunft sichern. Jede Immobilie erzählt ihre eigene Geschichte - doch mit der Zeit hinterlassen Witterung, Alter und Belastung ihre Spuren. Eine professionelle Sanierung bedeutet nicht nur Reparatur, sondern nachhaltige Aufwertung."
      },
      {
        kicker: "Substanz",
        title: "Erhalten, verbessern, sichern",
        image: sanierungTwo,
        text: "Wir sanieren Dächer, Holzkonstruktionen und Gebäudeteile mit höchster handwerklicher Präzision und dem Blick für das Wesentliche: Substanz erhalten, Schwachstellen beseitigen und neue Qualität schaffen."
      },
      {
        kicker: "Analyse",
        title: "Jede Sanierung wird individuell geplant",
        image: sanierungThree,
        text: "Ob Dachsanierung, energetische Modernisierung, Schadensbehebung oder komplette Erneuerung - jede Sanierung wird individuell geplant und fachgerecht umgesetzt. Erfahrung, moderne Technik und hochwertige Materialien greifen sauber ineinander."
      },
      {
        kicker: "Sicherheit",
        title: "Aus Bestehendem wieder Wertvolles machen",
        image: sanierungFour,
        text: "Unsere Sanierungsleistungen stehen für fachgerechte Analyse, nachhaltige Lösungen, Werterhalt, energieeffiziente Konzepte und termingerechte Umsetzung. Eine gute Sanierung schützt nicht nur Ihr Gebäude - sie schützt Ihre Investition."
      }
    ],
    gallery: [
      ["Prüfung", "/assets/Sanierung.png", "Zustand, Feuchte und Anschlussdetails werden zuerst bewertet."],
      ["Austausch", "/assets/Dachstuhl.png", "Beschädigte Bauteile werden gezielt ersetzt statt blind überbaut."],
      ["Innenausbau", "/assets/Innenausbau.png", "Sanierung und Ausbau greifen sauber ineinander."],
      ["Holzbau", "/assets/Holzbau.png", "Neue Holzelemente schließen tragfähig an den Bestand an."]
    ]
  },
  {
    id: "innenausbau",
    title: "Innenausbau",
    image: innenausbauZero,
    text: "Holzdetails, Verkleidungen und Ausbauanschlüsse, die handwerklich ruhig in den Raum passen.",
    story: [
      {
        kicker: "Präzision",
        title: "Innenausbau mit Präzision",
        image: innenausbauOne,
        text: "Räume, die Eindruck hinterlassen. Ein hochwertiger Innenausbau macht den Unterschied zwischen einem fertigen Raum und einem Zuhause mit Charakter. Es sind die Details, die Qualität sichtbar machen."
      },
      {
        kicker: "Ausführung",
        title: "Funktion, Design und Komfort",
        image: innenausbauTwo,
        text: "Wir realisieren Innenausbau auf höchstem handwerklichen Niveau und schaffen Räume, die Funktionalität, Design und Wohnkomfort perfekt miteinander verbinden - von Wand- und Deckenkonstruktionen bis zu individuellen Holzverkleidungen."
      },
      {
        kicker: "Maßarbeit",
        title: "Details, die bleiben",
        image: innenausbauThree,
        text: "Innenausbau bedeutet mehr als Ausbau: Es geht darum, Räume zu schaffen, die Ihren Ansprüchen gerecht werden und langfristig ihren Wert behalten. Jedes Detail wird mit Sorgfalt geplant und mit Präzision umgesetzt."
      },
      {
        kicker: "Perfektion",
        title: "Qualität erkennt man im Detail",
        image: innenausbauFour,
        text: "Unsere Leistungen stehen für präzise Ausführung, hochwertige Materialien, individuelle Lösungen nach Maß, moderne Gestaltung und termingerechte Umsetzung. Lassen Sie uns Räume schaffen, die dauerhaft überzeugen."
      }
    ],
    gallery: [
      ["Wandfläche", "/assets/Innenausbau.png", "Saubere Flächenführung mit präzisen Kanten und Anschlüssen."],
      ["Dachraum", "/assets/Dachstuhl.png", "Dachräume werden nutzbar, ohne die Konstruktion zu verstecken."],
      ["Bestand", "/assets/Sanierung.png", "Vorhandene Substanz wird in den Ausbau integriert."],
      ["Material", "/assets/Holzbau.png", "Holz bleibt funktional, warm und belastbar."]
    ]
  }
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
      {lines.map((line, lineIndex) => {
        const words = line.split(" ");
        let lineCharIndex = 0;

        return (
          <span className="hero-title-line" key={`${line}-${lineIndex}`}>
            {words.map((word, wordIndex) => (
              <span className="hero-title-word" key={`${word}-${lineIndex}-${wordIndex}`}>
                {Array.from(word).map((char) => {
                  const delay = lineIndex * line.length * charDelay + lineCharIndex * charDelay;
                  lineCharIndex += 1;

                  return (
                    <span
                      className={`hero-title-char ${active ? "is-visible" : ""}`}
                      key={`${char}-${lineIndex}-${wordIndex}-${lineCharIndex}`}
                      style={{ transitionDelay: `${delay}ms` }}
                    >
                      {char}
                    </span>
                  );
                })}
                {wordIndex < words.length - 1 ? <span className="hero-title-space">{"\u00A0"}</span> : null}
              </span>
            ))}
          </span>
        );
      })}
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
            <AnimatedHeading text={"Holzbau mit Haltung\nfür Dach und Bestand"} />
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

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const updatePreference = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener("change", updateMatches);
    return () => mediaQuery.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
}

function InteractiveHandwerkSection() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [animatingSection, setAnimatingSection] = useState(null);
  const shouldReduceMotion = usePrefersReducedMotion();
  const isNarrowScreen = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    document.body.classList.toggle("detail-view-open", Boolean(selectedSection));
    return () => document.body.classList.remove("detail-view-open");
  }, [selectedSection]);

  const openSection = (section) => {
    if (animatingSection || selectedSection) return;
    setAnimatingSection(section.id);
    window.setTimeout(() => {
      setSelectedSection(section);
      setAnimatingSection(null);
    }, shouldReduceMotion ? 80 : 520);
  };

  const closeSection = () => setSelectedSection(null);

  return (
    <section className="image-direction scroll-slide foreground-panel" data-bg="editorial" id="handwerk">
      <motion.div
        key="handwerk-overview"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
        animate={{ opacity: selectedSection ? .36 : 1, y: 0, scale: selectedSection && !shouldReduceMotion ? .98 : 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="image-direction-header">
          <p className="eyebrow" id="eyebrow-handwerk">Handwerk</p>
          <h2><span>Schwarz, Weiß, Holz.</span></h2>
        </div>

        <div className="interactive-image-stage" aria-label="Interaktive Handwerksbereiche">
          <div className="editorial-wall">
            {handwerkSections.map((section, index) => {
              const [, image] = editorialFrames[index] || [];

              return (
                <motion.button
                  className={`editorial-frame editorial-card editorial-${index + 1}`}
                  key={section.id}
                  type="button"
                  aria-label={`${section.title} öffnen`}
                  onClick={() => openSection(section)}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.025 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                  animate={animatingSection === section.id ? { scale: 1.18, opacity: 0 } : { scale: 1, opacity: selectedSection ? 0 : 1 }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img src={image || section.image} alt={`${section.title} der Zimmerei Kurth`} />
                  <div className="editorial-overlay"><h3>{section.title}</h3></div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {selectedSection && (
            <motion.div
              className="handwerk-detail-page"
              key={selectedSection.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : "100%" }}
              transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            >
              <button className="handwerk-detail-back" type="button" onClick={closeSection}>Zurück</button>

              <div className={`handwerk-detail-scroll ${selectedSection.story ? "handwerk-detail-scroll-story" : ""}`}>
                <div className="handwerk-detail-hero">
                  <motion.img
                    src={selectedSection.image}
                    alt={`${selectedSection.title} Detailansicht`}
                    initial={{ scale: shouldReduceMotion ? 1 : 1.12, opacity: .3 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: .85, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="handwerk-detail-title">
                    <p className="eyebrow">Handwerk</p>
                    <h2>{selectedSection.title}</h2>
                    <p>{selectedSection.text}</p>
                  </div>
                </div>

                {selectedSection.story ? (
                  <div className="handwerk-story">
                    {selectedSection.story.map((item, index) => (
                      <motion.article
                        className={`handwerk-story-row ${index % 2 === 1 ? "is-reversed" : ""}`}
                        key={item.title}
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 70, filter: shouldReduceMotion ? "blur(0px)" : "blur(14px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.32 }}
                        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <motion.div
                          className="handwerk-story-image"
                          initial={{ opacity: 0, x: shouldReduceMotion || isNarrowScreen ? 0 : (index % 2 === 1 ? 80 : -80), scale: shouldReduceMotion ? 1 : .96 }}
                          whileInView={{ opacity: 1, x: 0, scale: 1 }}
                          viewport={{ once: true, amount: 0.36 }}
                          transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <img src={item.image} alt={`${selectedSection.title}: ${item.title}`} />
                        </motion.div>
                        <motion.div
                          className="handwerk-story-copy"
                          initial={{ opacity: 0, x: shouldReduceMotion || isNarrowScreen ? 0 : (index % 2 === 1 ? -64 : 64) }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.42 }}
                          transition={{ duration: 0.68, delay: shouldReduceMotion ? 0 : .08, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <span>{item.kicker}</span>
                          <h3>{item.title}</h3>
                          <p>{item.text}</p>
                        </motion.div>
                      </motion.article>
                    ))}
                  </div>
                ) : (
                  <div className="handwerk-detail-grid">
                    {selectedSection.gallery.map(([label, image, text], index) => (
                      <motion.article
                        className="handwerk-detail-card"
                        key={label}
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: shouldReduceMotion ? 0 : index * .07, duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <img src={image} alt={`${selectedSection.title}: ${label}`} />
                        <div>
                          <h3>{label}</h3>
                          <p>{text}</p>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
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

        <InteractiveHandwerkSection />

        <section className="service section scroll-slide foreground-panel" data-bg="workshop" id="kontakt">
          <div className="service-intro"><p className="eyebrow">Kontakt</p><h2>Vom ersten Anruf bis zur sauberen Baustelle</h2></div>
          <div className="steps">
            <article className="reveal-item step-item"><Compass size={28} /><strong>Beratung</strong><p>Projektziel, Bestand und Zeitfenster werden direkt geklärt.</p></article>
            <article className="reveal-item step-item"><Ruler size={28} /><strong>Aufmaß</strong><p>Maße, Höhen, Anschlüsse und Materialbedarf werden vor Ort geprüft.</p></article>
            <article className="reveal-item step-item"><Hammer size={28} /><strong>Ausführung</strong><p>Die Arbeit wird mit ruhigem Ablauf und sauberer Übergabe umgesetzt.</p></article>
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
