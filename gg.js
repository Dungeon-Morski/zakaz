function t_store_fixImgs() {
    var t, e;
    /Version\/16\.3 Safari/.test(navigator.userAgent) && ["754", "776", "778", "786", "1025"].forEach((function(t) {
        var e = document.querySelectorAll('[data-record-type="' + t + '"] .t-img');
        Array.prototype.forEach.call(e, (function(t) {
            t.style.objectFit = "contain"
        }))
    }))
}

function t_store_init(t, e) {
    var r = document.getElementById("rec" + t),
        o;
    r && (window.tStoreInit || (window.tStoreInit = {}), window.tStoreInit[t] = !0, "IntersectionObserver" in window && Object.keys(window.tStoreInit).length > 7 ? (window.tStoreInit[t] = "lazy", new IntersectionObserver((function(r, o) {
        r.forEach((function(r) {
            if (r.isIntersecting) {
                var i = r.target;
                o.unobserve(i), "lazy" === window.tStoreInit[t] && (t_store_lazyInit(t, e), window.tStoreInit[t] = !0)
            }
        }))
    }), {
        rootMargin: "150px 0px"
    }).observe(r)) : t_store_lazyInit(t, e))
}

function t_store_lazyInit(t, e) {
    var r = document.getElementById("rec" + t),
        o;
    document.getElementById("allrecords") !== document.querySelector(".t-store__product-snippet") && document.getElementById("allrecords").contains(document.querySelector(".t-store__product-snippet")) || t_store_initRouting(), window.tStoreDict || t_store_getDictObj();
    var i = r.querySelector(".js-store"),
        s = t_store_get_productPopup_html(t, e);
    i && i.insertAdjacentHTML("beforeend", s);
    var a = document.getElementById("allrecords").getAttribute("data-tilda-mode");
    e.isPublishedPage = "edit" !== a && "preview" !== a, e.isPublishedPage && t_store_checkUrl(e, t);
    var n = document.getElementById("record" + t),
        d;
    if (n && !e.isPublishedPage && "y" == n.getAttribute("off")) return;
    var c = r.querySelector(".js-store-grid-cont-preloader");
    if ("" !== e.storepart) {
        setTimeout((function() {
            c && c.classList.remove("t-store__grid-cont-preloader_hidden")
        }), 1e3);
        var l = 1,
            _ = t_store_paramsToObj(t, e);
        if (_[t]) {
            var p = t_store_updateOptionsBasedOnUrl(e, _, t);
            p && (e = p)
        }
        if (e.sidebar) {
            var u = r.querySelector(".js-store-parts-select-container"),
                g;
            if (u) u.querySelector(".t951__sidebar") || u.insertAdjacentHTML("afterbegin", '<div class="t951__sidebar-wrapper"></div>')
        }
        var m = function() {
                _[t] && _[t].page && (l = Array.isArray(_[t].page) ? _[t].page.join("") : _[t].page), t_store_loadProducts("", t, e, l), t_store_mobileHoriz_checkBtnVisibility(t, e)
            },
            v = function() {
                _[t] && p && r.addEventListener("controlsDrawn", (function() {
                    t_store_filters_render_selected(e, t)
                })), e.sidebar && r.addEventListener("controlsDrawn", (function() {
                    t_store_filters_opts_sort(e, t)
                })), l = 1, m()
            },
            y = function(e) {
                if (window.tStoreFilters || (window.tStoreFilters = {}), e && (e.filters && e.filters.length > 0 || e.search || e.sort)) {
                    window.tStoreFilters[t] = e;
                    var r = "tilda-catalog-filters-1.0";
                    if (document.head.querySelector('script[src*="' + r + '"]')) t_store_onFuncLoad("t_store_filters_init", (function() {
                        v()
                    }));
                    else {
                        var o = document.createElement("script");
                        o.type = "text/javascript", o.src = "https://static.tildacdn.com/js/" + r + ".min.js", o.onload = v, o.onerror = function() {
                            console.error("Failed to load tilda-catalog-filters: ", this.src), m()
                        }, document.head.appendChild(o)
                    }
                    if (!document.head.querySelector('link[href*="' + r + '"]')) {
                        var i = document.createElement("link");
                        i.rel = "stylesheet", i.type = "text/css", i.href = "https://static.tildacdn.com/css/" + r + ".min.css", i.media = "all", document.head.appendChild(i)
                    }
                } else m()
            };
        if (t_store_loadFilters(e, y, (function(t) {
                t_store_changeEndpoint(t, (function() {
                    t_store_loadFilters(e, y)
                }))
            })), e.isHorizOnMob) {
            var f = t_store_get_handIcon_html(t);
            c && c.insertAdjacentHTML("beforebegin", f)
        }
        if (e.tabs) {
            var h = "tilda-catalog-tabs-1.0",
                w, b;
            if (!document.head.querySelector('script[src*="' + h + '"]'))(w = document.createElement("script")).type = "text/javascript", w.src = "https://static.tildacdn.com/js/" + h + ".min.js", w.onerror = function() {
                console.error("Failed to load tilda-catalog-tabs: ", this.src)
            }, document.head.appendChild(w);
            if (!document.head.querySelector('link[href*="' + h + '"]'))(b = document.createElement("link")).rel = "stylesheet", b.type = "text/css", b.href = "https://static.tildacdn.com/css/" + h + ".min.css", b.media = "all", document.head.appendChild(b)
        }
        if (e.showPagination && "on" === e.showPagination) {
            var h = "tilda-catalog-pagination-1.0",
                w, b;
            if (!document.head.querySelector('script[src*="' + h + '"]'))(w = document.createElement("script")).type = "text/javascript", w.src = "https://static.tildacdn.com/js/" + h + ".min.js", w.onerror = function() {
                console.error("Failed to load tilda-catalog-pagination: ", this.src)
            }, document.head.appendChild(w);
            if (!document.head.querySelector('link[href*="' + h + '"]'))(b = document.createElement("link")).rel = "stylesheet", b.type = "text/css", b.href = "https://static.tildacdn.com/css/" + h + ".min.css", b.media = "all", document.head.appendChild(b)
        }
        window.addEventListener("resize", t_throttle((function() {
            r && ("1025" == e.prodCard.blockId ? t_store_unifyCardsWidth(t) : t_store_unifyCardsHeights(t, e), t_store_loadMoreBtn_display(t), (e.sidebar || Object.keys(e.filters || {}).length > 1) && t_store_moveSearhSort(t, e), e.showPagination && "on" === e.showPagination && t_store_onFuncLoad("t_store_pagination_display", (function() {
                t_store_pagination_display(t)
            })))
        })));
        var S = r.querySelector(".t-store");
        S && S.addEventListener("displayChanged", (function() {
            setTimeout((function() {
                t_store_unifyCardsHeights(t, e)
            }))
        })), S && S.addEventListener("displayChanged", (function() {
            setTimeout((function() {
                t_store_unifyCardsWidth(t)
            }))
        }));
        try {
            e.verticalAlignButtons && (window.addEventListener("resize", t_throttle((function() {
                t_store_verticalAlignButtons(t, e)
            }), 500)), S && S.addEventListener("displayChanged", (function() {
                t_store_verticalAlignButtons(t, e)
            })))
        } catch (t) {
            console.log("verticalAlignButtons error: " + t)
        }
    } else if (c.style.display = "none", e.sidebar) {
        var E = r.querySelector(".t951__grid-cont");
        E && E.classList.remove("t951__grid-cont_hidden")
    }
}

function t_store_history_pushState(t, e, r) {
    void 0 !== history.pushState && window.history.pushState(t, e, r)
}

function t_store_productInit(t, e, r) {
    t_store_snippet_initProduct(t, e, r)
}

function t_store_snippet_initProduct(t, e, r) {
    var o = document.querySelector("#rec" + t),
        i = o.querySelector(".t-store__product-snippet.js-store-product"),
        s = t_store_snippet_getJsonFromUrl();
    if ("100" === e.popup_opts.popupContainer) {
        var a = i.querySelector(".t-container");
        a.style.maxWidth = "100%", a.firstElementChild && a.firstElementChild.classList.add("t-container_fluid")
    }
    t_store_drawProdPopup_drawGallery(t, i, r, e);
    var n = function() {
            t_store_addProductOptions(t, r, i, e, "largecard"), t_store_snippet_chooseEditionFromUrl(t, r, i, e), t_store_onFuncLoad("t_prod__init", (function() {
                t_prod__init(t)
            }))
        },
        d = document.getElementById("allrecords");
    if (d) {
        var c = d.getAttribute("data-tilda-project-lang");
        c && (window.tStoreBrowserLang = c)
    }
    if (window.tStoreDict || t_store_getDictObj(), e.tabs) {
        var l = "tilda-catalog-tabs-1.0";
        if (document.head.querySelector('script[src*="' + l + '"]')) t_onFuncLoad("t_store_tabs_initSnippet", (function() {
            t_store_tabs_initSnippet(t, e, i, r), n()
        }));
        else {
            var _ = document.createElement("script");
            _.type = "text/javascript", _.src = "https://static.tildacdn.com/js/" + l + ".min.js", _.onload = function() {
                t_store_tabs_initSnippet(t, e, i, r), n()
            }, _.onerror = function() {
                console.error("Failed to load tilda-catalog-tabs: ", this.src)
            }, document.head.appendChild(_)
        }
        if (!document.head.querySelector('link[href*="' + l + '"]')) {
            var p = document.createElement("link");
            p.rel = "stylesheet", p.type = "text/css", p.href = "https://static.tildacdn.com/css/" + l + ".min.css", p.media = "all", document.head.appendChild(p)
        }
    } else t_store_initTextAndCharacteristics(i, r), n();
    var u = i.querySelector(".js-store-prod-sku");
    if (u && "none" !== u.style.display && u.insertAdjacentHTML("beforebegin", window.tStoreDict.sku + ": "), i.setAttribute("data-product-gen-uid", r.uid), i.setAttribute("data-product-part-uid", r.partuids ? r.partuids.join(",") : ""), t_store__triggerEvent(document.body, "twishlist_addbtn"), !e.relevants_slider) {
        var g = o.querySelector(".t-store__relevants-grid-cont.t-store__grid-cont_mobile-one-row");
        if (g) {
            var m = t_store_get_handIcon_html(t);
            g.insertAdjacentHTML("beforebegin", m)
        }
    }
    setTimeout((function() {
        !window.tStoreIsSearchBot && window.Tilda && "function" == typeof Tilda.sendEcommerceEvent && (s.editionuid ? r.editions.forEach((function(t) {
            t.uid === s.editionuid && Tilda.sendEcommerceEvent("detail", [{
                id: "" + t.uid,
                uid: "" + t.uid,
                price: "" + t.price,
                sku: t.sku ? t.sku : "",
                name: r.title
            }])
        })) : Tilda.sendEcommerceEvent("detail", [{
            id: "" + (r.id ? r.id : r.uid),
            uid: "" + r.uid,
            price: "" + (r.price_min ? r.price_min : r.price),
            sku: r.sku ? r.sku : "",
            name: r.title
        }]))
    }), 3e3)
}

function t_store_initRouting() {
    window.onpopstate = function() {
        if (window.history.state && window.history.state.productData) {
            var t = window.history.state.productData,
                e, r, o, i;
            t_store_openProductPopup(t.recid, t.opts, t.productObj, t.isRelevantsShow)
        }
    }
}

function t_store_verticalAlignButtons(t, e) {
    var r = document.getElementById("rec" + t);
    if (r) {
        var o = r.querySelector(".js-store-grid-cont");
        o && o.classList.add("t-store__valign-buttons");
        var i = r.querySelectorAll(".js-store-grid-cont .t-store__card__textwrapper"),
            s = 0,
            a = parseInt(e.blocksInRow, 10),
            n = window.innerWidth <= 480,
            d = window.innerWidth <= 960 && window.innerWidth > 480,
            c = !!(window.innerWidth <= 960 && r.querySelector(".js-store-grid-cont.t-store__grid-cont_mobile-one-row")),
            l = !!(window.innerWidth <= 480 && r.querySelector(".t-store__mobile-two-columns"));
        n && (a = 1), d && (a = 2), l && (a = 2), c && (a = 999999);
        var _ = 1,
            p = [];
        if (i && Array.prototype.forEach.call(i, (function(t) {
                t.style.height = "unset", 1 === a ? t.style.height = "auto" : (p.push(t), t.offsetHeight > s && (s = t.offsetHeight), Array.prototype.forEach.call(p, (function(t) {
                    t.style.height = s + "px"
                })), _ === a && (_ = 0, s = 0, p = []), _++)
            })), e.showRelevants) {
            var u = r.querySelectorAll(".js-product-relevant .t-store__card__textwrapper"),
                g = 0,
                m = [];
            Array.prototype.forEach.call(u, (function(t) {
                t.style.height = "unset"
            })), Array.prototype.forEach.call(u, (function(t) {
                m.push(t), t.offsetHeight > g && (g = t.offsetHeight), Array.prototype.forEach.call(m, (function(t) {
                    t.style.height = g + "px"
                }))
            }))
        }
    }
}

function t_store_hoverZoom_init(t) {
    var e;
    if (document.getElementById("rec" + t).querySelector("[data-hover-zoom]")) {
        var r = document.head,
            o = document.createElement("script");
        o.type = "text/javascript", o.src = "https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js", o.onload = function() {
            t_hoverZoom_init(t)
        }, o.onerror = function(t) {
            console.log("Upload script error: " + t)
        }, r.appendChild(o)
    }
}

function t_store_loadProducts(t, e, r, o, i) {
    window.tStoreProductsRequested = !0;
    var s = "relevants" === t,
        a = Date.now(),
        n = r.storepart,
        d = !o || 1 === parseInt(o, 10),
        c = document.getElementById("rec" + e),
        l = s ? c.querySelector(".js-store-relevants-grid-cont") : c.querySelector(".js-store-grid-cont"),
        _ = "973" === c.getAttribute("data-record-type"),
        p, l;
    s ? (p = {
        storepartuid: n,
        productuid: i.currentProductUid,
        quantity: i.relevantsQuantity,
        method: i.relevantsMethod,
        sort: i.relevantsSort
    }, (l = c.querySelector(".t-store__relevants-grid-cont")) && (l.style.opacity = 0)) : p = {
        storepartuid: n,
        recid: e,
        c: a
    };
    d && (p.getparts = !0, p.getoptions = !0), o && (p.slice = o), r.filters && (p.filters = r.filters, p.getparts = !0), r.sort && !s && (p.sort = r.sort), r.size && r.size > 0 && (p.size = r.size), window.t_store_endpoint || (window.t_store_endpoint = "store.tildacdn.com");
    var u = "https://" + window.t_store_endpoint + "/api" + (s ? "/getrelevantproducts/" : "/getproductslist/");
    r.isPublishedPage || (p.projectid = document.getElementById("allrecords").getAttribute("data-tilda-project-id"), u = "https://tilda.cc/projects/store" + (s ? "/getrelevantproducts/" : "/getproductslist/"));
    var g = Date.now();
    window.tStoreXHR || (window.tStoreXHR = {}), window.tStoreXHR[e] && (window.tStoreXHR[e].abort(), delete window.tStoreXHR[e]);
    var m = new XMLHttpRequest;
    window.tStoreXHR[e] = m, m.onload = function() {
        if (m.readyState === m.DONE && 200 === m.status) {
            var t = m.responseText;
            clearTimeout(c.getAttribute("data-preloader-timeout"));
            var i = c.querySelector(".js-store-grid-cont-preloader");
            if (i && (i.style.display = "none"), r.sidebar) {
                var a = c.querySelector(".t951__grid-cont");
                a && a.classList.remove("t951__grid-cont_hidden")
            }
            if (d && l && (l.innerHTML = ""), "string" == typeof t && "{" !== t.substring(0, 1) && (-1 !== t.indexOf("ERROR:") || -1 !== t.indexOf("Wrong"))) {
                var n = t_store_get_errorBox(r, t);
                return l.insertAdjacentHTML("beforeend", n), void t_store__fadeIn(c.querySelector(".js-store-error-msg"))
            }
            if ("" === t) return;
            var p = {};
            try {
                (p = JSON.parse(t)).partlinks && (r.linksSizeChart = p.partlinks)
            } catch (e) {
                console.log(t)
            }
            if ("object" != typeof p) return;
            var u = s ? p.relevants : p.products;
            if (p.options && p.options.length >= 1 && (window.tStoreOptionsList = p.options), t_store_process(u, e, r, !!o, s, p), p.parts && p.parts.length > 1 && !c.querySelector(".js-store-parts-switcher") && !r.hideStoreParts) {
                var g = function() {
                        t_store_onFuncLoad("t_store_addStoreParts", (function() {
                            t_store_addStoreParts(e, r, p.parts), t_store_setActiveStorePart(e)
                        }))
                    },
                    v = "tilda-catalog-filters-1.0";
                if (document.head.querySelector('script[src*="' + v + '"]')) g();
                else {
                    var y = document.createElement("script");
                    y.type = "text/javascript", y.src = "https://static.tildacdn.com/js/" + v + ".min.js", y.onload = g, y.onerror = function() {
                        console.error("Failed to load tilda-catalog-filters: ", this.src)
                    }, document.head.appendChild(y)
                }
                if (!document.head.querySelector('link[href*="' + v + '"]')) {
                    var f = document.createElement("link");
                    f.rel = "stylesheet", f.type = "text/css", f.href = "https://static.tildacdn.com/css/" + v + ".min.css", f.media = "all", document.head.appendChild(f)
                }
            }
            window.tStoreFilters || (window.tStoreFilters = {});
            var t = window.tStoreFilters[e];
            if ("y" === p.filter && !r.hideFilters && t) t && (t.filters && t.filters.length > 0 || t.search || t.sort) && t_store_onFuncLoad("t_store_filters_init", (function() {
                t_store_filters_init(e, r, t), s || t_store_filters_prodsNumber_update(c, r, p)
            }));
            else if (r.sidebar && !s && p.parts && 0 === p.parts.length) {
                var h = c.querySelector(".t951__sidebar");
                if (h) {
                    h.classList.add("t951__sidebar_empty");
                    var w = "RU" === window.tStoreBrowserLang ? '????????????????????, ???????????????? ???????? ???? ???????? ???????????? ???????????????? ?????? ?????????????????????? ?????????????? ???????????? ????????????????. <a href="https://help-ru.tilda.cc/online-store-payments/filters" target="_blank" rel="nofollow noopener">??????????????</a>' : 'Please <a href="https://help.tilda.cc/online-store-payments/filters" target="_blank" rel="nofollow noopener">add at least one catalog filter</a> to display the store sidebar';
                    h.innerHTML = '<span class="t-text t-text_xxs">' + w + "</span>"
                }
            }
            if (t_store_isQueryInAddressBar("tstore") && window.t_store__scrollToBlock) {
                var b = decodeURI(window.location.hash).split("/"),
                    S = b.indexOf("r") + 1,
                    E;
                b[S] === e && ("scrollBehavior" in document.documentElement.style ? window.scrollTo({
                    left: 0,
                    top: c.getBoundingClientRect().top + window.pageYOffset - 50,
                    behavior: "smooth"
                }) : window.scrollTo(0, c.getBoundingClientRect().top + window.pageYOffset - 50), window.t_store__scrollToBlock = null)
            }
            var A = c.querySelector(".js-store-load-more-btn");
            A && A.classList.remove("t-btn_sending");
            var C = t_throttle((function() {
                    if (!window.tStoreProductsRequested && window.innerWidth < 960) {
                        var t = l.scrollWidth,
                            e = l.scrollLeft,
                            r;
                        l.offsetWidth + e + 20 > t && "none" !== A.style.display && (A.click(), l.removeEventListener("scroll", C))
                    }
                })),
                x = l && l.classList.contains("t-store__grid-cont_mobile-one-row");
            if (p.nextslice) {
                if (!A) {
                    var q;
                    if (A = t_store_get_loadMoreBtn_html(c, r), r.sidebar) c.querySelector(".t951__cont-w-filter .t951__cont-wrapper + .t-store__pagination") || c.querySelector(".t951__cont-w-filter").insertAdjacentHTML("beforeend", A);
                    else if (!s) {
                        var j = c.querySelector(".js-store-grid-cont");
                        j && j.insertAdjacentHTML("afterend", A)
                    }
                    A = c.querySelector(".js-store-load-more-btn")
                }
                if (A) {
                    A.style.display = "";
                    var k = function() {
                        window.tStoreProductsRequested || (A.classList.add("t-btn_sending"), t_store_loadProducts("", e, r, p.nextslice))
                    };
                    A.parentNode.replaceChild(A.cloneNode(!0), A), (A = c.querySelector(".js-store-load-more-btn")).addEventListener("click", k)
                }
                x && l.addEventListener("scroll", C)
            } else s || (A && (A.style.display = "none"), l && l.removeEventListener("scroll", C));
            if (r.showPagination && "on" === r.showPagination && !s && t_store_onFuncLoad("t_store_pagination_draw", (function() {
                    t_store_pagination_draw(e, r, o, p.total)
                })), x) {
                var L = document.getElementById("allrecords").getAttribute("data-tilda-mode");
                l && "edit" !== L && "preview" !== L && ("y" !== window.lazy && "yes" !== document.getElementById("allrecords").getAttribute("data-tilda-lazy") || t_store_onFuncLoad("t_lazyload_update", (function() {
                    l.addEventListener("scroll", t_throttle((function() {
                        t_lazyload_update()
                    })))
                })))
            }
            if (s) {
                c.querySelector(".t-store__relevants-grid-cont").style.opacity = 1;
                var P = 4;
                r.relevants_slider && (u.length > 4 || window.innerWidth <= 960) && t_store_onFuncLoad("t_sldsInit", (function() {
                    t_sldsInit(e + " .js-store-relevants-grid-cont")
                }))
            }
            _ && !s && t_store_onFuncLoad("t_sldsInit", (function() {
                t_sldsInit(e + " .js-store-grid-cont")
            })), r.verticalAlignButtons && t_store_verticalAlignButtons(e, r), r.verticalAlignButtons && ("complete" === document.readyState ? t_store_verticalAlignButtons(e, r) : window.addEventListener("load", (function() {
                t_store_verticalAlignButtons(e, r)
            }))), r.itemsAnim && r.previewmode && t_store_onFuncLoad("t_animate__startAnimation", (function() {
                t_animate__startAnimation()
            })), l.style.height = "", t_store__triggerEvent(document.body, "twishlist_addbtn"), t_store__triggerEvent(l, "tStoreRendered"), window.tStoreProductsRequested = !1
        }
    }, m.ontimeout = m.onerror = function() {
        if ("store.tildacdn.com" === window.t_store_endpoint) t_store_changeEndpoint(m, (function() {
            t_store_loadProducts(t, e, r, o, i)
        }));
        else {
            var s = c.querySelector(".js-store-load-more-btn");
            s && s.classList.remove("t-btn_sending");
            var a = Date.now() - g;
            0 === m.status && a < 100 && console.log("Request error (get store products). Please check internet connection..."), window.tStoreProductsRequested = !1;
            var n = c.querySelector(".js-store-grid-cont-preloader");
            n && (n.style.display = "none");
            var d = t_store_get_errorBox(r, 'Request timeout (40s). Please check internet connection and <a href="javascript:window.location.reload();" style="text-decoration:underline">reload the page</a>. If the situation has not changed, please contact support <a href="mailto:team@tilda.cc?subject=Unable to get a catalog" style="text-decoration:underline">team@tilda.cc</a>.');
            l.insertAdjacentHTML("beforeend", d), t_store__fadeIn(c.querySelector(".js-store-error-msg"))
        }
    }, m.open("GET", u + "?" + t_store__serializeData(p)), m.timeout = 2e4, m.send()
}

function t_store_loadOneProduct(t, e, r, o, i) {
    var s = Date.now(),
        a, n = {
            storepartuid: e.storepart,
            recid: t,
            productuid: r,
            c: s
        },
        d = new XMLHttpRequest;
    d.onload = function() {
        d.readyState === d.DONE && 200 === d.status && o()
    }, d.ontimeout = d.onerror = function() {
        console.log("Can't get product with uid = " + r + " in storepart = " + e.storepart), "function" == typeof i && i(d)
    }, window.t_store_endpoint || (window.t_store_endpoint = "store.tildacdn.com"), d.open("GET", "https://" + window.t_store_endpoint + "/api/getproduct/?" + t_store__serializeData(n)), d.timeout = 2e4, d.send()
}

