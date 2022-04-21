import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registroForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authservice: AuthService,
              private router: Router) { }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required],
    });
  }

  CrearUsuario(){
    if(this.registroForm.invalid) { return };

    const { nombre, correo, password } = this.registroForm.value;
    this.authservice.crearUsuario(nombre, correo, password)
    .then(credenciales => {
      console.log(credenciales);
      this.router.navigate(['/']);
    })
    .catch(err => console.error(err));
  }

}
