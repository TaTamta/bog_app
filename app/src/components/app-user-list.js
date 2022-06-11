import { BaseElement, html, css } from '../core/base-element.js';
import { RestClient } from '../core/rest.js'


class AppUserList extends BaseElement {
    static get is() {
        return 'app-user-list';
    }

    static get properties() {
        return {
            users: { type: Array },
            searchTerm: { type: String },
        }

    }

    static get styles() {
        return css`
            :host {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr 1fr max-content;
                grid-template-rows: auto;
                grid-gap: 12px;
                margin-top: 12px;
                align-items: center;
                padding: 16px;
            }

            .title {
                grid-column: 1 / 6;
                justify-self: flex-start;
                font-size: 24px;
                color: #333333;
                margin-bottom: 30px
            }

            .name {
                grid-column: 1 / 1;
            }

            .name, .lname, .email, .phone, .actions {
                font-size: 16px;
                font-weight: bold;
            }

            .actions {
                grid-column: 5 / 7;
            }
 
            .filter {
                grid-column: 5 / 7;
                height: 16px;
                width: 200px;
                width: 240px;
                height: 32px;
                border-radius: 7px;
                background-color: #f1f1f1;
                border: none;
                padding-left: 7px;
                font-size: 12px;
                line-height: 14px;
                margin-top:12px
            }

            input[type=button] {
                width: 80px;
                padding: 8px 16px;
                text-decoration: none;
                cursor: pointer;
                border-radius: 7px;
                background-color: #0099ff;;
                color: white;
                text-align: center;
                border: none
            } 
        `
    }


    render() {
        return html`
            <div class="title"> Registered Users </div>
            <div class="name"> First Name </div>
            <div class="lname"> Last Name </div>
            <div class="email"> Email </div>
            <div class="phone"> Phone </div>
            <div class="actions"> Actions </div>

            <input class="filter"
                   type = "text"
                   placeholder="Filter"
                   @input="${(event) => this.searchTerm = event.target.value}"
                   >

            ${this.users.filter(((item) => this.filter(item))).map((user) => html`
                <div>${user.firstName}</div>
                <div>${user.lastName} </div>
                <div>${user.email} </div>
                <div>${user.phone} </div>
                <input type ="button"
                       class="edit"
                       value="Edit"
                       @click="${() => this.editUser(user)}"> 
                
                <input type ="button" 
                        class="delete"
                        value="Delete"
                        @click="${() => this.deleteUser(user)}">
                `)}
                
        `}



    editUser(user) {
        this.sendEvent('edit-user', user);
    }

    deleteUser(user) {
        if (confirm ('Delete user?') == true) {
            RestClient.call("/api/client/deleteUser", user)
            .then((result) => {
                console.log(result)
                this.getUsersList();
            })
            .catch((error) => console.log(error));
        } 
    }

    filter(item) {
        if (!this.searchTerm) {
            return true;
        }
        const regex = new RegExp(this.searchTerm, 'i');

        return regex.test(item.firstName) || regex.test(item.lastName) || regex.test(item.email) || regex.test(item.phone)
    }

    getUsersList() {
        RestClient.call('/api/client/getClientInfo')
            .then((result) => this.users = result)
            .catch((error) => console.log(error))
    }

    constructor() {
        super();
        this.users = [];
    }

    connectedCallback() {
        super.connectedCallback();
        this.getUsersList();
    }
}

customElements.define(AppUserList.is, AppUserList)


