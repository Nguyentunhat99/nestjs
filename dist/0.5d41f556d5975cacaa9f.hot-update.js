"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 24:
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(14);
const bcrypt = __webpack_require__(15);
const user_schema_1 = __webpack_require__(18);
const role_schema_1 = __webpack_require__(25);
let UserService = exports.UserService = class UserService {
    constructor(model, modelRoles) {
        this.model = model;
        this.modelRoles = modelRoles;
    }
    async loginUser(email, password) {
        const userFind = await this.model.findOne({ email });
        if (userFind && userFind.password && userFind.password.length > 0) {
            const match = await bcrypt.compare(password, userFind.password);
            if (match)
                return 'Credentials are correct!';
            return 'Invalid Credentials!';
        }
        return 'Invalid Invalid!';
    }
    async createUser(user) {
        const { email, password } = user;
        const userFind = await this.model.findOne({ email });
        if (userFind) {
            return {
                status: 'error',
                message: 'Failed! Email is already in use!',
            };
        }
        else {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
            return await new this.model({
                ...user,
                password: hashPassword,
                roles: ['user'],
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
                deleted: false,
            }).save();
        }
    }
    async findAll() {
        return await this.model
            .find({ deletedAt: null })
            .select(['-password', '-createdAt', '-updatedAt', '-deleted', '-__v'])
            .exec();
    }
    async findOne(id) {
        return await this.model
            .findById(id)
            .select(['-password', '-createdAt', '-updatedAt', '-deleted'])
            .exec();
    }
    async getRoles() {
        return await this.modelRoles.find().select(['-_id']).exec();
    }
    async update(id, user) {
        let userUpdate = { ...user, updatedAt: new Date() };
        return await this.model
            .findByIdAndUpdate(id, userUpdate)
            .select(['-password', '-createdAt', '-updatedAt', '-deleted'])
            .exec();
    }
    async delete(id) {
        let userUpdate = { deletedAt: new Date(), deleted: true };
        return await this.model
            .findByIdAndUpdate(id, userUpdate)
            .select(['-password', '-createdAt', '-updatedAt', '-deleted'])
            .exec();
    }
    async findTrashUser() {
        return await this.model
            .find({ deleted: true })
            .select(['-password', '-createdAt', '-updatedAt', '-deleted'])
            .exec();
    }
    async destroy(id) {
        return await this.model
            .findByIdAndDelete(id)
            .select(['-password', '-createdAt', '-updatedAt', '-deleted'])
            .exec();
    }
    async restore(id, user) {
        let userUpdate = {
            ...user,
            updatedAt: new Date(),
            deletedAt: null,
            deleted: false,
        };
        return await this.model
            .findByIdAndUpdate(id, userUpdate)
            .select(['-password', '-createdAt', '-updatedAt', '-deleted'])
            .exec();
    }
    async handleActionForm(action, usersId) {
        switch (action) {
            case 'delete':
                await this.model.updateMany({ _id: { $in: usersId } }, { deletedAt: new Date(), deleted: true });
                break;
            case 'destroy':
                await this.model.deleteMany({ _id: { $in: usersId } });
                break;
            case 'restore':
                await this.model.updateMany({ _id: { $in: usersId } }, { deletedAt: null, deleted: false });
                break;
            default:
                break;
        }
    }
    async sort(sort) {
        const { column, type } = sort;
        switch (type) {
            case 'desc':
                return await this.model.find({}).sort({ [column]: 'desc' });
                break;
            case 'asc':
                return await this.model.find({}).sort({ [column]: 'asc' });
                break;
            default:
                break;
        }
    }
    async searchTrashUsers(value) {
        return await this.model.find({
            $and: [
                {
                    $or: [{ username: { $regex: value } }, { email: { $regex: value } }],
                },
                {
                    $or: [{ deleted: true }],
                },
            ],
        });
    }
    async searchGetAllUsers(value) {
        return await this.model.find({
            $and: [
                {
                    $or: [{ username: { $regex: value } }, { email: { $regex: value } }],
                },
                {
                    $or: [{ deletedAt: null }],
                },
            ],
        });
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], UserService);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("62b7c4e59c0f40f477ac")
/******/ })();
/******/ 
/******/ }
;