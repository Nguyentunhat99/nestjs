"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 26:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(6);
const express_1 = __webpack_require__(22);
const user_service_1 = __webpack_require__(24);
const create_user_dto_1 = __webpack_require__(27);
const update_user_dto_1 = __webpack_require__(29);
const sort_user_dto_1 = __webpack_require__(30);
let UserController = exports.UserController = class UserController {
    constructor(service) {
        this.service = service;
    }
    async loginUser(user) {
        const { email, password } = user;
        return this.service.loginUser(email, password);
    }
    async createUser(res, user) {
        console.log(user.username?.toLowerCase());
        await this.service.createUser({
            ...user,
            username: user.username?.toLowerCase(),
            email: user.email?.toLowerCase(),
        });
        return res.redirect('/user/getAllUsers');
    }
    async index(res, request, sort) {
        if (request.query.hasOwnProperty('_sort')) {
            const data = await this.service.sort(sort);
            return res.render('home.hbs', {
                data: data,
            });
        }
        const data = await this.service.findAll();
        return res.render('home.hbs', {
            data: data,
        });
    }
    async findOne(res, id) {
        const data = await this.service.findOne(id);
        const roles = await this.service.getRoles();
        return res.render('edit.hbs', {
            data: data,
            roles: roles,
        });
    }
    async update(res, id, user) {
        await this.service.update(id, user);
        return res.redirect('/user/getAllUsers');
    }
    async delete(res, id) {
        await this.service.delete(id);
        return res.redirect('/user/getAllUsers');
    }
    async trashUser(res) {
        const data = await this.service.findTrashUser();
        return res.render('trash-user.hbs', {
            data: data,
        });
    }
    async destroy(res, id) {
        await this.service.destroy(id);
        return res.redirect('/user/trash');
    }
    async restore(res, id, user) {
        await this.service.restore(id, user);
        return res.redirect('/user/getAllUsers');
    }
    async handleActionForm(res, request) {
        const { action, usersId } = request.body;
        await this.service.handleActionForm(action, usersId);
        return res.redirect('/user/getAllUsers');
    }
    async Search(res, request) {
        const value = request.body.value.toLowerCase();
        const page = request.body.page;
        if (page === 'getAllUsers') {
            const data = await this.service.searchGetAllUsers(value);
            return res.render('home.hbs', {
                data: data,
            });
        }
        if (page === 'trashUsers') {
            const data = await this.service.searchTrashUsers(value);
            return res.render('trash-user.hbs', {
                data: data,
            });
        }
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UserController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object, typeof (_e = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/getAllUsers'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object, typeof (_g = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _g : Object, typeof (_h = typeof sort_user_dto_1.SortUserDto !== "undefined" && sort_user_dto_1.SortUserDto) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('/edit/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _j : Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('/update/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _k : Object, String, typeof (_l = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _l : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('/delete-soft/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _m : Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('/trash'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _o : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "trashUser", null);
__decorate([
    (0, common_1.Post)('/destroy/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _p : Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "destroy", null);
__decorate([
    (0, common_1.Post)('/restore/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _q : Object, String, typeof (_r = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _r : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "restore", null);
__decorate([
    (0, common_1.Post)('/handle-action-form'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_s = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _s : Object, typeof (_t = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _t : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleActionForm", null);
__decorate([
    (0, common_1.Post)('/search'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_u = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _u : Object, typeof (_v = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _v : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Search", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("e8608e81a5d2cf1e880e")
/******/ })();
/******/ 
/******/ }
;