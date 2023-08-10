function t(t) {
    return Object.keys(t).reduce(((e, r) => {
        var n = t[r];
        return e[r] = Object.assign({}, n), !s(n.value) || function(t) {
            return "[object Function]" === Object.prototype.toString.call(t)
        }(n.value) || Array.isArray(n.value) || (e[r].value = Object.assign({}, n.value)), Array.isArray(n.value) && (e[r].value = n.value.slice(0)), e
    }), {})
}

function e(t) {
    if (t) try {
        return JSON.parse(t)
    } catch (e) {
        return t
    }
}

function r(t, e, r) {
    if (null == r || !1 === r) return t.removeAttribute(e);
    let s = JSON.stringify(r);
    t.__updating[e] = !0, "true" === s && (s = ""), t.setAttribute(e, s), Promise.resolve().then((() => delete t.__updating[e]))
}

function s(t) {
    return null != t && ("object" == typeof t || "function" == typeof t)
}
let n;

function o(s, o) {
    const i = Object.keys(o);
    return class extends s {
        static get observedAttributes() {
            return i.map((t => o[t].attribute))
        }
        constructor() {
            super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {}
        }
        connectedCallback() {
            if (!this.__initialized) {
                this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = function(s, n) {
                    const o = t(n);
                    return Object.keys(n).forEach((t => {
                        const n = o[t],
                            i = s.getAttribute(n.attribute),
                            a = s[t];
                        i && (n.value = n.parse ? e(i) : i), null != a && (n.value = Array.isArray(a) ? a.slice(0) : a), n.reflect && r(s, n.attribute, n.value), Object.defineProperty(s, t, {
                            get: () => n.value,
                            set(e) {
                                var s = n.value;
                                n.value = e, n.reflect && r(this, n.attribute, n.value);
                                for (let r = 0, n = this.__propertyChangedCallbacks.length; r < n; r++) this.__propertyChangedCallbacks[r](t, e, s)
                            },
                            enumerable: !0,
                            configurable: !0
                        })
                    })), o
                }(this, o);
                var s = function(t) {
                        return Object.keys(t).reduce(((e, r) => (e[r] = t[r].value, e)), {})
                    }(this.props),
                    i = this.Component,
                    a = n;
                try {
                    (n = this).__initialized = !0,
                        function(t) {
                            return "function" == typeof t && 0 === t.toString().indexOf("class")
                        }(i) ? new i(s, {
                            element: this
                        }) : i(s, {
                            element: this
                        })
                } finally {
                    n = a
                }
            }
        }
        async disconnectedCallback() {
            if (await Promise.resolve(), !this.isConnected) {
                this.__propertyChangedCallbacks.length = 0;
                for (var t = null; t = this.__releaseCallbacks.pop();) t(this);
                delete this.__initialized, this.__released = !0
            }
        }
        attributeChangedCallback(t, r, s) {
            !this.__initialized || this.__updating[t] || (t = this.lookupProp(t)) in o && (null == s && !this[t] || (this[t] = o[t].parse ? e(s) : s))
        }
        lookupProp(t) {
            if (o) return i.find((e => t === e || t === o[e].attribute))
        }
        get renderRoot() {
            return this.shadowRoot || this.attachShadow({
                mode: "open"
            })
        }
        addReleaseCallback(t) {
            this.__releaseCallbacks.push(t)
        }
        addPropertyChangedCallback(t) {
            this.__propertyChangedCallbacks.push(t)
        }
    }
}

function i(t, e = {}, r = {}) {
    const {
        BaseElement: n = HTMLElement,
        extension: i
    } = r;
    return r => {
        if (!t) throw new Error("tag is required to register a Component");
        let a = customElements.get(t);
        return a ? a.prototype.Component = r : ((a = o(n, function(t) {
            return t ? Object.keys(t).reduce(((e, r) => {
                var n = t[r];
                return e[r] = s(n) && "value" in n ? n : {
                    value: n
                }, e[r].attribute || (e[r].attribute = function(t) {
                    return t.replace(/\.?([A-Z]+)/g, ((t, e) => "-" + e.toLowerCase())).replace("_", "-").replace(/^-/, "")
                }(r)), e[r].parse = "parse" in e[r] ? e[r].parse : "string" != typeof e[r].value, e
            }), {}) : {}
        }(e))).prototype.Component = r, a.prototype.registeredTag = t, customElements.define(t, a, i)), a
    }
}
const a = Symbol("solid-proxy"),
    l = Symbol("solid-track"),
    c = {
        equals: (t, e) => t === e
    };
let h = L;
const u = 1,
    p = 2,
    d = {
        owned: null,
        cleanups: null,
        context: null,
        owner: null
    };
var f = null;
let g = null,
    b = null,
    y = null,
    m = null,
    v = 0;

function w(t, e) {
    const r = b,
        s = f,
        n = 0 === t.length,
        o = n ? d : {
            owned: null,
            cleanups: null,
            context: null,
            owner: void 0 === e ? s : e
        },
        i = n ? t : () => t((() => S((() => M(o)))));
    f = o, b = null;
    try {
        return B(i, !0)
    } finally {
        b = r, f = s
    }
}

function x(t, e) {
    const r = {
        value: t,
        observers: null,
        observerSlots: null,
        comparator: (e = e ? Object.assign({}, c, e) : c).equals || void 0
    };
    return [E.bind(r), t => ("function" == typeof t && (t = t(r.value)), P(r, t))]
}

function k(t, e, r) {
    $(R(t, e, !1, u))
}

function _(t, e, r) {
    h = j, (t = R(t, e, !1, u)).user = !0, m ? m.push(t) : $(t)
}

function C(t, e, r) {
    return r = r ? Object.assign({}, c, r) : c, (t = R(t, e, !0, 0)).observers = null, t.observerSlots = null, t.comparator = r.equals || void 0, $(t), E.bind(t)
}

function S(t) {
    if (null === b) return t();
    var e = b;
    b = null;
    try {
        return t()
    } finally {
        b = e
    }
}

function A(t) {
    _((() => S(t)))
}

function O(t) {
    return null !== f && (null === f.cleanups ? f.cleanups = [t] : f.cleanups.push(t)), t
}

function E() {
    var t;
    return this.sources && this.state && (this.state === u ? $(this) : (t = y, y = null, B((() => N(this)), !1), y = t)), b && (t = this.observers ? this.observers.length : 0, b.sources ? (b.sources.push(this), b.sourceSlots.push(t)) : (b.sources = [this], b.sourceSlots = [t]), this.observers ? (this.observers.push(b), this.observerSlots.push(b.sources.length - 1)) : (this.observers = [b], this.observerSlots = [b.sources.length - 1])), this.value
}

function P(t, e, r) {
    var s = t.value;
    return t.comparator && t.comparator(s, e) || (t.value = e, t.observers && t.observers.length && B((() => {
        for (let s = 0; s < t.observers.length; s += 1) {
            var e = t.observers[s],
                r = g && g.running;
            r && g.disposed.has(e), (r ? e.tState : e.state) || ((e.pure ? y : m).push(e), e.observers && z(e)), r || (e.state = u)
        }
        if (1e6 < y.length) throw y = [], new Error
    }), !1)), e
}

function $(t) {
    var e, r, s;
    t.fn && (M(t), e = f, r = b, s = v, function(t, e, r) {
        let s;
        try {
            s = t.fn(e)
        } catch (e) {
            return t.pure && (t.state = u, t.owned && t.owned.forEach(M), t.owned = null), t.updatedAt = r + 1, I(e)
        }(!t.updatedAt || t.updatedAt <= r) && (null != t.updatedAt && "observers" in t ? P(t, s) : t.value = s, t.updatedAt = r)
    }(b = f = t, t.value, s), b = r, f = e)
}

function R(t, e, r, s = u, n) {
    return t = {
        fn: t,
        state: s,
        updatedAt: null,
        owned: null,
        sources: null,
        sourceSlots: null,
        cleanups: null,
        value: e,
        owner: f,
        context: null,
        pure: r
    }, null !== f && f !== d && (f.owned ? f.owned.push(t) : f.owned = [t]), t
}

function T(t) {
    if (0 !== t.state) {
        if (t.state === p) return N(t);
        if (t.suspense && S(t.suspense.inFallback)) return t.suspense.effects.push(t);
        const r = [t];
        for (;
            (t = t.owner) && (!t.updatedAt || t.updatedAt < v);) t.state && r.push(t);
        for (let s = r.length - 1; 0 <= s; s--) {
            var e;
            (t = r[s]).state === u ? $(t) : t.state === p && (e = y, y = null, B((() => N(t, r[0])), !1), y = e)
        }
    }
}

function B(t, e) {
    if (y) return t();
    let r = !1;
    e || (y = []), m ? r = !0 : m = [], v++;
    try {
        var s = t();
        return function(t) {
            if (y && (L(y), y = null), !t) {
                const t = m;
                m = null, t.length && B((() => h(t)), !1)
            }
        }(r), s
    } catch (t) {
        r || (m = null), y = null, I(t)
    }
}

function L(t) {
    for (let e = 0; e < t.length; e++) T(t[e])
}

function j(t) {
    let e, r = 0;
    for (e = 0; e < t.length; e++) {
        var s = t[e];
        s.user ? t[r++] = s : T(s)
    }
    for (e = 0; e < r; e++) T(t[e])
}

function N(t, e) {
    for (let n = t.state = 0; n < t.sources.length; n += 1) {
        var r, s = t.sources[n];
        s.sources && ((r = s.state) === u ? s !== e && (!s.updatedAt || s.updatedAt < v) && T(s) : r === p && N(s, e))
    }
}

function z(t) {
    for (let r = 0; r < t.observers.length; r += 1) {
        var e = t.observers[r];
        e.state || (e.state = p, (e.pure ? y : m).push(e), e.observers && z(e))
    }
}

function M(t) {
    let e;
    if (t.sources)
        for (; t.sources.length;) {
            var r, s, n = t.sources.pop(),
                o = t.sourceSlots.pop(),
                i = n.observers;
            i && i.length && (r = i.pop(), s = n.observerSlots.pop(), o < i.length) && (i[r.sourceSlots[s] = o] = r, n.observerSlots[o] = s)
        }
    if (t.owned) {
        for (e = t.owned.length - 1; 0 <= e; e--) M(t.owned[e]);
        t.owned = null
    }
    if (t.cleanups) {
        for (e = t.cleanups.length - 1; 0 <= e; e--) t.cleanups[e]();
        t.cleanups = null
    }
    t.state = 0, t.context = null
}

function I(t) {
    throw t
}
const q = Symbol("fallback");

function D(t) {
    for (let e = 0; e < t.length; e++) t[e]()
}

function F(t, e) {
    return S((() => t(e || {})))
}

function G() {
    return !0
}
const H = {
    get: (t, e, r) => e === a ? r : t.get(e),
    has: (t, e) => e === a || t.has(e),
    set: G,
    deleteProperty: G,
    getOwnPropertyDescriptor: (t, e) => ({
        configurable: !0,
        enumerable: !0,
        get: () => t.get(e),
        set: G,
        deleteProperty: G
    }),
    ownKeys: t => t.keys()
};

function W(t) {
    return (t = "function" == typeof t ? t() : t) || {}
}

function U(...t) {
    let e = !1;
    for (let s = 0; s < t.length; s++) {
        var r = t[s];
        e = e || !!r && a in r, t[s] = "function" == typeof r ? (e = !0, C(r)) : r
    }
    if (e) return new Proxy({
        get(e) {
            for (let s = t.length - 1; 0 <= s; s--) {
                var r = W(t[s])[e];
                if (void 0 !== r) return r
            }
        },
        has(e) {
            for (let r = t.length - 1; 0 <= r; r--)
                if (e in W(t[r])) return !0;
            return !1
        },
        keys() {
            var e = [];
            for (let r = 0; r < t.length; r++) e.push(...Object.keys(W(t[r])));
            return [...new Set(e)]
        }
    }, H);
    var s = {};
    for (let e = t.length - 1; 0 <= e; e--)
        if (t[e])
            for (const r in Object.getOwnPropertyDescriptors(t[e])) r in s || Object.defineProperty(s, r, {
                enumerable: !0,
                get() {
                    for (let s = t.length - 1; 0 <= s; s--) {
                        var e = (t[s] || {})[r];
                        if (void 0 !== e) return e
                    }
                }
            });
    return s
}

function V(t, ...e) {
    const r = new Set(e.flat());
    var s;
    if (a in t) return (s = e.map((e => new Proxy({
        get: r => e.includes(r) ? t[r] : void 0,
        has: r => e.includes(r) && r in t,
        keys: () => e.filter((e => e in t))
    }, H)))).push(new Proxy({
        get: e => r.has(e) ? void 0 : t[e],
        has: e => !r.has(e) && e in t,
        keys: () => Object.keys(t).filter((t => !r.has(t)))
    }, H)), s;
    const n = Object.getOwnPropertyDescriptors(t);
    return e.push(Object.keys(n).filter((t => !r.has(t)))), e.map((e => {
        var r = {};
        for (let s = 0; s < e.length; s++) {
            const o = e[s];
            o in t && Object.defineProperty(r, o, n[o] || {
                get: () => t[o],
                set: () => !0,
                enumerable: !0
            })
        }
        return r
    }))
}

function Y(t) {
    var e = "fallback" in t && {
        fallback: () => t.fallback
    };
    return C(function(t, e, r = {}) {
        let s = [],
            n = [],
            o = [],
            i = 0,
            a = 1 < e.length ? [] : null;
        return O((() => D(o))), () => {
            let c, h, u = t() || [];
            return u[l], S((() => {
                let t, e, l, d, f, g, b, y, m, v = u.length;
                if (0 === v) 0 !== i && (D(o), o = [], s = [], n = [], i = 0, a = a && []), r.fallback && (s = [q], n[0] = w((t => (o[0] = t, r.fallback()))), i = 1);
                else if (0 === i) {
                    for (n = new Array(v), h = 0; h < v; h++) s[h] = u[h], n[h] = w(p);
                    i = v
                } else {
                    for (l = new Array(v), d = new Array(v), a && (f = new Array(v)), g = 0, b = Math.min(i, v); g < b && s[g] === u[g]; g++);
                    for (b = i - 1, y = v - 1; b >= g && y >= g && s[b] === u[y]; b--, y--) l[y] = n[b], d[y] = o[b], a && (f[y] = a[b]);
                    for (t = new Map, e = new Array(y + 1), h = y; h >= g; h--) m = u[h], c = t.get(m), e[h] = void 0 === c ? -1 : c, t.set(m, h);
                    for (c = g; c <= b; c++) m = s[c], void 0 !== (h = t.get(m)) && -1 !== h ? (l[h] = n[c], d[h] = o[c], a && (f[h] = a[c]), h = e[h], t.set(m, h)) : o[c]();
                    for (h = g; h < v; h++) h in l ? (n[h] = l[h], o[h] = d[h], a && (a[h] = f[h], a[h](h))) : n[h] = w(p);
                    n = n.slice(0, i = v), s = u.slice(0)
                }
                return n
            }));

            function p(t) {
                var r;
                return o[h] = t, a ? ([t, r] = x(h), a[h] = r, e(u[h], t)) : e(u[h])
            }
        }
    }((() => t.each), t.children, e || void 0))
}

function X(t) {
    const e = t.keyed,
        r = C((() => t.when), void 0, {
            equals: (t, r) => e ? t === r : !t == !r
        });
    return C((() => {
        const s = r();
        if (s) {
            const n = t.children;
            return "function" == typeof n && 0 < n.length ? S((() => n(e ? s : () => {
                if (S(r)) return t.when;
                throw (t => `Stale read from <${t}>.`)("Show")
            }))) : n
        }
        return t.fallback
    }), void 0, void 0)
}
const K = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", "allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"]),
    J = new Set(["innerHTML", "textContent", "innerText", "children"]),
    Q = Object.assign(Object.create(null), {
        className: "class",
        htmlFor: "for"
    }),
    Z = Object.assign(Object.create(null), {
        class: "className",
        formnovalidate: {
            $: "formNoValidate",
            BUTTON: 1,
            INPUT: 1
        },
        ismap: {
            $: "isMap",
            IMG: 1
        },
        nomodule: {
            $: "noModule",
            SCRIPT: 1
        },
        playsinline: {
            $: "playsInline",
            VIDEO: 1
        },
        readonly: {
            $: "readOnly",
            INPUT: 1,
            TEXTAREA: 1
        }
    });
const tt = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]),
    et = {
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace"
    };
const rt = "_$DX_DELEGATE";

function st(t, e, r) {
    let s;
    const n = () => {
        var e = document.createElement("template");
        return e.innerHTML = t, (r ? e.content.firstChild : e.content).firstChild
    };
    return (e = e ? () => (s = s || n()).cloneNode(!0) : () => S((() => document.importNode(s = s || n(), !0)))).cloneNode = e
}

function nt(t, e = window.document) {
    var r = e[rt] || (e[rt] = new Set);
    for (let n = 0, o = t.length; n < o; n++) {
        var s = t[n];
        r.has(s) || (r.add(s), e.addEventListener(s, pt))
    }
}

function ot(t, e, r) {
    null == r ? t.removeAttribute(e) : t.setAttribute(e, r)
}

function it(t, e) {
    null == e ? t.removeAttribute("class") : t.className = e
}

function at(t, e = {}, r, s) {
    const n = {};
    return s || k((() => n.children = dt(t, e.children, n.children))), k((() => e.ref && e.ref(t))), k((() => function(t, e, r, s, n = {}, o = !1) {
        e = e || {};
        for (const s in n) s in e || "children" !== s && (n[s] = ut(t, s, null, n[s], r, o));
        for (const a in e) {
            var i;
            "children" === a ? s || dt(t, e.children) : (i = e[a], n[a] = ut(t, a, i, n[a], r, o))
        }
    }(t, e, r, !0, n, !0))), n
}

