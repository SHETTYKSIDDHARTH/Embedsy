import { jsx as r, jsxs as c } from "react/jsx-runtime";
import { useState as f, useRef as S, useEffect as b } from "react";
function C({ onClick: t, themeColor: e = "#00FF87" }) {
  const [n, a] = f(!1);
  return /* @__PURE__ */ r(
    "button",
    {
      onClick: t,
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
      "aria-label": "Open chat",
      style: {
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: e,
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: n ? "0 8px 32px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.3)",
        transform: n ? "scale(1.1)" : "scale(1)",
        transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
        color: "#000",
        outline: "none",
        padding: "0",
        flexShrink: "0"
      },
      children: /* @__PURE__ */ r("svg", { width: "26", height: "26", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ r(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2.5,
          d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        }
      ) })
    }
  );
}
const y = [
  { code: "en", label: "EN", name: "English" },
  { code: "hi", label: "HI", name: "Hindi" },
  { code: "es", label: "ES", name: "Spanish" },
  { code: "fr", label: "FR", name: "French" },
  { code: "de", label: "DE", name: "German" },
  { code: "pt", label: "PT", name: "Portuguese" },
  { code: "it", label: "IT", name: "Italian" },
  { code: "ar", label: "AR", name: "Arabic" },
  { code: "zh", label: "ZH", name: "Chinese" },
  { code: "ja", label: "JA", name: "Japanese" },
  { code: "ko", label: "KO", name: "Korean" }
];
function L({ onClose: t, title: e = "Chat with us", themeColor: n = "#00FF87", selectedLanguage: a, onLanguageChange: s }) {
  const [o, l] = f(!1), i = y.find((p) => p.code === a) || y[0];
  n === "#ffffff" || n === "#fff" || n.toLowerCase();
  const d = "#000000";
  return /* @__PURE__ */ c("div", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    background: n,
    flexShrink: "0",
    position: "relative"
  }, children: [
    /* @__PURE__ */ c("div", { style: { display: "flex", alignItems: "center", gap: "8px", flex: 1 }, children: [
      /* @__PURE__ */ r("div", { style: {
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: "#000",
        opacity: 0.4,
        boxShadow: "0 0 0 2px rgba(0,0,0,0.15)"
      } }),
      /* @__PURE__ */ r("span", { style: { fontSize: "14px", fontWeight: "700", color: d, margin: 0 }, children: e })
    ] }),
    /* @__PURE__ */ c("div", { style: { display: "flex", alignItems: "center", gap: "6px" }, children: [
      /* @__PURE__ */ c("div", { style: { position: "relative" }, children: [
        /* @__PURE__ */ c(
          "button",
          {
            onClick: () => l(!o),
            style: {
              display: "flex",
              alignItems: "center",
              gap: "3px",
              background: "rgba(0,0,0,0.15)",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: "6px",
              padding: "4px 8px",
              fontSize: "11px",
              fontWeight: "700",
              color: d,
              cursor: "pointer",
              letterSpacing: "0.5px",
              transition: "background 0.2s",
              outline: "none"
            },
            children: [
              i.label,
              /* @__PURE__ */ r(
                "svg",
                {
                  width: "10",
                  height: "10",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  style: { transform: o ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" },
                  children: /* @__PURE__ */ r("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M19 9l-7 7-7-7" })
                }
              )
            ]
          }
        ),
        o && /* @__PURE__ */ r("div", { style: {
          position: "absolute",
          top: "calc(100% + 8px)",
          right: "0",
          background: "#111",
          border: "1px solid #2a2a2a",
          borderRadius: "12px",
          overflow: "hidden",
          zIndex: "10000001",
          minWidth: "150px",
          boxShadow: "0 12px 32px rgba(0,0,0,0.6)"
        }, children: y.map((p) => /* @__PURE__ */ c(
          "button",
          {
            onClick: () => {
              s(p.code), l(!1);
            },
            style: {
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              padding: "9px 14px",
              background: p.code === a ? "rgba(255,255,255,0.06)" : "transparent",
              border: "none",
              cursor: "pointer",
              transition: "background 0.15s",
              textAlign: "left",
              outline: "none"
            },
            children: [
              /* @__PURE__ */ r("span", { style: { fontSize: "11px", fontWeight: "700", color: n, minWidth: "26px", letterSpacing: "0.5px" }, children: p.label }),
              /* @__PURE__ */ r("span", { style: { fontSize: "12px", color: "#ccc" }, children: p.name })
            ]
          },
          p.code
        )) })
      ] }),
      /* @__PURE__ */ r(
        "button",
        {
          onClick: t,
          "aria-label": "Close chat",
          style: {
            background: "rgba(0,0,0,0.15)",
            border: "none",
            borderRadius: "6px",
            padding: "5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: d,
            transition: "background 0.2s",
            outline: "none"
          },
          children: /* @__PURE__ */ r("svg", { width: "16", height: "16", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ r("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M6 18L18 6M6 6l12 12" }) })
        }
      )
    ] })
  ] });
}
const A = (t) => {
  const e = /* @__PURE__ */ new Date(), n = new Date(t), a = Math.floor((e - n) / 6e4);
  if (a < 1) return "Just now";
  if (a < 60) return `${a}m ago`;
  const s = Math.floor(a / 60);
  return s < 24 ? `${s}h ago` : n.toLocaleDateString();
};
function z({ message: t, themeColor: e = "#00FF87" }) {
  const { role: n, content: a, timestamp: s, sources: o, confidence: l } = t, i = n === "user";
  return /* @__PURE__ */ c("div", { style: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "85%",
    alignSelf: i ? "flex-end" : "flex-start",
    alignItems: i ? "flex-end" : "flex-start"
  }, children: [
    /* @__PURE__ */ r("div", { style: {
      padding: "10px 14px",
      borderRadius: i ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
      fontSize: "13px",
      lineHeight: "1.6",
      wordBreak: "break-word",
      background: i ? e : "#1e1e1e",
      color: i ? "#000" : "#e8e8e8",
      border: i ? "none" : "1px solid #2a2a2a",
      boxShadow: "0 1px 4px rgba(0,0,0,0.2)"
    }, children: a }),
    o && o.length > 0 && /* @__PURE__ */ c("div", { style: { fontSize: "11px", color: "#555", marginTop: "4px", padding: "0 4px" }, children: [
      "Based on ",
      o.length,
      " source",
      o.length > 1 ? "s" : ""
    ] }),
    /* @__PURE__ */ r("div", { style: { fontSize: "10px", color: "#444", marginTop: "3px", padding: "0 4px" }, children: A(s) })
  ] });
}
function O() {
  return /* @__PURE__ */ c("div", { style: {
    alignSelf: "flex-start",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "12px 16px",
    background: "#1e1e1e",
    border: "1px solid #2a2a2a",
    borderRadius: "14px 14px 14px 4px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.2)"
  }, children: [
    [0, 1, 2].map((t) => /* @__PURE__ */ r(
      "div",
      {
        style: {
          width: "6px",
          height: "6px",
          background: "#555",
          borderRadius: "50%",
          animation: `embedsy-bounce 1.2s ease-in-out ${t * 0.2}s infinite`
        }
      },
      t
    )),
    /* @__PURE__ */ r("style", { children: `
        @keyframes embedsy-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      ` })
  ] });
}
function W({ error: t, onRetry: e }) {
  return t ? /* @__PURE__ */ c("div", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    padding: "10px 14px",
    background: "rgba(255, 71, 87, 0.08)",
    border: "1px solid rgba(255, 71, 87, 0.25)",
    borderRadius: "10px",
    fontSize: "12px",
    color: "#ff6b7a",
    alignSelf: "stretch"
  }, children: [
    /* @__PURE__ */ c("div", { children: [
      /* @__PURE__ */ r("div", { style: { fontWeight: "700", marginBottom: "2px" }, children: "⚠️ Something went wrong" }),
      /* @__PURE__ */ r("div", { style: { opacity: 0.8 }, children: t })
    ] }),
    e && /* @__PURE__ */ r(
      "button",
      {
        onClick: e,
        style: {
          background: "rgba(255, 71, 87, 0.15)",
          border: "1px solid rgba(255, 71, 87, 0.3)",
          borderRadius: "6px",
          padding: "5px 12px",
          fontSize: "11px",
          fontWeight: "600",
          color: "#ff6b7a",
          cursor: "pointer",
          whiteSpace: "nowrap",
          outline: "none",
          flexShrink: 0
        },
        children: "Retry"
      }
    )
  ] }) : null;
}
function B({ messages: t, isLoading: e, error: n, onRetry: a, themeColor: s }) {
  const o = S(null);
  return b(() => {
    o.current && o.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [t, e]), /* @__PURE__ */ c("div", { style: {
    flex: 1,
    overflowY: "auto",
    padding: "16px 12px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    scrollbarWidth: "thin",
    scrollbarColor: "#333 transparent"
  }, children: [
    t.map((l) => /* @__PURE__ */ r(z, { message: l, themeColor: s }, l.id)),
    e && /* @__PURE__ */ r(O, {}),
    n && /* @__PURE__ */ r(W, { error: n, onRetry: a }),
    /* @__PURE__ */ r("div", { ref: o })
  ] });
}
function T({ onClick: t, disabled: e, themeColor: n = "#00FF87" }) {
  const [a, s] = f(!1);
  return /* @__PURE__ */ r(
    "button",
    {
      onClick: t,
      disabled: e,
      onMouseEnter: () => s(!0),
      onMouseLeave: () => s(!1),
      "aria-label": "Send message",
      style: {
        width: "38px",
        height: "38px",
        borderRadius: "10px",
        background: n,
        border: "none",
        cursor: e ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#000",
        opacity: e ? 0.3 : a ? 0.9 : 1,
        transform: a && !e ? "scale(1.05)" : "scale(1)",
        transition: "all 0.15s ease",
        flexShrink: 0,
        outline: "none",
        padding: "0"
      },
      children: /* @__PURE__ */ r("svg", { width: "16", height: "16", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ r(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2.5,
          d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        }
      ) })
    }
  );
}
function $({ onSend: t, disabled: e, themeColor: n = "#00FF87" }) {
  const [a, s] = f(""), [o, l] = f(!1), i = S(null);
  b(() => {
    !e && i.current && i.current.focus();
  }, [e]);
  const d = () => {
    a.trim() && !e && (t(a.trim()), s(""), i.current && i.current.focus());
  };
  return /* @__PURE__ */ c("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px",
    borderTop: "1px solid #1e1e1e",
    background: "#0f0f0f",
    flexShrink: 0
  }, children: [
    /* @__PURE__ */ r(
      "input",
      {
        ref: i,
        type: "text",
        placeholder: "Ask something...",
        value: a,
        onChange: (g) => s(g.target.value),
        onKeyDown: (g) => {
          g.key === "Enter" && !g.shiftKey && (g.preventDefault(), d());
        },
        onFocus: () => l(!0),
        onBlur: () => l(!1),
        disabled: e,
        maxLength: 2e3,
        style: {
          flex: 1,
          background: "#1a1a1a",
          border: `1px solid ${o ? n : "#2a2a2a"}`,
          borderRadius: "10px",
          padding: "10px 14px",
          fontSize: "13px",
          color: "#e8e8e8",
          outline: "none",
          transition: "border-color 0.2s",
          fontFamily: "inherit",
          opacity: e ? 0.5 : 1,
          cursor: e ? "not-allowed" : "text",
          boxSizing: "border-box"
        }
      }
    ),
    /* @__PURE__ */ r(T, { onClick: d, disabled: e || !a.trim(), themeColor: n })
  ] });
}
function _({
  messages: t,
  isLoading: e,
  error: n,
  onSend: a,
  onClose: s,
  onRetry: o,
  title: l,
  themeColor: i,
  selectedLanguage: d,
  onLanguageChange: p
}) {
  return /* @__PURE__ */ c("div", { style: {
    width: "360px",
    height: "520px",
    background: "#0f0f0f",
    borderRadius: "16px",
    border: "1px solid #222",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  }, children: [
    /* @__PURE__ */ r(
      L,
      {
        onClose: s,
        title: l,
        themeColor: i,
        selectedLanguage: d,
        onLanguageChange: p
      }
    ),
    /* @__PURE__ */ r(
      B,
      {
        messages: t,
        isLoading: e,
        error: n,
        onRetry: o,
        themeColor: i
      }
    ),
    /* @__PURE__ */ r($, { onSend: a, disabled: e, themeColor: i }),
    /* @__PURE__ */ c("div", { style: {
      textAlign: "center",
      fontSize: "10px",
      color: "#333",
      padding: "6px",
      background: "#0a0a0a",
      flexShrink: 0
    }, children: [
      "Powered by",
      " ",
      /* @__PURE__ */ r(
        "a",
        {
          href: "https://embedsy.dev",
          target: "_blank",
          rel: "noopener noreferrer",
          style: { color: i, textDecoration: "none" },
          children: "Embedsy"
        }
      )
    ] })
  ] });
}
const v = "embedsy_messages", H = (t, e) => {
  try {
    const n = `${v}_${t}`;
    localStorage.setItem(n, JSON.stringify({ messages: e, timestamp: (/* @__PURE__ */ new Date()).toISOString() }));
  } catch (n) {
    console.warn("Embedsy: Failed to save messages:", n);
  }
}, j = (t) => {
  try {
    const e = `${v}_${t}`, n = localStorage.getItem(e);
    if (!n) return [];
    const a = JSON.parse(n), s = Date.now() - new Date(a.timestamp).getTime(), o = 24 * 60 * 60 * 1e3;
    return s > o ? (localStorage.removeItem(e), []) : a.messages || [];
  } catch (e) {
    return console.warn("Embedsy: Failed to load messages:", e), [];
  }
}, K = (t) => {
  const [e, n] = f([]);
  return b(() => {
    if (t) {
      const o = j(t);
      o.length > 0 ? n(o) : n([
        {
          id: `msg_${Date.now()}`,
          role: "bot",
          content: "👋 Hi there! I'm your AI assistant. Ask me anything about our documentation and I'll help you find the answers!",
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }
      ]);
    }
  }, [t]), b(() => {
    t && e.length > 0 && H(t, e);
  }, [e, t]), { messages: e, addMessage: (o) => {
    n((l) => [
      ...l,
      {
        ...o,
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: o.timestamp || (/* @__PURE__ */ new Date()).toISOString()
      }
    ]);
  }, clearAllMessages: () => {
    n([
      {
        id: `msg_${Date.now()}`,
        role: "bot",
        content: "👋 Hi there! I'm your AI assistant. Ask me anything about our documentation and I'll help you find the answers!",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    ]);
  } };
}, N = async (t, e, n, a = "en", s) => {
  try {
    const o = await fetch(`${s}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: t,
        message: e,
        apiKey: n,
        targetLanguage: a
      })
    });
    if (!o.ok) {
      const l = await o.json();
      throw new Error(l.error || "Failed to get response from server");
    }
    return await o.json();
  } catch (o) {
    throw o.name === "TypeError" ? new Error("No response from server. Please check your connection.") : o;
  }
}, U = (t, e, n, a, s) => {
  const [o, l] = f(!1), [i, d] = f(null);
  return { send: async (h) => {
    if (!(!h.trim() || o)) {
      l(!0), d(null);
      try {
        const x = await N(t, h, e, n, s);
        return a && a(x), x;
      } catch (x) {
        throw d(x.message), x;
      } finally {
        l(!1);
      }
    }
  }, isLoading: o, error: i, clearError: () => d(null) };
}, J = "https://embedsy-backend.onrender.com/api";
function V({
  projectId: t,
  apiKey: e,
  title: n = "Chat with us",
  position: a = "bottom-right",
  themeColor: s = "#00FF87",
  apiUrl: o = J
}) {
  const [l, i] = f(!1), [d, p] = f("en"), { messages: g, addMessage: h, clearAllMessages: x } = K(t), I = (u) => {
    h({
      role: "bot",
      content: u.answer,
      sources: u.sources,
      confidence: u.confidence
    });
  }, { send: w, isLoading: M, error: E, clearError: k } = U(
    t,
    e,
    d,
    I,
    o
  ), F = async (u) => {
    h({ role: "user", content: u }), k();
    try {
      await w(u);
    } catch (m) {
      console.error("Embedsy: Failed to send message:", m);
    }
  }, D = () => {
    const u = [...g].reverse().find((m) => m.role === "user");
    u && (k(), w(u.content));
  }, R = (u) => {
    p(u), x();
  };
  return /* @__PURE__ */ r("div", { style: {
    position: "fixed",
    zIndex: 999999,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    ...a === "bottom-left" ? { bottom: "24px", left: "24px" } : { bottom: "24px", right: "24px" }
  }, children: l ? /* @__PURE__ */ r(
    _,
    {
      messages: g,
      isLoading: M,
      error: E,
      onSend: F,
      onClose: () => i(!1),
      onRetry: D,
      onClear: x,
      title: n,
      themeColor: s,
      selectedLanguage: d,
      onLanguageChange: R
    }
  ) : /* @__PURE__ */ r(C, { onClick: () => i(!0), themeColor: s }) });
}
export {
  V as EmbedsynWidget
};
