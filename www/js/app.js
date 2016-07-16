var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../typings/index.d.ts" />
/// <reference path="../typings/index.d.ts" />
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
var IonicApplication = (function () {
    function IonicApplication(module) {
        IonicApplication.__module = module;
    }
    Object.defineProperty(IonicApplication, "module", {
        get: function () {
            return IonicApplication.__module;
        },
        enumerable: true,
        configurable: true
    });
    IonicApplication = __decorate([
        App(document, "app"), 
        __metadata('design:paramtypes', [Object])
    ], IonicApplication);
    return IonicApplication;
}());
