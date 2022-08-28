import { inject as K, onBeforeMount as Ze, computed as z, ref as Or, watchEffect as Ye, defineComponent as Qe, h as Ar, openBlock as Er, createBlock as jr, unref as Rr, withCtx as zr, createElementVNode as x } from "vue";
const Re = {
  black: "#000",
  silver: "#C0C0C0",
  gray: "#808080",
  white: "#FFF",
  maroon: "#800000",
  red: "#F00",
  purple: "#800080",
  fuchsia: "#F0F",
  green: "#008000",
  lime: "#0F0",
  olive: "#808000",
  yellow: "#FF0",
  navy: "#000080",
  blue: "#00F",
  teal: "#008080",
  aqua: "#0FF",
  transparent: "#0000"
}, F = "^\\s*", I = "\\s*$", E = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*", j = "([0-9A-Fa-f])", R = "([0-9A-Fa-f]{2})", Mr = new RegExp(`${F}rgb\\s*\\(${E},${E},${E}\\)${I}`), Br = new RegExp(`${F}rgba\\s*\\(${E},${E},${E},${E}\\)${I}`), Hr = new RegExp(`${F}#${j}${j}${j}${I}`), Fr = new RegExp(`${F}#${R}${R}${R}${I}`), Ir = new RegExp(`${F}#${j}${j}${j}${j}${I}`), Dr = new RegExp(`${F}#${R}${R}${R}${R}${I}`);
function w(e) {
  return parseInt(e, 16);
}
function H(e) {
  try {
    let r;
    if (r = Fr.exec(e))
      return [w(r[1]), w(r[2]), w(r[3]), 1];
    if (r = Mr.exec(e))
      return [_(r[1]), _(r[5]), _(r[9]), 1];
    if (r = Br.exec(e))
      return [
        _(r[1]),
        _(r[5]),
        _(r[9]),
        V(r[13])
      ];
    if (r = Hr.exec(e))
      return [
        w(r[1] + r[1]),
        w(r[2] + r[2]),
        w(r[3] + r[3]),
        1
      ];
    if (r = Dr.exec(e))
      return [
        w(r[1]),
        w(r[2]),
        w(r[3]),
        V(w(r[4]) / 255)
      ];
    if (r = Ir.exec(e))
      return [
        w(r[1] + r[1]),
        w(r[2] + r[2]),
        w(r[3] + r[3]),
        V(w(r[4] + r[4]) / 255)
      ];
    if (e in Re)
      return H(Re[e]);
    throw new Error(`[seemly/rgba]: Invalid color value ${e}.`);
  } catch (r) {
    throw r;
  }
}
function Nr(e) {
  return e > 1 ? 1 : e < 0 ? 0 : e;
}
function Lr(e, r, t, n) {
  return `rgba(${_(e)}, ${_(r)}, ${_(t)}, ${Nr(n)})`;
}
function he(e, r, t, n, o) {
  return _((e * r * (1 - n) + t * n) / o);
}
function P(e, r) {
  Array.isArray(e) || (e = H(e)), Array.isArray(r) || (r = H(r));
  const t = e[3], n = r[3], o = V(t + n - t * n);
  return Lr(he(e[0], t, r[0], n, o), he(e[1], t, r[1], n, o), he(e[2], t, r[2], n, o), o);
}
function Y(e, r) {
  const [t, n, o, l = 1] = Array.isArray(e) ? e : H(e), { lightness: i = 1, alpha: a = 1 } = r;
  return Ur([t * i, n * i, o * i, l * a]);
}
function V(e) {
  const r = Math.round(Number(e) * 100) / 100;
  return r > 1 ? 1 : r < 0 ? 0 : r;
}
function _(e) {
  const r = Math.round(Number(e));
  return r > 255 ? 255 : r < 0 ? 0 : r;
}
function Ur(e) {
  const [r, t, n] = e;
  return 3 in e ? `rgba(${_(r)}, ${_(t)}, ${_(n)}, ${V(e[3])})` : `rgba(${_(r)}, ${_(t)}, ${_(n)}, 1)`;
}
function Gr(e, r) {
  throw new Error(`[naive/${e}]: ${r}`);
}
function Vr(e) {
  let r = 0;
  for (let t = 0; t < e.length; ++t)
    e[t] === "&" && ++r;
  return r;
}
const ke = /\s*,(?![^(]*\))\s*/g, qr = /\s+/g;
function Wr(e, r) {
  const t = [];
  return r.split(ke).forEach((n) => {
    let o = Vr(n);
    if (o) {
      if (o === 1) {
        e.forEach((i) => {
          t.push(n.replace("&", i));
        });
        return;
      }
    } else {
      e.forEach((i) => {
        t.push(
          (i && i + " ") + n
        );
      });
      return;
    }
    let l = [
      n
    ];
    for (; o--; ) {
      const i = [];
      l.forEach((a) => {
        e.forEach((u) => {
          i.push(a.replace("&", u));
        });
      }), l = i;
    }
    l.forEach((i) => t.push(i));
  }), t;
}
function Kr(e, r) {
  const t = [];
  return r.split(ke).forEach((n) => {
    e.forEach((o) => {
      t.push((o && o + " ") + n);
    });
  }), t;
}
function Jr(e) {
  let r = [""];
  return e.forEach((t) => {
    t = t && t.trim(), t && (t.includes("&") ? r = Wr(r, t) : r = Kr(r, t));
  }), r.join(", ").replace(qr, " ");
}
function ze(e) {
  if (!e)
    return;
  const r = e.parentElement;
  r && r.removeChild(e);
}
function ae(e) {
  return document.head.querySelector(`style[cssr-id="${e}"]`);
}
function Xr(e) {
  const r = document.createElement("style");
  return r.setAttribute("cssr-id", e), r;
}
function Q(e) {
  return e ? /^\s*@(s|m)/.test(e) : !1;
}
const Zr = /[A-Z]/g;
function er(e) {
  return e.replace(Zr, (r) => "-" + r.toLowerCase());
}
function Yr(e, r = "  ") {
  return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((t) => r + `  ${er(t[0])}: ${t[1]};`).join(`
`) + `
` + r + "}" : `: ${e};`;
}
function Qr(e, r, t) {
  return typeof e == "function" ? e({
    context: r.context,
    props: t
  }) : e;
}
function Me(e, r, t, n) {
  if (!r)
    return "";
  const o = Qr(r, t, n);
  if (!o)
    return "";
  if (typeof o == "string")
    return `${e} {
${o}
}`;
  const l = Object.keys(o);
  if (l.length === 0)
    return t.config.keepEmptyBlock ? e + ` {
}` : "";
  const i = e ? [
    e + " {"
  ] : [];
  return l.forEach((a) => {
    const u = o[a];
    if (a === "raw") {
      i.push(`
` + u + `
`);
      return;
    }
    a = er(a), u != null && i.push(`  ${a}${Yr(u)}`);
  }), e && i.push("}"), i.join(`
`);
}
function ve(e, r, t) {
  !e || e.forEach((n) => {
    if (Array.isArray(n))
      ve(n, r, t);
    else if (typeof n == "function") {
      const o = n(r);
      Array.isArray(o) ? ve(o, r, t) : o && t(o);
    } else
      n && t(n);
  });
}
function rr(e, r, t, n, o, l) {
  const i = e.$;
  let a = "";
  if (!i || typeof i == "string")
    Q(i) ? a = i : r.push(i);
  else if (typeof i == "function") {
    const d = i({
      context: n.context,
      props: o
    });
    Q(d) ? a = d : r.push(d);
  } else if (i.before && i.before(n.context), !i.$ || typeof i.$ == "string")
    Q(i.$) ? a = i.$ : r.push(i.$);
  else if (i.$) {
    const d = i.$({
      context: n.context,
      props: o
    });
    Q(d) ? a = d : r.push(d);
  }
  const u = Jr(r), f = Me(u, e.props, n, o);
  a ? (t.push(`${a} {`), l && f && l.insertRule(`${a} {
${f}
}
`)) : (l && f && l.insertRule(f), !l && f.length && t.push(f)), e.children && ve(e.children, {
    context: n.context,
    props: o
  }, (d) => {
    if (typeof d == "string") {
      const p = Me(u, { raw: d }, n, o);
      l ? l.insertRule(p) : t.push(p);
    } else
      rr(d, r, t, n, o, l);
  }), r.pop(), a && t.push("}"), i && i.after && i.after(n.context);
}
function tr(e, r, t, n = !1) {
  const o = [];
  return rr(e, [], o, r, t, n ? e.instance.__styleSheet : void 0), n ? "" : o.join(`

`);
}
function xe(e) {
  for (var r = 0, t, n = 0, o = e.length; o >= 4; ++n, o -= 4)
    t = e.charCodeAt(n) & 255 | (e.charCodeAt(++n) & 255) << 8 | (e.charCodeAt(++n) & 255) << 16 | (e.charCodeAt(++n) & 255) << 24, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), t ^= t >>> 24, r = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16) ^ (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16);
  switch (o) {
    case 3:
      r ^= (e.charCodeAt(n + 2) & 255) << 16;
    case 2:
      r ^= (e.charCodeAt(n + 1) & 255) << 8;
    case 1:
      r ^= e.charCodeAt(n) & 255, r = (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16);
  }
  return r ^= r >>> 13, r = (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16), ((r ^ r >>> 15) >>> 0).toString(36);
}
typeof window < "u" && (window.__cssrContext = {});
function kr(e, r, t) {
  const { els: n } = r;
  if (t === void 0)
    n.forEach(ze), r.els = [];
  else {
    const o = ae(t);
    o && n.includes(o) && (ze(o), r.els = n.filter((l) => l !== o));
  }
}
function Be(e, r) {
  e.push(r);
}
function et(e, r, t, n, o, l, i, a, u) {
  if (l && !u) {
    if (t === void 0) {
      console.error("[css-render/mount]: `id` is required in `silent` mode.");
      return;
    }
    const y = window.__cssrContext;
    y[t] || (y[t] = !0, tr(r, e, n, l));
    return;
  }
  let f;
  if (t === void 0 && (f = r.render(n), t = xe(f)), u) {
    u.adapter(t, f != null ? f : r.render(n));
    return;
  }
  const d = ae(t);
  if (d !== null && !i)
    return d;
  const p = d != null ? d : Xr(t);
  if (f === void 0 && (f = r.render(n)), p.textContent = f, d !== null)
    return d;
  if (a) {
    const y = document.head.querySelector(`meta[name="${a}"]`);
    if (y)
      return document.head.insertBefore(p, y), Be(r.els, p), p;
  }
  return o ? document.head.insertBefore(p, document.head.querySelector("style, link")) : document.head.appendChild(p), Be(r.els, p), p;
}
function rt(e) {
  return tr(this, this.instance, e);
}
function tt(e = {}) {
  const { id: r, ssr: t, props: n, head: o = !1, silent: l = !1, force: i = !1, anchorMetaName: a } = e;
  return et(this.instance, this, r, n, o, l, i, a, t);
}
function nt(e = {}) {
  const { id: r } = e;
  kr(this.instance, this, r);
}
const k = function(e, r, t, n) {
  return {
    instance: e,
    $: r,
    props: t,
    children: n,
    els: [],
    render: rt,
    mount: tt,
    unmount: nt
  };
}, ot = function(e, r, t, n) {
  return Array.isArray(r) ? k(e, { $: null }, null, r) : Array.isArray(t) ? k(e, r, null, t) : Array.isArray(n) ? k(e, r, t, n) : k(e, r, t, null);
};
function it(e = {}) {
  let r = null;
  const t = {
    c: (...n) => ot(t, ...n),
    use: (n, ...o) => n.install(t, ...o),
    find: ae,
    context: {},
    config: e,
    get __styleSheet() {
      if (!r) {
        const n = document.createElement("style");
        return document.head.appendChild(n), r = document.styleSheets[document.styleSheets.length - 1], r;
      }
      return r;
    }
  };
  return t;
}
function at(e, r) {
  if (e === void 0)
    return !1;
  if (r) {
    const { context: { ids: t } } = r;
    return t.has(e);
  }
  return ae(e) !== null;
}
function lt(e) {
  let r = ".", t = "__", n = "--", o;
  if (e) {
    let s = e.blockPrefix;
    s && (r = s), s = e.elementPrefix, s && (t = s), s = e.modifierPrefix, s && (n = s);
  }
  const l = {
    install(s) {
      o = s.c;
      const v = s.context;
      v.bem = {}, v.bem.b = null, v.bem.els = null;
    }
  };
  function i(s) {
    let v, b;
    return {
      before(h) {
        v = h.bem.b, b = h.bem.els, h.bem.els = null;
      },
      after(h) {
        h.bem.b = v, h.bem.els = b;
      },
      $({ context: h, props: C }) {
        return s = typeof s == "string" ? s : s({ context: h, props: C }), h.bem.b = s, `${(C == null ? void 0 : C.bPrefix) || r}${h.bem.b}`;
      }
    };
  }
  function a(s) {
    let v;
    return {
      before(b) {
        v = b.bem.els;
      },
      after(b) {
        b.bem.els = v;
      },
      $({ context: b, props: h }) {
        return s = typeof s == "string" ? s : s({ context: b, props: h }), b.bem.els = s.split(",").map((C) => C.trim()), b.bem.els.map((C) => `${(h == null ? void 0 : h.bPrefix) || r}${b.bem.b}${t}${C}`).join(", ");
      }
    };
  }
  function u(s) {
    return {
      $({ context: v, props: b }) {
        s = typeof s == "string" ? s : s({ context: v, props: b });
        const h = s.split(",").map((O) => O.trim());
        function C(O) {
          return h.map((U) => `&${(b == null ? void 0 : b.bPrefix) || r}${v.bem.b}${O !== void 0 ? `${t}${O}` : ""}${n}${U}`).join(", ");
        }
        const A = v.bem.els;
        if (A !== null) {
          if (process.env.NODE_ENV !== "production" && A.length >= 2)
            throw Error(`[css-render/plugin-bem]: m(${s}) is invalid, using modifier inside multiple elements is not allowed`);
          return C(A[0]);
        } else
          return C();
      }
    };
  }
  function f(s) {
    return {
      $({ context: v, props: b }) {
        s = typeof s == "string" ? s : s({ context: v, props: b });
        const h = v.bem.els;
        if (process.env.NODE_ENV !== "production" && h !== null && h.length >= 2)
          throw Error(`[css-render/plugin-bem]: notM(${s}) is invalid, using modifier inside multiple elements is not allowed`);
        return `&:not(${(b == null ? void 0 : b.bPrefix) || r}${v.bem.b}${h !== null && h.length > 0 ? `${t}${h[0]}` : ""}${n}${s})`;
      }
    };
  }
  return Object.assign(l, {
    cB: (...s) => o(i(s[0]), s[1], s[2]),
    cE: (...s) => o(a(s[0]), s[1], s[2]),
    cM: (...s) => o(u(s[0]), s[1], s[2]),
    cNotM: (...s) => o(f(s[0]), s[1], s[2])
  }), l;
}
function te(e, r) {
  return e + (r === "default" ? "" : r.replace(/^[a-z]/, (t) => t.toUpperCase()));
}
te("abc", "def");
const st = "n", ne = `.${st}-`, ut = "__", ct = "--", nr = it(), or = lt({
  blockPrefix: ne,
  elementPrefix: ut,
  modifierPrefix: ct
});
nr.use(or);
const { c: g, find: Ii } = nr, { cB: be, cE: Di, cM: ee, cNotM: dt } = or;
function ft(e) {
  return g(({ props: { bPrefix: r } }) => `${r || ne}modal, ${r || ne}drawer`, [e]);
}
function pt(e) {
  return g(({ props: { bPrefix: r } }) => `${r || ne}popover`, [e]);
}
const ir = Symbol("@css-render/vue3-ssr");
function ht(e, r) {
  return `<style cssr-id="${e}">
${r}
</style>`;
}
function bt(e, r) {
  const t = K(ir, null);
  if (t === null) {
    console.error("[css-render/vue3-ssr]: no ssr context found.");
    return;
  }
  const { styles: n, ids: o } = t;
  o.has(e) || n !== null && (o.add(e), n.push(ht(e, r)));
}
const gt = typeof document < "u";
function we() {
  if (gt)
    return;
  const e = K(ir, null);
  if (e !== null)
    return {
      adapter: bt,
      context: e
    };
}
var mt = typeof global == "object" && global && global.Object === Object && global;
const ar = mt;
var vt = typeof self == "object" && self && self.Object === Object && self, xt = ar || vt || Function("return this")();
const D = xt;
var yt = D.Symbol;
const oe = yt;
var lr = Object.prototype, Ct = lr.hasOwnProperty, $t = lr.toString, G = oe ? oe.toStringTag : void 0;
function _t(e) {
  var r = Ct.call(e, G), t = e[G];
  try {
    e[G] = void 0;
    var n = !0;
  } catch {
  }
  var o = $t.call(e);
  return n && (r ? e[G] = t : delete e[G]), o;
}
var St = Object.prototype, wt = St.toString;
function Pt(e) {
  return wt.call(e);
}
var Tt = "[object Null]", Ot = "[object Undefined]", He = oe ? oe.toStringTag : void 0;
function le(e) {
  return e == null ? e === void 0 ? Ot : Tt : He && He in Object(e) ? _t(e) : Pt(e);
}
function J(e) {
  return e != null && typeof e == "object";
}
var At = Array.isArray;
const ye = At;
function B(e) {
  var r = typeof e;
  return e != null && (r == "object" || r == "function");
}
function sr(e) {
  return e;
}
var Et = "[object AsyncFunction]", jt = "[object Function]", Rt = "[object GeneratorFunction]", zt = "[object Proxy]";
function Pe(e) {
  if (!B(e))
    return !1;
  var r = le(e);
  return r == jt || r == Rt || r == Et || r == zt;
}
var Mt = D["__core-js_shared__"];
const ge = Mt;
var Fe = function() {
  var e = /[^.]+$/.exec(ge && ge.keys && ge.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Bt(e) {
  return !!Fe && Fe in e;
}
var Ht = Function.prototype, Ft = Ht.toString;
function It(e) {
  if (e != null) {
    try {
      return Ft.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Dt = /[\\^$.*+?()[\]{}|]/g, Nt = /^\[object .+?Constructor\]$/, Lt = Function.prototype, Ut = Object.prototype, Gt = Lt.toString, Vt = Ut.hasOwnProperty, qt = RegExp(
  "^" + Gt.call(Vt).replace(Dt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Wt(e) {
  if (!B(e) || Bt(e))
    return !1;
  var r = Pe(e) ? qt : Nt;
  return r.test(It(e));
}
function Kt(e, r) {
  return e == null ? void 0 : e[r];
}
function Te(e, r) {
  var t = Kt(e, r);
  return Wt(t) ? t : void 0;
}
var Ie = Object.create, Jt = function() {
  function e() {
  }
  return function(r) {
    if (!B(r))
      return {};
    if (Ie)
      return Ie(r);
    e.prototype = r;
    var t = new e();
    return e.prototype = void 0, t;
  };
}();
const Xt = Jt;
function Zt(e, r, t) {
  switch (t.length) {
    case 0:
      return e.call(r);
    case 1:
      return e.call(r, t[0]);
    case 2:
      return e.call(r, t[0], t[1]);
    case 3:
      return e.call(r, t[0], t[1], t[2]);
  }
  return e.apply(r, t);
}
function Yt(e, r) {
  var t = -1, n = e.length;
  for (r || (r = Array(n)); ++t < n; )
    r[t] = e[t];
  return r;
}
var Qt = 800, kt = 16, en = Date.now;
function rn(e) {
  var r = 0, t = 0;
  return function() {
    var n = en(), o = kt - (n - t);
    if (t = n, o > 0) {
      if (++r >= Qt)
        return arguments[0];
    } else
      r = 0;
    return e.apply(void 0, arguments);
  };
}
function tn(e) {
  return function() {
    return e;
  };
}
var nn = function() {
  try {
    var e = Te(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const ie = nn;
var on = ie ? function(e, r) {
  return ie(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: tn(r),
    writable: !0
  });
} : sr;
const an = on;
var ln = rn(an);
const sn = ln;
var un = 9007199254740991, cn = /^(?:0|[1-9]\d*)$/;
function ur(e, r) {
  var t = typeof e;
  return r = r == null ? un : r, !!r && (t == "number" || t != "symbol" && cn.test(e)) && e > -1 && e % 1 == 0 && e < r;
}
function Oe(e, r, t) {
  r == "__proto__" && ie ? ie(e, r, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : e[r] = t;
}
function se(e, r) {
  return e === r || e !== e && r !== r;
}
var dn = Object.prototype, fn = dn.hasOwnProperty;
function pn(e, r, t) {
  var n = e[r];
  (!(fn.call(e, r) && se(n, t)) || t === void 0 && !(r in e)) && Oe(e, r, t);
}
function hn(e, r, t, n) {
  var o = !t;
  t || (t = {});
  for (var l = -1, i = r.length; ++l < i; ) {
    var a = r[l], u = n ? n(t[a], e[a], a, t, e) : void 0;
    u === void 0 && (u = e[a]), o ? Oe(t, a, u) : pn(t, a, u);
  }
  return t;
}
var De = Math.max;
function bn(e, r, t) {
  return r = De(r === void 0 ? e.length - 1 : r, 0), function() {
    for (var n = arguments, o = -1, l = De(n.length - r, 0), i = Array(l); ++o < l; )
      i[o] = n[r + o];
    o = -1;
    for (var a = Array(r + 1); ++o < r; )
      a[o] = n[o];
    return a[r] = t(i), Zt(e, this, a);
  };
}
function gn(e, r) {
  return sn(bn(e, r, sr), e + "");
}
var mn = 9007199254740991;
function cr(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= mn;
}
function Ae(e) {
  return e != null && cr(e.length) && !Pe(e);
}
function vn(e, r, t) {
  if (!B(t))
    return !1;
  var n = typeof r;
  return (n == "number" ? Ae(t) && ur(r, t.length) : n == "string" && r in t) ? se(t[r], e) : !1;
}
function xn(e) {
  return gn(function(r, t) {
    var n = -1, o = t.length, l = o > 1 ? t[o - 1] : void 0, i = o > 2 ? t[2] : void 0;
    for (l = e.length > 3 && typeof l == "function" ? (o--, l) : void 0, i && vn(t[0], t[1], i) && (l = o < 3 ? void 0 : l, o = 1), r = Object(r); ++n < o; ) {
      var a = t[n];
      a && e(r, a, n, l);
    }
    return r;
  });
}
var yn = Object.prototype;
function dr(e) {
  var r = e && e.constructor, t = typeof r == "function" && r.prototype || yn;
  return e === t;
}
function Cn(e, r) {
  for (var t = -1, n = Array(e); ++t < e; )
    n[t] = r(t);
  return n;
}
var $n = "[object Arguments]";
function Ne(e) {
  return J(e) && le(e) == $n;
}
var fr = Object.prototype, _n = fr.hasOwnProperty, Sn = fr.propertyIsEnumerable, wn = Ne(function() {
  return arguments;
}()) ? Ne : function(e) {
  return J(e) && _n.call(e, "callee") && !Sn.call(e, "callee");
};
const Ce = wn;
function Pn() {
  return !1;
}
var pr = typeof exports == "object" && exports && !exports.nodeType && exports, Le = pr && typeof module == "object" && module && !module.nodeType && module, Tn = Le && Le.exports === pr, Ue = Tn ? D.Buffer : void 0, On = Ue ? Ue.isBuffer : void 0, An = On || Pn;
const hr = An;
var En = "[object Arguments]", jn = "[object Array]", Rn = "[object Boolean]", zn = "[object Date]", Mn = "[object Error]", Bn = "[object Function]", Hn = "[object Map]", Fn = "[object Number]", In = "[object Object]", Dn = "[object RegExp]", Nn = "[object Set]", Ln = "[object String]", Un = "[object WeakMap]", Gn = "[object ArrayBuffer]", Vn = "[object DataView]", qn = "[object Float32Array]", Wn = "[object Float64Array]", Kn = "[object Int8Array]", Jn = "[object Int16Array]", Xn = "[object Int32Array]", Zn = "[object Uint8Array]", Yn = "[object Uint8ClampedArray]", Qn = "[object Uint16Array]", kn = "[object Uint32Array]", m = {};
m[qn] = m[Wn] = m[Kn] = m[Jn] = m[Xn] = m[Zn] = m[Yn] = m[Qn] = m[kn] = !0;
m[En] = m[jn] = m[Gn] = m[Rn] = m[Vn] = m[zn] = m[Mn] = m[Bn] = m[Hn] = m[Fn] = m[In] = m[Dn] = m[Nn] = m[Ln] = m[Un] = !1;
function eo(e) {
  return J(e) && cr(e.length) && !!m[le(e)];
}
function ro(e) {
  return function(r) {
    return e(r);
  };
}
var br = typeof exports == "object" && exports && !exports.nodeType && exports, q = br && typeof module == "object" && module && !module.nodeType && module, to = q && q.exports === br, me = to && ar.process, no = function() {
  try {
    var e = q && q.require && q.require("util").types;
    return e || me && me.binding && me.binding("util");
  } catch {
  }
}();
const Ge = no;
var Ve = Ge && Ge.isTypedArray, oo = Ve ? ro(Ve) : eo;
const gr = oo;
var io = Object.prototype, ao = io.hasOwnProperty;
function lo(e, r) {
  var t = ye(e), n = !t && Ce(e), o = !t && !n && hr(e), l = !t && !n && !o && gr(e), i = t || n || o || l, a = i ? Cn(e.length, String) : [], u = a.length;
  for (var f in e)
    (r || ao.call(e, f)) && !(i && (f == "length" || o && (f == "offset" || f == "parent") || l && (f == "buffer" || f == "byteLength" || f == "byteOffset") || ur(f, u))) && a.push(f);
  return a;
}
function so(e, r) {
  return function(t) {
    return e(r(t));
  };
}
function uo(e) {
  var r = [];
  if (e != null)
    for (var t in Object(e))
      r.push(t);
  return r;
}
var co = Object.prototype, fo = co.hasOwnProperty;
function po(e) {
  if (!B(e))
    return uo(e);
  var r = dr(e), t = [];
  for (var n in e)
    n == "constructor" && (r || !fo.call(e, n)) || t.push(n);
  return t;
}
function mr(e) {
  return Ae(e) ? lo(e, !0) : po(e);
}
var ho = Te(Object, "create");
const W = ho;
function bo() {
  this.__data__ = W ? W(null) : {}, this.size = 0;
}
function go(e) {
  var r = this.has(e) && delete this.__data__[e];
  return this.size -= r ? 1 : 0, r;
}
var mo = "__lodash_hash_undefined__", vo = Object.prototype, xo = vo.hasOwnProperty;
function yo(e) {
  var r = this.__data__;
  if (W) {
    var t = r[e];
    return t === mo ? void 0 : t;
  }
  return xo.call(r, e) ? r[e] : void 0;
}
var Co = Object.prototype, $o = Co.hasOwnProperty;
function _o(e) {
  var r = this.__data__;
  return W ? r[e] !== void 0 : $o.call(r, e);
}
var So = "__lodash_hash_undefined__";
function wo(e, r) {
  var t = this.__data__;
  return this.size += this.has(e) ? 0 : 1, t[e] = W && r === void 0 ? So : r, this;
}
function M(e) {
  var r = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++r < t; ) {
    var n = e[r];
    this.set(n[0], n[1]);
  }
}
M.prototype.clear = bo;
M.prototype.delete = go;
M.prototype.get = yo;
M.prototype.has = _o;
M.prototype.set = wo;
function Po() {
  this.__data__ = [], this.size = 0;
}
function ue(e, r) {
  for (var t = e.length; t--; )
    if (se(e[t][0], r))
      return t;
  return -1;
}
var To = Array.prototype, Oo = To.splice;
function Ao(e) {
  var r = this.__data__, t = ue(r, e);
  if (t < 0)
    return !1;
  var n = r.length - 1;
  return t == n ? r.pop() : Oo.call(r, t, 1), --this.size, !0;
}
function Eo(e) {
  var r = this.__data__, t = ue(r, e);
  return t < 0 ? void 0 : r[t][1];
}
function jo(e) {
  return ue(this.__data__, e) > -1;
}
function Ro(e, r) {
  var t = this.__data__, n = ue(t, e);
  return n < 0 ? (++this.size, t.push([e, r])) : t[n][1] = r, this;
}
function T(e) {
  var r = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++r < t; ) {
    var n = e[r];
    this.set(n[0], n[1]);
  }
}
T.prototype.clear = Po;
T.prototype.delete = Ao;
T.prototype.get = Eo;
T.prototype.has = jo;
T.prototype.set = Ro;
var zo = Te(D, "Map");
const vr = zo;
function Mo() {
  this.size = 0, this.__data__ = {
    hash: new M(),
    map: new (vr || T)(),
    string: new M()
  };
}
function Bo(e) {
  var r = typeof e;
  return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? e !== "__proto__" : e === null;
}
function ce(e, r) {
  var t = e.__data__;
  return Bo(r) ? t[typeof r == "string" ? "string" : "hash"] : t.map;
}
function Ho(e) {
  var r = ce(this, e).delete(e);
  return this.size -= r ? 1 : 0, r;
}
function Fo(e) {
  return ce(this, e).get(e);
}
function Io(e) {
  return ce(this, e).has(e);
}
function Do(e, r) {
  var t = ce(this, e), n = t.size;
  return t.set(e, r), this.size += t.size == n ? 0 : 1, this;
}
function N(e) {
  var r = -1, t = e == null ? 0 : e.length;
  for (this.clear(); ++r < t; ) {
    var n = e[r];
    this.set(n[0], n[1]);
  }
}
N.prototype.clear = Mo;
N.prototype.delete = Ho;
N.prototype.get = Fo;
N.prototype.has = Io;
N.prototype.set = Do;
var No = so(Object.getPrototypeOf, Object);
const xr = No;
var Lo = "[object Object]", Uo = Function.prototype, Go = Object.prototype, yr = Uo.toString, Vo = Go.hasOwnProperty, qo = yr.call(Object);
function Wo(e) {
  if (!J(e) || le(e) != Lo)
    return !1;
  var r = xr(e);
  if (r === null)
    return !0;
  var t = Vo.call(r, "constructor") && r.constructor;
  return typeof t == "function" && t instanceof t && yr.call(t) == qo;
}
function Ko() {
  this.__data__ = new T(), this.size = 0;
}
function Jo(e) {
  var r = this.__data__, t = r.delete(e);
  return this.size = r.size, t;
}
function Xo(e) {
  return this.__data__.get(e);
}
function Zo(e) {
  return this.__data__.has(e);
}
var Yo = 200;
function Qo(e, r) {
  var t = this.__data__;
  if (t instanceof T) {
    var n = t.__data__;
    if (!vr || n.length < Yo - 1)
      return n.push([e, r]), this.size = ++t.size, this;
    t = this.__data__ = new N(n);
  }
  return t.set(e, r), this.size = t.size, this;
}
function L(e) {
  var r = this.__data__ = new T(e);
  this.size = r.size;
}
L.prototype.clear = Ko;
L.prototype.delete = Jo;
L.prototype.get = Xo;
L.prototype.has = Zo;
L.prototype.set = Qo;
var Cr = typeof exports == "object" && exports && !exports.nodeType && exports, qe = Cr && typeof module == "object" && module && !module.nodeType && module, ko = qe && qe.exports === Cr, We = ko ? D.Buffer : void 0, Ke = We ? We.allocUnsafe : void 0;
function ei(e, r) {
  if (r)
    return e.slice();
  var t = e.length, n = Ke ? Ke(t) : new e.constructor(t);
  return e.copy(n), n;
}
var ri = D.Uint8Array;
const Je = ri;
function ti(e) {
  var r = new e.constructor(e.byteLength);
  return new Je(r).set(new Je(e)), r;
}
function ni(e, r) {
  var t = r ? ti(e.buffer) : e.buffer;
  return new e.constructor(t, e.byteOffset, e.length);
}
function oi(e) {
  return typeof e.constructor == "function" && !dr(e) ? Xt(xr(e)) : {};
}
function ii(e) {
  return function(r, t, n) {
    for (var o = -1, l = Object(r), i = n(r), a = i.length; a--; ) {
      var u = i[e ? a : ++o];
      if (t(l[u], u, l) === !1)
        break;
    }
    return r;
  };
}
var ai = ii();
const li = ai;
function $e(e, r, t) {
  (t !== void 0 && !se(e[r], t) || t === void 0 && !(r in e)) && Oe(e, r, t);
}
function si(e) {
  return J(e) && Ae(e);
}
function _e(e, r) {
  if (!(r === "constructor" && typeof e[r] == "function") && r != "__proto__")
    return e[r];
}
function ui(e) {
  return hn(e, mr(e));
}
function ci(e, r, t, n, o, l, i) {
  var a = _e(e, t), u = _e(r, t), f = i.get(u);
  if (f) {
    $e(e, t, f);
    return;
  }
  var d = l ? l(a, u, t + "", e, r, i) : void 0, p = d === void 0;
  if (p) {
    var y = ye(u), S = !y && hr(u), s = !y && !S && gr(u);
    d = u, y || S || s ? ye(a) ? d = a : si(a) ? d = Yt(a) : S ? (p = !1, d = ei(u, !0)) : s ? (p = !1, d = ni(u, !0)) : d = [] : Wo(u) || Ce(u) ? (d = a, Ce(a) ? d = ui(a) : (!B(a) || Pe(a)) && (d = oi(u))) : p = !1;
  }
  p && (i.set(u, d), o(d, u, n, l, i), i.delete(u)), $e(e, t, d);
}
function $r(e, r, t, n, o) {
  e !== r && li(r, function(l, i) {
    if (o || (o = new L()), B(l))
      ci(e, r, i, t, $r, n, o);
    else {
      var a = n ? n(_e(e, i), l, i + "", e, r, o) : void 0;
      a === void 0 && (a = l), $e(e, i, a);
    }
  }, mr);
}
var di = xn(function(e, r, t) {
  $r(e, r, t);
});
const re = di, _r = {
  fontFamily: 'v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontFamilyMono: "v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace",
  fontWeight: "400",
  fontWeightStrong: "500",
  cubicBezierEaseInOut: "cubic-bezier(.4, 0, .2, 1)",
  cubicBezierEaseOut: "cubic-bezier(0, 0, .2, 1)",
  cubicBezierEaseIn: "cubic-bezier(.4, 0, 1, 1)",
  borderRadius: "3px",
  borderRadiusSmall: "2px",
  fontSize: "14px",
  fontSizeMini: "12px",
  fontSizeTiny: "12px",
  fontSizeSmall: "14px",
  fontSizeMedium: "14px",
  fontSizeLarge: "15px",
  fontSizeHuge: "16px",
  lineHeight: "1.6",
  heightMini: "16px",
  heightTiny: "22px",
  heightSmall: "28px",
  heightMedium: "34px",
  heightLarge: "40px",
  heightHuge: "46px"
}, {
  fontSize: fi,
  fontFamily: pi,
  lineHeight: hi
} = _r, bi = g("body", `
 margin: 0;
 font-size: ${fi};
 font-family: ${pi};
 line-height: ${hi};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [g("input", `
 font-family: inherit;
 font-size: inherit;
 `)]), Ee = "n-config-provider", Se = "naive-ui-style";
function je(e, r, t, n, o, l) {
  const i = we(), a = K(Ee, null);
  if (t) {
    const f = () => {
      const d = l == null ? void 0 : l.value;
      t.mount({
        id: d === void 0 ? r : d + r,
        head: !0,
        props: {
          bPrefix: d ? `.${d}-` : void 0
        },
        anchorMetaName: Se,
        ssr: i
      }), a != null && a.preflightStyleDisabled || bi.mount({
        id: "n-global",
        head: !0,
        anchorMetaName: Se,
        ssr: i
      });
    };
    i ? f() : Ze(f);
  }
  return z(() => {
    var f;
    const { theme: { common: d, self: p, peers: y = {} } = {}, themeOverrides: S = {}, builtinThemeOverrides: s = {} } = o, { common: v, peers: b } = S, { common: h = void 0, [e]: { common: C = void 0, self: A = void 0, peers: O = {} } = {} } = (a == null ? void 0 : a.mergedThemeRef.value) || {}, { common: U = void 0, [e]: X = {} } = (a == null ? void 0 : a.mergedThemeOverridesRef.value) || {}, { common: de, peers: fe = {} } = X, Z = re({}, d || C || h || n.common, U, de, v), pe = re(
      (f = p || A || n.self) === null || f === void 0 ? void 0 : f(Z),
      s,
      X,
      S
    );
    return {
      common: Z,
      self: pe,
      peers: re({}, n.peers, O, y),
      peerOverrides: re({}, s.peers, fe, b)
    };
  });
}
je.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object
};
const gi = "n";
function mi(e = {}, r = {
  defaultBordered: !0
}) {
  const t = K(Ee, null);
  return {
    inlineThemeDisabled: t == null ? void 0 : t.inlineThemeDisabled,
    mergedRtlRef: t == null ? void 0 : t.mergedRtlRef,
    mergedComponentPropsRef: t == null ? void 0 : t.mergedComponentPropsRef,
    mergedBreakpointsRef: t == null ? void 0 : t.mergedBreakpointsRef,
    mergedBorderedRef: z(() => {
      var n, o;
      const { bordered: l } = e;
      return l !== void 0 ? l : (o = (n = t == null ? void 0 : t.mergedBorderedRef.value) !== null && n !== void 0 ? n : r.defaultBordered) !== null && o !== void 0 ? o : !0;
    }),
    mergedClsPrefixRef: z(() => (t == null ? void 0 : t.mergedClsPrefixRef.value) || gi),
    namespaceRef: z(() => t == null ? void 0 : t.mergedNamespaceRef.value)
  };
}
function vi(e, r, t, n) {
  var o;
  t || Gr("useThemeClass", "cssVarsRef is not passed");
  const l = (o = K(Ee, null)) === null || o === void 0 ? void 0 : o.mergedThemeHashRef, i = Or(""), a = we();
  let u;
  const f = `__${e}`, d = () => {
    let p = f;
    const y = r ? r.value : void 0, S = l == null ? void 0 : l.value;
    S && (p += "-" + S), y && (p += "-" + y);
    const { themeOverrides: s, builtinThemeOverrides: v } = n;
    s && (p += "-" + xe(JSON.stringify(s))), v && (p += "-" + xe(JSON.stringify(v))), i.value = p, u = () => {
      const b = t.value;
      let h = "";
      for (const C in b)
        h += `${C}: ${b[C]};`;
      g(`.${p}`, h).mount({
        id: p,
        ssr: a
      }), u = void 0;
    };
  };
  return Ye(() => {
    d();
  }), {
    themeClass: i,
    onRender: () => {
      u == null || u();
    }
  };
}
function xi(e, r, t) {
  if (!r)
    return;
  const n = we(), o = z(() => {
    const { value: i } = r;
    if (!i)
      return;
    const a = i[e];
    if (!!a)
      return a;
  }), l = () => {
    Ye(() => {
      const { value: i } = t, a = `${i}${e}Rtl`;
      if (at(a, n))
        return;
      const { value: u } = o;
      !u || u.style.mount({
        id: a,
        head: !0,
        anchorMetaName: Se,
        props: {
          bPrefix: i ? `.${i}-` : void 0
        },
        ssr: n
      });
    });
  };
  return n ? l() : Ze(l), o;
}
const c = {
  neutralBase: "#FFF",
  neutralInvertBase: "#000",
  neutralTextBase: "#000",
  neutralPopover: "#fff",
  neutralCard: "#fff",
  neutralModal: "#fff",
  neutralBody: "#fff",
  alpha1: "0.82",
  alpha2: "0.72",
  alpha3: "0.38",
  alpha4: "0.24",
  alpha5: "0.18",
  alphaClose: "0.6",
  alphaDisabled: "0.5",
  alphaDisabledInput: "0.02",
  alphaPending: "0.05",
  alphaTablePending: "0.02",
  alphaPressed: "0.07",
  alphaAvatar: "0.2",
  alphaRail: "0.14",
  alphaProgressRail: ".08",
  alphaBorder: "0.12",
  alphaDivider: "0.06",
  alphaInput: "0",
  alphaAction: "0.02",
  alphaTab: "0.04",
  alphaScrollbar: "0.25",
  alphaScrollbarHover: "0.4",
  alphaCode: "0.05",
  alphaTag: "0.02",
  primaryHover: "#36ad6a",
  primaryDefault: "#18a058",
  primaryActive: "#0c7a43",
  primarySuppl: "#36ad6a",
  infoHover: "#4098fc",
  infoDefault: "#2080f0",
  infoActive: "#1060c9",
  infoSuppl: "#4098fc",
  errorHover: "#de576d",
  errorDefault: "#d03050",
  errorActive: "#ab1f3f",
  errorSuppl: "#de576d",
  warningHover: "#fcb040",
  warningDefault: "#f0a020",
  warningActive: "#c97c10",
  warningSuppl: "#fcb040",
  successHover: "#36ad6a",
  successDefault: "#18a058",
  successActive: "#0c7a43",
  successSuppl: "#36ad6a"
}, yi = H(c.neutralBase), Sr = H(c.neutralInvertBase), Ci = "rgba(" + Sr.slice(0, 3).join(", ") + ", ";
function Xe(e) {
  return Ci + String(e) + ")";
}
function $(e) {
  const r = Array.from(Sr);
  return r[3] = Number(e), P(yi, r);
}
const $i = Object.assign(Object.assign({ name: "common" }, _r), {
  baseColor: c.neutralBase,
  primaryColor: c.primaryDefault,
  primaryColorHover: c.primaryHover,
  primaryColorPressed: c.primaryActive,
  primaryColorSuppl: c.primarySuppl,
  infoColor: c.infoDefault,
  infoColorHover: c.infoHover,
  infoColorPressed: c.infoActive,
  infoColorSuppl: c.infoSuppl,
  successColor: c.successDefault,
  successColorHover: c.successHover,
  successColorPressed: c.successActive,
  successColorSuppl: c.successSuppl,
  warningColor: c.warningDefault,
  warningColorHover: c.warningHover,
  warningColorPressed: c.warningActive,
  warningColorSuppl: c.warningSuppl,
  errorColor: c.errorDefault,
  errorColorHover: c.errorHover,
  errorColorPressed: c.errorActive,
  errorColorSuppl: c.errorSuppl,
  textColorBase: c.neutralTextBase,
  textColor1: "rgb(31, 34, 37)",
  textColor2: "rgb(51, 54, 57)",
  textColor3: "rgb(118, 124, 130)",
  textColorDisabled: $(c.alpha4),
  placeholderColor: $(c.alpha4),
  placeholderColorDisabled: $(c.alpha5),
  iconColor: $(c.alpha4),
  iconColorHover: Y($(c.alpha4), { lightness: 0.75 }),
  iconColorPressed: Y($(c.alpha4), { lightness: 0.9 }),
  iconColorDisabled: $(c.alpha5),
  opacity1: c.alpha1,
  opacity2: c.alpha2,
  opacity3: c.alpha3,
  opacity4: c.alpha4,
  opacity5: c.alpha5,
  dividerColor: "rgb(239, 239, 245)",
  borderColor: "rgb(224, 224, 230)",
  closeIconColor: $(Number(c.alphaClose)),
  closeIconColorHover: $(Number(c.alphaClose)),
  closeIconColorPressed: $(Number(c.alphaClose)),
  closeColorHover: "rgba(0, 0, 0, .09)",
  closeColorPressed: "rgba(0, 0, 0, .13)",
  clearColor: $(c.alpha4),
  clearColorHover: Y($(c.alpha4), { lightness: 0.75 }),
  clearColorPressed: Y($(c.alpha4), { lightness: 0.9 }),
  scrollbarColor: Xe(c.alphaScrollbar),
  scrollbarColorHover: Xe(c.alphaScrollbarHover),
  scrollbarWidth: "5px",
  scrollbarHeight: "5px",
  scrollbarBorderRadius: "5px",
  progressRailColor: $(c.alphaProgressRail),
  railColor: "rgb(219, 219, 223)",
  popoverColor: c.neutralPopover,
  tableColor: c.neutralCard,
  cardColor: c.neutralCard,
  modalColor: c.neutralModal,
  bodyColor: c.neutralBody,
  tagColor: "#eee",
  avatarColor: $(c.alphaAvatar),
  invertedColor: "rgb(0, 20, 40)",
  inputColor: $(c.alphaInput),
  codeColor: "rgb(244, 244, 248)",
  tabColor: "rgb(247, 247, 250)",
  actionColor: "rgb(250, 250, 252)",
  tableHeaderColor: "rgb(250, 250, 252)",
  hoverColor: "rgb(243, 243, 245)",
  tableColorHover: "rgba(0, 0, 100, 0.03)",
  tableColorStriped: "rgba(0, 0, 100, 0.02)",
  pressedColor: "rgb(237, 237, 239)",
  opacityDisabled: c.alphaDisabled,
  inputColorDisabled: "rgb(250, 250, 252)",
  buttonColor2: "rgba(46, 51, 56, .05)",
  buttonColor2Hover: "rgba(46, 51, 56, .09)",
  buttonColor2Pressed: "rgba(46, 51, 56, .13)",
  boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
  boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
  boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
}), _i = $i, Si = {
  thPaddingSmall: "6px",
  thPaddingMedium: "12px",
  thPaddingLarge: "12px",
  tdPaddingSmall: "6px",
  tdPaddingMedium: "12px",
  tdPaddingLarge: "12px"
}, wi = (e) => {
  const { dividerColor: r, cardColor: t, modalColor: n, popoverColor: o, tableHeaderColor: l, tableColorStriped: i, textColor1: a, textColor2: u, borderRadius: f, fontWeightStrong: d, lineHeight: p, fontSizeSmall: y, fontSizeMedium: S, fontSizeLarge: s } = e;
  return Object.assign(Object.assign({}, Si), {
    fontSizeSmall: y,
    fontSizeMedium: S,
    fontSizeLarge: s,
    lineHeight: p,
    borderRadius: f,
    borderColor: P(t, r),
    borderColorModal: P(n, r),
    borderColorPopover: P(o, r),
    tdColor: t,
    tdColorModal: n,
    tdColorPopover: o,
    tdColorStriped: P(t, i),
    tdColorStripedModal: P(n, i),
    tdColorStripedPopover: P(o, i),
    thColor: P(t, l),
    thColorModal: P(n, l),
    thColorPopover: P(o, l),
    thTextColor: a,
    tdTextColor: u,
    thFontWeight: d
  });
}, Pi = {
  name: "Table",
  common: _i,
  self: wi
}, Ti = Pi, Oi = g([be("table", `
 font-size: var(--n-font-size);
 font-variant-numeric: tabular-nums;
 line-height: var(--n-line-height);
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 text-align: left;
 border-collapse: separate;
 border-spacing: 0;
 overflow: hidden;
 background-color: var(--n-td-color);
 border-color: var(--n-merged-border-color);
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 --n-merged-border-color: var(--n-border-color);
 `, [g("th", `
 white-space: nowrap;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 text-align: inherit;
 padding: var(--n-th-padding);
 vertical-align: inherit;
 text-transform: none;
 border: 0px solid var(--n-merged-border-color);
 font-weight: var(--n-th-font-weight);
 color: var(--n-th-text-color);
 background-color: var(--n-th-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 border-right: 1px solid var(--n-merged-border-color);
 `, [g("&:last-child", `
 border-right: 0px solid var(--n-merged-border-color);
 `)]), g("td", `
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 padding: var(--n-td-padding);
 color: var(--n-td-text-color);
 background-color: var(--n-td-color);
 border: 0px solid var(--n-merged-border-color);
 border-right: 1px solid var(--n-merged-border-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 `, [g("&:last-child", `
 border-right: 0px solid var(--n-merged-border-color);
 `)]), ee("bordered", `
 border: 1px solid var(--n-merged-border-color);
 border-radius: var(--n-border-radius);
 `, [g("tr", [g("&:last-child", [g("td", `
 border-bottom: 0 solid var(--n-merged-border-color);
 `)])])]), ee("single-line", [g("th", `
 border-right: 0px solid var(--n-merged-border-color);
 `), g("td", `
 border-right: 0px solid var(--n-merged-border-color);
 `)]), ee("single-column", [g("tr", [g("&:not(:last-child)", [g("td", `
 border-bottom: 0px solid var(--n-merged-border-color);
 `)])])]), ee("striped", [g("tr:nth-of-type(even)", [g("td", "background-color: var(--n-td-color-striped)")])]), dt("bottom-bordered", [g("tr", [g("&:last-child", [g("td", `
 border-bottom: 0px solid var(--n-merged-border-color);
 `)])])])]), ft(be("table", `
 background-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `, [g("th", `
 background-color: var(--n-th-color-modal);
 `), g("td", `
 background-color: var(--n-td-color-modal);
 `)])), pt(be("table", `
 background-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `, [g("th", `
 background-color: var(--n-th-color-popover);
 `), g("td", `
 background-color: var(--n-td-color-popover);
 `)]))]), Ai = Object.assign(Object.assign({}, je.props), { bordered: {
  type: Boolean,
  default: !0
}, bottomBordered: {
  type: Boolean,
  default: !0
}, singleLine: {
  type: Boolean,
  default: !0
}, striped: Boolean, singleColumn: Boolean, size: {
  type: String,
  default: "medium"
} }), Ei = Qe({
  name: "Table",
  props: Ai,
  setup(e) {
    const { mergedClsPrefixRef: r, inlineThemeDisabled: t, mergedRtlRef: n } = mi(e), o = je("Table", "-table", Oi, Ti, e, r), l = xi("Table", n, r), i = z(() => {
      const { size: u } = e, { self: { borderColor: f, tdColor: d, tdColorModal: p, tdColorPopover: y, thColor: S, thColorModal: s, thColorPopover: v, thTextColor: b, tdTextColor: h, borderRadius: C, thFontWeight: A, lineHeight: O, borderColorModal: U, borderColorPopover: X, tdColorStriped: de, tdColorStripedModal: fe, tdColorStripedPopover: Z, [te("fontSize", u)]: pe, [te("tdPadding", u)]: wr, [te("thPadding", u)]: Pr }, common: { cubicBezierEaseInOut: Tr } } = o.value;
      return {
        "--n-bezier": Tr,
        "--n-td-color": d,
        "--n-td-color-modal": p,
        "--n-td-color-popover": y,
        "--n-td-text-color": h,
        "--n-border-color": f,
        "--n-border-color-modal": U,
        "--n-border-color-popover": X,
        "--n-border-radius": C,
        "--n-font-size": pe,
        "--n-th-color": S,
        "--n-th-color-modal": s,
        "--n-th-color-popover": v,
        "--n-th-font-weight": A,
        "--n-th-text-color": b,
        "--n-line-height": O,
        "--n-td-padding": wr,
        "--n-th-padding": Pr,
        "--n-td-color-striped": de,
        "--n-td-color-striped-modal": fe,
        "--n-td-color-striped-popover": Z
      };
    }), a = t ? vi("table", z(() => e.size[0]), i, e) : void 0;
    return {
      rtlEnabled: l,
      mergedClsPrefix: r,
      cssVars: t ? void 0 : i,
      themeClass: a == null ? void 0 : a.themeClass,
      onRender: a == null ? void 0 : a.onRender
    };
  },
  render() {
    var e;
    const { mergedClsPrefix: r } = this;
    return (e = this.onRender) === null || e === void 0 || e.call(this), Ar("table", { class: [
      `${r}-table`,
      this.themeClass,
      {
        [`${r}-table--rtl`]: this.rtlEnabled,
        [`${r}-table--bottom-bordered`]: this.bottomBordered,
        [`${r}-table--bordered`]: this.bordered,
        [`${r}-table--single-line`]: this.singleLine,
        [`${r}-table--single-column`]: this.singleColumn,
        [`${r}-table--striped`]: this.striped
      }
    ], style: this.cssVars }, this.$slots);
  }
}), ji = /* @__PURE__ */ x("thead", null, [
  /* @__PURE__ */ x("tr", null, [
    /* @__PURE__ */ x("th", null, "Abandon"),
    /* @__PURE__ */ x("th", null, "Abormal"),
    /* @__PURE__ */ x("th", null, "Abolish"),
    /* @__PURE__ */ x("th", null, "..."),
    /* @__PURE__ */ x("th", null, "\u4E07\u4E8B\u5F00\u5934\u96BE")
  ])
], -1), Ri = /* @__PURE__ */ x("tbody", null, [
  /* @__PURE__ */ x("tr", null, [
    /* @__PURE__ */ x("td", null, "\u653E\u5F03"),
    /* @__PURE__ */ x("td", null, "\u53CD\u5E38\u7684"),
    /* @__PURE__ */ x("td", null, "\u5F7B\u5E95\u5E9F\u9664"),
    /* @__PURE__ */ x("td", null, "..."),
    /* @__PURE__ */ x("td", null, "\u5E72\uFF01\u6211\u521A\u624D\u80CC\u7684\u662F\u5565")
  ]),
  /* @__PURE__ */ x("tr", null, [
    /* @__PURE__ */ x("td", null, "..."),
    /* @__PURE__ */ x("td", null, "..."),
    /* @__PURE__ */ x("td", null, "..."),
    /* @__PURE__ */ x("td", null, "..."),
    /* @__PURE__ */ x("td", null, "...")
  ])
], -1), zi = /* @__PURE__ */ Qe({
  __name: "watable",
  setup(e) {
    return console.log("dddd"), (r, t) => (Er(), jr(Rr(Ei), {
      bordered: !1,
      "single-line": !1
    }, {
      default: zr(() => [
        ji,
        Ri
      ]),
      _: 1
    }));
  }
}), Mi = {
  install(e) {
    e.component("wa-table", zi);
  }
}, Bi = [Mi], Hi = (e) => {
  Bi.forEach((r) => {
    e.use(r);
  });
}, Ni = {
  install: Hi
};
export {
  Mi as WaTable,
  Ni as default
};
