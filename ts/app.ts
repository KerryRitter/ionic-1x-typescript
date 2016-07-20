/// <reference path="typings.d.ts" />

export * from "../ionic-typescript/decorators";
import { App, Requires, Run, Inject } from "../ionic-typescript/decorators";
import { OpenIddictHttpService } from "../angular-openiddict/openIddictHttpService";

export const IonicApplication = angular.module("app", ["ionic"]);

IonicApplication.service("openIddictHttpService", OpenIddictHttpService);
IonicApplication.constant("openIddictHttpServiceSettings", {
    
} as IOpenIddictHttpServiceSettings);

@Run(IonicApplication)
class IonicApplicationConfig {
    constructor(
        @Inject("$ionicPlatform") private ionicPlatform: ionic.platform.IonicPlatformService
    ) {
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