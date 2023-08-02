"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 41:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkRole = exports.sortableTrash = exports.sortable = exports.sum = void 0;
const sum = (a, b) => a + b;
exports.sum = sum;
const sortable = (field, sort) => {
    const sortType = field === sort.column ? sort.type : 'default';
    if (sortType === 'asc') {
        return `
    <a href="?_sort&column=${field}&type=desc"><i class="fas fa-sort-down"></i></a>
  `;
    }
    if (sortType === 'desc') {
        return `
      <a href="?_sort&column=${field}&type=asc"><i class="fas fa-sort-up"></i></a>
    `;
    }
    if (sortType === 'default') {
        return `
      <a href="?_sort&column=${field}&type=desc"><i class="fas fa-sort"></i></a>
    `;
    }
};
exports.sortable = sortable;
const sortableTrash = (field, sort) => {
    const sortType = field === sort.column ? sort.type : 'default';
    if (sortType === 'asc') {
        return `
    <a href="?_sortTrash&column=${field}&type=desc"><i class="fas fa-sort-down"></i></a>
  `;
    }
    if (sortType === 'desc') {
        return `
      <a href="?_sortTrash&column=${field}&type=asc"><i class="fas fa-sort-up"></i></a>
    `;
    }
    if (sortType === 'default') {
        return `
      <a href="?_sortTrash&column=${field}&type=desc"><i class="fas fa-sort"></i></a>
    `;
    }
};
exports.sortableTrash = sortableTrash;
const checkRole = () => { };
exports.checkRole = checkRole;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("5567a63d8bfa0ade588b")
/******/ })();
/******/ 
/******/ }
;