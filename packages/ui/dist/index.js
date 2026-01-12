import { jsx as e, jsxs as o, Fragment as F } from "react/jsx-runtime";
import L, { useState as z, useRef as E, useEffect as B } from "react";
const S = {
  // Brand Colors - Primary
  primary: {
    100: "#e9e0fb",
    200: "#c9b1f4",
    300: "#ac80ed",
    400: "#924ae4",
    500: "#6b29ae",
    600: "#41166d",
    700: "#1a0531"
  },
  // Brand Colors - Secondary
  secondary: {
    100: "#ffecf2",
    200: "#ffbed6",
    300: "#ff7eb6",
    400: "#fb0098",
    500: "#ba0070",
    600: "#7d0049",
    700: "#450026"
  },
  // Neutral Colors - Grey
  grey: {
    100: "#e5e4e6",
    200: "#bdbcc0",
    300: "#97959c",
    400: "#737079",
    500: "#504e55",
    600: "#2f2e33",
    700: "#111113",
    900: "#120B0D"
  },
  // Tertiary
  tertiary: {
    100: "#fdcfd0",
    200: "#fb9699",
    300: "#fa4d56",
    400: "#ce1628",
    500: "#8f0c18",
    600: "#54040a",
    700: "#2b0103"
  },
  // Quaternary
  quaternary: {
    100: "#ffd9d9",
    200: "#ffa0a0",
    300: "#ff5b5b",
    400: "#e10000",
    500: "#9f0000",
    600: "#620000",
    700: "#2d0000"
  },
  // Quinary
  quinary: {
    100: "#76ff9a",
    200: "#00d961",
    300: "#00ad4c",
    400: "#008338",
    500: "#005c25",
    600: "#003713",
    700: "#001504"
  },
  // Senary
  senary: {
    100: "#ccff6a",
    200: "#a2d700",
    300: "#82ad00",
    400: "#638500",
    500: "#465f00",
    600: "#2b3c00",
    700: "#121b00"
  },
  // Septenary
  septenary: {
    100: "#ceff0c",
    200: "#abd400",
    300: "#89ab00",
    400: "#688300",
    500: "#4a5d00",
    600: "#2d3a00",
    700: "#131a00"
  },
  // Octonary
  octonary: {
    100: "#b1fffb",
    200: "#1eeae4",
    300: "#16bfba",
    400: "#0f9692",
    500: "#086e6b",
    600: "#034947",
    700: "#012725"
  },
  // Brand Named Colors
  brand: {
    mediumOrchid: "#CF8BFF",
    deepPurple: "#6B29AE",
    chinaPink: "#D8749D",
    greyPurple: "#674A86",
    hanBlue: "#5865C6",
    brightBlue: "#1686E8"
  },
  // UI Colors - Surfaces
  surface: {
    dark: "#100919",
    darkContrast: "#292134",
    darkProgress: "#312A39",
    light: "#FFFFFF"
  },
  // UI Colors - On Neutral
  ui: {
    onNeutral40: "#222222",
    appliedOnPrimary: "#F8F8F8"
  },
  // UI Colors - Text/On-Surface
  onSurface: {
    dark: "#EEEEEE",
    light: "#222222",
    darkContrast: "#36274A",
    darkSubtle: "#1D1825",
    darkDisabled: "#525252"
  },
  // UI Colors - Borders
  border: {
    dark: "#1A1520",
    onDark: "#EEEEEE",
    onDarkContrast: "#36274A",
    onDarkSubtle: "#1D1825",
    onDarkDisabled: "#525252",
    focus: "#1686E8",
    disabled: "#e6e6e6"
  },
  // Semantic Colors - Borders
  borderSemantic: {
    errorDark: "#7F000F",
    warningDark: "#654E00",
    successDark: "#057023"
  },
  // Semantic Colors - Surfaces
  surfaceSemantic: {
    errorDark: "#CF0019",
    warningDark: "#DCAA00",
    successDark: "#00B55F",
    successBold: "#048273"
  },
  // Semantic Colors - On-Surface
  onSurfaceSemantic: {
    errorDark: "#FF8594",
    warningDark: "#FFDB62",
    successDark: "#B0FFB8"
  },
  // Data Visualization
  dataviz: {
    1: "#8a3ffc",
    2: "#5a3cd3",
    3: "#4589ff",
    4: "#ff7eb6",
    5: "#fa4d56",
    6: "#d12771",
    7: "#76ff9a",
    8: "#82ad00",
    9: "#009d9a",
    10: "#086e6b",
    11: "#19fcf8",
    12: "#0072c3",
    13: "#b98c00",
    14: "#ffe100",
    15: "#fddc69"
  }
}, D = {
  fontFamily: {
    ibmPlexSans: '"IBM Plex Sans", sans-serif',
    nbArchitekt: '"NB Architekt Std", sans-serif',
    helvetica: '"Helvetica", sans-serif'
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    bold: 700
  },
  fontSize: {
    8: "8px",
    10: "10px",
    12: "12px",
    14: "14px",
    16: "16px",
    18: "18px",
    28: "28px",
    35: "35px",
    36: "36px",
    55: "55px"
  },
  lineHeight: {
    10: "10px",
    12: "12px",
    13: "13px",
    14: "14px",
    17: "17px",
    18: "18px",
    22: "22px",
    25: "25px",
    34: "34px",
    40: "40px",
    42: "42px",
    55: "55px"
  },
  letterSpacing: {
    neg5: "-0.2px",
    0: "0px"
  }
}, $ = {
  color: {
    primary100: "var(--color-primary-100)",
    primary200: "var(--color-primary-200)",
    primary300: "var(--color-primary-300)",
    primary400: "var(--color-primary-400)",
    primary500: "var(--color-primary-500)",
    primary600: "var(--color-primary-600)",
    primary700: "var(--color-primary-700)",
    secondary100: "var(--color-secondary-100)",
    secondary200: "var(--color-secondary-200)",
    secondary300: "var(--color-secondary-300)",
    secondary400: "var(--color-secondary-400)",
    secondary500: "var(--color-secondary-500)",
    secondary600: "var(--color-secondary-600)",
    secondary700: "var(--color-secondary-700)",
    grey100: "var(--color-grey-100)",
    grey200: "var(--color-grey-200)",
    grey300: "var(--color-grey-300)",
    grey400: "var(--color-grey-400)",
    grey500: "var(--color-grey-500)",
    grey600: "var(--color-grey-600)",
    grey700: "var(--color-grey-700)",
    grey900: "var(--color-grey-900)",
    surfaceDark: "var(--color-surface-dark)",
    surfaceDarkContrast: "var(--color-surface-dark-contrast)",
    surfaceLight: "var(--color-surface-light)",
    onSurfaceDark: "var(--color-on-surface-dark)",
    onSurfaceLight: "var(--color-on-surface-light)",
    borderDark: "var(--color-border-dark)",
    borderFocus: "var(--color-border-focus)"
  },
  font: {
    familyIbmPlex: "var(--font-family-ibm-plex-sans)",
    familyNbArchitekt: "var(--font-family-nb-architekt)",
    familyHelvetica: "var(--font-family-helvetica)",
    weightRegular: "var(--font-weight-regular)",
    weightMedium: "var(--font-weight-medium)",
    weightBold: "var(--font-weight-bold)"
  }
}, p1 = {
  colors: S,
  typography: D,
  cssVars: $
}, _ = L.forwardRef(
  ({ variant: a = "primary", size: l = "sm", className: s = "", children: n, ...r }, t) => {
    const c = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      tertiary: "btn-tertiary"
    }[a], h = {
      sm: "",
      lg: "btn-lg",
      icon: "btn-icon",
      "icon-sm": "btn-icon-sm"
    }[l], v = ["btn", c, h, s].filter(Boolean).join(" ");
    return /* @__PURE__ */ e("button", { ref: t, className: v, ...r, children: n });
  }
);
_.displayName = "Button";
const j = L.forwardRef(
  ({ className: a = "", error: l = !1, ...s }, n) => {
    const r = ["input-field", l ? "error" : "", a].filter(Boolean).join(" ");
    return /* @__PURE__ */ e("input", { ref: n, className: r, ...s });
  }
);
j.displayName = "Input";
const A = {
  "body-large": "text-body-large",
  "body-small": "text-body-small",
  "body-bold-large": "text-body-bold-large",
  "body-bold-small": "text-body-bold-small",
  "cta-large": "text-cta-large",
  "cta-small": "text-cta-small",
  "link-large": "text-link-large",
  "link-small": "text-link-small",
  footnote: "text-footnote",
  helper: "text-helper",
  label: "text-label",
  "label-bold": "text-label-bold"
}, R = L.forwardRef(
  ({ variant: a = "body-small", as: l = "span", className: s = "", children: n, ...r }, t) => {
    const c = [A[a], s].filter(Boolean).join(" ");
    return /* @__PURE__ */ e(l, { ref: t, className: c, ...r, children: n });
  }
);
R.displayName = "Text";
const Z = {
  "display-large": "text-display-large",
  "heading-large": "text-heading-large",
  "heading-medium": "text-heading-medium",
  "overline-large": "text-overline-large",
  "overline-medium": "text-overline-medium"
}, T = {
  "display-large": "h1",
  "heading-large": "h2",
  "heading-medium": "h3",
  "overline-large": "h4",
  "overline-medium": "h5"
}, Y = L.forwardRef(
  ({ variant: a = "heading-medium", as: l, className: s = "", children: n, ...r }, t) => {
    const c = l || T[a] || "h3", h = [Z[a], s].filter(Boolean).join(" ");
    return /* @__PURE__ */ e(c, { ref: t, className: h, ...r, children: n });
  }
);
Y.displayName = "Heading";
const W = L.forwardRef(
  ({ className: a = "", label: l, id: s, ...n }, r) => {
    const t = s || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    return /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ e(
        "input",
        {
          ref: r,
          type: "checkbox",
          id: t,
          className: ["checkbox-input", a].filter(Boolean).join(" "),
          ...n
        }
      ),
      l && /* @__PURE__ */ e("label", { htmlFor: t, className: "text-body-small", style: { cursor: "pointer" }, children: l })
    ] });
  }
);
W.displayName = "Checkbox";
const O = {
  success: "badge-success",
  warning: "badge-warning",
  error: "badge-error",
  processing: "badge-processing"
}, I = L.forwardRef(
  ({ variant: a = "processing", showDot: l = !0, className: s = "", children: n, ...r }, t) => {
    const c = ["badge", O[a], s].filter(Boolean).join(" ");
    return /* @__PURE__ */ o("span", { ref: t, className: c, ...r, children: [
      l && /* @__PURE__ */ e("span", { className: "badge-dot" }),
      n
    ] });
  }
);
I.displayName = "Badge";
function G({
  columns: a,
  data: l,
  className: s = "",
  onRowClick: n
}) {
  const r = ["table-container", s].filter(Boolean).join(" ");
  return /* @__PURE__ */ e("div", { className: r, children: /* @__PURE__ */ o("table", { className: "table-v2", children: [
    /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { children: a.map((t) => /* @__PURE__ */ e("th", { style: t.width ? { width: t.width } : void 0, children: t.header }, String(t.key))) }) }),
    /* @__PURE__ */ e("tbody", { children: l.map((t, c) => /* @__PURE__ */ e(
      "tr",
      {
        onClick: () => n == null ? void 0 : n(t, c),
        style: n ? { cursor: "pointer" } : void 0,
        children: a.map((h) => {
          const v = t[h.key];
          return /* @__PURE__ */ e("td", { children: h.render ? h.render(v, t, c) : String(v ?? "") }, String(h.key));
        })
      },
      c
    )) })
  ] }) });
}
G.displayName = "Table";
const J = ({
  options: a,
  value: l,
  placeholder: s = "Select...",
  onChange: n,
  error: r = !1,
  success: t = !1,
  className: c = ""
}) => {
  const [h, v] = z(!1), p = E(null), m = a.find((i) => i.value === l);
  B(() => {
    const i = (C) => {
      p.current && !p.current.contains(C.target) && v(!1);
    };
    return document.addEventListener("mousedown", i), () => document.removeEventListener("mousedown", i);
  }, []);
  const f = [
    "dropdown-trigger",
    h ? "open" : "",
    r ? "error" : "",
    t ? "success" : ""
  ].filter(Boolean).join(" "), u = ["dropdown-menu", h ? "open" : ""].filter(Boolean).join(" ");
  return /* @__PURE__ */ o("div", { ref: p, className: `dropdown-container ${c}`, children: [
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        className: f,
        onClick: () => v(!h),
        "aria-expanded": h,
        "aria-haspopup": "listbox",
        children: [
          /* @__PURE__ */ e("span", { children: (m == null ? void 0 : m.label) || s }),
          /* @__PURE__ */ e("span", { className: "dropdown-chevron" })
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: u, role: "listbox", children: a.map((i) => /* @__PURE__ */ o(
      "div",
      {
        className: `dropdown-item ${l === i.value ? "selected" : ""}`,
        role: "option",
        "aria-selected": l === i.value,
        onClick: () => {
          n == null || n(i.value), v(!1);
        },
        children: [
          i.icon,
          i.label
        ]
      },
      i.value
    )) })
  ] });
};
J.displayName = "Dropdown";
const q = ({ content: a, children: l, className: s = "" }) => /* @__PURE__ */ o("div", { className: `tooltip-container ${s}`, children: [
  l,
  /* @__PURE__ */ e("div", { className: "tooltip-content", children: a })
] });
q.displayName = "Tooltip";
const X = ({ items: a, className: l = "" }) => /* @__PURE__ */ e("nav", { className: `breadcrumb ${l}`, "aria-label": "Breadcrumb", children: a.map((s, n) => {
  const r = n === a.length - 1;
  return /* @__PURE__ */ e(L.Fragment, { children: r ? /* @__PURE__ */ e("span", { className: "breadcrumb-link breadcrumb-current", "aria-current": "page", children: s.label }) : /* @__PURE__ */ o(F, { children: [
    /* @__PURE__ */ e(
      "a",
      {
        href: s.href || "#",
        className: "breadcrumb-link",
        onClick: (t) => {
          s.onClick && (t.preventDefault(), s.onClick());
        },
        children: s.label
      }
    ),
    /* @__PURE__ */ e("span", { className: "breadcrumb-separator", "aria-hidden": "true" })
  ] }) }, n);
}) });
X.displayName = "Breadcrumb";
const K = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], Q = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], U = ({
  value: a,
  onChange: l,
  label: s = "Select Date",
  className: n = ""
}) => {
  const [r, t] = z((a == null ? void 0 : a.getMonth()) ?? (/* @__PURE__ */ new Date()).getMonth()), [c, h] = z((a == null ? void 0 : a.getFullYear()) ?? (/* @__PURE__ */ new Date()).getFullYear()), v = (d, b) => new Date(b, d + 1, 0).getDate(), p = (d, b) => new Date(b, d, 1).getDay(), m = v(r, c), f = p(r, c), u = [];
  for (let d = 0; d < f; d++) u.push(null);
  for (let d = 1; d <= m; d++) u.push(d);
  const i = () => {
    r === 0 ? (t(11), h(c - 1)) : t(r - 1);
  }, C = () => {
    r === 11 ? (t(0), h(c + 1)) : t(r + 1);
  }, y = (d) => {
    const b = new Date(c, r, d);
    l == null || l(b);
  }, g = (d) => a ? a.getDate() === d && a.getMonth() === r && a.getFullYear() === c : !1, w = (d) => d ? `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/${d.getFullYear()}` : "--/--/----";
  return /* @__PURE__ */ o("div", { className: `date-picker ${n}`, children: [
    /* @__PURE__ */ e("div", { className: "date-picker-header", children: /* @__PURE__ */ e("div", { className: "date-picker-title", children: s }) }),
    /* @__PURE__ */ e("div", { className: "date-picker-inputs", children: /* @__PURE__ */ e("div", { className: "date-picker-input-wrapper", children: /* @__PURE__ */ e("span", { className: "date-picker-input-text", children: w(a) }) }) }),
    /* @__PURE__ */ o("div", { className: "date-picker-controls", children: [
      /* @__PURE__ */ e("button", { type: "button", onClick: i, style: { background: "none", border: "none", color: "#eee", cursor: "pointer" }, children: "←" }),
      /* @__PURE__ */ o("div", { className: "date-picker-current-month", children: [
        /* @__PURE__ */ e("span", { children: Q[r] }),
        /* @__PURE__ */ e("span", { children: c })
      ] }),
      /* @__PURE__ */ e("button", { type: "button", onClick: C, style: { background: "none", border: "none", color: "#eee", cursor: "pointer" }, children: "→" })
    ] }),
    /* @__PURE__ */ o("div", { className: "date-picker-grid", children: [
      K.map((d) => /* @__PURE__ */ e("div", { className: "date-picker-day", style: { fontWeight: "bold", cursor: "default" }, children: d }, d)),
      u.map((d, b) => /* @__PURE__ */ e(
        "div",
        {
          className: `date-picker-day ${d && g(d) ? "selected" : ""}`,
          onClick: () => d && y(d),
          style: d ? void 0 : { visibility: "hidden" },
          children: d
        },
        b
      ))
    ] })
  ] });
};
U.displayName = "DatePicker";
const k = ({ collapsed: a }) => a ? /* @__PURE__ */ e("svg", { width: "40", height: "18", viewBox: "0 0 21 18", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ e("path", { d: "M3.9624 3.68971V8.1352C3.9624 8.37935 4.10669 8.61749 4.34607 8.69759C4.56749 8.77168 4.80039 8.71226 4.95565 8.55783L6.25144 7.24374H19.3491C19.7423 7.24374 20.0611 7.55092 20.0611 7.93001V13.9912C20.0611 14.3872 19.8991 14.7672 19.61 15.0487L16.8077 17.7791C16.6615 17.9198 16.4633 17.9987 16.2566 17.9987H0.356105C0.159402 17.9987 -0.000106812 17.845 -0.000106812 17.6557V17.0793C-0.000106812 16.883 0.087261 16.6961 0.23978 16.5658L2.27221 14.8298C2.40251 14.7186 2.57026 14.6573 2.74424 14.6573L13.5711 14.6539C13.7311 14.6539 13.8809 14.7191 13.9875 14.8288L15.116 15.7482C15.2264 15.8581 15.3759 15.9197 15.5327 15.9197C15.8102 15.9197 16.0416 15.7311 16.0951 15.4807V11.0277C16.0951 10.8382 15.9358 10.6847 15.7391 10.6847H0.712067C0.318661 10.6847 -0.000106812 10.3775 -0.000106812 9.99869V3.63126C-0.000106812 3.44917 0.0752791 3.27429 0.209077 3.1456L3.25223 0.219387C3.38553 0.0909367 3.56625 0.0190144 3.75472 0.018774L19.7049 0.00891113C19.9016 0.00891113 20.0611 0.162378 20.0611 0.351927V0.955933C20.0611 1.13682 19.9807 1.30905 19.8402 1.42884L17.796 3.17398C17.6659 3.28536 17.4979 3.34669 17.324 3.34669H4.31837C4.12191 3.34669 3.9624 3.50016 3.9624 3.68971Z", fill: "#F5EEFF" }) }) : /* @__PURE__ */ o("svg", { width: "195", height: "18", viewBox: "0 0 195 18", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ o("g", { clipPath: "url(#clip0_4518_4242)", children: [
    /* @__PURE__ */ e("path", { d: "M3.9624 3.68971V8.1352C3.9624 8.37935 4.10669 8.61749 4.34607 8.69759C4.56749 8.77168 4.80039 8.71226 4.95565 8.55783L6.25144 7.24374H19.3491C19.7423 7.24374 20.0611 7.55092 20.0611 7.93001V13.9912C20.0611 14.3872 19.8991 14.7672 19.61 15.0487L16.8077 17.7791C16.6615 17.9198 16.4633 17.9987 16.2566 17.9987H0.356105C0.159402 17.9987 -0.000106812 17.845 -0.000106812 17.6557V17.0793C-0.000106812 16.883 0.087261 16.6961 0.23978 16.5658L2.27221 14.8298C2.40251 14.7186 2.57026 14.6573 2.74424 14.6573L13.5711 14.6539C13.7311 14.6539 13.8809 14.7191 13.9875 14.8288L15.116 15.7482C15.2264 15.8581 15.3759 15.9197 15.5327 15.9197C15.8102 15.9197 16.0416 15.7311 16.0951 15.4807V11.0277C16.0951 10.8382 15.9358 10.6847 15.7391 10.6847H0.712067C0.318661 10.6847 -0.000106812 10.3775 -0.000106812 9.99869V3.63126C-0.000106812 3.44917 0.0752791 3.27429 0.209077 3.1456L3.25223 0.219387C3.38553 0.0909367 3.56625 0.0190144 3.75472 0.018774L19.7049 0.00891113C19.9016 0.00891113 20.0611 0.162378 20.0611 0.351927V0.955933C20.0611 1.13682 19.9807 1.30905 19.8402 1.42884L17.796 3.17398C17.6659 3.28536 17.4979 3.34669 17.324 3.34669H4.31837C4.12191 3.34669 3.9624 3.50016 3.9624 3.68971Z", fill: "#F5EEFF" }),
    /* @__PURE__ */ e("path", { d: "M38.2204 6.90255C38.2204 7.0921 38.0609 7.24557 37.8645 7.24557H28.5753C28.4175 7.24557 28.268 7.30955 28.1599 7.419L27.0326 8.51636C26.9218 8.62557 26.7722 8.68714 26.6145 8.68714C26.3374 8.68714 26.1075 8.4976 26.0521 8.24671L26.0518 3.68913C26.0518 3.49958 26.2113 3.34611 26.4078 3.34611H35.6977C35.9304 3.34611 36.0939 3.17966 36.2594 3.04447C36.4137 2.91843 36.5679 2.79238 36.7222 2.66634C36.8652 2.54943 37.0085 2.43253 37.1515 2.31563C37.181 2.29181 37.2105 2.26776 37.2399 2.2437C37.3505 2.13426 37.5003 2.07292 37.658 2.07292C37.9351 2.07292 38.165 2.26223 38.2204 2.51311V6.90255ZM42.1919 3.6314C42.1919 3.44859 42.1165 3.27347 41.982 3.14478L38.9119 0.20293C38.7781 0.0739994 38.5966 0.00159645 38.4074 0.00183678L25.8626 0.0184345C25.6749 0.0186749 25.4947 0.0905972 25.3614 0.218086L22.309 3.14502C22.1747 3.27371 22.0993 3.44859 22.099 3.63092L22.0886 17.6568C22.0883 17.8463 22.2478 18 22.4445 18H23.2598C23.448 18 23.6287 17.9281 23.7623 17.7999L25.8426 15.8022C25.9767 15.6735 26.0521 15.4986 26.0521 15.3163V10.6837H38.4032C38.5949 10.6837 38.7786 10.6093 38.9124 10.477L41.9892 7.44305C42.1193 7.31484 42.1919 7.14261 42.1919 6.96341V3.6314Z", fill: "#F5EEFF" }),
    /* @__PURE__ */ e("path", { d: "M131.457 14.8585L134.504 17.7821C134.637 17.91 134.817 17.982 135.005 17.9822L150.963 17.9986C151.16 17.9988 151.319 17.8451 151.319 17.6556V17.0857C151.319 16.8877 151.231 16.6996 151.076 16.5693L149.018 14.8337C148.888 14.7245 148.722 14.6644 148.55 14.6639L137.734 14.6473C137.578 14.6473 137.428 14.7125 137.318 14.8222L136.193 15.7418C136.082 15.8515 135.933 15.9133 135.773 15.9133C135.495 15.9133 135.267 15.7245 135.21 15.4741V2.70456C135.21 2.52055 135.133 2.34423 134.997 2.2153L132.887 0.215658C132.753 0.0896149 132.574 0.0188942 132.387 0.0188942H131.594C131.397 0.0188942 131.238 0.172602 131.238 0.36215L131.248 14.3729C131.248 14.5552 131.323 14.7298 131.457 14.8585Z", fill: "#F5EEFF" }),
    /* @__PURE__ */ e("path", { d: "M172.053 0.348759L172.046 14.359C172.046 14.5413 171.97 14.7162 171.836 14.8449L168.79 17.7684C168.657 17.8964 168.476 17.9683 168.288 17.9683L155.722 17.9816C155.533 17.9818 155.352 17.9099 155.219 17.7817L152.173 14.8586C152.039 14.7299 151.963 14.555 151.963 14.3727L151.956 0.362469C151.956 0.172922 152.116 0.0192127 152.312 0.0192127H153.103C153.29 0.0192127 153.469 0.0899334 153.602 0.216219L155.713 2.21562C155.849 2.34455 155.926 2.52087 155.926 2.70488V15.4741C155.983 15.7245 156.211 15.9131 156.488 15.9131C156.648 15.9131 156.798 15.8516 156.908 15.7416L158.033 14.8223C158.144 14.7126 158.293 14.6474 158.45 14.6474L165.559 14.6337C165.716 14.6337 165.866 14.6989 165.976 14.8086L167.101 15.7279C167.211 15.8376 167.361 15.8994 167.521 15.8994C167.799 15.8994 168.026 15.7108 168.083 15.4604V2.69117C168.083 2.50716 168.16 2.33084 168.296 2.20191L170.407 0.202267C170.54 0.0762234 170.719 0.0055027 170.906 0.0055027H171.697C171.893 0.0055027 172.053 0.15921 172.053 0.348759Z", fill: "#F5EEFF" }),
    /* @__PURE__ */ e("path", { d: "M129.209 0.362337V0.932667C129.209 1.13039 129.121 1.31874 128.966 1.44911L126.908 3.18391C126.778 3.29336 126.611 3.35374 126.439 3.3535L113.417 3.34387C113.22 3.34363 113.061 3.49734 113.061 3.68689V8.25602C113.114 8.50666 113.346 8.69525 113.623 8.69525C113.78 8.69525 113.929 8.63343 114.04 8.52711L115.168 7.41916C115.275 7.30924 115.425 7.24405 115.585 7.24405H125.179C125.376 7.24405 125.535 7.39776 125.535 7.58706V8.18433C125.535 8.38062 125.448 8.56728 125.296 8.69765L123.174 10.5121C123.044 10.6234 122.876 10.685 122.702 10.685H113.061L113.064 15.3157C113.064 15.4983 112.989 15.6734 112.855 15.8023L110.773 17.7991C110.64 17.9271 110.459 17.999 110.271 17.999H109.455C109.258 17.999 109.098 17.8453 109.099 17.6557L109.109 3.63108C109.109 3.44923 109.184 3.2746 109.318 3.14615L112.358 0.219934C112.491 0.0914841 112.672 0.0193214 112.861 0.0193214H128.853C129.05 0.0193214 129.209 0.172789 129.209 0.362337Z", fill: "#F5EEFF" }),
    /* @__PURE__ */ e("path", { d: "M70.3098 15.4741C70.3667 15.7245 70.5946 15.9133 70.8722 15.9133C71.0324 15.9133 71.182 15.8515 71.2923 15.7416L72.4173 14.8222C72.5277 14.7125 72.6772 14.6473 72.834 14.6473L83.6496 14.6639C83.8216 14.6642 83.9876 14.7246 84.1171 14.8338L86.1758 16.5693C86.3306 16.6994 86.4192 16.8878 86.4192 17.0857V17.6556C86.4192 17.8451 86.2594 17.9988 86.0627 17.9986L70.1048 17.9822C69.9169 17.982 69.7364 17.9101 69.6033 17.7821L66.5569 14.8588C66.4229 14.7298 66.3473 14.555 66.3473 14.3726V3.63165C66.3473 3.44932 66.4226 3.27468 66.5567 3.14575L69.6028 0.219536C69.7364 0.0913258 69.9171 0.0191631 70.1056 0.0191631H86.0632C86.2597 0.0191631 86.4192 0.172871 86.4192 0.362419V0.927937C86.4192 1.12663 86.3298 1.31545 86.174 1.44583L84.1166 3.16884C83.9876 3.27709 83.8221 3.33674 83.6509 3.33698L72.834 3.35382C72.6772 3.35382 72.5277 3.28863 72.4173 3.17894L71.2923 2.25935C71.182 2.14966 71.0324 2.08784 70.8722 2.08784C70.5946 2.08784 70.3667 2.27666 70.3098 2.52707V15.4741Z", fill: "#F5EEFF" }),
    /* @__PURE__ */ e("path", { d: "M60.3513 6.9047C60.3513 7.09425 60.1918 7.24772 59.9954 7.24772H50.7072C50.5507 7.24772 50.4009 7.30954 50.2906 7.41923L49.1655 8.51707C49.0552 8.62676 48.9056 8.68858 48.7454 8.68858C48.4678 8.68858 48.2399 8.49638 48.1832 8.24598V3.69032C48.1832 3.50077 48.3425 3.34706 48.5392 3.34706H57.8309C58.0623 3.34706 58.2261 3.17917 58.3898 3.04518C58.5466 2.91842 58.6993 2.79141 58.8526 2.66801C58.9986 2.55135 59.1409 2.43468 59.2832 2.31465C59.3119 2.2906 59.3439 2.26654 59.3723 2.24249C59.4827 2.13617 59.6322 2.07435 59.7889 2.07435C60.0665 2.07435 60.2979 2.26318 60.3513 2.51358V6.9047ZM60.5411 0.00278664L47.9958 0.0191441C47.8078 0.0193844 47.6278 0.0910664 47.4945 0.218796L44.4411 3.14621C44.3068 3.2749 44.2315 3.44978 44.2312 3.63211L44.221 17.6558C44.2207 17.8456 44.3802 17.9993 44.5769 17.9993H45.3932C45.5817 17.9993 45.7624 17.9271 45.8959 17.7989L47.9738 15.8022C48.1079 15.6735 48.1832 15.4988 48.1832 15.3165V10.6853H60.3513V15.316C60.3513 15.4986 60.4267 15.6735 60.561 15.8024L62.6421 17.7994C62.7757 17.9274 62.9562 17.9993 63.1446 17.9993H63.9614C64.1581 17.9993 64.3174 17.8458 64.3176 17.6563L64.3243 3.63259C64.3243 3.44978 64.249 3.27466 64.1144 3.14573L61.0443 0.202438C60.9105 0.0742283 60.7295 0.00254631 60.5411 0.00278664Z", fill: "#F5EEFF" }),
    /* @__PURE__ */ e("path", { d: "M91.634 3.33557C91.4373 3.33533 91.2778 3.48904 91.2778 3.67858V8.24795C91.331 8.49836 91.5624 8.68694 91.8402 8.68694C91.997 8.68694 92.1465 8.62536 92.2568 8.51904L93.3854 7.41086C93.492 7.30117 93.6415 7.23598 93.8018 7.23598H103.396C103.593 7.23598 103.752 7.38945 103.752 7.579V8.48464L101.391 10.5038C101.261 10.6154 101.093 10.6767 100.919 10.6767L91.6388 10.6765C91.4418 10.6765 91.2823 10.8304 91.2826 11.02L91.2883 15.4659C91.3455 15.7163 91.5731 15.9049 91.851 15.9049C92.0112 15.9049 92.1607 15.8434 92.2711 15.7334L93.3959 14.8141C93.5062 14.7044 93.6557 14.6392 93.8125 14.6392L104.628 14.6558C104.8 14.656 104.966 14.7164 105.096 14.8256L107.155 16.5611C107.309 16.6913 107.398 16.8796 107.398 17.0776V17.6474C107.398 17.837 107.238 17.9907 107.041 17.9904L91.0836 17.9739C90.8957 17.9739 90.7152 17.9019 90.5819 17.774L87.5357 14.8504C87.4014 14.7217 87.326 14.5468 87.326 14.3643V3.62302C87.326 3.44093 87.4012 3.26653 87.5347 3.13784L90.5744 0.211868C90.7079 0.0831776 90.8889 0.0110149 91.0776 0.0110149H107.07C107.267 0.0110149 107.426 0.164722 107.426 0.354031V1.08023C107.426 1.17909 107.382 1.27315 107.305 1.33833L105.125 3.17561C104.995 3.28529 104.828 3.34543 104.656 3.34543L91.634 3.33557Z", fill: "#F5EEFF" }),
    /* @__PURE__ */ e("path", { d: "M195 17.6331C195 17.8236 194.839 17.9795 194.641 17.9795H193.431C193.229 17.9795 193.037 17.8955 192.903 17.7493L191.27 15.9568C191.161 15.829 191.09 15.6712 191.09 15.5055V14.2499C191.09 14.137 191.036 14.0317 190.942 13.9641L188.429 12.2873C188.219 12.1518 188.086 11.9187 188.086 11.6705V10.3545C188.086 9.83564 187.508 9.50489 187.04 9.75313L178.987 13.9641C178.878 14.024 178.808 14.137 178.808 14.2648V15.5356C178.808 15.6784 178.761 15.8139 178.675 15.9267L177.403 17.694C177.271 17.8777 177.054 17.9872 176.821 17.9872H175.281C175.087 17.9872 174.93 17.8366 174.929 17.6504L174.906 12.8797C174.905 12.63 175.046 12.3996 175.273 12.2796L180.407 9.56503C180.642 9.4373 180.657 9.11377 180.431 8.97113L175.249 5.72258C175.054 5.60231 174.929 5.38414 174.929 5.15105L174.906 0.353651C174.906 0.157848 175.062 0.00774765 175.257 0.00774765H176.467C176.67 0.00774765 176.865 0.0902557 177.005 0.240835L178.628 2.03048C178.745 2.15099 178.808 2.31601 178.808 2.48174V3.73738C178.808 3.85019 178.862 3.95555 178.964 4.01569L183.834 7.2765C184.077 7.43934 184.395 7.45546 184.655 7.31787L190.903 4.00799C191.02 3.94785 191.09 3.83504 191.09 3.70731V2.43652C191.09 2.29364 191.137 2.15821 191.223 2.0377L192.729 5.14984e-05H194.641C194.835 5.14984e-05 194.992 0.151594 194.992 0.338255V5.18112C194.992 5.42936 194.852 5.66245 194.617 5.78248L189.537 8.44458C189.299 8.56966 189.285 8.89487 189.513 9.038L194.672 12.2796C194.867 12.4073 194.992 12.618 194.992 12.8513L195 17.6331Z", fill: "#F5EEFF" })
  ] }),
  /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ e("clipPath", { id: "clip0_4518_4242", children: /* @__PURE__ */ e("rect", { width: "195", height: "18", fill: "white" }) }) })
] }), P = ({
  items: a,
  activeId: l,
  collapsed: s,
  onToggle: n,
  onItemClick: r,
  logo: t,
  logoCollapsed: c,
  className: h = ""
}) => {
  const [v, p] = z(!1), m = s ?? v, f = () => {
    const i = !m;
    p(i), n == null || n(i);
  }, u = [
    "sidenav",
    m ? "sidenav-collapsed" : "sidenav-wide",
    h
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ o("nav", { className: u, children: [
    /* @__PURE__ */ e("div", { className: "sidenav-logo", children: m ? c || /* @__PURE__ */ e(k, { collapsed: !0 }) : t || /* @__PURE__ */ e(k, {}) }),
    /* @__PURE__ */ e("div", { className: "sidenav-nav", children: a.map((i) => /* @__PURE__ */ o(
      "a",
      {
        href: i.href || "#",
        className: `sidenav-item ${l === i.id ? "sidenav-item-active" : ""}`,
        onClick: (C) => {
          var y;
          (i.onClick || r) && (C.preventDefault(), (y = i.onClick) == null || y.call(i), r == null || r(i));
        },
        children: [
          /* @__PURE__ */ e("div", { className: "sidenav-icon", children: i.icon }),
          /* @__PURE__ */ e("span", { className: "sidenav-label", children: i.label })
        ]
      },
      i.id
    )) }),
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        className: "sidenav-toggle",
        onClick: f,
        "aria-label": m ? "Expand navigation" : "Collapse navigation",
        children: /* @__PURE__ */ e("svg", { className: "sidenav-toggle-icon", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ e(
          "path",
          {
            d: "M15 18l-6-6 6-6",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) })
      }
    )
  ] });
};
P.displayName = "Sidenav";
const e1 = {
  add: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
  add_circle: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z",
  arrow_back: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
  arrow_down: "M7 10l5 5 5-5z",
  arrow_downward: "M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z",
  arrow_forward: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z",
  arrow_up: "M7 14l5-5 5 5z",
  arrow_upward: "M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z",
  box_minus: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 11h10v2H7z",
  box_plus: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z",
  calendar_month: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z",
  cancel: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z",
  check: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  check_circle: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  chevron_down: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  chevron_left: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z",
  chevron_right: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
  chevron_up: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z",
  close: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  close_fullscreen: "M22 3.41L16.71 8.7 20 12h-8V4l3.29 3.29L20.59 2 22 3.41zM3.41 22l5.29-5.29L12 20v-8H4l3.29 3.29L2 20.59 3.41 22z",
  copy: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
  delete: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
  download: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z",
  edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
  filter_list: "M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z",
  globe: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
  grid_off: "M8 4v1.45l2 2V4h4v4h-3.45l2 2H14v1.45l2 2V10h4v4h-3.45l2 2H20v1.45l2 2V4c0-1.1-.9-2-2-2H4.55l2 2H8zm8 0h4v4h-4V4zM1.27 1.27L0 2.55l2 2V20c0 1.1.9 2 2 2h15.46l2 2 1.27-1.27L1.27 1.27zM10 12.55L11.45 14H10v-1.45zm-6-6L5.45 8H4V6.55zM8 20H4v-4h4v4zm0-6H4v-4h3.45l.55.55V14zm6 6h-4v-4h3.45l.55.55V20zm2 0v-1.45L17.45 20H16z",
  grid_on: "M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z",
  help: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z",
  info: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
  logout: "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z",
  map: "M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z",
  menu: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z",
  more_vert: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z",
  open_in_full: "M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z",
  open_in_new: "M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z",
  pause: "M6 19h4V5H6v14zm8-14v14h4V5h-4z",
  play_arrow: "M8 5v14l11-7z",
  print: "M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z",
  refresh: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z",
  remove: "M19 13H5v-2h14v2z",
  satellite: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 4.99h3C8 6.65 6.66 8 5 8V4.99zM5 12v-2c2.76 0 5-2.25 5-5.01h2C12 8.86 8.87 12 5 12zm0 6l3.5-4.5 2.5 3.01L14.5 12l4.5 6H5z",
  search: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  settings: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
  sort: "M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z",
  star: "M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z",
  star_filled: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  swap_horiz: "M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z",
  sync: "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z",
  warning_circle: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
  warning_tri: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z",
  freeview: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
}, a1 = ({
  name: a,
  size: l = 24,
  color: s = "currentColor",
  className: n = "",
  style: r,
  ...t
}) => {
  const c = e1[a];
  return c ? /* @__PURE__ */ e(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: l,
      height: l,
      fill: s,
      className: n,
      style: r,
      ...t,
      children: /* @__PURE__ */ e("path", { d: c })
    }
  ) : null;
};
a1.displayName = "Icon";
const r1 = L.forwardRef(
  ({ className: a = "", label: l, id: s, ...n }, r) => {
    const t = s || `radio-${Math.random().toString(36).substr(2, 9)}`;
    return /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ e(
        "input",
        {
          ref: r,
          type: "radio",
          id: t,
          className: ["radio-input", a].filter(Boolean).join(" "),
          ...n
        }
      ),
      l && /* @__PURE__ */ e("label", { htmlFor: t, className: "text-body-small", style: { cursor: "pointer" }, children: l })
    ] });
  }
);
r1.displayName = "RadioButton";
const N = L.forwardRef(
  ({ title: a, actions: l, className: s = "", children: n, ...r }, t) => {
    const c = ["chart-base", s].filter(Boolean).join(" ");
    return /* @__PURE__ */ o("div", { ref: t, className: c, ...r, children: [
      (a || l) && /* @__PURE__ */ o("div", { className: "chart-header", children: [
        a && /* @__PURE__ */ e("div", { className: "chart-header-title", children: a }),
        l && /* @__PURE__ */ e("div", { className: "chart-header-actions", children: l })
      ] }),
      /* @__PURE__ */ e("div", { className: "chart-layout-container", children: n })
    ] });
  }
);
N.displayName = "ChartBase";
const M = L.forwardRef(
  ({ items: a, className: l = "", style: s, ...n }, r) => {
    const t = ["chart-legend", l].filter(Boolean).join(" ");
    return /* @__PURE__ */ e(
      "div",
      {
        ref: r,
        className: t,
        style: { justifyContent: "flex-start", marginTop: "24px", paddingLeft: "70px", ...s },
        ...n,
        children: a.map((c, h) => /* @__PURE__ */ o("div", { className: "legend-item", children: [
          /* @__PURE__ */ e("div", { className: "legend-color", style: { backgroundColor: c.color } }),
          /* @__PURE__ */ e("span", { children: c.label })
        ] }, h))
      }
    );
  }
);
M.displayName = "ChartLegend";
const H = ({ label: a, values: l, className: s = "" }) => /* @__PURE__ */ o("div", { className: `chart-y-label-container ${s}`, children: [
  a && /* @__PURE__ */ e("span", { className: "chart-axis-label y-axis", children: a }),
  /* @__PURE__ */ e("div", { className: "chart-y-axis", style: { justifyContent: "space-between" }, children: l.map((n, r) => /* @__PURE__ */ e("span", { children: n }, r)) })
] });
H.displayName = "ChartYAxis";
const V = ({ label: a, values: l, className: s = "" }) => {
  const n = (r, t) => t <= 1 ? "0%" : `${r / (t - 1) * 100}%`;
  return /* @__PURE__ */ o("div", { className: `chart-x-axis-container ${s}`, children: [
    /* @__PURE__ */ e("div", { className: "chart-x-axis", children: l.map((r, t) => /* @__PURE__ */ e("span", { style: { left: n(t, l.length) }, children: r }, t)) }),
    a && /* @__PURE__ */ e("div", { className: "chart-axis-label x-axis", children: a })
  ] });
};
V.displayName = "ChartXAxis";
const x = ({
  horizontalLines: a = [],
  verticalLines: l = [],
  children: s,
  className: n = ""
}) => /* @__PURE__ */ o("div", { className: `chart-plot-area ${n}`, children: [
  a.map((r, t) => /* @__PURE__ */ e(
    "div",
    {
      className: `chart-grid-line ${r.style === "dashed" ? "dashed" : ""}`,
      style: {
        top: `${r.position}%`,
        borderTopStyle: r.style || "solid"
      }
    },
    `h-${t}`
  )),
  l.map((r, t) => /* @__PURE__ */ e(
    "div",
    {
      className: "chart-grid-vertical",
      style: {
        left: `${r.position}%`,
        borderLeftStyle: r.style || "dotted"
      }
    },
    `v-${t}`
  )),
  s
] });
x.displayName = "ChartGrid";
const l1 = ({
  title: a,
  data: l,
  xAxisLabel: s,
  xAxisValues: n = [],
  yAxisLabel: r,
  yAxisValues: t = [],
  legend: c,
  biDirectional: h = !1,
  horizontalGridLines: v,
  verticalGridLines: p,
  className: m = ""
}) => {
  const f = v || [
    { position: 0, style: "solid" },
    { position: 25, style: "dotted" },
    { position: 50, style: "dotted" },
    { position: 75, style: "dotted" },
    { position: 100, style: "solid" }
  ], u = (i, C) => C <= 1 ? 0 : i / (C - 1) * 100;
  return /* @__PURE__ */ o(N, { title: a, className: m, children: [
    /* @__PURE__ */ o("div", { className: "chart-layout", children: [
      /* @__PURE__ */ e(H, { label: r, values: t }),
      /* @__PURE__ */ e(x, { horizontalLines: f, verticalLines: p, children: /* @__PURE__ */ e("div", { className: `bar-chart-container ${h ? "bi-directional" : ""}`, children: l.map((i, C) => /* @__PURE__ */ e(
        "div",
        {
          className: "bar-group",
          style: { left: `${i.position ?? u(C, l.length)}%` },
          children: i.values.map((y, g) => /* @__PURE__ */ e(
            "div",
            {
              className: `bar-value bar-${y.colorIndex || g + 1} ${y.direction || ""}`,
              style: { height: `${y.height}%` }
            },
            g
          ))
        },
        C
      )) }) })
    ] }),
    /* @__PURE__ */ e(V, { label: s, values: n }),
    c && /* @__PURE__ */ e(M, { items: c })
  ] });
};
l1.displayName = "BarChart";
const t1 = ({
  title: a,
  series: l,
  xAxisLabel: s,
  xAxisValues: n = [],
  yAxisLabel: r,
  yAxisValues: t = [],
  legend: c,
  horizontalGridLines: h,
  verticalGridLines: v,
  viewBox: p = { width: 1e3, height: 250 },
  className: m = ""
}) => {
  const f = h || [
    { position: 0, style: "solid" },
    { position: 16.66, style: "dotted" },
    { position: 33.33, style: "dotted" },
    { position: 50, style: "dotted" },
    { position: 66.66, style: "dotted" },
    { position: 83.33, style: "dotted" },
    { position: 100, style: "solid" }
  ], u = (i) => {
    if (i.length === 0) return "";
    const [C, ...y] = i, g = `M${C.x},${C.y}`, w = y.map((d) => `L${d.x},${d.y}`).join(" ");
    return `${g} ${w}`;
  };
  return /* @__PURE__ */ o(N, { title: a, className: m, children: [
    /* @__PURE__ */ o("div", { className: "chart-layout", children: [
      /* @__PURE__ */ e(H, { label: r, values: t }),
      /* @__PURE__ */ e(x, { horizontalLines: f, verticalLines: v, children: /* @__PURE__ */ e(
        "svg",
        {
          className: "line-chart-svg",
          viewBox: `0 0 ${p.width} ${p.height}`,
          preserveAspectRatio: "none",
          children: l.map((i, C) => /* @__PURE__ */ e(
            "path",
            {
              className: `line-path color-${i.colorIndex || C + 1}`,
              d: u(i.points)
            },
            C
          ))
        }
      ) })
    ] }),
    /* @__PURE__ */ e(V, { label: s, values: n }),
    c && /* @__PURE__ */ e(M, { items: c })
  ] });
};
t1.displayName = "LineChart";
const s1 = ({
  title: a,
  points: l,
  xAxisLabel: s,
  xAxisValues: n = [],
  yAxisLabel: r,
  yAxisValues: t = [],
  legend: c,
  horizontalGridLines: h,
  verticalGridLines: v,
  className: p = ""
}) => /* @__PURE__ */ o(N, { title: a, className: p, children: [
  /* @__PURE__ */ o("div", { className: "chart-layout", children: [
    /* @__PURE__ */ e(H, { label: r, values: t }),
    /* @__PURE__ */ e(x, { horizontalLines: h || [
      { position: 0, style: "solid" },
      { position: 25, style: "dashed" },
      { position: 50, style: "dashed" },
      { position: 75, style: "dashed" },
      { position: 100, style: "solid" }
    ], verticalLines: v, children: l.map((f, u) => /* @__PURE__ */ e(
      "div",
      {
        className: `scatter-point size-${f.size || "sm"} color-${f.colorIndex || 1}`,
        style: {
          left: `${f.x}%`,
          bottom: `${f.y}%`
        }
      },
      u
    )) })
  ] }),
  /* @__PURE__ */ e(V, { label: s, values: n }),
  c && /* @__PURE__ */ e(M, { items: c })
] });
s1.displayName = "ScatterChart";
const n1 = ({
  currentPage: a,
  totalItems: l,
  rowsPerPage: s,
  rowsPerPageOptions: n = [10, 20, 50],
  onPageChange: r,
  onRowsPerPageChange: t,
  className: c = ""
}) => {
  const h = (a - 1) * s + 1, v = Math.min(a * s, l), p = Math.ceil(l / s), m = () => {
    a > 1 && (r == null || r(a - 1));
  }, f = () => {
    a < p && (r == null || r(a + 1));
  }, u = ["table-footer", c].filter(Boolean).join(" ");
  return /* @__PURE__ */ o("div", { className: u, children: [
    /* @__PURE__ */ o("div", { className: "rows-per-page", children: [
      /* @__PURE__ */ e("span", { children: "Rows per page" }),
      /* @__PURE__ */ e(
        "select",
        {
          className: "rows-select",
          value: s,
          onChange: (i) => t == null ? void 0 : t(Number(i.target.value)),
          children: n.map((i) => /* @__PURE__ */ e("option", { value: i, children: i }, i))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "page-info", children: [
      h,
      "-",
      v,
      " of ",
      l.toLocaleString()
    ] }),
    /* @__PURE__ */ o("div", { className: "pagination-controls", children: [
      /* @__PURE__ */ e(
        "button",
        {
          className: "pagination-btn",
          onClick: m,
          disabled: a <= 1,
          "aria-label": "Previous page",
          children: /* @__PURE__ */ e("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ e(
            "path",
            {
              d: "M15 18L9 12L15 6",
              stroke: "#EEEEEE",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ) })
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          className: "pagination-btn",
          onClick: f,
          disabled: a >= p,
          "aria-label": "Next page",
          children: /* @__PURE__ */ e("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ e(
            "path",
            {
              d: "M9 18L15 12L9 6",
              stroke: "#EEEEEE",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ) })
        }
      )
    ] })
  ] });
};
n1.displayName = "TablePagination";
const c1 = L.forwardRef(
  ({ logo: a, logoHref: l = "#", navItems: s = [], className: n = "", children: r, ...t }, c) => {
    const h = ["showcase-header", n].filter(Boolean).join(" ");
    return /* @__PURE__ */ o("header", { ref: c, className: h, ...t, children: [
      /* @__PURE__ */ e("div", { className: "logo-container", children: /* @__PURE__ */ e("a", { href: l, title: "Back to top", children: a }) }),
      s.length > 0 && /* @__PURE__ */ e("nav", { className: "showcase-nav", children: s.map((v, p) => /* @__PURE__ */ e("a", { href: v.href, children: v.label }, p)) }),
      r
    ] });
  }
);
c1.displayName = "PageHeader";
const i1 = L.forwardRef(
  ({ id: a, title: l, className: s = "", children: n, ...r }, t) => {
    const c = ["section", s].filter(Boolean).join(" ");
    return /* @__PURE__ */ o("section", { ref: t, id: a, className: c, ...r, children: [
      l && /* @__PURE__ */ e("h2", { children: l }),
      n
    ] });
  }
);
i1.displayName = "Section";
const o1 = L.forwardRef(
  ({ label: a, className: l = "", children: s, ...n }, r) => {
    const t = ["component-group", l].filter(Boolean).join(" ");
    return /* @__PURE__ */ o("div", { ref: r, className: t, ...n, children: [
      a && /* @__PURE__ */ e("span", { className: "component-label", children: a }),
      s
    ] });
  }
);
o1.displayName = "ComponentGroup";
const d1 = L.forwardRef(
  ({ label: a, className: l = "", children: s, ...n }, r) => {
    const t = ["component-wrapper", l].filter(Boolean).join(" ");
    return /* @__PURE__ */ o("div", { ref: r, className: t, ...n, children: [
      a && /* @__PURE__ */ e("span", { className: "component-label", children: a }),
      s
    ] });
  }
);
d1.displayName = "ComponentWrapper";
export {
  I as Badge,
  l1 as BarChart,
  X as Breadcrumb,
  _ as Button,
  N as ChartBase,
  x as ChartGrid,
  M as ChartLegend,
  V as ChartXAxis,
  H as ChartYAxis,
  W as Checkbox,
  o1 as ComponentGroup,
  d1 as ComponentWrapper,
  U as DatePicker,
  J as Dropdown,
  Y as Heading,
  a1 as Icon,
  j as Input,
  t1 as LineChart,
  c1 as PageHeader,
  r1 as RadioButton,
  s1 as ScatterChart,
  i1 as Section,
  P as Sidenav,
  G as Table,
  n1 as TablePagination,
  R as Text,
  q as Tooltip,
  S as colors,
  $ as cssVars,
  p1 as tokens,
  D as typography
};
