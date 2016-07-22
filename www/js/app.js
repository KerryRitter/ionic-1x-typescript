var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AngularOpenIddict = angular.module("openIddict", []);
AngularOpenIddict.value("openIddictConfig", {});
AngularOpenIddict.service("openIddictHttpService", OpenIddictHttpService);
var OpenIddictHttpService = (function () {
    function OpenIddictHttpService(_httpService, _windowService, _qService, _config) {
        this._httpService = _httpService;
        this._windowService = _windowService;
        this._qService = _qService;
        this._config = _config;
    }
    OpenIddictHttpService.prototype.register = function (username, password) {
        var _this = this;
        return this._qService(function (resolve, reject) {
            return _this._httpService({
                method: "POST",
                url: _this._config.registerUrl,
                data: {
                    username: username,
                    password: password,
                }
            })
                .success(function (data, status, headers, config) {
                if (data.error) {
                    resolve({
                        success: false,
                        messages: [data.error_description]
                    });
                }
                else {
                    _this._windowService.localStorage.setItem("token", JSON.stringify(data));
                    resolve({
                        success: true,
                        messages: null
                    });
                }
            }).error(function (data, status, headers, config) {
                reject(data);
            });
        });
    };
    OpenIddictHttpService.prototype.login = function (username, password) {
        var _this = this;
        return this._qService(function (resolve, reject) {
            return _this._httpService({
                method: "POST",
                url: _this._config.tokenUrl,
                data: {
                    username: username,
                    password: password,
                    grant_type: "password"
                },
                transformRequest: _this.transformToQueryString
            })
                .success(function (data, status, headers, config) {
                if (data.error) {
                    resolve({
                        success: false,
                        messages: [data.error_description]
                    });
                }
                else {
                    _this._windowService.localStorage.setItem("token", JSON.stringify(data));
                    resolve({
                        success: true,
                        messages: null
                    });
                }
            }).error(function (data, status, headers, config) {
                reject(data);
            });
        });
    };
    OpenIddictHttpService.prototype.get = function (url, config) {
        return this._httpService.get(url, this.addTokenHeader(config));
    };
    OpenIddictHttpService.prototype.delete = function (url, config) {
        return this._httpService.delete(url, this.addTokenHeader(config));
    };
    OpenIddictHttpService.prototype.head = function (url, config) {
        return this._httpService.head(url, this.addTokenHeader(config));
    };
    OpenIddictHttpService.prototype.jsonp = function (url, config) {
        return this._httpService.jsonp(url, this.addTokenHeader(config));
    };
    OpenIddictHttpService.prototype.post = function (url, data, config) {
        return this._httpService.post(url, data, this.addTokenHeader(config));
    };
    OpenIddictHttpService.prototype.put = function (url, data, config) {
        return this._httpService.put(url, data, this.addTokenHeader(config));
    };
    OpenIddictHttpService.prototype.patch = function (url, data, config) {
        return this._httpService.patch(url, data, this.addTokenHeader(config));
    };
    OpenIddictHttpService.prototype.addTokenHeader = function (config) {
        if (!config) {
            config = {};
        }
        if (!config.headers) {
            config.headers = {};
        }
        var token = this._windowService.localStorage.getItem("token");
        config.headers["Authorization"] = "Token " + token.access_token;
        config.headers["Content-Type"] = "application/x-www-form-urlencoded";
        return config;
    };
    OpenIddictHttpService.prototype.transformToQueryString = function (obj) {
        var str = [];
        for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    };
    OpenIddictHttpService.$inject = ["$http", "$window", "$q", "openIddictConfig"];
    return OpenIddictHttpService;
}());
/// <reference path="../typings/index.d.ts" />
System.register("ionic-typescript/decorators", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Define parameter injection to constructor or function
     * @param {string} dependency - name of provider to include as
     * @returns {ParameterDecorator}
     */
    function Inject(dependency) {
        return function (target, key, index) {
            target = key ? target[key] : target;
            target.$inject = target.$inject || [];
            target.$inject[index] = dependency;
        };
    }
    exports_1("Inject", Inject);
    /**
     * Define module or service injection requirements.
     * @param {string} requires - 1 or more names of modules to require for module injection or providers to inject to constructor.
     * @returns {ClassDecorator}
     */
    function Requires() {
        var requires = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            requires[_i - 0] = arguments[_i];
        }
        return function (target) {
            target.$inject = requires || [];
        };
    }
    exports_1("Requires", Requires);
    /**
     * Declare angular service as class
     * Use @Requires to declare class requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined service
     * @returns {ClassDecorator}
     */
    function Service(module, name) {
        return function (target) {
            module = resolveModule(module);
            module.service(name, target);
        };
    }
    exports_1("Service", Service);
    /**
     * Declare angular service with decorated factory method.
     * Use @Requires to declare class requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined service
     * @returns {MethodDecorator}
     */
    function ServiceFactory(module, name) {
        return function (target, key) {
            module = resolveModule(module);
            module.service(name, target[key]);
        };
    }
    exports_1("ServiceFactory", ServiceFactory);
    /**
     * Declare angular controller as class.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined controller
     * @returns {ClassDecorator}
     */
    function Controller(module, name) {
        return function (target) {
            module = resolveModule(module);
            module.controller(name, target);
        };
    }
    exports_1("Controller", Controller);
    /**
     * Declare angular factory as factory method.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined factory
     * @returns {MethodDecorator}
     */
    function Factory(module, name) {
        return function (target, key) {
            module = resolveModule(module);
            module.factory(name, target[key]);
        };
    }
    exports_1("Factory", Factory);
    /**
     * Declare angular factory with decorated factory method.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined filter
     * @returns {MethodDecorator}
     */
    function Filter(module, name) {
        return function (target, key) {
            module = resolveModule(module);
            module.filter(name, target[key]);
        };
    }
    exports_1("Filter", Filter);
    /**
     * Declare angular factory as class.
     * New instance of factory decorated class will be instantiated for each injection.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined factory
     * @returns {ClassDecorator}
     */
    function ClassFactory(module, name) {
        return function (target) {
            function factory() {
                var context = Object.create(target.prototype);
                return target.apply(context, arguments);
            }
            factory.$inject = target.$inject || [];
            module = resolveModule(module);
            module.factory(name, factory);
        };
    }
    exports_1("ClassFactory", ClassFactory);
    /**
     * Declare angular directive with decorated class as controller.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which directive should be defined.
     * @param {string} name - name of defined directive.
     * @param {ng.IDirective} [directive] = {} - directive params.
     * @returns {ClassDecorator}
     */
    function Directive(module, name, directive) {
        return function (target) {
            module = resolveModule(module);
            module.directive(name, function () {
                return angular.extend(directive || {}, { controller: target });
            });
        };
    }
    exports_1("Directive", Directive);
    /**
     * Declare angular component with decorated class as controller.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which directive should be defined.
     * @param {string} name - name of defined directive.
     * @param {ng.IDirective} [directive] = {} - directive params.
     * @returns {ClassDecorator}
     */
    function Component(module, name, component) {
        return function (target) {
            module = resolveModule(module);
            module.component(name, angular.extend(component || {}, { controller: target }));
        };
    }
    exports_1("Component", Component);
    /**
     * Declare angular directive with decorated factory method.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which directive should be defined.
     * @param {string} name - name of defined directive.
     * @param {ng.IDirective} [directive] = {} - directive params.
     * @returns {ClassDecorator}
     */
    function DirectiveFactory(module, name) {
        return function (target, key) {
            module = resolveModule(module);
            module.directive(name, target[key]);
        };
    }
    exports_1("DirectiveFactory", DirectiveFactory);
    /**
     * Declare angular service provider with decorated class.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * New instance of provider decorated class will be instantiated once.
     * @param {ng.IModule | string} module - name or instance of angular module in which provider should be defined.
     * @param {string} name - name of defined provider.
     * @returns {ClassDecorator}
     */
    function Provider(module, name) {
        return function (target) {
            module = resolveModule(module);
            module.provider(name, target);
        };
    }
    exports_1("Provider", Provider);
    /**
     * Declare angular service provider with decorated factory method.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which provider should be defined.
     * @param {string} name - name of defined directive.
     * @returns {MethodDecorator}
     */
    function ProviderFactory(module, name) {
        return function (target, key) {
            module = resolveModule(module);
            module.provider(name, target[key]);
        };
    }
    exports_1("ProviderFactory", ProviderFactory);
    /**
     * Declare angular constant provider with decorated class.
     * Injections are unavailable for this type of providers.
     * @param {ng.IModule | string} module - name or instance of angular module in which constant should be defined.
     * @param {string} name - name of defined constant.
     * @returns {MethodDecorator}
     */
    function Constant(module, name) {
        return function (target) {
            module = resolveModule(module);
            module.constant(name, new target());
        };
    }
    exports_1("Constant", Constant);
    /**
     * Declare angular value provider with decorated class.
     * Injections are unavailable for this type of providers.
     * @param {ng.IModule | string} module - name or instance of angular module in which value should be defined.
     * @param {string} name - name of defined value.
     * @returns {MethodDecorator}
     */
    function Value(module, name) {
        return function (target) {
            module = resolveModule(module);
            module.value(name, new target());
        };
    }
    exports_1("Value", Value);
    /**
     * Declare angular config clause with decorated class. New instance of decorated class will be instantiated inside config clause.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * Only providers as constants able to be injected at config stage.
     * @param {ng.IModule | string} module - name or instance of angular module in which config clause should be defined.
     * @returns {ClassDecorator}
     */
    function Config(module) {
        return function (target) {
            function config() {
                var context = Object.create(target.prototype);
                target.apply(context, arguments);
            }
            config.$inject = target.$inject || [];
            module = resolveModule(module);
            module.config(config);
        };
    }
    exports_1("Config", Config);
    /**
     * Declare angular run clause with decorated class. New instance of decorated class will be instantiated inside run clause.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which run clause should be defined.
     * @returns {ClassDecorator}
     */
    function Run(module) {
        return function (target) {
            function run() {
                var context = Object.create(target.prototype);
                target.apply(context, arguments);
            }
            run.$inject = target.$inject || [];
            module = resolveModule(module);
            module.run(run);
        };
    }
    exports_1("Run", Run);
    /**
     * Declare angular module with given name.
     * Use @Requires to declare requirements.
     * Note: @Requires decorator should be put next line to the @Module.
     * Note: angular module instance will be passed to constructor.
     * @param {string} name - name of module.
     * @returns {ClassDecorator}
     */
    function Module(name) {
        return function (target) {
            target.$name = name;
            new target(angular.module(name, target.$inject || []));
        };
    }
    exports_1("Module", Module);
    /**
     * Declare angular module with given name.
     * Use @Requires to declare requirements.
     * Note: @Requires decorator should be put next line to the @App.
     * Note: If module already defined it will be used to bootstrap aplication.
     * Note: angular module instance will be passed to constructor.
     * @param {string} name - name of module.
     * @returns {ClassDecorator}
     */
    function App(element, name) {
        if (element === void 0) { element = document; }
        return function (target) {
            var module;
            target.$name = name;
            try {
                module = angular.module(name);
            }
            catch (err) {
                module = angular.module(name, target.$inject || []);
            }
            new target(angular.module(name, target.$inject || []));
            function bootstrap() {
                angular.bootstrap(element, [target.$name]);
            }
            if (window.$bootstrap) {
                window.$bootstrap.then(bootstrap);
            }
            else {
                angular.element(element).ready(bootstrap);
            }
        };
    }
    exports_1("App", App);
    /**
     * Declare UIRouter state with decorated class as controller.
     * @link https://angular-ui.github.io/ui-router/site/#/api/ui.router
     * Note: controllerAs: $ctrl - User $ctrl for binding to controller in templates
     * @param {ng.IModule | string} module - name or instance of angular module in which config clause should be defined.
     * @param {string} stateName - name of UIRouter state state.
     * @param {ng.ui.IState} [config = {}] - state config params.
     * @returns {ClassDecorator}
     */
    function Page(module, stateName, config) {
        if (config === void 0) { config = {}; }
        return function (target) {
            module = resolveModule(module);
            module.config(['$stateProvider', function ($stateProvider) {
                    $stateProvider
                        .state(stateName, angular.extend({
                        controller: target,
                        controllerAs: '$ctrl'
                    }, config));
                }]);
        };
    }
    exports_1("Page", Page);
    function AbstractPage(module, stateName, config) {
        if (config === void 0) { config = {}; }
        return function (target) {
            module = resolveModule(module);
            module.config(['$stateProvider', function ($stateProvider) {
                    $stateProvider
                        .state(stateName, angular.extend({
                        controller: target,
                        controllerAs: '$ctrl'
                    }, config));
                }]);
        };
    }
    exports_1("AbstractPage", AbstractPage);
    function resolveModule(module) {
        return (angular.isString(module)
            ? angular.module(module)
            : module);
    }
    return {
        setters:[],
        execute: function() {
        }
    }
});
/// <reference path="typings.d.ts" />
System.register("ts/app", ["ionic-typescript/decorators"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var decorators_1;
    var IonicApplication, IonicApplicationRun;
    var exportedNames_1 = {
        'IonicApplication': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_2(exports);
    }
    return {
        setters:[
            function (decorators_2_1) {
                exportStar_1(decorators_2_1);
                decorators_1 = decorators_2_1;
            }],
        execute: function() {
            exports_2("IonicApplication", IonicApplication = angular.module("app", ["ionic", "openIddict"]));
            IonicApplication.config(["$urlRouterProvider", function ($urlRouterProvider) {
                    $urlRouterProvider.otherwise("/login");
                }]);
            IonicApplicationRun = (function () {
                function IonicApplicationRun(ionicPlatform, openIddictConfig) {
                    this.ionicPlatform = ionicPlatform;
                    this.openIddictConfig = openIddictConfig;
                    openIddictConfig.scope = "email profile";
                    openIddictConfig.registerUrl = "http://localhost:5000/api/account";
                    openIddictConfig.tokenUrl = "http://localhost:5000/connect/token";
                    ionicPlatform.ready(function () {
                        if (window.cordova && window.cordova.plugins.Keyboard) {
                            window.cordova.plugins.hideKeyboardAccessoryBar(true);
                            window.cordova.plugins.disableScroll(true);
                        }
                        if (window.StatusBar) {
                            window.StatusBar.styleDefault();
                        }
                    });
                }
                IonicApplicationRun = __decorate([
                    decorators_1.Run(IonicApplication),
                    __param(0, decorators_1.Inject("$ionicPlatform")),
                    __param(1, decorators_1.Inject("openIddictConfig")), 
                    __metadata('design:paramtypes', [Object, Object])
                ], IonicApplicationRun);
                return IonicApplicationRun;
            }());
        }
    }
});
System.register("ts/pages/forgotPassword", ["ts/app"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var app_1;
    var ForgotPasswordController;
    return {
        setters:[
            function (app_1_1) {
                app_1 = app_1_1;
            }],
        execute: function() {
            ForgotPasswordController = (function () {
                function ForgotPasswordController() {
                }
                ForgotPasswordController.prototype.forgotPassword = function (name) {
                    console.log(name);
                };
                ForgotPasswordController = __decorate([
                    app_1.Page(app_1.IonicApplication, "register", {
                        template: "\n        <ion-view title=\"Register\">\n            <ion-nav-bar class=\"bar-balanced\">\n                <ion-nav-back-button>\n                </ion-nav-back-button>\n            </ion-nav-bar>\n            <ion-content padding=\"true\" scroll=\"false\">\n                <label class=\"item item-input\" style=\"margin-bottom: 40px;\">\n                    <span class=\"input-label\">Name</span>\n                    <input type=\"text\" ng-model=\"name\">\n                </label>\n                <button type=\"submit\" class=\"button button-calm button-block\" ng-click=\"$ctrl.forgotPassword(name)\">\n                    Login\n                </button>\n            </ion-content>\n        </ion-view>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ForgotPasswordController);
                return ForgotPasswordController;
            }());
            exports_3("ForgotPasswordController", ForgotPasswordController);
        }
    }
});
System.register("ts/pages/login", ["ts/app"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var app_2;
    var LoginController;
    return {
        setters:[
            function (app_2_1) {
                app_2 = app_2_1;
            }],
        execute: function() {
            LoginController = (function () {
                function LoginController(_logService, _openIddictHttpService) {
                    this._logService = _logService;
                    this._openIddictHttpService = _openIddictHttpService;
                }
                LoginController.prototype.login = function (username, password) {
                    this._openIddictHttpService.login(username, password)
                        .then(function (response) {
                        console.log(response);
                    })
                        .catch(function (response) {
                        console.log(response);
                    });
                };
                LoginController = __decorate([
                    app_2.Page(app_2.IonicApplication, "login", {
                        url: "/login",
                        template: "\n        <ion-view title=\"Login\">\n            <ion-nav-bar class=\"bar-balanced\">\n                <ion-nav-back-button>\n                </ion-nav-back-button>\n            </ion-nav-bar>\n            <ion-content padding=\"true\" scroll=\"false\">\n                <label class=\"item item-input\" style=\"margin-bottom: 40px;\">\n                    <span class=\"input-label\">Name</span>\n                    <input type=\"text\" ng-model=\"name\">\n                </label>\n                <label class=\"item item-input\" style=\"margin-bottom: 40px;\">\n                    <span class=\"input-label\">Password</span>\n                    <input type=\"password\" ng-model=\"password\">\n                </label>\n                <button type=\"submit\" class=\"button button-calm button-block\" ng-click=\"$ctrl.login(name, password)\">\n                    Login\n                </button>\n            </ion-content>\n        </ion-view>\n    "
                    }),
                    __param(0, app_2.Inject("$log")),
                    __param(1, app_2.Inject("openIddictHttpService")), 
                    __metadata('design:paramtypes', [Object, Object])
                ], LoginController);
                return LoginController;
            }());
            exports_4("LoginController", LoginController);
        }
    }
});
System.register("ts/pages/register", ["ts/app"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var app_3;
    var RegisterController;
    return {
        setters:[
            function (app_3_1) {
                app_3 = app_3_1;
            }],
        execute: function() {
            RegisterController = (function () {
                function RegisterController(_logService, _openIddictHttpService) {
                    this._logService = _logService;
                    this._openIddictHttpService = _openIddictHttpService;
                }
                RegisterController.prototype.register = function (username, password) {
                    this._openIddictHttpService.register(username, password)
                        .then(function (response) {
                        console.log(response);
                    })
                        .catch(function (response) {
                        console.log(response);
                    });
                };
                RegisterController = __decorate([
                    app_3.Page(app_3.IonicApplication, "register", {
                        template: "\n        <ion-view title=\"Register\">\n            <ion-nav-bar class=\"bar-balanced\">\n                <ion-nav-back-button>\n                </ion-nav-back-button>\n            </ion-nav-bar>\n            <ion-content padding=\"true\" scroll=\"false\">\n                <label class=\"item item-input\" style=\"margin-bottom: 40px;\">\n                    <span class=\"input-label\">Name</span>\n                    <input type=\"text\" ng-model=\"name\">\n                </label>\n                <label class=\"item item-input\" style=\"margin-bottom: 40px;\">\n                    <span class=\"input-label\">Password</span>\n                    <input type=\"password\" ng-model=\"password\">\n                </label>\n                <button type=\"submit\" class=\"button button-calm button-block\" ng-click=\"$ctrl.register(name, password)\">\n                    Register\n                </button>\n            </ion-content>\n        </ion-view>\n    ",
                    }),
                    __param(0, app_3.Inject("$log")),
                    __param(1, app_3.Inject("openIddictHttpService")), 
                    __metadata('design:paramtypes', [Object, Object])
                ], RegisterController);
                return RegisterController;
            }());
            exports_5("RegisterController", RegisterController);
        }
    }
});
