import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.types';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class UserService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    private baseUrl =  environment.apiUrl;
    httpOptions = {

    };

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User>
    {
        return this._httpClient.get<User>('api/common/user').pipe(
            tap((user) =>
            {
                this._user.next(user);
            }),
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any>
    {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    getAllUsers()
    {
        return this._httpClient.get(`${this.baseUrl}/users`,this.httpOptions);
    }

    getUserById(id: any)
    {
        return this._httpClient.get(`${this.baseUrl}/users/${id}`,this.httpOptions);
    }

    createUser(payload: any)
    {
        return this._httpClient.post(`${this.baseUrl}/users`, payload,this.httpOptions);
    }

    updateUserById(id: any, payload: any)
    {
        return this._httpClient.put(`${this.baseUrl}/users/${id}`, payload,this.httpOptions);
    }

    deleteUserById(id: any)
    {
        return this._httpClient.delete(`${this.baseUrl}/users/${id}`,this.httpOptions);
    }

    getUserDetailsById(id: any)
    {
        return this._httpClient.get(`${this.baseUrl}/user-details/${id}`,this.httpOptions);
    }
}
