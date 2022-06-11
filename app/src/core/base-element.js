import { LitElement, html, css } from 'lit-element';

class BaseElement extends LitElement {
    constructor(){
        super();
        this.$ = new Proxy({}, {
            get: (obj, prop) => this.shadowRoot.getElementById(prop),
        });

        const props = this.constructor.properties;
        for(let key in props){
            if (props[key].type === String){
                this[key] = props[key].value || '';
            }
            if (props[key].type === Number){
                this[key] = props[key].value || '';
            }

        }
    }

    sendEvent(name, detail = null){
        const event = new CustomEvent(name, {
            detail: detail,
            composed: true,
            bubbles: true
        });
        this.dispatchEvent(event)
    }
}

export {BaseElement, css, html};