import { IonicApplication, Page } from "../app";

@Page(IonicApplication, "login", {
    template: `
        <ion-view title="Login">
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
                <button type="submit" class="button button-calm button-block" ng-click="$ctrl.login(name, password)">
                    Login
                </button>
            </ion-content>
        </ion-view>`
})
export class Login {
    public login(name: string, password: string) {
        console.log(name, password);
    }
}