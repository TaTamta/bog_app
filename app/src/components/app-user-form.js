import { BaseElement, html, css } from '../core/base-element.js';
import { RestClient } from '../core/rest.js'

class AppUserForm extends BaseElement {
    static get is() {
        return 'app-user-form';
    }

    static get properties() {
        return {
            tooltip: {
                type: String,
                reflect: true,
                value: "Registration Form"

            },
            firstName: {
                type: String,
                reflect: true,
                attribute: "first-Name"
            },
            lastName: {
                type: String,
                reflect: true,
                attribute: "last-Name"
            },
            email: {
                type: String,
                reflect: true,
                attribute: "user-email"
            },
            phone: {
                type: Number,
                reflect: true,
                attribute: "user-phone"
            },
        }

    }

    static get styles() {
        return css`
            :host {
                display: flex;
                justify-content: center;
                margin: 0px;
                padding: 0px;
                box-sizing: border-box;
                font-family: Arial, Helvetica, sans-serif;
            }

            .title {
                font-size: 36px;
                line-height: 43px;
                color: #333333;

            }

            .form {
                display: grid;
                grid-row-gap: 24px;
                margin-top: 36px;
            }

            .form_item {
                display: flex;
                flex-flow: column
            }

            .button {
                height: 32px;
                width: 249px;
                border-radius: 7px;
                background-color: #0099ff;;
                color: white;
                text-align: center;
                cursor: pointer;
                border: none;
                
            }

            input {
                width: 240px;
                height: 32px;
                border-radius: 7px;
                background-color: #c5c0c0;
                border: none;
                padding-left: 7px;
                font-size: 12px;
                line-height: 14px;
                margin-top:12px
            }           

        `
    }


    render() {
        return html`
        <div class=container>
            <div class="title">User Registration</div>

            <div class="form">
                <div class="form_item">
                    <label for="firstName"> First Name </label>
                    <input type="text"
                        placeholder= "First Name"
                        .value="${this.firstName}"
                        @input = "${(event) => this.firstName = event.target.value}">
                </div>

                <div class="form_item">
                    <label for="lastName"> Last Name </label>
                    <input type="text"
                        placeholder= "Last Name"
                        .value="${this.lastName}"
                        @input = "${(event) => this.lastName = event.target.value}">
                </div>

                <div class="form_item">
                <label for="email"> Email </label>
                <input type="text"
                    placeholder= "Email"
                    .value="${this.email}"
                    @input = "${(event) => this.email = event.target.value}">
                </div>

                <div class="form_item">
                <label for="phone"> Phone </label>
                <input type="text"
                    placeholder= "Phone Number"
                    .value="${this.phone}"
                    @input = "${(event) => this.phone = event.target.value}">
                </div>
                
                <input class="button"
                    type="submit" 
                    value = "register"
                    @click = "${this.registerUser}">

            </div>
        </div>
        `;
    }

    // setFirstName(event) {
    //     this.firstName = event.target.value;
    // }

    // setLastName(event) {
    //     this.lastName = event.target.value;
    // }

    // setEmail(event) {
    //     this.email = event.target.value;
    // }

    // setPhone(event) {
    //     this.phone = event.target.value;
    // }

    registerUser(event) {
        const target = event.currentTarget;
        target.disabled = true;

        const user = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            _id: this._id
        }

        RestClient.call('/api/client/registerUser', user)
            .then((result) => {
                this.sendEvent('app-register-success');
                this.firstName = "";
                this.lastName = "";
                this.email = "";
                this.phone = "";
                this._id = ""
            })
            .catch((error) => console.log(error))
            .finally(() => target.disabled = false)
    }


    constructor() {
        super();
    }

    setUserData(user) {
        Object.keys(user)
            .forEach((key) => {
                this[key] = user[key];
            })
    }
}

customElements.define(AppUserForm.is, AppUserForm)
