import { IonicApplication, SideMenu, Inject, SideMenuBase, ISideMenuConfig, NavController } from "../app";
import { MyRatingsPage } from "./myRatings";
import { FindCigarPage } from "./findCigar";

@SideMenu(IonicApplication, "mainMenu", {
    template: `
        <ion-list>
            <ion-item menu-close ng-click="$ctrl.goToMyRatings()">
                My Ratings
            </ion-item>
            <ion-item menu-close ng-click="$ctrl.goToAddRatings()">
                Add Rating
            </ion-item>
        </ion-list>
    `
} as ISideMenuConfig)
export class MainMenu extends SideMenuBase {
    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("navController") private _nav: NavController
    ) {
        super();
        this._logService.log("Opened the main menu page");
    }

    public goToMyRatings() {
        this._nav.push(MyRatingsPage, null, { historyRoot: true, disableAnimate: true });
    }

    public goToAddRatings() {
        this._nav.push(FindCigarPage, null, { historyRoot: true, disableAnimate: true });
    }
}