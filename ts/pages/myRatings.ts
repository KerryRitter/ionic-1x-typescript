import { IonicApplication, SideMenuPage, Inject, PageBase } from "../app";
import { RatingService } from "../services/ratingService";

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
    public ratings: IRating[] = [];

    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("ratingService") private _ratingService: RatingService,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
        this._logService.log("Opened myRating");
    }

    public ionViewDidEnter() {
        this._ratingService.get()
            .then((response) => {
                this.ratings = response.data;
            });
    }
}