function t_store_loadProducts_byId(t, e, r, o) {
    var i = Date.now(),
        s = {
            productsuid: t,
            c: i
        };
    window.t_store_endpoint || (window.t_store_endpoint = "store.tildacdn.com");
    var a = "https://" + window.t_store_endpoint + "/api/getproductsbyuid/";
    e && !e.isPublishedPage && (s.projectid = document.getElementById("allrecords").getAttribute("data-tilda-project-id"), a = "https://tilda.cc/projects/store/getproductsbyuid/"), s = JSON.stringify(s);
    var n = new XMLHttpRequest;
    n.onload = function() {
        n.readyState === n.DONE && 200 === n.status && ("string" == typeof n.responseText && "{" === n.responseText.substring(0, 1) || console.log("Can't get products array by uid list"), r(JSON.parse(n.responseText)))
    }, n.ontimeout = n.onerror = function() {
        console.log("Can't get getproductsbyuid. Requesting idArr: " + t), "function" == typeof o && o(n)
    }, n.open("POST", a), n.timeout = 2e4, n.send(s)
}

function t_store_loadFilters(t, e, r) {
    var o = Date.now(),
        i, s = {
            storepartuid: t.storepart,
            c: o
        };
    window.t_store_endpoint || (window.t_store_endpoint = "store.tildacdn.com");
    var a = "https://" + window.t_store_endpoint + "/api/getfilters/";
    if (!t.isPublishedPage) {
        var n = document.getElementById("allrecords");
        n && (s.projectid = n.getAttribute("data-tilda-project-id")), a = "https://tilda.cc/projects/store/getfilters/"
    }
    var d = new XMLHttpRequest;
    d.onload = function() {
        if (d.readyState === d.DONE && 200 === d.status) try {
            e(JSON.parse(d.responseText))
        } catch (t) {
            e()
        }
    }, d.ontimeout = d.onerror = function() {
        console.log("Can't get filters in storepart = " + t.storepart), "function" == typeof r && r(d)
    }, d.open("GET", a + "?" + t_store__serializeData(s)), d.timeout = 2e4, d.send()
}

function t_store_process(t, e, r, o, i, s) {
    var a = document.getElementById("rec" + e);
    if (a) {
        var n = a.querySelector(".js-store-grid-cont");
        if (n) {
            var d = "973" === a.getAttribute("data-record-type"),
                c = "1025" === r.prodCard.blockId,
                l = !!r.prodCard.hasWrap,
                _ = document.getElementById("allrecords") !== document.querySelector(".t-store__product-snippet") && document.getElementById("allrecords").contains(document.querySelector(".t-store__product-snippet"));
            i && (n = a.querySelector(".js-store-relevants-grid-cont"));
            var p = t_store_get_horizSeparator_html(r),
                u = {},
                g = n.querySelectorAll(".t-store__card").length;
            if (0 === t.length) {
                var m = t_store_get_emptyMsg_html(r);
                return n.insertAdjacentHTML("beforeend", m), void t_store__fadeIn(a.querySelector(".js-store-empty-part-msg"))
            }
            if (i && r.relevants_slider && r.prodCard.shadowSize && r.prodCard.shadowSize.length) {
                var v = "",
                    y = parseInt(r.prodCard.shadowSize, 10);
                y = y > 10 ? 10 : y, isNaN(y) && (y = 0);
                var f = parseInt(r.prodCard.shadowSizeHover, 10);
                f = f > 40 ? 40 : f, isNaN(f) && (f = 0);
                var h = r.prodCard.shadowOpacityHover,
                    w = r.prodCard.shadowShiftyHover,
                    b = Math.max(f, y);
                v += "<style>\n", f && h && l && (v += "#rec" + e + " .t-store .t-store__relevants__container .t-store__relevants-grid-cont .t-store__card__wrap_all:hover {", v += "box-shadow: 0px " + ("sm" === w ? "10px" : "md" === w ? "20px" : "0px") + " " + (f ? f + "px" : "20px") + " 0px rgba(0, 0, 0, " + (h ? "0." + h : "0.3") + ") !important;", v += "}\n"), v += "@media screen and (max-width:960px) {\n", v += "#rec" + e + " .t-store .t-store__relevants__container .t-store__relevants-grid-cont .t-store__card__wrap_all {\n", v += "margin: " + y + "px;\n", v += "}\n", v += "}\n", v += "@media screen and (min-width:961px) {\n", v += "#rec" + e + " .t-store .t-store__relevants__container .t-store__relevants-grid-cont .t-slds__items-wrapper {\n", v += "padding-top: " + b + "px;\n", v += "padding-bottom: " + b + "px;\n", v += "}\n", v += "#rec" + e + " .t-store .t-store__relevants__container .t-store__relevants__title-wrapper .t-store__relevants__title {\n", v += "margin-bottom: " + (40 - b) + "px;\n", v += "}\n", v += "}\n", v += "</style>";
                var S = a.querySelector(".t-popup .t-store__relevants__container");
                if (S && S.insertAdjacentHTML("beforebegin", v), _) {
                    var E = a.querySelector(".t-store__product-snippet + .t-store__relevants__container");
                    E && (E.insertAdjacentHTML("beforebegin", v), r.isFlexCols && E.classList.add("t-store__grid-cont_col-width_stretch"))
                }
            }
            var A = "",
                C = 4,
                x = i ? 4 : r.blocksInRow,
                q;
            if (i && r.relevants_slider && (t.length > 4 || window.innerWidth <= 960) || !i && d) {
                var j = "",
                    k = "300";
                "fast" === r.slider_opts.anim_speed && (j = "t-slds_animated-fast"), "slow" === r.slider_opts.anim_speed && (j = "t-slds_animated-slow", k = "500"), A += '<div class="t-slds" style="visibility: hidden;">', A += '<div class="t-slds__main t-container">', A += '<div class="t-slds__container">', A = (A += '<div class="t-slds__items-wrapper ' + j + '" data-slider-items-in-row="' + (!i && d ? x : 4) + '" data-slider-transition="' + k + '" data-slider-with-cycle="true" data-slider-cycle="yes" data-slider-correct-height="' + (!i && d ? "true" : "false") + '" data-auto-correct-mobile-width="false">').replace("[[noCycleClass]]", r.slider_opts.cycle ? "" : "t-slds__nocycle").replace("[[isCycled]]", r.slider_opts.cycle ? "true" : "false")
            }
            if (Array.prototype.forEach.call(t, (function(t) {
                    var e = null,
                        r = null;
                    t_store_onFuncLoad("t_store__cleanPrice", (function() {
                        t.editions.forEach((function(t) {
                            if (t.price && "" !== t.price) {
                                var o = t_store__cleanPrice(t.price);
                                e = null === e ? o : Math.min(e, o), r = null === r ? o : Math.max(r, o)
                            }
                        }))
                    })), t.minPrice = e, t.maxPrice = r
                })), Array.prototype.forEach.call(t, (function(e, o) {
                    (!i && !d && !c || i && !r.relevants_slider) && g > 0 && g % x == 0 && (A += p), A += t_store_get_productCard_html(a, e, r, i, o, t), u[e.uid] = e, g++
                })), i && r.relevants_slider && (t.length > 4 || window.innerWidth <= 960) || !i && d) {
                var L, P = a.querySelector(".js-store-tpl-slider-arrows").innerHTML;
                if (A += "</div>", A += "</div>", P && !i && d && (A += P, n.classList.remove("t-container"), n.classList.remove("t-store__grid-cont_mobile-grid")), !i && d) {
                    var O = '<div class="t-slds__bullet_wrapper">';
                    Array.prototype.forEach.call(t, (function(t, e) {
                        var r = e + 1;
                        O += '<div class="t-slds__bullet' + (1 === r ? " t-slds__bullet_active" : "") + '" data-slide-bullet-for="' + r + '"><div class="t-slds__bullet_body" style="background-color: transparent;"></div></div>'
                    })), A += O += "</div>"
                }
                A += "</div>", A += "</div>", P && i && (A += P)
            }
            if (t_store_process_appendAndShowProducts(a, n, A), Array.prototype.forEach.call(t, (function(t) {
                    var o = i ? a.querySelector('.t-store__relevants__container .js-product.t-item[data-product-gen-uid="' + t.uid + '"]') : a.querySelector('.t-store__grid-cont .js-product.t-item[data-product-gen-uid="' + t.uid + '"]'),
                        s;
                    o.setAttribute("data-card-size", "small"), t = u[t.uid], parseInt(t.quantity, 10) <= 0 || "both" !== r.showStoreBtnQuantity && "list" !== r.showStoreBtnQuantity || t_store_addProductQuantity(o, t, r), t_store_addProductOptions(e, t, o, r), t_store_option_handleOnChange(o), t_store_option_handleOnChange_custom(e, o, r), t_store_onFuncLoad("t_prod__initProduct", (function() {
                        t_prod__initProduct(o, r)
                    }))
                })), !i && window.tStoreFilters && "object" == typeof window.tStoreFilters && window.tStoreFilters[e] && "object" == typeof window.tStoreFilters[e] && window.tStoreCustomUrlParams && "object" == typeof window.tStoreCustomUrlParams && window.tStoreCustomUrlParams[e] && "object" == typeof window.tStoreCustomUrlParams[e] && Array.prototype.forEach.call(t, (function(t) {
                    var r = a.querySelector('.t-store__grid-cont .js-product.t-item[data-product-gen-uid="' + t.uid + '"]');
                    Array.prototype.forEach.call(r.querySelectorAll(".js-product-edition-option"), (function(t) {
                        var r = !1,
                            o = t.querySelector("select");
                        o && Object.keys(window.tStoreCustomUrlParams[e]).forEach((function(t) {
                            Array.prototype.slice.call(window.tStoreFilters[e].filters).forEach((function(i) {
                                if (i.name === t) {
                                    var s = window.tStoreCustomUrlParams[e][t];
                                    "object" == typeof s && s.slice().reverse().forEach((function(t) {
                                        if (!r)
                                            if (t !== o.value) {
                                                var e = o.querySelector('[value="' + t_store_escapeQuote(t) + '"]');
                                                e && !e.getAttribute("disabled") && (o.value = t, t_store__triggerEvent(o, "change"), r = !0)
                                            } else t_store__triggerEvent(o, "change"), r = !0
                                    }))
                                }
                            }))
                        }))
                    }))
                })), !o && r.isFlexCols && r.isHorizOnMob) t_store__removeElement(n.querySelector(".t-store__tail-gap")), n.insertAdjacentHTML("beforeend", '<div class="t-store__tail-gap"></div>');
            if ("y" !== window.lazy && "yes" !== document.getElementById("allrecords").getAttribute("data-tilda-lazy") || (r.relevants_slider ? setTimeout((function() {
                    t_store_onFuncLoad("t_lazyload_update", (function() {
                        t_lazyload_update()
                    }))
                }), 100) : t_store_onFuncLoad("t_lazyload_update", (function() {
                    t_lazyload_update()
                }))), document.querySelector(".t706__cartwin") ? "function" == typeof tcart__addEvent__links && tcart__addEvent__links(e) : console.log("Warning: cart block is not added to this page"), t_store_initPopup(e, u, r, i, s), "1025" == r.prodCard.blockId ? t_store_unifyCardsWidth(e) : (setTimeout((function() {
                    t_store_unifyCardsHeights(e, r), r.verticalAlignButtons && t_store_verticalAlignButtons(e, r)
                }), 1), document.fonts && document.fonts.ready ? document.fonts.ready.then((function() {
                    setTimeout((function() {
                        t_store_unifyCardsHeights(e, r)
                    }), 1e3)
                })) : setTimeout((function() {
                    t_store_unifyCardsHeights(e, r)
                }), 1e3), r.verticalAlignButtons && ("complete" === document.readyState ? t_store_verticalAlignButtons(e, r) : window.addEventListener("load", (function() {
                    t_store_verticalAlignButtons(e, r)
                })))), !r.previewmode) try {
                addEditFieldEvents_new(e)
            } catch (t) {
                console.log(t.message)
            }
        }
    }
}

function t_store_process_appendAndShowProducts(t, e, r) {
    e.insertAdjacentHTML("beforeend", r), !0 === t.getAttribute("data-already-loaded-first-products") ? setTimeout((function() {
        Array.prototype.forEach.call(t.querySelectorAll(".t-store__card"), (function(t) {
            t.classList.remove("t-store__card_hidden")
        }))
    }), 10) : (Array.prototype.forEach.call(t.querySelectorAll(".t-store__card"), (function(t) {
        t.classList.remove("t-store__card_hidden")
    })), t.setAttribute("data-already-loaded-first-products", !0))
}

function t_store_mobileHoriz_checkBtnVisibility(t, e) {
    var r = function(t, e) {
        var r = document.getElementById("rec" + t),
            o;
        window.innerWidth < 960 && e.hasMobileHorizScroll && t_store__removeElement(r.querySelector(".js-store-load-more-btn"))
    };
    r(t, e), window.addEventListener("resize", t_throttle((function() {
        r(t, e)
    }), 500))
}

function t_store_get_productPopup_html(t, e) {
    var r = "",
        o = e.popup_opts.popupStat ? 'data-track-popup="' + e.popup_opts.popupStat + '"' : "",
        i = "t-popup__container t-popup__container-static",
        s, a = e.verticalAlignButtons ? "t-store__valign-buttons" : "",
        n = e.showRelevants,
        d = e.titleRelevants ? e.titleRelevants : window.tStoreDict.seeAlso,
        c = e.relevants_slider ? "" : "t-store__grid-cont_mobile-one-row",
        l = e.galleryStyle && "" !== e.galleryStyle && parseInt(e.popup_opts.columns, 10) + parseInt(e.popup_opts.columns2, 10) <= 12;
    e.popup_opts.isVertical && (i += " t-store__popup-container_8-cols");
    var _ = e.popup_opts.overlayBgColorRgba ? 'style="background-color:' + e.popup_opts.overlayBgColorRgba + '"' : "",
        p = 'style="',
        u = e.popup_opts.isVertical ? "" : "t-store__prod-popup__col-left t-col t-col_" + e.popup_opts.columns,
        g, m = "t-align_" + ("center" === e.popup_opts.align ? "center" : "left") + " " + (e.popup_opts.isVertical ? "" : "t-store__prod-popup__col-right t-col t-col_" + e.popup_opts.columns2);
    e.popup_opts.containerBgColor && (p += "background-color:" + e.popup_opts.containerBgColor + ";"), "100" === e.popup_opts.popupContainer && (p += "max-width:100%;"), p += '"', r += '<div class="t-popup" ' + o + " " + _ + ">", r += t_store_get_productPopup_closeIcon_html(e), r += t_store_get_productPopup_closeText_html(e), r += '<div class="' + i + '" ' + p + ">", r += "<div>", r += '<div class="t-store__prod-popup__container">', r += '<div class="js-store-product js-product t-store__product-popup">';
    var v = "";
    return "100" === e.popup_opts.popupContainer && (v += "t-container_fluid "), r += '<div class="' + v + '">', l && (r += '<div class="t-store__prod-popup__gallery-column js-store-prod-gallery-column ' + u + ' t-store__prod-popup__col_fixed"></div>'), r += '<div class="t-store__prod-popup__slider js-store-prod-slider ' + u + '"></div>', r += '<div class="t-store__prod-popup__info ' + m + (l ? " t-store__prod-popup__col_fixed" : "") + '">', r += t_store_get_productPopup_titleText_html(), r += '<div class="js-store-price-wrapper t-store__prod-popup__price-wrapper">', r += t_store_get_productPopup_onePrice_html(e, "current"), r += t_store_get_productPopup_onePrice_html(e, "old"), r += "</div>", r += '<div class="js-product-controls-wrapper"></div>', r += t_store_get_productPopup_linksSizeChart_html(), r += t_store_get_productPopup_buyBtn_html(e), r += t_store_get_productPopup_text_html(), r += "</div>", r += "</div>", r += "</div>", n && (r += '                <div class="t-store__relevants__container">', r += '                    <div class="t-store__relevants__title-wrapper">', r += '                        <div class="t-store__relevants__title t-uptitle t-uptitle_xxl" style="' + e.typo.title + '">' + d + "</div>", r += "                    </div>", e.relevants_slider || (r += t_store_get_handIcon_html(t)), r += '                    <div class="t-store__relevants-grid-cont js-store-relevants-grid-cont ' + a + " " + c + '"></div>', r += "                </div>"), r += "            </div>", r += "        </div>", r += "    </div>", r += "</div>"
}

function t_store_get_productPopup_text_html() {
    var t = "";
    return t += '<div class="js-store-prod-text t-store__prod-popup__text t-descr t-descr_xxs"></div>'
}

function t_store_get_productPopup_linksSizeChart_html() {
    var t = "";
    return t += '<div class="t-store__prod-popup__links-wrapper"></div>'
}

function t_store_get_productPopup_buyBtn_html(t) {
    var e = "",
        r = t.btn1_style,
        o = t.popup_opts.btnTitle;
    return "" !== o && (e += '<div class="t-store__prod-popup__btn-wrapper js-store-buttons-wrapper">', e += '<a href="#order" class="t-store__prod-popup__btn t-btn t-btn_sm" style="' + r + '">', e += '<table style="width:100%; height:100%;"><tr><td class="js-store-prod-popup-buy-btn-txt">', e += o, e += "</td></tr></table>", e += "</a>", e += "</div>"), e
}

function t_store_get_productPopup_onePrice_html(t, e) {
    var r = "",
        o = "current" === e ? "js-store-prod-price t-store__prod-popup__price" : "js-store-prod-price-old t-store__prod-popup__price_old",
        i, s = "",
        a = "current" === e ? t.price.color : t.price.colorOld,
        n = t.popup_opts.containerBgColor;
    0 === Math.abs(t_store_getLightnessColor(a) - t_store_getLightnessColor(n)) && (a = t_store_luma_rgb(n)), s += a ? "color:" + a + ";" : "", i = "" !== (s += t.price.fontWeight ? "font-weight:" + t.price.fontWeight + ";" : "") ? 'style = "' + s + '"' : "";
    var d = t.currencyTxt ? '<div class="t-store__prod-popup__price-currency">' + t.currencyTxt + "</div>" : "",
        c = "current" === e ? "js-product-price js-store-prod-price-val" : "js-store-prod-price-old-val";
    return r += '<div class="' + o + ' t-store__prod-popup__price-item t-name t-name_md" ' + i + ">", r += "r" !== t.currencySide && d ? d : "", r += '<div class="' + c + ' t-store__prod-popup__price-value notranslate" translate="no"></div>', r += "r" === t.currencySide && d ? d : "", r += "</div>"
}

function t_store_get_productPopup_titleText_html() {
    var t = "";
    return t += '<div class="t-store__prod-popup__title-wrapper">', t += '    <div class="js-store-prod-name js-product-name t-store__prod-popup__name t-name t-name_xl"></div>', t += '    <div class="t-store__prod-popup__brand t-descr t-descr_xxs"></div>', t += '    <div class="t-store__prod-popup__sku t-descr t-descr_xxs">', t += window.tStoreDict.sku + ": ", t += '<span class="js-store-prod-sku js-product-sku">', t += "</span>", t += "    </div>", t += "</div>"
}

function t_store_get_productPopup_closeIcon_html(t) {
    var e = "",
        r = t.popup_opts.iconColor ? t.popup_opts.iconColor : "#000000",
        o = t.popup_opts.overlayBgColorRgba ? t_store_removeRgbOpacity(t.popup_opts.overlayBgColorRgba) : t.popup_opts.containerBgColor,
        i = o && o.length ? o : "#ffffff",
        s;
    t.popup_opts.overlayBgColorRgba && !t.popup_opts.iconColor && (r = t_store_luma_rgb(t_store_removeRgbOpacity(t.popup_opts.overlayBgColorRgba)));
    return e += '<div class="t-popup__close" style="background-color: ' + i + '">', e += '    <div class="t-popup__close-wrapper">', e += '<svg class="t-popup__close-icon t-popup__close-icon_arrow" width="26px" height="26px" viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">', e += '<path d="M10.4142136,5 L11.8284271,6.41421356 L5.829,12.414 L23.4142136,12.4142136 L23.4142136,14.4142136 L5.829,14.414 L11.8284271,20.4142136 L10.4142136,21.8284271 L2,13.4142136 L10.4142136,5 Z" fill="' + r + '"></path>', e += "</svg>", e += '        <svg class="t-popup__close-icon t-popup__close-icon_cross" width="23px" height="23px" viewBox="0 0 23 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">', e += '            <g stroke="none" stroke-width="1" fill="' + r + '" fill-rule="evenodd">', e += '                <rect transform="translate(11.313708, 11.313708) rotate(-45.000000) translate(-11.313708, -11.313708) " x="10.3137085" y="-3.6862915" width="2" height="30"></rect>', e += '                <rect transform="translate(11.313708, 11.313708) rotate(-315.000000) translate(-11.313708, -11.313708) " x="10.3137085" y="-3.6862915" width="2" height="30"></rect>', e += "            </g>", e += "        </svg>", e += "    </div>", e += "</div>"
}

function t_store_get_productPopup_closeIcon_color(t, e) {
    var r = e.popup_opts.iconColor ? e.popup_opts.iconColor : "#000000",
        o = e.popup_opts.overlayBgColorRgba ? t_store_removeRgbOpacity(e.popup_opts.overlayBgColorRgba) : e.popup_opts.containerBgColor,
        i = o && o.length ? o : "#ffffff",
        s;
    e.popup_opts.overlayBgColorRgba && !e.popup_opts.iconColor && (r = t_store_luma_rgb(s = t_store_removeRgbOpacity(e.popup_opts.overlayBgColorRgba)));
    var a = document.getElementById("rec" + t),
        n = document.getElementById("allrecords") !== document.querySelector(".t-store__product-snippet") && document.getElementById("allrecords").contains(document.querySelector(".t-store__product-snippet")),
        d = n ? a.querySelector(".t-store__prod-snippet__container") : a.querySelector(".t-popup"),
        c;
    d.querySelector(".t-popup__close").style.backgroundColor = i;
    var l = d.querySelector(".t-popup__close-icon_cross"),
        _;
    if (n && !e.popup_opts.iconColor && Math.abs(t_store_getLightnessColor(r) - t_store_getLightnessColor(t_store_removeRgbOpacity(i))) > .1) {
        var s = t_store_removeRgbOpacity(e.popup_opts.containerBgColor) || "rgb(255,255,255)";
        l.querySelector("g").setAttribute("fill", t_store_luma_rgb(s))
    } else l.querySelector("g").setAttribute("fill", r);
    d.querySelector(".t-popup__close-icon_arrow").querySelector("path").setAttribute("fill", r)
}

function t_store_get_productPopup_closeText_html(t) {
    if (!t.popup_opts.closeText) return "";
    var e = t_store_unescapeHtml(t.popup_opts.closeText),
        r = t.popup_opts.iconColor ? t.popup_opts.iconColor : "#000000",
        o = t.popup_opts.containerBgColor && t.popup_opts.containerBgColor.length ? t.popup_opts.containerBgColor : "#ffffff",
        i;
    t.popup_opts.containerBgColor && !t.popup_opts.iconColor && (r = t_store_luma_rgb(t_store_hexToRgb(o)));
    var s, a = "";
    return a += '<div class="t-store__prod-popup__close-txt-wr">', a += '    <div class="js-store-close-text t-store__prod-popup__close-txt t-descr t-descr_xxs" ' + ('style="color:' + r + '"') + ">", a += e, a += "    </div>", a += "</div>"
}

function t_store_get_loadMoreBtn_html(t, e) {
    var r = "",
        o, i, s;
    return r += '<div class="t-store__load-more-btn-wrap t-align_center' + (!!(window.innerWidth < 960 && t.querySelector(".js-store-grid-cont.t-store__grid-cont_mobile-one-row")) ? " t-store__load-more-btn-wrap_hidden " : "") + '">', r += '    <div class="js-store-load-more-btn t-store__load-more-btn t-btn ' + ("sm" === e.btnSize ? "t-btn_xs" : "t-btn_sm") + '" style="' + e.btn1_style + 'display:none;">', r += '        <table style="width:100%; height:100%;"><tr><td>' + window.tStoreDict.loadmore + "</td></tr></table>", r += "    </div>", r += "</div>"
}

