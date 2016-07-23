/// <reference path="typings.d.ts" />

export * from "../ionic-typescript/decorators";
import {App, Requires, Run, Inject} from "../ionic-typescript/decorators";

export const IonicApplication = angular.module("app", ["ionic", "openIddict"]);

IonicApplication.config(["$urlRouterProvider", function ($urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");
}]);

@Run(IonicApplication)
class IonicApplicationRun {
    constructor(
        @Inject("$ionicPlatform") private ionicPlatform: ionic.platform.IonicPlatformService,
        @Inject("openIddictConfig") private openIddictConfig: openIddict.IOpenIddictConfig
    ) {
        openIddictConfig.scope = "email profile";
        openIddictConfig.registerUrl = "http://localhost:5000/api/account";
        openIddictConfig.tokenUrl = "http://localhost:5000/connect/token";

        ionicPlatform.ready(function() {
            if (window.cordova && (window.cordova.plugins as any).Keyboard) {
                (window.cordova.plugins as any).hideKeyboardAccessoryBar(true);
                (window.cordova.plugins as any).disableScroll(true);
            }

            if ((window as any).StatusBar) {
                (window as any).StatusBar.styleDefault();
            }
        });
    }
}