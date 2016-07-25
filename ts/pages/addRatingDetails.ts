import { IonicApplication, SideMenuPage, Inject, PageBase, NavController } from "../app";
import { RatingService } from "../services/RatingService";
import { CreateCigarPage } from "./createCigar";
import { MyRatingsPage } from "./myRatings";

@SideMenuPage(IonicApplication, "mainMenu", "addRatingDetails", {
    url: "/addRatingDetails",
    template: `
        <ion-view view-title="Add Rating">
            <ion-content class="padding">
                <div class="card">
                    <div class="item item-divider">
                        Rating
                    </div>
                    <div class="item item-text-wrap">
                        <five-star-rating ng-init="value = 3;" rating="value" style="font-size: 32px;"></five-star-rating>
                    </div>
                </div>
                <div class="card">
                    <div class="item item-divider">
                        Details
                    </div>
                    <div class="item item-text-wrap">
                        <label class="item item-input">
                            <textarea rows="6" placeholder="Details" ng-model="details"></textarea>
                        </label>
                    </div>
                </div>

                <div class="padding">
                    <button class="button button-block button-positive"
                            ng-disabled="!value || !details"
                            ng-click="$ctrl.save(value, details)">
                        Submit
                    </button>
                </div>
            </ion-content>
        </ion-view>
    `,
    params: {
        cigar: null
    }
}) 
export class AddRatingDetailsPage extends PageBase {
    public cigar: ICigar;

    public searchResults: ICigar[] = null;

    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("$timeout") private _timeoutService: ng.ITimeoutService,
        @Inject("navController") private _nav: NavController,
        @Inject("ratingService") private _ratingService: RatingService,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
        this._logService.log("Opened AddRatingDetailsPage");
    }

    public save(value: number, details: string) {
        const rating = { 
            value: value,
            details: details,
            cigar: this.cigar
        } as IRating;

        this._ratingService.post(rating)
            .then((response) => {
                this._nav.push(MyRatingsPage, null, { historyRoot: true });
            });
    }

    public goToFindCigar() {
        this._nav.pop({
            cigar: this.cigar
        });
    }

    public ionViewWillEnter(event: ng.IAngularEvent, data: any) {
        this.cigar = data.stateParams.cigar;
        data.stateParams.cigar = null;
        this._logService.debug(this.cigar, data.stateParams.cigar);
    }
}