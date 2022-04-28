import { EmailValidator } from "@angular/forms";

export class Usuario {

    static fromFirebase({ uid, nombre, email }) {
        return new Usuario(uid, nombre, email);
    }

    constructor(
        public uid: string,
        public nombre: string,
        public email: string
    ) {}
}