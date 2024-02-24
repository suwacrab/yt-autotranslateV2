import {
    d as c,
    r as o,
    o as r,
    c as l,
    i as f
} from "./index.1eb99c87.js";
const d = c({
    __name: "App",
    setup(n) {
        const a = o(!1),
            i = o(!1),
            s = o(!1);

        function u() {
            chrome.runtime.sendMessage({
                action: "check-login"
            }).then(e => {
                e.idFb && (a.value = !0), e.idTw && (i.value = !0), e.idLi && (s.value = !0)
            })
        }
        return r(() => {
            u()
        }), (e, p) => null
    }
});
let t = document.querySelector("auto-translate-for-youtube");
if (!t) {
    t = document.createElement("auto-translate-for-youtube"), document.body.appendChild(t);
    const n = l(d);
    n.use(f), n.mount(t)
}