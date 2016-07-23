import { IonicApplication, SideMenuPage, Inject } from "../app";
import { MainMenu } from "./MainMenu";

@SideMenuPage(IonicApplication, MainMenu, "home", {
    url: "/home",
    template: `
        <ion-view view-title="Page 1">
            <ion-content class="padding">
                <button class="button button-positive button-block">I'm a home button!</button>
            </ion-content>
        </ion-view>
    `
}) 
export class HomePage implements IonicTypescript.IPage {
    public constructor(
        @Inject("$log") private _logService: ng.ILogService
    ) {
        this._logService.log("Opened home");
    }
}