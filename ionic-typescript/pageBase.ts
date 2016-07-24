export interface IPage {
    __stateName?: string;
}

export abstract class PageBase implements IPage {
    public constructor(
        private scope: ng.IScope
    ) {
        scope.$on("$ionicView.loaded", this.ionViewLoaded);
        scope.$on("$ionicView.enter", this.ionViewDidEnter);
        scope.$on("$ionicView.leave", this.ionViewDidLeave);
        scope.$on("$ionicView.beforeEnter", this.ionViewWillEnter);
        scope.$on("$ionicView.beforeLeave", this.ionViewWillLeave);
        scope.$on("$ionicView.unloaded", this.ionViewDidUnload);
    }

    public ionViewLoaded(event: ng.IAngularEvent, data: any) {
        return null;
    }

    public ionViewDidEnter(event: ng.IAngularEvent, data: any) {
        return null;
    }

    public ionViewDidLeave(event: ng.IAngularEvent, data: any) {
        return null;
    }

    public ionViewWillEnter(event: ng.IAngularEvent, data: any) {
        return null;
    }

    public ionViewWillLeave(event: ng.IAngularEvent, data: any) {
        return null;
    }

    public ionViewDidUnload(event: ng.IAngularEvent, data: any) {
        return null;
    }
}