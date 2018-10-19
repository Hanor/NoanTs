import { Component, OnInit} from '@angular/core';
import { SystemService } from './system/system.service';
import { UserService } from './user/user.service';
import { UserModel } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  navBarRetract: boolean = false;
  systemName: string = 'Projeto X';
  user: UserModel;

  constructor(
    private systemService: SystemService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.systemService.systemId = this.systemName.replace(/ /g, '');
    this.navBarRetract = Boolean(this.systemService.getSessionVariable('navBarRetract'));
    this.user = this.systemService.getSessionVariableAsJson('currentUser');
    this.userService.currentUser$.next(this.user);
    
    this.eventUserChange();
  }
  eventUserChange() {
    this.userService.currentUser$.subscribe((user) => this.user = user);
  }
  setNavBarRetract(retract: boolean): void {
    this.systemService.setSessionVariable('navBarRetract', '' + retract);
    this.navBarRetract = retract;
  }
}
