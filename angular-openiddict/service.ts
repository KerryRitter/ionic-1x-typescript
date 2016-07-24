export class OpenIddictHttpService implements openIddict.IOpenIddictHttpService {
    public static $inject = ["$http", "$window", "$q", "openIddictConfig"];
    
    public constructor(
        private _httpService: ng.IHttpService,
        private _windowService: ng.IWindowService,
        private _qService: ng.IQService,
        private _config: openIddict.IOpenIddictConfig
    ) {
    }

    public register(username: string, password: string): any {
        return this._qService((resolve: ng.IQResolveReject<openIddict.IAuthenticateResponse>, reject: ng.IQResolveReject<any>) => {
            return this._httpService<openIddict.IOpenIdToken>({
                method: "POST", 
                url: this._config.registerUrl, 
                data: { 
                    username: username, 
                    password: password, 
                }
            })
            .success((data: openIddict.IOpenIdToken, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
                if (data.error) {
                    resolve({
                        success: false,
                        messages: [data.error_description]
                    } as openIddict.IAuthenticateResponse);
                } else {
                    this._windowService.localStorage.setItem("token", JSON.stringify(data));
                    resolve({
                        success: true,
                        messages: null
                    } as openIddict.IAuthenticateResponse);
                }
            }).error((data: any, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
                reject(data);
            });
        });
    }

    public login(username: string, password: string): any {
        return this._qService((resolve: ng.IQResolveReject<openIddict.IAuthenticateResponse>, reject: ng.IQResolveReject<any>) => {
            return this._httpService<openIddict.IOpenIdToken>({
                method: "POST", 
                url: this._config.tokenUrl,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: { 
                    username: username, 
                    password: password, 
                    grant_type: "password" 
                }, 
                transformRequest: this.transformToQueryString
            })
            .success((data: openIddict.IOpenIdToken, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
                if (data.error) {
                    resolve({
                        success: false,
                        messages: [data.error_description]
                    } as openIddict.IAuthenticateResponse);
                } else {
                    this._windowService.localStorage.setItem("token", JSON.stringify(data));
                    resolve({
                        success: true,
                        messages: null
                    } as openIddict.IAuthenticateResponse);
                }
            }).error((data: any, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
                reject(data);
            });
        });
    }

    public get<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this._httpService.get<T>(url, this.addTokenHeader(config));
    }

    public delete<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this._httpService.delete<T>(url, this.addTokenHeader(config));
    }

    public head<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this._httpService.head<T>(url, this.addTokenHeader(config));
    }

    public jsonp<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this._httpService.jsonp<T>(url, this.addTokenHeader(config));
    }

    public post<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this._httpService.post<T>(url, data, this.addTokenHeader(config));
    }

    public put<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this._httpService.put<T>(url, data, this.addTokenHeader(config));
    }

    public patch<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return this._httpService.patch<T>(url, data, this.addTokenHeader(config));
    }

    private addTokenHeader(config?: ng.IRequestShortcutConfig): ng.IRequestShortcutConfig {
        if (!config) {
            config = {};
        }

        if (!config.headers) {
            config.headers = {};
        }

        var token = this._windowService.localStorage.getItem("token") as openIddict.IOpenIdToken;
        config.headers["Authorization"] = `Token ${token.access_token}`;
        config.headers["Content-Type"] = "application/x-www-form-urlencoded";
        
        return config;
    }

    private transformToQueryString(obj: any): string {
        var str = [];
        for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    }
}