function t_store_get_handIcon_html(t) {
    var e = "",
        r = document.getElementById("rec" + t),
        o = "42",
        i = "rgba(190,190,190,0.3)",
        s = "rgba(190,190,190,1)",
        a = "mix-blend-mode: multiply;",
        n, d = r.getAttribute("data-bg-color"),
        c, l;
    (d && (n = t_store_hexToRgb(d)), document.getElementById("allrecords") !== document.querySelector(".t-store__product-snippet") && document.getElementById("allrecords").contains(document.querySelector(".t-store__product-snippet")) && (n = r.style.backgroundColor), n) && ("white" === t_store_luma_rgb(n) && (a = "mix-blend-mode: lighten;"));
    return e += '<div class="t-store__scroll-icon-wrapper" style="' + a + '">', e += '<?xml version="1.0" encoding="UTF-8"?>', e += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 300" height="42" width="42"> <rect class="tooltip-horizontal-scroll-icon_card" x="480" width="200" height="200" rx="5" fill="' + i + '"></rect> <rect class="tooltip-horizontal-scroll-icon_card" y="0" width="200" height="200" rx="5" fill="' + i + '"></rect> <rect class="tooltip-horizontal-scroll-icon_card" x="240" width="200" height="200" rx="5" fill="' + i + '"></rect> <path class="tooltip-horizontal-scroll-icon_hand" d="M78.9579 285.7C78.9579 285.7 37.8579 212.5 20.5579 180.8C-2.44209 138.6 -6.2422 120.8 9.6579 112C19.5579 106.5 33.2579 108.8 41.6579 123.4L61.2579 154.6V32.3C61.2579 32.3 60.0579 0 83.0579 0C107.558 0 105.458 32.3 105.458 32.3V91.7C105.458 91.7 118.358 82.4 133.458 86.6C141.158 88.7 150.158 92.4 154.958 104.6C154.958 104.6 185.658 89.7 200.958 121.4C200.958 121.4 236.358 114.4 236.358 151.1C236.358 187.8 192.158 285.7 192.158 285.7H78.9579Z" fill="' + s + '"></path>', e += "<style> .tooltip-horizontal-scroll-icon_hand { animation: tooltip-horizontal-scroll-icon_anim-scroll-hand 2s infinite } .tooltip-horizontal-scroll-icon_card { animation: tooltip-horizontal-scroll-icon_anim-scroll-card 2s infinite } @keyframes tooltip-horizontal-scroll-icon_anim-scroll-hand { 0% { transform: translateX(80px) scale(1); opacity: 0 } 10% { transform: translateX(80px) scale(1); opacity: 1 } 20%,60% { transform: translateX(175px) scale(.6); opacity: 1 } 80% { transform: translateX(5px) scale(.6); opacity: 1 } to { transform: translateX(5px) scale(.6); opacity: 0 } } @keyframes tooltip-horizontal-scroll-icon_anim-scroll-card { 0%,60% { transform: translateX(0) } 80%,to { transform: translateX(-240px) } }", e += "</style>", e += "</svg>", e += "</div>"
}

function t_store_get_emptyMsg_html(t) {
    var e = "",
        r = t.typo.titleColor ? "color:" + t.typo.titleColor + ";border-color:" + t.typo.titleColor + ";" : "",
        o = "js-store-empty-part-msg t-store__empty-part-msg-cont";
    return e += '<div class="' + (o += t.colClassFullWidth ? " " + t.colClassFullWidth : "") + '" style="display:none;">', e += '    <div class=" t-store__empty-part-msg-wrapper t-descr t-descr_sm" style="' + r + '">', e += '        <div class="t-store__empty-part-msg">', e += "        " + window.tStoreDict.emptypartmsg, e += "        </div>", e += "    </div>", e += "</div>"
}

function t_store_get_errorBox(t, e) {
    var r = "",
        o = t.typo.titleColor ? "color:" + t.typo.titleColor + ";border-color:" + t.typo.titleColor + ";" : "",
        i = "js-store-error-msg t-store__error-msg-cont";
    return r += '<div class="' + (i += t.colClassFullWidth ? " " + t.colClassFullWidth : "") + '" style="display:none;">', r += '    <div class="t-store__error-msg-wrapper t-descr t-descr_sm" style="' + o + '">', r += '        <div class="t-store__error-msg">', r += "        " + e, r += "        </div>", r += "    </div>", r += "</div>"
}

function t_store_get_productCard_html(t, e, r, o, i, s) {
    var a = o ? "t-col t-col_3" : r.colClass,
        n = t_store_product_getFirstAvailableEditionData(e.editions),
        d = "",
        c = "left" === r.align ? "t-align_left" : "t-align_center",
        l = r.itemsAnim && r.previewmode ? "t-animate" : "";
    if (window.tStoreIsMobile) {
        var _ = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        _ && ("slow-2g" !== _.effectiveType && "2g" !== _.effectiveType && "3g" !== _.effectiveType || (l = ""))
    }
    var p = r.itemsAnim ? 'data-animate-style="' + r.itemsAnim + '" data-animate-chain="yes" ' : "",
        u = n.quantity && parseInt(n.quantity, 10) <= 0,
        g = 'data-product-inv="' + (n.quantity || "") + '" ',
        m = "1025" === r.prodCard.blockId,
        v = r.prodCard.btnLink1,
        y = t_store_get_productCard_link(v, e, o, t),
        f = t_store_get_productCard_targetAttr(v, e),
        h = {
            open: r.previewmode ? '<a href="' + y + '" ' + f + ">" : "",
            close: r.previewmode ? "</a>" : ""
        };
    (u && "#order" === y || !document.querySelector(".t706__cartwin") && !document.querySelector(".t706__sidebar") && "#order" === y) && (h.open = "", h.close = "");
    var w = "";
    o && (w = "js-product-relevant");
    var b = 4,
        S = e.pack_label,
        E = e.pack_m,
        A = e.pack_x,
        C = e.pack_y,
        x = e.pack_z;
    i = parseInt(i, 10) + 1;
    var q = "973" === t.getAttribute("data-record-type") && !o,
        j = o && r.relevants_slider && (s.length > 4 || window.innerWidth <= 960);
    (j || q) && (d += '<div class="t-slds__item t-animate" data-slide-index="' + i + '">', d += '<div class="t__slds-wrapper t-slds__wrapper t-slds__wrapper_100">');
    var k = e.url || "",
        L = "";
    m && ("2" === r.prodCard.style ? L += " t-store__card_in-row" : "3" === r.prodCard.style ? L += " t-store__card_under-description" : L += " t-store__card_in-column", L += r.prodCard.hasSeparator ? "" : " t-store__card_no-separator", L += parseInt(r.rightColumnWidth, 10) ? " t-store__card_fixed-width" : "", L += r.verticalAlign ? " t-store__card_verticalAlign_" + r.verticalAlign : "");
    var P = [];
    try {
        P = JSON.parse(e.partuids)
    } catch (t) {}
    return d += '<div class="js-product t-store__card t-store__card_hidden ' + L + " " + a + " " + c + " " + w + " t-item " + l + '" ' + p + g + 'data-product-lid="' + e.uid + '" data-product-uid="' + e.uid + '" data-product-gen-uid="' + e.uid + '" data-product-pack-label="' + S + '" data-product-pack-m="' + E + '" data-product-pack-x="' + A + '" data-product-pack-y="' + C + '" data-product-pack-z="' + x + '" data-product-url="' + k + '" data-product-part-uid="' + P.join(",") + '" >', r.prodCard.hasWrap ? d += t_store_get_productCard_wrapperStructure(e, n, r, h, o, t) : d += m && !o ? t_store_get_productCard_horizontalStructure(e, n, r, h, o, t) : t_store_get_productCard_simpleStructure(e, n, r, h, o, t), d += "</div>", (j || q) && (d += "</div>", d += "</div>"), d
}

function t_store_get_productCard_simpleStructure(t, e, r, o, i, s) {
    var a = r.prodCard.showOpts ? "" : 'style="display:none;"',
        n = t_store_get_productCard_img_html(t, r),
        d = "";
    return d += o.open, d += "    " + n, d += "    " + t_store_get_productCard_txtAndPrice_html(t, e, r, n), d += o.close, d += '<div class="js-product-controls-wrapper t-store__card__prod-controls-wrapper" ' + a + "></div>", d += t_store_get_productCard_btn_html(t, r, i, s)
}

function t_store_get_productCard_wrapperStructure(t, e, r, o, i, s) {
    var a = "",
        n = t_store_get_productCard_getWrapperStylesStr(r),
        d = r.prodCard.showOpts ? "" : 'style="display:none;"',
        c;
    return a += '<div class="t-store__card__wrap_all ' + (r.prodCard && r.prodCard.txtPad ? "t-store__card__wrap_pad-" + r.prodCard.txtPad : "") + '" style="' + n + '">', a += "    " + o.open, a += "        " + t_store_get_productCard_img_html(t, r), a += "    " + o.close, a += '    <div class="t-store__card__wrap_txt-and-btns">', a += '        <div class="store__card__wrap_txt-and-opts">', a += "            " + o.open, a += "                " + t_store_get_productCard_txtAndPrice_html(t, e, r), a += "            " + o.close, a += '            <div class="js-product-controls-wrapper t-store__card__prod-controls-wrapper" ' + d + "></div>", a += "        </div>", a += "        " + t_store_get_productCard_btn_html(t, r, i, s), a += "    </div>", a += "</div>"
}

function t_store_get_productCard_getWrapperStylesStr(t) {
    var e = "",
        r;
    if (e += t.prodCard.bgColor ? "background-color:" + t.prodCard.bgColor + ";" : "", e += t.prodCard.borderRadius ? "border-radius:" + parseInt(t.prodCard.borderRadius, 10) + "px;" : "", t.prodCard.shadowOpacity && t.prodCard.shadowOpacity.length || !(!t.prodCard.shadowSize || !t.prodCard.shadowSize.length)) {
        var o = t.prodCard.shadowOpacity ? "0." + t.prodCard.shadowOpacity : "0.3",
            i;
        e += "box-shadow: 0px 0px " + (t.prodCard.shadowSize ? parseInt(t.prodCard.shadowSize, 10) + "px" : "10px") + " 0px rgba(0, 0, 0, " + o + ");"
    }
    return e
}

function t_store_get_productCard_img_html(t, e, r) {
    var o = "1025" === e.prodCard.blockId;
    if (o && !e.prodCard.hasImg) return "";
    var i = "",
        s = e.hasOriginalAspectRatio && !e.isHorizOnMob ? "t-store__card__imgwrapper_original-ratio" : "",
        a = "t-store__card__imgwrapper ",
        n;
    if (a += o ? e.imageRatioClass : s + (e.isFlexCols ? " " + e.imageRatioClass : ""), document.getElementById("allrecords") !== document.querySelector(".t-store__product-snippet") && document.getElementById("allrecords").contains(document.querySelector(".t-store__product-snippet")) && !e.colWidth) {
        var d = {
            1: 760,
            2: 560,
            3: 360,
            4: 260
        };
        e.colWidth = d[e.blocksInRow]
    }
    var c = !e.imageHeight || e.isFlexCols || o ? "" : "padding-bottom:" + 100 * parseInt(e.imageHeight, 10) / (e.colWidth || 360) + "%;";
    if (e.hasOriginalAspectRatio && e.prodCard.borderRadius) {
        var l = parseInt(e.prodCard.borderRadius, 10);
        c += "border-radius:" + l + "px " + l + "px 0px 0px; overflow: hidden;"
    }
    var _ = t_store_get_productCard_imgElHover_html(t, e, r),
        p = e.imageHover && _,
        u, g = r || t_store_getProductFirstImg(t);
    if ("" !== (g = g.replace(/&amp;amp;/, "&amp;"))) {
        var m;
        if (e.hasOriginalAspectRatio)(u = document.createElement("img")).classList.add("js-product-img"), u.classList.add("t-store__card__img"), p && u.classList.add("t-store__card__img_hover"), /Version\/16\.3 Safari/.test(navigator.userAgent) && (u.style.objectFit = "contain"), u.classList.add("t-img"), u.setAttribute("data-original", g), u.src = t_store_getLazySrc(e, g);
        else(u = document.createElement("div")).classList.add("js-product-img"), u.classList.add("t-store__card__bgimg"), p && u.classList.add("t-store__card__bgimg_hover"), u.classList.add("t-bgimg"), u.setAttribute("data-original", g), u.style.backgroundImage = 'url("' + t_store_getLazyUrl(e, g) + '")', t_store_get_productCard_getImgStyles(u, e);
        return 1 === t.editions.length && t.uid && u.setAttribute(e.hasOriginalAspectRatio ? "imgfield" : "bgimgfield", "st_gallery__" + t.uid + ":::0"), i += '<div class="' + a + '" style="' + c + '">', i += "    " + t_store_get_productCard_mark_html(t, e), i += "    " + u.outerHTML, i += "    " + (e.imageHover ? _ : ""), i += "</div>"
    }
    return ""
}

function t_store_get_productCard_img_replaceWith(t, e, r, o) {
    var i = e.querySelector(".t-store__card__imgwrapper"),
        s = t_store_get_productCard_img_html(t, r, o);
    i && (i.outerHTML = s), "y" !== window.lazy && "yes" !== document.getElementById("allrecords").getAttribute("data-tilda-lazy") || t_store_onFuncLoad("t_lazyload_update", (function() {
        t_lazyload_update()
    })), t_store__triggerEvent(document.body, "twishlist_addbtn")
}

function t_store_get_productCard_imgElHover_html(t, e, r) {
    if (t.gallery && "[" === t.gallery[0]) {
        var o = JSON.parse(t.gallery);
        if (void 0 !== o[1]) {
            var i = o[1].img,
                s;
            if (r && r.length)
                for (var a = 0; a < o.length; a++) {
                    var n = o[a].img;
                    if (n !== r) {
                        i = n;
                        break
                    }
                }
            return e.hasOriginalAspectRatio ? ((s = document.createElement("img")).classList.add("t-store__card__img"), s.classList.add("t-store__card__img_second"), s.classList.add("t-img"), s.setAttribute("data-original", i), s.src = t_store_getLazySrc(e, i)) : ((s = document.createElement("div")).classList.add("t-store__card__bgimg_second"), s.classList.add("t-bgimg"), s.setAttribute("data-original", i), s.style.backgroundImage = 'url("' + t_store_getLazyUrl(e, i) + '")', t_store_get_productCard_getImgStyles(s, e)), s.outerHTML
        }
    }
    return ""
}

function t_store_get_productCard_getImgStyles(t, e) {
    if (e && e.prodCard && e.prodCard.borderRadius) {
        var r = parseInt(e.prodCard.borderRadius, 10);
        t.style.borderRadius = r + "px " + r + "px 0px 0px", r > 0 && !window.tStoreIsMobile && (t.style.top = "-2px")
    }
}

function t_store_get_productCard_mark_html(t, e) {
    if (!t.mark) return "";
    var r = "";
    r += e.markColor ? "color:" + e.markColor + ";" : "";
    var o, i = "";
    return i += '<div class="t-store__card__mark-wrapper">', i += '<div class="t-store__card__mark" ' + ((r += e.markBgColor ? "background-color:" + e.markBgColor + ";" : "") ? 'style="' + r + '"' : "") + ">", i += t.mark, i += "</div>", i += "</div>"
}

function t_store_get_productCard_txtAndPrice_html(t, e, r, o) {
    var i = "",
        s;
    return i += '<div class="t-store__card__textwrapper" ' + ("" === o ? 'style="padding-top:0px;"' : "") + ">", i += t_store_get_productCard_txt_html(t, e, r), Object.prototype.hasOwnProperty.call(r.price, "position") && "" !== r.price.position || (i += t_store_get_productCard_Price_html(t, e, r)), i += "</div>"
}

function t_store_get_productCard_txt_html(t, e, r) {
    var o = "",
        i = "";
    if (Object.prototype.hasOwnProperty.call(r.price, "position") && "at" === r.price.position && (o += t_store_get_productCard_Price_html(t, e, r)), t.title) {
        i = 4 === parseInt(r.blocksInRow, 10) ? "t-name_xs" : 2 === parseInt(r.blocksInRow, 10) ? "t-name_xl" : "t-name_md";
        var s = 1 === t.editions.length && e.uid ? 'field="st_title__' + e.uid + '" data-redactor-toolbar="no"' : "";
        o += '<div class="js-store-prod-name js-product-name t-store__card__title t-name ' + i + '" style="' + r.typo.title + '" ' + s + ">", o += t.title, o += "</div>"
    }
    if (Object.prototype.hasOwnProperty.call(r.price, "position") && "bt" === r.price.position && (o += t_store_get_productCard_Price_html(t, e, r)), e.sku) {
        var a, n, d = 'style="' + (r.prodCard.showOpts ? "" : "display:none;") + (r.typo.descrColor ? "color:" + r.typo.descrColor + ";" : "") + '"',
            c = 1 === t.editions.length && e.uid ? 'field="st_sku__' + e.uid + '" data-redactor-toolbar="no"' : "";
        o += '<div class="t-store__card__sku t-descr t-descr_xxs" ' + d + ">", o += window.tStoreDict.sku + ": ", o += '<span class="js-store-prod-sku js-product-sku notranslate" translate="no" ' + c + ">", o += e.sku, o += "</span>", o += "</div>"
    }
    if (t.descr) {
        var l = 1 === t.editions.length && e.uid ? 'field="st_descr__' + e.uid + '" data-redactor-toolbar="no"' : "";
        o += '<div class="js-store-prod-descr t-store__card__descr t-descr t-descr_xxs" style="' + r.typo.descr + '" ' + l + ">", o += t.descr, o += "</div>"
    }
    return o
}

function t_store_get_productCard_Price_html(t, e, r) {
    var o = "",
        i = "",
        s = t_store__getFormattedPriceRange(r, t);
    return Object.prototype.hasOwnProperty.call(r.price, "position") && ("at" === r.price.position ? i = " t-store__card__price-wrapper_above-title" : "bt" === r.price.position && (i = " t-store__card__price-wrapper_below-title")), o += '<div class="js-store-price-wrapper t-store__card__price-wrapper' + i + '">', o += t_store_get_productCard_onePrice_html(t, e, r, "current"), s || (o += t_store_get_productCard_onePrice_html(t, e, r, "old")), o += "</div>"
}

function t_store_get_productCard_onePrice_html(t, e, r, o) {
    var i = "current" === o ? e.price : e.priceold,
        s = t_store__getFormattedPrice(r, i),
        a = r.price.priceRange,
        n = t_store__getFormattedPriceRange(r, t);
    n && "range" === a && (s = n);
    var d = "current" === o ? "price" : "priceold",
        c = "",
        l = "current" === o ? "t-store__card__price" : "t-store__card__price_old",
        _, p = "",
        u = "current" === o ? r.price.color : r.price.colorOld;
    p += i && "0" !== i && "0.0000" !== i ? "" : "display: none;", p += u ? "color:" + u + ";" : "", p += r.price.fontSize ? "font-size:" + r.price.fontSize + ";" : "", _ = "" !== (p += r.price.fontWeight ? "font-weight:" + r.price.fontWeight + ";" : "") ? 'style = "' + p + '"' : "";
    var g = 1 === t.editions.length && e.uid ? 'field="st_' + d + "__" + e.uid + '" data-redactor-toolbar="no"' : "",
        m = r.currencyTxt ? '<div class="t-store__card__price-currency">' + r.currencyTxt + "</div>" : "",
        v = "current" === o ? "js-product-price js-store-prod-price-val" : "js-store-prod-price-old-val",
        y;
    if (n && (v += " js-store-prod-price-range-val"), c += '<div class="' + l + " t-store__card__price-item t-name t-name_" + ("1025" === r.prodCard.blockId ? "md" : "xs") + '" ' + _ + ">", n && "from" === a) {
        c += '<div class="t-store__card__price-from t-store__card__price-value notranslate" translate="no" ' + g + ">" + window.tStoreDict.from + "</div>";
        var f = t_store__getFormattedMinPrice(r, t);
        null !== f && (s = f)
    }
    return c += "r" !== r.currencySide && m ? m : "", c += '<div class="' + v + ' t-store__card__price-value notranslate" translate="no" ' + g + ">" + s + "</div>", c += "r" === r.currencySide && m ? m : "", t.portion > 0 && (c += '<div class="t-store__prod__price-portion"><span class="t-store__prod__price-portion-slash">/</span>', "1" !== t.portion && (c += +t.portion + " "), c += window.tStoreDict[t.unit] + "</div>"), c += "</div>"
}

function t_store_get_productCard_btn_html(t, e, r, o) {
    if (!e.prodCard.btnTitle1 && !e.prodCard.btnTitle2) return "";
    var i = "1025" === e.prodCard.blockId,
        s = "",
        a, n, d = "sm" === e.btnSize ? "t-btn_xs" : "t-btn_sm";
    return s += '<div class="t-store__card__btns-wrapper js-store-buttons-wrapper">', e.prodCard.btnTitle1 && (i && (s += '<div class="t-store__card__btn-row t-store__card__btn-first_wrapper">'), s += '<a href="' + (a = t_store_get_productCard_link(e.prodCard.btnLink1, t, r, o)) + '" ' + (n = t_store_get_productCard_targetAttr(e.prodCard.btnLink1, t)) + ' class="js-store-prod-btn t-store__card__btn t-btn ' + d + '" style="' + e.btn1_style + '"><span class="t-store__card__btn-text">' + e.prodCard.btnTitle1 + "</span></a>", i && (s += "</div>")), e.prodCard.btnTitle2 && (i && (s += '<div class="t-store__card__btn-row t-store__card__btn-second_wrapper">'), s += '<a href="' + (a = t_store_get_productCard_link(e.prodCard.btnLink2, t, r, o)) + '" ' + (n = t_store_get_productCard_targetAttr(e.prodCard.btnLink2, t)) + ' class="js-store-prod-btn2 t-store__card__btn t-store__card__btn_second t-btn ' + d + '" style="' + e.btn2_style + '"><span class="t-store__card__btn-text">' + e.prodCard.btnTitle2 + "</span></a>", i && (s += "</div>")), s += "</div>"
}

function t_store_get_productCard_link(t, e, r, o) {
    var i;
    if (o[0] && (document.getElementById("allrecords") !== document.querySelector(".t-store__product-snippet") && document.getElementById("allrecords").contains(document.querySelector(".t-store__product-snippet")) && "popup" === t)) return t_store_generateUrl(e);
    if ("order" === t) return "#order";
    if (r) return e.buttonlink ? e.buttonlink : "#prodpopup";
    if ("popup" === t) {
        if (e.buttonlink) {
            var s = e.buttonlink;
            return -1 === s.indexOf("//") && "/" !== s.slice(0, 1) && "#" !== s.slice(0, 1) && (s = "http://" + s), s
        }
        return "#prodpopup"
    }
    return "#prodpopup"
}

function t_store_get_productCard_targetAttr(t, e) {
    return "popup" === t && e.buttonlink && "_blank" === e.buttontarget ? 'target="_blank"' : ""
}

function t_store_get_horizSeparator_html(t) {
    var e = '<div class="t-clear t-store__grid-separator" [[style]]></div>';
    return e = e.replace("[[style]]", t.vindent ? 'style="margin-bottom:' + t.vindent + ';"' : "")
}

function t_store_unifyCardsHeights(t, e) {
    if (e.prodCard && e.prodCard.hasWrap) {
        var r = document.getElementById("rec" + t);
        r && [".t-store__grid-cont .t-store__card", ".t-popup__container .t-store__card"].forEach((function(t) {
            var o = r.querySelectorAll(t);
            if (o) {
                var i = t_store_unifyCardsHeights_getBlocksInRow(e, o),
                    s = r.querySelector(".t-store__card__wrap_txt-and-btns");
                if (window.innerWidth <= 480 && !e.isHorizOnMob && s) return void(s.style.height = "auto");
                for (var a = 0; a < o.length; a += i) {
                    for (var n = 0, d = 0; d < i; d++)
                        if (o[a + d]) {
                            var c, l = (c = o[a + d].querySelector(".t-store__card__wrap_txt-and-btns")).querySelector(".store__card__wrap_txt-and-opts"),
                                _ = c.querySelector(".t-store__card__btns-wrapper"),
                                p = 0;
                            l && (p += l.offsetHeight), _ && (p += _.offsetHeight), p > n && (n = p)
                        } for (var d = 0; d < i; d++) {
                        var c;
                        if (o[a + d])(c = o[a + d].querySelector(".t-store__card__wrap_txt-and-btns")).style.height = n + "px"
                    }
                }
            }
        }))
    }
}

