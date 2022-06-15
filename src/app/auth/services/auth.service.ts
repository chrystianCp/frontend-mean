import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { AuthResponse, Usuario } from '../interfaces/interface';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable, } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {        
    return {... this._usuario};
  }

  constructor(private http: HttpClient) { }

  register(/*name: string,*/ email: string, password: string, role: 'ADMIN_ROLE' | 'USER_ROLE'){

    const url = `${this.baseUrl}/auth/new`;
    const body = { /*name,*/email, password,role };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( ({ok, token}) => {
          if( ok ){
            localStorage.setItem('token', token!);           
          }
        }),
        map(resp => resp.ok),
        catchError( err => of(err.error.msg) )
      )    
  }



  login( email: string, password: string){

    const url = `${this.baseUrl}/auth/login`;
    const body = { /*name,*/email, password };    

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(({ok,token}) => {          
          if( ok ){
            localStorage.setItem('token', token!);                       
          }          
        }),
        map(resp => resp.ok),
        catchError( err => of(err.error.msg) )
      );       
  }

  
  validarToken(): Observable<boolean>{
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url,{ headers })
        .pipe(
          map( resp => {
            localStorage.setItem('token', resp.token!);
            this._usuario = {              
              uid: resp.uid!,
              email: resp.email!,
              role: resp.role!                                      
            }
            return resp.ok;
          }),
          catchError(err => of(false))
        );
  }

  logout(){
    localStorage.clear();
  }


}