import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { UserModel } from '../shared/models/user.model';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map, mergeMap, concatMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../system/system.service';
 
@Injectable({ providedIn: 'root' })
export class UserService {
    currentUser$: BehaviorSubject<UserModel> = new BehaviorSubject(null);
    constructor(
        private http: HttpClient, 
        private router: Router,
        private systemService: SystemService
    ) {}

    signIn(signInForm, persistent): Observable<UserModel> {
        this.systemService.setPersistent(persistent);
        return this.http.post<any>('/api/signIn', signInForm)
        .pipe(
            concatMap((response) => {
                if (response.token) {
                    this.systemService.setSessionVariable('token', response.token);
                    return this.getSignedUser(signInForm.login);
                } else {
                    throw new Error('Id Token not received.');
                }
            })
        );
    }
    signOut(): void {
        const user: UserModel = this.currentUser$.getValue();
        this.http.get<any>('/api/signOut/' + user.username).subscribe((response) => {
            if (response.signOut) {
                this.systemService.removeAllSessionVariables();
                this.currentUser$.next(null);
                this.router.navigate(['login']);
            }
        });
    }

    getSignedUser(userName): Observable<UserModel> {
        return this.http.get<UserModel>('/api/signedUser/' + userName)
        .pipe(map((user: UserModel) => {
            if (user) {
                this.systemService.setSessionVariable('currentUser', JSON.stringify(user));
                this.currentUser$.next(user);
                return user;
            }
        }));
    }
}