function t_store_unifyCardsHeights_getBlocksInRow(t, e) {
    return window.innerWidth <= 960 && t.isHorizOnMob ? e.length : window.innerWidth <= 960 ? 2 : parseInt(t.blocksInRow, 10)
}

function t_store_unifyCardsWidth(t) {
    var e = document.getElementById("rec" + t);
    if (e) {
        var r = e.querySelector(".t-store__grid-cont_itemwrapper");
        if (r) {
            var o = r.querySelectorAll(".js-product");
            if (!o || !o.length || !o[0].classList.contains("t-store__card_fixed-width") && !o[0].classList.contains("t-store__card_under-description")) {
                var i = 0,
                    s = 0,
                    a = 0;
                Array.prototype.forEach.call(o, (function(t) {
                    var e = t.querySelector(".t-store__card__price-buttons");
                    if (e)
                        if (e.classList.contains("t-store__card__price-buttons_in-row")) {
                            var r = e.querySelector(".t-store__card__price-wrapper"),
                                o = e.querySelector(".t-store__card__btns-wrapper");
                            r && (r.style.width = null), o && (o.style.width = null), e.style.width = null
                        } else e.style.width = null
                })), Array.prototype.forEach.call(o, (function(t) {
                    var e = t.querySelector(".t-store__card__price-buttons");
                    if (e)
                        if (e.classList.contains("t-store__card__price-buttons_in-row")) {
                            var r = e.querySelector(".t-store__card__price-wrapper"),
                                o = e.querySelector(".t-store__card__btns-wrapper");
                            if (r) {
                                var n = window.getComputedStyle(r),
                                    d = Math.ceil(parseFloat(n.width)) + Math.ceil(parseFloat(n.marginRight));
                                d > s && (s = d)
                            }
                            if (o) {
                                var c = Math.ceil(parseFloat(window.getComputedStyle(o).width));
                                c > a && (a = c)
                            }
                        } else {
                            var l = Math.ceil(parseFloat(window.getComputedStyle(e).width));
                            l > i && (i = l)
                        }
                })), Array.prototype.forEach.call(o, (function(t) {
                    var e = t.querySelector(".t-store__card__price-buttons");
                    if (e)
                        if (e.classList.contains("t-store__card__price-buttons_in-row")) {
                            var r = e.querySelector(".t-store__card__price-wrapper"),
                                o = e.querySelector(".t-store__card__btns-wrapper");
                            r && (r.style.width = s + "px"), o && (o.style.width = a + "px"), e.style.width = s + a + "px"
                        } else e.style.width = i + "px"
                }))
            }
        }
    }
}

function t_store_initPopup(t, e, r, o, i) {
    o || (window.sessionStorage.setItem("urlBeforePopupOpen", window.location.href), window.sessionStorage.setItem("titleBeforePopupOpen", document.title));
    var s = document.getElementById("allrecords") !== document.querySelector(".t-store__product-snippet") && document.getElementById("allrecords").contains(document.querySelector(".t-store__product-snippet")),
        a = document.getElementById("rec" + t);
    for (var n in e) {
        var d = o ? a.querySelector('.js-product-relevant[data-product-gen-uid="' + n + '"]') : a.querySelector('[data-product-gen-uid="' + n + '"]'),
            c = d.querySelectorAll('[href^="#prodpopup"]');
        Array.prototype.forEach.call(c, (function(a) {
            var n = d.closest(".js-product"),
                c = n.getAttribute("data-product-gen-uid"),
                l = e[c];
            l && a.setAttribute("href", l.url);
            var _ = function(s) {
                if (s.preventDefault(), !s.target.closest(".t1002__addBtn")) {
                    n = this.closest(".js-product"), c = n.getAttribute("data-product-gen-uid"), l = e[c];
                    var a = s.ctrlKey,
                        d = s.metaKey && -1 !== navigator.platform.indexOf("Mac");
                    a || d ? window.open(l.url) : (i.header || i.footer) && i.disablepopup ? location.href = l.url : t_store_openProductPopup(t, r, l, o, !1, !!o)
                }
            };
            s || a.addEventListener("click", _)
        }))
    }
    r.isPublishedPage && setTimeout((function() {
        t_store_checkUrl(r, t)
    }), 300), t_store_copyTypographyFromLeadToPopup(t, r)
}

function t_store_openProductPopup(t, e, r, o, i, s) {
    var a = document.getElementById("allrecords") !== document.querySelector(".t-store__product-snippet") && document.getElementById("allrecords").contains(document.querySelector(".t-store__product-snippet"));
    a || t_store_open_popup_routing_init(t, e);
    var n = e.showRelevants,
        d, c = document.getElementById("rec" + t).querySelector(".t-popup"),
        l, _;
    if (c && t_store_drawProdPopup(t, c, r, e, s), t_store_showPopup(t, i, s), Tilda && (Tilda.sendEcommerceEvent && (window.tStoreDetailEvent || (window.tStoreDetailEvent = {}), window.tStoreDetailEvent[r.id ? r.id : r.uid] || (Tilda.sendEcommerceEvent("detail", [{
            id: "" + (r.id ? r.id : r.uid),
            uid: "" + r.uid,
            price: "" + (r.price_min ? r.price_min : r.price),
            sku: r.sku ? r.sku : "",
            name: r.title
        }]), window.tStoreDetailEvent[r.id ? r.id : r.uid] = !0)), Tilda.sendEventToStatistics)) {
        var p = c.getAttribute("data-track-popup");
        if (p) {
            var u = "Popup: " + r.title;
            Tilda.sendEventToStatistics(p, u, "", 0)
        }
    }
    if (e.isPublishedPage && !i && t_store_changeUrl(t, r, o, e), n && !a) {
        var g, m = {
                cc: "current_category",
                all: "all_categories"
            } [n] || "category_" + n,
            v = "random",
            y = e.relevants_quantity || 4;
        t_store_loadProducts("relevants", t, e, !1, {
            currentProductUid: r.uid,
            relevantsQuantity: y,
            relevantsMethod: m,
            relevantsSort: "random"
        })
    }("y" !== window.lazy && "yes" !== document.getElementById("allrecords").getAttribute("data-tilda-lazy") || t_store_popup_updLazyOnScroll(t), parseInt(r.quantity, 10) <= 0 || "both" !== e.showStoreBtnQuantity && "popup" !== e.showStoreBtnQuantity) || t_store_addProductQuantity(document.querySelector("#rec" + t + " .t-popup .js-store-product"), r, e);
    window.tStoreIsMobile || t_store_hoverZoom_init(t), e.itemsAnim && e.previewmode && setTimeout((function() {
        t_store_onFuncLoad("t_animate__setAnimationStateChains", (function() {
            var t = document.querySelectorAll(".r"),
                e = [];
            Array.prototype.forEach.call(t, (function(t) {
                t.querySelector(".t-animate[data-animate-chain=yes]") && e.push(t)
            })), e.length && t_animate__setAnimationStateChains(e)
        }))
    }), 300)
}

function t_store_addProductQuantity(t, e, r) {
    if (window.jQuery && t instanceof jQuery) {
        if (0 === t.length) return;
        t = $(t).get(0)
    }
    var o = t.querySelector('.t-store__prod-popup__btn-wrapper a[href="#order"]:not(.t-store__prod-popup__btn_disabled)'),
        i = t.querySelector('.t-store__card__btns-wrapper a[href="#order"]:not([style*="display: none"])'),
        s = parseInt(e.quantity, 10),
        a;
    if (isNaN(s) && e.editions) {
        var n = t_store_product_getFirstAvailableEditionData(e.editions);
        s = parseInt(n.quantity, 10)
    }
    if ((i || o) && 0 !== s && 1 !== s && "" !== r.showStoreBtnQuantity && r.showStoreBtnQuantity) {
        if ("list" === r.showStoreBtnQuantity && t.classList.contains("t-store__card") || "popup" === r.showStoreBtnQuantity && t.classList.contains("t-store__product-snippet") || "popup" === r.showStoreBtnQuantity && t.classList.contains("t-store__product-popup") || "both" === r.showStoreBtnQuantity) {
            var a;
            if (r || (r = {}), a = t.querySelector(".t-store__prod__quantity")) var d = a.querySelector(".t-store__prod__quantity-input");
            if (a) {
                var c = d.min || 1;
                d.value = c, t_store__triggerEvent(d, "change");
                var l = d.value;
                isNaN(s) ? a.classList.remove("t-store__prod-popup__btn_disabled") : s > 1 ? (a.classList.remove("t-store__prod-popup__btn_disabled"), 0 === parseInt(l, 10) && (d.value = c)) : a.classList.add("t-store__prod-popup__btn_disabled")
            } else {
                var _ = "",
                    p = r.btn1_style,
                    u = "",
                    g = "";
                if (t.classList.contains("t-store__card") && (g = "", "sm" === r.btnSize && (g = "t-store__prod__quantity_xs")), "" !== p && p) {
                    var m = p.indexOf("border-radius");
                    if (-1 !== m) {
                        var v = p.slice(m).indexOf(";");
                        u = p.slice(m + 14, m + v)
                    }
                }
                var y = "";
                if ("" !== u && (y = "border-radius:" + u + ";"), _ += '<div class="t-store__prod__quantity ' + g + '" style="' + y + '">', _ += '<div class="t-store__prod__quantity__minus-wrapper">', _ += '<span class="t-store__prod__quantity__minus"></span>', _ += "</div>", _ += '<input class="t-store__prod__quantity-input t-descr t-descr_xxs" type="number" min="1" max="9999" step="1" value="1" size="4" maxlength="4" />', _ += '<div class="t-store__prod__quantity__plus-wrapper">', _ += '<span class="t-store__prod__quantity__plus"></span>', _ += "</div>", _ += "</div>", o ? o.insertAdjacentHTML("beforebegin", _) : i && i.insertAdjacentHTML("beforebegin", _), t_store_addProductQuantityEvents(t), d = (a = t.querySelector(".t-store__prod__quantity")).querySelector(".t-store__prod__quantity-input"), i) {
                    var f = i.parentNode;
                    if (f.classList.add("t-store__card__btns-wrapper--quantity"), f.querySelectorAll('a:not([href^="#order"])').length > 0 && Element.prototype.matches.call(f.parentNode, "div[class]")) {
                        var h = f.parentNode,
                            w = document.createElement("div");
                        w.appendChild(f), h && h.appendChild(w)
                    }
                }
            }
            d && (isNaN(s) ? d.max = 9999 : s > 0 && (d.max = s))
        }
    } else(a = t.querySelector(".t-store__prod__quantity")) && (a.parentNode.classList.remove("t-store__card__btns-wrapper--quantity"), t_store__removeElement(a))
}

function t_store_addProductQuantityEvents(t) {
    if (window.jQuery && t instanceof jQuery) {
        if (0 === t.length) return;
        t = t[0]
    }
    var e = t.querySelector(".t-store__prod__quantity");
    if (e) {
        var r = e.querySelector(".t-store__prod__quantity-input"),
            o = function() {
                r.stepDown()
            },
            i = t.querySelector(".t-store__prod__quantity__minus-wrapper");
        i && (i.removeEventListener("click", o), i.addEventListener("click", o));
        var s = function() {
                r.stepUp()
            },
            a = t.querySelector(".t-store__prod__quantity__plus-wrapper");
        a && (a.removeEventListener("click", s), a.addEventListener("click", s));
        var n = function() {
                var t = r.min || 1,
                    e = r.max || 9999,
                    o = parseInt(r.value || 1, 10);
                o < 1 || isNaN(o) ? r.value = t : r.value = o > e ? e : o
            },
            d = t.querySelector(".t-store__prod__quantity-input");
        d && (d.removeEventListener("change", n), d.addEventListener("change", n))
    }
}

function t_store_removeProductQuantity(t) {
    var e = t.querySelector('.t-store__prod-popup__btn-wrapper a[href="#order"]:not(.t-store__prod-popup__btn_disabled)'),
        r;
    if (t.querySelector('.t-store__card__btns-wrapper a[href="#order"]:not([style*="display: none"])') || e) {
        var o = t.querySelector(".t-store__prod__quantity");
        o && (o.parentNode.classList.remove("t-store__card__btns-wrapper--quantity"), t_store__removeElement(o))
    }
}

function t_store_open_popup_routing_init(t, e) {
    window.onpopstate = function() {
        if (window.history.state)
            if (window.history.state.productData) {
                var r = window.history.state.productData,
                    o, i, s, a;
                t_store_openProductPopup(r.recid, r.opts, r.productObj, r.isRelevantsShow, !0)
            } else t_store_closePopup(!0, t, e);
        else t_store_closePopup(!0, t, e)
    }
}

function t_store_popup_updLazyOnScroll(t) {
    var e = document.querySelector("#rec" + t + " .t-popup"),
        r = document.getElementById("allrecords").getAttribute("data-tilda-mode");
    e && "edit" !== r && "preview" !== r && e.addEventListener("scroll", t_throttle((function() {
        t_store_onFuncLoad("t_lazyload_update", (function() {
            t_lazyload_update()
        }))
    })))
}

function t_store_changeUrl(t, e, r, o) {
    var i = /iPhone|iPad|iPod/i.test(navigator.userAgent),
        s = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
        a = window.location.href,
        n = {
            productObj: e,
            opts: o,
            isRelevantsShow: r,
            recid: t
        },
        d, c = document.title + " ??? " + e.title;
    a.indexOf("/tproduct/") < 0 && a.indexOf("%2Ftproduct%2F") < 0 ? (t_store_history_pushState({
        productData: n
    }, c, d = t_store_generateUrl(e)), i && s && (document.querySelector('head link[rel="canonical"]').setAttribute("href", d), document.title = c)) : r && t_store_history_pushState({
        productData: n
    }, c, d = t_store_generateUrl(e))
}

function t_store_generateUrl(t) {
    var e = window.location.protocol,
        r = window.location.host,
        o;
    return (o = (o = t.url.split("://")[1]).split("/")).shift(), e + "//" + r + "/" + (o = o.join("/"))
}

