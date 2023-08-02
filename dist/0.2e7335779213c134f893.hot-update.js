"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 23:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const user_service_1 = __webpack_require__(24);
const user_controller_1 = __webpack_require__(26);
const user_schema_1 = __webpack_require__(18);
const role_schema_1 = __webpack_require__(25);
let UserModule = exports.UserModule = class UserModule {
};
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        providers: [user_service_1.UserService],
        controllers: [user_controller_1.UserController],
        exports: [user_service_1.UserService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: role_schema_1.Role.name, schema: role_schema_1.RoleSchema }]),
        ],
    })
], UserModule);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("cad71278861381083dfd")
/******/ })();
/******/ 
/******/ }
;