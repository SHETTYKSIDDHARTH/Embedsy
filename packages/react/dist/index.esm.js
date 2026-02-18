import { jsxs as c, jsx as t } from "react/jsx-runtime";
import { useState as h, useRef as v, useEffect as y } from "react";
function A({ onClick: e, unreadCount: n = 0 }) {
  return /* @__PURE__ */ c(
    "button",
    {
      className: "embedsy-chat-bubble",
      onClick: e,
      "aria-label": "Open chat",
      title: "Open chat",
      children: [
        /* @__PURE__ */ t(
          "svg",
          {
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ t(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2.5,
                d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              }
            )
          }
        ),
        n > 0 && /* @__PURE__ */ t("span", { style: {
          position: "absolute",
          top: "-4px",
          right: "-4px",
          background: "#FF4757",
          color: "#FFFFFF",
          borderRadius: "50%",
          width: "24px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: "700",
          border: "2px solid #0A0A0A"
        }, children: n })
      ]
    }
  );
}
const w = [
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
function D({ onClose: e, title: n = "Chat with us", selectedLanguage: o, onLanguageChange: a }) {
  const [r, s] = h(!1), l = w.find((i) => i.code === o) || w[0];
  return /* @__PURE__ */ c("div", { className: "embedsy-chat-header", children: [
    /* @__PURE__ */ t("h3", { children: n }),
    /* @__PURE__ */ c("div", { className: "embedsy-header-actions", children: [
      /* @__PURE__ */ c("div", { className: "embedsy-lang-selector", children: [
        /* @__PURE__ */ c(
          "button",
          {
            className: "embedsy-lang-btn",
            onClick: () => s(!r),
            title: "Select language",
            children: [
              l.label,
              /* @__PURE__ */ t(
                "svg",
                {
                  className: `embedsy-lang-chevron ${r ? "open" : ""}`,
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M19 9l-7 7-7-7" })
                }
              )
            ]
          }
        ),
        r && /* @__PURE__ */ t("div", { className: "embedsy-lang-dropdown", children: w.map((i) => /* @__PURE__ */ c(
          "button",
          {
            className: `embedsy-lang-option ${i.code === o ? "active" : ""}`,
            onClick: () => {
              a(i.code), s(!1);
            },
            children: [
              /* @__PURE__ */ t("span", { className: "embedsy-lang-option-code", children: i.label }),
              /* @__PURE__ */ t("span", { className: "embedsy-lang-option-name", children: i.name })
            ]
          },
          i.code
        )) })
      ] }),
      /* @__PURE__ */ t(
        "button",
        {
          className: "embedsy-close-btn",
          onClick: e,
          "aria-label": "Close chat",
          title: "Close chat",
          children: /* @__PURE__ */ t("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ t("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M6 18L18 6M6 6l12 12" }) })
        }
      )
    ] })
  ] });
}
const O = (e) => {
  const n = /* @__PURE__ */ new Date(), o = new Date(e), a = Math.floor((n - o) / 6e4);
  if (a < 1) return "Just now";
  if (a < 60) return `${a}m ago`;
  const r = Math.floor(a / 60);
  return r < 24 ? `${r}h ago` : o.toLocaleDateString();
}, f = (e) => e >= 80 ? { text: "High", color: "#00FF87" } : e >= 60 ? { text: "Medium", color: "#FFA502" } : { text: "Low", color: "#FF4757" };
function $({ sources: e }) {
  return !e || e.length === 0 ? null : /* @__PURE__ */ c("div", { className: "embedsy-source-citation", children: [
    "Based on ",
    e.length,
    " source",
    e.length > 1 ? "s" : "",
    " from documentation"
  ] });
}
function T({ message: e }) {
  const { role: n, content: o, timestamp: a, sources: r, confidence: s } = e;
  return /* @__PURE__ */ c("div", { className: `embedsy-message ${n}`, children: [
    /* @__PURE__ */ c("div", { className: "embedsy-message-bubble", children: [
      o,
      s && s > 0 && /* @__PURE__ */ t(
        "span",
        {
          className: "embedsy-confidence-badge",
          style: {
            background: `${f(s).color}25`,
            color: f(s).color,
            borderColor: `${f(s).color}50`
          },
          children: f(s).text
        }
      )
    ] }),
    r && r.length > 0 && /* @__PURE__ */ t($, { sources: r }),
    /* @__PURE__ */ t("div", { className: "embedsy-message-time", children: O(a) })
  ] });
}
function _() {
  return /* @__PURE__ */ t("div", { className: "embedsy-message bot", children: /* @__PURE__ */ c("div", { className: "embedsy-typing-indicator", children: [
    /* @__PURE__ */ t("div", { className: "embedsy-typing-dot" }),
    /* @__PURE__ */ t("div", { className: "embedsy-typing-dot" }),
    /* @__PURE__ */ t("div", { className: "embedsy-typing-dot" })
  ] }) });
}
function B({ error: e, onRetry: n }) {
  return e ? /* @__PURE__ */ c("div", { className: "embedsy-error-message", children: [
    /* @__PURE__ */ c("div", { children: [
      /* @__PURE__ */ t("strong", { children: "⚠️ Oops!" }),
      /* @__PURE__ */ t("div", { children: e })
    ] }),
    n && /* @__PURE__ */ t(
      "button",
      {
        onClick: n,
        className: "embedsy-retry-btn",
        children: "Retry"
      }
    )
  ] }) : null;
}
function R({ messages: e, isLoading: n, error: o, onRetry: a }) {
  const r = v(null), s = v(null), l = () => {
    r.current && r.current.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  };
  return y(() => {
    l();
  }, [e, n]), /* @__PURE__ */ c("div", { className: "embedsy-messages-container", ref: s, children: [
    e.map((i) => /* @__PURE__ */ t(T, { message: i }, i.id)),
    n && /* @__PURE__ */ t(_, {}),
    o && /* @__PURE__ */ t(B, { error: o, onRetry: a }),
    /* @__PURE__ */ t("div", { ref: r })
  ] });
}
function H({ onClick: e, disabled: n }) {
  return /* @__PURE__ */ t(
    "button",
    {
      className: "embedsy-send-btn",
      onClick: e,
      disabled: n,
      "aria-label": "Send message",
      title: "Send message",
      children: /* @__PURE__ */ t(
        "svg",
        {
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ t(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2.5,
              d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            }
          )
        }
      )
    }
  );
}
function K({ onSend: e, disabled: n }) {
  const [o, a] = h(""), r = v(null);
  y(() => {
    !n && r.current && r.current.focus();
  }, [n]);
  const s = () => {
    o.trim() && !n && (e(o.trim()), a(""), r.current && r.current.focus());
  };
  return /* @__PURE__ */ c("div", { className: "embedsy-input-container", children: [
    /* @__PURE__ */ t(
      "input",
      {
        ref: r,
        type: "text",
        className: "embedsy-input",
        placeholder: "Type your question here...",
        value: o,
        onChange: (i) => a(i.target.value),
        onKeyDown: (i) => {
          i.key === "Enter" && !i.shiftKey && (i.preventDefault(), s());
        },
        disabled: n,
        maxLength: 2e3
      }
    ),
    /* @__PURE__ */ t(H, { onClick: s, disabled: n || !o.trim() })
  ] });
}
function P({
  messages: e,
  isLoading: n,
  error: o,
  onSend: a,
  onClose: r,
  onRetry: s,
  title: l,
  selectedLanguage: i,
  onLanguageChange: m
}) {
  return /* @__PURE__ */ c("div", { className: "embedsy-chat-window", children: [
    /* @__PURE__ */ t(
      D,
      {
        onClose: r,
        title: l,
        selectedLanguage: i,
        onLanguageChange: m
      }
    ),
    /* @__PURE__ */ t(
      R,
      {
        messages: e,
        isLoading: n,
        error: o,
        onRetry: s
      }
    ),
    /* @__PURE__ */ t(K, { onSend: a, disabled: n }),
    /* @__PURE__ */ c("div", { className: "embedsy-powered-by", children: [
      "Powered by ",
      /* @__PURE__ */ t("a", { href: "https://embedsy.dev", target: "_blank", rel: "noopener noreferrer", children: "Embedsy" })
    ] })
  ] });
}
const M = "embedsy_messages", W = (e, n) => {
  try {
    const o = `${M}_${e}`;
    localStorage.setItem(o, JSON.stringify({ messages: n, timestamp: (/* @__PURE__ */ new Date()).toISOString() }));
  } catch (o) {
    console.warn("Embedsy: Failed to save messages:", o);
  }
}, J = (e) => {
  try {
    const n = `${M}_${e}`, o = localStorage.getItem(n);
    if (!o) return [];
    const a = JSON.parse(o), r = Date.now() - new Date(a.timestamp).getTime(), s = 24 * 60 * 60 * 1e3;
    return r > s ? (localStorage.removeItem(n), []) : a.messages || [];
  } catch (n) {
    return console.warn("Embedsy: Failed to load messages:", n), [];
  }
}, z = (e) => {
  const [n, o] = h([]);
  return y(() => {
    if (e) {
      const s = J(e);
      s.length > 0 ? o(s) : o([
        {
          id: `msg_${Date.now()}`,
          role: "bot",
          content: "👋 Hi there! I'm your AI assistant. Ask me anything about our documentation and I'll help you find the answers!",
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }
      ]);
    }
  }, [e]), y(() => {
    e && n.length > 0 && W(e, n);
  }, [n, e]), { messages: n, addMessage: (s) => {
    o((l) => [
      ...l,
      {
        ...s,
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: s.timestamp || (/* @__PURE__ */ new Date()).toISOString()
      }
    ]);
  }, clearAllMessages: () => {
    o([
      {
        id: `msg_${Date.now()}`,
        role: "bot",
        content: "👋 Hi there! I'm your AI assistant. Ask me anything about our documentation and I'll help you find the answers!",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    ]);
  } };
}, G = async (e, n, o, a = "en", r) => {
  try {
    const s = await fetch(`${r}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: e,
        message: n,
        apiKey: o,
        targetLanguage: a
      })
    });
    if (!s.ok) {
      const l = await s.json();
      throw new Error(l.error || "Failed to get response from server");
    }
    return await s.json();
  } catch (s) {
    throw s.name === "TypeError" ? new Error("No response from server. Please check your connection.") : s;
  }
}, U = (e, n, o, a, r) => {
  const [s, l] = h(!1), [i, m] = h(null);
  return { send: async (b) => {
    if (!(!b.trim() || s)) {
      l(!0), m(null);
      try {
        const u = await G(e, b, n, o, r);
        return a && a(u), u;
      } catch (u) {
        throw m(u.message), u;
      } finally {
        l(!1);
      }
    }
  }, isLoading: s, error: i, clearError: () => m(null) };
}, j = "https://embedsy-backend.onrender.com/api";
function V({
  projectId: e,
  apiKey: n,
  title: o = "Chat with us",
  position: a = "bottom-right",
  themeColor: r = "#00FF87",
  apiUrl: s = j
}) {
  const [l, i] = h(!1), [m, N] = h("en"), { messages: p, addMessage: b, clearAllMessages: u } = z(e);
  y(() => {
    const d = `embedsy-root-${e}`, g = document.getElementById(d) || document.getElementById("embedsy-widget-root");
    g && g.style.setProperty("--embedsy-theme", r);
  }, [r, e]);
  const C = (d) => {
    b({
      role: "bot",
      content: d.answer,
      sources: d.sources,
      confidence: d.confidence
    });
  }, { send: k, isLoading: E, error: x, clearError: S } = U(
    e,
    n,
    m,
    C,
    s
  ), F = async (d) => {
    b({ role: "user", content: d }), S();
    try {
      await k(d);
    } catch (g) {
      console.error("Embedsy: Failed to send message:", g);
    }
  }, I = () => {
    const d = [...p].reverse().find((g) => g.role === "user");
    d && (S(), k(d.content));
  }, L = (d) => {
    N(d), u();
  };
  return /* @__PURE__ */ t("div", { className: `embedsy-widget-container embedsy-position-${a}`, children: l ? /* @__PURE__ */ t(
    P,
    {
      messages: p,
      isLoading: E,
      error: x,
      onSend: F,
      onClose: () => i(!1),
      onRetry: I,
      onClear: u,
      title: o,
      selectedLanguage: m,
      onLanguageChange: L
    }
  ) : /* @__PURE__ */ t(A, { onClick: () => i(!0) }) });
}
export {
  V as EmbedsynWidget
};
