import { IonicApplication, SideMenuPage, Inject, PageBase, NavController } from "../app";
import { CigarService } from "../services/cigarService";
import { CreateCigarPage } from "./createCigar";
import { AddRatingDetailsPage } from "./addRatingDetails";

@SideMenuPage(IonicApplication, "mainMenu", "findCigar", {
    url: "/findCigar",
    template: `
        <ion-view view-title="Add Rating">
            <ion-content class="padding">
                <label class="item item-input item-floating-label">
                    <span class="input-label">Search for Cigar</span>
                    <input type="text" 
                        placeholder="Search for Cigar" 
                        ng-model="searchQuery" 
                        ng-model-options="{ debounce: 300 }"
                        ng-change="$ctrl.search(searchQuery)">
                </label>
                
                <ion-list>
                    <ion-item collection-repeat="searchResult in $ctrl.searchResults"
                        ng-click="$ctrl.selectCigar(searchResult)">
                        {{searchResult.brand}} - {{searchResult.name}}
                    </ion-item>

                    <ion-item ng-show="$ctrl.searchResults != null && $ctrl.searchResults.length === 0"
                            class="energized">
                        Sorry, we couldn't find any results!
                    </ion-item>
                </ion-list>
                
                <div class="padding" ng-show="$ctrl.searchResults != null">
                    <button class="button button-block button-energized button-small"
                            ng-click="$ctrl.goToCreateCigar()">
                        Can't find your cigar? Add it!
                    </button>
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
export class FindCigarPage extends PageBase {
    public cigar: ICigar;

    public searchResults: ICigar[] = null;

    public constructor(
        @Inject("$log") private _logService: ng.ILogService,
        @Inject("$timeout") private _timeoutService: ng.ITimeoutService,
        @Inject("navController") private _nav: NavController,
        @Inject("cigarService") private _cigarService: CigarService,
        @Inject("$scope") scope: ng.IScope
    ) {
        super(scope);
        this._logService.log("Opened FindCigarPage");
    }

    public search(searchQuery: string) {
        this._cigarService.get(searchQuery)
            .then((response) => {
                this.searchResults = response.data;
            });
    }

    public selectCigar(cigar: ICigar) {
        this._nav.push(AddRatingDetailsPage, {
            cigar: cigar
        });
    }

    public goToCreateCigar() {
        this._nav.push(CreateCigarPage);
    }

    public ionViewWillEnter(event: ng.IAngularEvent, data: any) {
        if (data.stateParams.cigar) {
            this.cigar = data.stateParams.cigar;
        }
        this._logService.debug(this.cigar, data.stateParams.cigar);
    }
}