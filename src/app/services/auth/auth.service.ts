import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUtils } from './auth.utils';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import {environment} from "../../../environments/environment";
import {UserService} from "../user/user.service";

@Injectable({providedIn: 'root'})
export class AuthService
{
    private _authenticated: boolean = false;
    private baseUri =  environment.apiUrl;


    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }
    /**
     * Setter & getter for user data
     */
    set user(token: string)
    {
        localStorage.setItem('user', token);
    }

    get user(): any
    {
        return JSON.parse(localStorage.getItem('user') ?? '');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(this.baseUri + `/auth/login`, credentials).pipe(
            switchMap((response: any) =>
            {
                // Store the access token in the local storage
                this.accessToken = response.token;
                this.user = JSON.stringify(response.user);

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            }),
        );
    }


    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');

        // Set the authenticated flag to false
        this._authenticated = false;
        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { full_name: string; email: string; password: string;  }): Observable<any>
    {
        return this._httpClient.post('/auth/register', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            console.log('authenticated')
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            console.log('access token doesnt exist')
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            console.log('token expired')
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        return of(true);
    }

    decodeToken(token: string) {
        return JSON.parse(atob(token.split('.')[1]));
    }
}
