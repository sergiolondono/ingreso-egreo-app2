import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre?: string = '';
  userSubs!: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
                    .pipe(
                      filter(({ user }) => user != null)
                    )
                    .subscribe(({ user }) => this.nombre = user?.nombre );
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  logout() {
    Swal.fire({
      title: 'Espere por favor!',
      didOpen: () => {
        Swal.showLoading()
      }
    });
    this.authService.logout().then(() => {
      Swal.close();
      this.router.navigate(['/login']);
    });
  }

}