function lt(t, e, r) {
    return S((() => t(e, r)))
}

function ct(t, e, r, s) {
    if (void 0 !== r && (s = s || []), "function" != typeof e) return dt(t, e, s, r);
    k((s => dt(t, e(), s, r)), s)
}

function ht(t, e, r) {
    var s = e.trim().split(/\s+/);
    for (let e = 0, n = s.length; e < n; e++) t.classList.toggle(s[e], r)
}

function ut(t, e, r, s, n, o) {
    let i, a, l, c, h;
    var u;
    return "style" === e ? function(t, e, r) {
        if (!e) return r ? ot(t, "style") : e;
        var s = t.style;
        if ("string" == typeof e) return s.cssText = e;
        let n, o;
        for (o in "string" == typeof r && (s.cssText = r = void 0), e = e || {}, r = r || {}) null == e[o] && s.removeProperty(o), delete r[o];
        for (o in e)(n = e[o]) !== r[o] && (s.setProperty(o, n), r[o] = n);
        return r
    }(t, r, s) : "classList" === e ? function(t, e, r = {}) {
        var s = Object.keys(e || {}),
            n = Object.keys(r);
        let o, i;
        for (o = 0, i = n.length; o < i; o++) {
            var a = n[o];
            a && "undefined" !== a && !e[a] && (ht(t, a, !1), delete r[a])
        }
        for (o = 0, i = s.length; o < i; o++) {
            var l = s[o],
                c = !!e[l];
            l && "undefined" !== l && r[l] !== c && c && (ht(t, l, !0), r[l] = c)
        }
        return r
    }(t, r, s) : r === s ? s : ("ref" === e ? o || r(t) : "on:" === e.slice(0, 3) ? (o = e.slice(3), s && t.removeEventListener(o, s), r && t.addEventListener(o, r)) : "oncapture:" === e.slice(0, 10) ? (o = e.slice(10), s && t.removeEventListener(o, s, !0), r && t.addEventListener(o, r, !0)) : "on" === e.slice(0, 2) ? (o = e.slice(2).toLowerCase(), !(u = tt.has(o)) && s && (s = Array.isArray(s) ? s[0] : s, t.removeEventListener(o, s)), (u || r) && (function(t, e, r, s) {
        if (s) Array.isArray(r) ? (t["$$" + e] = r[0], t[`$$${e}Data`] = r[1]) : t["$$" + e] = r;
        else if (Array.isArray(r)) {
            const s = r[0];
            t.addEventListener(e, r[0] = e => s.call(t, r[1], e))
        } else t.addEventListener(e, r)
    }(t, o, r, u), u) && nt([o])) : "attr:" === e.slice(0, 5) ? ot(t, e.slice(5), r) : (h = "prop:" === e.slice(0, 5)) || (l = J.has(e)) || !n && ((c = function(t, e) {
        return "object" == typeof(t = Z[t]) ? t[e] ? t.$ : void 0 : t
    }(e, t.tagName)) || (a = K.has(e))) || (i = t.nodeName.includes("-")) ? (h && (e = e.slice(5), a = !0), "class" === e || "className" === e ? it(t, r) : !i || a || l ? t[c || e] = r : t[function(t) {
        return t.toLowerCase().replace(/-([a-z])/g, ((t, e) => e.toUpperCase()))
    }(e)] = r) : (s = n && -1 < e.indexOf(":") && et[e.split(":")[0]]) ? function(t, e, r, s) {
        null == s ? t.removeAttributeNS(e, r) : t.setAttributeNS(e, r, s)
    }(t, s, e, r) : ot(t, Q[e] || e, r), r)
}

function pt(t) {
    var e = "$$" + t.type;
    let r = t.composedPath && t.composedPath()[0] || t.target;
    for (t.target !== r && Object.defineProperty(t, "target", {
            configurable: !0,
            value: r
        }), Object.defineProperty(t, "currentTarget", {
            configurable: !0,
            get: () => r || document
        }); r;) {
        var s = r[e];
        if (s && !r.disabled) {
            var n = r[e + "Data"];
            if (void 0 !== n ? s.call(r, n, t) : s.call(r, t), t.cancelBubble) return
        }
        r = r._$host || r.parentNode || r.host
    }
}

function dt(t, e, r, s, n) {
    for (;
        "function" == typeof r;) r = r();
    if (e !== r) {
        var o = typeof e,
            i = void 0 !== s;
        if (t = i && r[0] && r[0].parentNode || t, "string" == o || "number" == o)
            if ("number" == o && (e = e.toString()), i) {
                let n = r[0];
                n && 3 === n.nodeType ? n.data = e : n = document.createTextNode(e), r = bt(t, r, s, n)
            } else r = "" !== r && "string" == typeof r ? t.firstChild.data = e : t.textContent = e;
        else if (null == e || "boolean" == o) r = bt(t, r, s);
        else {
            if ("function" == o) return k((() => {
                let n = e();
                for (;
                    "function" == typeof n;) n = n();
                r = dt(t, n, r, s)
            })), () => r;
            if (Array.isArray(e)) {
                const a = [];
                if (o = r && Array.isArray(r), ft(a, e, r, n)) return k((() => r = dt(t, a, r, s, !0))), () => r;
                if (0 === a.length) {
                    if (r = bt(t, r, s), i) return r
                } else o ? 0 === r.length ? gt(t, a, s) : function(t, e, r) {
                    let s = r.length,
                        n = e.length,
                        o = s,
                        i = 0,
                        a = 0,
                        l = e[n - 1].nextSibling,
                        c = null;
                    for (; i < n || a < o;)
                        if (e[i] === r[a]) i++, a++;
                        else {
                            for (; e[n - 1] === r[o - 1];) n--, o--;
                            if (n === i)
                                for (var h = o < s ? a ? r[a - 1].nextSibling : r[o - a] : l; a < o;) t.insertBefore(r[a++], h);
                            else if (o === a)
                                for (; i < n;) c && c.has(e[i]) || e[i].remove(), i++;
                            else if (e[i] === r[o - 1] && r[a] === e[n - 1]) {
                                var u = e[--n].nextSibling;
                                t.insertBefore(r[a++], e[i++].nextSibling), t.insertBefore(r[--o], u), e[n] = r[o]
                            } else {
                                if (!c) {
                                    c = new Map;
                                    let t = a;
                                    for (; t < o;) c.set(r[t], t++)
                                }
                                var p = c.get(e[i]);
                                if (null != p)
                                    if (a < p && p < o) {
                                        let s, l = i,
                                            h = 1;
                                        for (; ++l < n && l < o && null != (s = c.get(e[l])) && s === p + h;) h++;
                                        if (h > p - a)
                                            for (var d = e[i]; a < p;) t.insertBefore(r[a++], d);
                                        else t.replaceChild(r[a++], e[i++])
                                    } else i++;
                                else e[i++].remove()
                            }
                        }
                }(t, r, a) : (r && bt(t), gt(t, a));
                r = a
            } else if (e instanceof Node) {
                if (Array.isArray(r)) {
                    if (i) return r = bt(t, r, s, e);
                    bt(t, r, null, e)
                } else null != r && "" !== r && t.firstChild ? t.replaceChild(e, t.firstChild) : t.appendChild(e);
                r = e
            } else console.warn("Unrecognized value. Skipped inserting", e)
        }
    }
    return r
}

function ft(t, e, r, s) {
    let n = !1;
    for (let i = 0, a = e.length; i < a; i++) {
        let a = e[i],
            l = r && r[i];
        if (a instanceof Node) t.push(a);
        else if (null != a && !0 !== a && !1 !== a)
            if (Array.isArray(a)) n = ft(t, a, l) || n;
            else if ("function" == typeof a)
            if (s) {
                for (;
                    "function" == typeof a;) a = a();
                n = ft(t, Array.isArray(a) ? a : [a], Array.isArray(l) ? l : [l]) || n
            } else t.push(a), n = !0;
        else {
            var o = String(a);
            l && 3 === l.nodeType ? (l.data = o, t.push(l)) : t.push(document.createTextNode(o))
        }
    }
    return n
}

function gt(t, e, r = null) {
    for (let s = 0, n = e.length; s < n; s++) t.insertBefore(e[s], r)
}

function bt(t, e, r, s) {
    if (void 0 === r) return t.textContent = "";
    var n = s || document.createTextNode("");
    if (e.length) {
        let s = !1;
        for (let a = e.length - 1; 0 <= a; a--) {
            var o, i = e[a];
            n !== i ? (o = i.parentNode === t, s || a ? o && i.remove() : o ? t.replaceChild(n, i) : t.insertBefore(n, r)) : s = !0
        }
    } else t.insertBefore(n, r);
    return [n]
}

function yt(t) {
    return (e, r) => {
        const s = r.element;
        return w((n => {
            const o = function(t) {
                var e = Object.keys(t),
                    r = {};
                for (let s = 0; s < e.length; s++) {
                    const [n, o] = x(t[e[s]]);
                    Object.defineProperty(r, e[s], {
                        get: n,
                        set(t) {
                            o((() => t))
                        }
                    })
                }
                return r
            }(e);
            s.addPropertyChangedCallback(((t, e) => o[t] = e)), s.addReleaseCallback((() => {
                s.renderRoot.textContent = "", n()
            }));
            var i = t(o, r);
            return ct(s.renderRoot, i)
        }), function(t) {
            if (t.assignedSlot && t.assignedSlot._$owner) return t.assignedSlot._$owner;
            let e = t.parentNode;
            for (; e && !e._$owner && (!e.assignedSlot || !e.assignedSlot._$owner);) e = e.parentNode;
            return (e && e.assignedSlot ? e.assignedSlot : t)._$owner
        }(s))
    }
}

