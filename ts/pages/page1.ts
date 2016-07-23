import { IonicApplication, SideMenuPage, Inject } from "../app";

@SideMenuPage(IonicApplication, "mainMenu.page1", {
    url: "/page1",
    template: `
        <ion-view view-title="Page 1">
            <ion-content class="padding">
                <button class="button button-positive button-block">I'm a button!</button>
            </ion-content>
        </ion-view>
    `
}) 
export class Page1Controller {
    public constructor(
        @Inject("$log") private _logService: ng.ILogService
    ) {
        this._logService.log("Opened page 1");
    }
}