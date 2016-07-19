import { IonicApplication, Service, Inject } from "../app";

@Service(IonicApplication, "openIdHttpService")
export class OpenIdHttpService implements IOpenIdHttpService {
    public constructor(
        @Inject("$http") private _httpService: ng.IHttpService,
        @Inject("$window") private _windowService: ng.IWindowService,
        @Inject("$q") private _qService: ng.IQService
    ) {
    }

    public login(username: string, password: string): ng.IHttpPromise<boolean> {
        return this._qService((resolve: ng.IQResolveReject<[boolean, string[]]>, reject: ng.IQResolveReject<[boolean, string[]]>) => {
            return this._httpService<IOpenIdToken>({
                method: "POST", 
                url: "token", 
                data: { 
                    username: username, 
                    password: password, 
                    grant_type: "password" 
                }, 
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            })
            .success((data: IOpenIdToken, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
                if (data.error) {
                    this._windowService.localStorage.setItem("token", JSON.stringify(data));
                    resolve([false, [data.error_description]]);
                } else {
                    this._windowService.localStorage.setItem("token", JSON.stringify(data));
                    resolve([true, null]);
                }
            }).error((data: any, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
                reject([false, ["There was a server communication error."]]);
            });
        });
        
    }

    public request<T>(config: ng.IRequestConfig): ng.IHttpPromise<T> {
        return null;
    }

    public get<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return null;
    }

    public delete<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return null;
    }

    public head<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return null;
    }

    public jsonp<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return null;
    }

    public post<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return null;
    }

    public put<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return null;
    }

    public patch<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IHttpPromise<T> {
        return null;
    }

    private addTokenHeader(config?: ng.IRequestShortcutConfig): ng.IRequestShortcutConfig {
        var token = this._windowService.localStorage.getItem("token") as IOpenIdToken;

        if (config === null) {
            return {
                headers: {
                    "Authorization": `Token ${token.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            } as ng.IRequestShortcutConfig;
        }
    }

    private reloadTokenIfNeeded(): ng.IPromise<IOpenIdToken> {
        var currentTime = new Date().getTime();
        var token = this._windowService.localStorage.getItem("token") as IOpenIdToken;

        if (currentTime < token.expires_at) {
            return this._qService.resolve<IOpenIdToken>(token);
        }

        this._httpService({
            method: "POST", 
            url: "token", 
            data: { 
                refresh_token: token.refresh_token, 
                grant_type: "refresh_token",
                scope: "offline_access"  
            }, 
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        });

        return this._qService.resolve<IOpenIdToken>(null);
    }
}