function mt(t, e, r) {
    return 2 === arguments.length && (r = e, e = {}), i(t, e)(yt(r))
}
const vt = {
    chatflowid: "",
    apiHost: void 0,
    chatflowConfig: void 0,
    theme: void 0
};
var wt, xt, kt = '/*! tailwindcss v3.3.1 | MIT License | https://tailwindcss.com*/*,:after,:before{border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:""}html{-webkit-text-size-adjust:100%;font-feature-settings:normal;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-variation-settings:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{line-height:inherit;margin:0}hr{border-top-width:1px;color:inherit;height:0}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{color:inherit;font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{color:#9ca3af;opacity:1}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}[hidden]{display:none}*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.pointer-events-none{pointer-events:none}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.bottom-20{bottom:80px}.bottom-24{bottom:96px}.left-0{left:0}.top-0{top:0}.z-10{z-index:10}.my-2{margin-bottom:8px;margin-top:8px}.-ml-1{margin-left:-4px}.mb-2{margin-bottom:8px}.ml-1{margin-left:4px}.ml-2{margin-left:8px}.mr-1{margin-right:4px}.mr-2{margin-right:8px}.mr-3{margin-right:12px}.block{display:block}.flex{display:flex}.hidden{display:none}.h-10{height:40px}.h-12{height:48px}.h-16{height:64px}.h-2{height:8px}.h-32{height:128px}.h-5{height:20px}.h-6{height:24px}.h-7{height:28px}.h-9{height:36px}.h-full{height:100%}.max-h-\\[704px\\]{max-height:704px}.min-h-full{min-height:100%}.w-10{width:40px}.w-12{width:48px}.w-16{width:64px}.w-2{width:8px}.w-5{width:20px}.w-6{width:24px}.w-7{width:28px}.w-9{width:36px}.w-full{width:100%}.min-w-full{min-width:100%}.max-w-full{max-width:100%}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.-rotate-180{--tw-rotate:-180deg}.-rotate-180,.rotate-0{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate:0deg}.scale-0{--tw-scale-x:0;--tw-scale-y:0}.scale-0,.scale-100{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-100{--tw-scale-x:1;--tw-scale-y:1}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.animate-fade-in{animation:fade-in .3s ease-out}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{animation:spin 1s linear infinite}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.overflow-y-scroll{overflow-y:scroll}.scroll-smooth{scroll-behavior:smooth}.whitespace-pre-wrap{white-space:pre-wrap}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:8px}.border{border-width:1px}.bg-black{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-opacity-50{--tw-bg-opacity:0.5}.bg-cover{background-size:cover}.bg-center{background-position:50%}.fill-transparent{fill:transparent}.stroke-2{stroke-width:2}.object-cover{-o-object-fit:cover;object-fit:cover}.p-4{padding:16px}.px-2{padding-left:8px;padding-right:8px}.px-3{padding-left:12px;padding-right:12px}.px-4{padding-left:16px;padding-right:16px}.py-1{padding-bottom:4px;padding-top:4px}.py-2{padding-bottom:8px;padding-top:8px}.py-4{padding-bottom:16px;padding-top:16px}.pt-10{padding-top:40px}.text-left{text-align:left}.text-center{text-align:center}.text-base{font-size:16px;line-height:24px}.text-sm{font-size:14px;line-height:20px}.text-xl{font-size:20px;line-height:28px}.font-semibold{font-weight:600}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.opacity-0{opacity:0}.opacity-100{opacity:1}.opacity-25{opacity:.25}.opacity-75{opacity:.75}.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color)}.shadow-md,.shadow-xl{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-xl{--tw-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-all{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-opacity{transition-duration:.15s;transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-transform{transition-duration:.15s;transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-200{transition-duration:.2s}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}:host{--chatbot-container-bg-image:none;--chatbot-container-bg-color:transparent;--chatbot-container-font-family:"Open Sans";--chatbot-button-bg-color:#0042da;--chatbot-button-color:#fff;--chatbot-host-bubble-bg-color:#f7f8ff;--chatbot-host-bubble-color:#303235;--chatbot-guest-bubble-bg-color:#3b81f6;--chatbot-guest-bubble-color:#fff;--chatbot-input-bg-color:#fff;--chatbot-input-color:#303235;--chatbot-input-placeholder-color:#9095a0;--chatbot-header-bg-color:#fff;--chatbot-header-color:#303235;--chatbot-border-radius:6px;--PhoneInputCountryFlag-borderColor:transparent;--PhoneInput-color--focus:transparent}a{color:#16bed7;font-weight:500}a:hover{text-decoration:underline}pre{word-wrap:break-word;font-size:13px;margin:5px;overflow:auto;padding:5px;white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;width:auto}.string{color:green}.number{color:#ff8c00}.boolean{color:blue}.null{color:#f0f}.key{color:#002b36}.scrollable-container::-webkit-scrollbar{display:none}.scrollable-container{-ms-overflow-style:none;scrollbar-width:none}.text-fade-in{transition:opacity .4s ease-in .2s}.bubble-typing{transition:width .4s ease-out,height .4s ease-out}.bubble1,.bubble2,.bubble3{background-color:var(--chatbot-host-bubble-color);opacity:.5}.bubble1,.bubble2{animation:chatBubbles 1s ease-in-out infinite}.bubble2{animation-delay:.3s}.bubble3{animation:chatBubbles 1s ease-in-out infinite;animation-delay:.5s}@keyframes chatBubbles{0%{transform:translateY(0)}50%{transform:translateY(-5px)}to{transform:translateY(0)}}button,input,textarea{font-weight:300}.slate-a{text-decoration:underline}.slate-html-container>div{min-height:24px}.slate-bold{font-weight:700}.slate-italic{font-style:oblique}.slate-underline{text-decoration:underline}.text-input::-moz-placeholder{color:#9095a0!important;opacity:1!important}.text-input::placeholder{color:#9095a0!important;opacity:1!important}.chatbot-container{background-color:var(--chatbot-container-bg-color);background-image:var(--chatbot-container-bg-image);font-family:Open Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol}.chatbot-button{background-color:#0042da;border:1px solid #0042da;border-radius:var(--chatbot-border-radius);color:var(--chatbot-button-color)}.chatbot-button.selectable{border:1px solid #0042da}.chatbot-button.selectable,.chatbot-host-bubble{background-color:#f7f8ff;color:var(--chatbot-host-bubble-color)}.chatbot-host-bubble>.bubble-typing{background-color:#f7f8ff;border:var(--chatbot-host-bubble-border);border-radius:6px}.chatbot-host-bubble iframe,.chatbot-host-bubble img,.chatbot-host-bubble video{border-radius:var(--chatbot-border-radius)}.chatbot-guest-bubble{background-color:#3b81f6;border-radius:6px;color:var(--chatbot-guest-bubble-color)}.chatbot-input{background-color:#fff;border-radius:var(--chatbot-border-radius);box-shadow:0 2px 6px -1px rgba(0,0,0,.1);color:#303235}.chatbot-input-error-message{color:#303235}.chatbot-button>.send-icon{fill:var(--chatbot-button-color)}.chatbot-chat-view{max-width:800px}.ping span{background-color:#0042da}.rating-icon-container svg{stroke:#0042da;fill:#f7f8ff;height:42px;transition:fill .1s ease-out;width:42px}.rating-icon-container.selected svg{fill:#0042da}.rating-icon-container:hover svg{filter:brightness(.9)}.rating-icon-container:active svg{filter:brightness(.75)}.upload-progress-bar{background-color:#0042da;border-radius:var(--chatbot-border-radius)}.total-files-indicator{background-color:#0042da;color:var(--chatbot-button-color);font-size:10px}.chatbot-upload-input{transition:border-color .1s ease-out}.chatbot-upload-input.dragging-over{border-color:#0042da}.secondary-button{background-color:#f7f8ff;border-radius:var(--chatbot-border-radius);color:var(--chatbot-host-bubble-color)}.chatbot-country-select{color:#303235}.chatbot-country-select,.chatbot-date-input{background-color:#fff;border-radius:var(--chatbot-border-radius)}.chatbot-date-input{color:#303235;color-scheme:light}.chatbot-popup-blocked-toast{border-radius:var(--chatbot-border-radius)}.messagelist{border-radius:.5rem;height:100%;overflow-y:scroll;width:100%}.messagelistloading{display:flex;justify-content:center;margin-top:1rem;width:100%}.usermessage{padding:1rem 1.5rem}.usermessagewaiting-light{background:linear-gradient(270deg,#ede7f6,#e3f2fd,#ede7f6);background-position:-100% 0;background-size:200% 200%}.usermessagewaiting-dark,.usermessagewaiting-light{animation:loading-gradient 2s ease-in-out infinite;animation-direction:alternate;animation-name:loading-gradient;padding:1rem 1.5rem}.usermessagewaiting-dark{background:linear-gradient(270deg,#2e2352,#1d3d60,#2e2352);background-position:-100% 0;background-size:200% 200%;color:#ececf1}@keyframes loading-gradient{0%{background-position:-100% 0}to{background-position:100% 0}}.apimessage{animation:fadein .5s;padding:1rem 1.5rem}@keyframes fadein{0%{opacity:0}to{opacity:1}}.apimessage,.usermessage,.usermessagewaiting{display:flex}.markdownanswer{line-height:1.75}.markdownanswer a:hover{opacity:.8}.markdownanswer a{color:#16bed7;font-weight:500}.markdownanswer code{color:#15cb19;font-weight:500;white-space:pre-wrap!important}.markdownanswer ol,.markdownanswer ul{margin:1rem}.boticon,.usericon{border-radius:1rem;margin-right:1rem}.markdownanswer h1,.markdownanswer h2,.markdownanswer h3{font-size:inherit}.center{flex-direction:column;padding:10px;position:relative}.center,.cloud{align-items:center;display:flex;justify-content:center}.cloud{border-radius:.5rem;height:calc(100% - 50px);width:400px}input{background-color:transparent;border:none;font-family:Poppins,sans-serif;padding:10px}.hover\\:scale-110:hover{--tw-scale-x:1.1;--tw-scale-y:1.1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:brightness-90:hover{--tw-brightness:brightness(.9);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.active\\:scale-95:active{--tw-scale-x:.95;--tw-scale-y:.95;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.active\\:brightness-75:active{--tw-brightness:brightness(.75);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:brightness-100:disabled{--tw-brightness:brightness(1);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@media (min-width:640px){.sm\\:right-5{right:20px}.sm\\:my-8{margin-bottom:32px;margin-top:32px}.sm\\:w-\\[400px\\]{width:400px}.sm\\:w-full{width:100%}.sm\\:max-w-lg{max-width:512px}.sm\\:p-0{padding:0}}';
const _t = t => null == t,
    Ct = t => null != t,
    St = async t => {
        try {
            var e = "string" == typeof t ? t : t.url,
                r = await fetch(e, {
                    method: "string" == typeof t ? "GET" : t.method,
                    mode: "cors",
                    headers: "string" != typeof t && Ct(t.body) ? {
                        "Content-Type": "application/json"
                    } : void 0,
                    body: "string" != typeof t && Ct(t.body) ? JSON.stringify(t.body) : void 0
                }),
                s = await r.json();
            if (r.ok) return {
                data: s
            };
            throw "error" in s ? s.error : s
        } catch (t) {
            return console.error(t), {
                error: t
            }
        }
    }, At = st('<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">'), Ot = st('<img alt="Bubble button icon">'), Et = st('<button part="button"><svg viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.601 8.39897C18.269 8.06702 17.7309 8.06702 17.3989 8.39897L12 13.7979L6.60099 8.39897C6.26904 8.06702 5.73086 8.06702 5.39891 8.39897C5.06696 8.73091 5.06696 9.2691 5.39891 9.60105L11.3989 15.601C11.7309 15.933 12.269 15.933 12.601 15.601L18.601 9.60105C18.9329 9.2691 18.9329 8.73091 18.601 8.39897Z">'), Pt = t => {
        {
            const e = Et(),
                r = e.firstChild;
            return e.$$click = () => t.toggleBot(), e.style.setProperty("z-index", "42424242"), ct(e, F(X, {
                get when() {
                    return _t(t.customIconSrc)
                },
                keyed: !0,
                get children() {
                    const e = At();
                    return k((r => {
                        var s = t.iconColor ?? "white",
                            n = "stroke-2 fill-transparent absolute duration-200 transition " + (t.isBotOpened ? "scale-0 opacity-0" : "scale-100 opacity-100") + ("large" === t.size ? " w-9" : " w-7");
                        return s !== r._v$ && (null != (r._v$ = s) ? e.style.setProperty("stroke", s) : e.style.removeProperty("stroke")), n !== r._v$2 && ot(e, "class", r._v$2 = n), r
                    }), {
                        _v$: void 0,
                        _v$2: void 0
                    }), e
                }
            }), r), ct(e, F(X, {
                get when() {
                    return t.customIconSrc
                },
                get children() {
                    const e = Ot();
                    return k((r => {
                        var s = t.customIconSrc,
                            n = "rounded-full object-cover" + (t.isBotOpened ? "scale-0 opacity-0" : "scale-100 opacity-100") + ("large" === t.size ? " w-9 h-9" : " w-7 h-7");
                        return s !== r._v$3 && ot(e, "src", r._v$3 = s), n !== r._v$4 && it(e, r._v$4 = n), r
                    }), {
                        _v$3: void 0,
                        _v$4: void 0
                    }), e
                }
            }), r), k((s => {
                var n = "fixed shadow-md rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 flex justify-center items-center animate-fade-in" + ("large" === t.size ? " w-16 h-16" : " w-12 h-12"),
                    o = t.backgroundColor ?? "#3B81F6",
                    i = t.right ? t.right.toString() + "px" : "20px",
                    a = t.bottom ? t.bottom.toString() + "px" : "20px",
                    l = t.iconColor ?? "white",
                    c = "absolute duration-200 transition " + (t.isBotOpened ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-180 opacity-0") + ("large" === t.size ? " w-9" : " w-7");
                return n !== s._v$5 && it(e, s._v$5 = n), o !== s._v$6 && (null != (s._v$6 = o) ? e.style.setProperty("background-color", o) : e.style.removeProperty("background-color")), i !== s._v$7 && (null != (s._v$7 = i) ? e.style.setProperty("right", i) : e.style.removeProperty("right")), a !== s._v$8 && (null != (s._v$8 = a) ? e.style.setProperty("bottom", a) : e.style.removeProperty("bottom")), l !== s._v$9 && (null != (s._v$9 = l) ? r.style.setProperty("fill", l) : r.style.removeProperty("fill")), c !== s._v$10 && ot(r, "class", s._v$10 = c), s
            }), {
                _v$5: void 0,
                _v$6: void 0,
                _v$7: void 0,
                _v$8: void 0,
                _v$9: void 0,
                _v$10: void 0
            }), e
        }
    }, $t = (nt(["click"]), ({
        chatflowid: t,
        apiHost: e = "http://localhost:3000",
        body: r
    }) => St({
        method: "POST",
        url: e + "/api/v1/prediction/" + t,
        body: r
    })), Rt = st('<input class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" type="text">'), Tt = t => {
        const [e, r] = V(t, ["ref", "onInput"]);
        return (s = Rt()).$$input = t => e.onInput(t.currentTarget.value), "function" == typeof(n = t.ref) ? lt(n, s) : t.ref = s, at(s, U({
            get style() {
                return {
                    "font-size": t.fontSize ? t.fontSize + "px" : "16px"
                }
            }
        }, r), !1, !1), s;
        var s, n
    }, Bt = (nt(["input"]), st('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="19px"><path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z">')), Lt = t => {
        return at(e = Bt(), U({
            get style() {
                return {
                    fill: t.color ?? "#3B81F6"
                }
            }
        }, t), !0, !0), e;
        var e
    }, jt = st('<button type="submit">'), Nt = st('<svg><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">'), zt = t => {
        return at(e = jt(), U({
            get disabled() {
                return t.isDisabled || t.isLoading
            }
        }, t, {
            get class() {
                return "py-2 px-4 justify-center font-semibold text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 chatbot-button " + t.class
            },
            style: {
                background: "transparent",
                border: "none"
            }
        }), !1, !0), ct(e, F(X, {
            get when() {
                return !t.isLoading
            },
            get fallback() {
                return F(Mt, {
                    class: "text-white"
                })
            },
            get children() {
                return F(Lt, {
                    get color() {
                        return t.sendButtonColor
                    },
                    get class() {
                        return "send-icon flex " + (t.disableIcon ? "hidden" : "")
                    }
                })
            }
        })), e;
        var e
    }, Mt = t => {
        return at(e = Nt(), U(t, {
            get class() {
                return "animate-spin -ml-1 mr-3 h-5 w-5 " + t.class
            },
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "data-testid": "loading-spinner"
        }), !0, !0), e;
        var e
    }, [It, qt] = x(), Dt = st("<span>Send"), Ft = st('<div class="flex items-end justify-between chatbot-input" data-testid="input">'), Gt = t => {
        const [e, r] = x(t.defaultValue ?? "");
        let s;
        const n = t => r(t),
            o = () => {
                "" !== e() && s?.reportValidity() && t.onSubmit(e()), r("")
            },
            i = t => {
                var e = t.isComposing || 229 === t.keyCode;
                "Enter" !== t.key || e || o()
            };
        A((() => {
            !It() && s && s.focus()
        }));
        {
            const r = Ft();
            return r.$$keydown = i, r.style.setProperty("border-top", "1px solid #eeeeee"), r.style.setProperty("position", "absolute"), r.style.setProperty("left", "20px"), r.style.setProperty("right", "20px"), r.style.setProperty("bottom", "40px"), r.style.setProperty("margin", "auto"), r.style.setProperty("z-index", "1000"), ct(r, F(Tt, {
                ref(t) {
                    "function" == typeof s ? s(t) : s = t
                },
                onInput: n,
                get value() {
                    return e()
                },
                get fontSize() {
                    return t.fontSize
                },
                get placeholder() {
                    return t.placeholder ?? "Type your question"
                }
            }), null), ct(r, F(zt, {
                get sendButtonColor() {
                    return t.sendButtonColor
                },
                type: "button",
                get isDisabled() {
                    return "" === e()
                },
                class: "my-2 ml-2",
                "on:click": o,
                get children() {
                    var t = Dt();
                    return t.style.setProperty("font-family", "Poppins, sans-serif"), t
                }
            }), null), k((e => {
                var s = t.backgroundColor ?? "#ffffff",
                    n = t.textColor ?? "#303235";
                return s !== e._v$ && (null != (e._v$ = s) ? r.style.setProperty("background-color", s) : r.style.removeProperty("background-color")), n !== e._v$2 && (null != (e._v$2 = n) ? r.style.setProperty("color", n) : r.style.removeProperty("color")), e
            }), {
                _v$: void 0,
                _v$2: void 0
            }), r
        }
    }, Ht = (nt(["keydown"]), st('<figure data-testid="default-avatar"><svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0" x="0" y="0" mask-type="alpha"><circle cx="37.5" cy="37.5" r="37.5" fill="#0042DA"></circle></mask><g mask="url(#mask0)"><rect x="-30" y="-43" width="131" height="154" fill="#0042DA"></rect><rect x="2.50413" y="120.333" width="81.5597" height="86.4577" rx="2.5" transform="rotate(-52.6423 2.50413 120.333)" stroke="#FED23D" stroke-width="5"></rect><circle cx="76.5" cy="-1.5" r="29" stroke="#FF8E20" stroke-width="5"></circle><path d="M-49.8224 22L-15.5 -40.7879L18.8224 22H-49.8224Z" stroke="#F7F8FF" stroke-width="5">')), Wt = () => {
        {
            const t = Ht(),
                e = t.firstChild;
            return k((r => {
                var s = "flex justify-center items-center rounded-full text-white relative " + (It() ? "w-6 h-6 text-sm" : "w-10 h-10 text-xl"),
                    n = "absolute top-0 left-0 " + (It() ? " w-6 h-6 text-sm" : "w-full h-full text-xl");
                return s !== r._v$ && it(t, r._v$ = s), n !== r._v$2 && ot(e, "class", r._v$2 = n), r
            }), {
                _v$: void 0,
                _v$2: void 0
            }), t
        }
    }, Ut = st('<figure><img alt="Bot avatar" class="rounded-full object-cover w-full h-full">'), Vt = t => {
        const [e, r] = x(t.initialAvatarSrc);
        return _((() => {
            e()?.startsWith("{{") && t.initialAvatarSrc?.startsWith("http") && r(t.initialAvatarSrc)
        })), F(X, {
            get when() {
                return (t => null != t && "" !== t)(e())
            },
            keyed: !0,
            get fallback() {
                return F(Wt, {})
            },
            get children() {
                const t = Ut(),
                    r = t.firstChild;
                return k((s => {
                    var n = "flex justify-center items-center rounded-full text-white relative flex-shrink-0 " + (It() ? "w-6 h-6 text-sm" : "w-10 h-10 text-xl"),
                        o = e();
                    return n !== s._v$ && it(t, s._v$ = n), o !== s._v$2 && ot(r, "src", s._v$2 = o), s
                }), {
                    _v$: void 0,
                    _v$2: void 0
                }), t
            }
        })
    };
class Yt {
    constructor(t, e = "") {
        this.source = t.source, this.flags = e
    }
    setGroup(t, e) {
        let r = "string" == typeof e ? e : e.source;
        return r = r.replace(/(^|[^\[])\^/g, "$1"), this.source = this.source.replace(t, r), this
    }
    getRegexp() {
        return new RegExp(this.source, this.flags)
    }
}
const Xt = /[&<>"']/,
    Kt = /[&<>"']/g,
    Jt = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    },
    Qt = /[<>"']|&(?!#?\w+;)/,
    Zt = /[<>"']|&(?!#?\w+;)/g;

function te(t, e) {
    if (e) {
        if (Xt.test(t)) return t.replace(Kt, (t => Jt[t]))
    } else if (Qt.test(t)) return t.replace(Zt, (t => Jt[t]));
    return t
}

function ee(t) {
    return t.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi, (function(t, e) {
        return "colon" === (e = e.toLowerCase()) ? ":" : "#" === e.charAt(0) ? "x" === e.charAt(1) ? String.fromCharCode(parseInt(e.substring(2), 16)) : String.fromCharCode(+e.substring(1)) : ""
    }))
}
var re;
(re = wt = wt || {})[re.space = 1] = "space", re[re.text = 2] = "text", re[re.paragraph = 3] = "paragraph", re[re.heading = 4] = "heading", re[re.listStart = 5] = "listStart", re[re.listEnd = 6] = "listEnd", re[re.looseItemStart = 7] = "looseItemStart", re[re.looseItemEnd = 8] = "looseItemEnd", re[re.listItemStart = 9] = "listItemStart", re[re.listItemEnd = 10] = "listItemEnd", re[re.blockquoteStart = 11] = "blockquoteStart", re[re.blockquoteEnd = 12] = "blockquoteEnd", re[re.code = 13] = "code", re[re.table = 14] = "table", re[re.html = 15] = "html", re[re.hr = 16] = "hr";
class se {
    constructor(t) {
        this.options = t || ie.options
    }
    code(t, e, r, s) {
        this.options.highlight && null != (n = this.options.highlight(t, e)) && n !== t && (r = !0, t = n);
        var n = r ? t : this.options.escape(t, !0);
        return e ? `\n<pre><code class="${this.options.langPrefix+this.options.escape(e,!0)}">${n}\n</code></pre>\n` : `\n<pre><code>${n}\n</code></pre>\n`
    }
    blockquote(t) {
        return `<blockquote>\n${t}</blockquote>\n`
    }
    html(t) {
        return t
    }
    heading(t, e, r) {
        return `<h${e} id="${this.options.headerPrefix+r.toLowerCase().replace(/[^\w]+/g,"-")}">${t}</h${e}>\n`
    }
    hr() {
        return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
    }
    list(t, e) {
        return `\n<${e=e?"ol":"ul"}>\n${t}</${e}>\n`
    }
    listitem(t) {
        return "<li>" + t + "</li>\n"
    }
    paragraph(t) {
        return "<p>" + t + "</p>\n"
    }
    table(t, e) {
        return `\n<table>\n<thead>\n${t}</thead>\n<tbody>\n${e}</tbody>\n</table>\n`
    }
    tablerow(t) {
        return "<tr>\n" + t + "</tr>\n"
    }
    tablecell(t, e) {
        var r = e.header ? "th" : "td";
        return (e.align ? "<" + r + ' style="text-align:' + e.align + '">' : "<" + r + ">") + t + "</" + r + ">\n"
    }
    strong(t) {
        return "<strong>" + t + "</strong>"
    }
    em(t) {
        return "<em>" + t + "</em>"
    }
    codespan(t) {
        return "<code>" + t + "</code>"
    }
    br() {
        return this.options.xhtml ? "<br/>" : "<br>"
    }
    del(t) {
        return "<del>" + t + "</del>"
    }
    link(t, e, r) {
        if (this.options.sanitize) {
            let s;
            try {
                s = decodeURIComponent(this.options.unescape(t)).replace(/[^\w:]/g, "").toLowerCase()
            } catch (e) {
                return r
            }
            if (0 === s.indexOf("javascript:") || 0 === s.indexOf("vbscript:") || 0 === s.indexOf("data:")) return r
        }
        let s = '<a href="' + t + '"';
        return e && (s += ' title="' + e + '"'), s + ">" + r + "</a>"
    }
    image(t, e, r) {
        let s = '<img src="' + t + '" alt="' + r + '"';
        return e && (s += ' title="' + e + '"'), s + (this.options.xhtml ? "/>" : ">")
    }
    text(t) {
        return t
    }
}
class ne {
    constructor(t, e, r = ie.options, s) {
        if (this.staticThis = t, this.links = e, this.options = r, this.renderer = s || this.options.renderer || new se(this.options), !this.links) throw new Error("InlineLexer requires 'links' parameter.");
        this.setRules()
    }
    static output(t, e, r) {
        return new this(this, e, r).output(t)
    }
    static getRulesBase() {
        var t;
        return this.rulesBase || ((t = {
            escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
            autolink: /^<([^ <>]+(@|:\/)[^ <>]+)>/,
            tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^<'">])*?>/,
            link: /^!?\[(inside)\]\(href\)/,
            reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
            nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
            strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
            em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
            code: /^(`+)([\s\S]*?[^`])\1(?!`)/,
            br: /^ {2,}\n(?!\s*$)/,
            text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/,
            _inside: /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,
            _href: /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/
        }).link = new Yt(t.link).setGroup("inside", t._inside).setGroup("href", t._href).getRegexp(), t.reflink = new Yt(t.reflink).setGroup("inside", t._inside).getRegexp(), this.rulesBase = t)
    }
    static getRulesPedantic() {
        return this.rulesPedantic || (this.rulesPedantic = Object.assign(Object.assign({}, this.getRulesBase()), {
            strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
            em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
        }))
    }
    static getRulesGfm() {
        var t, e, r;
        return this.rulesGfm || (t = this.getRulesBase(), e = new Yt(t.escape).setGroup("])", "~|])").getRegexp(), r = new Yt(t.text).setGroup("]|", "~]|").setGroup("|", "|https?://|").getRegexp(), this.rulesGfm = Object.assign(Object.assign({}, t), {
            escape: e,
            url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
            del: /^~~(?=\S)([\s\S]*?\S)~~/,
            text: r
        }))
    }
    static getRulesBreaks() {
        var t, e;
        return this.rulesBreaks || (t = this.getRulesGfm(), e = this.getRulesGfm(), this.rulesBreaks = Object.assign(Object.assign({}, e), {
            br: new Yt(t.br).setGroup("{2,}", "*").getRegexp(),
            text: new Yt(e.text).setGroup("{2,}", "*").getRegexp()
        }))
    }
    setRules() {
        this.options.gfm ? this.options.breaks ? this.rules = this.staticThis.getRulesBreaks() : this.rules = this.staticThis.getRulesGfm() : this.options.pedantic ? this.rules = this.staticThis.getRulesPedantic() : this.rules = this.staticThis.getRulesBase(), this.hasRulesGfm = void 0 !== this.rules.url
    }
    output(t) {
        let e, r = "";
        for (; t;)
            if (e = this.rules.escape.exec(t)) t = t.substring(e[0].length), r += e[1];
            else if (e = this.rules.autolink.exec(t)) {
            let s, n;
            t = t.substring(e[0].length), n = "@" === e[2] ? (s = this.options.escape(":" === e[1].charAt(6) ? this.mangle(e[1].substring(7)) : this.mangle(e[1])), this.mangle("mailto:") + s) : s = this.options.escape(e[1]), r += this.renderer.link(n, null, s)
        } else if (!this.inLink && this.hasRulesGfm && (e = this.rules.url.exec(t))) t = t.substring(e[0].length), s = this.options.escape(e[1]), r += this.renderer.link(s, null, s);
        else if (e = this.rules.tag.exec(t)) !this.inLink && /^<a /i.test(e[0]) ? this.inLink = !0 : this.inLink && /^<\/a>/i.test(e[0]) && (this.inLink = !1), t = t.substring(e[0].length), r += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e[0]) : this.options.escape(e[0]) : e[0];
        else if (e = this.rules.link.exec(t)) t = t.substring(e[0].length), this.inLink = !0, r += this.outputLink(e, {
            href: e[2],
            title: e[3]
        }), this.inLink = !1;
        else if (e = (e = this.rules.reflink.exec(t)) || this.rules.nolink.exec(t)) {
            t = t.substring(e[0].length);
            var s = (e[2] || e[1]).replace(/\s+/g, " "),
                n = this.links[s.toLowerCase()];
            n && n.href ? (this.inLink = !0, r += this.outputLink(e, n), this.inLink = !1) : (r += e[0].charAt(0), t = e[0].substring(1) + t)
        } else if (e = this.rules.strong.exec(t)) t = t.substring(e[0].length), r += this.renderer.strong(this.output(e[2] || e[1]));
        else if (e = this.rules.em.exec(t)) t = t.substring(e[0].length), r += this.renderer.em(this.output(e[2] || e[1]));
        else if (e = this.rules.code.exec(t)) t = t.substring(e[0].length), r += this.renderer.codespan(this.options.escape(e[2].trim(), !0));
        else if (e = this.rules.br.exec(t)) t = t.substring(e[0].length), r += this.renderer.br();
        else if (this.hasRulesGfm && (e = this.rules.del.exec(t))) t = t.substring(e[0].length), r += this.renderer.del(this.output(e[1]));
        else if (e = this.rules.text.exec(t)) t = t.substring(e[0].length), r += this.renderer.text(this.options.escape(this.smartypants(e[0])));
        else if (t) throw new Error("Infinite loop on byte: " + t.charCodeAt(0));
        return r
    }
    outputLink(t, e) {
        var r = this.options.escape(e.href);
        e = e.title ? this.options.escape(e.title) : null;
        return "!" !== t[0].charAt(0) ? this.renderer.link(r, e, this.output(t[1])) : this.renderer.image(r, e, this.options.escape(t[1]))
    }
    smartypants(t) {
        return this.options.smartypants ? t.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…") : t
    }
    mangle(t) {
        if (!this.options.mangle) return t;
        let e = "";
        var r = t.length;
        for (let s = 0; s < r; s++) {
            let r;
            .5 < Math.random() && (r = "x" + t.charCodeAt(s).toString(16)), e += "&#" + r + ";"
        }
        return e
    }
}
ne.rulesBase = null, ne.rulesPedantic = null, ne.rulesGfm = null, ne.rulesBreaks = null;
class oe {
    constructor(t) {
        this.simpleRenderers = [], this.line = 0, this.tokens = [], this.token = null, this.options = t || ie.options, this.renderer = this.options.renderer || new se(this.options)
    }
    static parse(t, e, r) {
        return new this(r).parse(e, t)
    }
    parse(t, e) {
        this.inlineLexer = new ne(ne, t, this.options, this.renderer), this.tokens = e.reverse();
        let r = "";
        for (; this.next();) r += this.tok();
        return r
    }
    debug(t, e) {
        this.inlineLexer = new ne(ne, t, this.options, this.renderer), this.tokens = e.reverse();
        let r = "";
        for (; this.next();) {
            var s = this.tok();
            this.token.line = this.line += s.split("\n").length - 1, r += s
        }
        return r
    }
    next() {
        return this.token = this.tokens.pop()
    }
    getNextElement() {
        return this.tokens[this.tokens.length - 1]
    }
    parseText() {
        let t = this.token.text;
        for (var e;
            (e = this.getNextElement()) && e.type == wt.text;) t += "\n" + this.next().text;
        return this.inlineLexer.output(t)
    }
    tok() {
        switch (this.token.type) {
            case wt.space:
                return "";
            case wt.paragraph:
                return this.renderer.paragraph(this.inlineLexer.output(this.token.text));
            case wt.text:
                return this.options.isNoP ? this.parseText() : this.renderer.paragraph(this.parseText());
            case wt.heading:
                return this.renderer.heading(this.inlineLexer.output(this.token.text), this.token.depth, this.token.text);
            case wt.listStart: {
                let e = "";
                for (var t = this.token.ordered; this.next().type != wt.listEnd;) e += this.tok();
                return this.renderer.list(e, t)
            }
            case wt.listItemStart: {
                let t = "";
                for (; this.next().type != wt.listItemEnd;) t += this.token.type == wt.text ? this.parseText() : this.tok();
                return this.renderer.listitem(t)
            }
            case wt.looseItemStart: {
                let t = "";
                for (; this.next().type != wt.listItemEnd;) t += this.tok();
                return this.renderer.listitem(t)
            }
            case wt.code:
                return this.renderer.code(this.token.text, this.token.lang, this.token.escaped, this.token.meta);
            case wt.table: {
                t = "";
                let s, n = "";
                s = "";
                for (let t = 0; t < this.token.header.length; t++) {
                    var e = {
                            header: !0,
                            align: this.token.align[t]
                        },
                        r = this.inlineLexer.output(this.token.header[t]);
                    s += this.renderer.tablecell(r, e)
                }
                t += this.renderer.tablerow(s);
                for (const t of this.token.cells) {
                    s = "";
                    for (let e = 0; e < t.length; e++) s += this.renderer.tablecell(this.inlineLexer.output(t[e]), {
                        header: !1,
                        align: this.token.align[e]
                    });
                    n += this.renderer.tablerow(s)
                }
                return this.renderer.table(t, n)
            }
            case wt.blockquoteStart: {
                let t = "";
                for (; this.next().type != wt.blockquoteEnd;) t += this.tok();
                return this.renderer.blockquote(t)
            }
            case wt.hr:
                return this.renderer.hr();
            case wt.html:
                return t = this.token.pre || this.options.pedantic ? this.token.text : this.inlineLexer.output(this.token.text), this.renderer.html(t);
            default:
                if (this.simpleRenderers.length)
                    for (let t = 0; t < this.simpleRenderers.length; t++)
                        if (this.token.type == "simpleRule" + (t + 1)) return this.simpleRenderers[t].call(this.renderer, this.token.execArr);
                if (t = `Token with "${this.token.type}" type was not found.`, !this.options.silent) throw new Error(t);
                console.log(t)
        }
    }
}
class ie {
    static setOptions(t) {
        return Object.assign(this.options, t), this
    }
    static setBlockRule(t, e = (() => "")) {
        return ae.simpleRules.push(t), this.simpleRenderers.push(e), this
    }
    static parse(t, e = this.options) {
        try {
            var {
                tokens: r,
                links: s
            } = this.callBlockLexer(t, e);
            return this.callParser(r, s, e)
        } catch (t) {
            return this.callMe(t)
        }
    }
    static debug(t, e = this.options) {
        var {
            tokens: t,
            links: r
        } = this.callBlockLexer(t, e);
        let s = t.slice();
        return (e = new oe(e)).simpleRenderers = this.simpleRenderers, e = e.debug(r, t), {
            tokens: s = s.map((t => {
                t.type = wt[t.type] || t.type;
                var e = t.line;
                return delete t.line, e ? Object.assign({
                    line: e
                }, t) : t
            })),
            links: r,
            result: e
        }
    }
    static callBlockLexer(t = "", e) {
        if ("string" != typeof t) throw new Error(`Expected that the 'src' parameter would have a 'string' type, got '${typeof t}'`);
        return t = t.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n").replace(/^ +$/gm, ""), ae.lex(t, e, !0)
    }
    static callParser(t, e, r) {
        var s;
        return this.simpleRenderers.length ? ((s = new oe(r)).simpleRenderers = this.simpleRenderers, s.parse(e, t)) : oe.parse(t, e, r)
    }
    static callMe(t) {
        if (t.message += "\nPlease report this to https://github.com/ts-stack/markdown", this.options.silent) return "<p>An error occured:</p><pre>" + this.options.escape(t.message + "", !0) + "</pre>";
        throw t
    }
}
ie.options = new class {
    constructor() {
        this.gfm = !0, this.tables = !0, this.breaks = !1, this.pedantic = !1, this.sanitize = !1, this.mangle = !0, this.smartLists = !1, this.silent = !1, this.langPrefix = "lang-", this.smartypants = !1, this.headerPrefix = "", this.xhtml = !1, this.escape = te, this.unescape = ee
    }
}, ie.simpleRenderers = [];
class ae {
    constructor(t, e) {
        this.staticThis = t, this.links = {}, this.tokens = [], this.options = e || ie.options, this.setRules()
    }
    static lex(t, e, r, s) {
        return new this(this, e).getTokens(t, r, s)
    }
    static getRulesBase() {
        var t, e;
        return this.rulesBase || ((t = {
            newline: /^\n+/,
            code: /^( {4}[^\n]+\n*)+/,
            hr: /^( *[-*_]){3,} *(?:\n+|$)/,
            heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
            lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
            blockquote: /^( *>[^\n]+(\n[^\n]+)*\n*)+/,
            list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
            html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
            paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
            text: /^[^\n]+/,
            bullet: /(?:[*+-]|\d+\.)/,
            item: /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/
        }).item = new Yt(t.item, "gm").setGroup(/bull/g, t.bullet).getRegexp(), t.list = new Yt(t.list).setGroup(/bull/g, t.bullet).setGroup("hr", "\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))").setGroup("def", "\\n+(?=" + t.def.source + ")").getRegexp(), e = "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b", t.html = new Yt(t.html).setGroup("comment", /<!--[\s\S]*?-->/).setGroup("closed", /<(tag)[\s\S]+?<\/\1>/).setGroup("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/).setGroup(/tag/g, e).getRegexp(), t.paragraph = new Yt(t.paragraph).setGroup("hr", t.hr).setGroup("heading", t.heading).setGroup("lheading", t.lheading).setGroup("blockquote", t.blockquote).setGroup("tag", "<" + e).setGroup("def", t.def).getRegexp(), this.rulesBase = t)
    }
    static getRulesGfm() {
        var t, e, r, s;
        return this.rulesGfm || (t = this.getRulesBase(), r = (e = Object.assign(Object.assign({}, t), {
            fences: /^ *(`{3,}|~{3,})[ \.]*((\S+)? *[^\n]*)\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
            paragraph: /^/,
            heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
        })).fences.source.replace("\\1", "\\2"), s = t.list.source.replace("\\1", "\\3"), e.paragraph = new Yt(t.paragraph).setGroup("(?!", `(?!${r}|${s}|`).getRegexp(), this.rulesGfm = e)
    }
    static getRulesTable() {
        return this.rulesTables || (this.rulesTables = Object.assign(Object.assign({}, this.getRulesGfm()), {
            nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
            table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
        }))
    }
    setRules() {
        this.options.gfm ? this.options.tables ? this.rules = this.staticThis.getRulesTable() : this.rules = this.staticThis.getRulesGfm() : this.rules = this.staticThis.getRulesBase(), this.hasRulesGfm = void 0 !== this.rules.fences, this.hasRulesTables = void 0 !== this.rules.table
    }
    getTokens(t, e, r) {
        let s, n = t;
        t: for (; n;)
            if ((s = this.rules.newline.exec(n)) && (n = n.substring(s[0].length), 1 < s[0].length) && this.tokens.push({
                    type: wt.space
                }), s = this.rules.code.exec(n)) {
                n = n.substring(s[0].length);
                var o = s[0].replace(/^ {4}/gm, "");
                this.tokens.push({
                    type: wt.code,
                    text: this.options.pedantic ? o : o.replace(/\n+$/, "")
                })
            } else if (this.hasRulesGfm && (s = this.rules.fences.exec(n))) n = n.substring(s[0].length), this.tokens.push({
            type: wt.code,
            meta: s[2],
            lang: s[3],
            text: s[4] || ""
        });
        else if (s = this.rules.heading.exec(n)) n = n.substring(s[0].length), this.tokens.push({
            type: wt.heading,
            depth: s[1].length,
            text: s[2]
        });
        else if (e && this.hasRulesTables && (s = this.rules.nptable.exec(n))) {
            n = n.substring(s[0].length);
            var i = {
                type: wt.table,
                header: s[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                align: s[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                cells: []
            };
            for (let t = 0; t < i.align.length; t++) /^ *-+: *$/.test(i.align[t]) ? i.align[t] = "right" : /^ *:-+: *$/.test(i.align[t]) ? i.align[t] = "center" : /^ *:-+ *$/.test(i.align[t]) ? i.align[t] = "left" : i.align[t] = null;
            var a = s[3].replace(/\n$/, "").split("\n");
            for (let t = 0; t < a.length; t++) i.cells[t] = a[t].split(/ *\| */);
            this.tokens.push(i)
        } else if (s = this.rules.lheading.exec(n)) n = n.substring(s[0].length), this.tokens.push({
            type: wt.heading,
            depth: "=" === s[2] ? 1 : 2,
            text: s[1]
        });
        else if (s = this.rules.hr.exec(n)) n = n.substring(s[0].length), this.tokens.push({
            type: wt.hr
        });
        else if (s = this.rules.blockquote.exec(n)) n = n.substring(s[0].length), this.tokens.push({
            type: wt.blockquoteStart
        }), o = s[0].replace(/^ *> ?/gm, ""), this.getTokens(o), this.tokens.push({
            type: wt.blockquoteEnd
        });
        else if (s = this.rules.list.exec(n)) {
            n = n.substring(s[0].length);
            var l, c = s[2],
                h = (this.tokens.push({
                    type: wt.listStart,
                    ordered: 1 < c.length
                }), s[0].match(this.rules.item)),
                u = h.length;
            let t, e = !1;
            for (let s = 0; s < u; s++) {
                let o = h[s];
                l = o.length, -1 !== (o = o.replace(/^ *([*+-]|\d+\.) +/, "")).indexOf("\n ") && (l -= o.length, o = this.options.pedantic ? o.replace(/^ {1,4}/gm, "") : o.replace(new RegExp("^ {1," + l + "}", "gm"), "")), !this.options.smartLists || s === u - 1 || c === (l = this.staticThis.getRulesBase().bullet.exec(h[s + 1])[0]) || 1 < c.length && 1 < l.length || (n = h.slice(s + 1).join("\n") + n, s = u - 1), t = e || /\n\n(?!\s*$)/.test(o), s !== u - 1 && (e = "\n" === o.charAt(o.length - 1), t = t || e), this.tokens.push({
                    type: t ? wt.looseItemStart : wt.listItemStart
                }), this.getTokens(o, !1, r), this.tokens.push({
                    type: wt.listItemEnd
                })
            }
            this.tokens.push({
                type: wt.listEnd
            })
        } else if (s = this.rules.html.exec(n)) {
            n = n.substring(s[0].length);
            var p = s[1];
            this.tokens.push({
                type: this.options.sanitize ? wt.paragraph : wt.html,
                pre: !this.options.sanitizer && ("pre" === p || "script" === p || "style" === p),
                text: s[0]
            })
        } else if (e && (s = this.rules.def.exec(n))) n = n.substring(s[0].length), this.links[s[1].toLowerCase()] = {
            href: s[2],
            title: s[3]
        };
        else if (e && this.hasRulesTables && (s = this.rules.table.exec(n))) {
            n = n.substring(s[0].length);
            var d = {
                type: wt.table,
                header: s[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                align: s[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                cells: []
            };
            for (let t = 0; t < d.align.length; t++) /^ *-+: *$/.test(d.align[t]) ? d.align[t] = "right" : /^ *:-+: *$/.test(d.align[t]) ? d.align[t] = "center" : /^ *:-+ *$/.test(d.align[t]) ? d.align[t] = "left" : d.align[t] = null;
            var f = s[3].replace(/(?: *\| *)?\n$/, "").split("\n");
            for (let t = 0; t < f.length; t++) d.cells[t] = f[t].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
            this.tokens.push(d)
        } else {
            if (this.staticThis.simpleRules.length) {
                var g = this.staticThis.simpleRules;
                for (let t = 0; t < g.length; t++)
                    if (s = g[t].exec(n)) {
                        n = n.substring(s[0].length);
                        var b = "simpleRule" + (t + 1);
                        this.tokens.push({
                            type: b,
                            execArr: s
                        });
                        continue t
                    }
            }
            if (e && (s = this.rules.paragraph.exec(n))) n = n.substring(s[0].length), "\n" === s[1].slice(-1) ? this.tokens.push({
                type: wt.paragraph,
                text: s[1].slice(0, -1)
            }) : this.tokens.push({
                type: 0 < this.tokens.length ? wt.paragraph : wt.text,
                text: s[1]
            });
            else if (s = this.rules.text.exec(n)) n = n.substring(s[0].length), this.tokens.push({
                type: wt.text,
                text: s[0]
            });
            else if (n) throw new Error("Infinite loop on byte: " + n.charCodeAt(0) + `, near text '${n.slice(0,30)}...'`)
        }
        return {
            tokens: this.tokens,
            links: this.links
        }
    }
}
ae.simpleRules = [], ae.rulesBase = null, ae.rulesGfm = null, ae.rulesTables = null;
const le = st('<div class="flex justify-end mb-2 items-end guest-container"><span class="px-4 py-2 mr-2 whitespace-pre-wrap max-w-full chatbot-guest-bubble" data-testid="guest-bubble">'),
    ce = (ie.setOptions({
        isNoP: !0
    }), t => {
        let e;
        A((() => {
            e && (e.innerHTML = ie.parse(t.message))
        }));
        {
            const r = le(),
                s = r.firstChild;
            r.style.setProperty("margin-left", "50px");
            return "function" == typeof e ? lt(e, s) : e = s, s.style.setProperty("border-radius", "6px"), ct(r, F(X, {
                get when() {
                    return t.showAvatar
                },
                get children() {
                    return F(Vt, {
                        get initialAvatarSrc() {
                            return t.avatarSrc
                        }
                    })
                }
            }), null), k((e => {
                var r = t.backgroundColor ?? "#3B81F6",
                    n = t.textColor ?? "#ffffff";
                return r !== e._v$ && (null != (e._v$ = r) ? s.style.setProperty("background-color", r) : s.style.removeProperty("background-color")), n !== e._v$2 && (null != (e._v$2 = n) ? s.style.setProperty("color", n) : s.style.removeProperty("color")), e
            }), {
                _v$: void 0,
                _v$2: void 0
            }), r
        }
    }),
    he = st('<div class="flex justify-start mb-2 items-start host-container"><span class="px-4 py-2 ml-2 whitespace-pre-wrap max-w-full chatbot-host-bubble" data-testid="host-bubble">'),
    ue = (ie.setOptions({
        isNoP: !0
    }), t => {
        let e;
        A((() => {
            e && (e.innerHTML = ie.parse(t.message))
        }));
        {
            const r = he(),
                s = r.firstChild;
            r.style.setProperty("margin-right", "50px"), ct(r, F(X, {
                get when() {
                    return t.showAvatar
                },
                get children() {
                    return F(Vt, {
                        get initialAvatarSrc() {
                            return t.avatarSrc
                        }
                    })
                }
            }), s);
            return "function" == typeof e ? lt(e, s) : e = s, s.style.setProperty("border-radius", "6px"), k((e => {
                var r = t.backgroundColor ?? "#f7f8ff",
                    n = t.textColor ?? "#303235";
                return r !== e._v$ && (null != (e._v$ = r) ? s.style.setProperty("background-color", r) : s.style.removeProperty("background-color")), n !== e._v$2 && (null != (e._v$2 = n) ? s.style.setProperty("color", n) : s.style.removeProperty("color")), e
            }), {
                _v$: void 0,
                _v$2: void 0
            }), r
        }
    }),
    pe = st('<div class="flex items-center"><div class="w-2 h-2 mr-1 rounded-full bubble1"></div><div class="w-2 h-2 mr-1 rounded-full bubble2"></div><div class="w-2 h-2 rounded-full bubble3">'),
    de = () => pe(),
    fe = st('<div class="flex justify-start mb-2 items-start animate-fade-in host-container"><span class="px-4 py-4 ml-2 whitespace-pre-wrap max-w-full chatbot-host-bubble" data-testid="host-bubble">'),
    ge = () => {
        return ct((t = fe()).firstChild, F(de, {})), t;
        var t
    },
    be = st('<div data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="flex justify-start mb-2 items-start animate-fade-in host-container hover:brightness-90 active:brightness-75"><span class="px-2 py-1 ml-1 whitespace-pre-wrap max-w-full chatbot-host-bubble" data-testid="host-bubble">'),
    ye = t => {
        return r = (e = be()).firstChild, e.$$click = () => t.onSourceClick?.(), r.style.setProperty("width", "max-content"), r.style.setProperty("max-width", "80px"), r.style.setProperty("font-size", "13px"), r.style.setProperty("border-radius", "15px"), r.style.setProperty("cursor", "pointer"), r.style.setProperty("text-overflow", "ellipsis"), r.style.setProperty("overflow", "hidden"), r.style.setProperty("white-space", "nowrap"), ct(r, (() => t.pageContent)), e;
        var e, r
    },
    me = (nt(["click"]), st('<span>Powered by<a href="https://livedoc.cn" target="_blank" rel="noopener noreferrer" class="lite-badge" id="lite-badge"><span> LiveDOC')),
    ve = "#303235",
    we = t => {
        let e, r;
        const s = r => {
            r.forEach((r => {
                r.removedNodes.forEach((r => {
                    "id" in r && e && "lite-badge" == r.id && (console.log("Sorry, you can't remove the brand 😅"), t.botContainer?.append(e))
                }))
            }))
        };
        A((() => {
            document && t.botContainer && (r = new MutationObserver(s)).observe(t.botContainer, {
                subtree: !1,
                childList: !0
            })
        })), O((() => {
            r && r.disconnect()
        }));
        {
            const r = me(),
                s = r.firstChild.nextSibling;
            r.style.setProperty("font-size", "13px"), r.style.setProperty("position", "absolute"), r.style.setProperty("bottom", "0"), r.style.setProperty("padding", "10px"), r.style.setProperty("margin", "auto"), r.style.setProperty("width", "100%"), r.style.setProperty("text-align", "center");
            return "function" == typeof e ? lt(e, s) : e = s, s.style.setProperty("font-weight", "bold"), k((e => {
                var n = t.poweredByTextColor ?? ve,
                    o = t.badgeBackgroundColor ?? "#ffffff",
                    i = t.poweredByTextColor ?? ve;
                return n !== e._v$ && (null != (e._v$ = n) ? r.style.setProperty("color", n) : r.style.removeProperty("color")), o !== e._v$2 && (null != (e._v$2 = o) ? r.style.setProperty("background-color", o) : r.style.removeProperty("background-color")), i !== e._v$3 && (null != (e._v$3 = i) ? s.style.setProperty("color", i) : s.style.removeProperty("color")), e
            }), {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }), r
        }
    },
    xe = Object.create(null),
    ke = (xe.open = "0", xe.close = "1", xe.ping = "2", xe.pong = "3", xe.message = "4", xe.upgrade = "5", xe.noop = "6", Object.create(null)),
    _e = (Object.keys(xe).forEach((t => {
        ke[xe[t]] = t
    })), {
        type: "error",
        data: "parser error"
    }),
    Ce = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === Object.prototype.toString.call(Blob),
    Se = "function" == typeof ArrayBuffer,
    Ae = ({
        type: t,
        data: e
    }, r, s) => Ce && e instanceof Blob ? r ? s(e) : Oe(e, s) : Se && (e instanceof ArrayBuffer || (t => "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : t && t.buffer instanceof ArrayBuffer)(e)) ? r ? s(e) : Oe(new Blob([e]), s) : s(xe[t] + (e || "")),
    Oe = (t, e) => {
        const r = new FileReader;
        return r.onload = function() {
            var t = r.result.split(",")[1];
            e("b" + (t || ""))
        }, r.readAsDataURL(t)
    },
    Ee = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    Pe = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256);
for (let t = 0; t < 64; t++) Pe[Ee.charCodeAt(t)] = t;
const $e = "function" == typeof ArrayBuffer,
    Re = (t, e) => {
        var r;
        return "string" != typeof t ? {
            type: "message",
            data: Be(t, e)
        } : "b" === (r = t.charAt(0)) ? {
            type: "message",
            data: Te(t.substring(1), e)
        } : ke[r] ? 1 < t.length ? {
            type: ke[r],
            data: t.substring(1)
        } : {
            type: ke[r]
        } : _e
    },
    Te = (t, e) => {
        var r;
        return $e ? (r = (t => {
            let e, r, s, n, o, i = .75 * t.length,
                a = t.length,
                l = 0;
            "=" === t[t.length - 1] && (i--, "=" === t[t.length - 2]) && i--;
            var c = new ArrayBuffer(i),
                h = new Uint8Array(c);
            for (e = 0; e < a; e += 4) r = Pe[t.charCodeAt(e)], s = Pe[t.charCodeAt(e + 1)], n = Pe[t.charCodeAt(e + 2)], o = Pe[t.charCodeAt(e + 3)], h[l++] = r << 2 | s >> 4, h[l++] = (15 & s) << 4 | n >> 2, h[l++] = (3 & n) << 6 | 63 & o;
            return c
        })(t), Be(r, e)) : {
            base64: !0,
            data: t
        }
    },
    Be = (t, e) => "blob" === e && t instanceof ArrayBuffer ? new Blob([t]) : t,
    Le = String.fromCharCode(30);

function je(t) {
    if (t) return function(t) {
        for (var e in je.prototype) t[e] = je.prototype[e];
        return t
    }(t)
}
je.prototype.on = je.prototype.addEventListener = function(t, e) {
    return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this
}, je.prototype.once = function(t, e) {
    function r() {
        this.off(t, r), e.apply(this, arguments)
    }
    return r.fn = e, this.on(t, r), this
}, je.prototype.off = je.prototype.removeListener = je.prototype.removeAllListeners = je.prototype.removeEventListener = function(t, e) {
    if (this._callbacks = this._callbacks || {}, 0 == arguments.length) this._callbacks = {};
    else {
        var r = this._callbacks["$" + t];
        if (r)
            if (1 == arguments.length) delete this._callbacks["$" + t];
            else {
                for (var s, n = 0; n < r.length; n++)
                    if ((s = r[n]) === e || s.fn === e) {
                        r.splice(n, 1);
                        break
                    } 0 === r.length && delete this._callbacks["$" + t]
            }
    }
    return this
}, je.prototype.emit = function(t) {
    this._callbacks = this._callbacks || {};
    for (var e = new Array(arguments.length - 1), r = this._callbacks["$" + t], s = 1; s < arguments.length; s++) e[s - 1] = arguments[s];
    if (r) {
        s = 0;
        for (var n = (r = r.slice(0)).length; s < n; ++s) r[s].apply(this, e)
    }
    return this
}, je.prototype.emitReserved = je.prototype.emit, je.prototype.listeners = function(t) {
    return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || []
}, je.prototype.hasListeners = function(t) {
    return !!this.listeners(t).length
};
const Ne = "undefined" != typeof self ? self : "undefined" != typeof window ? window : Function("return this")();

function ze(t, ...e) {
    return e.reduce(((e, r) => (t.hasOwnProperty(r) && (e[r] = t[r]), e)), {})
}
const Me = Ne.setTimeout,
    Ie = Ne.clearTimeout;

function qe(t, e) {
    e.useNativeTimers ? (t.setTimeoutFn = Me.bind(Ne), t.clearTimeoutFn = Ie.bind(Ne)) : (t.setTimeoutFn = Ne.setTimeout.bind(Ne), t.clearTimeoutFn = Ne.clearTimeout.bind(Ne))
}

function De(t) {
    return "string" == typeof t ? function(t) {
        let e, r = 0;
        for (let s = 0, n = t.length; s < n; s++)(e = t.charCodeAt(s)) < 128 ? r += 1 : e < 2048 ? r += 2 : e < 55296 || 57344 <= e ? r += 3 : (s++, r += 4);
        return r
    }(t) : Math.ceil(1.33 * (t.byteLength || t.size))
}
class Fe extends Error {
    constructor(t, e, r) {
        super(t), this.description = e, this.context = r, this.type = "TransportError"
    }
}
class Ge extends je {
    constructor(t) {
        super(), this.writable = !1, qe(this, t), this.opts = t, this.query = t.query, this.socket = t.socket
    }
    onError(t, e, r) {
        return super.emitReserved("error", new Fe(t, e, r)), this
    }
    open() {
        return this.readyState = "opening", this.doOpen(), this
    }
    close() {
        return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this
    }
    send(t) {
        "open" === this.readyState && this.write(t)
    }
    onOpen() {
        this.readyState = "open", this.writable = !0, super.emitReserved("open")
    }
    onData(t) {
        t = Re(t, this.socket.binaryType), this.onPacket(t)
    }
    onPacket(t) {
        super.emitReserved("packet", t)
    }
    onClose(t) {
        this.readyState = "closed", super.emitReserved("close", t)
    }
    pause(t) {}
}
const He = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
    We = 64,
    Ue = {};
let Ve, Ye = 0,
    Xe = 0;

function Ke(t) {
    let e = "";
    for (; e = He[t % We] + e, 0 < (t = Math.floor(t / We)););
    return e
}

function Je() {
    var t = Ke(+new Date);
    return t !== Ve ? (Ye = 0, Ve = t) : t + "." + Ke(Ye++)
}
for (; Xe < We; Xe++) Ue[He[Xe]] = Xe;

function Qe(t) {
    let e = "";
    for (var r in t) t.hasOwnProperty(r) && (e.length && (e += "&"), e += encodeURIComponent(r) + "=" + encodeURIComponent(t[r]));
    return e
}
let Ze = !1;
try {
    Ze = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
} catch (re) {}
const tr = Ze;

function er(t) {
    t = t.xdomain;
    try {
        if ("undefined" != typeof XMLHttpRequest && (!t || tr)) return new XMLHttpRequest
    } catch (t) {}
    if (!t) try {
        return new(Ne[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
    } catch (t) {}
}

function rr() {}
const sr = null != new er({
    xdomain: !1
}).responseType;
class nr extends je {
    constructor(t, e) {
        super(), qe(this, e), this.opts = e, this.method = e.method || "GET", this.uri = t, this.async = !1 !== e.async, this.data = void 0 !== e.data ? e.data : null, this.create()
    }
    create() {
        var t = ze(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        t.xdomain = !!this.opts.xd, t.xscheme = !!this.opts.xs;
        const e = this.xhr = new er(t);
        try {
            e.open(this.method, this.uri, this.async);
            try {
                if (this.opts.extraHeaders)
                    for (var r in e.setDisableHeaderCheck && e.setDisableHeaderCheck(!0), this.opts.extraHeaders) this.opts.extraHeaders.hasOwnProperty(r) && e.setRequestHeader(r, this.opts.extraHeaders[r])
            } catch (t) {}
            if ("POST" === this.method) try {
                e.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
            } catch (t) {}
            try {
                e.setRequestHeader("Accept", "*/*")
            } catch (t) {}
            "withCredentials" in e && (e.withCredentials = this.opts.withCredentials), this.opts.requestTimeout && (e.timeout = this.opts.requestTimeout), e.onreadystatechange = () => {
                4 === e.readyState && (200 === e.status || 1223 === e.status ? this.onLoad() : this.setTimeoutFn((() => {
                    this.onError("number" == typeof e.status ? e.status : 0)
                }), 0))
            }, e.send(this.data)
        } catch (t) {
            return void this.setTimeoutFn((() => {
                this.onError(t)
            }), 0)
        }
        "undefined" != typeof document && (this.index = nr.requestsCount++, nr.requests[this.index] = this)
    }
    onError(t) {
        this.emitReserved("error", t, this.xhr), this.cleanup(!0)
    }
    cleanup(t) {
        if (void 0 !== this.xhr && null !== this.xhr) {
            if (this.xhr.onreadystatechange = rr, t) try {
                this.xhr.abort()
            } catch (t) {}
            "undefined" != typeof document && delete nr.requests[this.index], this.xhr = null
        }
    }
    onLoad() {
        var t = this.xhr.responseText;
        null !== t && (this.emitReserved("data", t), this.emitReserved("success"), this.cleanup())
    }
    abort() {
        this.cleanup()
    }
}
if (nr.requestsCount = 0, nr.requests = {}, "undefined" != typeof document)
    if ("function" == typeof attachEvent) attachEvent("onunload", or);
    else if ("function" == typeof addEventListener) {
    addEventListener("onpagehide" in Ne ? "pagehide" : "unload", or, !1)
}

function or() {
    for (var t in nr.requests) nr.requests.hasOwnProperty(t) && nr.requests[t].abort()
}
const ir = "function" == typeof Promise && "function" == typeof Promise.resolve ? t => Promise.resolve().then(t) : (t, e) => e(t, 0),
    ar = Ne.WebSocket || Ne.MozWebSocket,
    lr = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase();
const cr = {
        websocket: class extends Ge {
            constructor(t) {
                super(t), this.supportsBinary = !t.forceBase64
            }
            get name() {
                return "websocket"
            }
            doOpen() {
                if (this.check()) {
                    var t = this.uri(),
                        e = this.opts.protocols,
                        r = lr ? {} : ze(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
                    this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
                    try {
                        this.ws = lr ? new ar(t, e, r) : e ? new ar(t, e) : new ar(t)
                    } catch (t) {
                        return this.emitReserved("error", t)
                    }
                    this.ws.binaryType = this.socket.binaryType || "arraybuffer", this.addEventListeners()
                }
            }
            addEventListeners() {
                this.ws.onopen = () => {
                    this.opts.autoUnref && this.ws._socket.unref(), this.onOpen()
                }, this.ws.onclose = t => this.onClose({
                    description: "websocket connection closed",
                    context: t
                }), this.ws.onmessage = t => this.onData(t.data), this.ws.onerror = t => this.onError("websocket error", t)
            }
            write(t) {
                this.writable = !1;
                for (let r = 0; r < t.length; r++) {
                    var e = t[r];
                    const s = r === t.length - 1;
                    Ae(e, this.supportsBinary, (t => {
                        try {
                            this.ws.send(t)
                        } catch (t) {}
                        s && ir((() => {
                            this.writable = !0, this.emitReserved("drain")
                        }), this.setTimeoutFn)
                    }))
                }
            }
            doClose() {
                void 0 !== this.ws && (this.ws.close(), this.ws = null)
            }
            uri() {
                var t = this.query || {},
                    e = this.opts.secure ? "wss" : "ws";
                let r = "";
                return this.opts.port && ("wss" == e && 443 !== Number(this.opts.port) || "ws" == e && 80 !== Number(this.opts.port)) && (r = ":" + this.opts.port), this.opts.timestampRequests && (t[this.opts.timestampParam] = Je()), this.supportsBinary || (t.b64 = 1), t = Qe(t), e + "://" + (-1 !== this.opts.hostname.indexOf(":") ? "[" + this.opts.hostname + "]" : this.opts.hostname) + r + this.opts.path + (t.length ? "?" + t : "")
            }
            check() {
                return !!ar
            }
        },
        polling: class extends Ge {
            constructor(t) {
                if (super(t), this.polling = !1, "undefined" != typeof location) {
                    var e = "https:" === location.protocol;
                    let r = location.port;
                    r = r || (e ? "443" : "80"), this.xd = "undefined" != typeof location && t.hostname !== location.hostname || r !== t.port, this.xs = t.secure !== e
                }
                e = t && t.forceBase64, this.supportsBinary = sr && !e
            }
            get name() {
                return "polling"
            }
            doOpen() {
                this.poll()
            }
            pause(t) {
                this.readyState = "pausing";
                const e = () => {
                    this.readyState = "paused", t()
                };
                if (this.polling || !this.writable) {
                    let t = 0;
                    this.polling && (t++, this.once("pollComplete", (function() {
                        --t || e()
                    }))), this.writable || (t++, this.once("drain", (function() {
                        --t || e()
                    })))
                } else e()
            }
            poll() {
                this.polling = !0, this.doPoll(), this.emitReserved("poll")
            }
            onData(t) {
                ((t, e) => {
                    var r = t.split(Le),
                        s = [];
                    for (let t = 0; t < r.length; t++) {
                        var n = Re(r[t], e);
                        if (s.push(n), "error" === n.type) break
                    }
                    return s
                })(t, this.socket.binaryType).forEach((t => {
                    if ("opening" === this.readyState && "open" === t.type && this.onOpen(), "close" === t.type) return this.onClose({
                        description: "transport closed by the server"
                    }), !1;
                    this.onPacket(t)
                })), "closed" !== this.readyState && (this.polling = !1, this.emitReserved("pollComplete"), "open" === this.readyState) && this.poll()
            }
            doClose() {
                var t = () => {
                    this.write([{
                        type: "close"
                    }])
                };
                "open" === this.readyState ? t() : this.once("open", t)
            }
            write(t) {
                this.writable = !1, ((t, e) => {
                    const r = t.length,
                        s = new Array(r);
                    let n = 0;
                    t.forEach(((t, o) => {
                        Ae(t, !1, (t => {
                            s[o] = t, ++n === r && e(s.join(Le))
                        }))
                    }))
                })(t, (t => {
                    this.doWrite(t, (() => {
                        this.writable = !0, this.emitReserved("drain")
                    }))
                }))
            }
            uri() {
                var t = this.query || {},
                    e = this.opts.secure ? "https" : "http";
                let r = "";
                return !1 !== this.opts.timestampRequests && (t[this.opts.timestampParam] = Je()), this.supportsBinary || t.sid || (t.b64 = 1), this.opts.port && ("https" == e && 443 !== Number(this.opts.port) || "http" == e && 80 !== Number(this.opts.port)) && (r = ":" + this.opts.port), t = Qe(t), e + "://" + (-1 !== this.opts.hostname.indexOf(":") ? "[" + this.opts.hostname + "]" : this.opts.hostname) + r + this.opts.path + (t.length ? "?" + t : "")
            }
            request(t = {}) {
                return Object.assign(t, {
                    xd: this.xd,
                    xs: this.xs
                }, this.opts), new nr(this.uri(), t)
            }
            doWrite(t, e) {
                (t = this.request({
                    method: "POST",
                    data: t
                })).on("success", e), t.on("error", ((t, e) => {
                    this.onError("xhr post error", t, e)
                }))
            }
            doPoll() {
                var t = this.request();
                t.on("data", this.onData.bind(this)), t.on("error", ((t, e) => {
                    this.onError("xhr poll error", t, e)
                })), this.pollXhr = t
            }
        }
    },
    hr = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
    ur = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];

function pr(t) {
    var e = t,
        r = t.indexOf("["),
        s = t.indexOf("]"); - 1 != r && -1 != s && (t = t.substring(0, r) + t.substring(r, s).replace(/:/g, ";") + t.substring(s, t.length));
    let n = hr.exec(t || ""),
        o = {},
        i = 14;
    for (; i--;) o[ur[i]] = n[i] || "";
    return -1 != r && -1 != s && (o.source = e, o.host = o.host.substring(1, o.host.length - 1).replace(/;/g, ":"), o.authority = o.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), o.ipv6uri = !0), o.pathNames = function(t, e) {
        var r = e.replace(/\/{2,9}/g, "/").split("/");
        return "/" != e.slice(0, 1) && 0 !== e.length || r.splice(0, 1), "/" == e.slice(-1) && r.splice(r.length - 1, 1), r
    }(0, o.path), o.queryKey = function(t, e) {
        const r = {};
        return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, (function(t, e, s) {
            e && (r[e] = s)
        })), r
    }(0, o.query), o
}
let dr = class t extends je {
    constructor(t, e = {}) {
        super(), this.writeBuffer = [], t && "object" == typeof t && (e = t, t = null), t ? (t = pr(t), e.hostname = t.host, e.secure = "https" === t.protocol || "wss" === t.protocol, e.port = t.port, t.query && (e.query = t.query)) : e.host && (e.hostname = pr(e.host).host), qe(this, e), this.secure = null != e.secure ? e.secure : "undefined" != typeof location && "https:" === location.protocol, e.hostname && !e.port && (e.port = this.secure ? "443" : "80"), this.hostname = e.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), this.port = e.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? "443" : "80"), this.transports = e.transports || ["polling", "websocket"], this.writeBuffer = [], this.prevBufferLen = 0, this.opts = Object.assign({
            path: "/engine.io",
            agent: !1,
            withCredentials: !1,
            upgrade: !0,
            timestampParam: "t",
            rememberUpgrade: !1,
            addTrailingSlash: !0,
            rejectUnauthorized: !0,
            perMessageDeflate: {
                threshold: 1024
            },
            transportOptions: {},
            closeOnBeforeunload: !0
        }, e), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), "string" == typeof this.opts.query && (this.opts.query = function(t) {
            var e = {},
                r = t.split("&");
            for (let t = 0, n = r.length; t < n; t++) {
                var s = r[t].split("=");
                e[decodeURIComponent(s[0])] = decodeURIComponent(s[1])
            }
            return e
        }(this.opts.query)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingTimeoutTimer = null, "function" == typeof addEventListener && (this.opts.closeOnBeforeunload && (this.beforeunloadEventListener = () => {
            this.transport && (this.transport.removeAllListeners(), this.transport.close())
        }, addEventListener("beforeunload", this.beforeunloadEventListener, !1)), "localhost" !== this.hostname) && (this.offlineEventListener = () => {
            this.onClose("transport close", {
                description: "network connection lost"
            })
        }, addEventListener("offline", this.offlineEventListener, !1)), this.open()
    }
    createTransport(t) {
        var e = ((e = Object.assign({}, this.opts.query)).EIO = 4, e.transport = t, this.id && (e.sid = this.id), Object.assign({}, this.opts.transportOptions[t], this.opts, {
            query: e,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port
        }));
        return new cr[t](e)
    }
    open() {
        let e;
        if (this.opts.rememberUpgrade && t.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) e = "websocket";
        else {
            if (0 === this.transports.length) return void this.setTimeoutFn((() => {
                this.emitReserved("error", "No transports available")
            }), 0);
            e = this.transports[0]
        }
        this.readyState = "opening";
        try {
            e = this.createTransport(e)
        } catch (e) {
            return this.transports.shift(), void this.open()
        }
        e.open(), this.setTransport(e)
    }
    setTransport(t) {
        this.transport && this.transport.removeAllListeners(), (this.transport = t).on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", (t => this.onClose("transport close", t)))
    }
    probe(e) {
        let r = this.createTransport(e),
            s = !1;
        t.priorWebsocketSuccess = !1;
        const n = () => {
            s || (r.send([{
                type: "ping",
                data: "probe"
            }]), r.once("packet", (e => {
                s || ("pong" === e.type && "probe" === e.data ? (this.upgrading = !0, this.emitReserved("upgrading", r), r && (t.priorWebsocketSuccess = "websocket" === r.name, this.transport.pause((() => {
                    s || "closed" !== this.readyState && (h(), this.setTransport(r), r.send([{
                        type: "upgrade"
                    }]), this.emitReserved("upgrade", r), r = null, this.upgrading = !1, this.flush())
                })))) : ((e = new Error("probe error")).transport = r.name, this.emitReserved("upgradeError", e)))
            })))
        };

        function o() {
            s || (s = !0, h(), r.close(), r = null)
        }
        const i = t => {
            (t = new Error("probe error: " + t)).transport = r.name, o(), this.emitReserved("upgradeError", t)
        };

        function a() {
            i("transport closed")
        }

        function l() {
            i("socket closed")
        }

        function c(t) {
            r && t.name !== r.name && o()
        }
        const h = () => {
            r.removeListener("open", n), r.removeListener("error", i), r.removeListener("close", a), this.off("close", l), this.off("upgrading", c)
        };
        r.once("open", n), r.once("error", i), r.once("close", a), this.once("close", l), this.once("upgrading", c), r.open()
    }
    onOpen() {
        if (this.readyState = "open", t.priorWebsocketSuccess = "websocket" === this.transport.name, this.emitReserved("open"), this.flush(), "open" === this.readyState && this.opts.upgrade) {
            let t = 0;
            for (var e = this.upgrades.length; t < e; t++) this.probe(this.upgrades[t])
        }
    }
    onPacket(t) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (this.emitReserved("packet", t), this.emitReserved("heartbeat"), t.type) {
            case "open":
                this.onHandshake(JSON.parse(t.data));
                break;
            case "ping":
                this.resetPingTimeout(), this.sendPacket("pong"), this.emitReserved("ping"), this.emitReserved("pong");
                break;
            case "error":
                var e = new Error("server error");
                e.code = t.data, this.onError(e);
                break;
            case "message":
                this.emitReserved("data", t.data), this.emitReserved("message", t.data)
        }
    }
    onHandshake(t) {
        this.emitReserved("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.maxPayload = t.maxPayload, this.onOpen(), "closed" !== this.readyState && this.resetPingTimeout()
    }
    resetPingTimeout() {
        this.clearTimeoutFn(this.pingTimeoutTimer), this.pingTimeoutTimer = this.setTimeoutFn((() => {
            this.onClose("ping timeout")
        }), this.pingInterval + this.pingTimeout), this.opts.autoUnref && this.pingTimeoutTimer.unref()
    }
    onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen), (this.prevBufferLen = 0) === this.writeBuffer.length ? this.emitReserved("drain") : this.flush()
    }
    flush() {
        var t;
        "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (t = this.getWritablePackets(), this.transport.send(t), this.prevBufferLen = t.length, this.emitReserved("flush"))
    }
    getWritablePackets() {
        if (this.maxPayload && "polling" === this.transport.name && 1 < this.writeBuffer.length) {
            let e = 1;
            for (let r = 0; r < this.writeBuffer.length; r++) {
                var t = this.writeBuffer[r].data;
                if (t && (e += De(t)), 0 < r && e > this.maxPayload) return this.writeBuffer.slice(0, r);
                e += 2
            }
        }
        return this.writeBuffer
    }
    write(t, e, r) {
        return this.sendPacket("message", t, e, r), this
    }
    send(t, e, r) {
        return this.sendPacket("message", t, e, r), this
    }
    sendPacket(t, e, r, s) {
        "function" == typeof e && (s = e, e = void 0), "function" == typeof r && (s = r, r = null), "closing" !== this.readyState && "closed" !== this.readyState && ((r = r || {}).compress = !1 !== r.compress, this.emitReserved("packetCreate", t = {
            type: t,
            data: e,
            options: r
        }), this.writeBuffer.push(t), s && this.once("flush", s), this.flush())
    }
    close() {
        const t = () => {
                this.onClose("forced close"), this.transport.close()
            },
            e = () => {
                this.off("upgrade", e), this.off("upgradeError", e), t()
            },
            r = () => {
                this.once("upgrade", e), this.once("upgradeError", e)
            };
        return "opening" !== this.readyState && "open" !== this.readyState || (this.readyState = "closing", this.writeBuffer.length ? this.once("drain", (() => {
            (this.upgrading ? r : t)()
        })) : (this.upgrading ? r : t)()), this
    }
    onError(e) {
        t.priorWebsocketSuccess = !1, this.emitReserved("error", e), this.onClose("transport error", e)
    }
    onClose(t, e) {
        "opening" !== this.readyState && "open" !== this.readyState && "closing" !== this.readyState || (this.clearTimeoutFn(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), "function" == typeof removeEventListener && (removeEventListener("beforeunload", this.beforeunloadEventListener, !1), removeEventListener("offline", this.offlineEventListener, !1)), this.readyState = "closed", this.id = null, this.emitReserved("close", t, e), this.writeBuffer = [], this.prevBufferLen = 0)
    }
    filterUpgrades(t) {
        var e = [];
        let r = 0;
        for (var s = t.length; r < s; r++) ~this.transports.indexOf(t[r]) && e.push(t[r]);
        return e
    }
};
dr.protocol = 4;
const fr = "function" == typeof ArrayBuffer,
    gr = t => "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer,
    br = Object.prototype.toString,
    yr = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === br.call(Blob),
    mr = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === br.call(File);

function vr(t) {
    return fr && (t instanceof ArrayBuffer || gr(t)) || yr && t instanceof Blob || mr && t instanceof File
}

function wr(t, e) {
    if (t && "object" == typeof t)
        if (Array.isArray(t)) {
            for (let e = 0, r = t.length; e < r; e++)
                if (wr(t[e])) return !0
        } else {
            if (vr(t)) return !0;
            if (t.toJSON && "function" == typeof t.toJSON && 1 === arguments.length) return wr(t.toJSON(), !0);
            for (const e in t)
                if (Object.prototype.hasOwnProperty.call(t, e) && wr(t[e])) return !0
        } return !1
}

function xr(t) {
    var e = [],
        r = t.data;
    return t.data = kr(r, e), t.attachments = e.length, {
        packet: t,
        buffers: e
    }
}

function kr(t, e) {
    if (!t) return t;
    var r;
    if (vr(t)) return r = {
        _placeholder: !0,
        num: e.length
    }, e.push(t), r;
    if (Array.isArray(t)) {
        var s = new Array(t.length);
        for (let r = 0; r < t.length; r++) s[r] = kr(t[r], e);
        return s
    }
    if ("object" != typeof t || t instanceof Date) return t;
    var n = {};
    for (const r in t) Object.prototype.hasOwnProperty.call(t, r) && (n[r] = kr(t[r], e));
    return n
}

function _r(t, e) {
    return t.data = Cr(t.data, e), delete t.attachments, t
}

function Cr(t, e) {
    if (t) {
        if (t && !0 === t._placeholder) {
            if ("number" == typeof t.num && 0 <= t.num && t.num < e.length) return e[t.num];
            throw new Error("illegal attachments")
        }
        if (Array.isArray(t))
            for (let r = 0; r < t.length; r++) t[r] = Cr(t[r], e);
        else if ("object" == typeof t)
            for (const r in t) Object.prototype.hasOwnProperty.call(t, r) && (t[r] = Cr(t[r], e))
    }
    return t
}
const Sr = ["connect", "connect_error", "disconnect", "disconnecting", "newListener", "removeListener"];
! function(t) {
    t[t.CONNECT = 0] = "CONNECT", t[t.DISCONNECT = 1] = "DISCONNECT", t[t.EVENT = 2] = "EVENT", t[t.ACK = 3] = "ACK", t[t.CONNECT_ERROR = 4] = "CONNECT_ERROR", t[t.BINARY_EVENT = 5] = "BINARY_EVENT", t[t.BINARY_ACK = 6] = "BINARY_ACK"
}(xt = xt || {});

function Ar(t) {
    return "[object Object]" === Object.prototype.toString.call(t)
}
class Or extends je {
    constructor(t) {
        super(), this.reviver = t
    }
    add(t) {
        let e;
        if ("string" == typeof t) {
            if (this.reconstructor) throw new Error("got plaintext data when reconstructing a packet");
            var r = (e = this.decodeString(t)).type === xt.BINARY_EVENT;
            (!r && e.type !== xt.BINARY_ACK || (e.type = r ? xt.EVENT : xt.ACK, this.reconstructor = new Er(e), 0 === e.attachments)) && super.emitReserved("decoded", e)
        } else {
            if (!vr(t) && !t.base64) throw new Error("Unknown type: " + t);
            if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
            (e = this.reconstructor.takeBinaryData(t)) && (this.reconstructor = null, super.emitReserved("decoded", e))
        }
    }
    decodeString(t) {
        let e = 0;
        var r = {
            type: Number(t.charAt(0))
        };
        if (void 0 === xt[r.type]) throw new Error("unknown packet type " + r.type);
        if (r.type === xt.BINARY_EVENT || r.type === xt.BINARY_ACK) {
            for (var s = e + 1;
                "-" !== t.charAt(++e) && e != t.length;);
            if ((s = t.substring(s, e)) != Number(s) || "-" !== t.charAt(e)) throw new Error("Illegal attachments");
            r.attachments = Number(s)
        }
        if ("/" === t.charAt(e + 1)) {
            for (s = e + 1; ++e && "," !== t.charAt(e) && e !== t.length;);
            r.nsp = t.substring(s, e)
        } else r.nsp = "/";
        if ("" !== (s = t.charAt(e + 1)) && Number(s) == s) {
            for (s = e + 1; ++e;) {
                var n = t.charAt(e);
                if (null == n || Number(n) != n) {
                    --e;
                    break
                }
                if (e === t.length) break
            }
            r.id = Number(t.substring(s, e + 1))
        }
        if (t.charAt(++e)) {
            if (s = this.tryParse(t.substr(e)), !Or.isPayloadValid(r.type, s)) throw new Error("invalid payload");
            r.data = s
        }
        return r
    }
    tryParse(t) {
        try {
            return JSON.parse(t, this.reviver)
        } catch (t) {
            return !1
        }
    }
    static isPayloadValid(t, e) {
        switch (t) {
            case xt.CONNECT:
                return Ar(e);
            case xt.DISCONNECT:
                return void 0 === e;
            case xt.CONNECT_ERROR:
                return "string" == typeof e || Ar(e);
            case xt.EVENT:
            case xt.BINARY_EVENT:
                return Array.isArray(e) && ("number" == typeof e[0] || "string" == typeof e[0] && -1 === Sr.indexOf(e[0]));
            case xt.ACK:
            case xt.BINARY_ACK:
                return Array.isArray(e)
        }
    }
    destroy() {
        this.reconstructor && (this.reconstructor.finishedReconstruction(), this.reconstructor = null)
    }
}
class Er {
    constructor(t) {
        this.packet = t, this.buffers = [], this.reconPack = t
    }
    takeBinaryData(t) {
        return this.buffers.push(t), this.buffers.length === this.reconPack.attachments ? (t = _r(this.reconPack, this.buffers), this.finishedReconstruction(), t) : null
    }
    finishedReconstruction() {
        this.reconPack = null, this.buffers = []
    }
}
var Pr = Object.freeze({
    __proto__: null,
    Decoder: Or,
    Encoder: class {
        constructor(t) {
            this.replacer = t
        }
        encode(t) {
            return t.type !== xt.EVENT && t.type !== xt.ACK || !wr(t) ? [this.encodeAsString(t)] : this.encodeAsBinary({
                type: t.type === xt.EVENT ? xt.BINARY_EVENT : xt.BINARY_ACK,
                nsp: t.nsp,
                data: t.data,
                id: t.id
            })
        }
        encodeAsString(t) {
            let e = "" + t.type;
            return t.type !== xt.BINARY_EVENT && t.type !== xt.BINARY_ACK || (e += t.attachments + "-"), t.nsp && "/" !== t.nsp && (e += t.nsp + ","), null != t.id && (e += t.id), null != t.data && (e += JSON.stringify(t.data, this.replacer)), e
        }
        encodeAsBinary(t) {
            t = xr(t);
            var e = this.encodeAsString(t.packet);
            return (t = t.buffers).unshift(e), t
        }
    },
    get PacketType() {
        return xt
    },
    protocol: 5
});

function $r(t, e, r) {
    return t.on(e, r),
        function() {
            t.off(e, r)
        }
}
const Rr = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    newListener: 1,
    removeListener: 1
});
class Tr extends je {
    constructor(t, e, r) {
        super(), this.connected = !1, this.recovered = !1, this.receiveBuffer = [], this.sendBuffer = [], this._queue = [], this._queueSeq = 0, this.ids = 0, this.acks = {}, this.flags = {}, this.io = t, this.nsp = e, r && r.auth && (this.auth = r.auth), this._opts = Object.assign({}, r), this.io._autoConnect && this.open()
    }
    get disconnected() {
        return !this.connected
    }
    subEvents() {
        var t;
        this.subs || (t = this.io, this.subs = [$r(t, "open", this.onopen.bind(this)), $r(t, "packet", this.onpacket.bind(this)), $r(t, "error", this.onerror.bind(this)), $r(t, "close", this.onclose.bind(this))])
    }
    get active() {
        return !!this.subs
    }
    connect() {
        return this.connected || (this.subEvents(), this.io._reconnecting || this.io.open(), "open" === this.io._readyState && this.onopen()), this
    }
    open() {
        return this.connect()
    }
    send(...t) {
        return t.unshift("message"), this.emit.apply(this, t), this
    }
    emit(t, ...e) {
        if (Rr.hasOwnProperty(t)) throw new Error('"' + t.toString() + '" is a reserved event name');
        var r, s;
        return e.unshift(t), !this._opts.retries || this.flags.fromQueue || this.flags.volatile ? ((t = {
            type: xt.EVENT,
            data: e,
            options: {}
        }).options.compress = !1 !== this.flags.compress, "function" == typeof e[e.length - 1] && (r = this.ids++, s = e.pop(), this._registerAckCallback(r, s), t.id = r), s = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable, (!this.flags.volatile || s && this.connected) && (this.connected ? (this.notifyOutgoingListeners(t), this.packet(t)) : this.sendBuffer.push(t)), this.flags = {}) : this._addToQueue(e), this
    }
    _registerAckCallback(t, e) {
        var r = null != (r = this.flags.timeout) ? r : this._opts.ackTimeout;
        if (void 0 === r) this.acks[t] = e;
        else {
            const s = this.io.setTimeoutFn((() => {
                delete this.acks[t];
                for (let e = 0; e < this.sendBuffer.length; e++) this.sendBuffer[e].id === t && this.sendBuffer.splice(e, 1);
                e.call(this, new Error("operation has timed out"))
            }), r);
            this.acks[t] = (...t) => {
                this.io.clearTimeoutFn(s), e.apply(this, [null, ...t])
            }
        }
    }
    emitWithAck(t, ...e) {
        const r = void 0 !== this.flags.timeout || void 0 !== this._opts.ackTimeout;
        return new Promise(((s, n) => {
            e.push(((t, e) => r ? t ? n(t) : s(e) : s(t))), this.emit(t, ...e)
        }))
    }
    _addToQueue(t) {
        let e;
        "function" == typeof t[t.length - 1] && (e = t.pop());
        const r = {
            id: this._queueSeq++,
            tryCount: 0,
            pending: !1,
            args: t,
            flags: Object.assign({
                fromQueue: !0
            }, this.flags)
        };
        t.push(((t, ...s) => {
            if (r === this._queue[0]) return null !== t ? r.tryCount > this._opts.retries && (this._queue.shift(), e) && e(t) : (this._queue.shift(), e && e(null, ...s)), r.pending = !1, this._drainQueue()
        })), this._queue.push(r), this._drainQueue()
    }
    _drainQueue(t = !1) {
        var e;
        !this.connected || 0 === this._queue.length || (e = this._queue[0]).pending && !t || (e.pending = !0, e.tryCount++, this.flags = e.flags, this.emit.apply(this, e.args))
    }
    packet(t) {
        t.nsp = this.nsp, this.io._packet(t)
    }
    onopen() {
        "function" == typeof this.auth ? this.auth((t => {
            this._sendConnectPacket(t)
        })) : this._sendConnectPacket(this.auth)
    }
    _sendConnectPacket(t) {
        this.packet({
            type: xt.CONNECT,
            data: this._pid ? Object.assign({
                pid: this._pid,
                offset: this._lastOffset
            }, t) : t
        })
    }
    onerror(t) {
        this.connected || this.emitReserved("connect_error", t)
    }
    onclose(t, e) {
        this.connected = !1, delete this.id, this.emitReserved("disconnect", t, e)
    }
    onpacket(t) {
        if (t.nsp === this.nsp) switch (t.type) {
            case xt.CONNECT:
                t.data && t.data.sid ? this.onconnect(t.data.sid, t.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                break;
            case xt.EVENT:
            case xt.BINARY_EVENT:
                this.onevent(t);
                break;
            case xt.ACK:
            case xt.BINARY_ACK:
                this.onack(t);
                break;
            case xt.DISCONNECT:
                this.ondisconnect();
                break;
            case xt.CONNECT_ERROR:
                this.destroy();
                var e = new Error(t.data.message);
                e.data = t.data.data, this.emitReserved("connect_error", e)
        }
    }
    onevent(t) {
        var e = t.data || [];
        null != t.id && e.push(this.ack(t.id)), this.connected ? this.emitEvent(e) : this.receiveBuffer.push(Object.freeze(e))
    }
    emitEvent(t) {
        if (this._anyListeners && this._anyListeners.length)
            for (const e of this._anyListeners.slice()) e.apply(this, t);
        super.emit.apply(this, t), this._pid && t.length && "string" == typeof t[t.length - 1] && (this._lastOffset = t[t.length - 1])
    }
    ack(t) {
        const e = this;
        let r = !1;
        return function(...s) {
            r || (r = !0, e.packet({
                type: xt.ACK,
                id: t,
                data: s
            }))
        }
    }
    onack(t) {
        var e = this.acks[t.id];
        "function" == typeof e && (e.apply(this, t.data), delete this.acks[t.id])
    }
    onconnect(t, e) {
        this.id = t, this.recovered = e && this._pid === e, this._pid = e, this.connected = !0, this.emitBuffered(), this.emitReserved("connect"), this._drainQueue(!0)
    }
    emitBuffered() {
        this.receiveBuffer.forEach((t => this.emitEvent(t))), this.receiveBuffer = [], this.sendBuffer.forEach((t => {
            this.notifyOutgoingListeners(t), this.packet(t)
        })), this.sendBuffer = []
    }
    ondisconnect() {
        this.destroy(), this.onclose("io server disconnect")
    }
    destroy() {
        this.subs && (this.subs.forEach((t => t())), this.subs = void 0), this.io._destroy(this)
    }
    disconnect() {
        return this.connected && this.packet({
            type: xt.DISCONNECT
        }), this.destroy(), this.connected && this.onclose("io client disconnect"), this
    }
    close() {
        return this.disconnect()
    }
    compress(t) {
        return this.flags.compress = t, this
    }
    get volatile() {
        return this.flags.volatile = !0, this
    }
    timeout(t) {
        return this.flags.timeout = t, this
    }
    onAny(t) {
        return this._anyListeners = this._anyListeners || [], this._anyListeners.push(t), this
    }
    prependAny(t) {
        return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(t), this
    }
    offAny(t) {
        if (this._anyListeners)
            if (t) {
                var e = this._anyListeners;
                for (let r = 0; r < e.length; r++)
                    if (t === e[r]) return e.splice(r, 1), this
            } else this._anyListeners = [];
        return this
    }
    listenersAny() {
        return this._anyListeners || []
    }
    onAnyOutgoing(t) {
        return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.push(t), this
    }
    prependAnyOutgoing(t) {
        return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.unshift(t), this
    }
    offAnyOutgoing(t) {
        if (this._anyOutgoingListeners)
            if (t) {
                var e = this._anyOutgoingListeners;
                for (let r = 0; r < e.length; r++)
                    if (t === e[r]) return e.splice(r, 1), this
            } else this._anyOutgoingListeners = [];
        return this
    }
    listenersAnyOutgoing() {
        return this._anyOutgoingListeners || []
    }
    notifyOutgoingListeners(t) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length)
            for (const e of this._anyOutgoingListeners.slice()) e.apply(this, t.data)
    }
}

function Br(t) {
    this.ms = (t = t || {}).min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = 0 < t.jitter && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0
}
Br.prototype.duration = function() {
    var t, e, r = this.ms * Math.pow(this.factor, this.attempts++);
    return this.jitter && (t = Math.random(), e = Math.floor(t * this.jitter * r), r = 0 == (1 & Math.floor(10 * t)) ? r - e : r + e), 0 | Math.min(r, this.max)
}, Br.prototype.reset = function() {
    this.attempts = 0
}, Br.prototype.setMin = function(t) {
    this.ms = t
}, Br.prototype.setMax = function(t) {
    this.max = t
}, Br.prototype.setJitter = function(t) {
    this.jitter = t
};
class Lr extends je {
    constructor(t, e) {
        super(), this.nsps = {}, this.subs = [], t && "object" == typeof t && (e = t, t = void 0), (e = e || {}).path = e.path || "/socket.io", this.opts = e, qe(this, e), this.reconnection(!1 !== e.reconnection), this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0), this.reconnectionDelay(e.reconnectionDelay || 1e3), this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3), this.randomizationFactor(null != (r = e.randomizationFactor) ? r : .5), this.backoff = new Br({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
        }), this.timeout(null == e.timeout ? 2e4 : e.timeout), this._readyState = "closed", this.uri = t;
        var r = e.parser || Pr;
        this.encoder = new r.Encoder, this.decoder = new r.Decoder, this._autoConnect = !1 !== e.autoConnect, this._autoConnect && this.open()
    }
    reconnection(t) {
        return arguments.length ? (this._reconnection = !!t, this) : this._reconnection
    }
    reconnectionAttempts(t) {
        return void 0 === t ? this._reconnectionAttempts : (this._reconnectionAttempts = t, this)
    }
    reconnectionDelay(t) {
        var e;
        return void 0 === t ? this._reconnectionDelay : (this._reconnectionDelay = t, null != (e = this.backoff) && e.setMin(t), this)
    }
    randomizationFactor(t) {
        var e;
        return void 0 === t ? this._randomizationFactor : (this._randomizationFactor = t, null != (e = this.backoff) && e.setJitter(t), this)
    }
    reconnectionDelayMax(t) {
        var e;
        return void 0 === t ? this._reconnectionDelayMax : (this._reconnectionDelayMax = t, null != (e = this.backoff) && e.setMax(t), this)
    }
    timeout(t) {
        return arguments.length ? (this._timeout = t, this) : this._timeout
    }
    maybeReconnectOnOpen() {
        !this._reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
    }
    open(t) {
        if (!~this._readyState.indexOf("open")) {
            this.engine = new dr(this.uri, this.opts);
            const s = this.engine,
                n = this,
                o = (this._readyState = "opening", this.skipReconnect = !1, $r(s, "open", (function() {
                    n.onopen(), t && t()
                })));
            var e = $r(s, "error", (e => {
                n.cleanup(), n._readyState = "closed", this.emitReserved("error", e), t ? t(e) : n.maybeReconnectOnOpen()
            }));
            if (!1 !== this._timeout) {
                var r = this._timeout;
                0 === r && o();
                const t = this.setTimeoutFn((() => {
                    o(), s.close(), s.emit("error", new Error("timeout"))
                }), r);
                this.opts.autoUnref && t.unref(), this.subs.push((function() {
                    clearTimeout(t)
                }))
            }
            this.subs.push(o), this.subs.push(e)
        }
        return this
    }
    connect(t) {
        return this.open(t)
    }
    onopen() {
        this.cleanup(), this._readyState = "open", this.emitReserved("open");
        var t = this.engine;
        this.subs.push($r(t, "ping", this.onping.bind(this)), $r(t, "data", this.ondata.bind(this)), $r(t, "error", this.onerror.bind(this)), $r(t, "close", this.onclose.bind(this)), $r(this.decoder, "decoded", this.ondecoded.bind(this)))
    }
    onping() {
        this.emitReserved("ping")
    }
    ondata(t) {
        try {
            this.decoder.add(t)
        } catch (t) {
            this.onclose("parse error", t)
        }
    }
    ondecoded(t) {
        ir((() => {
            this.emitReserved("packet", t)
        }), this.setTimeoutFn)
    }
    onerror(t) {
        this.emitReserved("error", t)
    }
    socket(t, e) {
        let r = this.nsps[t];
        return r ? this._autoConnect && !r.active && r.connect() : (r = new Tr(this, t, e), this.nsps[t] = r), r
    }
    _destroy(t) {
        for (const t of Object.keys(this.nsps)) {
            if (this.nsps[t].active) return
        }
        this._close()
    }
    _packet(t) {
        var e = this.encoder.encode(t);
        for (let r = 0; r < e.length; r++) this.engine.write(e[r], t.options)
    }
    cleanup() {
        this.subs.forEach((t => t())), this.subs.length = 0, this.decoder.destroy()
    }
    _close() {
        this.skipReconnect = !0, this._reconnecting = !1, this.onclose("forced close"), this.engine && this.engine.close()
    }
    disconnect() {
        return this._close()
    }
    onclose(t, e) {
        this.cleanup(), this.backoff.reset(), this._readyState = "closed", this.emitReserved("close", t, e), this._reconnection && !this.skipReconnect && this.reconnect()
    }
    reconnect() {
        if (this._reconnecting || this.skipReconnect) return this;
        const t = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) this.backoff.reset(), this.emitReserved("reconnect_failed"), this._reconnecting = !1;
        else {
            var e = this.backoff.duration();
            this._reconnecting = !0;
            const r = this.setTimeoutFn((() => {
                t.skipReconnect || (this.emitReserved("reconnect_attempt", t.backoff.attempts), t.skipReconnect) || t.open((e => {
                    e ? (t._reconnecting = !1, t.reconnect(), this.emitReserved("reconnect_error", e)) : t.onreconnect()
                }))
            }), e);
            this.opts.autoUnref && r.unref(), this.subs.push((function() {
                clearTimeout(r)
            }))
        }
    }
    onreconnect() {
        var t = this.backoff.attempts;
        this._reconnecting = !1, this.backoff.reset(), this.emitReserved("reconnect", t)
    }
}
const jr = {};

