import './components/app-user-form.js'
import './components/app-user-list.js'
import { BaseElement, html, css } from './core/base-element.js';

class AppRoot extends BaseElement {
    static get is() {
        return 'app-root';
    }

    static get properties() {
        return {
            page: { type: String }
        }

    }

    static get styles() {
        return css`
        :host {
            margin: 0;
            padding:0;
            box-sizing: border-box
        }

        .top_bar {
            background-color: #f1f1f1;
        }

        .container {
            width: 960px;
            margin: auto;

        }
        .navigation {
            display: flex;
            justify-content: center;
            height: 60px;
            align-items: center;
        }
        
        .navigation a {
            color: #2e2e2e;
            padding: 24px;
            border-right: solid;
            border-width: 1px;
            line-height: 0px;
            font-size: 16px;
        }

        .nav_item {
            transition: 0.5s;
        }

        .nav_item:hover {
            font-size: 20px;
            color: #1a1a1a;
            border-color:#9f9f9f;
        }

        app-user-list {
           background-color: #e0e0e0;
        }



    `
    }


    render() {
        return html`
        <div class=top_bar>
            <div class=container>
                <div class="navigation"> 
                    <a class="nav_item" href="#form">Form</a>
                    <a class="nav_item" style="border: none" href="#chat">Chat</a>
                </div>
            </div>
        </div>

        <div>
            <div
                @app-register-success="${this.successHandler}"
                @edit-user="${this.editUserHandler}">
                
                ${this.page === 'form' ? html`
                    <app-user-form tooltip = "User Form" id="form"></app-user-form>
                    <app-user-list tooltip = "User List" id="list"></app-user-list>` : ''}
                ${this.page === 'chat' ? html`
                    <app-user-chat></app-user-chat>` : ''}
            </div> 
        </div>

        `;
    }

    constructor() {
        super();
        this.page = "form"
    }

    editUserHandler(event) {
        const form = this.$.form;
        form.setUserData(event.detail);

    }

    successHandler() {
        const list = this.$.list;
        list.getUsersList();
    }

    connectedCallback() {
        super.connectedCallback();
        this.onRouteChange();
        window.addEventListener('popstate', this.onRouteChange.bind(this))
    }

    onRouteChange() {
        this.page = window.location.hash.substring(1) || "form";

    }

}

customElements.define(AppRoot.is, AppRoot)
