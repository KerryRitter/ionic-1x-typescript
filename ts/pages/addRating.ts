import { IonicApplication, SideMenuPage, Inject, PageBase, NavController } from "../app";
import { CreateCigarPage } from "./createCigar";

@SideMenuPage(IonicApplication, "mainMenu", "addRating", {
    url: "/addRating",
    template: `
        <ion-view view-title="Add Rating">
            <ion-content class="padding">
                <button class="button button-energized" ng-click="$ctrl.goToCreateCigar()">Create new cigar</button>
            </ion-content>
        </ion-view>
    `
}) 
export class AddRatingPage extends PageBase {
    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("navController") private _nav: NavController,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
        this._logService.log("Opened addRating");
    }

    public goToCreateCigar() {
        this._nav.push(CreateCigarPage);
    }
}