"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 3:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(4);
const app_module_1 = __webpack_require__(5);
const path_1 = __webpack_require__(39);
const hbs = __webpack_require__(40);
const app_helper_1 = __webpack_require__(41);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3000);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', './src/public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', './src/views'));
    app.setViewEngine('hbs');
    hbs.registerHelper('sum', app_helper_1.sum);
    hbs.registerHelper('sortable', app_helper_1.sortable);
    hbs.registerHelper('sortableTrash', app_helper_1.sortableTrash);
    hbs.registerHelper('checkRole', app_helper_1.checkRole);
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("72a075c73f4217b56bcf")
/******/ })();
/******/ 
/******/ }
;