import { IonicApplication, SideMenu, Inject } from "../app";

@SideMenu(IonicApplication, "mainMenu", {
    template: `
        <ion-list>
            <ion-item menu-close ui-sref="mainMenu.page1()">
                Manage Songs
            </ion-item>
            <ion-item menu-close ui-sref="mainMenu.page2()">
                Manage Setlists
            </ion-item>
        </ion-list>
    `,
    menuHeaderBarClass: "bar-stable",
    menuHeaderBarTitle: "Menu",
    navBarClass: "bar-positive",
    menuTriggerButtonClass: "button-clear"
} as IonicTypescript.ISideMenuConfig) 
export class MainMenu implements IonicTypescript.ISideMenu {
    public constructor(
        @Inject("$log") private _logService: ng.ILogService
    ) {
        this._logService.log("Opened the main menu page");
    }
}