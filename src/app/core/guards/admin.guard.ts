import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanMatch {

  constructor(
    private authService: AuthService,
  ) { }


  private checkAuthState(): boolean | Observable<boolean> {
    return this.authService.checkAdmin()
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
