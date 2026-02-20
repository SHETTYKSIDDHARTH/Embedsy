import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .landing { font-family: 'Syne', sans-serif; cursor: none; }
  @media (pointer: coarse) { .landing { cursor: auto; } }

  #lp-cursor, #lp-cursor-ring { display: none; }
  @media (pointer: fine) {
    #lp-cursor      { display:block;position:fixed;width:10px;height:10px;background:#00FF87;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:transform .1s; }
    #lp-cursor-ring { display:block;position:fixed;width:36px;height:36px;border:1px solid rgba(0,255,135,.4);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:left .12s ease,top .12s ease,width .2s,height .2s; }
  }

  .lp-grid-bg {
    position:absolute;inset:0;pointer-events:none;
    background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);
    background-size:60px 60px;
    mask-image:radial-gradient(ellipse 80% 60% at 50% 0%,black 30%,transparent 100%);
    -webkit-mask-image:radial-gradient(ellipse 80% 60% at 50% 0%,black 30%,transparent 100%);
  }

  @keyframes lp-fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes lp-pulse  { 0%,100%{opacity:1} 50%{opacity:.25} }
  @keyframes lp-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }

  .lp-anim-1 { opacity:0;animation:lp-fadeUp .6s .2s  forwards; }
  .lp-anim-2 { opacity:0;animation:lp-fadeUp .7s .35s forwards; }
  .lp-anim-3 { opacity:0;animation:lp-fadeUp .7s .5s  forwards; }
  .lp-anim-4 { opacity:0;animation:lp-fadeUp .7s .65s forwards; }
  .lp-anim-5 { opacity:0;animation:lp-fadeUp .8s .8s  forwards; }

  .lp-pulse    { animation:lp-pulse 2s ease-in-out infinite; }
  .lp-bounce   { animation:lp-bounce .8s ease-in-out infinite; }
  .lp-bounce-2 { animation:lp-bounce .8s .15s ease-in-out infinite; }
  .lp-bounce-3 { animation:lp-bounce .8s .3s  ease-in-out infinite; }

  .lp-reveal { opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease; }
  .lp-reveal.lp-visible { opacity:1;transform:translateY(0); }

  .lp-step { position:relative;overflow:hidden;transition:border-color .3s; }
  .lp-step::before { content:'';position:absolute;inset:0;background:rgba(0,255,135,.06);opacity:0;transition:opacity .3s; }
  .lp-step:hover::before { opacity:1; }
  .lp-step:hover { border-color:rgba(0,255,135,.3) !important; }

  .lp-uc-card { transition:border-color .3s,transform .2s; }
  .lp-uc-card:hover { border-color:rgba(0,255,135,.3) !important;transform:translateY(-4px); }

  .lp-btn-primary { transition:all .2s; }
  .lp-btn-primary:hover { background:#00CC6E !important;transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,255,135,.25); }
  .lp-btn-ghost { transition:all .2s; }
  .lp-btn-ghost:hover { border-color:rgba(255,255,255,.25) !important;color:#f5f5f5 !important; }
  .lp-nav-link:hover  { color:#f5f5f5 !important; }
  .lp-ghost-nav:hover { color:#f5f5f5 !important; }
  .lp-feature-card { transition:border-color .3s; }
  .lp-feature-card:hover { border-color:rgba(0,255,135,.25) !important; }

  .lp-code-tab { cursor:none;border:none;background:none;font-family:'DM Mono',monospace;font-size:.72rem;letter-spacing:.06em;padding:.45rem 1rem;border-radius:4px;transition:background .2s,color .2s; }
  .lp-code-tab.active { background:rgba(0,255,135,.12);color:#00FF87; }
  .lp-code-tab:not(.active) { color:rgba(245,245,245,.35); }
  .lp-code-tab:not(.active):hover { color:rgba(245,245,245,.65); }

  .lp-copy-btn { cursor:none;border:none;background:rgba(255,255,255,.06);color:rgba(245,245,245,.45);font-family:'DM Mono',monospace;font-size:.65rem;padding:.3rem .7rem;border-radius:4px;transition:background .2s,color .2s;letter-spacing:.04em;white-space:nowrap; }
  .lp-copy-btn:hover { background:rgba(0,255,135,.12);color:#00FF87; }

  /* ── HAMBURGER ── */
  .lp-hamburger { display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:.5rem;z-index:101;position:relative; }
  .lp-hamburger span { display:block;width:22px;height:2px;background:#f5f5f5;border-radius:2px;transition:all .25s; }
  .lp-hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
  .lp-hamburger.open span:nth-child(2) { opacity:0;transform:scaleX(0); }
  .lp-hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

  /* ── MOBILE MENU OVERLAY ── */
  .lp-mobile-menu {
    position:fixed;inset:0;
    background:rgba(10,10,10,.97);
    z-index:100;
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2.5rem;
    opacity:0;pointer-events:none;
    transition:opacity .25s;
  }
  .lp-mobile-menu.open { opacity:1;pointer-events:all; }

  /* ── BREAKPOINTS ── */

  /* Nav */
  @media (max-width:768px) {
    .lp-nav-links, .lp-nav-ctas { display:none !important; }
    .lp-hamburger { display:flex !important; }
    .lp-nav-wrap  { padding:1.1rem 1.5rem !important; }
  }

  /* Hero */
  @media (max-width:768px) {
    .lp-hero-section { padding:7.5rem 1.5rem 4rem !important; }
    .lp-hero-btns { flex-direction:column;align-items:stretch; }
    .lp-hero-btns > * { justify-content:center; }
    .lp-hero-code { max-width:100% !important; }
  }

  /* Steps */
  @media (max-width:900px) {
    .lp-steps-grid { grid-template-columns:1fr !important; }
  }

  /* Section padding */
  @media (max-width:768px) {
    .lp-pad { padding:4rem 1.5rem !important; }
  }

  /* Features two-col */
  @media (max-width:1024px) {
    .lp-features-2col { grid-template-columns:1fr !important; gap:2.5rem !important; }
  }
  @media (max-width:768px) {
    .lp-features-pad { padding:4rem 1.5rem !important; }
  }

  /* Widget mockup — hide below 1024 */
  @media (max-width:1024px) { .lp-mockup { display:none !important; } }

  /* Use-case grid */
  @media (max-width:900px)  { .lp-uc-grid { grid-template-columns:repeat(2,1fr) !important; } }
  @media (max-width:520px)  { .lp-uc-grid { grid-template-columns:1fr !important; } }

  /* Stats */
  @media (max-width:768px)  { .lp-stats-grid { grid-template-columns:repeat(2,1fr) !important; } }
  @media (max-width:380px)  { .lp-stats-grid { grid-template-columns:1fr !important; } }

  /* CTA */
  @media (max-width:768px) {
    .lp-cta-pad  { padding:5rem 1.5rem !important; }
    .lp-cta-btns { flex-direction:column;align-items:center; }
    .lp-cta-btns > * { width:100%;max-width:300px;justify-content:center; }
  }

  /* Footer */
  @media (max-width:768px) {
    .lp-footer { flex-direction:column !important;align-items:flex-start !important;padding:2rem 1.5rem !important; }
    .lp-footer-links { flex-wrap:wrap;gap:1rem !important; }
  }

  /* Code block chrome on tiny screens */
  @media (max-width:440px) {
    .lp-code-filename { display:none !important; }
    .lp-code-chrome   { gap:.35rem !important; }
  }
`;

export default function Landing() {
  const cursorRef     = useRef(null);
  const cursorRingRef = useRef(null);
  const [scrolled,  setScrolled]  = useState(false);
  const [activeTab, setActiveTab] = useState("react");
  const [copied,    setCopied]    = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  /* cursor tracking */
  useEffect(() => {
    const move = (e) => {
      cursorRef.current     && Object.assign(cursorRef.current.style,     { left: e.clientX + "px", top: e.clientY + "px" });
      cursorRingRef.current && Object.assign(cursorRingRef.current.style, { left: e.clientX + "px", top: e.clientY + "px" });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* scroll nav */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* close menu on resize */
  useEffect(() => {
    const fn = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  /* body scroll lock */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* reveal on scroll */
  useEffect(() => {
    const els = document.querySelectorAll(".lp-reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("lp-visible"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* cursor scale on hover */
  useEffect(() => {
    const enter = () => {
      cursorRingRef.current && Object.assign(cursorRingRef.current.style, { width: "56px", height: "56px" });
      cursorRef.current && (cursorRef.current.style.transform = "translate(-50%,-50%) scale(0)");
    };
    const leave = () => {
      cursorRingRef.current && Object.assign(cursorRingRef.current.style, { width: "36px", height: "36px" });
      cursorRef.current && (cursorRef.current.style.transform = "translate(-50%,-50%) scale(1)");
    };
    const targets = document.querySelectorAll("a,button");
    targets.forEach((t) => { t.addEventListener("mouseenter", enter); t.addEventListener("mouseleave", leave); });
    return () => targets.forEach((t) => { t.removeEventListener("mouseenter", enter); t.removeEventListener("mouseleave", leave); });
  }, [menuOpen]);

  const G = "#00FF87", W = "#f5f5f5", D = "#0A0A0A", D1 = "#111111", D2 = "#1A1A1A", border = "rgba(255,255,255,.07)";

  const reactSnippet = `import { EmbedsynWidget } from '@embedsy/react';

export default function App() {
  return (
    <>
      {/* Your app content */}
      <EmbedsynWidget
        projectId="your-project-id"
        apiKey="embedsy_xxxx"
        title="Ask us anything!"
        position="bottom-right"
        themeColor="#00FF87"
      />
    </>
  );
}`;
  const htmlSnippet = `<!-- Drop this on any page -->
<script src="https://cdn.embedsy.io/widget.js"></script>
<script>
  window.Embedsy.init({
    projectId: 'your-project-id',
    apiKey: 'embedsy_xxxx',
    title: 'Ask us anything!',
    position: 'bottom-right',
  });
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab === "react" ? reactSnippet : htmlSnippet)
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  };

  const ReactCodeBlock = () => (
    <pre style={{ padding: "1.4rem 1.5rem", fontFamily: "'DM Mono',monospace", fontSize: ".78rem", lineHeight: 1.9, overflowX: "auto", margin: 0, color: "rgba(245,245,245,.75)" }}>
      <div style={{ background: "rgba(0,255,135,.05)", borderLeft: `2px solid ${G}`, padding: ".35rem .9rem", marginBottom: "1rem", borderRadius: "0 4px 4px 0", display: "flex", alignItems: "center", gap: ".6rem" }}>
        <span style={{ color: "rgba(245,245,245,.3)" }}>$</span>
        <span style={{ color: G }}>npm install @embedsy/react</span>
      </div>
      <span style={{ color: "#7b8cde" }}>import</span>{" { "}<span style={{ color: G }}>EmbedsynWidget</span>{" } "}<span style={{ color: "#7b8cde" }}>from</span>{" "}<span style={{ color: "#ce9178" }}>'@embedsy/react'</span>{";\n\n"}
      <span style={{ color: "#7b8cde" }}>export default function</span>{" "}<span style={{ color: "#dcdcaa" }}>App</span>{"() {\n  "}<span style={{ color: "#7b8cde" }}>return</span>{" (\n    <>\n      "}<span style={{ color: "rgba(245,245,245,.28)" }}>{"// Your app content"}</span>{"\n\n      "}<span style={{ color: "#7b8cde" }}>&lt;</span><span style={{ color: G }}>EmbedsynWidget</span>{"\n        "}<span style={{ color: "#ce9178" }}>projectId</span>{"="}<span style={{ color: "#ce9178" }}>"your-project-id"</span>{"\n        "}<span style={{ color: "#ce9178" }}>apiKey</span>{"="}<span style={{ color: "#ce9178" }}>"embedsy_xxxx"</span>{"\n        "}<span style={{ color: "#ce9178" }}>title</span>{"="}<span style={{ color: "#ce9178" }}>"Ask us anything!"</span>{"\n        "}<span style={{ color: "#ce9178" }}>position</span>{"="}<span style={{ color: "#ce9178" }}>"bottom-right"</span>{"\n        "}<span style={{ color: "#ce9178" }}>themeColor</span>{"="}<span style={{ color: "#ce9178" }}>"#00FF87"</span>{"\n      "}<span style={{ color: "#7b8cde" }}>/&gt;</span>{"\n    </>\n  );\n}"}
    </pre>
  );

  const HtmlCodeBlock = () => (
    <pre style={{ padding: "1.4rem 1.5rem", fontFamily: "'DM Mono',monospace", fontSize: ".8rem", lineHeight: 1.9, overflowX: "auto", margin: 0 }}>
      <span style={{ color: "#4a4a4a" }}>{"<!-- Drop this on any page -->"}</span>{"\n"}
      <span style={{ color: "#7b8cde" }}>&lt;script</span><span style={{ color: "rgba(245,245,245,.5)" }}> src=</span><span style={{ color: G }}>"https://cdn.embedsy.io/widget.js"</span><span style={{ color: "#7b8cde" }}>&gt;&lt;/script&gt;</span>{"\n"}
      <span style={{ color: "#7b8cde" }}>&lt;script&gt;</span>{"\n  window."}<span style={{ color: "rgba(245,245,245,.5)" }}>Embedsy</span>{".init({\n    "}<span style={{ color: "#ce9178" }}>projectId:</span><span style={{ color: G }}> 'your-project-id'</span>{",\n    "}<span style={{ color: "#ce9178" }}>apiKey:</span><span style={{ color: G }}> 'embedsy_xxxx'</span>{",\n    "}<span style={{ color: "#ce9178" }}>title:</span><span style={{ color: G }}> 'Ask us anything!'</span>{",\n    "}<span style={{ color: "#ce9178" }}>position:</span><span style={{ color: G }}> 'bottom-right'</span>{",\n  });\n"}<span style={{ color: "#7b8cde" }}>&lt;/script&gt;</span>
    </pre>
  );

  const navLinks = [["How it Works", "#how"], ["Features", "#features"], ["Use Cases", "#usecases"]];

  const steps = [
    { n: "01", title: "Create a Project", desc: "Sign up and create a project in seconds. Name it, configure the widget appearance, and grab your API key." },
    { n: "02", title: "Upload Your Documents", desc: "Upload PDFs, Word docs, or paste text. Embedsy chunks, embeds, and indexes everything automatically into a vector store." },
    { n: "03", title: "Embed & Go Live", desc: "Install the React package or drop two script tags into any site. Your AI-powered chat widget is live — answering questions with cited sources." },
  ];

  const features = [
    { icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6", title: "Multi-format Ingestion", desc: "PDFs, Word docs, plain text — parsed, chunked intelligently, stored in a vector database." },
    { icon: "M11 11m-8 0a8 8 0 1 0 16 0 8 8 0 0 0-16 0 M21 21l-4.35-4.35", title: "Semantic RAG Search", desc: "Queries matched against your content using vector similarity — precise retrieval, no keyword guessing." },
    { icon: "M12 2L2 7l10 5 10-5-10-5 M2 17l10 5 10-5 M2 12l10 5 10-5", title: "Drop-in Widget", desc: "React package or two script tags and you're live. Works on HTML, React, Vue, Next.js — no framework lock-in." },
    { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", title: "Source Citations", desc: "Every answer links back to the exact document chunk — transparent, trustworthy AI." },
    { icon: "M3 3h18v18H3z M3 9h18 M9 21V9", title: "Real-time Dashboard", desc: "Manage projects, view usage stats, re-upload documents, and tweak widget settings — all in one place." },
  ];

  const usecases = [
    { title: "Documentation Sites", desc: "Let users ask natural-language questions and get answers from your entire docs, not just a single page." },
    { title: "E-commerce Support", desc: "Reduce tickets by letting shoppers ask about shipping, specs, and returns — answered instantly." },
    { title: "Internal Knowledge", desc: "Give employees an AI assistant trained on wikis, HR policies, and SOPs — private and secure." },
    { title: "EdTech & Courses", desc: "Help learners get context-aware answers from course materials without leaving the environment." },
    { title: "Legal & Compliance", desc: "Index contracts and regulatory docs so your team can query complex legal material conversationally." },
    { title: "SaaS Onboarding", desc: "Guide new users with an AI tutor trained on your feature docs, changelogs, and help articles." },
  ];

  return (
    <div className="landing" style={{ background: D, color: W, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{globalStyles}</style>
      <div id="lp-cursor" ref={cursorRef} />
      <div id="lp-cursor-ring" ref={cursorRingRef} />

      {/* ── MOBILE MENU OVERLAY ── */}
      <div className={`lp-mobile-menu${menuOpen ? " open" : ""}`}>
        {navLinks.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}
            style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-.03em", color: W, textDecoration: "none", transition: "color .2s" }}
            onMouseEnter={e => e.currentTarget.style.color = G}
            onMouseLeave={e => e.currentTarget.style.color = W}
          >
            {label}
          </a>
        ))}
        <div style={{ display: "flex", flexDirection: "column", gap: ".75rem", width: "100%", maxWidth: 260, marginTop: "1rem" }}>
          <Link to="/login" onClick={() => setMenuOpen(false)}
            style={{ textAlign: "center", fontSize: ".9rem", fontWeight: 500, color: "rgba(245,245,245,.6)", textDecoration: "none", padding: ".7rem", borderRadius: 4, border: `1px solid ${border}` }}>
            Log in
          </Link>
          <Link to="/signup" onClick={() => setMenuOpen(false)}
            style={{ textAlign: "center", fontSize: ".9rem", fontWeight: 700, color: D, background: G, padding: ".75rem 1.5rem", borderRadius: 4, textDecoration: "none" }}>
            Get Started →
          </Link>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className="lp-nav-wrap" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 102, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.4rem 4rem", borderBottom: scrolled ? `1px solid ${border}` : "1px solid transparent", background: scrolled ? "rgba(10,10,10,.9)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", transition: "all .3s", fontFamily: "'Syne',sans-serif" }}>
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: ".45rem", textDecoration: "none", color: W, fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-.03em", zIndex: 101, position: "relative" }}>
          <span className="lp-pulse" style={{ display: "inline-block", width: 8, height: 8, background: G, borderRadius: "50%" }} />
          Embedsy
        </a>

        <ul className="lp-nav-links" style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}>
          {navLinks.map(([label, href]) => (
            <li key={label}>
              <a href={href} className="lp-nav-link" style={{ fontSize: ".82rem", fontWeight: 500, color: "rgba(245,245,245,.55)", textDecoration: "none", letterSpacing: ".06em", textTransform: "uppercase", transition: "color .2s" }}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="lp-nav-ctas" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link to="/login" className="lp-ghost-nav" style={{ fontSize: ".85rem", fontWeight: 500, color: "rgba(245,245,245,.55)", textDecoration: "none", transition: "color .2s" }}>Log in</Link>
          <Link to="/signup" style={{ fontSize: ".85rem", fontWeight: 700, color: D, background: G, padding: ".55rem 1.3rem", borderRadius: 4, textDecoration: "none" }}>Get Started</Link>
        </div>

        <button className={`lp-hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="lp-hero-section" style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "10rem 4rem 6rem", position: "relative", overflow: "hidden" }}>
        <div className="lp-grid-bg" />
        <div style={{ position: "absolute", width: 600, height: 600, background: "radial-gradient(circle,rgba(0,255,135,.1) 0%,transparent 70%)", top: "40%", left: "50%", transform: "translate(-50%,-60%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", textAlign: "center", maxWidth: 860, width: "100%" }}>
          <div className="lp-anim-1" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", background: "rgba(0,255,135,.07)", border: "1px solid rgba(0,255,135,.2)", padding: ".3rem 1rem", borderRadius: 99, fontFamily: "'DM Mono',monospace", fontSize: ".72rem", color: G, letterSpacing: ".08em", marginBottom: "1.8rem" }}>
            <span className="lp-pulse" style={{ width: 6, height: 6, background: G, borderRadius: "50%", display: "inline-block" }} />
            Powered by RAG · Works on any site
          </div>

          <h1 className="lp-anim-2" style={{ fontSize: "clamp(2.6rem,7vw,6rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-.04em", color: W }}>
            <em style={{ fontStyle: "normal" }}>Embedsy.</em>
          </h1>

          <p className="lp-anim-3" style={{ marginTop: "1.5rem", fontSize: "clamp(.92rem,2vw,1.1rem)", fontWeight: 400, color: "rgba(245,245,245,.6)", lineHeight: 1.75, maxWidth: 520, margin: "1.5rem auto 0" }}>
            Embed an intelligent chat widget on any website in minutes. Upload your docs, train the AI, and let your users find answers — instantly.
          </p>

          <div className="lp-anim-4 lp-hero-btns" style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <Link to="/signup" className="lp-btn-primary" style={{ fontFamily: "'Syne',sans-serif", fontSize: ".95rem", fontWeight: 700, color: D, background: G, padding: ".85rem 2rem", borderRadius: 4, textDecoration: "none", display: "flex", alignItems: "center", gap: ".5rem", letterSpacing: ".02em" }}>
              Start for free
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <a href="#how" className="lp-btn-ghost" style={{ fontFamily: "'Syne',sans-serif", fontSize: ".95rem", fontWeight: 500, color: "rgba(245,245,245,.6)", background: "none", border: `1px solid ${border}`, padding: ".85rem 2rem", borderRadius: 4, textDecoration: "none", display: "flex", alignItems: "center", gap: ".5rem" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
              See how it works
            </a>
          </div>

          {/* code block */}
          <div className="lp-anim-5 lp-hero-code" style={{ marginTop: "4rem", background: D1, border: `1px solid ${border}`, borderRadius: 8, overflow: "hidden", textAlign: "left", maxWidth: 580, marginLeft: "auto", marginRight: "auto" }}>
            <div className="lp-code-chrome" style={{ display: "flex", alignItems: "center", gap: ".5rem", padding: ".7rem 1.2rem", borderBottom: `1px solid ${border}`, background: D2, flexWrap: "wrap" }}>
              {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
                <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block", flexShrink: 0 }} />
              ))}
              <div style={{ display: "flex", gap: ".25rem", marginLeft: ".75rem" }}>
                <button className={`lp-code-tab${activeTab === "react" ? " active" : ""}`} onClick={() => setActiveTab("react")}>React</button>
                <button className={`lp-code-tab${activeTab === "html"  ? " active" : ""}`} onClick={() => setActiveTab("html")}>HTML</button>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: ".6rem" }}>
                <span className="lp-code-filename" style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", color: "rgba(245,245,245,.3)" }}>
                  {activeTab === "react" ? "App.jsx" : "index.html"}
                </span>
                <button className="lp-copy-btn" onClick={handleCopy}>{copied ? "✓ copied" : "copy"}</button>
              </div>
            </div>
            {activeTab === "react" ? <ReactCodeBlock /> : <HtmlCodeBlock />}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="lp-pad" style={{ padding: "6rem 4rem", borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p className="lp-reveal" style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: G, marginBottom: "1rem" }}>Process</p>
          <h2 className="lp-reveal" style={{ fontSize: "clamp(1.75rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1.1, color: W, maxWidth: 480 }}>
            From docs to deployed in three steps.
          </h2>
          <div className="lp-reveal lp-steps-grid" style={{ marginTop: "3.5rem", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px" }}>
            {steps.map((s) => (
              <div key={s.n} className="lp-step" style={{ padding: "2.5rem", border: `1px solid ${border}`, background: D1 }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "2.2rem", fontWeight: 300, color: "rgba(0,255,135,.18)", lineHeight: 1, marginBottom: "1.5rem" }}>{s.n}</div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-.02em", marginBottom: ".6rem" }}>{s.title}</h3>
                <p style={{ fontSize: ".88rem", color: "rgba(245,245,245,.55)", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="lp-features-pad" style={{ padding: "6rem 4rem", borderTop: `1px solid ${border}`, background: D1 }}>
        <div className="lp-features-2col" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          <div>
            <p className="lp-reveal" style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: G, marginBottom: "1rem" }}>Features</p>
            <h2 className="lp-reveal" style={{ fontSize: "clamp(1.75rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1.1, color: W, maxWidth: 380 }}>
              Everything you need.<br />Nothing you don't.
            </h2>
            <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {features.map((f) => (
                <div key={f.title} className="lp-reveal lp-feature-card" style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.25rem", border: `1px solid ${border}`, borderRadius: 8, background: D2 }}>
                  <div style={{ width: 36, height: 36, background: "rgba(0,255,135,.07)", border: "1px solid rgba(0,255,135,.18)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon} /></svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: ".93rem", fontWeight: 700, marginBottom: ".25rem" }}>{f.title}</h4>
                    <p style={{ fontSize: ".84rem", color: "rgba(245,245,245,.55)", lineHeight: 1.65 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* widget mockup — hidden <1024px */}
          <div className="lp-reveal lp-mockup">
            <div style={{ background: D2, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: ".7rem 1rem", background: D1, borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: ".4rem" }}>
                {["rgba(255,95,87,.5)", "rgba(255,189,46,.5)", "rgba(40,200,64,.5)"].map((c) => (
                  <span key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, display: "inline-block" }} />
                ))}
                <span style={{ margin: "0 auto", background: D, borderRadius: 4, padding: ".2rem .7rem", fontFamily: "'DM Mono',monospace", fontSize: ".65rem", color: "rgba(245,245,245,.3)" }}>yoursite.com/support</span>
              </div>
              <div style={{ padding: "2rem", minHeight: 300, background: D2, position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
                  {[70, 90, 55, 80, 65].map((w, i) => (
                    <div key={i} style={{ height: 8, width: w + "%", borderRadius: 4, background: "rgba(255,255,255,.05)" }} />
                  ))}
                </div>
                <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: ".75rem" }}>
                  <div style={{ width: 240, background: D1, border: "1px solid rgba(0,255,135,.22)", borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.6)" }}>
                    <div style={{ background: G, padding: ".7rem 1rem", display: "flex", alignItems: "center", gap: ".5rem" }}>
                      <span style={{ width: 8, height: 8, background: "rgba(0,0,0,.3)", borderRadius: "50%", display: "inline-block" }} />
                      <span style={{ fontSize: ".72rem", fontWeight: 700, color: D, fontFamily: "'Syne',sans-serif" }}>Ask us anything!</span>
                    </div>
                    <div style={{ padding: ".75rem", display: "flex", flexDirection: "column", gap: ".5rem" }}>
                      <div style={{ background: D2, borderRadius: 8, padding: ".45rem .7rem", fontSize: ".68rem", lineHeight: 1.5, color: "rgba(245,245,245,.6)", maxWidth: "85%" }}>
                        Hi! I can answer questions about our docs. What would you like to know?
                      </div>
                      <div style={{ background: G, borderRadius: 8, padding: ".45rem .7rem", fontSize: ".68rem", fontWeight: 600, color: D, alignSelf: "flex-end", maxWidth: "85%" }}>
                        How do I reset my API key?
                      </div>
                      <div style={{ display: "flex", gap: 3, padding: ".45rem .7rem" }}>
                        {["lp-bounce", "lp-bounce-2", "lp-bounce-3"].map((cls) => (
                          <span key={cls} className={cls} style={{ width: 5, height: 5, background: "rgba(245,245,245,.4)", borderRadius: "50%", display: "inline-block" }} />
                        ))}
                      </div>
                    </div>
                    <div style={{ borderTop: `1px solid ${border}`, padding: ".5rem .75rem", display: "flex", alignItems: "center", gap: ".5rem" }}>
                      <span style={{ flex: 1, fontSize: ".68rem", color: "rgba(245,245,245,.25)", fontFamily: "'Syne',sans-serif" }}>Type a message…</span>
                      <div style={{ width: 22, height: 22, background: G, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={D} strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: 46, height: 46, background: G, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,255,135,.35)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={D} strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section id="usecases" className="lp-pad" style={{ padding: "6rem 4rem", borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p className="lp-reveal" style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: G, marginBottom: "1rem" }}>Use Cases</p>
          <h2 className="lp-reveal" style={{ fontSize: "clamp(1.75rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1.1, color: W, maxWidth: 420 }}>Built for teams that move fast.</h2>
          <p className="lp-reveal" style={{ marginTop: "1rem", fontSize: "1rem", color: "rgba(245,245,245,.55)", lineHeight: 1.75, maxWidth: 460 }}>
            Whether you're a startup or enterprise — Embedsy slots into any existing site with zero friction.
          </p>
          <div className="lp-uc-grid" style={{ marginTop: "3.5rem", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {usecases.map((u, i) => (
              <div key={u.title} className="lp-reveal lp-uc-card" style={{ padding: "2rem", border: `1px solid ${border}`, borderRadius: 8, background: D1, transitionDelay: `${i * 0.07}s` }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-.02em", marginBottom: ".5rem" }}>{u.title}</h3>
                <p style={{ fontSize: ".85rem", color: "rgba(245,245,245,.55)", lineHeight: 1.65 }}>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ borderTop: `1px solid ${border}`, background: D1 }}>
        <div className="lp-stats-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2px" }}>
          {[["<2m","Average setup time"],["100%","Dev Friendly"],["10+","File formats supported"],["∞","Sites you can embed on"]].map(([n, l]) => (
            <div key={l} className="lp-reveal" style={{ padding: "3rem 2rem", textAlign: "center", border: `1px solid ${border}` }}>
              <div style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-.04em", color: G, lineHeight: 1 }}>{n}</div>
              <div style={{ marginTop: ".75rem", fontSize: ".82rem", color: "rgba(245,245,245,.5)", letterSpacing: ".04em" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-cta-pad" style={{ padding: "7rem 4rem", borderTop: `1px solid ${border}`, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 500, height: 300, background: "radial-gradient(ellipse,rgba(0,255,135,.07) 0%,transparent 70%)", left: "50%", top: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
          <p className="lp-reveal" style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: G, marginBottom: "1rem" }}>Get Started</p>
          <h2 className="lp-reveal" style={{ fontSize: "clamp(2rem,5vw,3.8rem)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1.05, marginBottom: "1.25rem" }}>
            Your AI support widget awaits.
          </h2>
          <p className="lp-reveal" style={{ fontSize: "clamp(.9rem,2vw,1rem)", color: "rgba(245,245,245,.55)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Join hundreds of teams already using Embedsy to answer user questions — instantly and accurately.
          </p>
          <div className="lp-reveal lp-cta-btns" style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/signup" className="lp-btn-primary" style={{ fontFamily: "'Syne',sans-serif", fontSize: ".95rem", fontWeight: 700, color: D, background: G, padding: ".85rem 2rem", borderRadius: 4, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: ".5rem" }}>
              Deploy your widget
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <a href="#" className="lp-btn-ghost" style={{ fontFamily: "'Syne',sans-serif", fontSize: ".95rem", fontWeight: 500, color: "rgba(245,245,245,.6)", background: "none", border: `1px solid ${border}`, padding: ".85rem 2rem", borderRadius: 4, textDecoration: "none" }}>
              Read the docs
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer" style={{ borderTop: `1px solid ${border}`, padding: "2.5rem 4rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: ".45rem", textDecoration: "none", color: W, fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-.03em", fontFamily: "'Syne',sans-serif" }}>
          <span className="lp-pulse" style={{ display: "inline-block", width: 8, height: 8, background: G, borderRadius: "50%" }} />
          Embedsy
        </a>
        <ul className="lp-footer-links" style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
          {["Docs", "GitHub", "Privacy", "Terms"].map((l) => (
            <li key={l}><a href="#" className="lp-nav-link" style={{ fontSize: ".8rem", color: "rgba(245,245,245,.4)", textDecoration: "none", transition: "color .2s" }}>{l}</a></li>
          ))}
        </ul>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", color: "rgba(255,255,255,.18)" }}>© 2026 Embedsy. All rights reserved.</span>
      </footer>
    </div>
  );
}