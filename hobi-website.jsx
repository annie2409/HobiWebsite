import { useState, useEffect, useRef } from "react";

// ─── Color tokens ───────────────────────────────────────────────────────────
const C = {
  blue: "#1E6FD9",
  blueDark: "#1455A8",
  blueLight: "#E8F1FB",
  green: "#27A86E",
  greenDark: "#1D8558",
  greenLight: "#E6F7F1",
  white: "#FFFFFF",
  offWhite: "#F8FAFB",
  gray50: "#F2F4F7",
  gray200: "#E2E8F0",
  gray400: "#94A3B8",
  gray600: "#4A5568",
  gray900: "#0F172A",
};

// ─── Global styles injected via <style> ─────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      color: ${C.gray900};
      background: ${C.white};
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4, h5 { font-family: 'Sora', sans-serif; }

    .reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${C.gray50}; }
    ::-webkit-scrollbar-thumb { background: ${C.blue}; border-radius: 99px; }

    a { text-decoration: none; color: inherit; }

    input, textarea, select {
      font-family: 'DM Sans', sans-serif;
    }
  `}</style>
);

// ─── Scroll reveal hook ──────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Home", "About", "Products", "Media", "Future Plans", "Contact"];

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
    height: "68px",
    background: scrolled ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.85)",
    backdropFilter: "blur(12px)",
    borderBottom: scrolled ? `1px solid ${C.gray200}` : "1px solid transparent",
    transition: "all 0.3s ease",
  };

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <button
        onClick={() => { setPage("Home"); setMenuOpen(false); window.scrollTo(0,0); }}
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
      >
        <HobiLogo size={36} />
        <span style={{ fontFamily: "Sora", fontWeight: 700, fontSize: "20px", color: C.blue, letterSpacing: "-0.5px" }}>HOBI</span>
      </button>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }} className="nav-desktop">
        {links.map((l) => (
          <button
            key={l}
            onClick={() => { setPage(l); window.scrollTo(0,0); setMenuOpen(false); }}
            style={{
              background: page === l ? C.blueLight : "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "99px",
              fontFamily: "DM Sans",
              fontWeight: page === l ? 600 : 400,
              fontSize: "14px",
              color: page === l ? C.blue : C.gray600,
              transition: "all 0.2s",
            }}
          >
            {l}
          </button>
        ))}
        <button
          onClick={() => { setPage("Contact"); window.scrollTo(0,0); }}
          style={{
            marginLeft: "8px",
            background: `linear-gradient(135deg, ${C.blue}, ${C.green})`,
            color: C.white,
            border: "none",
            cursor: "pointer",
            padding: "10px 20px",
            borderRadius: "99px",
            fontFamily: "Sora",
            fontWeight: 600,
            fontSize: "13px",
            letterSpacing: "0.3px",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Get Started
        </button>
      </div>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "8px" }}
        className="nav-hamburger"
      >
        <div style={{ width: 22, height: 2, background: C.gray900, marginBottom: 5, borderRadius: 2 }} />
        <div style={{ width: 22, height: 2, background: C.gray900, marginBottom: 5, borderRadius: 2 }} />
        <div style={{ width: 16, height: 2, background: C.gray900, borderRadius: 2 }} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "absolute", top: "68px", left: 0, right: 0,
          background: C.white, borderBottom: `1px solid ${C.gray200}`,
          padding: "16px 24px", display: "flex", flexDirection: "column", gap: "4px",
        }}>
          {links.map((l) => (
            <button
              key={l}
              onClick={() => { setPage(l); window.scrollTo(0,0); setMenuOpen(false); }}
              style={{
                background: page === l ? C.blueLight : "none",
                border: "none", cursor: "pointer", padding: "12px 16px",
                borderRadius: "12px", fontFamily: "DM Sans", fontWeight: page === l ? 600 : 400,
                fontSize: "15px", color: page === l ? C.blue : C.gray600, textAlign: "left",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── Social links config ──────────────────────────────────────────────────────
const SOCIALS = [
  { label: "YouTube", icon: "▶", url: "https://www.youtube.com/@AnnieCannotCode", color: "#FF0000" },
  { label: "TikTok", icon: "♪", url: "https://www.tiktok.com/@heyyoufoundme2409", color: "#010101" },
  { label: "Instagram", icon: "📸", url: "https://www.instagram.com/callmeannie2409", color: "#E1306C" },
];

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: C.gray900, color: C.white, padding: "60px 40px 32px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <HobiLogo size={32} white />
              <span style={{ fontFamily: "Sora", fontWeight: 700, fontSize: "18px" }}>HOBI</span>
            </div>
            <p style={{ color: C.gray400, fontSize: "14px", lineHeight: 1.7, maxWidth: "220px" }}>
              Technology and content that help you live better.
            </p>
          </div>
          {[
            { title: "Company", links: ["Home", "About", "Products", "Media"] },
            { title: "Explore", links: ["Future Plans", "Contact"] },
          ].map((col) => (
            <div key={col.title}>
              <p style={{ fontFamily: "Sora", fontWeight: 600, fontSize: "13px", color: C.gray400, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "16px" }}>{col.title}</p>
              {col.links.map((l) => (
                <button
                  key={l}
                  onClick={() => { setPage(l); window.scrollTo(0,0); }}
                  style={{ display: "block", background: "none", border: "none", color: C.white, fontSize: "14px", cursor: "pointer", marginBottom: "10px", fontFamily: "DM Sans", opacity: 0.85, textAlign: "left", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => (e.target.style.opacity = "1")}
                  onMouseLeave={(e) => (e.target.style.opacity = "0.85")}
                >
                  {l}
                </button>
              ))}
            </div>
          ))}
          <div>
            <p style={{ fontFamily: "Sora", fontWeight: 600, fontSize: "13px", color: C.gray400, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "16px" }}>Connect</p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                  style={{ background: "rgba(255,255,255,0.08)", padding: "6px 14px", borderRadius: "99px", fontSize: "13px", cursor: "pointer", transition: "background 0.2s", color: C.white, display: "inline-flex", alignItems: "center", gap: "6px" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                ><span>{s.icon}</span>{s.label}</a>
              ))}
            </div>
            <div style={{ marginTop: "20px" }}>
              <p style={{ color: C.gray400, fontSize: "13px", marginBottom: "4px" }}>📞 +61 0451 837 728</p>
              <p style={{ color: C.gray400, fontSize: "13px" }}>📧 hello@hobi.com.au</p>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ color: C.gray400, fontSize: "13px" }}>© 2025 HOBI. All rights reserved.</p>
          <p style={{ color: C.gray400, fontSize: "13px" }}>Technology · Wellness · Media</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Logo SVG component ───────────────────────────────────────────────────────
function HobiLogo({ size = 40, white = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill={white ? "rgba(255,255,255,0.15)" : `url(#grad-${size})`} />
      <defs>
        <linearGradient id={`grad-${size}`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={C.blue} />
          <stop offset="100%" stopColor={C.green} />
        </linearGradient>
      </defs>
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
        fontFamily="Sora, sans-serif" fontWeight="800" fontSize="16" fill="white">H</text>
    </svg>
  );
}

