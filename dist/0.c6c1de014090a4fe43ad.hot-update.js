"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 13:
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(14);
const bcrypt = __webpack_require__(15);
const uuidv4_1 = __webpack_require__(16);
const jwt_1 = __webpack_require__(17);
const user_schema_1 = __webpack_require__(18);
const refresh_token_schema_1 = __webpack_require__(19);
const configuration_1 = __webpack_require__(20);
let AuthService = exports.AuthService = class AuthService {
    constructor(modelUser, modelRefreshToken, jwtService) {
        this.modelUser = modelUser;
        this.modelRefreshToken = modelRefreshToken;
        this.jwtService = jwtService;
    }
    async loginUser(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const userFind = await this.modelUser
                    .findOne({ email })
                    .select([
                    '-createdAt',
                    '-updatedAt',
                    '-deleted',
                    '-deletedAt',
                    '-__v',
                ])
                    .exec();
                const isCheckPassword = await bcrypt.compare(password, `${userFind?.password}`);
                if (userFind) {
                    if (!isCheckPassword) {
                        resolve({
                            status: 'error',
                            message: 'Wrong password',
                        });
                    }
                    else {
                        const payload = {
                            sub: userFind?._id,
                            username: userFind?.username,
                        };
                        const refreshToken = (0, uuidv4_1.uuid)();
                        let expiredAt = new Date();
                        expiredAt.setSeconds(expiredAt.getSeconds() +
                            parseInt(configuration_1.jwtConstants.jwtExpirationRefresh));
                        await this.modelRefreshToken.create({
                            token: refreshToken,
                            userId: userFind._id,
                            expiryDate: expiredAt.getTime(),
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        });
                        resolve({
                            access_token: await this.jwtService.signAsync(payload),
                            refresh_token: refreshToken,
                        });
                    }
                }
                else {
                    resolve({
                        status: 'error',
                        message: `Your email does not exist. Please re-enter!`,
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async RefreshToken(refresh_token) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('1', refresh_token);
                if (refresh_token === null) {
                    resolve({
                        status: 'error',
                        message: 'Refresh Token is required!',
                    });
                }
                const refresh_tokenDB = await this.modelRefreshToken.findOne({
                    token: refresh_token,
                });
                console.log(refresh_tokenDB);
                if (refresh_tokenDB === null) {
                    resolve({
                        status: 'error',
                        message: 'Refresh token is not in database!',
                    });
                }
                const expiryDate = refresh_tokenDB?.expiryDate.getTime();
                const now = new Date().getTime();
                if (expiryDate < now) {
                    await this.modelRefreshToken.deleteOne({
                        where: {
                            userId: refresh_tokenDB?.userId,
                        },
                    });
                    resolve({
                        status: 'error',
                        message: 'Refresh token was expired. Please make a new signin request',
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async register(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const { email, password } = user;
                const userFind = await this.modelUser.findOne({ email });
                if (userFind)
                    resolve({
                        status: 'error',
                        message: 'Failed! Email is already in use!',
                    });
                const salt = await bcrypt.genSalt();
                const hashPassword = await bcrypt.hash(password, salt);
                await new this.modelUser({
                    ...user,
                    password: hashPassword,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                    deleted: false,
                }).save();
                resolve({
                    status: 'success',
                    message: 'Registration successfully',
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async validateUser(username, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const userFind = await this.modelUser
                    .findOne({ username })
                    .select([
                    '-createdAt',
                    '-updatedAt',
                    '-deleted',
                    '-deletedAt',
                    '-__v',
                ])
                    .exec();
                const isCheckPassword = await bcrypt.compare(password, `${userFind?.password}`);
                console.log(userFind);
                if (userFind) {
                    if (!isCheckPassword) {
                        resolve({
                            status: 'error',
                            message: 'Wrong password',
                        });
                    }
                    else {
                        resolve({
                            userInfo: userFind,
                        });
                    }
                }
                else {
                    resolve({
                        status: 'error',
                        message: `Your email does not exist. Please re-enter!`,
                    });
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async login(user) {
        const { _id, username } = user.userInfo;
        const payload = { sub: _id, username: username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(refresh_token_schema_1.RefreshToken.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _c : Object])
], AuthService);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("cfec47856d1be2b0dfcf")
/******/ })();
/******/ 
/******/ }
;