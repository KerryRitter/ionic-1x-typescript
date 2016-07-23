namespace IonicTypescript {
    export class NavController {
        public static $inject = ["$state", "$ionicHistory"];

        public constructor(
            public state: ng.ui.IStateService,
            public history: ionic.navigation.IonicHistoryService
        ) {
        }

        public push(page: IonicTypescript.IPage, params: any, options?: ionic.navigation.IonicHistoryNextViewOptions) {
            if (options) {
                this.history.nextViewOptions(options)
            }
            this.state.go(page.__stateName, params);
        }

        public pop(backCount?: number) {
            this.history.goBack(backCount);
        }
    }
}