import {IPage} from "./pageBase";

export class NavController {
    public static $inject = ["$state", "$ionicHistory"];

    public constructor(
        public state: ng.ui.IStateService,
        public history: ionic.navigation.IonicHistoryService
    ) {
    }

    public push(page: IPage, params?: any, options?: ionic.navigation.IonicHistoryNextViewOptions) {
        if (options) {
            this.history.nextViewOptions(options);
        }

        console.log(this.state.get(), page);

        this.state.go(page.__stateName, params);
    }

    public pop(params?: any, options?: ionic.navigation.IonicHistoryNextViewOptions) {
        if (options) {
            this.history.nextViewOptions(options);
        }

        this.history.goBack(1);
    }

    public popMany(backCount?: number) {
        this.history.goBack(backCount);
    }
}