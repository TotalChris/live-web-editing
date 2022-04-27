import { LitElement, html, css } from 'https://unpkg.com/lit@latest?module';
import { LinkedList } from './LinkedList.js';
export default class LiveBox extends LitElement {
    constructor() {
        super();
    }
    place(str, instr, st, nd) {
        return str.slice(0, st) + instr + str.slice(nd || st);
    }
    get value() {
        return this.renderRoot.querySelector('#mainbox').value;
    }
    set value(newValue) {
        this.renderRoot.querySelector('#mainbox').value = newValue;
    }
    firstUpdated() {
        this.t = { type: null, p1: null, p2: null, content: null };
        this.hist = new LinkedList();
        this.wheel = this.renderRoot.querySelector("#steeringwheel");
        this.wheel.min = -1;
        this.wheel.max = -1;
        this.wheel.value = -1;
        this.wheel.disabled = true;
        this.histArray;
        this.lastIndex;
        this.renderRoot.querySelector('#mainbox').addEventListener('beforeinput', (e) => {
            this.x = e.target.selectionStart;// x is cursor position before op
            if (e.inputType == "insertLineBreak") {
                console.log(this.hist.traverse())
            }
        })
        this.renderRoot.querySelector('#mainbox').addEventListener('input', (e) => {
            this.wheel.disabled = false;
            this.y = e.target.selectionStart;// y is cursor position after op
            this.o = this.n;
            this.n = e.target.value; //TODO: Chunk of string
            console.log(this.n.substring(this.x, this.y))
            switch (e.inputType) {
                case "insertFromPaste":
                case "insertText":
                    this.t = { content: this.n.substring(this.x, this.y), type: "add", p1: this.x, p2: this.y }
                    break;
                case "deleteByCut":
                case "deleteContentBackward":
                    this.x = this.y + (this.o.length - this.n.length);
                    this.t = { content: this.o.substring(this.y, this.x), type: "sub", p1: this.y, p2: this.x }
                    break;
            } if (parseFloat(this.wheel.value) + 1 < this.hist.size){
                this.hist.trim(parseFloat(this.wheel.value) + 1);
            }
            this.hist.append(this.t);
            this.histArray = this.hist.traverse();
            this.wheel.max = this.histArray.length - 1;
            this.wheel.value = this.histArray.length - 1;
            this.lastIndex = this.histArray.length - 1;
            //input proof separate here
            //document.querySelector('#copy').innerHTML = this.place(document.querySelector('#copy').innerHTML, (this.t.type == "add" ? this.t.content : ""), this.t.p1, (this.t.type == "sub" ? this.t.p2 : null));
        });
        this.renderRoot.querySelector("#steeringwheel").addEventListener("input", (v) => {
            let i = parseFloat(v.target.value)
            let dir = (this.lastIndex < i ? "fwd" : "bck")
            for (let p = this.lastIndex; p != i; p = p + (dir == "bck" ? -1 : 1)) {
                let entry = this.histArray[p + (dir == "bck" ? 0 : 1)]
                let ttype = (((entry.type == "add" && dir == "fwd") || (entry.type == "sub" && dir == "bck")) ? "add" : "") + (((entry.type == "sub" && dir == "fwd") || (entry.type == "add" && dir == "bck")) ? "sub" : "")
                this.value = this.value.slice(0, entry.p1) + (ttype == "add" ? entry.content : "") + this.value.slice((ttype == "sub" ? entry.p2 : null) || entry.p1);
            }
            this.lastIndex = i;
        })
    }
    static get styles() {
        return css`
        @font-face {
            font-family: "Product-Sans";
            src: url("ProductSans.ttf");
        }
        textarea{
            font-family: "Product-Sans";
            font-size: 25px;
            outline: none;
            border: none;
            background-color: #ddd;
            border-radius: 15px;
            height: 50px;
            width: 450px;
            padding: 10px;
        }
        #steeringwheel{
            width: 450px;
            padding-left: 10px;
            padding-right: 10px;
        }
        `
    }
    render() {
        return html`
            <textarea id="mainbox"></textarea><br>
            <input type="range" id="steeringwheel">

        `
    }
}
customElements.define('live-box', LiveBox);