function t_store_drawProdPopup(t, e, r, o, i) {
    e.scrollTop = 0;
    var s = e.querySelector(".js-store-product.js-product");
    s.setAttribute("data-card-size", "large"), t_store_drawProdPopup_drawGallery(t, e, r, o), window.tStoreDefPackObj || (window.tStoreDefPackObj = {});
    var a = e.querySelector(".js-store-product");
    a.setAttribute("data-product-lid", r.uid), a.setAttribute("data-product-uid", r.uid), a.setAttribute("data-product-gen-uid", r.uid);
    var n = e.querySelector(".js-store-prod-name");
    r.title ? (n.innerHTML = r.title, n.style.display = "") : (n.innerHTML = "", n.style.display = "none");
    var d = [];
    try {
        d = JSON.parse(r.partuids)
    } catch (t) {}
    if (a.setAttribute("data-product-part-uid", d.join(",")), o.linksSizeChart && d.length > 0) {
        for (var c = "", l = [], _ = 0; _ < d.length; _++) {
            var p = d[_];
            o.linksSizeChart[p] && o.linksSizeChart[p].infotext && o.linksSizeChart[p].infourl && -1 === l.indexOf(o.linksSizeChart[p].infourl) && (c += '<div class="t-store__prod-popup__link t-descr t-descr_xxs">', c += '<a href="' + o.linksSizeChart[p].infourl.replace(/"/g, "&quot;") + '" target="_blank">', c += o.linksSizeChart[p].infotext, c += "</a>", c += "</div>", l.push(o.linksSizeChart[p].infourl))
        }
        e.querySelector(".t-store__prod-popup__links-wrapper").innerHTML = c
    } else e.querySelector(".t-store__prod-popup__links-wrapper").innerHTML = "";
    t_store_initTextAndCharacteristics(e, r), o.tabs && t_store_onFuncLoad("t_store_tabs_init", (function() {
        t_store_tabs_init(t, o, r, s, e)
    })), t_store_addProductOptions(t, r, s, o), t_store_option_handleOnChange(s), t_store_option_handleOnChange_custom(t, s, o), t_store_onFuncLoad("t_prod__initProduct", (function() {
        t_prod__initProduct(s, o)
    })), window.t_store_prodPopup_updateGalleryThumbsEvent = function() {
        t_store_prodPopup_updateGalleryThumbs(t, e, r, o)
    }, i && window.removeEventListener("resize", window.t_store_prodPopup_updateGalleryThumbsEvent), window.addEventListener("resize", window.t_store_prodPopup_updateGalleryThumbsEvent)
}

function t_store_initTextAndCharacteristics(t, e) {
    var r = document.getElementById("allrecords") !== document.querySelector(".t-store__product-snippet") && document.getElementById("allrecords").contains(document.querySelector(".t-store__product-snippet")),
        o = t.querySelector(".js-store-prod-text");
    if (o) {
        for (; o.firstChild;) o.removeChild(o.firstChild);
        o.style.display = "none"
    }
    var i = e.pack_label || "",
        s = parseInt(e.pack_m, 10) || 0,
        a = parseInt(e.pack_x, 10) || 0,
        n = parseInt(e.pack_y, 10) || 0,
        d = parseInt(e.pack_z, 10) || 0,
        c = e.url || "",
        l = i && a && n && d,
        _ = s,
        p = e.characteristics && e.characteristics.length > 0 || l || _,
        u = !0,
        g = p,
        m;
    t.querySelectorAll('.t-store__tabs .t-store__tabs__item[data-tab-type="text"]').length && (u = !1);
    var v = t.querySelectorAll('.t-store__tabs .t-store__tabs__item[data-tab-type="chars"]');
    v.length && (g = !1);
    var y = '<div class="js-store-prod-all-text"' + (u ? "" : ' style="display: none;"') + ">";
    y += e.text ? e.text : e.descr ? e.descr : "", y += "</div>";
    var f = u ? "margin-top: 20px;" : "",
        h = '<div class="js-store-prod-all-charcs"' + ((f += g ? "" : "display: none;").length ? ' style="' + f + '"' : "") + ">",
        w = "";
    if (p && e.characteristics.forEach((function(t) {
            w += '<p class="js-store-prod-charcs">' + t.title + ": " + t.value + "</p>"
        })), w += '<p class="js-store-prod-dimensions"></p>', h += w += '<p class="js-store-prod-weight"></p>', h += "</div>", o && (o.insertAdjacentHTML("beforeend", y), o.insertAdjacentHTML("beforeend", h), o.style.display = ""), r && v.length && Array.prototype.forEach.call(v, (function(t, e) {
            var r = t.querySelector(".t-store__tabs__content");
            if (r) {
                for (; r.firstChild;) r.removeChild(r.firstChild);
                r.insertAdjacentHTML("beforeend", w), 0 !== e && (r.querySelector(".js-store-prod-dimensions").parentNode.style.display = "")
            }
        })), l) {
        var b = a + "x" + n + "x" + d,
            S = window.tStoreDict["product-" + i] + ": " + b + "&nbsp;" + window.tStoreDict.mm,
            E = t.querySelector(".js-store-prod-dimensions");
        E && (E.innerHTML = S), r && (Array.prototype.forEach.call(v, (function(t) {
            var e = t.querySelector(".js-store-prod-dimensions");
            e && (e.innerHTML = S)
        })), t.setAttribute("data-product-pack-label", i), t.setAttribute("data-product-pack-x", a), t.setAttribute("data-product-pack-y", n), t.setAttribute("data-product-pack-z", d))
    }
    if (_) {
        var A = window.tStoreDict["product-weight"] + ": " + s + "&nbsp;" + window.tStoreDict.g;
        t.querySelector(".js-store-prod-weight").innerHTML = A, r && (v.length && Array.prototype.forEach.call(v, (function(t) {
            var e = t.querySelector(".js-store-prod-weight");
            e && (e.innerHTML = A)
        })), t.setAttribute("data-product-pack-m", s))
    }
    var C = t.querySelector(".js-store-product");
    r && t.classList.contains("js-store-product") && (C = t), C && (C.setAttribute("data-product-pack-label", i), C.setAttribute("data-product-pack-m", s), C.setAttribute("data-product-pack-x", a), C.setAttribute("data-product-pack-y", n), C.setAttribute("data-product-pack-z", d), C.setAttribute("data-product-url", c))
}

function t_store_addProductOptions(t, e, r, o) {
    if (window.jQuery && r instanceof jQuery) {
        if (0 === r.length) return;
        r = r[0]
    }
    var i = r.querySelector(".js-product-controls-wrapper");
    if (i) {
        i.innerHTML = "";
        var s = document.getElementById("allrecords") !== document.querySelector(".t-store__product-snippet") && document.getElementById("allrecords").contains(document.querySelector(".t-store__product-snippet")),
            a = t_store_product_getFirstAvailableEditionData(e.editions);
        t_store_product_initEditions(t, e, r, o);
        var n = {
                name: e.prod_option,
                values: e.prod_variants
            },
            d = {
                name: e.prod_option2,
                values: e.prod_variants2
            },
            c = {
                name: e.prod_option3,
                values: e.prod_variants3
            },
            l = {
                name: e.prod_option4,
                values: e.prod_variants4
            },
            _ = {
                name: e.prod_option5,
                values: e.prod_variants5
            };
        t_store_product_addOneOptionsControl("modificator", n, i, o, a, t), t_store_product_addOneOptionsControl("modificator", d, i, o, a, t), t_store_product_addOneOptionsControl("modificator", c, i, o, a, t), t_store_product_addOneOptionsControl("modificator", l, i, o, a, t), t_store_product_addOneOptionsControl("modificator", _, i, o, a, t), s && (t_store_option_handleOnChange(r), t_store_option_handleOnChange_custom(t, r, o))
    }
}

function t_store_get_control_option_html(t) {
    var e = "",
        r, o = "",
        i = t.typo && t.typo.descrColor ? t.typo.descrColor : "";
    return e += '<div class="js-product-option t-product__option">', e += '<div class="js-product-option-name t-product__option-title t-descr t-descr_xxs" ' + (r = "" !== (o += "" !== i ? "color:" + i + ";" : "") ? 'style = "' + o + '"' : "") + ">[[name]]</div>", e += '<div class="t-product__option-variants t-product__option-variants_regular"> <select class="js-product-option-variants t-product__option-select t-descr t-descr_xxs"> [[optiontags]] </select> </div>', e += "</div>"
}

function t_store_get_control_editionOption_html(t, e) {
    var r = "",
        o, i = "",
        s = "",
        a = t.typo && t.typo.descrColor ? t.typo.descrColor : "";
    o = "" !== (i += "" !== a ? "color:" + a + ";" : "") ? 'style = "' + i + '"' : "";
    var n, d = t_store_option_checkIfCustom(e) ? ' style="display: none;"' : "";
    return e.params && (e.params.view && (s += ' data-view-type="' + e.params.view + '"'), e.params.hasColor ? s += ' data-option-type="color"' : s += ' data-option-type="regular"'), r += '<div class="js-product-edition-option t-product__option" data-edition-option-id="[[id]]"' + s + ">", r += '<div class="js-product-edition-option-name t-product__option-title t-descr t-descr_xxs" ' + o + ">[[name]]</div>", r += '<div class="t-product__option-variants t-product__option-variants_regular"' + d + '> <select class="js-product-edition-option-variants t-product__option-select t-descr t-descr_xxs"> [[optiontags]] </select> </div>', r += "</div>"
}

function t_store_option_styleCustomControl(t, e, r, o, i) {
    var s = "",
        a = o.querySelector('.js-product-edition-option[data-edition-option-id="' + r.id + '"]');
    if (a) {
        var n = r.params && "select" === r.params.view,
            d = r.params && r.params.hasColor && !r.params.linkImage,
            c = r.params && r.params.linkImage,
            l = r.values[0],
            _ = t_store_option_getClassModificator(r, "select", "t-product__option-variants"),
            p = t_store_option_getClassModificator(r, "select", "t-product__option-item"),
            u = t_store_option_getClassModificator(r, "select", "t-product__option-input"),
            g = t_store_option_getClassModificator(r, "select", "t-product__option-checkmark"),
            m = t_store_option_getClassModificator(r, "select", "t-product__option-title");
        if (n) {
            var v, y;
            if (s += '<div class="t-product__option-selected ' + t_store_option_getClassModificator(r, "select", "t-product__option-selected") + ' t-descr t-descr_xxs">', d) s += '<span class="t-product__option-selected-checkmark"' + (' style="background-color: ' + t_store_option_getColorValue(r.valuesObj, l) + ';"') + "></span>";
            else if (c) {
                var f = r.values[0],
                    h, w, b;
                s += '<div class="t-product__option-selected-checkmark t-bgimg" data-original="' + (h = r.imagesObj[f]) + '"' + ((w = t_store_getLazyUrl(e, h)) ? " style=\"background-image: url('" + w + "');\"" : "") + "></div>"
            }
            s += '<span class="t-product__option-selected-title">' + l + "</span>", s += "</div>", _ += " t-product__option-variants_hidden"
        }
        s += '<form class="t-product__option-variants t-product__option-variants_custom ' + _ + '">';
        for (var S = 0; S < r.values.length; S++) {
            var f = r.values[S],
                E = i[r.name] === f,
                A = E ? " checked" : "",
                C = E ? " t-product__option-item_active " : "",
                x = d ? ' style="background-color: ' + t_store_option_getColorValue(r.valuesObj, f) + ';"' : "",
                h, w;
            if (s += '<label class="t-product__option-item ' + C + p + '">', s += '<input class="t-product__option-input ' + u + '" type="radio" name="' + r.name + '" value="' + t_store_escapeQuote(f) + '"' + A + ">", c && r.imagesObj) s += '<div class="t-product__option-checkmark t-bgimg ' + g + '"' + (x = (w = t_store_getLazyUrl(e, h = r.imagesObj[f])) ? " style=\"background-image: url('" + w + "');\"" : "") + ' data-original="' + h + '"></div>';
            else s += '<div class="t-product__option-checkmark ' + g + '"' + x + "></div>";
            s += '<span class="t-product__option-title ' + m + ' t-descr t-descr_xxs">' + f + "</span>", s += "</label>"
        }
        s += "</form>", a.insertAdjacentHTML("beforeend", s)
    }
}

function t_store_option_getColorValue(t, e) {
    var r = "#ffffff";
    for (var o in e = e.toString(), t) {
        var i = t[o];
        if (i.value === e) {
            r = i.color;
            break
        }
    }
    return r
}

function t_store_option_getClassModificator(t, e, r) {
    if (!t) return "";
    var o = t.params,
        i = r + "_" + o.view;
    return o.hasColor && o.linkImage ? "filter" === e ? (i = r + "_buttons", i += " " + r + "_color") : i += " " + r + "_image" : o.hasColor ? i += " " + r + "_color" : o.linkImage ? i += " " + r + "_image" : i += " " + r + "_simple", i
}

function t_store_checkUrl(t, e) {
    var r = window.location.href,
        o = r.indexOf("/tproduct/");
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && o < 0 && (o = r.indexOf("/tproduct/")) < 0 && (o = r.indexOf("%2Ftproduct%2F")), o >= 0) {
        var i = (r = r.substring(o, r.length)).split("-");
        if (void 0 === i[1]) return;
        var s = i[1],
            a = document.getElementById("rec" + e),
            n = a.querySelector('.js-store-grid-cont [data-product-gen-uid="' + s + '"]'),
            d = a.querySelector(".t-popup");
        if (r.indexOf(e) >= 0 && n) {
            if (!d.classList.contains("t-popup_show")) {
                var c = n.querySelector('[href^="#prodpopup"]');
                c && c.click()
            }
        } else if (r.indexOf(e) >= 0 && d) {
            if (d.classList.contains("t-popup_show")) return;
            var l;
            if (!(document.getElementById("allrecords") !== document.querySelector(".t-store__product-snippet") && document.getElementById("allrecords").contains(document.querySelector(".t-store__product-snippet")))) {
                var _ = function(r) {
                    if ("string" == typeof r && "{" === r.substring(0, 1)) {
                        var o;
                        try {
                            var i;
                            o = JSON.parse(r).product
                        } catch (t) {
                            console.log(r)
                        }
                        if (!o) return void console.log("Can't get product with uid = " + s + " in storepart = " + t.storepart);
                        t_store_openProductPopup(e, t, o)
                    } else console.log("Can't get product with uid = " + s + " in storepart = " + t.storepart)
                };
                t_store_loadOneProduct(e, t, s, _, (function(r) {
                    t_store_changeEndpoint(r, (function() {
                        t_store_loadOneProduct(e, t, s, _)
                    }))
                }))
            }
        }
    }
}

function t_store_showPopup(t, e, r) {
    var o = document.getElementById("rec" + t),
        i = o.querySelector(".t-popup");
    t_store_resetNavStyles(t), document.body.classList.add("t-body_popupshowed"), i.style.display = "block";
    var s = i.scrollHeight > document.documentElement.clientHeight;
    s || (i.style.overflow = "hidden"), setTimeout((function() {
        i.querySelector(".t-popup__container").classList.add("t-popup__container-animated"), i.classList.add("t-popup_show"), t_store__triggerEvent(document.body, "twishlist_addbtn"), "y" !== window.lazy && "yes" !== document.getElementById("allrecords").getAttribute("data-tilda-lazy") || t_store_onFuncLoad("t_lazyload_update", (function() {
            t_lazyload_update()
        })), s || setTimeout((function() {
            i.style.overflow = "auto"
        }), 300)
    }), 50), r || addPopupEvents(o, t)
}

function t_store_closePopupKeyDown(t) {
    var e, r;
    document.body.classList.contains("t-zoomer__show") || (document.body.classList.contains("t-zoomer__active") || 27 === t.keyCode && t_store_closePopup(!1))
}

function addPopupEvents(t) {
    var e = function(t) {
        t.target === this && t_store_closePopup(!1)
    };
    t.querySelector(".t-popup").removeEventListener("click", e), t.querySelector(".t-popup").addEventListener("click", e);
    var r = function() {
        t_store_closePopup(!1)
    };
    Array.prototype.forEach.call(t.querySelectorAll(".t-popup__close, .js-store-close-text"), (function(t) {
        t.removeEventListener("click", r), t.addEventListener("click", r)
    })), document.addEventListener("keydown", t_store_closePopupKeyDown);
    var o = 30,
        i = 200,
        s = t.querySelectorAll(".t-popup__close-opacity-scroll");
    if (s.length) {
        var a = function(t) {
            var e = t.scrollTop(),
                r;
            r = e >= 200 ? 1 : e <= 30 ? 0 : e / 200, s.style.backgroundClor = "rgba(255,255,255," + r + ")"
        };
        t.querySelector(".t-popup").removeEventListener("scroll", a), t.querySelector(".t-popup").addEventListener("scroll", a)
    }
}

function t_store_resetNavStyles(t) {
    var e = document.getElementById("rec" + t).querySelector(".t-popup__close");
    e.classList.contains("t-popup__close-solid") ? e.style.backgroundClor = "rgba(255,255,255,1)" : e.classList.contains("t-popup__close-opacity-scroll") && (e.style.backgroundClor = "rgba(255,255,255,0)")
}

function t_store_closePopup(t, e, r) {
    var o = /iPhone|iPad|iPod/i.test(navigator.userAgent),
        i = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
        s, a, n, d;
    if (document.getElementById("allrecords") !== document.querySelector(".t-store__product-snippet") && document.getElementById("allrecords").contains(document.querySelector(".t-store__product-snippet")) || t_store_closePopup_routing(), Array.prototype.forEach.call(document.querySelectorAll(".t-popup"), (function(t) {
            var e = t.querySelector(".t-slds__item_active .t-slds__frame");
            e && e.src && -1 !== e.src.indexOf("&enablejsapi=1") && e.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*"), t.classList.remove("t-popup_show")
        })), setTimeout((function() {
            document.body.classList.remove("t-body_popupshowed")
        }), 300), t)
        if (t_store_isQueryInAddressBar("tstore")) {
            var c = decodeURI(window.location.hash).split("/"),
                l = c.indexOf("c") + 1,
                _ = c.indexOf("r") + 1,
                a, p = c[_];
            a = -1 !== c[l].indexOf("-") ? c[l].slice(0, c[l].indexOf("-")) : c[l], window.history.state && ((n = window.history.state.opts).storepart = a), t_store_isStorepartFromHistoryActive(a, e, r) || t_store_loadProducts("", p, n)
        } else t_store_isStorepartFromHistoryActive(r.storepart, e, r) || t_store_loadProducts("", e, r);
    else if (window.history.state && window.history.state.productData) {
        var u = window.sessionStorage.getItem("urlBeforePopupOpen"),
            g = window.sessionStorage.getItem("titleBeforePopupOpen");
        t_store_history_pushState({
            storepartuid: a = (d = window.history.state.productData).opts.storepart,
            opts: r = d.opts,
            recid: e = d.recid
        }, null, u), o && i && (document.querySelector('head link[rel="canonical"]').setAttribute("href", u), document.title = g)
    }
    e && (document.getElementById("rec" + e).querySelector(".js-store-parts-switcher") && !r.hideStoreParts && t_store_setActiveStorePart(e), t_store_galleryVideoClearFrame(e), r.tabs && t_store_onFuncLoad("t_store_tabs_videoClearFrame", (function() {
        t_store_tabs_videoClearFrame(e)
    }))), setTimeout((function() {
        document.querySelector(".t-popup").scrollTop = 0, Array.prototype.forEach.call(document.querySelectorAll(".t-popup:not(.t-popup_show)"), (function(t) {
            t.style.display = "none"
        }))
    }), 300), document.removeEventListener("keydown", t_store_closePopupKeyDown), window.removeEventListener("resize", window.t_store_prodPopup_updateGalleryThumbsEvent), t_store__triggerEvent(document.body, "twishlist_addbtn")
}

function t_store_isStorepartFromHistoryActive(t, e, r) {
    var o = document.getElementById("rec" + e),
        i;
    return !(!r || r.storePartsArr) || !!t && (t = parseInt(t, 10), o.querySelector(".js-store-parts-switcher.t-active").getAttribute("data-storepartUid") === t)
}

function t_store_closePopup_routing() {
    window.onpopstate = function() {
        if (window.history.state) {
            if (window.history.state.productData) {
                var t = window.history.state.productData,
                    e = t.recid,
                    r = t.opts,
                    o, i;
                t_store_openProductPopup(e, r, t.productObj, t.isRelevantsShow, !0)
            }
            if (window.history.state.storepartuid) {
                var s = window.history.state.opts,
                    a = window.history.state.recid;
                r.isPublishedPage = !0, t_store_loadProducts("", a, s)
            }
        }
    }
}

function t_store_copyTypographyFromLeadToPopup(t, e) {
    var r = document.getElementById("rec" + t),
        o = r.querySelector(".js-store-grid-cont .js-store-prod-name"),
        i = r.querySelector(".js-store-grid-cont .js-store-prod-descr"),
        s = r.querySelector(".t-popup .t-popup__container"),
        a, n;
    if (s && (a = s.style.backgroundColor), o) {
        var d = o.getAttribute("style"),
            c = r.querySelector(".t-popup .js-store-prod-name");
        if (c && (c.setAttribute("style", t_store_removeSizesFromStylesLine(d)), a)) {
            var l = c.style.color;
            0 === Math.abs(t_store_getLightnessColor(l) - t_store_getLightnessColor(a)) && (c.style.color = t_store_luma_rgb(a))
        }
    }
    i && (n = i.getAttribute("style")), !n && e.typo.descr && (n = (n = e.typo.descr).replace("line-height:0;", ""));
    var _ = r.querySelector(".t-popup .js-store-prod-text");
    if (_ && (_.setAttribute("style", t_store_removeSizesFromStylesLine(n)), a)) {
        var p = _.style.color;
        0 === Math.abs(t_store_getLightnessColor(p) - t_store_getLightnessColor(a)) && (_.style.color = t_store_luma_rgb(a))
    }
}

function t_store_removeSizesFromStylesLine(t) {
    return t ? t.split(";").filter((function(t) {
        return !t.match(/(font-size|padding-(top|bottom))/)
    })).join(";") : "";
    var e, r
}

function t_store_drawProdPopup_drawGallery(t, e, r, o) {
    var i = document.getElementById("rec" + t);
    if (window.jQuery && e instanceof jQuery) {
        if (0 === e.length) return;
        e = e[0]
    }
    var s = e.querySelector(".js-store-prod-slider"),
        a;
    if (r.gallery)
        if (0 !== (a = "string" == typeof r.gallery ? JSON.parse(r.gallery) : r.gallery).length) {
            var n = document.getElementById("allrecords") !== document.querySelector(".t-store__product-snippet") && document.getElementById("allrecords").contains(document.querySelector(".t-store__product-snippet")),
                d = o.galleryStyle && "" !== o.galleryStyle && parseInt(o.popup_opts.columns, 10) + parseInt(o.popup_opts.columns2, 10) <= 12;
            if (n && d) {
                var c = e.querySelector(".t-store__prod-popup__info");
                c && c.classList.add("t-store__prod-popup__col_fixed");
                var l = o.popup_opts.isVertical ? "" : "t-store__prod-popup__col-left t-col t-col_" + o.popup_opts.columns,
                    _ = "t-store__prod-popup__col_fixed";
                s.insertAdjacentHTML("beforebegin", '<div class="t-store__prod-popup__gallery-column js-store-prod-gallery-column ' + l + " " + _ + '"></div>')
            }
            var p = t_store_get_productcard_slider_html(i, o),
                u = "",
                g = "",
                m = "thumbs" === o.slider_opts.controls || "arrowsthumbs" === o.slider_opts.controls || "dots" === o.slider_opts.controls || "" === o.slider_opts.controls,
                v = "thumbs" === o.slider_opts.controls || "arrowsthumbs" === o.slider_opts.controls,
                y = parseInt(o.popup_opts.columns, 10),
                f = +o.slider_slidesOpts.ratio,
                h = 60,
                w = 10,
                b, S, E = "",
                A = e.querySelector(".js-store-prod-gallery-column"),
                d = o.galleryStyle && "" !== o.galleryStyle && parseInt(o.popup_opts.columns, 10) + parseInt(o.popup_opts.columns2, 10) <= 12 && ("col1_fixed" === o.galleryStyle || "col2_fixed" === o.galleryStyle);
            Array.prototype.forEach.call(a, (function(t, e) {
                d && (E += '<div class="t-store__prod-popup__wrapper t-store__prod-popup__wrapper__' + o.galleryStyle + '">', E += t_store_galleryVideoIcon(o, t), E += '   <img class="t-store__prod-popup__columns t-img' + (0 === e ? " js-product-img" : "") + '" src="' + t_store_getLazySrc(o, t.img) + '" data-original="' + t.img + '"' + (o.slider_slidesOpts.zoomable ? ' data-zoom-target="' + e + '" data-zoomable="yes" data-img-zoom-url="' + t.img + '"' : "") + " /> ", E += "</div>");
                var r = t_store_get_productcard_oneSlide_html(o, t);
                if (u += r.replace("[[activeClass]]", 0 === e ? "t-slds__item_active" : "").replace("[[productClass]]", 0 === e ? "js-product-img" : "").replace(/\[\[index\]\]/g, e + 1).replace(/\[\[imgsource_lazy\]\]/g, t_store_getLazyUrl(o, t.img)).replace(/\[\[imgsource\]\]/g, t.img), m)
                    if (v && "l" === o.sliderthumbsside) {
                        var i = t_store_prodPopup_gallery_calcMaxThumbsCount(y, f, 60, 10);
                        e <= i - 1 && (e <= i - 2 || e === a.length - 1 ? (b = t_store_get_productcard_oneSliderBullet_html(o), S = b.replace("[[activeClass]]", 0 === e ? "t-slds__bullet_active" : "").replace(/\[\[index\]\]/g, e + 1).replace(/\[\[imgsource_lazy\]\]/g, t_store_getLazyUrl(o, t.img)).replace(/\[\[imgsource\]\]/g, t.img)) : (b = t_store_get_productcard_thumbsGallery_html(o, a.length, i), S = b.replace("[[activeClass]]", 0 === e ? "t-slds__bullet_active" : "").replace(/\[\[index\]\]/g, e + 1).replace(/\[\[imgsource_lazy\]\]/g, t_store_getLazyUrl(o, t.img)).replace(/\[\[imgsource\]\]/g, t.img)), g += S)
                    } else b = t_store_get_productcard_oneSliderBullet_html(o), S = b.replace("[[activeClass]]", 0 === e ? "t-slds__bullet_active" : "").replace(/\[\[index\]\]/g, e + 1).replace(/\[\[imgsource_lazy\]\]/g, t_store_getLazyUrl(o, t.img)).replace(/\[\[imgsource\]\]/g, t.img), g += S
            })), p = p.replace("[[slides]]", u), m && (p = p.replace("[[bullets]]", g)), A && (A.innerHTML = E), s && (s.innerHTML = p), t_store_galleryVideoHandle(t);
            var C = ".t-slds__arrow_container, .t-slds__bullet_wrapper, .t-slds__thumbsbullet-wrapper",
                x;
            1 === a.length ? e.querySelector(C).style.display = "none" : e.querySelector(C).style.display = "", "l" === o.sliderthumbsside && (x = {
                thumbsbulletGallery: !0,
                storeOptions: o
            }), setTimeout((function() {
                t_store_onFuncLoad("t_sldsInit", (function() {
                    t_sldsInit(t + " .js-store-product", x)
                }))
            }), 200)
        } else s && (s.innerHTML = "");
    else s && (s.innerHTML = "")
}

function t_store_galleryVideoHandle(t) {
    var e = document.getElementById("rec" + t),
        r = e.querySelectorAll(".t-slds__play_icon");
    Array.prototype.forEach.call(r, (function(r) {
        var o;
        r && (r.addEventListener("click", (function() {
            if ("youtube.com" === this.getAttribute("data-slider-video-type")) {
                var t = this.getAttribute("data-slider-video-params");
                o = this.getAttribute("data-slider-video-url"), this.nextElementSibling.innerHTML = '<iframe class="t-slds__frame" width="100%" height="100%" src="https://www.youtube.com/embed/' + o + "?autoplay=1&rel=0&enablejsapi=1" + (t || "") + '" frameborder="0" allowfullscreen></iframe>'
            }
            "vimeo.com" === this.getAttribute("data-slider-video-type") && (o = this.getAttribute("data-slider-video-url"), this.nextElementSibling.innerHTML = '<iframe class="t-slds__frame" width="100%" height="100%" src="https://player.vimeo.com/video/' + o + '" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'), this.nextElementSibling.style.zIndex = 3
        })), e.addEventListener("updateSlider", (function() {
            t_store_galleryVideoClearFrame(t)
        })))
    }))
}

function t_store_galleryVideoIcon(t, e) {
    var r = "",
        o = e.video;
    if (o) {
        var i = t.slider_opts.videoPlayerIconColor || "#fff",
            s;
        "youtube.com" === e.vtype && -1 !== o.indexOf("?v=" + e.videoid) && -1 !== (s = (s = o.split("?v=" + e.videoid)[1]).replace(/&amp;/g, "&")).indexOf("loop=1") && -1 === s.indexOf("&playlist=") && (s += "&playlist=" + e.videoid), r += '<div class="t-slds__videowrapper">', r += '<div class="t-slds__play_icon" data-slider-video-url="' + e.videoid + '" ' + (s ? 'data-slider-video-params="' + s + '" ' : "") + 'data-slider-video-type="' + e.vtype + '" style="width:70px; height:70px">', r += '<svg width="70px" height="70px" viewBox="0 0 60 60">', r += '<g stroke="none" stroke-width="1" fill="" fill-rule="evenodd">', r += '<g transform="translate(-691.000000, -3514.000000)" fill="' + i + '">', r += '<path d="M721,3574 C737.568542,3574 751,3560.56854 751,3544 C751,3527.43146 737.568542,3514 721,3514 C704.431458,3514 691,3527.43146 691,3544 C691,3560.56854 704.431458,3574 721,3574 Z M715,3534 L732,3544.5 L715,3555 L715,3534 Z"></path>', r += "</g>", r += "</g>", r += "</svg>", r += "</div>", r += '<div class="t-slds__frame-wrapper"></div>', r += "</div>"
    }
    return r
}

function t_store_galleryVideoClearFrame(t) {
    var e, r = document.getElementById("rec" + t).querySelector(".t-slds__frame-wrapper");
    r && (r.innerHTML = "", r.style.zIndex = "")
}

function t_store_prodPopup_updateGalleryThumbs(t, e, r, o) {
    var i = document.getElementById("rec" + t),
        s, a;
    if (!("thumbs" === o.slider_opts.controls || "arrowsthumbs" === o.slider_opts.controls) && "l" === o.sliderthumbsside && r.gallery) {
        s = "string" == typeof r.gallery ? JSON.parse(r.gallery) : r.gallery;
        var n = e.querySelector(".js-store-prod-slider");
        if (0 !== s.length) {
            var d = parseInt(o.popup_opts.columns, 10),
                c = +o.slider_slidesOpts.ratio,
                l = 60,
                _ = 10,
                p = i.querySelectorAll(".t-slds__thumbsbullet").length,
                u = t_store_prodPopup_gallery_calcMaxThumbsCount(d, c, 60, 10),
                g, m, v, y, f;
            if (p !== u && s.length >= u || p < u && p !== s.length) Array.prototype.forEach.call(s, (function(t, e) {
                e <= u - 1 && (e <= u - 2 || e === s.length - 1 ? (m = t_store_get_productcard_oneSliderBullet_html(o), v = m.replace("[[activeClass]]", 0 === e ? "t-slds__bullet_active" : "").replace(/\[\[index\]\]/g, e + 1).replace(/\[\[imgsource_lazy\]\]/g, t_store_getLazyUrl(o, t.img)).replace(/\[\[imgsource\]\]/g, t.img)) : (m = t_store_get_productcard_thumbsGallery_html(o, s.length, u), v = m.replace("[[activeClass]]", 0 === e ? "t-slds__bullet_active" : "").replace(/\[\[index\]\]/g, e + 1).replace(/\[\[imgsource_lazy\]\]/g, t_store_getLazyUrl(o, t.img)).replace(/\[\[imgsource\]\]/g, t.img)), g += v)
            })), i.querySelector(".t-slds__thumbsbullet-wrapper").innerHTML = g, "l" === o.sliderthumbsside && (f = {
                thumbsbulletGallery: !0,
                storeOptions: o
            }), t_sldsInit(t + " .js-store-product", f), "y" !== window.lazy && "yes" !== document.getElementById("allrecords").getAttribute("data-tilda-lazy") || t_store_onFuncLoad("t_lazyload_update", (function() {
                t_lazyload_update()
            }))
        } else n && (n.innerHTML = "")
    }
}

function t_store_prodPopup_gallery_calcMaxThumbsCount(t, e, r, o) {
    var i = t_store_getColumnWidth(t),
        s = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    s >= 960 && s <= 1240 && (i = 440);
    var a = Math.floor(100 * e),
        n = Math.floor(a * (i - (r + o)) / 100),
        d = Math.floor(n / (r + o));
    return (r + o) * (d + 1) - o <= n && (d += 1), d
}

function t_store_get_productcard_slider_html(t, e) {
    var r = "",
        o = "t-slds_animated-none",
        i = "300";
    "fast" === e.slider_opts.anim_speed && (o = "t-slds_animated-fast"), "slow" === e.slider_opts.anim_speed && (o = "t-slds_animated-slow", i = "500");
    var s = "",
        a;
    if (("thumbs" === e.slider_opts.controls || "arrowsthumbs" === e.slider_opts.controls) && "l" === e.sliderthumbsside && (s = "t-slds__thumbsbullets-with-gallery"), r += '<div class="t-slds ' + s + '" style="visibility: hidden;">', r += '    <div class="t-slds__main">', r += '        <div class="t-slds__container" [[containerStyles]]>', r += '            <div class="t-slds__items-wrapper ' + o + ' [[noCycleClass]]" data-slider-transition="' + i + '" data-slider-with-cycle="[[isCycled]]" data-slider-correct-height="true" data-auto-correct-mobile-width="false">', r += "                [[slides]]", r += "            </div>", r += "            [[arrows]]", r += "        </div>", r += "    </div>", r += "    [[bullets]]", r += "</div>", "arrows" === e.slider_opts.controls || "arrowsthumbs" === e.slider_opts.controls || "" === e.slider_opts.controls) {
        var n, d = t.querySelector(".js-store-tpl-slider-arrows").innerHTML,
            c;
        d = '<div class="' + ("t-slds__arrow_container " + ("" === e.slider_opts.cycle ? "t-slds__nocycle" : "")) + '">' + d + "</div>", r = r.replace("[[arrows]]", d)
    } else r = r.replace("[[arrows]]", "");
    if ("thumbs" === e.slider_opts.controls || "arrowsthumbs" === e.slider_opts.controls) {
        var l = '<div class="t-slds__thumbsbullet-wrapper ' + ("contain" === e.slider_slidesOpts.bgsize ? "t-align_center" : "") + '">[[bullets]]</div>';
        r = r.replace("[[bullets]]", l)
    } else r = "dots" === e.slider_opts.controls || "" === e.slider_opts.controls ? r.replace("[[bullets]]", '<div class="t-slds__bullet_wrapper">[[bullets]]</div>') : r.replace("[[bullets]]", "");
    return r = r.replace("[[containerStyles]]", e.slider_opts.bgcolor ? 'style="background-color:' + e.slider_opts.bgcolor + ';"' : "").replace("[[noCycleClass]]", e.slider_opts.cycle ? "" : "t-slds__nocycle").replace("[[isCycled]]", e.slider_opts.cycle ? "true" : "false")
}

function t_store_get_productcard_oneSlide_html(t, e) {
    var r = "";
    return r += '<div class="t-slds__item [[activeClass]]" data-slide-index="[[index]]">', r += '    <div class="t-slds__wrapper" itemscope itemtype="https://schema.org/ImageObject">', r += '        <meta itemprop="image" content="[[imgsource]]">', r += '        <div class="t-slds__imgwrapper [[zoomClass]]" [[zoomAttrs]]>', r += '            <div class="t-slds__bgimg [[containClass]] t-bgimg [[productClass]]" data-original="[[imgsource]]" style="padding-bottom:[[paddingBottomVal]]; background-image: url(\'[[imgsource_lazy]]\');">', r += "            </div>", r += "         </div>", r += t_store_galleryVideoIcon(t, e), r += "    </div>", r = (r += "</div>").replace("[[zoomAttrs]]", t.slider_slidesOpts.zoomable ? 'data-zoom-target="[[index]]" data-zoomable="yes" data-img-zoom-url="[[imgsource]]"' : "").replace("[[zoomClass]]", t.slider_slidesOpts.zoomable ? "t-zoomable" : "").replace("[[containClass]]", "contain" === t.slider_slidesOpts.bgsize ? "t-slds__bgimg-contain" : "").replace("[[paddingBottomVal]]", 100 * t.slider_slidesOpts.ratio + "%")
}

function t_store_get_productcard_oneSliderBullet_html(t) {
    var e = "";
    if ("thumbs" !== t.slider_opts.controls && "arrowsthumbs" !== t.slider_opts.controls || (e += '<div class="t-slds__thumbsbullet t-slds__bullet [[activeClass]]" data-slide-bullet-for="[[index]]">', e += '    <div class="t-slds__bgimg t-bgimg" data-original="[[imgsource]]" style="padding-bottom: 100%; background-image: url(\'[[imgsource_lazy]]\');"></div>', e += '    <div class="t-slds__thumbsbullet-border"></div>', e += "</div>"), "dots" === t.slider_opts.controls || "" === t.slider_opts.controls) {
        e += '<div class="t-slds__bullet [[activeClass]]" data-slide-bullet-for="[[index]]">', e += '    <div class="t-slds__bullet_body" [[styles]]></div>', e += "</div>";
        var r = "";
        if (t.slider_dotsOpts.size) {
            var o = parseInt(t.slider_dotsOpts.size, 10);
            r += "width:" + (o = o > 20 ? 20 : o) + "px;height:" + o + "px;"
        }
        if (t.slider_dotsOpts.bgcolor && (r += "background-color:" + t.slider_dotsOpts.bgcolor + ";"), t.slider_dotsOpts.bordersize) {
            var i = t.slider_dotsOpts.bgcoloractive ? t.slider_dotsOpts.bgcoloractive : "#222";
            r += "border: " + t.slider_dotsOpts.bordersize + " solid " + i + ";"
        }
        e = e.replace("[[styles]]", "" !== r ? 'style="' + r + '"' : "")
    }
    return e
}

function t_store_get_productcard_thumbsGallery_html(t, e, r) {
    var o = "",
        i = e - r;
    if ("thumbs" === t.slider_opts.controls || "arrowsthumbs" === t.slider_opts.controls) {
        var s = "t-slds__thumbsbullet t-slds__bullet t-slds__thumbs_gallery [[activeClass]]";
        t.slider_slidesOpts.zoomable && (s += " t-slds__thumbs_gallery-zoomable"), o += '<div class="' + s + '" [[zoomAttrs]] data-gallery-length="' + i + '" data-slide-bullet-for="' + r + '">', o += '    <div class="t-slds__bgimg t-bgimg" data-original="[[imgsource]]" style="padding-bottom: 100%; background-image: url(\'[[imgsource_lazy]]\');"></div>', o += '    <div class="t-slds__thumbsbullet-border"></div>', o = (o += "</div>").replace("[[zoomAttrs]]", t.slider_slidesOpts.zoomable ? 'data-zoom-target="[[index]]" data-zoomable="yes" data-img-zoom-url="[[imgsource]]"' : "")
    }
    return o
}

function t_store_getLazyUrl(t, e) {
    if (!t.isPublishedPage || "y" !== window.lazy) return e;
    if (-1 === e.indexOf("static.tildacdn.com")) return e;
    var r = e.split("/");
    return r.splice(e.split("/").length - 1, 0, "-/resizeb/x20"), r.join("/")
}

function t_store_getLazySrc(t, e) {
    if (!t.isPublishedPage || "y" !== window.lazy) return e;
    if (-1 === e.indexOf(".tildacdn.com") || -1 !== e.indexOf("-/empty/") || -1 !== e.indexOf("-/resize/")) return e;
    var r = e.split("/");
    return r.splice(e.split("/").length - 1, 0, "-/empty"), r.join("/")
}

function t_store_dict(t) {
    return window.tStoreDict || t_store_getDictObj(), window.tStoreDict[t] || 'Text not found for "' + t + '"'
}

function t_store_escapeQuote(t) {
    if (!t) return "";
    var e = {
        '"': "&quot;",
        "'": "&#039;"
    };
    return t.replace(/["']/g, (function(t) {
        return e[t]
    }))
}