// ─── Reusable Button ─────────────────────────────────────────────────────────
function Btn({ children, variant = "primary", onClick, style: extra = {} }) {
  const base = {
    border: "none", cursor: "pointer", borderRadius: "99px",
    fontFamily: "Sora", fontWeight: 600, fontSize: "14px",
    padding: "13px 28px", transition: "all 0.2s", display: "inline-flex",
    alignItems: "center", gap: "8px", letterSpacing: "0.2px",
    ...extra,
  };
  const variants = {
    primary: { background: `linear-gradient(135deg, ${C.blue}, ${C.green})`, color: C.white, boxShadow: `0 4px 20px rgba(30,111,217,0.3)` },
    outline: { background: "transparent", color: C.blue, border: `2px solid ${C.blue}` },
    ghost: { background: C.blueLight, color: C.blue },
    green: { background: `linear-gradient(135deg, ${C.green}, ${C.blue})`, color: C.white, boxShadow: `0 4px 20px rgba(39,168,110,0.3)` },
  };
  return (
    <button style={{ ...base, ...variants[variant] }} onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {children}
    </button>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────────
function Card({ children, style: extra = {}, hover = true }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{
        background: C.white,
        borderRadius: "20px",
        padding: "32px",
        border: `1px solid ${hov ? C.blue + "30" : C.gray200}`,
        boxShadow: hov ? "0 12px 40px rgba(30,111,217,0.1)" : "0 2px 12px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        ...extra,
      }}
    >
      {children}
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ children, bg = C.white, style: extra = {} }) {
  return (
    <section style={{ background: bg, padding: "100px 40px", ...extra }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {children}
      </div>
    </section>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
      {label && (
        <span style={{
          display: "inline-block", background: C.blueLight, color: C.blue,
          padding: "6px 16px", borderRadius: "99px", fontSize: "12px",
          fontFamily: "Sora", fontWeight: 600, letterSpacing: "1px",
          textTransform: "uppercase", marginBottom: "16px",
        }}>{label}</span>
      )}
      <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: C.gray900, lineHeight: 1.2, marginBottom: "16px" }}>{title}</h2>
      {subtitle && <p style={{ color: C.gray600, fontSize: "17px", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>{subtitle}</p>}
    </div>
  );
}

// ─── Pillar Icon ──────────────────────────────────────────────────────────────
function PillarIcon({ icon, color }) {
  return (
    <div style={{
      width: 56, height: 56, borderRadius: "16px",
      background: color === "blue" ? C.blueLight : C.greenLight,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "26px", marginBottom: "20px",
    }}>{icon}</div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// HOME PAGE
// ════════════════════════════════════════════════════════════════════════════
function HomePage({ setPage }) {
  useReveal();

  return (
    <div style={{ paddingTop: "68px" }}>
      {/* Hero */}
      <section style={{
        minHeight: "92vh", display: "flex", alignItems: "center",
        background: `radial-gradient(ellipse 80% 60% at 60% 40%, ${C.blueLight} 0%, ${C.white} 60%), radial-gradient(ellipse 50% 40% at 80% 80%, ${C.greenLight} 0%, transparent 60%)`,
        padding: "80px 40px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.blue}15, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${C.green}15, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center", width: "100%" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
              <HobiLogo size={52} />
              <span style={{ fontFamily: "Sora", fontWeight: 800, fontSize: "26px", background: `linear-gradient(135deg, ${C.blue}, ${C.green})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HOBI</span>
            </div>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, lineHeight: 1.1, color: C.gray900, marginBottom: "20px", letterSpacing: "-1px" }}>
              Technology &amp; Content<br />
              <span style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.green})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>That Help You Live Better</span>
            </h1>
            <p style={{ color: C.gray600, fontSize: "18px", lineHeight: 1.7, marginBottom: "36px", maxWidth: "480px" }}>
              We simplify travel planning, support personal wellness, and promote healthy living through thoughtfully designed tools and engaging content.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Btn onClick={() => { setPage("Products"); window.scrollTo(0,0); }}>Explore Products →</Btn>
              <Btn variant="outline" onClick={() => { setPage("Media"); window.scrollTo(0,0); }}>View Content</Btn>
              <Btn variant="ghost" onClick={() => { setPage("Contact"); window.scrollTo(0,0); }}>Contact Us</Btn>
            </div>
          </div>

          {/* Hero visual */}
          <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
            <div style={{
              width: "340px", height: "340px", borderRadius: "40px",
              background: `linear-gradient(135deg, ${C.blue}20, ${C.green}20)`,
              border: `2px solid ${C.blue}20`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: "16px", backdropFilter: "blur(8px)",
            }}>
              <div style={{ fontSize: "80px" }}>🌿</div>
              <p style={{ fontFamily: "Sora", fontWeight: 700, fontSize: "20px", color: C.gray900, textAlign: "center" }}>Stretch Wellness App</p>
              <span style={{ background: C.greenLight, color: C.green, padding: "6px 16px", borderRadius: "99px", fontSize: "13px", fontWeight: 600 }}>Featured Product</span>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <Section bg={C.offWhite}>
        <SectionHeader label="What We Do" title="Three Pillars of Better Living" subtitle="Our work sits at the intersection of technology, wellness, and creativity." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {[
            { icon: "💻", color: "blue", title: "Technology", desc: "We build intuitive apps and digital tools that simplify everyday decisions — from travel planning to daily wellness routines." },
            { icon: "🌱", color: "green", title: "Health & Wellness", desc: "Our products promote physical and mental well-being through personalized routines, guided exercises, and AI-powered recommendations." },
            { icon: "🎬", color: "blue", title: "Media & Storytelling", desc: "We create compelling travel and lifestyle content that inspires people to explore the world and live more intentionally." },
          ].map((p) => (
            <div className="reveal" key={p.title}>
              <Card>
                <PillarIcon icon={p.icon} color={p.color} />
                <h3 style={{ fontFamily: "Sora", fontWeight: 700, fontSize: "20px", marginBottom: "12px" }}>{p.title}</h3>
                <p style={{ color: C.gray600, lineHeight: 1.7, fontSize: "15px" }}>{p.desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      {/* Featured Product */}
      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <div className="reveal">
            <span style={{ display: "inline-block", background: C.greenLight, color: C.green, padding: "6px 16px", borderRadius: "99px", fontSize: "12px", fontFamily: "Sora", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>Featured Product</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, marginBottom: "16px", lineHeight: 1.2 }}>Stretch Wellness App</h2>
            <p style={{ color: C.gray600, fontSize: "16px", lineHeight: 1.7, marginBottom: "28px" }}>
              A beautifully designed wellness app that delivers personalized stretch routines, guided animations, and AI-powered scheduling — helping you stay flexible and pain-free.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              {["Personalized stretch routines", "Guided animations", "AI routine generation", "Progress tracking"].map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: C.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", flexShrink: 0 }}>✓</div>
                  <span style={{ color: C.gray600, fontSize: "15px" }}>{f}</span>
                </div>
              ))}
            </div>
            <Btn variant="green" onClick={() => { setPage("Products"); window.scrollTo(0,0); }}>Learn More →</Btn>
          </div>
          <div className="reveal" style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              width: "300px", height: "420px", borderRadius: "32px",
              background: `linear-gradient(160deg, ${C.green}15, ${C.blue}15)`,
              border: `2px solid ${C.green}30`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: "20px", padding: "32px",
            }}>
              <div style={{ fontSize: "64px" }}>🧘</div>
              <div style={{ width: "100%", background: C.white, borderRadius: "16px", padding: "20px" }}>
                <p style={{ fontFamily: "Sora", fontWeight: 600, fontSize: "14px", color: C.gray900, marginBottom: "8px" }}>Today's Routine</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {["Morning stretch", "Hip flexor release", "Shoulder mobility"].map((r, i) => (
                    <div key={r} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: C.gray600 }}>
                      <span style={{ color: i === 0 ? C.green : C.gray400 }}>●</span>{r}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ width: "100%", background: C.white, borderRadius: "12px", padding: "14px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "Sora", fontWeight: 700, color: C.green, fontSize: "20px" }}>15</p>
                  <p style={{ fontSize: "11px", color: C.gray400 }}>min</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "Sora", fontWeight: 700, color: C.blue, fontSize: "20px" }}>6</p>
                  <p style={{ fontSize: "11px", color: C.gray400 }}>exercises</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "Sora", fontWeight: 700, color: C.green, fontSize: "20px" }}>82</p>
                  <p style={{ fontSize: "11px", color: C.gray400 }}>kcal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Featured Media */}
      <Section bg={C.gray900} style={{ padding: "100px 40px" }}>
        <SectionHeader label="Media & Content" title={<span style={{ color: C.white }}>Stories That Inspire Better Living</span>} subtitle={<span style={{ color: C.gray400 }}>Travel content and lifestyle storytelling for the modern explorer.</span>} />
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "40px" }}>
          {[
            { emoji: "✈️", title: "Travel Planning Guides", desc: "Smart, actionable guides to help you plan smarter and travel better." },
            { emoji: "🎥", title: "YouTube Content", desc: "Visual storytelling from destinations around the world." },
            { emoji: "🥗", title: "Healthy Eating Tips", desc: "Sustainable eating habits for travelers and homebodies alike." },
          ].map((m) => (
            <div key={m.title} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "28px", transition: "background 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
            >
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>{m.emoji}</div>
              <h3 style={{ fontFamily: "Sora", fontWeight: 600, color: C.white, fontSize: "17px", marginBottom: "10px" }}>{m.title}</h3>
              <p style={{ color: C.gray400, fontSize: "14px", lineHeight: 1.6 }}>{m.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <Btn onClick={() => { setPage("Media"); window.scrollTo(0,0); }}>Explore Content →</Btn>
        </div>
      </Section>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ════════════════════════════════════════════════════════════════════════════
function AboutPage() {
  useReveal();
  return (
    <div style={{ paddingTop: "68px" }}>
      {/* Header */}
      <section style={{ padding: "80px 40px 60px", background: `linear-gradient(135deg, ${C.blueLight}, ${C.greenLight})`, textAlign: "center" }}>
        <div className="reveal">
          <span style={{ display: "inline-block", background: C.white, color: C.blue, padding: "6px 16px", borderRadius: "99px", fontSize: "12px", fontFamily: "Sora", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>About HOBI</span>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: C.gray900, marginBottom: "20px" }}>Designed for the Way<br />You Actually Live</h1>
          <p style={{ color: C.gray600, fontSize: "18px", maxWidth: "620px", margin: "0 auto", lineHeight: 1.7 }}>
            At HOBI, we build technology and content around the things that matter most — your wellbeing, your journeys, and your daily decisions. From wellness tools to travel content, everything we create is built with one purpose: helping you live better, wherever life takes you.
          </p>
        </div>
      </section>

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "60px" }}>
          {[
            { label: "Mission", icon: "🎯", title: "Our Mission", text: "We build technology and content that help people live better — wherever life takes them. By simplifying travel planning, supporting personal wellness, and promoting healthy eating, we help individuals make smarter decisions and feel more in control of their lives." },
            { label: "Vision", icon: "🔭", title: "Our Vision", text: "A world where technology serves humanity's deepest needs — for health, connection, and exploration. We envision a future where smart tools remove friction from daily life, giving people more time for what truly matters." },
          ].map((item) => (
            <div className="reveal" key={item.label}>
              <Card>
                <div style={{ fontSize: "36px", marginBottom: "16px" }}>{item.icon}</div>
                <div style={{ display: "inline-block", background: C.blueLight, color: C.blue, padding: "4px 12px", borderRadius: "99px", fontSize: "11px", fontFamily: "Sora", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>{item.label}</div>
                <h3 style={{ fontFamily: "Sora", fontWeight: 700, fontSize: "22px", marginBottom: "12px" }}>{item.title}</h3>
                <p style={{ color: C.gray600, lineHeight: 1.8, fontSize: "15px" }}>{item.text}</p>
              </Card>
            </div>
          ))}
        </div>

        {/* Values */}
        <SectionHeader label="Our Values" title="What Drives Us" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "60px" }}>
          {[
            { icon: "🧠", title: "Intentional Design", desc: "Every feature we build solves a real human problem." },
            { icon: "🤝", title: "People First", desc: "We design for human beings, not for metrics." },
            { icon: "🚀", title: "Continuous Growth", desc: "We believe in progress — personal and professional." },
            { icon: "🌍", title: "Global Perspective", desc: "Inspired by travel, built for a diverse world." },
          ].map((v) => (
            <div className="reveal" key={v.title}>
              <Card style={{ textAlign: "center" }}>
                <div style={{ fontSize: "36px", marginBottom: "14px" }}>{v.icon}</div>
                <h4 style={{ fontFamily: "Sora", fontWeight: 700, fontSize: "16px", marginBottom: "8px" }}>{v.title}</h4>
                <p style={{ color: C.gray600, fontSize: "14px", lineHeight: 1.6 }}>{v.desc}</p>
              </Card>
            </div>
          ))}
        </div>

        {/* Company */}
        <div className="reveal" style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.green})`, borderRadius: "24px", padding: "56px 48px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Sora", fontWeight: 800, fontSize: "clamp(24px, 3vw, 36px)", color: C.white, marginBottom: "16px" }}>Built with Purpose, Driven by Impact</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "17px", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            HOBI operates at the intersection of technology, wellness, and media — moving with intention, thinking deeply, and building products that create real impact in real people's lives.
          </p>
        </div>
      </Section>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRODUCTS PAGE
// ════════════════════════════════════════════════════════════════════════════
function ProductsPage() {
  useReveal();
  return (
    <div style={{ paddingTop: "68px" }}>
      <section style={{ padding: "80px 40px 60px", background: `linear-gradient(135deg, ${C.greenLight}, ${C.blueLight})`, textAlign: "center" }}>
        <div className="reveal">
          <span style={{ display: "inline-block", background: C.white, color: C.green, padding: "6px 16px", borderRadius: "99px", fontSize: "12px", fontFamily: "Sora", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>Our Products</span>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: C.gray900, marginBottom: "20px" }}>Stretch Wellness App</h1>
          <p style={{ color: C.gray600, fontSize: "18px", maxWidth: "540px", margin: "0 auto", lineHeight: 1.7 }}>
            Your personal stretching companion — personalized, guided, and powered by AI.
          </p>
        </div>
      </section>

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center", marginBottom: "80px" }}>
          <div className="reveal">
            <h2 style={{ fontFamily: "Sora", fontWeight: 700, fontSize: "clamp(24px, 3vw, 36px)", marginBottom: "20px", lineHeight: 1.2 }}>Flexibility, Simplified</h2>
            <p style={{ color: C.gray600, fontSize: "16px", lineHeight: 1.8, marginBottom: "28px" }}>
              The Stretch Wellness App combines beautiful design with smart technology to help you build a consistent stretching habit. Whether you're a desk worker, athlete, or traveler, our app adapts to your body and lifestyle.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "Sora", fontWeight: 800, fontSize: "32px", background: `linear-gradient(135deg, ${C.green}, ${C.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>50+</p>
                <p style={{ color: C.gray600, fontSize: "13px" }}>Routines</p>
              </div>
              <div style={{ width: 1, background: C.gray200 }} />
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "Sora", fontWeight: 800, fontSize: "32px", background: `linear-gradient(135deg, ${C.green}, ${C.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI</p>
                <p style={{ color: C.gray600, fontSize: "13px" }}>Powered</p>
              </div>
              <div style={{ width: 1, background: C.gray200 }} />
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "Sora", fontWeight: 800, fontSize: "32px", background: `linear-gradient(135deg, ${C.green}, ${C.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>5min</p>
                <p style={{ color: C.gray600, fontSize: "13px" }}>Minimum session</p>
              </div>
            </div>
          </div>

          {/* App mockup */}
          <div className="reveal" style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "280px", background: C.gray900, borderRadius: "36px", padding: "20px", boxShadow: "0 32px 80px rgba(0,0,0,0.2)" }}>
              <div style={{ background: `linear-gradient(160deg, ${C.green}, ${C.blue})`, borderRadius: "24px", padding: "24px", marginBottom: "12px", textAlign: "center" }}>
                <p style={{ fontFamily: "Sora", color: "rgba(255,255,255,0.7)", fontSize: "11px", marginBottom: "8px", letterSpacing: "1px", textTransform: "uppercase" }}>Good morning!</p>
                <p style={{ fontFamily: "Sora", fontWeight: 700, color: C.white, fontSize: "22px" }}>Ready to stretch?</p>
                <div style={{ fontSize: "48px", margin: "16px 0" }}>🧘</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { name: "Morning Routine", dur: "10 min", cal: "45 kcal", active: true },
                  { name: "Office Stretch", dur: "5 min", cal: "22 kcal", active: false },
                  { name: "Hip Opener", dur: "8 min", cal: "35 kcal", active: false },
                ].map((r) => (
                  <div key={r.name} style={{
                    background: r.active ? `linear-gradient(135deg, ${C.green}30, ${C.blue}20)` : "rgba(255,255,255,0.05)",
                    border: r.active ? `1px solid ${C.green}50` : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "14px", padding: "12px 14px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <p style={{ fontFamily: "Sora", color: C.white, fontSize: "13px", fontWeight: r.active ? 600 : 400 }}>{r.name}</p>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ color: r.active ? C.green : C.gray400, fontSize: "12px" }}>{r.dur}</p>
                      <p style={{ color: C.gray400, fontSize: "11px" }}>{r.cal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <SectionHeader label="Features" title="Everything You Need" subtitle="Built for people who want to feel better, move better, and live better." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {[
            { icon: "🎯", title: "Personalized Routines", desc: "Routines tailored to your body type, fitness level, and daily schedule. No one-size-fits-all." },
            { icon: "🎬", title: "Guided Animations", desc: "Smooth, clear animations guide every movement so you always know exactly what to do." },
            { icon: "🤖", title: "AI Routine Generation", desc: "Our AI analyzes your patterns and generates optimal stretch plans that evolve with you." },
            { icon: "📊", title: "Progress Tracking", desc: "Visual dashboards show your consistency, flexibility improvements, and milestone achievements." },
            { icon: "🔥", title: "Calorie Estimation", desc: "Get accurate calorie burn estimates with detailed workout summaries after each session." },
            { icon: "📅", title: "Smart Scheduling", desc: "The app learns your schedule and sends smart reminders at the perfect moment to stretch." },
          ].map((f) => (
            <div className="reveal" key={f.title}>
              <Card>
                <div style={{ fontSize: "32px", marginBottom: "14px" }}>{f.icon}</div>
                <h3 style={{ fontFamily: "Sora", fontWeight: 700, fontSize: "18px", marginBottom: "10px" }}>{f.title}</h3>
                <p style={{ color: C.gray600, fontSize: "14px", lineHeight: 1.7 }}>{f.desc}</p>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal" style={{ marginTop: "60px", textAlign: "center", padding: "60px", background: `linear-gradient(135deg, ${C.greenLight}, ${C.blueLight})`, borderRadius: "24px" }}>
          <h3 style={{ fontFamily: "Sora", fontWeight: 700, fontSize: "28px", marginBottom: "16px" }}>Coming Soon to iOS &amp; Android</h3>
          <p style={{ color: C.gray600, marginBottom: "28px", fontSize: "16px" }}>Be the first to know when Stretch launches.</p>
          <Btn variant="green">Join the Waitlist →</Btn>
        </div>
      </Section>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// MEDIA PAGE
// ════════════════════════════════════════════════════════════════════════════
function MediaPage() {
  useReveal();
  return (
    <div style={{ paddingTop: "68px" }}>
      <section style={{ padding: "80px 40px 60px", background: C.gray900, textAlign: "center" }}>
        <div className="reveal">
          <span style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", color: C.white, padding: "6px 16px", borderRadius: "99px", fontSize: "12px", fontFamily: "Sora", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>Media & Content</span>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: C.white, marginBottom: "20px" }}>Stories That Move You</h1>
          <p style={{ color: C.gray400, fontSize: "18px", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Travel storytelling, lifestyle content, and healthy living inspiration for the modern explorer.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeader label="Watch" title="YouTube Channel" subtitle="Visual travel stories and wellness content from around the world." />
        <div className="reveal" style={{ background: C.gray50, borderRadius: "24px", padding: "40px", textAlign: "center", marginBottom: "48px", border: `1px solid ${C.gray200}` }}>
          <div style={{ width: "100%", maxWidth: "760px", margin: "0 auto", aspectRatio: "16/9", background: C.gray900, borderRadius: "16px", overflow: "hidden", position: "relative" }}>
            <iframe
              src="https://www.youtube.com/embed?listType=user_uploads&list=AnnieCannotCode"
              title="HOBI YouTube Channel"
              style={{ width: "100%", height: "100%", border: "none", position: "absolute", inset: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <a href="https://www.youtube.com/@AnnieCannotCode" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <Btn style={{ marginTop: "20px" }}>▶ Visit YouTube Channel</Btn>
          </a>
        </div>
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "60px" }}>
          {[
            { platform: "YouTube", handle: "@AnnieCannotCode", url: "https://www.youtube.com/@AnnieCannotCode", icon: "▶", bg: "#FF000010", border: "#FF000030", color: "#CC0000", desc: "Watch travel vlogs, wellness tips, and lifestyle content." },
            { platform: "TikTok", handle: "@heyyoufoundme2409", url: "https://www.tiktok.com/@heyyoufoundme2409", icon: "♪", bg: "#00000008", border: "#01010120", color: "#333", desc: "Short-form content, travel moments, and daily snippets." },
            { platform: "Instagram", handle: "@callmeannie2409", url: "https://www.instagram.com/callmeannie2409", icon: "📸", bg: "#E1306C10", border: "#E1306C30", color: "#C13584", desc: "Photo stories, behind the scenes, and daily inspiration." },
          ].map((s) => (
            <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={{ background: s.bg, border: `1.5px solid ${s.border}`, borderRadius: "20px", padding: "24px", transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>{s.icon}</div>
                <p style={{ fontFamily: "Sora", fontWeight: 700, color: s.color, fontSize: "16px", marginBottom: "4px" }}>{s.platform}</p>
                <p style={{ color: C.gray600, fontSize: "13px", marginBottom: "10px" }}>{s.handle}</p>
                <p style={{ color: C.gray600, fontSize: "13px", lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            </a>
          ))}
        </div>

        <SectionHeader label="Content" title="What We Create" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "60px" }}>
          {[
            { emoji: "✈️", cat: "Travel", title: "Destination Guides", desc: "In-depth travel guides that go beyond the tourist trail — culture, food, tips, and real experiences." },
            { emoji: "🥗", cat: "Wellness", title: "Healthy Eating Abroad", desc: "How to eat healthy while traveling — discovering nutritious local foods in every destination." },
            { emoji: "📍", cat: "Planning", title: "Itinerary Planning", desc: "Actionable trip plans with timing, budgets, and smart logistics for stress-free travel." },
            { emoji: "🌅", cat: "Lifestyle", title: "Life by Design", desc: "Intentional living content — how to build routines, habits, and a life that works for you." },
            { emoji: "🎒", cat: "Tips", title: "Packing & Gear", desc: "Minimalist packing guides and honest gear reviews for the smart modern traveler." },
            { emoji: "🧘", cat: "Wellness", title: "Wellness on the Road", desc: "Staying active, stretched, and mentally sharp wherever your travels take you." },
          ].map((item) => (
            <div className="reveal" key={item.title}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div style={{ fontSize: "32px" }}>{item.emoji}</div>
                  <span style={{ background: C.blueLight, color: C.blue, padding: "4px 10px", borderRadius: "99px", fontSize: "11px", fontFamily: "Sora", fontWeight: 600 }}>{item.cat}</span>
                </div>
                <h3 style={{ fontFamily: "Sora", fontWeight: 700, fontSize: "17px", marginBottom: "10px" }}>{item.title}</h3>
                <p style={{ color: C.gray600, fontSize: "14px", lineHeight: 1.6 }}>{item.desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// FUTURE PLANS PAGE
// ════════════════════════════════════════════════════════════════════════════
function FuturePlansPage() {
  useReveal();
  const roadmap = [
    { phase: "Phase 1", time: "Now", icon: "🚀", color: C.green, title: "Foundation", items: ["Launch Stretch Wellness App", "Build core content library", "Establish brand presence"] },
    { phase: "Phase 2", time: "2025–2026", icon: "📈", color: C.blue, title: "Growth", items: ["Expand wellness technology", "Build travel planning tools", "Grow YouTube audience"] },
    { phase: "Phase 3", time: "2026–2027", icon: "🤖", color: C.green, title: "AI Integration", items: ["AI-driven health recommendations", "Personalized travel AI planner", "Smart wellness coaching"] },
    { phase: "Phase 4", time: "2027+", icon: "🌍", color: C.blue, title: "Scale", items: ["New lifestyle app launches", "Global educational content", "Platform ecosystem"] },
  ];

  return (
    <div style={{ paddingTop: "68px" }}>
      <section style={{ padding: "80px 40px 60px", background: `linear-gradient(135deg, ${C.blueLight}, ${C.greenLight})`, textAlign: "center" }}>
        <div className="reveal">
          <span style={{ display: "inline-block", background: C.white, color: C.blue, padding: "6px 16px", borderRadius: "99px", fontSize: "12px", fontFamily: "Sora", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>Roadmap</span>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: C.gray900, marginBottom: "20px" }}>Where We're Headed</h1>
          <p style={{ color: C.gray600, fontSize: "18px", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            We're building for the long term — here's a glimpse of the future HOBI is creating.
          </p>
        </div>
      </section>

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "80px" }}>
          {roadmap.map((r, i) => (
            <div className="reveal" key={r.phase}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <span style={{ background: r.color === C.green ? C.greenLight : C.blueLight, color: r.color, padding: "6px 14px", borderRadius: "99px", fontSize: "12px", fontFamily: "Sora", fontWeight: 600 }}>{r.phase}</span>
                  <span style={{ color: C.gray400, fontSize: "13px" }}>{r.time}</span>
                </div>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>{r.icon}</div>
                <h3 style={{ fontFamily: "Sora", fontWeight: 700, fontSize: "20px", marginBottom: "16px" }}>{r.title}</h3>
                {r.items.map((it) => (
                  <div key={it} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: r.color === C.green ? C.greenLight : C.blueLight, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: r.color }}>→</div>
                    <span style={{ color: C.gray600, fontSize: "14px", lineHeight: 1.5 }}>{it}</span>
                  </div>
                ))}
              </Card>
            </div>
          ))}
        </div>

        {/* Vision areas */}
        <SectionHeader label="Vision" title="The Bigger Picture" subtitle="Four key areas where HOBI will create lasting impact." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          {[
            { icon: "💊", title: "Wellness Technology", desc: "A full suite of health apps that make preventive care accessible and engaging for everyone." },
            { icon: "🌐", title: "Lifestyle Apps", desc: "Tools that bridge travel, nutrition, fitness, and daily planning into one seamless ecosystem." },
            { icon: "📚", title: "Educational Content", desc: "Growing a global library of travel and wellness content that educates and inspires millions." },
            { icon: "🧬", title: "AI Health Recommendations", desc: "Deeply personalized AI that learns your health patterns and guides you proactively." },
          ].map((v) => (
            <div className="reveal" key={v.title}>
              <Card style={{ borderTop: `3px solid ${C.blue}` }}>
                <div style={{ fontSize: "32px", marginBottom: "14px" }}>{v.icon}</div>
                <h3 style={{ fontFamily: "Sora", fontWeight: 700, fontSize: "17px", marginBottom: "10px" }}>{v.title}</h3>
                <p style={{ color: C.gray600, fontSize: "14px", lineHeight: 1.6 }}>{v.desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// CONTACT PAGE
// ════════════════════════════════════════════════════════════════════════════
function ContactPage() {
  useReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
    }
  };

  const inputStyle = {
    width: "100%", padding: "14px 18px", borderRadius: "14px",
    border: `1.5px solid ${C.gray200}`, fontSize: "15px",
    fontFamily: "DM Sans", color: C.gray900, background: C.white,
    outline: "none", transition: "border-color 0.2s",
  };

  return (
    <div style={{ paddingTop: "68px" }}>
      <section style={{ padding: "80px 40px 60px", background: `linear-gradient(135deg, ${C.blueLight}, ${C.greenLight})`, textAlign: "center" }}>
        <div className="reveal">
          <span style={{ display: "inline-block", background: C.white, color: C.blue, padding: "6px 16px", borderRadius: "99px", fontSize: "12px", fontFamily: "Sora", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>Get in Touch</span>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: C.gray900, marginBottom: "20px" }}>Let's Talk</h1>
          <p style={{ color: C.gray600, fontSize: "18px", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
            Have a question, partnership idea, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "60px", alignItems: "start" }}>
          {/* Info */}
          <div>
            <div className="reveal">
              <h2 style={{ fontFamily: "Sora", fontWeight: 700, fontSize: "26px", marginBottom: "24px" }}>Contact Info</h2>
              {[
                { icon: "📧", label: "Email", val: "hello@hobi.com.au" },
                { icon: "📞", label: "Phone", val: "+61 0451 837 728" },
                { icon: "📍", label: "Location", val: "Australia · Remote-first" },
              ].map((c) => (
                <div key={c.label} style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", padding: "16px", background: C.gray50, borderRadius: "16px" }}>
                  <div style={{ width: 44, height: 44, background: C.blueLight, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <p style={{ color: C.gray400, fontSize: "12px", fontFamily: "Sora", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{c.label}</p>
                    <p style={{ color: C.gray900, fontSize: "15px", fontWeight: 500 }}>{c.val}</p>
                  </div>
                </div>
              ))}

              <h3 style={{ fontFamily: "Sora", fontWeight: 700, fontSize: "18px", margin: "28px 0 16px" }}>Social Media</h3>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {[
                  { icon: "▶", label: "YouTube", url: "https://www.youtube.com/@AnnieCannotCode" },
                  { icon: "📸", label: "Instagram", url: "https://www.instagram.com/callmeannie2409" },
                  { icon: "♪", label: "TikTok", url: "https://www.tiktok.com/@heyyoufoundme2409" },
                ].map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", background: C.blueLight, color: C.blue, padding: "10px 16px", borderRadius: "12px", cursor: "pointer", fontSize: "13px", fontFamily: "Sora", fontWeight: 600, transition: "background 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = `${C.blue}20`)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = C.blueLight)}
                    >
                      <span>{s.icon}</span> {s.label}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="reveal">
            <Card hover={false}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: "64px", marginBottom: "20px" }}>✅</div>
                  <h3 style={{ fontFamily: "Sora", fontWeight: 700, fontSize: "22px", marginBottom: "12px" }}>Message Sent!</h3>
                  <p style={{ color: C.gray600 }}>Thanks for reaching out. We'll be in touch shortly.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "Sora", fontWeight: 700, fontSize: "22px", marginBottom: "24px" }}>Send a Message</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontFamily: "Sora", fontWeight: 600, color: C.gray600, marginBottom: "8px" }}>Name *</label>
                      <input style={inputStyle} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        onFocus={(e) => (e.target.style.borderColor = C.blue)} onBlur={(e) => (e.target.style.borderColor = C.gray200)} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontFamily: "Sora", fontWeight: 600, color: C.gray600, marginBottom: "8px" }}>Email *</label>
                      <input style={inputStyle} placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onFocus={(e) => (e.target.style.borderColor = C.blue)} onBlur={(e) => (e.target.style.borderColor = C.gray200)} />
                    </div>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontFamily: "Sora", fontWeight: 600, color: C.gray600, marginBottom: "8px" }}>Subject</label>
                    <input style={inputStyle} placeholder="What's this about?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = C.blue)} onBlur={(e) => (e.target.style.borderColor = C.gray200)} />
                  </div>
                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontFamily: "Sora", fontWeight: 600, color: C.gray600, marginBottom: "8px" }}>Message *</label>
                    <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "140px" }} placeholder="Tell us more..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = C.blue)} onBlur={(e) => (e.target.style.borderColor = C.gray200)} />
                  </div>
                  <Btn onClick={handleSubmit} style={{ width: "100%", justifyContent: "center" }}>Send Message →</Btn>
                </>
              )}
            </Card>
          </div>
        </div>

        {/* Business enquiry */}
        <div className="reveal" style={{ marginTop: "60px", background: `linear-gradient(135deg, ${C.blue}, ${C.green})`, borderRadius: "24px", padding: "48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <h3 style={{ fontFamily: "Sora", fontWeight: 700, fontSize: "24px", color: C.white, marginBottom: "8px" }}>Business Enquiries</h3>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px" }}>Partnerships, collaborations, and press inquiries welcome.</p>
          </div>
          <Btn variant="outline" style={{ color: C.white, borderColor: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.1)" }}>hello@hobi.com.au</Btn>
        </div>
      </Section>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// APP SHELL
// ════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("Home");

  const pages = {
    "Home": <HomePage setPage={setPage} />,
    "About": <AboutPage />,
    "Products": <ProductsPage />,
    "Media": <MediaPage />,
    "Future Plans": <FuturePlansPage />,
    "Contact": <ContactPage />,
  };

  return (
    <>
      <GlobalStyle />
      <Navbar page={page} setPage={setPage} />
      <main>{pages[page]}</main>
      <Footer setPage={setPage} />
    </>
  );
}
