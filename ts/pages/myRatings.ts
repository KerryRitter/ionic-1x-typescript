import { IonicApplication, SideMenuPage, Inject, PageBase, NavController } from "../app";
import { RatingService } from "../services/ratingService";
import { ViewRatingPage } from "./viewRating";

@SideMenuPage(IonicApplication, "mainMenu", "myRatings", {
    url: "/myRatings",
    template: `
        <ion-view view-title="My Ratings">
            <ion-content class="padding">
                <ion-list>
                    <ion-item collection-repeat="rating in $ctrl.ratings" ng-click="$ctrl.goToViewRating(rating)">
                        {{rating.cigar.brand}} - {{rating.cigar.name}}
                        <five-star-rating rating="rating.value" readonly="true" style="float: right;"></five-star-rating>
                    </ion-item>
                </ion-list>
            </ion-content>
        </ion-view>
    `
}) 
export class MyRatingsPage extends PageBase {
    public ratings: IRating[] = [];

    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("navController") private _nav: NavController,
        @Inject("ratingService") private _ratingService: RatingService,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
        this._logService.log("Opened myRating");
    }

    public goToViewRating(rating: IRating) {
        this._nav.push(ViewRatingPage, { rating: rating });
    }

    public ionViewDidEnter() {
        this._ratingService.get()
            .then((response) => {
                this.ratings = response.data;
            });
    }
}