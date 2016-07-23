declare namespace IonicTypescript {
    interface ISideMenuConfig extends ng.ui.IState {
        menuHeaderBarClass: string;
        menuHeaderBarTitle: string;
        navBarClass: string;
        menuTriggerButtonClass: string;
    }

    interface IPage {
        __stateName?: string;
    }

    interface ISideMenu {
        __menuStateName?: string;
    }
}