import { IonicApplication, Page } from "../app";

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
                <button type="submit" class="button button-calm button-block" ng-click="$ctrl.forgotPassword(name)">
                    Login
                </button>
            </ion-content>
        </ion-view>
    `
})
export class ForgotPasswordController implements IonicTypescript.IPage {
    public forgotPassword(name: string) {
        console.log(name);
    }
}