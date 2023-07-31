"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 5:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const config_1 = __webpack_require__(32);
const app_controller_1 = __webpack_require__(8);
const app_service_1 = __webpack_require__(9);
const user_module_1 = __webpack_require__(10);
const SortMiddleware_middleware_1 = __webpack_require__(21);
const auth_module_1 = __webpack_require__(22);
let AppModule = exports.AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(SortMiddleware_middleware_1.SortMiddleWare).forRoutes('user');
    }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/crud_nestjs'),
            auth_module_1.AuthModule,
            config_1.ConfigModule.forRoot(),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),

/***/ 32:
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("61285009be4e09491d60")
/******/ })();
/******/ 
/******/ }
;