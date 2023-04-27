import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanMatch {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  private checkAuthState(): boolean | Observable<boolean> {
    return this.authService.checkAuth()
      .pipe(
        tap(isLoged => {
          if (!isLoged) {
            this.router.navigate(['./auth/login'])
          }
        })
      )
  }


  canMatch(
    route: Route,
    segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkAuthState();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> {
      return this.checkAuthState();
  }

}
