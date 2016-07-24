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
    `,
    params: {
        cigar: null
    }
}) 
export class AddRatingPage extends PageBase {
    public cigar: any;
    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("$timeout") private _timeoutService: ng.ITimeoutService,
        @Inject("navController") private _nav: NavController,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
        this._logService.log("Opened addRating");
    }

    public goToCreateCigar() {
        this._nav.push(CreateCigarPage);
    }

    public ionViewDidEnter(event: ng.IAngularEvent, data: any) {
        this.cigar = data.stateParams.cigar;
        delete data.stateParams.cigar;
        console.log(this.cigar, data.stateParams.cigar);
    }
}