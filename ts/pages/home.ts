import { IonicApplication, SideMenu, Inject } from "../app";

@SideMenu(IonicApplication, "home", {
    url: "/home",
    template: `
        <ion-list>
            <ion-item menu-close ui-sref="home.page1()">
                Manage Songs
            </ion-item>
            <ion-item menu-close ui-sref="home.page2()">
                Manage Setlists
            </ion-item>
        </ion-list>
    `
}) 
export class HomeController {
    public constructor(
        @Inject("$log") private _logService: ng.ILogService
    ) {
        this._logService.log("Opened the home page");
    }
}