function t_store_product_initEditions(t, e, r, o) {
    var i = r.querySelector(".js-product-controls-wrapper"),
        s;
    t_store_product_addEditionControls(e, i, o, t), t_store_product_selectAvailableEdition(t, e, r, o) ? (t_store_product_triggerSoldOutMsg(r, !1, o), t_store_addProductQuantity(r, e, o), t_store_product_disableUnavailOpts(r, e)) : (t_store_product_triggerSoldOutMsg(r, !0, o), t_store_removeProductQuantity(r));
    var a, n = document.getElementById("rec" + t).querySelector(".t-store");
    Array.prototype.forEach.call(r.querySelectorAll(".js-product-edition-option"), (function(i) {
        i.addEventListener("change", (function() {
            var i = t_store_product_detectEditionByControls(r, e),
                s = !0;
            if (i) {
                t_store_product_updateEdition(t, r, i, e, o, !0), t_prod__updatePrice(r, o);
                var a = parseInt(i.quantity, 10) <= 0;
                t_store_product_triggerSoldOutMsg(r, a, o), a ? t_store_removeProductQuantity(r) : t_store_addProductQuantity(r, i, o), Tilda && Tilda.sendEcommerceEvent && (window.tStoreDetailEvent || (window.tStoreDetailEvent = {}), window.tStoreDetailEvent[i.id ? i.id : i.uid] || (Tilda.sendEcommerceEvent("detail", [{
                    id: "" + (i.id ? i.id : i.uid),
                    uid: "" + i.uid,
                    price: "" + (i.price_min ? i.price_min : i.price),
                    sku: i.sku ? i.sku : "",
                    name: e.title
                }]), window.tStoreDetailEvent[i.id ? i.id : i.uid] = !0))
            } else {
                for (var d = this.getAttribute("data-edition-option-id"), c = [], l = 0; l < e.editionOptions.length; l++) {
                    var _ = e.editionOptions[l];
                    if (c.push(_), _.name === d) break
                }
                var p = t_store_product_selectAvailableEdition(t, e, r, o, c, !0);
                t_prod__updatePrice(r, o), t_store_product_triggerSoldOutMsg(r, !p, o), t_store_addProductQuantity(r, e, o)
            }
            n && t_store__triggerEvent(n, "displayChanged"), Array.prototype.forEach.call(r.querySelectorAll(".js-product-edition-option-variants option"), (function(t) {
                t.removeAttribute("disabled")
            })), t_store_product_disableUnavailOpts(r, e)
        }))
    }))
}

function t_store_product_detectEditionByControls(t, e) {
    for (var r = 0; r < e.editions.length; r++) {
        for (var o = e.editions[r], i = !0, s = 0; s < e.editionOptions.length; s++) {
            var a = e.editionOptions[s],
                n = t_store_product_getEditionSelectEl(t, a),
                d, c;
            if (n) n.querySelector(".js-product-edition-option-variants").value !== o[a.name] && (i = !1)
        }
        if (i) return o
    }
    return null
}

function t_store_product_addEditionControls(t, e, r, o) {
    var i = t_store_option_getOptionsData(),
        s = t_store_product_getFirstAvailableEditionData(t.editions);
    t.editionOptions || (t.editionOptions = t_store_product_getEditionOptionsArr(t, i)), t.editionOptions.forEach((function(t) {
        t_store_product_addOneOptionsControl("editionopt", t, e, r, s, o)
    }))
}

function t_store_product_selectAvailableEdition(t, e, r, o, i, s) {
    var a = i && i.length > 0 ? t_store_product_getFirstAvailableEditionData_forCertainVals(e.editions, i, r) : t_store_product_getFirstAvailableEditionData(e.editions);
    if (!a) return console.log("No available edition for uid = " + e.uid + " with selected options values"), !1;
    var n = parseInt(a.quantity, 10) > 0 || "" === a.quantity;
    if (Array.prototype.forEach.call(e.editionOptions, (function(t) {
            var e = a[t.name],
                o = t_store_product_getEditionSelectEl(r, t);
            if (o) {
                var i = o.querySelector(".js-product-edition-option-variants");
                i && (i.value = e);
                var s = o.querySelectorAll(".t-product__option-variants_custom");
                Array.prototype.forEach.call(s, (function(t) {
                    var r = t.querySelectorAll(".t-product__option-item");
                    Array.prototype.forEach.call(r, (function(t) {
                        var r = t.querySelector(".t-product__option-input");
                        r.value === (e || "").replace(/&amp;/g, "&") ? (t.classList.add("t-product__option-item_active"), setTimeout((function() {
                            r.checked = !0, r.click()
                        }))) : (r.checked = !1, t.classList.remove("t-product__option-item_active"))
                    }))
                }))
            }
        })), r.classList.contains("js-product-relevant")) t_store_product_updateEdition(t, r, a, e, o, s);
    else {
        var d, c = t_store_snippet_getJsonFromUrl().editionuid,
            l;
        c && document.querySelector("#rec" + t + " .js-product").getAttribute("data-product-uid") !== c && e.editions.forEach((function(t) {
            t.uid === c && (l = t)
        })), t_store_product_updateEdition(t, r, l || a, e, o, s)
    }
    return n
}

