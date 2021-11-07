import { LitElement, html, css } from 'https://unpkg.com/lit@latest?module';
import { LinkedList } from './LinkedList.js';
export default class LiveBox extends LitElement {
    constructor(){
        super();
    }
    place(str, instr, st, nd){
        return str.slice(0, st) + instr + str.slice(nd || st);
    }
    firstUpdated() {
        this.t = {type: null, p1: null, p2: null, content: null};
        this.hist = new LinkedList();
        this.renderRoot.querySelector('#mainbox').addEventListener('beforeinput', (e) => {
            this.x = e.target.selectionStart;// x is cursor position before op
            if(e.inputType == "insertLineBreak"){
                console.log(this.hist.traverse())
            }
        })
        this.renderRoot.querySelector('#mainbox').addEventListener('input', (e) => {
            this.y = e.target.selectionStart;// y is cursor position after op
            this.o = this.n;
            this.n = e.target.value; //TODO: Chunk of string
            switch(e.inputType){
                case "insertFromPaste":
                case "insertText":
                    this.t = {content: this.n.substring(this.x, this.y), type: "add", p1: this.x, p2: this.y} 
                    break;
                case "deleteByCut":
                case "deleteContentBackward":
                    this.x = this.y+(this.o.length-this.n.length);
                    this.t = {content: this.o.substring(this.y, this.x), type: "sub", p1: this.y, p2: this.x} 
                    break;
            }
            //input proof separate here
            this.hist.append(this.t);
            document.querySelector('#copy').innerHTML = this.place(document.querySelector('#copy').innerHTML, (this.t.type == "add" ? this.t.content : ""), this.t.p1, (this.t.type == "sub" ? this.t.p2 : null));
            
        });
    }
    static get styles(){
        return css`
        @font-face {
            font-family: "Product-Sans";
            src: url("ProductSans.ttf");
        }
        input{
            font-family: "Product-Sans";
            font-size: 25px;
            outline: none;
            border: none;
            background-color: #ddd;
            border-radius: 15px;
            height: 50px;
            width: 450px;
        }
        `
    }
    render() {
        return html`
            <input id="mainbox"></input>
        `
    }
}
customElements.define('live-box', LiveBox);