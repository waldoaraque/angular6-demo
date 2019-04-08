import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
    private router: Router) {}

  canActivate(ActivatedRouteSnapshot, RouterStateSnapshot):
  Observable<boolean> |
  Promise<boolean> |

  boolean {
    //we use pipe to filter the object user to boolean data
    return this.authenticationService.getStatus().pipe(
      map( status => { //map the result of the pipe
        if (status) { //we evaluate the data
          return true;
        }
        else {
          this.router.navigate(['login']);
          return false;
        }
      })
    );
  }

}
