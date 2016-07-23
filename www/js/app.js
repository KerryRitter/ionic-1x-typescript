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
AngularOpenIddict.value("openIddictConfig", {});
AngularOpenIddict.service("openIddictHttpService", OpenIddictHttpService);
System.register("angular-openiddict/openIddictHttpService", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OpenIddictHttpService;
    return {
        setters:[],
        execute: function() {
            OpenIddictHttpService = (function () {
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
            exports_1("OpenIddictHttpService", OpenIddictHttpService);
        }
    }
});
System.register("ionic-typescript/resolveModule", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function resolveModule(module) {
        return (angular.isString(module)
            ? angular.module(module)
            : module);
    }
    exports_2("default", resolveModule);
    return {
        setters:[],
        execute: function() {
            ;
        }
    }
});
System.register("ionic-typescript/decorators/app", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
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
    exports_3("App", App);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/classFactory", ["ionic-typescript/resolveModule"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var resolveModule_1;
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
            module = resolveModule_1.default(module);
            module.factory(name, factory);
        };
    }
    exports_4("ClassFactory", ClassFactory);
    return {
        setters:[
            function (resolveModule_1_1) {
                resolveModule_1 = resolveModule_1_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/component", ["ionic-typescript/resolveModule"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var resolveModule_2;
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
            module = resolveModule_2.default(module);
            module.component(name, angular.extend(component || {}, { controller: target }));
        };
    }
    exports_5("Component", Component);
    return {
        setters:[
            function (resolveModule_2_1) {
                resolveModule_2 = resolveModule_2_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/config", ["ionic-typescript/resolveModule"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var resolveModule_3;
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
            module = resolveModule_3.default(module);
            module.config(config);
        };
    }
    exports_6("Config", Config);
    return {
        setters:[
            function (resolveModule_3_1) {
                resolveModule_3 = resolveModule_3_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/constant", ["ionic-typescript/resolveModule"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var resolveModule_4;
    /**
     * Declare angular constant provider with decorated class.
     * Injections are unavailable for this type of providers.
     * @param {ng.IModule | string} module - name or instance of angular module in which constant should be defined.
     * @param {string} name - name of defined constant.
     * @returns {MethodDecorator}
     */
    function Constant(module, name) {
        return function (target) {
            module = resolveModule_4.default(module);
            module.constant(name, new target());
        };
    }
    exports_7("Constant", Constant);
    return {
        setters:[
            function (resolveModule_4_1) {
                resolveModule_4 = resolveModule_4_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/controller", ["ionic-typescript/resolveModule"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var resolveModule_5;
    /**
     * Declare angular controller as class.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined controller
     * @returns {ClassDecorator}
     */
    function Controller(module, name) {
        return function (target) {
            module = resolveModule_5.default(module);
            module.controller(name, target);
        };
    }
    exports_8("Controller", Controller);
    return {
        setters:[
            function (resolveModule_5_1) {
                resolveModule_5 = resolveModule_5_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/directive", ["ionic-typescript/resolveModule"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var resolveModule_6;
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
            module = resolveModule_6.default(module);
            module.directive(name, function () {
                return angular.extend(directive || {}, { controller: target });
            });
        };
    }
    exports_9("Directive", Directive);
    return {
        setters:[
            function (resolveModule_6_1) {
                resolveModule_6 = resolveModule_6_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/directiveFactory", ["ionic-typescript/resolveModule"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var resolveModule_7;
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
            module = resolveModule_7.default(module);
            module.directive(name, target[key]);
        };
    }
    exports_10("DirectiveFactory", DirectiveFactory);
    return {
        setters:[
            function (resolveModule_7_1) {
                resolveModule_7 = resolveModule_7_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/factory", ["ionic-typescript/resolveModule"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var resolveModule_8;
    /**
     * Declare angular factory as factory method.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined factory
     * @returns {MethodDecorator}
     */
    function Factory(module, name) {
        return function (target, key) {
            module = resolveModule_8.default(module);
            module.factory(name, target[key]);
        };
    }
    exports_11("Factory", Factory);
    return {
        setters:[
            function (resolveModule_8_1) {
                resolveModule_8 = resolveModule_8_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/filter", ["ionic-typescript/resolveModule"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var resolveModule_9;
    /**
     * Declare angular factory with decorated factory method.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined filter
     * @returns {MethodDecorator}
     */
    function Filter(module, name) {
        return function (target, key) {
            module = resolveModule_9.default(module);
            module.filter(name, target[key]);
        };
    }
    exports_12("Filter", Filter);
    return {
        setters:[
            function (resolveModule_9_1) {
                resolveModule_9 = resolveModule_9_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/inject", [], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
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
    exports_13("Inject", Inject);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/module", [], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
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
    exports_14("Module", Module);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/page", ["ionic-typescript/resolveModule"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var resolveModule_10;
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
            module = resolveModule_10.default(module);
            module.config(["$stateProvider", function ($stateProvider) {
                    window.x = $stateProvider;
                    $stateProvider
                        .state(stateName, angular.extend({
                        controller: target,
                        controllerAs: "$ctrl"
                    }, config));
                }]);
        };
    }
    exports_15("Page", Page);
    return {
        setters:[
            function (resolveModule_10_1) {
                resolveModule_10 = resolveModule_10_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/provider", ["ionic-typescript/resolveModule"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var resolveModule_11;
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
            module = resolveModule_11.default(module);
            module.provider(name, target);
        };
    }
    exports_16("Provider", Provider);
    return {
        setters:[
            function (resolveModule_11_1) {
                resolveModule_11 = resolveModule_11_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/providerFactory", ["ionic-typescript/resolveModule"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var resolveModule_12;
    /**
     * Declare angular service provider with decorated factory method.
     * Use @Requires to declare requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which provider should be defined.
     * @param {string} name - name of defined directive.
     * @returns {MethodDecorator}
     */
    function ProviderFactory(module, name) {
        return function (target, key) {
            module = resolveModule_12.default(module);
            module.provider(name, target[key]);
        };
    }
    exports_17("ProviderFactory", ProviderFactory);
    return {
        setters:[
            function (resolveModule_12_1) {
                resolveModule_12 = resolveModule_12_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/requires", [], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
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
    exports_18("Requires", Requires);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/run", ["ionic-typescript/resolveModule"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var resolveModule_13;
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
            module = resolveModule_13.default(module);
            module.run(run);
        };
    }
    exports_19("Run", Run);
    return {
        setters:[
            function (resolveModule_13_1) {
                resolveModule_13 = resolveModule_13_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/service", ["ionic-typescript/resolveModule"], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var resolveModule_14;
    /**
     * Declare angular service as class
     * Use @Requires to declare class requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined service
     * @returns {ClassDecorator}
     */
    function Service(module, name) {
        return function (target) {
            module = resolveModule_14.default(module);
            module.service(name, target);
        };
    }
    exports_20("Service", Service);
    return {
        setters:[
            function (resolveModule_14_1) {
                resolveModule_14 = resolveModule_14_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/serviceFactory", ["ionic-typescript/resolveModule"], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var resolveModule_15;
    /**
     * Declare angular service with decorated factory method.
     * Use @Requires to declare class requirements or @Inject in case of parameter based requirement declaration.
     * @param {ng.IModule | string} module - name or instance of angular module in which service should be defined.
     * @param {string} name - name of defined service
     * @returns {MethodDecorator}
     */
    function ServiceFactory(module, name) {
        return function (target, key) {
            module = resolveModule_15.default(module);
            module.service(name, target[key]);
        };
    }
    exports_21("ServiceFactory", ServiceFactory);
    return {
        setters:[
            function (resolveModule_15_1) {
                resolveModule_15 = resolveModule_15_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/sideMenu", ["ionic-typescript/resolveModule"], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var resolveModule_16;
    function getTemplateWrapper(config) {
        config.navBarClass = config.navBarClass ? config.navBarClass : "bar-positive";
        config.menuTriggerButtonClass = config.menuTriggerButtonClass ? config.menuTriggerButtonClass : "button-clear";
        config.menuHeaderBarClass = config.menuHeaderBarClass ? config.menuHeaderBarClass : "bar-stable";
        config.menuHeaderBarTitle = config.menuHeaderBarTitle ? config.menuHeaderBarTitle : "Menu";
        return "<ion-side-menus enable-menu-with-back-views=\"false\">\n                <ion-side-menu-content>\n                    <ion-nav-bar class=\"" + config.navBarClass + "\">\n                        <ion-nav-back-button>\n                        </ion-nav-back-button>\n                        <ion-nav-buttons side=\"left\">\n                            <button class=\"button button-icon ion-navicon " + config.menuTriggerButtonClass + "\" menu-toggle=\"left\"></button>\n                        </ion-nav-buttons>\n                    </ion-nav-bar>\n                    <ion-nav-view name=\"menuContent\"></ion-nav-view>\n                </ion-side-menu-content>\n                <ion-side-menu side=\"left\" enable-menu-with-back-views=\"true\">\n                    <ion-header-bar class=\"" + config.menuHeaderBarClass + "\">\n                        <h1 class=\"title\">" + config.menuHeaderBarTitle + "</h1>\n                    </ion-header-bar>\n                    <ion-content>\n                        " + config.template + "\n                    </ion-content>\n                </ion-side-menu>\n            </ion-side-menus>";
    }
    function SideMenu(module, stateName, config) {
        return function (target) {
            module = resolveModule_16.default(module);
            module.config(["$stateProvider", function ($stateProvider) {
                    config.template = getTemplateWrapper(config);
                    $stateProvider.state(stateName, angular.extend({
                        abstract: true,
                        controller: target,
                        controllerAs: "$ctrl"
                    }, config));
                }]);
        };
    }
    exports_22("SideMenu", SideMenu);
    return {
        setters:[
            function (resolveModule_16_1) {
                resolveModule_16 = resolveModule_16_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/sideMenuPage", ["ionic-typescript/resolveModule"], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var resolveModule_17;
    /**
     * Declare UIRouter state with decorated class as controller.
     * @link https://angular-ui.github.io/ui-router/site/#/api/ui.router
     * Note: controllerAs: $ctrl - User $ctrl for binding to controller in templates
     * @param {ng.IModule | string} module - name or instance of angular module in which config clause should be defined.
     * @param {string} stateName - name of UIRouter state state.
     * @param {ng.ui.IState} [config = {}] - state config params.
     * @returns {ClassDecorator}
     */
    function SideMenuPage(module, stateName, config) {
        if (config === void 0) { config = {}; }
        return function (target) {
            module = resolveModule_17.default(module);
            module.config(["$stateProvider", function ($stateProvider) {
                    var url = (" " + config.url).slice(1);
                    delete config.url;
                    $stateProvider.state(stateName, {
                        url: url,
                        views: {
                            menuContent: angular.extend({
                                controller: target,
                                controllerAs: "$ctrl"
                            }, config)
                        }
                    });
                }]);
        };
    }
    exports_23("SideMenuPage", SideMenuPage);
    return {
        setters:[
            function (resolveModule_17_1) {
                resolveModule_17 = resolveModule_17_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/value", ["ionic-typescript/resolveModule"], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var resolveModule_18;
    /**
     * Declare angular value provider with decorated class.
     * Injections are unavailable for this type of providers.
     * @param {ng.IModule | string} module - name or instance of angular module in which value should be defined.
     * @param {string} name - name of defined value.
     * @returns {MethodDecorator}
     */
    function Value(module, name) {
        return function (target) {
            module = resolveModule_18.default(module);
            module.value(name, new target());
        };
    }
    exports_24("Value", Value);
    return {
        setters:[
            function (resolveModule_18_1) {
                resolveModule_18 = resolveModule_18_1;
            }],
        execute: function() {
        }
    }
});
System.register("ionic-typescript/decorators/index", ["ionic-typescript/decorators/app", "ionic-typescript/decorators/classFactory", "ionic-typescript/decorators/component", "ionic-typescript/decorators/config", "ionic-typescript/decorators/constant", "ionic-typescript/decorators/controller", "ionic-typescript/decorators/directive", "ionic-typescript/decorators/directiveFactory", "ionic-typescript/decorators/factory", "ionic-typescript/decorators/filter", "ionic-typescript/decorators/inject", "ionic-typescript/decorators/module", "ionic-typescript/decorators/page", "ionic-typescript/decorators/provider", "ionic-typescript/decorators/providerFactory", "ionic-typescript/decorators/requires", "ionic-typescript/decorators/run", "ionic-typescript/decorators/service", "ionic-typescript/decorators/serviceFactory", "ionic-typescript/decorators/sideMenu", "ionic-typescript/decorators/sideMenuPage", "ionic-typescript/decorators/value"], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    return {
        setters:[
            function (app_1_1) {
                exports_25({
                    "App": app_1_1["App"]
                });
            },
            function (classFactory_1_1) {
                exports_25({
                    "ClassFactory": classFactory_1_1["ClassFactory"]
                });
            },
            function (component_1_1) {
                exports_25({
                    "Component": component_1_1["Component"]
                });
            },
            function (config_1_1) {
                exports_25({
                    "Config": config_1_1["Config"]
                });
            },
            function (constant_1_1) {
                exports_25({
                    "Constant": constant_1_1["Constant"]
                });
            },
            function (controller_1_1) {
                exports_25({
                    "Controller": controller_1_1["Controller"]
                });
            },
            function (directive_1_1) {
                exports_25({
                    "Directive": directive_1_1["Directive"]
                });
            },
            function (directiveFactory_1_1) {
                exports_25({
                    "DirectiveFactory": directiveFactory_1_1["DirectiveFactory"]
                });
            },
            function (factory_1_1) {
                exports_25({
                    "Factory": factory_1_1["Factory"]
                });
            },
            function (filter_1_1) {
                exports_25({
                    "Filter": filter_1_1["Filter"]
                });
            },
            function (inject_1_1) {
                exports_25({
                    "Inject": inject_1_1["Inject"]
                });
            },
            function (module_1_1) {
                exports_25({
                    "Module": module_1_1["Module"]
                });
            },
            function (page_1_1) {
                exports_25({
                    "Page": page_1_1["Page"]
                });
            },
            function (provider_1_1) {
                exports_25({
                    "Provider": provider_1_1["Provider"]
                });
            },
            function (providerFactory_1_1) {
                exports_25({
                    "ProviderFactory": providerFactory_1_1["ProviderFactory"]
                });
            },
            function (requires_1_1) {
                exports_25({
                    "Requires": requires_1_1["Requires"]
                });
            },
            function (run_1_1) {
                exports_25({
                    "Run": run_1_1["Run"]
                });
            },
            function (service_1_1) {
                exports_25({
                    "Service": service_1_1["Service"]
                });
            },
            function (serviceFactory_1_1) {
                exports_25({
                    "ServiceFactory": serviceFactory_1_1["ServiceFactory"]
                });
            },
            function (sideMenu_1_1) {
                exports_25({
                    "SideMenu": sideMenu_1_1["SideMenu"]
                });
            },
            function (sideMenuPage_1_1) {
                exports_25({
                    "SideMenuPage": sideMenuPage_1_1["SideMenuPage"]
                });
            },
            function (value_1_1) {
                exports_25({
                    "Value": value_1_1["Value"]
                });
            }],
        execute: function() {
        }
    }
});
/// <reference path="typings.d.ts" />
System.register("ts/app", ["ionic-typescript/decorators/index"], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
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
        exports_26(exports);
    }
    return {
        setters:[
            function (decorators_2_1) {
                exportStar_1(decorators_2_1);
                decorators_1 = decorators_2_1;
            }],
        execute: function() {
            exports_26("IonicApplication", IonicApplication = angular.module("app", ["ionic", "openIddict"]));
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
System.register("ts/pages/forgotPassword", ["ts/app"], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var app_2;
    var ForgotPasswordController;
    return {
        setters:[
            function (app_2_1) {
                app_2 = app_2_1;
            }],
        execute: function() {
            ForgotPasswordController = (function () {
                function ForgotPasswordController() {
                }
                ForgotPasswordController.prototype.forgotPassword = function (name) {
                    console.log(name);
                };
                ForgotPasswordController = __decorate([
                    app_2.Page(app_2.IonicApplication, "register", {
                        template: "\n        <ion-view title=\"Register\">\n            <ion-nav-bar class=\"bar-balanced\">\n                <ion-nav-back-button>\n                </ion-nav-back-button>\n            </ion-nav-bar>\n            <ion-content padding=\"true\" scroll=\"false\">\n                <label class=\"item item-input\" style=\"margin-bottom: 40px;\">\n                    <span class=\"input-label\">Name</span>\n                    <input type=\"text\" ng-model=\"name\">\n                </label>\n                <button type=\"submit\" class=\"button button-calm button-block\" ng-click=\"$ctrl.forgotPassword(name)\">\n                    Login\n                </button>\n            </ion-content>\n        </ion-view>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ForgotPasswordController);
                return ForgotPasswordController;
            }());
            exports_27("ForgotPasswordController", ForgotPasswordController);
        }
    }
});
System.register("ts/pages/home", ["ts/app"], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var app_3;
    var HomeController;
    return {
        setters:[
            function (app_3_1) {
                app_3 = app_3_1;
            }],
        execute: function() {
            HomeController = (function () {
                function HomeController(_logService) {
                    this._logService = _logService;
                    this._logService.log("Opened home");
                }
                HomeController = __decorate([
                    app_3.SideMenuPage(app_3.IonicApplication, "mainMenu.home", {
                        url: "/home",
                        template: "\n        <ion-view view-title=\"Page 1\">\n            <ion-content class=\"padding\">\n                <button class=\"button button-positive button-block\">I'm a home button!</button>\n            </ion-content>\n        </ion-view>\n    "
                    }),
                    __param(0, app_3.Inject("$log")), 
                    __metadata('design:paramtypes', [Object])
                ], HomeController);
                return HomeController;
            }());
            exports_28("HomeController", HomeController);
        }
    }
});
System.register("ts/pages/login", ["ts/app"], function(exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var app_4;
    var LoginController;
    return {
        setters:[
            function (app_4_1) {
                app_4 = app_4_1;
            }],
        execute: function() {
            LoginController = (function () {
                function LoginController(_logService, _stateService, _openIddictHttpService) {
                    this._logService = _logService;
                    this._stateService = _stateService;
                    this._openIddictHttpService = _openIddictHttpService;
                }
                LoginController.prototype.login = function (username, password) {
                    console.log(username, password);
                    this._openIddictHttpService.login(username, password)
                        .then(function (response) {
                        console.log(response);
                    })
                        .catch(function (response) {
                        console.log(response);
                    });
                };
                LoginController = __decorate([
                    app_4.Page(app_4.IonicApplication, "login", {
                        url: "/login",
                        template: "\n        <ion-view title=\"Login\">\n            <ion-nav-bar class=\"bar-balanced\">\n                <ion-nav-back-button>\n                </ion-nav-back-button>\n            </ion-nav-bar>\n            <ion-content padding=\"true\" scroll=\"false\" ng-init=\"username = ''; password = '';>\n                <label class=\"item item-input\" style=\"margin-bottom: 40px;\">\n                    <span class=\"input-label\">Name</span>\n                    <input type=\"text\" ng-model=\"username\">\n                </label>\n                <label class=\"item item-input\" style=\"margin-bottom: 40px;\">\n                    <span class=\"input-label\">Password</span>\n                    <input type=\"password\" ng-model=\"password\">\n                </label>\n                <button type=\"submit\" class=\"button button-calm button-block\" ng-click=\"$ctrl.login(username, password)\">\n                    Login\n                </button>\n            </ion-content>\n        </ion-view>\n    "
                    }),
                    __param(0, app_4.Inject("$log")),
                    __param(1, app_4.Inject("$state")),
                    __param(2, app_4.Inject("openIddictHttpService")), 
                    __metadata('design:paramtypes', [Object, Object, Object])
                ], LoginController);
                return LoginController;
            }());
            exports_29("LoginController", LoginController);
        }
    }
});
System.register("ts/pages/mainMenu", ["ts/app"], function(exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var app_5;
    var MainMenuController;
    return {
        setters:[
            function (app_5_1) {
                app_5 = app_5_1;
            }],
        execute: function() {
            MainMenuController = (function () {
                function MainMenuController(_logService) {
                    this._logService = _logService;
                    this._logService.log("Opened the main menu page");
                }
                MainMenuController = __decorate([
                    app_5.SideMenu(app_5.IonicApplication, "mainMenu", {
                        template: "\n        <ion-list>\n            <ion-item menu-close ui-sref=\"mainMenu.page1()\">\n                Manage Songs\n            </ion-item>\n            <ion-item menu-close ui-sref=\"mainMenu.page2()\">\n                Manage Setlists\n            </ion-item>\n        </ion-list>\n    ",
                        menuHeaderBarClass: "bar-stable",
                        menuHeaderBarTitle: "Menu",
                        navBarClass: "bar-positive",
                        menuTriggerButtonClass: "button-clear"
                    }),
                    __param(0, app_5.Inject("$log")), 
                    __metadata('design:paramtypes', [Object])
                ], MainMenuController);
                return MainMenuController;
            }());
            exports_30("MainMenuController", MainMenuController);
        }
    }
});
System.register("ts/pages/page1", ["ts/app"], function(exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var app_6;
    var Page1Controller;
    return {
        setters:[
            function (app_6_1) {
                app_6 = app_6_1;
            }],
        execute: function() {
            Page1Controller = (function () {
                function Page1Controller(_logService) {
                    this._logService = _logService;
                    this._logService.log("Opened page 1");
                }
                Page1Controller = __decorate([
                    app_6.SideMenuPage(app_6.IonicApplication, "mainMenu.page1", {
                        url: "/page1",
                        template: "\n        <ion-view view-title=\"Page 1\">\n            <ion-content class=\"padding\">\n                <button class=\"button button-positive button-block\">I'm a button!</button>\n            </ion-content>\n        </ion-view>\n    "
                    }),
                    __param(0, app_6.Inject("$log")), 
                    __metadata('design:paramtypes', [Object])
                ], Page1Controller);
                return Page1Controller;
            }());
            exports_31("Page1Controller", Page1Controller);
        }
    }
});
System.register("ts/pages/register", ["ts/app"], function(exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var app_7;
    var RegisterController;
    return {
        setters:[
            function (app_7_1) {
                app_7 = app_7_1;
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
                    app_7.Page(app_7.IonicApplication, "register", {
                        template: "\n        <ion-view title=\"Register\">\n            <ion-nav-bar class=\"bar-balanced\">\n                <ion-nav-back-button>\n                </ion-nav-back-button>\n            </ion-nav-bar>\n            <ion-content padding=\"true\" scroll=\"false\">\n                <label class=\"item item-input\" style=\"margin-bottom: 40px;\">\n                    <span class=\"input-label\">Name</span>\n                    <input type=\"text\" ng-model=\"name\">\n                </label>\n                <label class=\"item item-input\" style=\"margin-bottom: 40px;\">\n                    <span class=\"input-label\">Password</span>\n                    <input type=\"password\" ng-model=\"password\">\n                </label>\n                <button type=\"submit\" class=\"button button-calm button-block\" ng-click=\"$ctrl.register(name, password)\">\n                    Register\n                </button>\n            </ion-content>\n        </ion-view>\n    ",
                    }),
                    __param(0, app_7.Inject("$log")),
                    __param(1, app_7.Inject("openIddictHttpService")), 
                    __metadata('design:paramtypes', [Object, Object])
                ], RegisterController);
                return RegisterController;
            }());
            exports_32("RegisterController", RegisterController);
        }
    }
});
