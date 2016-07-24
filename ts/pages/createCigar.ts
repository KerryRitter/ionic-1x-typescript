import { IonicApplication, SideMenuPage, Inject, PageBase, NavController } from "../app";
import { CigarService } from "../services/cigarService";

@SideMenuPage(IonicApplication, "mainMenu", "createCigar", {
    url: "/createCigar",
    template: `
        <ion-view view-title="Create Cigar">
            <ion-content class="padding">
                Create a Cigar
                <button class="button button-energized" ng-click="$ctrl.save()">Save new cigar</button>
            </ion-content>
        </ion-view>
    `
}) 
export class CreateCigarPage extends PageBase {
    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("navController") private _nav: NavController,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
        this._logService.log("Opened createCigar");
    }

    public save() {
        this._nav.pop({cigar: { name: "test" }}, { historyRoot: true });
    }
}