import resolveModule from "../resolveModule";

function getTemplateWrapper(config: IonicTypescript.SideMenuConfig) {
    return `<ion-side-menus enable-menu-with-back-views="false">
                <ion-side-menu-content>
                    <ion-nav-bar class="${config.navBarClass}">
                        <ion-nav-back-button>
                        </ion-nav-back-button>
                        <ion-nav-buttons side="left">
                            <button class="button button-icon button-clear ion-navicon" menu-toggle="left"></button>
                        </ion-nav-buttons>
                    </ion-nav-bar>
                    <ion-nav-view name="menuContent"></ion-nav-view>
                </ion-side-menu-content>
                <ion-side-menu side="left">
                    <ion-header-bar class="${config.menuHeaderBarClass}">
                        <h1 class="title">${config.menuHeaderBarTitle}</h1>
                    </ion-header-bar>
                    <ion-content>
                        ${config.template}
                    </ion-content>
                </ion-side-menu>
            </ion-side-menus>`;
}

export function SideMenu(module: ng.IModule | string, stateName: string, config: IonicTypescript.SideMenuConfig = {}) {
    return function (target: Function) {
        module = resolveModule(module);
        (module as ng.IModule).config(["$stateProvider", ($stateProvider: ng.ui.IStateProvider) => {
            config.template = getTemplateWrapper(config);

            $stateProvider.state(stateName, angular.extend({
                abstract: true,
                controller: target,
                controllerAs: "$ctrl"
            }, config as ng.ui.IState));
        }]);
    };
}