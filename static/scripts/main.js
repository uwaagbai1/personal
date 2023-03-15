!(function (t) {
  var e = {};
  function n(i) {
    if (e[i]) return e[i].exports;
    var o = (e[i] = { i: i, l: !1, exports: {} });
    return t[i].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = function (t, e, i) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
    }),
    (n.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var i = Object.create(null);
      if (
        (n.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var o in t)
          n.d(
            i,
            o,
            function (e) {
              return t[e];
            }.bind(null, o)
          );
      return i;
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ""),
    n((n.s = 40));
})([
  ,
  ,
  function (t, e, n) {
    !(function (e, i) {
      t.exports
        ? (t.exports = i(e, n(30), n(3)))
        : (e.InfiniteScroll = i(e, e.EvEmitter, e.fizzyUIUtils));
    })(window, function (t, e, n) {
      let i = t.jQuery,
        o = {};
      function s(t, e) {
        let r = n.getQueryElement(t);
        if (r) {
          if ((t = r).infiniteScrollGUID) {
            let n = o[t.infiniteScrollGUID];
            return n.option(e), n;
          }
          (this.element = t),
            (this.options = { ...s.defaults }),
            this.option(e),
            i && (this.$element = i(this.element)),
            this.create();
        } else console.error("Bad element for InfiniteScroll: " + (r || t));
      }
      (s.defaults = {}), (s.create = {}), (s.destroy = {});
      let r = s.prototype;
      Object.assign(r, e.prototype);
      let a = 0;
      (r.create = function () {
        let t = (this.guid = ++a);
        if (
          ((this.element.infiniteScrollGUID = t),
          (o[t] = this),
          (this.pageIndex = 1),
          (this.loadCount = 0),
          this.updateGetPath(),
          this.getPath && this.getPath())
        ) {
          this.updateGetAbsolutePath(),
            this.log("initialized", [this.element.className]),
            this.callOnInit();
          for (let t in s.create) s.create[t].call(this);
        } else console.error("Disabling InfiniteScroll");
      }),
        (r.option = function (t) {
          Object.assign(this.options, t);
        }),
        (r.callOnInit = function () {
          let t = this.options.onInit;
          t && t.call(this, this);
        }),
        (r.dispatchEvent = function (t, e, n) {
          this.log(t, n);
          let o = e ? [e].concat(n) : n;
          if ((this.emitEvent(t, o), !i || !this.$element)) return;
          let s = (t += ".infiniteScroll");
          if (e) {
            let n = i.Event(e);
            (n.type = t), (s = n);
          }
          this.$element.trigger(s, n);
        });
      let l = {
        initialized: (t) => "on " + t,
        request: (t) => "URL: " + t,
        load: (t, e) => `${t.title || ""}. URL: ${e}`,
        error: (t, e) => `${t}. URL: ${e}`,
        append: (t, e, n) => `${n.length} items. URL: ${e}`,
        last: (t, e) => "URL: " + e,
        history: (t, e) => "URL: " + e,
        pageIndex: function (t, e) {
          return `current page determined to be: ${t} from ${e}`;
        },
      };
      (r.log = function (t, e) {
        if (!this.options.debug) return;
        let n = "[InfiniteScroll] " + t,
          i = l[t];
        i && (n += ". " + i.apply(this, e)), console.log(n);
      }),
        (r.updateMeasurements = function () {
          this.windowHeight = t.innerHeight;
          let e = this.element.getBoundingClientRect();
          this.top = e.top + t.scrollY;
        }),
        (r.updateScroller = function () {
          let e = this.options.elementScroll;
          if (e) {
            if (
              ((this.scroller = !0 === e ? this.element : n.getQueryElement(e)),
              !this.scroller)
            )
              throw new Error("Unable to find elementScroll: " + e);
          } else this.scroller = t;
        }),
        (r.updateGetPath = function () {
          let t = this.options.path;
          if (!t)
            return void console.error(
              "InfiniteScroll path option required. Set as: " + t
            );
          let e = typeof t;
          "function" != e
            ? "string" == e && t.match("{{#}}")
              ? this.updateGetPathTemplate(t)
              : this.updateGetPathSelector(t)
            : (this.getPath = t);
        }),
        (r.updateGetPathTemplate = function (t) {
          this.getPath = () => {
            let e = this.pageIndex + 1;
            return t.replace("{{#}}", e);
          };
          let e = t
              .replace(/(\\\?|\?)/, "\\?")
              .replace("{{#}}", "(\\d\\d?\\d?)"),
            n = new RegExp(e),
            i = location.href.match(n);
          i &&
            ((this.pageIndex = parseInt(i[1], 10)),
            this.log("pageIndex", [this.pageIndex, "template string"]));
        });
      let c = [
          /^(.*?\/?page\/?)(\d\d?\d?)(.*?$)/,
          /^(.*?\/?\?page=)(\d\d?\d?)(.*?$)/,
          /(.*?)(\d\d?\d?)(?!.*\d)(.*?$)/,
        ],
        u = (s.getPathParts = function (t) {
          if (t)
            for (let e of c) {
              let n = t.match(e);
              if (n) {
                let [, t, e, i] = n;
                return { begin: t, index: e, end: i };
              }
            }
        });
      (r.updateGetPathSelector = function (t) {
        let e = document.querySelector(t);
        if (!e)
          return void console.error(
            "Bad InfiniteScroll path option. Next link not found: " + t
          );
        let n = e.getAttribute("href"),
          i = u(n);
        if (!i)
          return void console.error(
            "InfiniteScroll unable to parse next link href: " + n
          );
        let { begin: o, index: s, end: r } = i;
        (this.isPathSelector = !0),
          (this.getPath = () => o + (this.pageIndex + 1) + r),
          (this.pageIndex = parseInt(s, 10) - 1),
          this.log("pageIndex", [this.pageIndex, "next link"]);
      }),
        (r.updateGetAbsolutePath = function () {
          let t = this.getPath();
          if (t.match(/^http/) || t.match(/^\//))
            return void (this.getAbsolutePath = this.getPath);
          let { pathname: e } = location,
            n = t.match(/^\?/),
            i = e.substring(0, e.lastIndexOf("/")),
            o = n ? e : i + "/";
          this.getAbsolutePath = () => o + this.getPath();
        }),
        (s.create.hideNav = function () {
          let t = n.getQueryElement(this.options.hideNav);
          t && ((t.style.display = "none"), (this.nav = t));
        }),
        (s.destroy.hideNav = function () {
          this.nav && (this.nav.style.display = "");
        }),
        (r.destroy = function () {
          this.allOff();
          for (let t in s.destroy) s.destroy[t].call(this);
          delete this.element.infiniteScrollGUID,
            delete o[this.guid],
            i && this.$element && i.removeData(this.element, "infiniteScroll");
        }),
        (s.throttle = function (t, e) {
          let n, i;
          return (
            (e = e || 200),
            function () {
              let o = +new Date(),
                s = arguments,
                r = () => {
                  (n = o), t.apply(this, s);
                };
              n && o < n + e ? (clearTimeout(i), (i = setTimeout(r, e))) : r();
            }
          );
        }),
        (s.data = function (t) {
          let e = (t = n.getQueryElement(t)) && t.infiniteScrollGUID;
          return e && o[e];
        }),
        (s.setJQuery = function (t) {
          i = t;
        }),
        n.htmlInit(s, "infinite-scroll"),
        (r._init = function () {});
      let { jQueryBridget: h } = t;
      return i && h && h("infiniteScroll", s, i), s;
    });
  },
  function (t, e, n) {
    !(function (e, n) {
      t.exports ? (t.exports = n(e)) : (e.fizzyUIUtils = n(e));
    })(this, function (t) {
      let e = {
          extend: function (t, e) {
            return Object.assign(t, e);
          },
          modulo: function (t, e) {
            return ((t % e) + e) % e;
          },
          makeArray: function (t) {
            if (Array.isArray(t)) return t;
            if (null == t) return [];
            return "object" == typeof t && "number" == typeof t.length
              ? [...t]
              : [t];
          },
          removeFrom: function (t, e) {
            let n = t.indexOf(e);
            -1 != n && t.splice(n, 1);
          },
          getParent: function (t, e) {
            for (; t.parentNode && t != document.body; )
              if ((t = t.parentNode).matches(e)) return t;
          },
          getQueryElement: function (t) {
            return "string" == typeof t ? document.querySelector(t) : t;
          },
          handleEvent: function (t) {
            let e = "on" + t.type;
            this[e] && this[e](t);
          },
          filterFindElements: function (t, n) {
            return (t = e.makeArray(t))
              .filter((t) => t instanceof HTMLElement)
              .reduce((t, e) => {
                if (!n) return t.push(e), t;
                e.matches(n) && t.push(e);
                let i = e.querySelectorAll(n);
                return (t = t.concat(...i));
              }, []);
          },
          debounceMethod: function (t, e, n) {
            n = n || 100;
            let i = t.prototype[e],
              o = e + "Timeout";
            t.prototype[e] = function () {
              clearTimeout(this[o]);
              let t = arguments;
              this[o] = setTimeout(() => {
                i.apply(this, t), delete this[o];
              }, n);
            };
          },
          docReady: function (t) {
            let e = document.readyState;
            "complete" == e || "interactive" == e
              ? setTimeout(t)
              : document.addEventListener("DOMContentLoaded", t);
          },
          toDashed: function (t) {
            return t
              .replace(/(.)([A-Z])/g, function (t, e, n) {
                return e + "-" + n;
              })
              .toLowerCase();
          },
        },
        n = t.console;
      return (
        (e.htmlInit = function (i, o) {
          e.docReady(function () {
            let s = "data-" + e.toDashed(o),
              r = document.querySelectorAll(`[${s}]`),
              a = t.jQuery;
            [...r].forEach((t) => {
              let e,
                r = t.getAttribute(s);
              try {
                e = r && JSON.parse(r);
              } catch (e) {
                return void (
                  n && n.error(`Error parsing ${s} on ${t.className}: ${e}`)
                );
              }
              let l = new i(t, e);
              a && a.data(t, o, l);
            });
          });
        }),
        e
      );
    });
  },
  ,
  function (t, e) {
    t.exports = function (t) {
      var e = typeof t;
      return null != t && ("object" == e || "function" == e);
    };
  },
  function (t, e, n) {
    var i = n(15),
      o = "object" == typeof self && self && self.Object === Object && self,
      s = i || o || Function("return this")();
    t.exports = s;
  },
  function (t, e, n) {
    var i = n(6).Symbol;
    t.exports = i;
  },
  function (t, e, n) {
    var i = n(5),
      o = n(14),
      s = n(17),
      r = Math.max,
      a = Math.min;
    t.exports = function (t, e, n) {
      var l,
        c,
        u,
        h,
        d,
        f,
        p = 0,
        m = !1,
        g = !1,
        v = !0;
      if ("function" != typeof t) throw new TypeError("Expected a function");
      function y(e) {
        var n = l,
          i = c;
        return (l = c = void 0), (p = e), (h = t.apply(i, n));
      }
      function b(t) {
        return (p = t), (d = setTimeout(E, e)), m ? y(t) : h;
      }
      function w(t) {
        var n = t - f;
        return void 0 === f || n >= e || n < 0 || (g && t - p >= u);
      }
      function E() {
        var t = o();
        if (w(t)) return S(t);
        d = setTimeout(
          E,
          (function (t) {
            var n = e - (t - f);
            return g ? a(n, u - (t - p)) : n;
          })(t)
        );
      }
      function S(t) {
        return (d = void 0), v && l ? y(t) : ((l = c = void 0), h);
      }
      function L() {
        var t = o(),
          n = w(t);
        if (((l = arguments), (c = this), (f = t), n)) {
          if (void 0 === d) return b(f);
          if (g) return clearTimeout(d), (d = setTimeout(E, e)), y(f);
        }
        return void 0 === d && (d = setTimeout(E, e)), h;
      }
      return (
        (e = s(e) || 0),
        i(n) &&
          ((m = !!n.leading),
          (u = (g = "maxWait" in n) ? r(s(n.maxWait) || 0, e) : u),
          (v = "trailing" in n ? !!n.trailing : v)),
        (L.cancel = function () {
          void 0 !== d && clearTimeout(d), (p = 0), (l = f = c = d = void 0);
        }),
        (L.flush = function () {
          return void 0 === d ? h : S(o());
        }),
        L
      );
    };
  },
  function (t, e, n) {
    var i,
      o,
      s = n(25),
      r = n(26),
      a =
        ((o = []),
        {
          activateTrap: function (t) {
            if (o.length > 0) {
              var e = o[o.length - 1];
              e !== t && e.pause();
            }
            var n = o.indexOf(t);
            -1 === n || o.splice(n, 1), o.push(t);
          },
          deactivateTrap: function (t) {
            var e = o.indexOf(t);
            -1 !== e && o.splice(e, 1),
              o.length > 0 && o[o.length - 1].unpause();
          },
        });
    function l(t) {
      return setTimeout(t, 0);
    }
    t.exports = function (t, e) {
      var n = document,
        o = "string" == typeof t ? n.querySelector(t) : t,
        c = r({ returnFocusOnDeactivate: !0, escapeDeactivates: !0 }, e),
        u = {
          firstTabbableNode: null,
          lastTabbableNode: null,
          nodeFocusedBeforeActivation: null,
          mostRecentlyFocusedNode: null,
          active: !1,
          paused: !1,
        },
        h = {
          activate: function (t) {
            if (u.active) return;
            E(),
              (u.active = !0),
              (u.paused = !1),
              (u.nodeFocusedBeforeActivation = n.activeElement);
            var e = t && t.onActivate ? t.onActivate : c.onActivate;
            e && e();
            return f(), h;
          },
          deactivate: d,
          pause: function () {
            if (u.paused || !u.active) return;
            (u.paused = !0), p();
          },
          unpause: function () {
            if (!u.paused || !u.active) return;
            (u.paused = !1), E(), f();
          },
        };
      return h;
      function d(t) {
        if (u.active) {
          clearTimeout(i),
            p(),
            (u.active = !1),
            (u.paused = !1),
            a.deactivateTrap(h);
          var e =
            t && void 0 !== t.onDeactivate ? t.onDeactivate : c.onDeactivate;
          return (
            e && e(),
            (t && void 0 !== t.returnFocus
              ? t.returnFocus
              : c.returnFocusOnDeactivate) &&
              l(function () {
                var t;
                S(
                  ((t = u.nodeFocusedBeforeActivation),
                  m("setReturnFocus") || t)
                );
              }),
            h
          );
        }
      }
      function f() {
        if (u.active)
          return (
            a.activateTrap(h),
            (i = l(function () {
              S(g());
            })),
            n.addEventListener("focusin", y, !0),
            n.addEventListener("mousedown", v, { capture: !0, passive: !1 }),
            n.addEventListener("touchstart", v, { capture: !0, passive: !1 }),
            n.addEventListener("click", w, { capture: !0, passive: !1 }),
            n.addEventListener("keydown", b, { capture: !0, passive: !1 }),
            h
          );
      }
      function p() {
        if (u.active)
          return (
            n.removeEventListener("focusin", y, !0),
            n.removeEventListener("mousedown", v, !0),
            n.removeEventListener("touchstart", v, !0),
            n.removeEventListener("click", w, !0),
            n.removeEventListener("keydown", b, !0),
            h
          );
      }
      function m(t) {
        var e = c[t],
          i = e;
        if (!e) return null;
        if ("string" == typeof e && !(i = n.querySelector(e)))
          throw new Error("`" + t + "` refers to no known node");
        if ("function" == typeof e && !(i = e()))
          throw new Error("`" + t + "` did not return a node");
        return i;
      }
      function g() {
        var t;
        if (
          !(t =
            null !== m("initialFocus")
              ? m("initialFocus")
              : o.contains(n.activeElement)
              ? n.activeElement
              : u.firstTabbableNode || m("fallbackFocus"))
        )
          throw new Error(
            "Your focus-trap needs to have at least one focusable element"
          );
        return t;
      }
      function v(t) {
        o.contains(t.target) ||
          (c.clickOutsideDeactivates
            ? d({ returnFocus: !s.isFocusable(t.target) })
            : (c.allowOutsideClick && c.allowOutsideClick(t)) ||
              t.preventDefault());
      }
      function y(t) {
        o.contains(t.target) ||
          t.target instanceof Document ||
          (t.stopImmediatePropagation(), S(u.mostRecentlyFocusedNode || g()));
      }
      function b(t) {
        if (
          !1 !== c.escapeDeactivates &&
          (function (t) {
            return "Escape" === t.key || "Esc" === t.key || 27 === t.keyCode;
          })(t)
        )
          return t.preventDefault(), void d();
        (function (t) {
          return "Tab" === t.key || 9 === t.keyCode;
        })(t) &&
          (function (t) {
            if ((E(), t.shiftKey && t.target === u.firstTabbableNode))
              return t.preventDefault(), void S(u.lastTabbableNode);
            if (!t.shiftKey && t.target === u.lastTabbableNode)
              t.preventDefault(), S(u.firstTabbableNode);
          })(t);
      }
      function w(t) {
        c.clickOutsideDeactivates ||
          o.contains(t.target) ||
          (c.allowOutsideClick && c.allowOutsideClick(t)) ||
          (t.preventDefault(), t.stopImmediatePropagation());
      }
      function E() {
        var t = s(o);
        (u.firstTabbableNode = t[0] || g()),
          (u.lastTabbableNode = t[t.length - 1] || g());
      }
      function S(t) {
        t !== n.activeElement &&
          (t && t.focus
            ? (t.focus(),
              (u.mostRecentlyFocusedNode = t),
              (function (t) {
                return (
                  t.tagName &&
                  "input" === t.tagName.toLowerCase() &&
                  "function" == typeof t.select
                );
              })(t) && t.select())
            : S(g()));
      }
    };
  },
  function (t, e, n) {
    /*!
     * Infinite Scroll v4.0.1
     * Automatically add next page
     *
     * Licensed GPLv3 for open source use
     * or Infinite Scroll Commercial License for commercial use
     *
     * https://infinite-scroll.com
     * Copyright 2018-2020 Metafizzy
     */
    var i;
    window,
      t.exports &&
        (t.exports = ((i = n(2)), n(31), n(32), n(33), n(34), n(35), i));
  },
  ,
  function (t, e, n) {
    !(function () {
      "use strict";
      function t(t) {
        var e = !0,
          n = !1,
          i = null,
          o = {
            text: !0,
            search: !0,
            url: !0,
            tel: !0,
            email: !0,
            password: !0,
            number: !0,
            date: !0,
            month: !0,
            week: !0,
            time: !0,
            datetime: !0,
            "datetime-local": !0,
          };
        function s(t) {
          return !!(
            t &&
            t !== document &&
            "HTML" !== t.nodeName &&
            "BODY" !== t.nodeName &&
            "classList" in t &&
            "contains" in t.classList
          );
        }
        function r(t) {
          t.classList.contains("focus-visible") ||
            (t.classList.add("focus-visible"),
            t.setAttribute("data-focus-visible-added", ""));
        }
        function a(t) {
          e = !1;
        }
        function l() {
          document.addEventListener("mousemove", c),
            document.addEventListener("mousedown", c),
            document.addEventListener("mouseup", c),
            document.addEventListener("pointermove", c),
            document.addEventListener("pointerdown", c),
            document.addEventListener("pointerup", c),
            document.addEventListener("touchmove", c),
            document.addEventListener("touchstart", c),
            document.addEventListener("touchend", c);
        }
        function c(t) {
          (t.target.nodeName && "html" === t.target.nodeName.toLowerCase()) ||
            ((e = !1),
            document.removeEventListener("mousemove", c),
            document.removeEventListener("mousedown", c),
            document.removeEventListener("mouseup", c),
            document.removeEventListener("pointermove", c),
            document.removeEventListener("pointerdown", c),
            document.removeEventListener("pointerup", c),
            document.removeEventListener("touchmove", c),
            document.removeEventListener("touchstart", c),
            document.removeEventListener("touchend", c));
        }
        document.addEventListener(
          "keydown",
          function (n) {
            n.metaKey ||
              n.altKey ||
              n.ctrlKey ||
              (s(t.activeElement) && r(t.activeElement), (e = !0));
          },
          !0
        ),
          document.addEventListener("mousedown", a, !0),
          document.addEventListener("pointerdown", a, !0),
          document.addEventListener("touchstart", a, !0),
          document.addEventListener(
            "visibilitychange",
            function (t) {
              "hidden" === document.visibilityState && (n && (e = !0), l());
            },
            !0
          ),
          l(),
          t.addEventListener(
            "focus",
            function (t) {
              var n, i, a;
              s(t.target) &&
                (e ||
                  ((n = t.target),
                  (i = n.type),
                  ("INPUT" === (a = n.tagName) && o[i] && !n.readOnly) ||
                    ("TEXTAREA" === a && !n.readOnly) ||
                    n.isContentEditable)) &&
                r(t.target);
            },
            !0
          ),
          t.addEventListener(
            "blur",
            function (t) {
              var e;
              s(t.target) &&
                (t.target.classList.contains("focus-visible") ||
                  t.target.hasAttribute("data-focus-visible-added")) &&
                ((n = !0),
                window.clearTimeout(i),
                (i = window.setTimeout(function () {
                  n = !1;
                }, 100)),
                (e = t.target).hasAttribute("data-focus-visible-added") &&
                  (e.classList.remove("focus-visible"),
                  e.removeAttribute("data-focus-visible-added")));
            },
            !0
          ),
          t.nodeType === Node.DOCUMENT_FRAGMENT_NODE && t.host
            ? t.host.setAttribute("data-js-focus-visible", "")
            : t.nodeType === Node.DOCUMENT_NODE &&
              (document.documentElement.classList.add("js-focus-visible"),
              document.documentElement.setAttribute(
                "data-js-focus-visible",
                ""
              ));
      }
      if ("undefined" != typeof window && "undefined" != typeof document) {
        var e;
        window.applyFocusVisiblePolyfill = t;
        try {
          e = new CustomEvent("focus-visible-polyfill-ready");
        } catch (t) {
          (e = document.createEvent("CustomEvent")).initCustomEvent(
            "focus-visible-polyfill-ready",
            !1,
            !1,
            {}
          );
        }
        window.dispatchEvent(e);
      }
      "undefined" != typeof document && t(document);
    })();
  },
  function (t, e) {
    class n extends HTMLElement {
      constructor() {
        super(),
          (this.label = this.getAttribute("aria-label") || "Share this"),
          this.attachShadow({ mode: "open" }),
          this.shadowRoot.appendChild(this.template.content.cloneNode(!0));
      }
      get template() {
        const t = document.createElement("template"),
          e = `<span class="tooltip">${
            navigator.share
              ? ""
              : '\n            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n                <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>\n            </svg>'
          }${this.label}</span>`;
        return (
          (t.innerHTML = `\n            <style>\n            :host {\n                position:relative;\n                display:inline;\n                cursor:pointer;\n            }\n            :host(:hover),\n            :host(:focus) {\n                outline: .15em solid var(--share-highlight-bg-color-active);\n            }\n            :host(:hover) .tooltip,\n            :host(:focus) .tooltip {\n                display: block;\n            }\n            ::slotted(mark) {\n                color: var(--share-highlight-text-color) !important;\n                background-color: var(--share-highlight-bg-color) !important;\n            }\n            :host(:hover) ::slotted(mark),\n            :host(:focus) ::slotted(mark) {\n                color: var(--share-highlight-text-color-active) !important;\n                background-color: var(--share-highlight-bg-color-active) !important;\n            }\n            .tooltip {\n                display:none;\n                position: absolute;\n                bottom:100%;\n                left:50%;\n                transform: translate(-50%, -.75em);\n                font-size: .75em;\n                line-height: 1;\n                padding: .5em;\n                border-radius: .25em;\n                border:0;\n                cursor: pointer;\n                white-space: nowrap;\n                color: var(--share-highlight-tooltip-text-color, #FFF);\n                background-color: var(--share-highlight-tooltip-bg-color, #000);\n            }\n            .tooltip::after {\n                content: "";\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                width: 0; \n                height: 0; \n                border-left: .5em solid transparent;\n                border-right: .5em solid transparent;\n                border-top: .5em solid var(--share-highlight-tooltip-bg-color, #000);\n                position: absolute;\n                z-index: 100;\n                top: 100%;\n                left:50%;\n                transform: translate(-50%, -1px);\n            }\n            .icon {\n                display: inline-block;\n                font-size: 1em;\n                height: 1em;\n                width: 1em;\n                margin-right: .25em;\n                vertical-align: middle;\n                fill: currentColor;\n                pointer-events: none;\n            }</style>\n            <slot></slot>\n            ${e}\n        `),
          t
        );
      }
      connectedCallback() {
        this.hasAttribute("tabindex") || (this.tabIndex = 0),
          this.hasAttribute("aria-label") ||
            this.setAttribute("aria-label", this.label),
          this.addEventListener("click", () => this.share()),
          this.addEventListener("keydown", (t) => {
            t.key && "enter" === t.key.toLowerCase() && this.share();
          });
      }
      shareData() {
        const t = this.shadowRoot
          .querySelector("slot")
          .assignedNodes({ flatten: !0 })
          .map((t) => t.textContent.trim())
          .join(" ");
        return {
          url: window.location.href,
          title: document.title,
          text: `"${t}"`,
        };
      }
      async share() {
        const t = this.shareData();
        if (navigator.share)
          try {
            await navigator.share(t), this.emitEvent("shared", t);
          } catch (e) {
            "AbortError" === e.name && this.emitEvent("cancelled", t);
          }
        else {
          let e = "https://twitter.com/intent/tweet";
          (e += "?url=" + encodeURIComponent(t.url)),
            (e += "&text=" + encodeURIComponent(t.text)),
            window.open(e, "_blank"),
            this.emitEvent("shared", t);
        }
      }
      emitEvent(t, e) {
        const n = new CustomEvent(t, { detail: e, bubbles: !0 });
        this.dispatchEvent(n);
      }
    }
    "customElements" in window && customElements.define("share-highlight", n);
  },
  function (t, e, n) {
    var i = n(6);
    t.exports = function () {
      return i.Date.now();
    };
  },
  function (t, e, n) {
    (function (e) {
      var n = "object" == typeof e && e && e.Object === Object && e;
      t.exports = n;
    }.call(this, n(16)));
  },
  function (t, e) {
    var n;
    n = (function () {
      return this;
    })();
    try {
      n = n || new Function("return this")();
    } catch (t) {
      "object" == typeof window && (n = window);
    }
    t.exports = n;
  },
  function (t, e, n) {
    var i = n(18),
      o = n(5),
      s = n(20),
      r = /^[-+]0x[0-9a-f]+$/i,
      a = /^0b[01]+$/i,
      l = /^0o[0-7]+$/i,
      c = parseInt;
    t.exports = function (t) {
      if ("number" == typeof t) return t;
      if (s(t)) return NaN;
      if (o(t)) {
        var e = "function" == typeof t.valueOf ? t.valueOf() : t;
        t = o(e) ? e + "" : e;
      }
      if ("string" != typeof t) return 0 === t ? t : +t;
      t = i(t);
      var n = a.test(t);
      return n || l.test(t) ? c(t.slice(2), n ? 2 : 8) : r.test(t) ? NaN : +t;
    };
  },
  function (t, e, n) {
    var i = n(19),
      o = /^\s+/;
    t.exports = function (t) {
      return t ? t.slice(0, i(t) + 1).replace(o, "") : t;
    };
  },
  function (t, e) {
    var n = /\s/;
    t.exports = function (t) {
      for (var e = t.length; e-- && n.test(t.charAt(e)); );
      return e;
    };
  },
  function (t, e, n) {
    var i = n(21),
      o = n(24);
    t.exports = function (t) {
      return "symbol" == typeof t || (o(t) && "[object Symbol]" == i(t));
    };
  },
  function (t, e, n) {
    var i = n(7),
      o = n(22),
      s = n(23),
      r = i ? i.toStringTag : void 0;
    t.exports = function (t) {
      return null == t
        ? void 0 === t
          ? "[object Undefined]"
          : "[object Null]"
        : r && r in Object(t)
        ? o(t)
        : s(t);
    };
  },
  function (t, e, n) {
    var i = n(7),
      o = Object.prototype,
      s = o.hasOwnProperty,
      r = o.toString,
      a = i ? i.toStringTag : void 0;
    t.exports = function (t) {
      var e = s.call(t, a),
        n = t[a];
      try {
        t[a] = void 0;
        var i = !0;
      } catch (t) {}
      var o = r.call(t);
      return i && (e ? (t[a] = n) : delete t[a]), o;
    };
  },
  function (t, e) {
    var n = Object.prototype.toString;
    t.exports = function (t) {
      return n.call(t);
    };
  },
  function (t, e) {
    t.exports = function (t) {
      return null != t && "object" == typeof t;
    };
  },
  function (t, e) {
    var n = [
        "input",
        "select",
        "textarea",
        "a[href]",
        "button",
        "[tabindex]",
        "audio[controls]",
        "video[controls]",
        '[contenteditable]:not([contenteditable="false"])',
      ],
      i = n.join(","),
      o =
        "undefined" == typeof Element
          ? function () {}
          : Element.prototype.matches ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
    function s(t, e) {
      e = e || {};
      var n,
        s,
        a,
        l = [],
        h = [],
        d = t.querySelectorAll(i);
      for (
        e.includeContainer &&
          o.call(t, i) &&
          (d = Array.prototype.slice.apply(d)).unshift(t),
          n = 0;
        n < d.length;
        n++
      )
        r((s = d[n])) &&
          (0 === (a = c(s))
            ? l.push(s)
            : h.push({ documentOrder: n, tabIndex: a, node: s }));
      return h
        .sort(u)
        .map(function (t) {
          return t.node;
        })
        .concat(l);
    }
    function r(t) {
      return !(
        !a(t) ||
        (function (t) {
          return (
            (function (t) {
              return h(t) && "radio" === t.type;
            })(t) &&
            !(function (t) {
              if (!t.name) return !0;
              var e = (function (t) {
                for (var e = 0; e < t.length; e++)
                  if (t[e].checked) return t[e];
              })(
                t.ownerDocument.querySelectorAll(
                  'input[type="radio"][name="' + t.name + '"]'
                )
              );
              return !e || e === t;
            })(t)
          );
        })(t) ||
        c(t) < 0
      );
    }
    function a(t) {
      return !(
        t.disabled ||
        (function (t) {
          return h(t) && "hidden" === t.type;
        })(t) ||
        (function (t) {
          return (
            null === t.offsetParent ||
            "hidden" === getComputedStyle(t).visibility
          );
        })(t)
      );
    }
    (s.isTabbable = function (t) {
      if (!t) throw new Error("No node provided");
      return !1 !== o.call(t, i) && r(t);
    }),
      (s.isFocusable = function (t) {
        if (!t) throw new Error("No node provided");
        return !1 !== o.call(t, l) && a(t);
      });
    var l = n.concat("iframe").join(",");
    function c(t) {
      var e = parseInt(t.getAttribute("tabindex"), 10);
      return isNaN(e)
        ? (function (t) {
            return "true" === t.contentEditable;
          })(t)
          ? 0
          : t.tabIndex
        : e;
    }
    function u(t, e) {
      return t.tabIndex === e.tabIndex
        ? t.documentOrder - e.documentOrder
        : t.tabIndex - e.tabIndex;
    }
    function h(t) {
      return "INPUT" === t.tagName;
    }
    t.exports = s;
  },
  function (t, e) {
    t.exports = function () {
      for (var t = {}, e = 0; e < arguments.length; e++) {
        var i = arguments[e];
        for (var o in i) n.call(i, o) && (t[o] = i[o]);
      }
      return t;
    };
    var n = Object.prototype.hasOwnProperty;
  },
  function (t, e) {
    const n = "img[data-src]";
    function i() {
      if ("connection" in navigator && !0 === navigator.connection.saveData)
        return;
      const t = new IntersectionObserver(
        (e) => {
          e.forEach(function (e) {
            e.isIntersecting &&
              (e.target.setAttribute("src", e.target.getAttribute("data-src")),
              t.unobserve(e.target));
          });
        },
        { rootMargin: "0px 0px 100% 0px" }
      );
      document.querySelectorAll(n).forEach((e) => {
        t.observe(e);
      });
    }
    "undefined" != typeof IntersectionObserver &&
      "forEach" in NodeList.prototype &&
      (i(), (window.initLazyLoad = i));
  },
  function (t, e) {
    const n = ".js-themepicker",
      i = ".js-themepicker-toggle",
      o = ".js-themepicker-themeselect",
      s = ".js-themepicker-close",
      r = ".js-nav-toggle",
      a = "is-open",
      l = "is-active";
    class c {
      constructor() {
        (this.isOpen = !1),
          (this.activeTheme = "default"),
          (this.hasLocalStorage = "undefined" != typeof Storage),
          (this.hasThemeColorMeta =
            !!document.querySelector('meta[name="theme-color"]') &&
            window.metaColors),
          (this.picker = document.querySelector(n)),
          (this.toggleBtn = document.querySelector(i)),
          (this.navToggleBtn = document.querySelector(r)),
          (this.closeBtn = document.querySelector(s)),
          (this.themeSelectBtns = Array.from(document.querySelectorAll(o))),
          this.init();
      }
      init() {
        const t = this.getSystemPreference(),
          e = this.getStoredPreference();
        e ? (this.activeTheme = e) : t && (this.activeTheme = t),
          this.setActiveItem(),
          this.bindEvents();
      }
      bindEvents() {
        this.toggleBtn.addEventListener("click", () => this.togglePicker()),
          this.closeBtn.addEventListener("click", () => this.togglePicker(!1)),
          this.navToggleBtn.addEventListener("click", () => {
            this.isOpen && this.togglePicker(!1);
          }),
          this.themeSelectBtns.forEach((t) => {
            const e = t.dataset.theme;
            e && t.addEventListener("click", () => this.setTheme(e));
          });
      }
      getSystemPreference() {
        return (
          !!window.matchMedia("(prefers-color-scheme: dark)").matches && "dark"
        );
      }
      getStoredPreference() {
        return !!this.hasLocalStorage && localStorage.getItem("theme");
      }
      setActiveItem() {
        this.themeSelectBtns.forEach((t) => {
          t.parentNode.classList.remove(l),
            t.removeAttribute("aria-checked"),
            t.dataset.theme === this.activeTheme &&
              (t.parentNode.classList.add(l),
              t.setAttribute("aria-checked", "true"));
        });
      }
      setTheme(t) {
        if (
          ((this.activeTheme = t),
          document.documentElement.setAttribute("data-theme", t),
          this.hasLocalStorage && localStorage.setItem("theme", t),
          this.hasThemeColorMeta)
        ) {
          const e = window.metaColors[t];
          document
            .querySelector('meta[name="theme-color"]')
            .setAttribute("content", e);
        }
        this.setActiveItem();
      }
      togglePicker(t) {
        if (
          ((this.isOpen = "boolean" == typeof t ? t : !this.isOpen),
          this.toggleBtn.setAttribute("aria-expanded", String(this.isOpen)),
          this.isOpen)
        )
          this.picker.removeAttribute("hidden"),
            window.setTimeout(() => {
              this.picker.classList.add(a);
            }, 1),
            this.themeSelectBtns[0].focus();
        else {
          const t = () => {
            this.picker.removeEventListener("transitionend", t),
              this.picker.setAttribute("hidden", !0);
          };
          this.picker.addEventListener("transitionend", t),
            this.picker.classList.remove(a),
            this.toggleBtn.focus();
        }
      }
    }
    window.CSS && CSS.supports("color", "var(--fake-var)") && new c();
  },
  function (t, e, n) {
    var i, o;
    (i = "undefined" != typeof window ? window : this),
      (o = function () {
        function t() {}
        let e = t.prototype;
        return (
          (e.on = function (t, e) {
            if (!t || !e) return this;
            let n = (this._events = this._events || {}),
              i = (n[t] = n[t] || []);
            return i.includes(e) || i.push(e), this;
          }),
          (e.once = function (t, e) {
            if (!t || !e) return this;
            this.on(t, e);
            let n = (this._onceEvents = this._onceEvents || {});
            return ((n[t] = n[t] || {})[e] = !0), this;
          }),
          (e.off = function (t, e) {
            let n = this._events && this._events[t];
            if (!n || !n.length) return this;
            let i = n.indexOf(e);
            return -1 != i && n.splice(i, 1), this;
          }),
          (e.emitEvent = function (t, e) {
            let n = this._events && this._events[t];
            if (!n || !n.length) return this;
            (n = n.slice(0)), (e = e || []);
            let i = this._onceEvents && this._onceEvents[t];
            for (let o of n)
              i && i[o] && (this.off(t, o), delete i[o]), o.apply(this, e);
            return this;
          }),
          (e.allOff = function () {
            return delete this._events, delete this._onceEvents, this;
          }),
          t
        );
      }),
      t.exports ? (t.exports = o()) : (i.EvEmitter = o());
  },
  function (t, e, n) {
    !(function (e, i) {
      t.exports ? (t.exports = i(e, n(2))) : i(e, e.InfiniteScroll);
    })(window, function (t, e) {
      let n = e.prototype;
      Object.assign(e.defaults, {
        loadOnScroll: !0,
        checkLastPage: !0,
        responseBody: "text",
        domParseResponse: !0,
      }),
        (e.create.pageLoad = function () {
          (this.canLoad = !0),
            this.on("scrollThreshold", this.onScrollThresholdLoad),
            this.on("load", this.checkLastPage),
            this.options.outlayer && this.on("append", this.onAppendOutlayer);
        }),
        (n.onScrollThresholdLoad = function () {
          this.options.loadOnScroll && this.loadNextPage();
        });
      let i = new DOMParser();
      function o(t) {
        let e = document.createDocumentFragment();
        return t && e.append(...t), e;
      }
      return (
        (n.loadNextPage = function () {
          if (this.isLoading || !this.canLoad) return;
          let {
              responseBody: t,
              domParseResponse: e,
              fetchOptions: n,
            } = this.options,
            o = this.getAbsolutePath();
          (this.isLoading = !0), "function" == typeof n && (n = n());
          let s = fetch(o, n)
            .then((n) => {
              if (!n.ok) {
                let t = new Error(n.statusText);
                return this.onPageError(t, o, n), { response: n };
              }
              return n[t]().then(
                (s) => (
                  "text" == t && e && (s = i.parseFromString(s, "text/html")),
                  204 == n.status
                    ? (this.lastPageReached(s, o), { body: s, response: n })
                    : this.onPageLoad(s, o, n)
                )
              );
            })
            .catch((t) => {
              this.onPageError(t, o);
            });
          return this.dispatchEvent("request", null, [o, s]), s;
        }),
        (n.onPageLoad = function (t, e, n) {
          return (
            this.options.append || (this.isLoading = !1),
            this.pageIndex++,
            this.loadCount++,
            this.dispatchEvent("load", null, [t, e, n]),
            this.appendNextPage(t, e, n)
          );
        }),
        (n.appendNextPage = function (t, e, n) {
          let {
            append: i,
            responseBody: s,
            domParseResponse: r,
          } = this.options;
          if (!("text" == s && r) || !i) return { body: t, response: n };
          let a = t.querySelectorAll(i),
            l = { body: t, response: n, items: a };
          if (!a || !a.length) return this.lastPageReached(t, e), l;
          let c = o(a),
            u = () => (
              this.appendItems(a, c),
              (this.isLoading = !1),
              this.dispatchEvent("append", null, [t, e, a, n]),
              l
            );
          return this.options.outlayer ? this.appendOutlayerItems(c, u) : u();
        }),
        (n.appendItems = function (t, e) {
          t &&
            t.length &&
            ((function (t) {
              let e = t.querySelectorAll("script");
              for (let t of e) {
                let e = document.createElement("script"),
                  n = t.attributes;
                for (let t of n) e.setAttribute(t.name, t.value);
                (e.innerHTML = t.innerHTML), t.parentNode.replaceChild(e, t);
              }
            })((e = e || o(t))),
            this.element.appendChild(e));
        }),
        (n.appendOutlayerItems = function (n, i) {
          let o = e.imagesLoaded || t.imagesLoaded;
          return o
            ? new Promise(function (t) {
                o(n, function () {
                  let e = i();
                  t(e);
                });
              })
            : (console.error(
                "[InfiniteScroll] imagesLoaded required for outlayer option"
              ),
              void (this.isLoading = !1));
        }),
        (n.onAppendOutlayer = function (t, e, n) {
          this.options.outlayer.appended(n);
        }),
        (n.checkLastPage = function (t, e) {
          let n,
            { checkLastPage: i, path: o } = this.options;
          if (i) {
            if ("function" == typeof o) {
              if (!this.getPath()) return void this.lastPageReached(t, e);
            }
            "string" == typeof i ? (n = i) : this.isPathSelector && (n = o),
              n &&
                t.querySelector &&
                (t.querySelector(n) || this.lastPageReached(t, e));
          }
        }),
        (n.lastPageReached = function (t, e) {
          (this.canLoad = !1), this.dispatchEvent("last", null, [t, e]);
        }),
        (n.onPageError = function (t, e, n) {
          return (
            (this.isLoading = !1),
            (this.canLoad = !1),
            this.dispatchEvent("error", null, [t, e, n]),
            t
          );
        }),
        (e.create.prefill = function () {
          if (!this.options.prefill) return;
          let t = this.options.append;
          t
            ? (this.updateMeasurements(),
              this.updateScroller(),
              (this.isPrefilling = !0),
              this.on("append", this.prefill),
              this.once("error", this.stopPrefill),
              this.once("last", this.stopPrefill),
              this.prefill())
            : console.error("append option required for prefill. Set as :" + t);
        }),
        (n.prefill = function () {
          let t = this.getPrefillDistance();
          (this.isPrefilling = t >= 0),
            this.isPrefilling
              ? (this.log("prefill"), this.loadNextPage())
              : this.stopPrefill();
        }),
        (n.getPrefillDistance = function () {
          return this.options.elementScroll
            ? this.scroller.clientHeight - this.scroller.scrollHeight
            : this.windowHeight - this.element.clientHeight;
        }),
        (n.stopPrefill = function () {
          this.log("stopPrefill"), this.off("append", this.prefill);
        }),
        e
      );
    });
  },
  function (t, e, n) {
    !(function (e, i) {
      t.exports
        ? (t.exports = i(e, n(2), n(3)))
        : i(e, e.InfiniteScroll, e.fizzyUIUtils);
    })(window, function (t, e, n) {
      let i = e.prototype;
      return (
        Object.assign(e.defaults, { scrollThreshold: 400 }),
        (e.create.scrollWatch = function () {
          (this.pageScrollHandler = this.onPageScroll.bind(this)),
            (this.resizeHandler = this.onResize.bind(this));
          let t = this.options.scrollThreshold;
          (t || 0 === t) && this.enableScrollWatch();
        }),
        (e.destroy.scrollWatch = function () {
          this.disableScrollWatch();
        }),
        (i.enableScrollWatch = function () {
          this.isScrollWatching ||
            ((this.isScrollWatching = !0),
            this.updateMeasurements(),
            this.updateScroller(),
            this.on("last", this.disableScrollWatch),
            this.bindScrollWatchEvents(!0));
        }),
        (i.disableScrollWatch = function () {
          this.isScrollWatching &&
            (this.bindScrollWatchEvents(!1), delete this.isScrollWatching);
        }),
        (i.bindScrollWatchEvents = function (e) {
          let n = e ? "addEventListener" : "removeEventListener";
          this.scroller[n]("scroll", this.pageScrollHandler),
            t[n]("resize", this.resizeHandler);
        }),
        (i.onPageScroll = e.throttle(function () {
          this.getBottomDistance() <= this.options.scrollThreshold &&
            this.dispatchEvent("scrollThreshold");
        })),
        (i.getBottomDistance = function () {
          let e, n;
          return (
            this.options.elementScroll
              ? ((e = this.scroller.scrollHeight),
                (n = this.scroller.scrollTop + this.scroller.clientHeight))
              : ((e = this.top + this.element.clientHeight),
                (n = t.scrollY + this.windowHeight)),
            e - n
          );
        }),
        (i.onResize = function () {
          this.updateMeasurements();
        }),
        n.debounceMethod(e, "onResize", 150),
        e
      );
    });
  },
  function (t, e, n) {
    !(function (e, i) {
      t.exports
        ? (t.exports = i(e, n(2), n(3)))
        : i(e, e.InfiniteScroll, e.fizzyUIUtils);
    })(window, function (t, e, n) {
      let i = e.prototype;
      Object.assign(e.defaults, { history: "replace" });
      let o = document.createElement("a");
      return (
        (e.create.history = function () {
          if (!this.options.history) return;
          (o.href = this.getAbsolutePath()),
            (o.origin || o.protocol + "//" + o.host) == location.origin
              ? this.options.append
                ? this.createHistoryAppend()
                : this.createHistoryPageLoad()
              : console.error(
                  `[InfiniteScroll] cannot set history with different origin: ${o.origin} on ${location.origin} . History behavior disabled.`
                );
        }),
        (i.createHistoryAppend = function () {
          this.updateMeasurements(),
            this.updateScroller(),
            (this.scrollPages = [
              { top: 0, path: location.href, title: document.title },
            ]),
            (this.scrollPage = this.scrollPages[0]),
            (this.scrollHistoryHandler = this.onScrollHistory.bind(this)),
            (this.unloadHandler = this.onUnload.bind(this)),
            this.scroller.addEventListener("scroll", this.scrollHistoryHandler),
            this.on("append", this.onAppendHistory),
            this.bindHistoryAppendEvents(!0);
        }),
        (i.bindHistoryAppendEvents = function (e) {
          let n = e ? "addEventListener" : "removeEventListener";
          this.scroller[n]("scroll", this.scrollHistoryHandler),
            t[n]("unload", this.unloadHandler);
        }),
        (i.createHistoryPageLoad = function () {
          this.on("load", this.onPageLoadHistory);
        }),
        (e.destroy.history = i.destroyHistory =
          function () {
            this.options.history &&
              this.options.append &&
              this.bindHistoryAppendEvents(!1);
          }),
        (i.onAppendHistory = function (t, e, n) {
          if (!n || !n.length) return;
          let i = n[0],
            s = this.getElementScrollY(i);
          (o.href = e),
            this.scrollPages.push({ top: s, path: o.href, title: t.title });
        }),
        (i.getElementScrollY = function (e) {
          if (this.options.elementScroll) return e.offsetTop - this.top;
          return e.getBoundingClientRect().top + t.scrollY;
        }),
        (i.onScrollHistory = function () {
          let t = this.getClosestScrollPage();
          t != this.scrollPage &&
            ((this.scrollPage = t), this.setHistory(t.title, t.path));
        }),
        n.debounceMethod(e, "onScrollHistory", 150),
        (i.getClosestScrollPage = function () {
          let e, n;
          e = this.options.elementScroll
            ? this.scroller.scrollTop + this.scroller.clientHeight / 2
            : t.scrollY + this.windowHeight / 2;
          for (let t of this.scrollPages) {
            if (t.top >= e) break;
            n = t;
          }
          return n;
        }),
        (i.setHistory = function (t, e) {
          let n = this.options.history;
          n &&
            history[n + "State"] &&
            (history[n + "State"](null, t, e),
            this.options.historyTitle && (document.title = t),
            this.dispatchEvent("history", null, [t, e]));
        }),
        (i.onUnload = function () {
          if (0 === this.scrollPage.top) return;
          let e = t.scrollY - this.scrollPage.top + this.top;
          this.destroyHistory(), scrollTo(0, e);
        }),
        (i.onPageLoadHistory = function (t, e) {
          this.setHistory(t.title, e);
        }),
        e
      );
    });
  },
  function (t, e, n) {
    !(function (e, i) {
      t.exports
        ? (t.exports = i(e, n(2), n(3)))
        : i(e, e.InfiniteScroll, e.fizzyUIUtils);
    })(window, function (t, e, n) {
      class i {
        constructor(t, e) {
          (this.element = t),
            (this.infScroll = e),
            (this.clickHandler = this.onClick.bind(this)),
            this.element.addEventListener("click", this.clickHandler),
            e.on("request", this.disable.bind(this)),
            e.on("load", this.enable.bind(this)),
            e.on("error", this.hide.bind(this)),
            e.on("last", this.hide.bind(this));
        }
        onClick(t) {
          t.preventDefault(), this.infScroll.loadNextPage();
        }
        enable() {
          this.element.removeAttribute("disabled");
        }
        disable() {
          this.element.disabled = "disabled";
        }
        hide() {
          this.element.style.display = "none";
        }
        destroy() {
          this.element.removeEventListener("click", this.clickHandler);
        }
      }
      return (
        (e.create.button = function () {
          let t = n.getQueryElement(this.options.button);
          t && (this.button = new i(t, this));
        }),
        (e.destroy.button = function () {
          this.button && this.button.destroy();
        }),
        (e.Button = i),
        e
      );
    });
  },
  function (t, e, n) {
    !(function (e, i) {
      t.exports
        ? (t.exports = i(e, n(2), n(3)))
        : i(e, e.InfiniteScroll, e.fizzyUIUtils);
    })(window, function (t, e, n) {
      let i = e.prototype;
      function o(t) {
        r(t, "none");
      }
      function s(t) {
        r(t, "block");
      }
      function r(t, e) {
        t && (t.style.display = e);
      }
      return (
        (e.create.status = function () {
          let t = n.getQueryElement(this.options.status);
          t &&
            ((this.statusElement = t),
            (this.statusEventElements = {
              request: t.querySelector(".infinite-scroll-request"),
              error: t.querySelector(".infinite-scroll-error"),
              last: t.querySelector(".infinite-scroll-last"),
            }),
            this.on("request", this.showRequestStatus),
            this.on("error", this.showErrorStatus),
            this.on("last", this.showLastStatus),
            this.bindHideStatus("on"));
        }),
        (i.bindHideStatus = function (t) {
          let e = this.options.append ? "append" : "load";
          this[t](e, this.hideAllStatus);
        }),
        (i.showRequestStatus = function () {
          this.showStatus("request");
        }),
        (i.showErrorStatus = function () {
          this.showStatus("error");
        }),
        (i.showLastStatus = function () {
          this.showStatus("last"), this.bindHideStatus("off");
        }),
        (i.showStatus = function (t) {
          s(this.statusElement),
            this.hideStatusEventElements(),
            s(this.statusEventElements[t]);
        }),
        (i.hideAllStatus = function () {
          o(this.statusElement), this.hideStatusEventElements();
        }),
        (i.hideStatusEventElements = function () {
          for (let t in this.statusEventElements) {
            o(this.statusEventElements[t]);
          }
        }),
        e
      );
    });
  },
  function (t, e) {
    /*! instant.page v3.0.0 - (C) 2019 Alexandre Dieulot - https://instant.page/license */
    let n, i;
    const o = new Set(),
      s = document.createElement("link"),
      r =
        s.relList &&
        s.relList.supports &&
        s.relList.supports("prefetch") &&
        window.IntersectionObserver &&
        "isIntersecting" in IntersectionObserverEntry.prototype,
      a = "instantAllowQueryString" in document.body.dataset,
      l = "instantAllowExternalLinks" in document.body.dataset,
      c = "instantWhitelist" in document.body.dataset;
    let u = 65,
      h = !1,
      d = !1,
      f = !1;
    if ("instantIntensity" in document.body.dataset) {
      const t = document.body.dataset.instantIntensity;
      if ("mousedown" == t.substr(0, "mousedown".length))
        (h = !0), "mousedown-only" == t && (d = !0);
      else if ("viewport" == t.substr(0, "viewport".length))
        (navigator.connection &&
          (navigator.connection.saveData ||
            navigator.connection.effectiveType.includes("2g"))) ||
          ("viewport" == t
            ? document.documentElement.clientWidth *
                document.documentElement.clientHeight <
                45e4 && (f = !0)
            : "viewport-all" == t && (f = !0));
      else {
        const e = parseInt(t);
        isNaN(e) || (u = e);
      }
    }
    if (r) {
      const t = { capture: !0, passive: !0 };
      if (
        (d ||
          document.addEventListener(
            "touchstart",
            function (t) {
              i = performance.now();
              const e = t.target.closest("a");
              m(e) && g(e.href);
            },
            t
          ),
        h
          ? document.addEventListener(
              "mousedown",
              function (t) {
                const e = t.target.closest("a");
                m(e) && g(e.href);
              },
              t
            )
          : document.addEventListener(
              "mouseover",
              function (t) {
                if (performance.now() - i < 1100) return;
                const e = t.target.closest("a");
                m(e) &&
                  (e.addEventListener("mouseout", p, { passive: !0 }),
                  (n = setTimeout(() => {
                    g(e.href), (n = void 0);
                  }, u)));
              },
              t
            ),
        f)
      ) {
        let t;
        (t = window.requestIdleCallback
          ? (t) => {
              requestIdleCallback(t, { timeout: 1500 });
            }
          : (t) => {
              t();
            })(() => {
          const t = new IntersectionObserver((e) => {
            e.forEach((e) => {
              if (e.isIntersecting) {
                const n = e.target;
                t.unobserve(n), g(n.href);
              }
            });
          });
          document.querySelectorAll("a").forEach((e) => {
            m(e) && t.observe(e);
          });
        });
      }
    }
    function p(t) {
      (t.relatedTarget &&
        t.target.closest("a") == t.relatedTarget.closest("a")) ||
        (n && (clearTimeout(n), (n = void 0)));
    }
    function m(t) {
      if (
        t &&
        t.href &&
        (!c || "instant" in t.dataset) &&
        (l || t.origin == location.origin || "instant" in t.dataset) &&
        ["http:", "https:"].includes(t.protocol) &&
        ("http:" != t.protocol || "https:" != location.protocol) &&
        (a || !t.search || "instant" in t.dataset) &&
        !(
          (t.hash &&
            t.pathname + t.search == location.pathname + location.search) ||
          "noInstant" in t.dataset
        )
      )
        return !0;
    }
    function g(t) {
      if (o.has(t)) return;
      const e = document.createElement("link");
      (e.rel = "prefetch"),
        (e.href = t),
        document.head.appendChild(e),
        o.add(t);
    }
  },
  function (t, e) {
    !(function () {
      if (!("customElements" in window) || !("fetch" in window)) return;
      const t = "speedlify-score";
      const e = new (class {
        constructor() {
          (this.fetches = {}), (this.responses = {}), (this.urls = {});
        }
        async fetch(t, e) {
          if (this.urls[t]) return !!this.urls[t][e] && this.urls[t][e].hash;
          this.fetches[t] || (this.fetches[t] = fetch(t + "/api/urls.json"));
          let n = await this.fetches[t];
          this.responses[t] || (this.responses[t] = n.json());
          let i = await this.responses[t];
          return (this.urls[t] = i), !!i[e] && i[e].hash;
        }
      })();
      customElements.define(
        t,
        class extends HTMLElement {
          connectedCallback() {
            (this.speedlifyUrl = this.getAttribute("speedlify-url")),
              (this.shorthash = this.getAttribute("hash")),
              (this.rawData = this.getAttribute("raw-data")),
              (this.url = this.getAttribute("url") || window.location.href),
              (this.urlStore = e),
              this.rawData || this.speedlifyUrl
                ? this.init()
                : console.log(`Missing \`speedlify-url\` attributes in <${t}>`);
          }
          async init() {
            if (this.rawData)
              return void (this.innerHTML = this.render(
                JSON.parse(this.rawData)
              ));
            let e = this.shorthash;
            if (
              (e ||
                (e = await this.urlStore.fetch(this.speedlifyUrl, this.url)),
              !e)
            )
              return void console.error(
                `<${t}> could not find hash for URL: ${this.url}`
              );
            let n = await this.fetchData(e);
            this.innerHTML = this.render(n);
          }
          async fetchData(t) {
            let e = await fetch(`${this.speedlifyUrl}/api/${t}.json`);
            return await e.json();
          }
          getScoreClass(t) {
            return t < 0.5
              ? "speedlify-score speedlify-score-bad"
              : t < 0.9
              ? "speedlify-score speedlify-score-ok"
              : "speedlify-score speedlify-score-good";
          }
          getScoreTemplate(t) {
            let e = [];
            return (
              e.push(
                `<span title="Performance" class="${this.getScoreClass(
                  t.lighthouse.performance
                )}">${parseInt(100 * t.lighthouse.performance, 10)}</span>`
              ),
              e.push(
                `<span title="Accessibility" class="${this.getScoreClass(
                  t.lighthouse.accessibility
                )}">${parseInt(100 * t.lighthouse.accessibility, 10)}</span>`
              ),
              e.push(
                `<span title="Best Practices" class="${this.getScoreClass(
                  t.lighthouse.bestPractices
                )}">${parseInt(100 * t.lighthouse.bestPractices, 10)}</span>`
              ),
              e.push(
                `<span title="SEO" class="${this.getScoreClass(
                  t.lighthouse.seo
                )}">${parseInt(100 * t.lighthouse.seo, 10)}</span>`
              ),
              e.join(" ")
            );
          }
          render(t) {
            let e = [],
              n = this.getScoreTemplate(t);
            ((this.hasAttribute("requests") ||
              this.hasAttribute("weight") ||
              this.hasAttribute("rank")) &&
              !this.hasAttribute("score")) ||
              e.push(n);
            let i = t.weight.summary.split(" • ");
            if (
              (this.hasAttribute("requests") &&
                e.push(`<span class="speedlify-requests">${i[0]}</span>`),
              this.hasAttribute("weight") &&
                e.push(`<span class="speedlify-weight">${i[1]}</span>`),
              this.hasAttribute("rank"))
            ) {
              let n = this.getAttribute("rank-url");
              e.push(
                `<${n ? `a href="${n}"` : "span"} class="speedlify-rank">${
                  t.ranks.cumulative
                }</${n ? "a" : "span"}>`
              );
            }
            if (this.hasAttribute("rank-change") && t.previousRanks) {
              let n = t.previousRanks.cumulative - t.ranks.cumulative;
              e.push(
                `<span class="speedlify-rank-change ${
                  n > 0 ? "up" : n < 0 ? "down" : "same"
                }">${0 !== n ? Math.abs(n) : ""}</span>`
              );
            }
            return e.join("");
          }
        }
      );
    })();
  },
  function (t, e, n) {
    "serviceWorker" in navigator &&
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch((t) => {
          console.error("SW registration failed: ", t);
        });
      }),
      window.addEventListener("beforeinstallprompt", (t) => t.preventDefault());
  },
  ,
  function (t, e, n) {
    "use strict";
    n.r(e);
    n(12), n(13);
    var i = n(8),
      o = n.n(i),
      s = n(9),
      r = n.n(s);
    const a = ".js-nav",
      l = ".js-nav-menu",
      c = ".js-nav-toggle",
      u = "no-scroll",
      h = "nav--open",
      d = "nav__menu--visible";
    class f {
      constructor() {
        (this.isOpen = !1),
          (this.nav = document.querySelector(a)),
          (this.menu = this.nav.querySelector(l)),
          (this.toggleBtn = this.nav.querySelector(c)),
          (this.focusTrap = r()(this.nav, {
            onDeactivate: () => this.toggleMenu(!1),
          })),
          this.bindEvents();
      }
      bindEvents() {
        this.toggleBtn.addEventListener("click", () => this.toggleMenu()),
          window.addEventListener("resize", o()(f.setScreenDiameter, 200)),
          f.setScreenDiameter();
      }
      toggleMenu(t) {
        (this.isOpen = "boolean" == typeof t ? t : !this.isOpen),
          document.body.classList.toggle(u, this.isOpen),
          this.nav.classList.toggle(h, this.isOpen),
          this.toggleBtn.setAttribute("aria-expanded", String(this.isOpen)),
          window.setTimeout(() => {
            this.menu.classList.toggle(d, this.isOpen);
          }, 50),
          this.isOpen ? this.focusTrap.activate() : this.focusTrap.deactivate();
      }
      static setScreenDiameter() {
        const t = (() => {
            const t = window,
              e = document,
              n = e.documentElement,
              i = e.getElementsByTagName("body")[0];
            return {
              width: t.innerWidth || n.clientWidth || i.clientWidth,
              height: t.innerHeight || n.clientHeight || i.clientHeight,
            };
          })(),
          e = Math.sqrt(t.height ** 2 + t.width ** 2);
        document.documentElement.style.setProperty("--diameter", e + "px");
      }
    }
    document.querySelector(a) && new f();
    n(27), n(28), n(29);
    var p = n(10),
      m = n.n(p);
    const g = ".js-infinitescroll-container",
      v = ".js-infinitescroll-item",
      y = ".js-infinitescroll-pagination",
      b = ".js-infinitescroll-next";
    !(function () {
      const t = document.querySelector(g),
        e = document.querySelector(b);
      if (t && e) {
        new m.a(t, { path: b, append: v, hideNav: y });
        0;
      }
    })();
    n(36), n(37), n(38);
    document.documentElement.classList.remove("no-js");
  },
]);
