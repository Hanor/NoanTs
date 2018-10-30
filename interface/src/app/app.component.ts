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
  retracted: boolean = false;
  systemName: string = 'Projeto X';
  user: UserModel;

  constructor(
    private systemService: SystemService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.systemService.systemId = this.systemName.replace(/ /g, '');
    this.retracted = (this.systemService.getSessionVariable('retracted') === 'true') ? true : false;
    this.user = this.systemService.getSessionVariableAsJson('currentUser');
    this.userService.currentUser$.next(this.user);
    
    this.eventUserChange();
  }
  eventRetract() {
    this.retracted = !this.retracted;
    this.systemService.setSessionVariable('retracted', '' + this.retracted);
  }
  eventUserChange() {
    this.userService.currentUser$.subscribe((user) => this.user = user);
  }
}