function Nr(t, e) {
    "object" == typeof t && (e = t, t = void 0);
    t = function(t, e = "", r) {
        let s = t;
        return r = r || "undefined" != typeof location && location, "string" == typeof(t = null == t ? r.protocol + "//" + r.host : t) && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? r.protocol + t : r.host + t), /^(https?|wss?):\/\//.test(t) || (t = void 0 !== r ? r.protocol + "//" + t : "https://" + t), s = pr(t)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), s.path = s.path || "/", t = -1 !== s.host.indexOf(":") ? "[" + s.host + "]" : s.host, s.id = s.protocol + "://" + t + ":" + s.port + e, s.href = s.protocol + "://" + t + (r && r.port === s.port ? "" : ":" + s.port), s
    }(t, (e = e || {}).path || "/socket.io");
    var r = t.source,
        s = t.id,
        n = t.path;
    n = jr[s] && n in jr[s].nsps;
    let o;
    return o = (n = e.forceNew || e["force new connection"] || !1 === e.multiplex || n) ? new Lr(r, e) : (jr[s] || (jr[s] = new Lr(r, e)), jr[s]), t.query && !e.query && (e.query = t.queryKey), o.socket(t.path, e)
}
Object.assign(Nr, {
    Manager: Lr,
    Socket: Tr,
    io: Nr,
    connect: Nr
});
const zr = st("<style>"),
    Mr = st('<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true"><style></style><div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in"></div><div class="fixed inset-0 z-10 overflow-y-auto"><div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"><div class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">'),
    Ir = st("<div><pre>");
