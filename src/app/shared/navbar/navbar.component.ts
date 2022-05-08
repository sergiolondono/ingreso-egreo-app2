import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombre?: string = '';
  userSubs!: Subscription;

  constructor(private store: Store<AppState>) { }

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

}
