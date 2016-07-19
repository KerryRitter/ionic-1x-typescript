/// <reference path="../typings/index.d.ts" />

interface IOpenIdHttpService {
    request<T>(config: ng.IRequestConfig): ng.IHttpPromise<T>;

    get<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T>;

    delete<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T>;

    head<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T>;

    jsonp<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T>;

    post<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T>;

    put<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T>;

    patch<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T>;
}

interface IOpenIdToken {
    access_token: string;
    scope: string;
    refresh_token: string;
    expires_in: number;
    expires_at: number;

    error: string;
    error_description: string;
}