const qr = t => {
        let e;
        const [r] = V(t, ["onOpen", "onClose", "isOpen", "value"]), [s, n] = (A((() => {
            e && (e.innerHTML = function(t) {
                return (t = (t = "string" != typeof t ? JSON.stringify(t, void 0, 2) : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")).replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (function(t) {
                    let e = "number";
                    return /^"/.test(t) ? e = /:$/.test(t) ? "key" : "string" : /true|false/.test(t) ? e = "boolean" : /null/.test(t) && (e = "null"), '<span class="' + e + '">' + t + "</span>"
                }))
            }(JSON.stringify(t?.value, void 0, 2)))
        })), x(r.isOpen ?? !1)), o = (_((() => {
            _t(t.isOpen) || t.isOpen === s() || a()
        })), t => {
            t.stopPropagation()
        }), i = () => {
            n(!1), r.onClose?.(), document.body.style.overflow = "auto"
        }, a = () => {
            s() ? i() : (n(!0), r.onOpen?.(), document.body.style.overflow = "hidden")
        };
        return F(X, {
            get when() {
                return s()
            },
            get children() {
                return [(ct(n = zr(), kt), n), (n = Mr(), r = n.firstChild, s = r.nextSibling.nextSibling.firstChild.firstChild, n.style.setProperty("z-index", "1100"), n.addEventListener("click", i), ct(r, kt), s.style.setProperty("background-color", "transparent"), s.style.setProperty("margin-left", "20px"), s.style.setProperty("margin-right", "20px"), s.addEventListener("click", o), s.addEventListener("pointerdown", o), ct(s, (() => {
                    const r = C((() => !!t.value));
                    return () => {
                        return r() && (s = (t = Ir()).firstChild, t.style.setProperty("background", "white"), t.style.setProperty("margin", "auto"), t.style.setProperty("padding", "7px"), "function" == typeof(n = e) ? lt(n, s) : e = s, t);
                        var t, s, n
                    }
                })()), n)];
                var r, s, n
            }
        })
    },
    Dr = st('<div><div class="flex w-full h-full justify-center"><div class="overflow-y-scroll min-w-full w-full min-h-full px-3 pt-10 relative scrollable-container chatbot-chat-view scroll-smooth">'),
    Fr = st("<div>"),
    Gr = st('<div class="w-full h-32">'),
    Hr = "Hi there! How can I help?",
    Wr = t => {
        let e, r, s;
        const [n, o] = x(""), [i, a] = x(!1), [l, c] = x(!1), [h, u] = x({}), [p, d] = x([{
            message: t.welcomeMessage ?? Hr,
            type: "apiMessage"
        }], {
            equals: !1
        }), [f, g] = x(""), [b, y] = x(!1), m = (A((() => {
            r && setTimeout((() => {
                e?.scrollTo(0, e.scrollHeight)
            }), 50)
        })), () => {
            setTimeout((() => {
                e?.scrollTo(0, e.scrollHeight)
            }), 50)
        }), v = t => {
            d((e => [...e.map(((r, s) => s === e.length - 1 ? {
                ...r,
                message: r.message + t
            } : r))]))
        }, w = t => {
            d((e => [...e.map(((r, s) => s === e.length - 1 ? {
                ...r,
                sourceDocuments: t
            } : r))]))
        }, S = async e => {
            if (o(e), "" !== e.trim()) {
                a(!0), m();
                const n = t.welcomeMessage ?? Hr;
                var r, s = p().filter((t => t.message !== n));
                s = (d((t => [...t, {
                    message: e,
                    type: "userMessage"
                }])), {
                    question: e,
                    history: s
                });
                t.chatflowConfig && (s.overrideConfig = t.chatflowConfig), b() && (s.socketIOClientId = f());
                const {
                    data: i,
                    error: l
                } = await $t({
                    chatflowid: t.chatflowid,
                    apiHost: t.apiHost,
                    body: s
                });
                i && ("object" == typeof i && i.text && i.sourceDocuments ? b() || d((t => [...t, {
                    message: i.text,
                    sourceDocuments: i.sourceDocuments,
                    type: "apiMessage"
                }])) : b() || d((t => [...t, {
                    message: i,
                    type: "apiMessage"
                }])), a(!1), o(""), m()), l && (console.error(l), s = l.response.data || l.response.status + ": " + l.response.statusText, r = s, d((t => [...t, {
                    message: r,
                    type: "apiMessage"
                }])), a(!1), o(""), m())
            }
        }, O = (_((() => {
            p() && m()
        })), _((() => {
            t.fontSize && s && (s.style.fontSize = t.fontSize + "px")
        })), _((async () => {
            var e = (await (({
                chatflowid: t,
                apiHost: e = "http://localhost:3000"
            }) => St({
                method: "GET",
                url: e + "/api/v1/chatflows-streaming/" + t
            }))({
                chatflowid: t.chatflowid,
                apiHost: t.apiHost
            })).data;
            e && y(e?.isStreaming ?? !1);
            const r = Nr(t.apiHost);
            return r.on("connect", (() => {
                g(r.id)
            })), r.on("start", (() => {
                d((t => [...t, {
                    message: "",
                    type: "apiMessage"
                }]))
            })), r.on("sourceDocuments", w), r.on("token", v), () => {
                o(""), a(!1), d([{
                    message: t.welcomeMessage ?? Hr,
                    type: "apiMessage"
                }]), r && (r.disconnect(), g(""))
            }
        })), t => {
            try {
                return new URL(t)
            } catch (t) {}
        });
        return [(() => {
            const o = Dr(),
                a = o.firstChild,
                l = a.firstChild;
            var h;
            return "function" == typeof(h = ("function" == typeof(h = s) ? lt(h, o) : s = o, e)) ? lt(h, l) : e = l, l.style.setProperty("padding-bottom", "100px"), ct(l, F(Y, {
                get each() {
                    return [...p()]
                },
                children: (e, r) => [C((() => {
                    const r = C((() => "userMessage" === e.type));
                    return () => r() && F(ce, {
                        get message() {
                            return e.message
                        },
                        get backgroundColor() {
                            return t.userMessage?.backgroundColor
                        },
                        get textColor() {
                            return t.userMessage?.textColor
                        },
                        get showAvatar() {
                            return t.userMessage?.showAvatar
                        },
                        get avatarSrc() {
                            return t.userMessage?.avatarSrc
                        }
                    })
                })()), C((() => {
                    const r = C((() => "apiMessage" === e.type));
                    return () => r() && F(ue, {
                        get message() {
                            return e.message
                        },
                        get backgroundColor() {
                            return t.botMessage?.backgroundColor
                        },
                        get textColor() {
                            return t.botMessage?.textColor
                        },
                        get showAvatar() {
                            return t.botMessage?.showAvatar
                        },
                        get avatarSrc() {
                            return t.botMessage?.avatarSrc
                        }
                    })
                })()), C((() => {
                    const t = C((() => !("userMessage" !== e.type || !i() || r() !== p().length - 1)));
                    return () => t() && F(ge, {})
                })()), C((() => {
                    const t = C((() => !(!e.sourceDocuments || !e.sourceDocuments.length)));
                    return () => {
                        return t() && ((r = Fr()).style.setProperty("display", "flex"), r.style.setProperty("flex-direction", "row"), r.style.setProperty("width", "100%"), ct(r, F(Y, {
                            get each() {
                                return [...(t => {
                                    const e = [],
                                        r = [];
                                    return t.sourceDocuments.forEach((t => {
                                        O(t.metadata.source) && !e.includes(t.metadata.source) ? (e.push(t.metadata.source), r.push(t)) : O(t.metadata.source) || r.push(t)
                                    })), r
                                })(e)]
                            },
                            children: t => {
                                const e = O(t.metadata.source);
                                return F(ye, {
                                    get pageContent() {
                                        return e ? e.pathname : t.pageContent
                                    },
                                    get metadata() {
                                        return t.metadata
                                    },
                                    onSourceClick: () => {
                                        e ? window.open(t.metadata.source, "_blank") : (u(t), c(!0))
                                    }
                                })
                            }
                        })), r);
                        var r
                    }
                })())]
            })), ct(a, F(Gt, {
                get backgroundColor() {
                    return t.textInput?.backgroundColor
                },
                get textColor() {
                    return t.textInput?.textColor
                },
                get placeholder() {
                    return t.textInput?.placeholder
                },
                get sendButtonColor() {
                    return t.textInput?.sendButtonColor
                },
                get fontSize() {
                    return t.fontSize
                },
                get defaultValue() {
                    return n()
                },
                onSubmit: S
            }), null), ct(o, F(we, {
                get badgeBackgroundColor() {
                    return t.badgeBackgroundColor
                },
                get poweredByTextColor() {
                    return t.poweredByTextColor
                },
                botContainer: s
            }), null), ct(o, F(Ur, {
                ref(t) {
                    "function" == typeof r ? r(t) : r = t
                }
            }), null), k((() => it(o, "relative flex w-full h-full text-base overflow-hidden bg-cover bg-center flex-col items-center chatbot-container " + t.class))), o
        })(), C((() => {
            const t = C((() => !!l()));
            return () => t() && F(qr, {
                get isOpen() {
                    return l()
                },
                get value() {
                    return h()
                },
                onClose: () => c(!1)
            })
        })())]
    },
    Ur = t => {
        return e = Gr(), "function" == typeof(r = t.ref) ? lt(r, e) : t.ref = e, e;
        var e, r
    },
    Vr = st("<style>"),
    Yr = st('<div part="bot">'),
    Xr = t => {
        const [e] = V(t, ["theme"]), [r, s] = x(!1), [n, o] = x(!1);
        var i;
        return [(ct(i = Vr(), kt), i), F(Pt, U((() => e.theme?.button), {
            toggleBot: () => {
                r() ? s(!1) : (n() || o(!0), s(!0))
            },
            get isBotOpened() {
                return r()
            }
        })), (() => {
            const s = Yr();
            return s.style.setProperty("transition", "transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out"), s.style.setProperty("transform-origin", "bottom right"), s.style.setProperty("box-shadow", "rgb(0 0 0 / 16%) 0px 5px 40px"), s.style.setProperty("z-index", "42424242"), ct(s, F(X, {
                get when() {
                    return n()
                },
                get children() {
                    return F(Wr, {
                        get badgeBackgroundColor() {
                            return e.theme?.chatWindow?.backgroundColor
                        },
                        get welcomeMessage() {
                            return e.theme?.chatWindow?.welcomeMessage
                        },
                        get poweredByTextColor() {
                            return e.theme?.chatWindow?.poweredByTextColor
                        },
                        get textInput() {
                            return e.theme?.chatWindow?.textInput
                        },
                        get botMessage() {
                            return e.theme?.chatWindow?.botMessage
                        },
                        get userMessage() {
                            return e.theme?.chatWindow?.userMessage
                        },
                        get fontSize() {
                            return e.theme?.chatWindow?.fontSize
                        },
                        get chatflowid() {
                            return t.chatflowid
                        },
                        get chatflowConfig() {
                            return t.chatflowConfig
                        },
                        get apiHost() {
                            return t.apiHost
                        }
                    })
                }
            })), k((n => {
                var o = e.theme?.chatWindow?.height ? e.theme?.chatWindow?.height.toString() + "px" : "calc(100% - 100px)",
                    i = r() ? "scale3d(1, 1, 1)" : "scale3d(0, 0, 1)",
                    a = e.theme?.chatWindow?.backgroundColor || "#ffffff",
                    l = "fixed sm:right-5 rounded-lg w-full sm:w-[400px] max-h-[704px]" + (r() ? " opacity-1" : " opacity-0 pointer-events-none") + ("large" === t.theme?.button?.size ? " bottom-24" : " bottom-20");
                return o !== n._v$ && (null != (n._v$ = o) ? s.style.setProperty("height", o) : s.style.removeProperty("height")), i !== n._v$2 && (null != (n._v$2 = i) ? s.style.setProperty("transform", i) : s.style.removeProperty("transform")), a !== n._v$3 && (null != (n._v$3 = a) ? s.style.setProperty("background-color", a) : s.style.removeProperty("background-color")), l !== n._v$4 && it(s, n._v$4 = l), n
            }), {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0
            }), s
        })()]
    },
    Kr = st("<style>"),
    Jr = st("<div>"),
    Qr = (t, {
        element: e
    }) => {
        const [r, s] = x(!1), n = new IntersectionObserver((t => {
            t.some((t => t.isIntersecting)) && s(!0)
        }));
        return A((() => {
            n.observe(e)
        })), O((() => {
            n.disconnect()
        })), [(ct(o = Kr(), kt), o), F(X, {
            get when() {
                return r()
            },
            get children() {
                const e = Jr();
                return e.style.setProperty("margin", "0px"), ct(e, F(Wr, {
                    get badgeBackgroundColor() {
                        return t.theme?.chatWindow?.backgroundColor
                    },
                    get welcomeMessage() {
                        return t.theme?.chatWindow?.welcomeMessage
                    },
                    get poweredByTextColor() {
                        return t.theme?.chatWindow?.poweredByTextColor
                    },
                    get textInput() {
                        return t.theme?.chatWindow?.textInput
                    },
                    get botMessage() {
                        return t.theme?.chatWindow?.botMessage
                    },
                    get userMessage() {
                        return t.theme?.chatWindow?.userMessage
                    },
                    get fontSize() {
                        return t.theme?.chatWindow?.fontSize
                    },
                    get chatflowid() {
                        return t.chatflowid
                    },
                    get chatflowConfig() {
                        return t.chatflowConfig
                    },
                    get apiHost() {
                        return t.apiHost
                    }
                })), k((r => {
                    var s = t.theme?.chatWindow?.backgroundColor || "#ffffff",
                        n = t.theme?.chatWindow?.height ? t.theme?.chatWindow?.height.toString() + "px" : "100vh",
                        o = t.theme?.chatWindow?.width ? t.theme?.chatWindow?.width.toString() + "px" : "100%";
                    return s !== r._v$ && (null != (r._v$ = s) ? e.style.setProperty("background-color", s) : e.style.removeProperty("background-color")), n !== r._v$2 && (null != (r._v$2 = n) ? e.style.setProperty("height", n) : e.style.removeProperty("height")), o !== r._v$3 && (null != (r._v$3 = o) ? e.style.setProperty("width", o) : e.style.removeProperty("width")), r
                }), {
                    _v$: void 0,
                    _v$2: void 0,
                    _v$3: void 0
                }), e
            }
        })];
        var o
    },
    Zr = t => {
        var e = t.id ? document.getElementById(t.id) : document.querySelector("flowise-fullchatbot");
        if (!e) throw new Error("<flowise-fullchatbot> element not found.");
        Object.assign(e, t)
    },
    ts = t => {
        var e = document.createElement("flowise-chatbot");
        Object.assign(e, t), document.body.appendChild(e)
    },
    es = ("undefined" != typeof window && (mt("flowise-fullchatbot", vt, Qr), mt("flowise-chatbot", vt, Xr)), {
        initFull: Zr,
        init: ts
    });
(t => {
    "undefined" != typeof window && (window.Chatbot = {
        ...t
    })
})(es);
export {
    es as
    default
};