import {IonicApplication, Service, Inject, OpenIddictHttpService} from "../app";

@Service(IonicApplication, "cigarService")
export class CigarService {
    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("openIddictHttpService") private _openIddictHttpService: OpenIddictHttpService,
        @Inject("baseUrl") private _baseUrl: string
    ) {
    }

    public get(search: string): ng.IHttpPromise<ICigar[]> {
        const url = `${this._baseUrl}/api/cigars?search=search`;
        this._logService.info(``);
        return this._openIddictHttpService.get<ICigar[]>(url);
    }

    public post(cigar: ICigar): ng.IHttpPromise<ICigar> {
        const url = `${this._baseUrl}/api/cigars`;
        return this._openIddictHttpService.post<ICigar>(url, cigar);
    }
}