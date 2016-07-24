import {IonicApplication, Service, Inject, OpenIddictHttpService} from "../app";

@Service(IonicApplication, "ratingService")
export class RatingService {
    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("openIddictHttpService") private _openIddictHttpService: OpenIddictHttpService,
        @Inject("baseUrl") private _baseUrl: string
    ) {
    }

    public get(): ng.IHttpPromise<IRating[]> {
        const url = `${this._baseUrl}/api/me/ratings`;
        return this._openIddictHttpService.get<IRating[]>(url);
    }

    public post(rating: IRating): ng.IHttpPromise<IRating> {
        const url = `${this._baseUrl}/api/me/ratings`;
        return this._openIddictHttpService.post<IRating>(url, rating);
    }

    public put(rating: IRating): ng.IHttpPromise<IRating> {
        const url = `${this._baseUrl}/api/me/ratings/${rating.id}`;
        return this._openIddictHttpService.put<IRating>(url, rating);
    }

    public delete(id: number): ng.IHttpPromise<IRating> {
        const url = `${this._baseUrl}/api/me/ratings/${id}`;
        return this._openIddictHttpService.delete(url);
    }
}