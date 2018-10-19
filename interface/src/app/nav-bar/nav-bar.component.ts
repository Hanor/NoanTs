import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { UserModel } from '../shared/models/user.model';
import { UserService } from '../user/user.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { AppComponent } from '../app.component';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  currentState$: BehaviorSubject<State> = new BehaviorSubject(null);
  subscriptions$: Subscription = new Subscription();
  
  states: Array<State> = new Array();
  user: UserModel;
  
  constructor(
    private router: Router,
    private userService: UserService,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.initializeStates();
    this.loadState(this.getUrlFatherPath(this.router.url));
    
    this.eventUserChange();
    this.eventUrlChange();
  }
  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
  doLogout(): void {
    this.userService.signOut();
  }
  doRetract(): void {
    this.appComponent.eventRetract();
  }
  eventUserChange(): void {
    this.subscriptions$.add(this.userService.currentUser$.subscribe((user: UserModel) => this.user = user));
  } 
  eventUrlChange(): void {
    this.subscriptions$.add(this.router.events.subscribe((event) =>{
      if (event instanceof NavigationEnd) {
        let url = event.urlAfterRedirects;
        this.loadState(url);
      }
    }))
  }
  getStateByName(name): State {
    return this.states.filter((state) => {
      return state.name = name;
    })[0];
  }
  getUrlFatherPath(fullUrl): string {
    if (!fullUrl) {
      return '';
    }
    return fullUrl.replace('/', '').split('/')[0].split('?')[0]
  }
  getUrlWithoutParams(url: string): string {
    if (!url) {
      return '';
    }
    return url.split('?')[0]
  }
  getUrlQueryParams(url: string): string {
    return url.split('?')[1]
  }
  initializeStates(): void {
    this.states.push(new State('Início', 'home', 'fas fa-home'));
    this.states.push(new State('Super Poder', 'superpower', 'fab fa-superpowers'));
  }
  loadState(url: string): void {
    let state = this.getUrlFatherPath(url)
    this.currentState$.next(this.getStateByName(state));
  }
}

class State {
  alias: string;
  name: string;
  icon: string;
  constructor(alias: string, name: string, icon: string) {
    this.alias = alias;
    this.name = name;
    this.icon = icon;
  }
}