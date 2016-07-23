import { IonicApplication, Page, Inject} from "../app";

@Page(IonicApplication, "register", {
    template: `
        <ion-view title="Register">
            <ion-nav-bar class="bar-balanced">
                <ion-nav-back-button>
                </ion-nav-back-button>
            </ion-nav-bar>
            <ion-content padding="true" scroll="false">
                <label class="item item-input" style="margin-bottom: 40px;">
                    <span class="input-label">Name</span>
                    <input type="text" ng-model="name">
                </label>
                <label class="item item-input" style="margin-bottom: 40px;">
                    <span class="input-label">Password</span>
                    <input type="password" ng-model="password">
                </label>
                <button type="submit" class="button button-calm button-block" ng-click="$ctrl.register(name, password)">
                    Register
                </button>
            </ion-content>
        </ion-view>
    `,
})
export class RegisterPage implements IonicTypescript.IPage {
    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("openIddictHttpService") private _openIddictHttpService: openIddict.IOpenIddictHttpService
    ) {
    }

    public register(username: string, password: string) {
        this._openIddictHttpService.register(username, password)
            .then((response) => {
                console.log(response);
            })
            .catch((response) => {
                console.log(response);
            });
    }
}