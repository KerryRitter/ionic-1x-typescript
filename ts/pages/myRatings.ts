import { IonicApplication, SideMenuPage, Inject, PageBase } from "../app";

@SideMenuPage(IonicApplication, "mainMenu", "myRatings", {
    url: "/myRatings",
    template: `
        <ion-view view-title="My Ratings">
            <ion-content class="padding">
                View my ratings
            </ion-content>
        </ion-view>
    `
}) 
export class MyRatingsPage extends PageBase {
    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
        this._logService.log("Opened myRating");
    }
}