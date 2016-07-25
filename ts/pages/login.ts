import { IonicApplication, Page, Inject, PageBase, NavController } from "../app";
import { HomePage } from "./home";

@Page(IonicApplication, "login", {
    url: "/login",
    template: `
        <ion-view title="Login">
            <ion-nav-bar class="bar-balanced">
                <ion-nav-back-button>
                </ion-nav-back-button>
            </ion-nav-bar>
            <ion-content padding="true" scroll="false" ng-init="username = ''; password = '';">
                <label class="item item-input" style="margin-bottom: 40px;">
                    <span class="input-label">Name</span>
                    <input type="text" ng-model="username">
                </label>
                <label class="item item-input" style="margin-bottom: 40px;">
                    <span class="input-label">Password</span>
                    <input type="password" ng-model="password">
                </label>
                <button type="submit" class="button button-calm button-block" ng-click="$ctrl.login(username, password)">
                    Login
                </button>
            </ion-content>
        </ion-view>
    `
}) 
export class LoginPage extends PageBase {
    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("$state") private _stateService: ng.ui.IStateService,
        @Inject("openIddictHttpService") private _openIddictHttpService: openIddict.IOpenIddictHttpService,
        @Inject("navController") private _nav: NavController,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
    }

    public login(username: string, password: string) {
        this._openIddictHttpService.login(username, password)
            .then((response) => {
                this._nav.push(HomePage);
            })
            .catch((response: openIddict.IOpenIdToken) => {
                alert(response.error_description);
            });
    }
}