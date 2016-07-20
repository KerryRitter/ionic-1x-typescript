export class OpenIddictHttpService implements IOpenIddictHttpService {
    public static $inject = ["$http", "$window", "$q", "openIddictHttpServiceSettings"];
    
    public constructor(
        private _httpService: ng.IHttpService,
        private _windowService: ng.IWindowService,
        private _qService: ng.IQService,
        private _settings: IOpenIddictHttpServiceSettings
    ) {
    }

    public register(username: string, password: string): any {
        return this._qService((resolve: ng.IQResolveReject<IAuthenticateResponse>, reject: ng.IQResolveReject<any>) => {
            return this._httpService<IOpenIdToken>({
                method: "POST", 
                url: this._settings.registerUrl, 
                data: { 
                    username: username, 
                    password: password, 
                }
            })
            .success((data: IOpenIdToken, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
                if (data.error) {
                    resolve({
                        success: false,
                        messages: [data.error_description]
                    } as IAuthenticateResponse);
                } else {
                    this._windowService.localStorage.setItem("token", JSON.stringify(data));
                    resolve({
                        success: true,
                        messages: null
                    } as IAuthenticateResponse);
                }
            }).error((data: any, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
                reject(data);
            });
        });
    }

    public login(username: string, password: string): any {
        return this._qService((resolve: ng.IQResolveReject<IAuthenticateResponse>, reject: ng.IQResolveReject<any>) => {
            return this._httpService<IOpenIdToken>({
                method: "POST", 
                url: this._settings.tokenUrl, 
                data: { 
                    username: username, 
                    password: password, 
                    grant_type: "password" 
                }, 
                transformRequest: this.transformToQueryString
            })
            .success((data: IOpenIdToken, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
                if (data.error) {
                    resolve({
                        success: false,
                        messages: [data.error_description]
                    } as IAuthenticateResponse);
                } else {
                    this._windowService.localStorage.setItem("token", JSON.stringify(data));
                    resolve({
                        success: true,
                        messages: null
                    } as IAuthenticateResponse);
                }
            }).error((data: any, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
                reject(data);
            });
        });
    }

    public get<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this.reloadTokenIfNeededThenRequest((token: IOpenIdToken) => {
            return this._httpService.get<T>(url, this.addTokenHeader(token, config));
        });
    }

    public delete<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this.reloadTokenIfNeededThenRequest((token: IOpenIdToken) => {
            return this._httpService.delete<T>(url, this.addTokenHeader(token, config));
        });
    }

    public head<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this.reloadTokenIfNeededThenRequest((token: IOpenIdToken) => {
            return this._httpService.head<T>(url, this.addTokenHeader(token, config));
        });
    }

    public jsonp<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this.reloadTokenIfNeededThenRequest((token: IOpenIdToken) => {
            return this._httpService.jsonp<T>(url, this.addTokenHeader(token, config));
        });
    }

    public post<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this.reloadTokenIfNeededThenRequest((token: IOpenIdToken) => {
            return this._httpService.post<T>(url, data, this.addTokenHeader(token, config));
        });
    }

    public put<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this.reloadTokenIfNeededThenRequest((token: IOpenIdToken) => {
            return this._httpService.put<T>(url, data, this.addTokenHeader(token, config));
        });
    }

    public patch<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this.reloadTokenIfNeededThenRequest((token: IOpenIdToken) => {
            return this._httpService.patch<T>(url, data, this.addTokenHeader(token, config));
        });
    }

    private addTokenHeader(token: IOpenIdToken, config?: ng.IRequestShortcutConfig): ng.IRequestShortcutConfig {
        if (config === null) {
            return {
                headers: {
                    "Authorization": `Token ${token.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            } as ng.IRequestShortcutConfig;
        }
    }

    private reloadTokenIfNeededThenRequest<T>(callback: ((token: IOpenIdToken) => ng.IHttpPromise<T>)) {
        return this._qService((resolve: ng.IQResolveReject<ng.IHttpPromise<T>>, reject: ng.IQResolveReject<any>) => {
            var currentTime = new Date().getTime();
            var token = this._windowService.localStorage.getItem("token") as IOpenIdToken;

            if (currentTime < token.expires_at) {
                resolve(callback(token));
            }

            this._httpService<IOpenIdToken>({
                method: "POST", 
                url: this._settings.tokenUrl, 
                data: { 
                    refresh_token: token.refresh_token, 
                    grant_type: "refresh_token",
                    scope: "offline_access"  
                }, 
                transformRequest: this.transformToQueryString
            })
            .then((response) => { 
                resolve(callback(response.data));
            })
            .catch((response) => {
                reject(response);
            })
        });
    }

    private transformToQueryString(obj: any): string {
        var str = [];
        for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    }
}