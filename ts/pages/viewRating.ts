import { IonicApplication, SideMenuPage, Inject, PageBase, NavController } from "../app";
import { RatingService } from "../services/ratingService";

@SideMenuPage(IonicApplication, "mainMenu", "viewRating", {
    url: "/viewRating",
    template: `
        <ion-view view-title="View Rating">
            <ion-content class="padding">
                <div class="card">
                    <div class="item item-divider">
                        Rating
                    </div>
                    <div class="item item-text-wrap">
                        <five-star-rating readonly="true" rating="$ctrl.rating.value" style="font-size: 32px;"></five-star-rating>
                    </div>
                </div>

                <div class="card">
                    <div class="item item-divider">
                        Details
                    </div>
                    <div class="item item-text-wrap">
                        {{$ctrl.rating.details}}
                    </div>
                </div>

                <div>
                    Last updated {{$ctrl.lastModifiedDisplay}}
                </div>

                <button class="button button-assertive button-positive"
                    ng-click="$ctrl.delete()">
                    Delete Rating
                </button>
            </ion-content>
        </ion-view>
    `,
    params: {
        rating: null
    }
}) 
export class ViewRatingPage extends PageBase {
    public rating: IRating;

    public searchResults: ICigar[] = null;

    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("navController") private _nav: NavController,
        @Inject("ratingService") private _ratingService: RatingService,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
        this._logService.log("Opened ViewRatingDetailsPage");
    }

    public get lastModifiedDisplay(): string {
        if (!this.rating) {
            return "";
        }

        const lastModifiedMoment = (window as any).moment(this.rating.lastModifiedAt);

        if (lastModifiedMoment > (window as any).moment().subtract(7, "days")) {
            return lastModifiedMoment.fromNow();
        }

        return `at ${lastModifiedMoment.format("MMMM Do YYYY, h:mm a")}`;
    }

    public delete() {
        if (confirm("Are you sure?")) {
            this._ratingService.delete(this.rating)
                .then((response) => {
                    this._nav.pop();
                });
        }
    }

    public ionViewWillEnter(event: ng.IAngularEvent, data: any) {
        this.rating = data.stateParams.rating;
        data.stateParams.rating = null;
        this._logService.debug(this.rating, data.stateParams.rating);
    }
}