function t_store_product_disableUnavailOpts(t, e) {
    var r = [];
    e.editionOptions.length > 0 && r.push(e.editionOptions[0]);
    for (var o = 1; o < e.editionOptions.length; o++) {
        var i = e.editionOptions[o],
            s = t_store_product_getEditionSelectEl(t, i);
        if (!s) return;
        r.push(i), Array.prototype.forEach.call(i.values, (function(o) {
            var i = t_store_product_getFirstAvailableEditionData_forCertainVals(e.editions, r, t, o),
                a = (o || "").replace(/\\/g, "\\\\").replace(/&amp;/g, "&").replace(/"/g, '\\"'),
                n = s.querySelector('option[value="' + a + '"]'),
                d = s.querySelector('.t-product__option-input[value="' + a + '"]'),
                c, c;
            i ? (n && n.removeAttribute("disabled"), d && (c = d.closest(".t-product__option-item")).classList.remove("t-product__option-item_disabled")) : (n && (n.setAttribute("disabled", "disabled"), n.selected && (n.selected = !1)), d && ((c = d.closest(".t-product__option-item")).classList.add("t-product__option-item_disabled"), c.classList.remove("t-product__option-item_active")))
        }))
    }
}

function t_store_product_updateEdition(t, e, r, o, i, s) {
    var a = t_store_snippet_getJsonFromUrl();
    if (window.jQuery && e instanceof jQuery && (e = e[0]), r || o.editions.forEach((function(t) {
            t.uid === a.editionuid && (r = t)
        })), a.editionuid === r.uid && (Array.prototype.forEach.call(document.querySelectorAll(".js-store-product"), (function(t) {
            t.setAttribute("data-product-lid", r.uid), t.setAttribute("data-product-uid", r.uid), t.setAttribute("data-product-url", window.location), t.setAttribute("data-product-img", r.img)
        })), setTimeout((function() {
            t_store_product_updateEdition_moveSlider(t, e, r)
        }), 200), Array.prototype.forEach.call(document.querySelectorAll('[data-product-uid="' + r.uid + '"] .js-product-edition-option'), (function(t) {
            var e = t.getAttribute("data-edition-option-id");
            if (r[e]) {
                var o = r[e],
                    i = t.querySelector(".js-product-edition-option-variants");
                i.value !== o && (i.value = o, setTimeout((function() {
                    t_store__triggerEvent(i, "change")
                })))
            }
        }))), r.price && 0 !== parseFloat(r.price)) {
        var n = t_store__getFormattedPrice(i, r.price),
            d = t_store__getFormattedPriceRange(i, o),
            c;
        if (i.price) {
            var l = i.price.priceRange;
            if (d && "range" === l && (n = d), d && "from" === l) {
                var _ = t_store__getFormattedMinPrice(i, o);
                null !== _ && (n = _)
            }
        }
        e.querySelector(".js-store-prod-price-val").textContent = n, (c = e.querySelector(".js-store-prod-price")) && (c.style.display = "");
        var p = t_store__cleanPrice(r.price),
            u = e.querySelector(".js-product-price");
        if (u && (u.setAttribute("data-product-price-def", p), u.setAttribute("data-product-price-def-str", p)), Array.prototype.forEach.call(e.querySelectorAll(".t-store__prod__price-portion"), (function(t) {
                t_store__removeElement(t)
            })), o.portion > 0) {
            var g = '<div class="t-store__prod__price-portion"><span class="t-store__prod__price-portion-slash">/</span>';
            "1" !== o.portion && (g += +o.portion + " "), g += window.tStoreDict[o.unit] + "</div>";
            var m = [".t-store__card__price-currency + .js-product-price", ".t-store__card__price-currency + .js-store-prod-price-old-val", ".js-product-price + .t-store__card__price-currency", ".js-store-prod-price-old-val + .t-store__card__price-currency", ".t-store__prod-popup__price-currency + .js-product-price", ".js-product-price + .t-store__prod-popup__price-currency", ".t-store__prod-popup__price-currency + .js-store-prod-price-old-val", ".js-store-prod-price-old-val + .t-store__prod-popup__price-currency", ".js-product-price-currency + .js-product-price", ".js-product-price + .js-product-price-currency", ".js-product-price-currency + .js-store-prod-price-old-val", ".js-store-prod-price-old-val + .js-product-price-currency"];
            Array.prototype.forEach.call(e.querySelectorAll(m.join(",")), (function(t) {
                t.insertAdjacentHTML("afterend", g)
            }))
        }
    } else {
        var c;
        (c = e.querySelector(".js-store-prod-price")) && (c.style.display = "none"), e.querySelector(".js-store-prod-price-val").textContent = "", e.querySelector(".js-product-price").setAttribute("data-product-price-def", ""), e.querySelector(".js-product-price").setAttribute("data-product-price-def-str", ""), t_store__removeElement(e.querySelector(".t-store__prod__price-portion"))
    }
    if (r.priceold && "0" !== r.priceold) {
        var v = t_store__getFormattedPrice(i, r.priceold),
            y, f, h;
        (y = e.querySelector(".js-store-prod-price-old")) && (y.style.display = ""), (f = e.querySelector(".t-store__card__price_old")) && (f.style.display = ""), (h = e.querySelector(".js-store-prod-price-old-val")) && (h.innerHTML = v)
    } else {
        var y, f, h;
        (y = e.querySelector(".js-store-prod-price-old")) && (y.style.display = "none"), (f = e.querySelector(".t-store__card__price_old")) && (f.style.display = "none"), (h = e.querySelector(".js-store-prod-price-old-val")) && (h.innerHTML = "")
    }
    var w = e.querySelector(".t-store__prod-popup__brand");
    o.brand && o.brand > "" && w && (1 === w.querySelectorAll("span[itemprop=brand]").length ? w.querySelector("span[itemprop=brand]").innerHTML = o.brand : w.innerHTML = '<span itemprop="brand" class="js-product-brand">' + o.brand + "</span>"), !o.brand && w && (w.style.display = "none");
    var b = e.querySelector(".t-store__prod-popup__sku"),
        S = e.querySelector(".js-store-prod-sku"),
        E;
    r.sku ? (S.innerHTML = r.sku, "large" === e.getAttribute("data-card-size") && (S.style.display = "", b && (b.style.display = ""))) : (S && (S.innerHTML = "", S.style.display = "none"), b && (b.style.display = "none")), e.setAttribute("data-product-inv", r.quantity), e.setAttribute("data-product-lid", r.uid), e.setAttribute("data-product-uid", r.uid), window.tStoreDefPackObj || (window.tStoreDefPackObj = {});
    try {
        var A = window.tStoreDefPackObj[o.uid],
            C = e.querySelectorAll('.t-store__tabs .t-store__tabs__item[data-tab-type="chars"]'),
            x = "";
        if (r.pack_x && r.pack_y && r.pack_z) {
            A || (A = {
                pack_x: e.getAttribute("data-product-pack-x") || 0,
                pack_y: e.getAttribute("data-product-pack-y") || 0,
                pack_z: e.getAttribute("data-product-pack-z") || 0,
                pack_label: e.getAttribute("data-product-pack-label") || o.pack_label || "lwh",
                pack_m: e.getAttribute("data-product-pack-m") || 0
            }, window.tStoreDefPackObj[o.uid] = A), e.setAttribute("data-product-pack-x", r.pack_x), e.setAttribute("data-product-pack-y", r.pack_y), e.setAttribute("data-product-pack-z", r.pack_z), e.setAttribute("data-product-pack-label", A.pack_label);
            var q = r.pack_x + "x" + r.pack_y + "x" + r.pack_z,
                j = e.querySelector(".js-store-prod-dimensions");
            x = window.tStoreDict["product-" + A.pack_label] + ": " + q + "&nbsp;" + window.tStoreDict.mm, j && (e.querySelector(".js-store-prod-dimensions").innerHTML = x)
        } else if (A && A.pack_x) {
            e.setAttribute("data-product-pack-x", A.pack_x), e.setAttribute("data-product-pack-y", A.pack_y), e.setAttribute("data-product-pack-z", A.pack_z), e.setAttribute("data-product-pack-label", A.pack_label);
            var q = A.pack_x + "x" + A.pack_y + "x" + A.pack_z,
                j;
            x = window.tStoreDict["product-" + A.pack_label] + ": " + q + "&nbsp;" + window.tStoreDict.mm, (j = e.querySelector(".js-store-prod-dimensions")) && (j.innerHTML = x)
        }
        x && Array.prototype.forEach.call(C, (function(t) {
            var e = t.querySelector(".js-store-prod-dimensions");
            e && (e.innerHTML = x)
        }));
        var k = "",
            L;
        if (r.pack_m) e.setAttribute("data-product-pack-m", r.pack_m), k = window.tStoreDict["product-weight"] + ": " + r.pack_m + "&nbsp;" + window.tStoreDict.g, (L = e.querySelector(".js-store-prod-weight")) && (L.innerHTML = k);
        else if (A && parseFloat(A.pack_m) > 0) {
            var L;
            e.setAttribute("data-product-pack-m", A.pack_m), k = window.tStoreDict["product-weight"] + ": " + A.pack_m + "&nbsp;" + window.tStoreDict.g, (L = e.querySelector(".js-store-prod-weight")) && (L.innerHTML = k)
        }
        k && Array.prototype.forEach.call(C, (function(t) {
            var e = t.querySelector(".js-store-prod-weight");
            e && (e.innerHTML = k)
        }))
    } catch (t) {
        console.log(t)
    }
    r.img ? (e.setAttribute("data-product-img", r.img), "large" === e.getAttribute("data-card-size") ? t_store_product_updateEdition_moveSlider(t, e, r) : s && t_store_get_productCard_img_replaceWith(o, e, i, r.img)) : e.getAttribute("data-product-img") && "large" === e.getAttribute("data-card-size") && (t_store_product_updateEdition_moveSlider(t, e, r), e.setAttribute("data-product-img", ""));
    o.portion > 0 ? (e.setAttribute("data-product-unit", o.unit), e.setAttribute("data-product-portion", o.portion), e.setAttribute("data-product-single", o.single)) : (e.removeAttribute("data-product-unit"), e.removeAttribute("data-product-portion"), e.removeAttribute("data-product-single"))
}

function t_store_product_updateEdition_moveSlider(t, e, r) {
    var o = 1; - 1 !== r.img.indexOf("&amp;") && (r.img = r.img.replace("&amp;", "&"));
    var i = e.querySelector(".t-slds__items-wrapper"),
        s = e.querySelector('.t-slds__item .t-slds__bgimg[data-original="' + r.img + '"]'),
        a = e.querySelector('.t-slds__item .t-slds__bgimg[data-original="' + (r.img || "").replace("static.tildacdn.com", "static.tildacdn.info") + '"]');
    !s && a && (s = a), s && r.img && (o = s.closest(".t-slds__item").getAttribute("data-slide-index"), 0 === parseInt(o, 10) && (o = i.getAttribute("data-slider-totalslides"))), i && i.setAttribute("data-slider-pos", o), t_store_onFuncLoad("t_slideMoveInstantly", (function() {
        t_slideMoveInstantly(t + " .js-store-product")
    }))
}

function t_store_product_triggerSoldOutMsg(t, e, r) {
    t_store__removeElement(t.querySelector(".js-store-prod-sold-out"));
    var o = t.querySelectorAll('.t-store__card__btns-wrapper [href="#order"], .t-store__prod-popup__btn-wrapper [href="#order"]');
    0 === o.length && (o = t.querySelectorAll('[href="#order"]')), window.jQuery && t instanceof jQuery && (t = $(t).get(0));
    var i = r.prodCard && "order" === r.prodCard.btnLink1,
        s = r.prodCard && "order" === r.prodCard.btnLink2;
    if (o[0]) {
        var a = o[0].querySelector(".js-store-prod-popup-buy-btn-txt");
        "small" === t.getAttribute("data-card-size") && (a = o[0].querySelector(".t-store__card__btn-text")), a || (a = o[0].querySelector(".js-store-prod-buy-btn-txt"))
    }
    if (e) o.length || t.querySelector(".js-store-price-wrapper").insertAdjacentHTML("beforeend", '<div class="js-store-prod-sold-out t-store__card__sold-out-msg t-name t-name_xs">' + window.tStoreDict.soldOut + "</div>"), Array.prototype.forEach.call(o, (function(t) {
        t.classList.add("t-store__prod-popup__btn_disabled")
    })), a && (a.textContent = window.tStoreDict.soldOut);
    else {
        Array.prototype.forEach.call(o, (function(t) {
            t.classList.remove("t-store__prod-popup__btn_disabled")
        }));
        var n = r.buyBtnTitle || r.popup_opts && r.popup_opts.btnTitle || window.tStoreDict.addtocart;
        "small" === t.getAttribute("data-card-size") && (i && r.prodCard.btnTitle1 && (n = r.prodCard.btnTitle1), s && r.prodCard.btnTitle2 && (n = r.prodCard.btnTitle2)), a && (a.textContent = n)
    }
}

function t_store_product_addOneOptionsControl(t, e, r, o, i, s) {
    if (e.name) {
        var a, n, d, c = "",
            l;
        if ("modificator" === t) {
            if (void 0 === e.values) return;
            n = '<option value="[[value]]" data-product-variant-price="[[price]]">[[text]]</option>';
            var _ = e.values.split("\n");
            Array.prototype.forEach.call(_, (function(t) {
                var e = t.split("=")[0],
                    r = t.split("=")[1];
                c += n.replace(/\[\[value\]\]/g, t_store_escapeQuote(e).replace(/&amp;/g, "&amp;amp;")).replace(/\[\[text\]\]/g, t_store_escapeQuote(e)).replace(/\[\[price\]\]/g, r || "")
            })), a = (d = t_store_get_control_option_html(o)).replace(/\[\[name\]\]/g, e.name).replace(/\[\[optiontags\]\]/g, c)
        } else n = '<option value="[[value]]">[[text]]</option>', Array.prototype.forEach.call(e.values, (function(t) {
            "" !== t && (c += n.replace(/\[\[value\]\]/g, t_store_escapeQuote(t).replace(/&amp;/g, "&amp;amp;")).replace(/\[\[text\]\]/g, t_store_escapeQuote(t)))
        })), "" !== c && (a = (d = t_store_get_control_editionOption_html(o, e)).replace(/\[\[id\]\]/g, e.id.replace(/&amp;/g, "&amp;amp;")).replace(/\[\[name\]\]/g, e.name).replace(/\[\[optiontags\]\]/g, c));
        if (a && r.insertAdjacentHTML("beforeend", a), t_store_option_checkIfCustom(e) && t_store_option_styleCustomControl(s, o, e, r, i), "editionopt" === t) {
            var p = r.querySelectorAll(".js-product-edition-option"),
                u, g = p[p.length - 1];
            if (g) return g
        }
    }
}

function t_store_product_getEditionOptionsArr(t, e) {
    var r = t.editions,
        o = ["quantity", "price", "priceold", "gallery", "sku", "uid", "img", "externalid", "pack_x", "pack_y", "pack_z", "pack_m"],
        i = {},
        s = [];
    return r.forEach((function(t) {
        Object.keys(t).forEach((function(t) {
            -1 !== o.indexOf(t) || i[t] || (i[t] = !0)
        })), Object.keys(i).length
    })), Object.keys(i).forEach((function(o) {
        var i = {
            name: o,
            id: t_store_combineOptionIdByName(o),
            params: t_store_product_getEditionOptionsArr_getParams(o, t, e),
            values: t_store_product_getEditionOptionsArr_getValues(o, r),
            imagesObj: t_store_product_getEditionOptionsArr_getImgValues(o, r),
            valuesObj: e && e[o] ? e[o].values : {}
        };
        s.push(i)
    })), s
}

function t_store_product_getFirstAvailableEditionData(t) {
    for (var e = 0; e < t.length; e++) {
        var r = t[e];
        if (0 !== parseInt(r.quantity, 10)) return r
    }
    return t[0]
}

function t_store_product_getFirstAvailableEditionData_forCertainVals(t, e, r, o) {
    for (var i = "", s = 0; s < t.length; s++) {
        for (var a = t[s], n = !0, d = 0; d < e.length; d++) {
            var c = e[d].name,
                l, _ = t_store_product_getCurEditionOptValById(r, e[d].id);
            if (o && d === e.length - 1 && (_ = o), a[c] !== _) {
                n = !1;
                break
            }
        }
        if (n) {
            if (0 !== parseInt(a.quantity, 10)) return a;
            i || (i = a)
        }
    }
    return i
}

function t_store_product_getEditionOptionsArr_getValues(t, e) {
    var r = [];
    return e.forEach((function(e) {
        var o = e[t];
        void 0 !== o && -1 === r.indexOf(o) && r.push(o)
    })), r = t_store_product_sortValues(r)
}

function t_store_product_sortValuesByOrder(t, e, r) {
    return t.sort((function(t, o) {
        var i = "filter" === e ? t.value : t,
            s = "filter" === e ? o.value : o;
        return i = i.toString().toUpperCase(), s = s.toString().toUpperCase(), r.indexOf(i) - r.indexOf(s)
    }))
}

function t_store_product_isSimpleOrderValid(t, e) {
    return t.every((function(t) {
        return "object" == typeof t && "string" == typeof t.value && (t = t.value), "string" == typeof t && (t = t.trim().toUpperCase(), e.indexOf(t) >= 0)
    }))
}

function t_store_product_isDateOrderValid(t) {
    var e = /(\d{2})\.(\d{2})\.(\d{4})/;
    return t.every((function(t) {
        return "object" == typeof t && "string" == typeof t.value && (t = t.value), "string" == typeof t && (t = t.trim().toUpperCase()).match(e)
    }))
}

function t_store_product_sortValues(t, e, r) {
    var o = t || [];
    if (t.length < 2) return o;
    var i = "filter" === e ? t[0].value.toString() : t[0].toString(),
        s = "filter" === e ? t[1].value.toString() : t[1].toString(),
        a = ["XXXS", "3XS", "XXS", "2XS", "XS", "S", "M", "L", "XL", "XXL", "2XL", "XXXL", "3XL", "XXXXL", "BXL", "4XL", "BXXL", "5XL", "BXXXL", "6XL", "ONE SIZE", "???????? ????????????", "??????????????????????????"],
        n = ["??????????????????????", "MONDAY", "??????????????", "TUESDAY", "??????????", "WEDNESDAY", "??????????????", "THURSDAY", "??????????????", "FRIDAY", "??????????????", "SATURDAY", "??????????????????????", "SUNDAY"],
        d = ["????????????", "??????????????", "????????", "????????????", "??????", "????????", "????????", "????????????", "????????????????", "??????????????", "????????????", "??????????????", "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
        c, l, _, p, u, g, m = {
            watt: ["????", "W", "????????", "daW", "??????", "hW", "??????", "kW", "??????", "mW", "??????", "GW", "??????", "TW", "??????", "PW"],
            bytes: ["??", "B", "????", "??????????", "KiB", "KB", "??????????", "????", "MiB", "MB", "Mb", "??????????", "????", "GiB", "GB", "Gb", "??????????", "????", "TiB", "TB"],
            weight: ["??????", "mcg", "????", "mg", "??", "g", "????", "kg", "??", "t", "??"],
            length: ["??????", "????", "mm", "????", "dm", "????", "cm", "??", "m", "????", "km"],
            litre: ["????", "??"],
            largeNums: ["??????", "??????", "????????"]
        },
        v = r || t,
        y = /(\d{2})\.(\d{2})\.(\d{4})/;
    if (t_store_product_isSimpleOrderValid(v, a)) o = t_store_product_sortValuesByOrder(o, e, a);
    else if (t_store_product_isSimpleOrderValid(v, n)) o = t_store_product_sortValuesByOrder(o, e, n);
    else if (t_store_product_isSimpleOrderValid(v, d)) o = t_store_product_sortValuesByOrder(o, e, d);
    else if (t_store_product_isDateOrderValid(v)) o = t.sort((function(t, r) {
        var o = "filter" === e ? t.value : t,
            i = "filter" === e ? r.value : r;
        return o = new Date(o.toString().replace(y, "$2/$1/$3").trim()), i = new Date(i.toString().replace(y, "$2/$1/$3").trim()), isNaN(o) || isNaN(i) ? 0 : o - i
    }));
    else {
        try {
            o = t.sort((function(t, r) {
                var o = "filter" === e ? t.value : t,
                    i = "filter" === e ? r.value : r;
                if (o = o.toString().replace(/^(????|from)\s+/i, ""), i = i.toString().replace(/^(????|from)\s+/i, ""), o = parseFloat(o.toString().replace(",", ".").trim()), i = parseFloat(i.toString().replace(",", ".").trim()), isNaN(o) || isNaN(i)) return 0;
                if (o === i) {
                    var s = "filter" === e ? t.value : t,
                        a = "filter" === e ? r.value : r;
                    s = s.toString().replace(/^(????|from)\s+/i, "").replace(",", ".").trim(), a = a.toString().replace(/^(????|from)\s+/i, "").replace(",", ".").trim();
                    var n = /(\d+)\s?(x|??|??)\s?(\d+)/gi,
                        d = s.match(n),
                        c = a.match(n);
                    return d && c && (s = d[2], a = c[2]), s > a ? 1 : a > s ? -1 : 0
                }
                return o - i
            }))
        } catch (t) {
            console.log(t)
        }
        try {
            for (var f in m) {
                var t, h = t_store_product_hasMeasureUnit(t = m[f], i) && t_store_product_hasMeasureUnit(t, s),
                    w = new RegExp(/^\d*,?\.?\d+\s*/, "gi");
                if (h) return o = o.sort((function(r, o) {
                    var i = "filter" === e ? r.value : r,
                        s = "filter" === e ? o.value : o;
                    return i = i.toString().replace(w, "").trim(), s = s.toString().replace(w, "").trim(), t.indexOf(i) - t.indexOf(s)
                }))
            }
        } catch (t) {
            console.log(t)
        }
    }
    return o
}

function t_store_product_hasMeasureUnit(t, e) {
    return e = e.replace(/\s/g, ""), t.some((function(t) {
        var r, o;
        return new RegExp("^[\\d.,]+(" + t + "){1}$", "i").test(e)
    }))
}

function t_store_product_getEditionOptionsArr_getParams(t, e, r) {
    var o = {};
    if (r) o = r[t] ? r[t].params : {};
    else try {
        var i = JSON.parse(e.json_options);
        i && i.forEach((function(e) {
            e.params && e.title && e.title === t && (o = e.params)
        }))
    } catch (t) {}
    return o
}

function t_store_product_getEditionOptionsArr_getImgValues(t, e) {
    var r = {};
    return e.forEach((function(e) {
        var o = e[t];
        r[o] || (r[o] = e.img)
    })), r
}

function t_store_product_getCurEditionOptValById(t, e) {
    var r = t.querySelector('.js-product-edition-option[data-edition-option-id="' + e + '"]');
    return r ? r.querySelector(".js-product-edition-option-variants").value : ""
}

function t_store_product_getEditionSelectEl(t, e) {
    return t.querySelector('.js-product-edition-option[data-edition-option-id="' + e.id + '"]')
}

function t_store_combineOptionIdByName(t) {
    return t.replace(/[/\\'"<>{}]/g, "")
}

function t_store_getProductFirstImg(t) {
    if (t.gallery && "[" === t.gallery[0]) {
        var e = JSON.parse(t.gallery);
        if (e[0] && e[0].img) return e[0].img
    }
    return ""
}

function t_store__getFormattedPrice(t, e) {
    if (null == e || 0 === e || "" === e) return "";
    e = (e = t_store__cleanPrice(e)).toString();
    var r = !1,
        o = !1,
        i;
    (t.currencyDecimal ? r = "00" === t.currencyDecimal : void 0 !== window.tcart && void 0 !== window.tcart.currency_dec && (r = "00" === window.tcart.currency_dec), t.currencySeparator ? o = "." === t.currencySeparator : void 0 !== window.tcart && void 0 !== window.tcart.currency_sep && (o = "." === window.tcart.currency_sep), r) && (-1 === e.indexOf(".") && -1 === e.indexOf(",") ? e += ".00" : 1 === e.substring(e.indexOf(".") + 1).length && (e += "0"));
    return e = (e = o ? e.replace(",", ".") : e.replace(".", ",")).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

function t_store__getFormattedMinPrice(t, e) {
    var r = e.minPrice;
    return null != r && (r = t_store__getFormattedPrice(t, r)), r
}

function t_store__getFormattedPriceRange(t, e) {
    if (!Object.prototype.hasOwnProperty.call(t, "prodCard") || t.prodCard.showOpts || !t.price.priceRange || "" === t.price.priceRange || !Object.prototype.hasOwnProperty.call(e, "minPrice") || !Object.prototype.hasOwnProperty.call(e, "maxPrice")) return null;
    var r = e.minPrice,
        o = e.maxPrice;
    if (null === r || null === o || r === o) return null;
    r = t_store__getFormattedPrice(t, r), o = t_store__getFormattedPrice(t, o);
    var i = t.price.priceRange;
    return "range" === i ? r + "???" + o : "from" === i ? window.tStoreDict.from + " " + r : void 0
}

function t_store_loadMoreBtn_display(t) {
    var e = document.getElementById("rec" + t);
    if (e) {
        var r = e.querySelector(".t-store__load-more-btn-wrap"),
            o = !!(window.innerWidth < 960 && e.querySelector(".js-store-grid-cont.t-store__grid-cont_mobile-one-row"));
        !o && r && r.classList.contains("t-store__load-more-btn-wrap_hidden") ? r.classList.remove("t-store__load-more-btn-wrap_hidden") : o && r && !r.classList.contains("t-store__load-more-btn-wrap_hidden") && r.classList.add("t-store__load-more-btn-wrap_hidden")
    }
}

function t_store_oneProduct_init(t, e) {
    var r = document.querySelector("#rec" + t + " .js-store-product_single");
    if (r) {
        var o = r.getAttribute("data-product-gen-uid");
        o = t_store_oneProduct_clearUid(o), r.setAttribute("data-product-gen-uid", o), window.tStoreIsSearchBot || t_store_oneProduct_preloader_add(t);
        var i = document.getElementById("allrecords").getAttribute("data-tilda-mode");
        e.isPublishedPage = "edit" !== i && "preview" !== i;
        var s = window.tStoreSingleProdsObj && !e.previewmode;
        !window.tStoreSingleProductsIsRequested || s ? (t_store_oneProduct_requestAllSingle(e), window.tStoreSingleProductsIsRequested = !0, r.addEventListener("tStoreSingleProductsLoaded", (function() {
            t_store_oneProduct_fill(t, window.tStoreSingleProdsObj[o], e)
        }))) : window.tStoreSingleProdsObj ? t_store_oneProduct_fill(t, window.tStoreSingleProdsObj[o], e) : r.addEventListener("tStoreSingleProductsLoaded", (function() {
            t_store_oneProduct_fill(t, window.tStoreSingleProdsObj[o], e)
        }))
    }
}

function t_store_oneProduct_clearUid(t) {
    return t.replace("product id: ", "")
}

function t_store_oneProduct_preloader_add(t) {
    var e = document.getElementById("rec" + t),
        r = e.querySelector(".js-store-product_single"),
        o = r.querySelector(".js-store-single-product-info");
    o.style.display = "none", clearTimeout(e.getAttribute("data-preloader-timeout"));
    var i = setTimeout((function() {
        var t = "";
        t += '<div class="t-store__single-prod-preloader" style="display:none;">';
        for (var e = '<div class="t-store__single-prod-preloader__text"></div>', i = 0; i < 6; i++) t += e;
        t += "</div>", o.insertAdjacentHTML("beforebegin", t), t_store__fadeIn(r.querySelector(".t-store__single-prod-preloader"))
    }), 1e3);
    e.setAttribute("data-preloader-timeout", i)
}

function t_store_oneProduct_preloader_hide(t) {
    var e = document.getElementById("rec" + t),
        r = e.querySelector(".js-store-product_single");
    clearTimeout(e.getAttribute("data-preloader-timeout"));
    var o = r.querySelector(".js-store-single-product-info");
    o && (o.style.display = ""), t_store__removeElement(r.querySelector(".t-store__single-prod-preloader"))
}

function t_store_oneProduct_requestAllSingle(t) {
    var e = document.querySelectorAll(".js-store-product_single"),
        r = [];
    Array.prototype.forEach.call(e, (function(t) {
        var e = t.getAttribute("data-product-gen-uid");
        e = t_store_oneProduct_clearUid(e), r.push(e)
    }));
    var o = function(t) {
        var r = t.products;
        "" !== r ? (t.options && t.options.length && !window.tStoreOptionsList && (window.tStoreOptionsList = t.options), window.tStoreSingleProdsObj = t_store_oneProduct_prodsArrToAssociative(r), Array.prototype.forEach.call(e, (function(t) {
            t_store__triggerEvent(t, "tStoreSingleProductsLoaded")
        }))) : console.log("Something went wrong. Can't get products array by uid list. Please check products UID.")
    };
    t_store_loadProducts_byId(r, t, o, (function(e) {
        t_store_changeEndpoint(e, (function() {
            t_store_loadProducts_byId(r, t, o)
        }))
    }))
}

function t_store_oneProduct_prodsArrToAssociative(t) {
    var e = {};
    if (!t) return e;
    for (var r = 0; r < t.length; r++) {
        var o = t[r];
        e[o.uid] = o
    }
    return e
}

function t_store_oneProduct_fill(t, e, r) {
    var o, i = document.getElementById("rec" + t).querySelector(".js-product");
    if (t_store_oneProduct_preloader_hide(t), i.setAttribute("data-card-size", "large"), !e) return t_store_oneProduct_error_show(t, r), t_store_product_triggerSoldOutMsg(i, !0, r), void("" === i.querySelector(".js-store-prod-price-old-val").textContent && (i.querySelector(".js-store-prod-price-old").style.display = "none"));
    t_store_oneProduct_successMsg_show(t, e, r), i.setAttribute("data-product-pack-label", e.pack_label), i.setAttribute("data-product-pack-m", e.pack_m), i.setAttribute("data-product-pack-x", e.pack_x), i.setAttribute("data-product-pack-y", e.pack_y), i.setAttribute("data-product-pack-z", e.pack_z), i.setAttribute("data-product-url", e.url || ""), t_store_addProductOptions(t, e, i, r, "largecard"), t_store_snippet_chooseEditionFromUrl(t, e, i, r), t_store_onFuncLoad("t_prod__init", (function() {
        t_prod__init(t)
    }));
    var s = i.querySelector(".js-store-prod-sku");
    if (s && "none" !== s.style.display) {
        var a = s.parentNode;
        a && a.classList.contains("t-descr") && s.insertAdjacentHTML("beforebegin", window.tStoreDict.sku + ": ")
    }
    t_store_option_handleOnChange(i), t_store_option_handleOnChange_custom(t, i, r)
}

function t_store_oneProduct_successMsg_show(t, e, r) {
    if (!r.previewmode) {
        var o = document.getElementById("rec" + t),
            i = "RU" === window.tStoreBrowserLang ? "?????????? ?????????????? ???????????? ?? ??????????????????. ???????????????? ???????????? ?? ????????????????: " : "Product is connected to catalog. Product name in catalog is ";
        t_store_showMsgInRedactor(o, i += "<b>" + e.title + "</b>", "success")
    }
}

function t_store_oneProduct_error_show(t, e) {
    var r, o;
    e.previewmode || t_store_showMsgInRedactor(document.getElementById("rec" + t), "RU" === window.tStoreBrowserLang ? "???? ?????????????? ???????????????? ?????????? ???? ????????????????. ???????????????? ???? ?????? ???????????? ?????? ????????????????. ????????????????????, ??????????????????, ?????? ?????????? ?? ?????????? ID ????????????????????." : "Can't find a product in the catalog. It may have been deleted or disabled. Please check that the product with this ID exists.", "error")
}

function t_store_showMsgInRedactor(t, e, r) {
    var o;
    t_store__removeElement(t.querySelector(".js-store-msg"));
    var i, s = "success" === r ? "#62C584" : "yellow",
        a = "";
    a += '<div class="js-store-msg" style="margin: 0;text-align: left; font-family: tfutura,Arial,sans-serif; color: ' + ("success" === r ? "#fff" : "#000") + ';">', a += '   <div style="background: ' + s + '; padding: 16px 20px; box-sizing: border-box; margin-bottom: 30px; position: relative;" class="t-container">', a += '       <div style="width: 40px; height: 40px; position: absolute; left: 20px; bottom: -40px;">', a += '       <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="40px" width="40px"><polygon fill="' + s + '" stroke="' + s + '" stroke-width="0" points="0,0 40,0 0,20 0,0"></polygon></svg>', a += "       </div>", a += e, a += "   </div>", a += "</div>", t.insertAdjacentHTML("afterbegin", a)
}

function t_store_isQueryInAddressBar(t) {
    var e;
    try {
        e = decodeURI(window.location.href)
    } catch (t) {
        e = window.location.href
    }
    return !!e && -1 !== e.indexOf(t)
}

function t_store_getColumnWidth(t) {
    var e, r, o;
    return {
        minWidth1200: {
            col_1: 60,
            col_2: 160,
            col_3: 260,
            col_4: 360,
            col_5: 460,
            col_6: 560,
            col_7: 660,
            col_8: 760,
            col_9: 860,
            col_10: 960,
            col_11: 1060,
            col_12: 1160
        },
        maxWidth1200: {
            col_1: 60,
            col_2: 140,
            col_3: 220,
            col_4: 300,
            col_5: 380,
            col_6: 460,
            col_7: 540,
            col_8: 620,
            col_9: 700,
            col_10: 780,
            col_11: 860,
            col_12: 940
        }
    } [(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 1200 ? "minWidth1200" : "maxWidth1200"]["col_" + t]
}

function t_store_option_getOptionsData() {
    var t = window.tStoreOptionsList;
    if (!t) return null;
    for (var e = {}, r = 0; r < t.length; r++) {
        var o = t[r],
            i = o.title;
        o.params && "string" == typeof o.params && (o.params = JSON.parse(o.params)), o.values && "string" == typeof o.values && (o.values = JSON.parse(o.values)), e[i] = o
    }
    return e
}

function t_store_option_checkIfCustom(t) {
    var e = t.params;
    return !(!e || Array.isArray(e)) && (!(!e.view || "select" === e.view) || !(!e.hasColor && !e.linkImage))
}

function t_store_option_handleOnChange_custom(t, e, r) {
    var o = function() {
        var e = this.closest(".js-product-edition-option"),
            o = e.querySelector(".t-product__option-variants_custom");
        if (e && o) {
            var i = this.value,
                s = o.querySelector(".t-product__option-item_active");
            if (s) {
                var a = s.querySelector(".t-product__option-input");
                if (a.value !== i) {
                    a.checked = !1, i = (i || "").replace(/"/g, '\\"');
                    var n = o.querySelector('.t-product__option-input[value="' + i + '"]');
                    setTimeout((function() {
                        n.click(), n.checked = !0
                    })), s.classList.remove("t-product__option-item_active"), n.parentNode.classList.add("t-product__option-item_active"), setTimeout((function() {
                        t_store_unifyCardsHeights(t, r), r.verticalAlignButtons && t_store_verticalAlignButtons(t, r), t_store__triggerEvent(document.body, "twishlist_addbtn")
                    }), 50)
                }
            }
        } else setTimeout((function() {
            t_store__triggerEvent(document.body, "twishlist_addbtn")
        }), 50)
    };
    Array.prototype.forEach.call(e.querySelectorAll(".js-product-edition-option-variants"), (function(t) {
        var e, r;
        t.removeEventListener("change", o), t.closest(".js-product-edition-option").querySelector(".t-product__option-variants_custom") && t.addEventListener("change", o)
    })), Array.prototype.forEach.call(e.querySelectorAll(".t-product__option-variants_custom"), (function(e) {
        var o = e.querySelectorAll(".t-product__option-input"),
            i = e.querySelectorAll(".t-product__option-item"),
            s = e.parentNode.querySelector(".t-product__option-variants_regular .js-product-edition-option-variants");
        Array.prototype.forEach.call(o, (function(e) {
            e.addEventListener("change", (function() {
                var e = this.value;
                e = e.replace(/&/g, "&amp;"), s.value = e, Array.prototype.forEach.call(i, (function(t) {
                    t.classList.remove("t-product__option-item_active")
                })), this.parentNode.classList.add("t-product__option-item_active"), setTimeout((function() {
                    t_store_unifyCardsHeights(t, r), r.verticalAlignButtons && t_store_verticalAlignButtons(t, r)
                }), 50)
            }))
        }))
    })), Array.prototype.forEach.call(e.querySelectorAll(".t-product__option-selected_select"), (function(t) {
        var e = function() {
            this.nextElementSibling.classList.contains("t-product__option-variants_custom") && this.nextElementSibling.classList.toggle("t-product__option-variants_hidden"), "y" === window.lazy && t_lazyload_update()
        };
        t.removeEventListener("click", e), t.addEventListener("click", e);
        var r, o = t.parentNode.querySelector(".t-product__option-variants_custom").querySelectorAll(".t-product__option-item"),
            i = function() {
                Array.prototype.forEach.call(o, (function(t) {
                    t.classList.remove("t-product__option-item_active")
                })), this.classList.add("t-product__option-item_active"), this.closest(".t-product__option-variants_custom").classList.add("t-product__option-variants_hidden");
                var t = this.querySelector(".t-product__option-title").textContent,
                    e;
                this.closest(".t-product__option").querySelector(".t-product__option-selected-title").textContent = t;
                var r = this.closest(".t-product__option").querySelector(".t-product__option-selected.t-product__option-selected_color");
                if (r) {
                    var i = this.querySelector(".t-product__option-checkmark_color").style.backgroundColor,
                        s;
                    (s = r.querySelector(".t-product__option-selected-checkmark")).style.backgroundColor = i
                }
                var a = this.closest(".t-product__option").querySelector(".t-product__option-selected.t-product__option-selected_image");
                if (a) {
                    var n = this.querySelector(".t-product__option-checkmark_image").style.backgroundImage,
                        d = this.querySelector(".t-product__option-checkmark_image").getAttribute("data-original"),
                        s;
                    (s = a.querySelector(".t-product__option-selected-checkmark")).setAttribute("data-original", d), s.style.backgroundImage = "none", s.style.backgroundImage = n
                }
            };
        Array.prototype.forEach.call(o, (function(t) {
            t.removeEventListener("click", i), t.addEventListener("click", i)
        }));
        var s = function(t) {
            var e = t.target,
                r = e.closest(".t-product__option-variants_custom");
            r && r !== e && r.contains(e) || e.classList.contains("t-product__option-selected") || e.closest(".t-product__option-selected") || Array.prototype.forEach.call(document.querySelectorAll(".t-product__option-variants_custom.t-product__option-variants_select"), (function(t) {
                t.classList.add("t-product__option-variants_hidden")
            }))
        };
        Array.prototype.forEach.call(["click", "outsideCustomDropdown"], (function(t) {
            document.removeEventListener(t, s), document.addEventListener(t, s)
        }))
    }))
}

function t_store_option_handleOnChange(t) {
    var e = function() {
        var t = this.closest(".js-product-edition-option");
        t && t_store__triggerEvent(t, "change")
    };
    Array.prototype.forEach.call(t.querySelectorAll(".js-product-edition-option-variants"), (function(t) {
        t.removeEventListener("change", e), t.addEventListener("change", e)
    }))
}

function t_store_unescapeHtml(t) {
    var e = document.createElement("textarea");
    return e.innerHTML = t, e.value
}

function t_store_onFuncLoad(t, e, r) {
    if ("function" == typeof window[t]) e();
    else {
        var o = Date.now(),
            i = new Error(t + " is undefined"),
            s = function() {
                throw i
            };
        setTimeout((function i() {
            var a = Date.now();
            "function" != typeof window[t] ? ("complete" === document.readyState && a - o > 5e3 && "function" != typeof window[t] && s(), setTimeout(i, r || 100)) : e()
        }))
    }
}

function t_store_hexToRgb(t) {
    var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    t = t.replace(e, (function(t, e, r, o) {
        return e + e + r + r + o + o
    }));
    var r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t),
        o = r ? {
            r: parseInt(r[1], 16),
            g: parseInt(r[2], 16),
            b: parseInt(r[3], 16)
        } : null;
    return r ? [o.r, o.g, o.b] : null
}

function t_store_luma_rgb(t) {
    var e = Array.isArray(t);
    if (void 0 === t) return "black";
    if (0 !== t.indexOf("rgb") && !e) return "black";
    var r = e ? t : t.split("(")[1].split(")")[0].split(",");
    return r.length < 3 ? "black" : .2126 * r[0] + .7152 * r[1] + .0722 * r[2] > 128 ? "black" : "white"
}

function t_store_getLightnessColor(t) {
    var e, r, o;
    if (-1 === t.indexOf("rgb")) {
        var i = parseInt(t.indexOf("#") > -1 ? t.substring(1) : t, 16);
        e = {
            r: i >> 16,
            g: (65280 & i) >> 8,
            b: 255 & i
        }
    } else {
        var s, a = t.replace(/[^\d,.]/g, "").split(",");
        e = {
            r: a[0],
            g: a[1],
            b: a[2]
        }
    }
    return e.r /= 255, e.g /= 255, e.b /= 255, (Math.max(e.r, e.g, e.b) + Math.min(e.r, e.g, e.b)) / 2
}

function t_store_removeRgbOpacity(t) {
    if (!t || !t.length) return null;
    var e = t.split(",");
    return e[3] && (e[3] = "1)"), e.join()
}

function t_store_snippet_getJsonFromUrl() {
    var t, e = window.location.search.substring(1),
        r = {};
    return e.split("&").forEach((function(t) {
        var e = t.split("=");
        try {
            r[e[0]] = decodeURIComponent(e[1])
        } catch (t) {
            r[e[0]] = e[1]
        }
    })), r
}

function t_store__cleanPrice(t) {
    return t ? (t = (t = t.toString()).replace(",", ".").replace(/[^0-9.]/g, ""), t = parseFloat(t).toFixed(2), isNaN(t) && (t = 0), t = parseFloat(t), (t *= 1) < 0 && (t = 0)) : t = 0, t
}

function t_store__removeElement(t) {
    t && t.parentNode && t.parentNode.removeChild(t)
}

function t_store__fadeIn(t, e) {
    if (("1" === getComputedStyle(t).opacity || "" === getComputedStyle(t).opacity) && "none" !== getComputedStyle(t).display) return !1;
    var r = 0;
    e || (e = 200);
    var o = (e = parseInt(e)) > 0 ? e / 10 : 40;
    t.style.opacity = r, t.style.display = "block";
    var i = setInterval((function() {
        t.style.opacity = r, (r += .1) >= 1 && clearInterval(i)
    }), o)
}

function t_store__serializeData(t, e) {
    var r = [];
    for (var o in t)
        if (Object.prototype.hasOwnProperty.call(t, o)) {
            var i = e ? e + "[" + o + "]" : o,
                s = t[o];
            "{}" !== JSON.stringify(s) && r.push(null !== s && "object" == typeof s ? t_store__serializeData(s, i) : encodeURIComponent(i) + "=" + encodeURIComponent(s))
        } return r.join("&")
}

function t_store_changeEndpoint(t, e) {
    var r = "";
    t && (t.status >= 500 || 408 == t.status || 410 == t.status || 429 == t.status || "timeout" === t.type) && -1 !== window.t_store_endpoint.indexOf("store.tildacdn.com") ? (window.t_store_endpoint = "store2.tildacdn.com", "function" == typeof e && e()) : (r = t && t.responseText > "" ? "[" + t.status + "] " + t.responseText : t && t.statusText ? "Error [" + t.status + ", " + t.statusText + "]" : "Error type [" + t.type + "]", console.log(r + ". Please, try again later."))
}

function t_store__triggerEvent(t, e) {
    var r;
    document.createEvent ? (r = document.createEvent("HTMLEvents")).initEvent(e, !0, !1) : document.createEventObject && ((r = document.createEventObject()).eventType = e), r.eventName = e, t.dispatchEvent ? t.dispatchEvent(r) : t.fireEvent ? t.fireEvent("on" + r.eventType, r) : t[e] ? t[e]() : t["on" + e] && t["on" + e]()
}

function t_store_paramsToObj(t, e) {
    var r;
    try {
        r = decodeURI(window.location.search)
    } catch (t) {
        r = window.location.search
    }
    var o = {
        otherParams: []
    };
    o[t] = {};
    try {
        r = r.replace(/&amp;/g, "%26amp")
    } catch (t) {
        console.log(t)
    }
    var i = r.slice(1).split("&"),
        s;
    (i = i.map((function(t) {
        return t.replace(/%26amp/g, "&amp;")
    })), o.otherParams = i.filter((function(t) {
        var e;
        return !(/^tfc_/i.test(t) || /^s_/i.test(t)) && t
    })), -1 !== window.location.href.indexOf("s_recid=")) ? window.location.href.split("s_recid=")[1].split("&")[0] === t && i.splice(1).forEach((function(e) {
        try {
            var r = /^s_/i.test(e),
                i;
            if (!document.querySelector("#rec" + t)) return;
            if (o[t] || (o[t] = {}), r) {
                var s = (e = (e = e.replace(/^s_/i, "tfc_")).replace(/%3A/gi, ":")).split("="),
                    a = s[0],
                    n = s[1].replace(/\+/g, " ").split(":::"),
                    d = a.replace(/^tfc_/i, "");
                o[t][d] = o[t][d] ? o[t][d].concat(n) : n
            }
        } catch (t) {
            console.log(t)
        }
    })): -1 !== window.location.href.indexOf("tfc_") && i.forEach((function(t) {
        var e = t.split("=");
        try {
            var r;
            if (/^tfc_/i.test(t) && "tfc_div" !== e[0]) {
                var i = e[0],
                    s;
                s = -1 !== window.location.href.indexOf("tfc_div") ? e[1].replace(/\+/g, " ").replace(/%2B/g, "+").split(":::") : e[1].replace(/\+/g, " ").split("%2B");
                var a = new RegExp(/\[\d.*\]$/, "gi"),
                    n = i.match(a),
                    d = n ? Number(JSON.parse(n[0])) : null,
                    c;
                if (!d) return void console.error("Can't find recid in URL param");
                if (!document.querySelector("#rec" + d)) return;
                var l = i.replace(a, "").replace("tfc_", "");
                o[d] || (o[d] = {}), o[d][l] = o[d][l] ? o[d][l].concat(s) : s
            }
        } catch (t) {
            console.log(t)
        }
    }));
    window.tStoreCustomUrlParams = o, t_store_paramsToObj_updateUrl(o);
    var a = t_store_paramsToObj_getDefaultSort(t, e.defaultSort);
    for (var n in a) {
        var d = a[n].sort,
            c = a[n].quantity;
        (d || c) && (o[n] && o[n].sort && e.previewmode || d && (o[n] || (o[n] = {}), o[n].sort = d), o[n] && o[n].quantity && "object" == typeof o[n].quantity && "y" === o[n].quantity.at(0) && e.previewmode || c && (o[n] || (o[n] = {}), o[t].quantity || (o[n].quantity = ["y"])))
    }
    return window.tStoreCustomUrlParams = o, o
}

function t_store_paramsToObj_updateUrl(t) {
    var e = t_store_customURLParamsToString(t);
    window.location.hash && (e += window.location.hash);
    try {
        window.history.replaceState(null, null, e)
    } catch (t) {}
}

function t_store_paramsToObj_getDefaultSort(t, e) {
    var r = window.tStoreDefaultSort ? window.tStoreDefaultSort : {};
    if (!e) return r;
    if (e.default) {
        var o = {
            "sort-price-asc": "price:asc",
            "sort-price-desc": "price:desc",
            "sort-name-asc": "title:asc",
            "sort-name-desc": "title:desc",
            "sort-created-asc": "created:asc",
            "sort-created-desc": "created:desc"
        };
        r[t] || (r[t] = {}), r[t].sort = new Array(o[e.default])
    }
    return e.in_stock && (r[t] || (r[t] = {}), r[t].quantity || (r[t].quantity = ["y"])), window.tStoreDefaultSort = r, r
}

function t_store_customURLParamsToString(t) {
    var e = "",
        r = "";
    for (var o in t) {
        var i = t[o];
        if ("otherParams" !== o)
            for (var s in i) try {
                var a = Array.isArray(i[s]) ? i[s].join("[[PLUS]]") : i[s].toString();
                a = (a = (a = (a = (a = (a = a.replace(/%/g, "%25")).replace(/#/g, "%23")).replace(/\+/g, "%2B")).replace(/\[\[PLUS\]\]/g, ":::")).replace(/%26amp/g, "&amp;")).replace(/\s/gi, "+"), e += e.length ? "&" : "?", e += "tfc_" + s + "[" + o + "]=" + a
            } catch (t) {
                console.log(t)
            }
    }
    return e && (e += "&tfc_div=:::"), t.otherParams && t.otherParams.length && (t.otherParams.forEach((function(t) {
        t.length && (r += "&" + t)
    })), e = e.length ? e + r : "?" + r.slice(1)), e.length ? e : window.location.origin + window.location.pathname
}

function t_store_updateOptionsBasedOnUrl(t, e, r) {
    try {
        var o = e[r];
        for (var i in t.filters = {}, o)
            if ("sort" !== i) {
                var s = -1 !== i.indexOf("price:m") || -1 !== i.indexOf("quantity");
                t.filters[i] = s ? o[i].toString() : o[i]
            } else {
                t.sort = {};
                var a = o[i].join().split(":"),
                    i = a[0],
                    n = a[1];
                t.sort[i] = n
            } return t
    } catch (t) {
        console.log("something wrong in t_store_updateOptionsBasedOnUrl", t)
    }
}

function t_store_snippet_chooseEditionFromUrl(t, e, r, o) {
    try {
        var i, s = t_store_snippet_getJsonFromUrl().editionuid;
        if (s && r.getAttribute("data-product-uid") !== s) {
            console.log("show product by uid from url = " + s);
            var a = "",
                n;
            if (e.editions.forEach((function(t) {
                    t.uid === s && (a = t)
                })), !a) return;
            t_store_product_updateEdition(t, r, a, e), t_store_product_triggerSoldOutMsg(r, 0 === parseInt(a.quantity), o)
        }
    } catch (t) {
        console.log("error decode url")
    }
}

function t_store_moveSearhSort(t, e) {
    var r = document.getElementById("rec" + t);
    if (r) {
        var o = r.querySelector(".t-store__filter__search-and-sort");
        if (window.innerWidth > 960 && o && "none" === window.getComputedStyle(o).display && (o.style.display = ""), e.sidebar) {
            var i = r.querySelector(".t-store__filter__controls-wrapper"),
                s = r.querySelector(".js-store-cont-w-filter");
            if (o) {
                var a = o.parentNode.classList.contains("js-store-cont-w-filter");
                window.innerWidth < 960 ? a && (t_store__removeElement(o), i.insertAdjacentHTML("beforeend", o)) : a || (t_store__removeElement(o), s.insertAdjacentHTML("afterbegin", o))
            }
        }
    }
}

function t_store_get_productCard_horizontalStructure(t, e, r, o, i, s) {
    var a = "";
    return (t.gallery[0] && "" !== t.gallery[0] || t.gallery[0] && "" !== t.gallery[0]) && r.prodCard.hasImg && (a += '<div class="t-store__card__imgwrapper_column"' + (r.imageWidth && "0" !== r.imageWidth ? ' style="width: ' + r.imageWidth + 'px;"' : "") + ">" + o.open + t_store_get_productCard_img_html(t, r) + o.close + "</div>"), a += '<div class="t-store__card__contentwrapper">' + t_store_get_horiozntalProductCard_txt_html(t, r, o, e, i, s) + t_store_get_horiozntalProductCard_priceAndButtons(t, r, e, i, s) + "</div>"
}

function t_store_get_horiozntalProductCard_txt_html(t, e, r, o) {
    var i = t.title;
    if (e.isTitleClip) var i = t.title.length > 50 ? t.title.slice(0, 50) + "..." : t.title;
    if (t.title) var s = '<div class="t-store__card__title t-name t-name_md js-product-name" data-auto-correct-font-size="rem" style="' + e.typo.title + '">' + i + "</div>";
    var a = "";
    t.descr && e.prodCard.hasDescr && (a = '<div class="t-store__card__descr t-descr t-descr_xxs" style="' + e.typo.descr + '">' + t.descr + "</div>");
    var n = "",
        d;
    return o.sku && (n = '<div class="js-store-prod-sku js-product-sku notranslate" translate="no" style="display:none;">' + t.sku + "</div>"), '<div class="t-store__card__textwrapper">' + r.open + s + r.close + a + n + '<div class="js-product-controls-wrapper t-store__card__prod-controls-wrapper" style="display:none;"></div></div>'
}

function t_store_get_horiozntalProductCard_priceAndButtons(t, e, r, o, i) {
    var s = parseInt(e.rightColumnWidth, 10),
        a = s ? 'style="width: ' + s + 'px;"' : "",
        n;
    return '<div class="t-store__card__price-buttons' + ("2" === e.prodCard.style ? " t-store__card__price-buttons_in-row" : "") + '"' + a + ">" + t_store_get_productCard_Price_html(t, r, e) + t_store_get_productCard_btn_html(t, e, o, i) + "</div>"
}

function t_store_getDictObj() {
    var t = {
        sku: {
            EN: "SKU",
            RU: "??????????????",
            FR: "UGS",
            DE: "SKU",
            ES: "SKU",
            PT: "SKU",
            UK: "?????? ????????????",
            JA: "????????????",
            ZH: "????????????",
            PL: "SKU",
            KK: "SKU",
            IT: "SKU",
            LV: "SKU"
        },
        soldOut: {
            EN: "Out of stock",
            RU: "?????? ?? ??????????????",
            FR: "En rupture de stock",
            DE: "Ausverkauft",
            ES: "Agotado",
            PT: "Fora de estoque",
            UK: "?????????? ?? ??????????????????",
            JA: "????????????",
            ZH: "??????",
            PL: "Nie ma na stanie",
            KK: "??????????????",
            IT: "Esaurito",
            LV: "Nav noliktav??"
        },
        all: {
            EN: "All",
            RU: "??????",
            FR: "Tout",
            DE: "Alles",
            ES: "Todos",
            PT: "Todos",
            UK: "??????",
            JA: "?????????",
            ZH: "??????",
            PL: "Wszystkie",
            KK: "????????????",
            IT: "Tutti",
            LV: "Visi"
        },
        from: {
            EN: "from",
            RU: "????",
            FR: "de",
            DE: "von",
            ES: "de",
            PT: "de",
            JA: "??????",
            ZH: "???",
            UK: "??????",
            PL: "od",
            KK: "????????????",
            IT: "da",
            LV: "no"
        },
        emptypartmsg: {
            EN: "Nothing found",
            RU: "???????????? ???? ??????????????",
            FR: "Rien trouv??",
            DE: "Nichts gefunden",
            ES: "Nada encontrado",
            PT: "Nada encontrado",
            UK: "???????????? ???? ????????????????",
            JA: "????????????????????????????????????",
            ZH: "??????????????????",
            PL: "Nic nie znaleziono",
            KK: "???????????? ??????????????????",
            IT: "Non abbiamo trovato nulla",
            LV: "Nekas nav atrasts"
        },
        seeotherproducts: {
            EN: "See other",
            RU: "???????????? ????????????",
            FR: "Autres produits",
            DE: "Andere produkte",
            ES: "Otros productos",
            PT: "Outros produtos",
            UK: "???????? ????????????",
            JA: "??????????????????",
            ZH: "????????????",
            PL: "Inne produkty",
            KK: "?????????? ??????????????",
            IT: "Vedi altri",
            LV: "Skatiet citas"
        },
        seeAlso: {
            EN: "See also",
            RU: "???????????????? ??????????",
            FR: "Voir ??galement",
            DE: "Siehe auch",
            ES: "Ver tambi??n",
            PT: "Veja tamb??m",
            UK: "???????????? ??????????",
            JA: "??????????????????",
            ZH: "???????????????",
            PL: "Patrz r??wnie??",
            KK: "????????????-????, ??????????????",
            IT: "Guarda anche",
            LV: "Skat??t ar??"
        },
        addtocart: {
            EN: "Buy now",
            RU: "????????????",
            FR: "Acheter",
            DE: "Zu kaufen",
            ES: "Para comprar",
            PT: "Comprar",
            UK: "????????????",
            JA: "????????????",
            ZH: "??????",
            PL: "Kup",
            KK: "?????????? ?????????? ????",
            IT: "Acquista ora",
            LV: "P??rc tagad"
        },
        loadmore: {
            EN: "Load more",
            RU: "?????????????????? ??????",
            FR: "Charger plus",
            DE: "Mehr laden",
            ES: "Carga m??s",
            PT: "Carregue mais",
            UK: "?????????????????????? ????",
            JA: "?????????????????????",
            ZH: "????????????",
            PL: "Poka?? wi??cej",
            KK: "Load ??????",
            IT: "Carica ancora",
            LV: "Iel??d??t vair??k"
        },
        PCE: {
            EN: "pc",
            RU: "????",
            UK: "????",
            KK: "????"
        },
        NMP: {
            EN: "pack",
            RU: "????",
            UK: "????",
            KK: "????"
        },
        MGM: {
            EN: "mg",
            RU: "????",
            UK: "????",
            KK: "????"
        }
    };
    t.g = t.GRM = {
        EN: "g",
        RU: "??",
        UK: "??",
        PL: "r",
        KK: "??"
    }, t.KGM = {
        EN: "kg",
        RU: "????",
        UK: "????",
        KK: "????"
    }, t.TNE = {
        EN: "t",
        RU: "??",
        UK: "??",
        KK: "??"
    }, t.MLT = {
        EN: "ml",
        RU: "????",
        UK: "????",
        KK: "????"
    }, t.LTR = {
        EN: "l",
        RU: "??",
        UK: "??",
        KK: "??"
    }, t.mm = t.MMT = {
        EN: "mm",
        RU: "????",
        UK: "????",
        KK: "????"
    }, t.CMT = {
        EN: "cm",
        RU: "????",
        UK: "????",
        KK: "????"
    }, t.DMT = {
        EN: "dm",
        RU: "????",
        UK: "????",
        KK: "????"
    }, t.MTR = {
        EN: "m",
        RU: "??",
        UK: "??",
        KK: "??"
    }, t.MTK = {
        EN: "m??",
        RU: "????",
        UK: "????",
        KK: "????"
    }, t.MTQ = {
        EN: "m??",
        RU: "????",
        UK: "????",
        KK: "????"
    }, t.LMT = {
        EN: "lm",
        RU: "??????. ??",
        UK: "??????. ??",
        KK: "??????. ??"
    }, t.HAR = {
        EN: "ha",
        RU: "????",
        UK: "????",
        KK: "????"
    }, t.ACR = {
        EN: "acre"
    }, t.YRD = {
        EN: "yd"
    }, t.LBR = {
        EN: "lb"
    }, t.ONZ = {
        EN: "oz"
    }, t.INH = {
        EN: "in"
    }, t.FOT = {
        EN: "ft"
    }, t["product-lwh"] = {
        EN: "LxWxH",
        RU: "??x??x??",
        DE: "LxBxH",
        ES: "PxLxK",
        UK: "??x??x??"
    }, t["product-wht"] = {
        EN: "WxHxT",
        RU: "??x??x??",
        FR: "LxHx??",
        DE: "BxHxD",
        ES: "LxKxP",
        PT: "LxAxE",
        UK: "??x??x??"
    }, t["product-whd"] = {
        EN: "WxHxD",
        RU: "??x??x??",
        FR: "LxHxP",
        DE: "BxHxT",
        ES: "LxKxS",
        PT: "LxAxP",
        UK: "??x??x??"
    }, t["product-weight"] = {
        EN: "Weight",
        RU: "??????",
        FR: "Poids",
        DE: "Gewicht",
        ES: "Kaal",
        PT: "Peso",
        UK: "????????",
        JA: "??????",
        ZH: "??????",
        PL: "Waga",
        KK: "????????????",
        IT: "Peso",
        LV: "Svars"
    };
    var e = window.tStoreBrowserLang;
    window.tStoreDict || (window.tStoreDict = {}), Object.keys(t).forEach((function(r) {
        window.tStoreDict[r] = t[r][e] ? t[r][e] : t[r].EN
    }))
}
window.tStoreIsSearchBot = /Bot/i.test(navigator.userAgent), window.tStoreIsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), window.tStoreBrowserLang = (window.navigator.userLanguage || window.navigator.language).toUpperCase().slice(0, 2), t_onReady((function() {
        var t = document.getElementById("allrecords");
        if (t) {
            var e = t.getAttribute("data-tilda-project-lang");
            e && (window.tStoreBrowserLang = e)
        }
        t_store_getDictObj(), t_store_fixImgs()
    })), Array.prototype.some || (Array.prototype.some = function(t) {
        "use strict";
        if (null === this) throw new TypeError("Array.prototype.some called on null or undefined");
        if ("function" != typeof t) throw new TypeError;
        for (var e = Object(this), r = e.length >>> 0, o = arguments.length >= 2 ? arguments[1] : void 0, i = 0; i < r; i++)
            if (i in e && t.call(o, e[i], i, e)) return !0;
        return !1
    }),
    function(t) {
        var e = t.matches || t.matchesSelector || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector;
        t.matches = t.matchesSelector = e || function t(e) {
            var t = document.querySelectorAll(e),
                r = this;
            return Array.prototype.some.call(t, (function(t) {
                return t === r
            }))
        }
    }(Element.prototype), Element.prototype.closest || (Element.prototype.closest = function(t) {
        for (var e = this; e && 1 === e.nodeType;) {
            if (Element.prototype.matches.call(e, t)) return e;
            e = e.parentElement || e.parentNode
        }
        return null
    }), String.prototype.trim || (String.prototype.trim = function() {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    });