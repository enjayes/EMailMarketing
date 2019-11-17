(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/api.service.ts":
/*!********************************!*\
  !*** ./src/app/api.service.ts ***!
  \********************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Set the http options
var httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({ "Content-Type": "application/json" })
};
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
    }
    /**
     * Function to handle error when the server return an error
     *
     * @param error
     */
    ApiService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error("An error occurred:", error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
            console.log(error);
            console.error("Backend returned code " + error.status + ", " + ("body was: " + error.error));
        }
        // return an observable with a user-facing error message
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(error);
    };
    /**
     * Function to extract the data when the server return some
     *
     * @param res
     */
    ApiService.prototype.extractData = function (res) {
        var body = res;
        return body || {};
    };
    /**
     * Function to GET what you want
     *
     * @param url
     */
    ApiService.prototype.getPublishers = function (url) {
        //return this.http.get(url);
        // Call the http GET
        return this.http.get(url + "/items", httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ApiService.prototype.getTemplate = function (url) {
        //return this.http.get(url);
        // Call the http GET
        return this.http.get(url + "/template", httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    /**
    * Function to GET what you want
    *
    * @param url
    */
    ApiService.prototype.update = function (url, action, dataObject) {
        //return this.http.get(url);
        // Call the http GET
        if (action == "template") {
            return this.http.post(url + "/" + action + "/template", { "template": dataObject }, httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
        }
        else if (action == "mails") {
            return this.http.post(url + "/" + action + "/" + dataObject._id, dataObject.mails, httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
        }
        else {
            return this.http.get(url + "/" + action + "/" + dataObject._id, httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
        }
    };
    /**
      * Function to POST what you want
      *
      * @param url
      * @param data
      */
    ApiService.prototype.sendMail = function (url, data) {
        console.log("");
        console.log("sendMail:");
        console.log(url);
        console.log(data);
        return this.http.post(url, data, httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "p {\r\n  font-family: Lato;\r\n}\r\n\r\n/*\r\nCopyright Google LLC. All Rights Reserved.\r\nUse of this source code is governed by an MIT-style license that\r\ncan be found in the LICENSE file at http://angular.io/license\r\n*/\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0I7Q0FDbkI7O0FBRUQ7Ozs7RUFJRSIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsicCB7XHJcbiAgZm9udC1mYW1pbHk6IExhdG87XHJcbn1cclxuXHJcbi8qXHJcbkNvcHlyaWdodCBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG5Vc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0XHJcbmNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHA6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuKi8iXX0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-top-bar></app-top-bar>\r\n\r\n<div class=\"container\">\r\n  <router-outlet></router-outlet>\r\n</div>\r\n\r\n<!-- \r\nCopyright Google LLC. All Rights Reserved.\r\nUse of this source code is governed by an MIT-style license that\r\ncan be found in the LICENSE file at http://angular.io/license\r\n-->"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _top_bar_top_bar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./top-bar/top-bar.component */ "./src/app/top-bar/top-bar.component.ts");
/* harmony import */ var _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./product-list/product-list.component */ "./src/app/product-list/product-list.component.ts");
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/slider */ "./node_modules/@angular/material/esm5/slider.es5.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/esm5/list.es5.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/esm5/radio.es5.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/esm5/button-toggle.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/esm5/expansion.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _callback_pipe__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./callback.pipe */ "./src/app/callback.pipe.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var angular_font_awesome__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! angular-font-awesome */ "./node_modules/angular-font-awesome/dist/angular-font-awesome.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var ngx_virtual_scroller__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ngx-virtual-scroller */ "./node_modules/ngx-virtual-scroller/fesm5/ngx-virtual-scroller.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















 //https://www.npmjs.com/package/angular-font-awesome





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                ngx_virtual_scroller__WEBPACK_IMPORTED_MODULE_23__["VirtualScrollerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_17__["MatSnackBarModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_22__["MatMenuModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_21__["MatButtonModule"],
                angular_font_awesome__WEBPACK_IMPORTED_MODULE_20__["AngularFontAwesomeModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__["MatDialogModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_18__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_17__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_17__["MatInputModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_15__["MatSelectModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_14__["BrowserAnimationsModule"],
                _angular_material_expansion__WEBPACK_IMPORTED_MODULE_13__["MatExpansionModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_10__["HttpClientModule"],
                _angular_material_slider__WEBPACK_IMPORTED_MODULE_7__["MatSliderModule"],
                _angular_material_list__WEBPACK_IMPORTED_MODULE_8__["MatListModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_material_radio__WEBPACK_IMPORTED_MODULE_9__["MatRadioModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_11__["MatButtonToggleModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_12__["MatCardModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot([
                    { path: '', component: _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_6__["ProductListComponent"] },
                ])
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _top_bar_top_bar_component__WEBPACK_IMPORTED_MODULE_5__["TopBarComponent"],
                _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_6__["ProductListComponent"],
                _callback_pipe__WEBPACK_IMPORTED_MODULE_16__["CallbackPipe"],
                _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_6__["SendMailDialog"],
                _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_6__["StatisticsDialog"],
                _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_6__["TemplateDialog"]
            ],
            entryComponents: [
                _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_6__["SendMailDialog"],
                _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_6__["StatisticsDialog"],
                _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_6__["TemplateDialog"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 


/***/ }),

/***/ "./src/app/callback.pipe.ts":
/*!**********************************!*\
  !*** ./src/app/callback.pipe.ts ***!
  \**********************************/
/*! exports provided: CallbackPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CallbackPipe", function() { return CallbackPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CallbackPipe = /** @class */ (function () {
    function CallbackPipe() {
    }
    CallbackPipe.prototype.transform = function (items, callback) {
        if (!items || !callback) {
            return items;
        }
        return items.filter(function (item) { return callback(item); });
    };
    CallbackPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'callback',
            pure: false
        })
    ], CallbackPipe);
    return CallbackPipe;
}());



/***/ }),

/***/ "./src/app/product-list/product-list.component.css":
/*!*********************************************************!*\
  !*** ./src/app/product-list/product-list.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "::ng-deep.mat-pseudo-checkbox{\r\n    display: none !important;\r\n  }\r\n\r\n\r\n\r\n\r\n::ng-deep.mat-list-item-content {\r\n\r\n  display:block!important;\r\n}\r\n\r\n\r\n\r\n\r\n.mat-list-item{\r\n  height: 60px!important;\r\n}\r\n\r\n\r\n\r\n\r\n.mat-simple-snackbar{\r\n  color:\"white\"\r\n}\r\n\r\n\r\n\r\n\r\n.listitemtext{\r\n  padding-top: 12px;\r\n  width: 307px!important;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  display:block!important;\r\n  overflow: hidden;\r\n \r\n}\r\n\r\n\r\n\r\n\r\n.selectedlistitem {\r\n  background-color: rgba(0, 0, 0, 0.14)!important;\r\n}\r\n\r\n\r\n\r\n\r\n.filterlistcontainer{\r\n  position: absolute;\r\n  top: 55px;\r\n  height:125px;\r\n  padding-right: 10px;\r\n}\r\n\r\n\r\n\r\n\r\n.listcontainer {\r\n  overflow-y: hidden;\r\n  position: absolute;\r\n  bottom: 0px;\r\n  top: 173px;\r\n  padding-right: 10px;\r\n  width: 390px!important;\r\n  margin:0px;\r\n\r\n}\r\n\r\n\r\n\r\n\r\n.listscroller {\r\n  overflow-y:scroll;\r\n  position: absolute;\r\n  bottom: 0px;\r\n  top: 0px;\r\n  left:0px;\r\n  bottom:0px;\r\n  width: 390px!important;\r\n}\r\n\r\n\r\n\r\n\r\n.listitem{\r\n    display: block;\r\n    width: 100%;\r\n    height: 80px!important;\r\n  \r\n}\r\n\r\n\r\n\r\n\r\n.detailscontainer{\r\n  overflow-y: auto;\r\n  position: absolute;\r\n  bottom: 0px;\r\n  top: 55px;\r\n  left: 406px;\r\n  padding-right: 10px;\r\n  padding-top: 15px;\r\n  right: 0px;\r\n  background-color:rgb(245, 245, 245)!important;\r\n  padding:10px;\r\n}\r\n\r\n\r\n\r\n\r\n.detailscontainer .mat-divider-horizontal {\r\n  position: initial!important; \r\n  left: initial!important; \r\n  width: 100%;\r\n}\r\n\r\n\r\n\r\n\r\n.bookrating{\r\n  margin-left:15px\r\n}\r\n\r\n\r\n\r\n\r\n.publisherDetails{\r\n  margin-bottom:20px;\r\n  margin-left: 25px;\r\n}\r\n\r\n\r\n\r\n\r\n.publisherAddress{\r\n  font-family: 'Roboto', Arial, sans-serif;\r\n  color: #616161;\r\n  box-sizing: border-box;\r\n  font-size:14px\r\n}\r\n\r\n\r\n\r\n\r\n.openstatistics{\r\n  position:fixed;\r\n  right:5px;\r\n  top:-7px;\r\n  color:white;\r\n  font-size:15px;\r\n  opacity: 0.2;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvZHVjdC1saXN0L3Byb2R1Y3QtbGlzdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0kseUJBQXlCO0dBQzFCOzs7OztBQUtIOztFQUVFLHdCQUF3QjtDQUN6Qjs7Ozs7QUFHRDtFQUNFLHVCQUF1QjtDQUN4Qjs7Ozs7QUFHRDtFQUNFLGFBQWE7Q0FDZDs7Ozs7QUFFRDtFQUNFLGtCQUFrQjtFQUNsQix1QkFBdUI7RUFDdkIsb0JBQW9CO0VBQ3BCLHdCQUF3QjtFQUN4Qix3QkFBd0I7RUFDeEIsaUJBQWlCOztDQUVsQjs7Ozs7QUFFRDtFQUNFLGdEQUFnRDtDQUNqRDs7Ozs7QUFFRDtFQUNFLG1CQUFtQjtFQUNuQixVQUFVO0VBQ1YsYUFBYTtFQUNiLG9CQUFvQjtDQUNyQjs7Ozs7QUFFRDtFQUNFLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLFdBQVc7RUFDWCxvQkFBb0I7RUFDcEIsdUJBQXVCO0VBQ3ZCLFdBQVc7O0NBRVo7Ozs7O0FBRUQ7RUFDRSxrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixTQUFTO0VBQ1QsU0FBUztFQUNULFdBQVc7RUFDWCx1QkFBdUI7Q0FDeEI7Ozs7O0FBR0Q7SUFDSSxlQUFlO0lBQ2YsWUFBWTtJQUNaLHVCQUF1Qjs7Q0FFMUI7Ozs7O0FBR0Q7RUFDRSxpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixVQUFVO0VBQ1YsWUFBWTtFQUNaLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLDhDQUE4QztFQUM5QyxhQUFhO0NBQ2Q7Ozs7O0FBRUQ7RUFDRSw0QkFBNEI7RUFDNUIsd0JBQXdCO0VBQ3hCLFlBQVk7Q0FDYjs7Ozs7QUFFRDtFQUNFLGdCQUFnQjtDQUNqQjs7Ozs7QUFFRDtFQUNFLG1CQUFtQjtFQUNuQixrQkFBa0I7Q0FDbkI7Ozs7O0FBRUQ7RUFDRSx5Q0FBeUM7RUFDekMsZUFBZTtFQUNmLHVCQUF1QjtFQUN2QixjQUFjO0NBQ2Y7Ozs7O0FBR0Q7RUFDRSxlQUFlO0VBQ2YsVUFBVTtFQUNWLFNBQVM7RUFDVCxZQUFZO0VBQ1osZUFBZTtFQUNmLGFBQWE7Q0FDZCIsImZpbGUiOiJzcmMvYXBwL3Byb2R1Y3QtbGlzdC9wcm9kdWN0LWxpc3QuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIjo6bmctZGVlcC5tYXQtcHNldWRvLWNoZWNrYm94e1xyXG4gICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcbjo6bmctZGVlcC5tYXQtbGlzdC1pdGVtLWNvbnRlbnQge1xyXG5cclxuICBkaXNwbGF5OmJsb2NrIWltcG9ydGFudDtcclxufVxyXG5cclxuXHJcbi5tYXQtbGlzdC1pdGVte1xyXG4gIGhlaWdodDogNjBweCFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcblxyXG4ubWF0LXNpbXBsZS1zbmFja2JhcntcclxuICBjb2xvcjpcIndoaXRlXCJcclxufVxyXG5cclxuLmxpc3RpdGVtdGV4dHtcclxuICBwYWRkaW5nLXRvcDogMTJweDtcclxuICB3aWR0aDogMzA3cHghaW1wb3J0YW50O1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgZGlzcGxheTpibG9jayFpbXBvcnRhbnQ7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuIFxyXG59XHJcblxyXG4uc2VsZWN0ZWRsaXN0aXRlbSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjE0KSFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5maWx0ZXJsaXN0Y29udGFpbmVye1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDU1cHg7XHJcbiAgaGVpZ2h0OjEyNXB4O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbn1cclxuXHJcbi5saXN0Y29udGFpbmVyIHtcclxuICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGJvdHRvbTogMHB4O1xyXG4gIHRvcDogMTczcHg7XHJcbiAgcGFkZGluZy1yaWdodDogMTBweDtcclxuICB3aWR0aDogMzkwcHghaW1wb3J0YW50O1xyXG4gIG1hcmdpbjowcHg7XHJcblxyXG59XHJcblxyXG4ubGlzdHNjcm9sbGVyIHtcclxuICBvdmVyZmxvdy15OnNjcm9sbDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgYm90dG9tOiAwcHg7XHJcbiAgdG9wOiAwcHg7XHJcbiAgbGVmdDowcHg7XHJcbiAgYm90dG9tOjBweDtcclxuICB3aWR0aDogMzkwcHghaW1wb3J0YW50O1xyXG59XHJcblxyXG5cclxuLmxpc3RpdGVte1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogODBweCFpbXBvcnRhbnQ7XHJcbiAgXHJcbn1cclxuXHJcblxyXG4uZGV0YWlsc2NvbnRhaW5lcntcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBib3R0b206IDBweDtcclxuICB0b3A6IDU1cHg7XHJcbiAgbGVmdDogNDA2cHg7XHJcbiAgcGFkZGluZy1yaWdodDogMTBweDtcclxuICBwYWRkaW5nLXRvcDogMTVweDtcclxuICByaWdodDogMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6cmdiKDI0NSwgMjQ1LCAyNDUpIWltcG9ydGFudDtcclxuICBwYWRkaW5nOjEwcHg7XHJcbn1cclxuXHJcbi5kZXRhaWxzY29udGFpbmVyIC5tYXQtZGl2aWRlci1ob3Jpem9udGFsIHtcclxuICBwb3NpdGlvbjogaW5pdGlhbCFpbXBvcnRhbnQ7IFxyXG4gIGxlZnQ6IGluaXRpYWwhaW1wb3J0YW50OyBcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLmJvb2tyYXRpbmd7XHJcbiAgbWFyZ2luLWxlZnQ6MTVweFxyXG59XHJcblxyXG4ucHVibGlzaGVyRGV0YWlsc3tcclxuICBtYXJnaW4tYm90dG9tOjIwcHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDI1cHg7XHJcbn1cclxuXHJcbi5wdWJsaXNoZXJBZGRyZXNze1xyXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgQXJpYWwsIHNhbnMtc2VyaWY7XHJcbiAgY29sb3I6ICM2MTYxNjE7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICBmb250LXNpemU6MTRweFxyXG59XHJcblxyXG5cclxuLm9wZW5zdGF0aXN0aWNze1xyXG4gIHBvc2l0aW9uOmZpeGVkO1xyXG4gIHJpZ2h0OjVweDtcclxuICB0b3A6LTdweDtcclxuICBjb2xvcjp3aGl0ZTtcclxuICBmb250LXNpemU6MTVweDtcclxuICBvcGFjaXR5OiAwLjI7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/product-list/product-list.component.html":
/*!**********************************************************!*\
  !*** ./src/app/product-list/product-list.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"openstatistics\">\r\n    <button mat-mini-fab color =  \"\" style=\"margin-top: 10px;margin-left: 70px;\" mat-raised-button (click)=\"openStatistics();\"><fa name=\"info\" size=\"lg\"></fa></button>\r\n</div>\r\n\r\n<div class=\"filterlistcontainer\">\r\n\r\n    <mat-form-field style=\"padding-left: 15px;\" title=\"Publishers\">\r\n\r\n        <mat-select [(value)]=\"selectedState\" (selectionChange)=\"selectedPublisherState(true)\">\r\n            <mat-option *ngFor=\"let state of publisherStates\" [value]=\"state.value\">\r\n                {{state.viewValue}}\r\n            </mat-option>\r\n        </mat-select>\r\n    </mat-form-field>\r\n    <button style=\"margin-top: 10px;margin-left: 70px;\" mat-raised-button (click)=\"openMailTemplate();\">Mail Template\r\n    </button>\r\n\r\n\r\n    <mat-form-field style=\"padding-left:15px;display:block;margin-top:-11px;\" class=\"filter-full-width\">\r\n        <input matInput placeholder=\"Filter\" [(ngModel)]=\"filterText\" (ngModelChange)=\"filterChanged()\">\r\n    </mat-form-field>\r\n\r\n\r\n\r\n</div>\r\n<div class=\"listcontainer\">\r\n    <mat-action-list #publishers>\r\n        <virtual-scroller class=\"listscroller\" #scrollPublishers [items]=\"selectedPublisherList\">\r\n            <mat-list-item [ngClass]=\"{selectedlistitem: selectedPublisher._id === publisher._id,listitem:true}\"\r\n                *ngFor=\"let publisher of scrollPublishers.viewPortItems\" (click)=\"onListClicked(publisher)\">\r\n                <div class=\"listitemtext\">{{publisher.RegistrantName}}</div>\r\n                <div style=\"font-size: 14px;color:rgba(0, 0, 0, 0.5)!important\">\r\n                    {{(publisher.books.length==1)?\"1 Book\":publisher.books.length+\" Books (SR: \"+(publisher.sales_rank>0?publisher.sales_rank:\"-\")+\")\"}}\r\n\r\n                </div>\r\n\r\n            </mat-list-item>\r\n        </virtual-scroller>\r\n\r\n    </mat-action-list>\r\n</div>\r\n<div id=\"publisherDetailsContainer\" class=\"detailscontainer\" *ngIf=\"selectedPublisher.RegistrantName\" (scroll)=\"onScroll($event)\">\r\n\r\n    <mat-card>\r\n        <h1 style=\"margin-left: 24px;font-size:20px;cursor:pointer;margin-right:100px\"\r\n            (click)=\"onSearchPublisherClicked()\">\r\n            {{selectedPublisher.RegistrantName?selectedPublisher.RegistrantName:\"\"}}</h1>\r\n\r\n        <div style=\"clear:both;\"></div>\r\n        <span style=\"margin-left: 24px;cursor:pointer;\" (click)=\"onSearchPublisherLocationClicked()\"\r\n            class=\"publisherAddress\">{{selectedPublisherAddress}}</span>\r\n        <br />\r\n        <br />\r\n\r\n        <button *ngIf=\"!selectedPublisher.saved\" (click)=\"savePublisher(false,undefined);\" mat-mini-fab color=\"\"\r\n            style=\"position: absolute;right: 21px;top: 15px;\">\r\n            <fa name=\"save\" size=\"lg\" style=\"margin-top:-1px;\"></fa>\r\n        </button>\r\n        <button *ngIf=\"selectedPublisher.saved\" (click)=\"removePublisher();\" mat-mini-fab color=\"\"\r\n            style=\"position: absolute;right: 21px;top: 15px;\">\r\n            <fa name=\"trash\" size=\"lg\" style=\"margin-top:-1px;\"></fa>\r\n        </button>\r\n\r\n        <mat-divider></mat-divider>\r\n        <br />\r\n        <br />\r\n        <div class=\"publisherDetails\">\r\n            <div style=\"overflow:auto\">\r\n                <span style=\"float:left;margin-right:50px;min-width: 50px;\">\r\n                    <a title=\"{{agency.website?agency.website:''}}\" style=\"display:block;height:23px;\"\r\n                        *ngFor=\"let agency of selectedPublisherAgencies\"\r\n                        href=\"{{agency.website?agency.website:'https://www.google.de/search?q='+selectedPublisher.RegistrantName}}\"\r\n                        target=\"_blank\" rel=\"noopener noreferrer\">\r\n                        <mat-icon matSuffix>homepage</mat-icon>\r\n                        <span style=\"vertical-align: middle;line-height: 15px;\">{{agency.name?agency.name:\"-\"}}</span>\r\n                    </a>\r\n                </span>\r\n\r\n                <span style=\"float:left;margin-right:50px;min-width: 50px;\">\r\n                    <a style=\"display:block;height:23px;cursor: pointer;\"\r\n                        *ngFor=\"let agency of selectedPublisherAgencies\"\r\n                        (click)=\"openDialogTimeout(undefined,agency.mail);\" href=\"#\">\r\n                        <mat-icon matSuffix>email</mat-icon>\r\n                        <span style=\"vertical-align: middle;line-height: 15px;\"> {{agency.mail?agency.mail:\"-\"}}</span>\r\n\r\n                    </a>\r\n                </span>\r\n                <!--span style=\"float:left;margin-right:50px;min-width: 100px;\">\r\n                <div style=\"height:23px;\" *ngFor=\"let agency of selectedPublisherAgencies\">\r\n                   \r\n                    <mat-icon matSuffix>phone</mat-icon>\r\n                    <span style=\"vertical-align: middle;line-height: 15px;\"> {{agency.phone?agency.phone:\"-\"}} </span>\r\n                   \r\n                </div>\r\n            </span> !-->\r\n                <span style=\"float:left;margin-right:50px;min-width: 50px;\">\r\n                    <a style=\"display:block;height:23px;cursor: pointer;\"\r\n                        *ngFor=\"let agency of selectedPublisherAgencies\"\r\n                        (click)=\"openPerson(agency); event.preventDefault();\" href=\"#\">\r\n                        <mat-icon matSuffix>person</mat-icon>\r\n                        <span style=\"vertical-align: middle;line-height: 15px;\">\r\n                            {{agency.contact?agency.contact:\"-\"}}</span>\r\n\r\n                    </a>\r\n                </span>\r\n                <span>\r\n\r\n                    <span style=\"display:block;height:23px;\" *ngFor=\"let agency of selectedPublisherAgencies\">\r\n                        <a href=\"#\" (click)=\"searchAgency(agency,'LinkedIn'); event.preventDefault();\">\r\n                            <fa name=\"linkedin\" style=\"margin-right:10px;\"></fa>\r\n                        </a>\r\n                        <a href=\"#\" (click)=\"searchAgency(agency,'Xing'); event.preventDefault();\">\r\n                            <fa name=\"xing\" style=\"margin-right:10px;\"></fa>\r\n                        </a>\r\n                        <a href=\"#\" (click)=\"searchAgency(agency,'Facebook'); event.preventDefault();\">\r\n                            <fa name=\"facebook\" style=\"margin-right:10px;\"></fa>\r\n                        </a>\r\n                        <a href=\"#\" (click)=\"searchAgency(agency,''); event.preventDefault();\">\r\n                            <fa name=\"google\" style=\"margin-right:10px;\"></fa>\r\n                        </a>\r\n\r\n                    </span>\r\n\r\n\r\n                </span>\r\n\r\n\r\n            </div>\r\n        </div>\r\n        <br />\r\n        <mat-divider style=\"margin-top: -3px;\"></mat-divider>\r\n        <div *ngIf=\"selectedPublisher.mails&&selectedPublisher.mails.length>0\">\r\n            <div style=\"margin-left:25px\">\r\n                <br />\r\n                <br />\r\n                <span style=\"display:block;height:23px;cursor: pointer;\"\r\n                    *ngFor=\"let mail of selectedPublisher.mails; let i = index\">\r\n\r\n                    <mat-icon *ngIf=\"!mail.sent\" style=\"float:left\" matSuffix>drafts</mat-icon>\r\n                    <mat-icon *ngIf=\"mail.sent\" style=\"float:left\" matSuffix>email</mat-icon>\r\n                    <div\r\n                        style=\"vertical-align: middle;line-height: 15px; white-space: nowrap; text-overflow: ellipsis;overflow: hidden;\">\r\n\r\n                        <a (click)=\"openMailTimeout(mail,i);\"\r\n                            style=\"display:block;float:left;width:calc(100% - 50px); white-space: nowrap; text-overflow: ellipsis;overflow: hidden;\">\r\n                            {{mail.mailsubject}}\r\n                        </a>\r\n\r\n                        <fa (click)=\"deleteMail(mail,i);\" name=\"trash\" size=\"lg\"\r\n                            style=\"margin-left:20px;margin-top:-1px;\"></fa>\r\n                    </div>\r\n                </span>\r\n            </div>\r\n            <br />\r\n            <br />\r\n\r\n            <mat-divider style=\"margin-top: -3px;\"></mat-divider>\r\n        </div>\r\n        <!--\r\n        <button style=\"margin-right:30px;\" mat-button (click)=\"openDialog()\">Mail</button>\r\n        <button mat-button (click)=\"onSearchPublisherClicked()\">Search Publisher</button>\r\n        <br />\r\n        <br />\r\n        <br />\r\n        -->\r\n\r\n\r\n        <button style=\"float:right\" *ngIf=\"!accordionState\" mat-flat-button (click)=\"openAccordion(true);\">Expand\r\n        </button>\r\n        <button style=\"float:right\" *ngIf=\"accordionState\" mat-flat-button (click)=\"openAccordion(false);\">Collapse\r\n        </button>\r\n        <div style=\"clear: both;\"></div>\r\n        <mat-accordion #accordion=\"matAccordion\" [multi]=\"true\">\r\n            <mat-expansion-panel *ngFor=\"let book of selectedPublisher.visibleBooks\">\r\n                <mat-expansion-panel-header>\r\n                    <!-- style=\"background-color:red\" -->\r\n                    <mat-panel-title title=\"{{book.title}}\">\r\n                        {{\"🡆   \"+createShortTitle(book.title)+\"  (SR: \"+(book.sales_rank>0?book.sales_rank:\"-\")+\")\"}}\r\n                    </mat-panel-title>\r\n                    <mat-panel-description>\r\n\r\n                    </mat-panel-description>\r\n                </mat-expansion-panel-header>\r\n                <div>\r\n\r\n                    <button mat-raised-button style=\"margin-right:30px;\"\r\n                        (click)=\"openDialogTimeout(book,undefined,$event);\">Mail</button>\r\n                    <button mat-raised-button (click)=\"onBookClicked(book)\">Open Amazon</button>\r\n                    <span class=\"bookrating\">{{book.rating!=\"Zurück\"?book.rating:\"\"}}</span>\r\n                    <br>\r\n                    <br>\r\n\r\n                    <h1>{{book.title}}</h1>\r\n                </div>\r\n                <br />\r\n\r\n\r\n                <a href=\"{{book.url}}\" target=\"_blank\" rel=\"noopener noreferrer\">\r\n                    <img src=\"{{book.image}}\" style=\"float:left;margin-right:10px;margin-bottom:10px;height:300px;\" />\r\n                </a>\r\n                {{book.description}}\r\n                <br />\r\n                <div *ngFor=\"let author of book.authors\">\r\n                    {{author}}\r\n                </div>\r\n\r\n\r\n\r\n\r\n\r\n            </mat-expansion-panel>\r\n\r\n        </mat-accordion>\r\n        <br/>\r\n     \r\n\r\n\r\n\r\n    </mat-card>\r\n    <br />\r\n    <br />\r\n    <br />\r\n\r\n</div>"

/***/ }),

/***/ "./src/app/product-list/product-list.component.ts":
/*!********************************************************!*\
  !*** ./src/app/product-list/product-list.component.ts ***!
  \********************************************************/
/*! exports provided: SendMailDialog, TemplateDialog, StatisticsDialog, ProductListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendMailDialog", function() { return SendMailDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateDialog", function() { return TemplateDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticsDialog", function() { return StatisticsDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListComponent", function() { return ProductListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _products__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../products */ "./src/app/products.ts");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../api.service */ "./src/app/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







function createShortBookTitle(subject) {
    if (subject.length > 30) {
        var subjectParts = subject.split(":");
        if (subjectParts.length > 2) {
            subject = subjectParts[0];
        }
        else if (subjectParts.length == 2) {
            if (subjectParts[1].length > 55) {
                subject = subjectParts[0];
            }
        }
        var subjectParts = subject.split("-");
        if (subjectParts.length > 2) {
            if (subjectParts.length > 1) {
                subject = subjectParts[0];
                for (var i = 1; i < subjectParts.length; i++) {
                    if (subjectParts[i].length < 30 || subjectParts[i - 1].indexOf(" ") == -1 || subjectParts[i - 1].charAt(subjectParts[i - 1].length - 1) != " " || subjectParts[i].charAt(0) != " ") {
                        subject = subject + "-" + subjectParts[i];
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                subject = subjectParts[0];
            }
        }
        subject = subject.split("(")[0];
        subject = subject.trim();
    }
    return subject;
}
var SendMailDialog = /** @class */ (function () {
    function SendMailDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.agencies = [];
        this.templateIndex = 0;
        this.templateCount = 1;
        this.templateCountRange = [];
    }
    SendMailDialog.prototype.getSubstringCount = function (str, substring) {
        var times = 0, index = -1;
        do {
            index = str.indexOf(substring, index + 1);
            if (index == -1) {
                break;
            }
            times++;
        } while (true);
        return times;
    };
    SendMailDialog.prototype.getSubstringIndex = function (str, substring, n) {
        var times = 0, index = -1;
        while (times <= n) {
            index = str.indexOf(substring, index + 1);
            times++;
            if (index == -1) {
                break;
            }
        }
        return index;
    };
    SendMailDialog.prototype.updateTemplate = function (shortbooktitle, isbn) {
        var template = this.data.template;
        var pos1 = this.getSubstringIndex(template, "<mail>\n", this.templateIndex);
        console.log("pos1:");
        console.log(pos1);
        if (pos1 >= 0) {
            var pos2 = this.getSubstringIndex(template, "\n<mail/>", this.templateIndex);
            console.log("pos2:");
            console.log(pos2);
            if (pos2 >= 0 && pos2 > pos1) {
                template = template.substr(pos1 + 7, pos2 - pos1 - 7);
            }
        }
        this.data.mailtext = template;
        if (shortbooktitle != "") {
            this.data.mailtext = this.data.mailtext.replace("<book/>", shortbooktitle);
        }
        if (isbn) {
            this.data.mailtext = this.data.mailtext.replace("<isbn/>", isbn);
        }
    };
    SendMailDialog.prototype.selectTemplate = function (index) {
        this.templateIndex = index;
        var isbn = "<isbn/>";
        var shortbooktitle = createShortBookTitle(this.data.booktitle);
        for (var i = 0; i < this.publisher.books.length; i++) {
            if (this.publisher.books[i].title.trim().toLowerCase() == this.data.booktitle.trim().toLowerCase()) {
                isbn = this.publisher.books[i].isbn13;
                if (!isbn) {
                    isbn = this.publisher.books[i].isbn10;
                }
                if (isbn) {
                    break;
                }
            }
        }
        this.updateTemplate(shortbooktitle, isbn);
    };
    SendMailDialog.prototype.selectAddress = function (address) {
        this.data.mailaddress = address;
    };
    SendMailDialog.prototype.selectBook = function (book) {
        this.data.booktitle = book.title;
        var isbn = book.isbn13;
        if (isbn == "") {
            isbn = book.isbn10;
        }
        var shortbooktitle = createShortBookTitle(book.title);
        this.updateTemplate(shortbooktitle, isbn);
    };
    SendMailDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.agencies = [];
        this.publisher = this.data.publisher;
        this.templateIndex = 0;
        this.templateCount = this.getSubstringCount(this.data.template, "<mail>\n");
        this.templateCountRange = Array(this.templateCount);
        if (this.publisher) {
            //publisher.agencies.map((agency)=>{return agency.AdminEmail})
            for (var i = 0; i < this.publisher.agencies.length; i++) {
                if (this.publisher.agencies[i].AdminEmail) {
                    if (!this.agencies.some(function (agency) { return agency.mail == _this.publisher.agencies[i].AdminEmail; })) {
                        this.agencies.push({ name: this.publisher.agencies[i].RegistrantName, mail: this.publisher.agencies[i].AdminEmail, website: this.publisher.agencies[i].Website, phone: this.publisher.agencies[i].AdminPhone, contact: this.publisher.agencies[i].FullAdminContactName });
                    }
                }
            }
        }
        var isbn = "";
        var shortbooktitle = "";
        if (this.data.book) {
            isbn = this.data.book.isbn13;
            if (isbn == "") {
                isbn = this.data.book.isbn10;
            }
            shortbooktitle = createShortBookTitle(this.data.book.title);
            if (!this.data.mailsubject) {
                this.data.mailsubject = shortbooktitle + " - Mobile App";
            }
            if (!this.data.booktitle)
                this.data.booktitle = this.data.book.title;
        }
        else {
            if (!this.data.mailsubject)
                this.data.mailsubject = "";
            if (!this.data.booktitle)
                this.data.booktitle = "";
        }
        if (!this.data.mailaddress) {
            if (this.data.mail) {
                this.data.mailaddress = this.data.mail;
            }
            else {
                for (var i = 0; i < this.publisher.agencies.length; i++) {
                    if (this.publisher.agencies[i].AdminEmail) {
                        this.data.mailaddress = this.publisher.agencies[i].AdminEmail;
                        break;
                    }
                }
            }
        }
        if (!this.data.mailtext) {
            this.updateTemplate(shortbooktitle, isbn);
        }
    };
    SendMailDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    SendMailDialog = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-send-mail',
            template: __webpack_require__(/*! ./send-mail.html */ "./src/app/product-list/send-mail.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], SendMailDialog);
    return SendMailDialog;
}());

var TemplateDialog = /** @class */ (function () {
    function TemplateDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.newTemplate = "<mail>\n\n<book/>\n<isbn/>\n\n<mail/>\n\n𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖𝄖";
    }
    TemplateDialog.prototype.addTemplate = function () {
        if (this.data.template) {
            this.data.template = this.data.template + "\n\n" + this.newTemplate;
        }
        else {
            this.data.template = this.newTemplate;
        }
    };
    TemplateDialog.prototype.ngOnInit = function () {
    };
    TemplateDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    TemplateDialog = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'template-dialog',
            template: __webpack_require__(/*! ./template-dialog.html */ "./src/app/product-list/template-dialog.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], TemplateDialog);
    return TemplateDialog;
}());

var StatisticsDialog = /** @class */ (function () {
    function StatisticsDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    StatisticsDialog.prototype.ngOnInit = function () {
    };
    StatisticsDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    StatisticsDialog = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'statistics',
            template: __webpack_require__(/*! ./statistics.html */ "./src/app/product-list/statistics.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], StatisticsDialog);
    return StatisticsDialog;
}());

var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(_snackBar, api, dialog) {
        this._snackBar = _snackBar;
        this.api = api;
        this.dialog = dialog;
        this.products = _products__WEBPACK_IMPORTED_MODULE_4__["products"];
        this.selectedPublisher = { _id: "", books: [], RegistrantName: "" };
        this.selectedPublisherAgencies = [];
        this.selectedPublisherAddress = "";
        this.selectedState = "found";
        this.selectedStateSaved = "saved";
        this.selectedPublisherSaved = {};
        this.accordionState = false;
        this.template = "";
        this.filterText = "";
        this.statistics = {};
        this.host = "http://192.168.178.44:4201";
        this.url = this.host + "/publishers/get"; //192.168.178.91:4201
        this.mailurl = this.host + "/publishers/send"; //192.168.178.91:4201
        this.updateurl = this.host + "/publishers/update"; //192.168.178.91:4201
        this.publisherStates = [
            { value: 'found', viewValue: 'Found Publishers' },
            { value: 'saved', viewValue: 'Saved Publishers' },
            { value: 'sent', viewValue: 'Contacted' },
        ];
    }
    ProductListComponent.prototype.filterChanged = function () {
        this.selectedPublisherState(false);
    };
    ProductListComponent.prototype.createShortTitle = function (title) {
        return createShortBookTitle(title);
    };
    ProductListComponent.prototype.openAccordion = function (state) {
        if (state) {
            this.accordion.openAll();
        }
        else {
            this.accordion.closeAll();
        }
        this.accordionState = state;
    };
    ProductListComponent.prototype.sendMail = function (data) {
        var _this = this;
        this.api.sendMail(this.mailurl, data).subscribe(function (data) {
            console.log(data);
            if (data.status == "ok") {
                _this._snackBar.open("Your email was sent successfully", "OK", {
                    duration: 2000,
                });
            }
        }, function (err) {
            _this._snackBar.open("Error: Your email was not sent successfully", "OK", {
                duration: 10000,
            });
        });
    };
    ProductListComponent.prototype.openMailTemplate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(TemplateDialog, {
            width: "900px", data: { template: this.template }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result && result.action == "close") {
                _this.template = result.template;
                _this.api.update(_this.updateurl, "template", _this.template).subscribe(function (data) { }, function (err) { });
            }
        });
    };
    ProductListComponent.prototype.openStatistics = function () {
        var dialogRef = this.dialog.open(StatisticsDialog, {
            data: { statistics: this.statistics }
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    ProductListComponent.prototype.cleanMail = function (data) {
        var mail = {};
        mail.mailaddress = data.mailaddress;
        mail.mailsubject = data.mailsubject;
        mail.mailtext = data.mailtext;
        mail.booktitle = data.booktitle;
        mail.sent = data.sent;
        mail.update = data.update;
        mail.index = data.index;
        return mail;
    };
    ProductListComponent.prototype.openMailTimeout = function (mail, index) {
        var _this = this;
        setTimeout(function () {
            _this.openMail(mail, index);
        }, 100);
    };
    ProductListComponent.prototype.openMail = function (mail, index) {
        var _this = this;
        var dialogRef = this.dialog.open(SendMailDialog, {
            width: "900px", data: { publisher: this.selectedPublisher, mail: mail.mailaddress, booktitle: mail.booktitle, mailsubject: mail.mailsubject, mailtext: mail.mailtext, update: true, index: index, template: this.template }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                if (result.action == "save") {
                    var mail = _this.cleanMail(result.data);
                    _this.savePublisher(false, mail);
                }
                else if (result.action == "send") {
                    result.data.sent = true;
                    var mail = _this.cleanMail(result.data);
                    _this.sendMail(mail);
                    _this.savePublisher(true, mail);
                }
            }
        });
    };
    ProductListComponent.prototype.openDialogTimeout = function (book, mail, event) {
        var _this = this;
        if (event) {
            var target = event.target || event.srcElement || event.currentTarget;
            target.blur();
        }
        setTimeout(function () {
            _this.openDialog(book, mail);
        }, 100);
    };
    ProductListComponent.prototype.openDialog = function (book, mail) {
        var _this = this;
        var dialogRef = this.dialog.open(SendMailDialog, {
            width: "900px", data: { publisher: this.selectedPublisher, book: book, mail: mail, template: this.template }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.action == "save") {
                var mail = _this.cleanMail(result.data);
                _this.savePublisher(false, mail);
            }
            else if (result.action == "send") {
                result.data.sent = true;
                var mail = _this.cleanMail(result.data);
                _this.sendMail(mail);
                _this.savePublisher(true, mail);
            }
        });
    };
    ProductListComponent.prototype.selectPublisher = function (publisher) {
        this.selectedPublisherSaved[this.selectedState] = publisher;
        this.selectedPublisher = publisher;
        this.selectedPublisherAgencies = []; //publisher.agencies.map((agency)=>{return agency.AdminEmail})
        this.selectedPublisherAddress = "";
        for (var i = 0; i < publisher.agencies.length; i++) {
            if (!this.selectedPublisherAddress) {
                this.selectedPublisherAddress = publisher.agencies[i].FullAddress + ", " + publisher.agencies[i].Country;
            }
            if (publisher.agencies[i].AdminEmail || publisher.agencies[i].Website || publisher.agencies[i].AdminPhone || publisher.agencies[i].FullAdminContactName) {
                if (!this.selectedPublisherAgencies.some(function (agency) { return agency.mail == publisher.agencies[i].AdminEmail; })) {
                    this.selectedPublisherAgencies.push({ name: publisher.agencies[i].RegistrantName, mail: publisher.agencies[i].AdminEmail, website: publisher.agencies[i].Website, phone: publisher.agencies[i].AdminPhone, contact: publisher.agencies[i].FullAdminContactName });
                }
            }
        }
    };
    ProductListComponent.prototype.openTab = function (url) {
        var win = window.open(url, '_blank');
        if (win)
            win.focus();
        else {
            setTimeout(function () { this.openTab(url); }, 500);
        }
    };
    ProductListComponent.prototype.onListClicked = function (publisher) {
        publisher.visibleBooks = publisher.books.slice(0, 50);
        this.selectPublisher(publisher);
    };
    ProductListComponent.prototype.onBookClicked = function (book) {
        this.openTab(book.url);
    };
    ProductListComponent.prototype.onSearchPublisherClicked = function () {
        this.openTab("https://www.google.de/search?q=" + encodeURIComponent(this.selectedPublisher.RegistrantName));
    };
    ProductListComponent.prototype.onSearchPublisherLocationClicked = function () {
        this.openTab("https://www.google.de/maps/place/" + encodeURIComponent(this.selectedPublisherAddress));
    };
    ProductListComponent.prototype.openPerson = function (agency) {
        if (agency.contact) {
            this.openTab("https://www.google.de/search?q=" + encodeURIComponent(agency.contact + " " + agency.name));
        }
        else {
            this.openTab("https://www.google.de/search?q=" + encodeURIComponent(agency.name));
        }
    };
    ProductListComponent.prototype.searchAgency = function (agency, webpage, nogoogle) {
        if (agency.name) {
            if (!nogoogle) {
                this.openTab("https://www.google.de/search?q=" + encodeURIComponent((agency.name + " " + webpage).trim()));
            }
            else if (webpage == "LinkedIn") {
                this.openTab("https://www.linkedin.com/search/results/companies/?keywords=" + encodeURIComponent((agency.name).trim()));
            }
            else if (webpage == "Xing") {
                this.openTab("https://www.xing.com/search/companies?keywords=" + encodeURIComponent((agency.name).trim()));
            }
            else if (webpage == "Facebook") {
                this.openTab("https://www.facebook.com/search/top/?q=" + encodeURIComponent((agency.name).trim()));
            }
            else {
                this.openTab("https://www.google.de/search?q=" + encodeURIComponent((agency.name + " " + webpage).trim()));
            }
        }
    };
    ProductListComponent.prototype.removePublisher = function () {
        this.api.update(this.updateurl, "delete", this.selectedPublisher).subscribe(function (data) {
        }, function (err) {
        });
        var savedSelectedPublisher = this.selectedPublisher;
        this.selectedPublisher.saved = false;
        this.selectedPublisher.sent = false;
        this.selectedPublisherState(false);
        if (this.selectedPublisherList.length > 0) {
            var newPublisher = this.selectedPublisherList[0];
            var publisherFound = false;
            for (var i = 0; i < this.publisherList.length; i++) {
                if ((this.publisherList[i].saved && this.selectedState == "saved") || (this.publisherList[i].sent && this.selectedState == "sent")) {
                    newPublisher = this.publisherList[i];
                    if (publisherFound == true) {
                        break;
                    }
                }
                if (this.publisherList[i].RegistrantName === savedSelectedPublisher.RegistrantName) {
                    publisherFound = true;
                }
            }
            this.selectPublisher(newPublisher);
        }
        else {
            this.selectPublisher({ _id: "", books: [], RegistrantName: "" });
        }
    };
    ProductListComponent.prototype.deleteMail = function (mail, index) {
        this.selectedPublisher.mails.splice(index, 1);
        this.api.update(this.updateurl, "mails", this.selectedPublisher).subscribe(function (data) { }, function (err) { });
    };
    ProductListComponent.prototype.savePublisher = function (send, mail) {
        if (send) {
            this.api.update(this.updateurl, "send", this.selectedPublisher).subscribe(function (data) { }, function (err) { });
        }
        else {
            this.api.update(this.updateurl, "save", this.selectedPublisher).subscribe(function (data) { }, function (err) { });
        }
        var savedSelectedPublisher = this.selectedPublisher;
        if (mail) {
            if (!this.selectedPublisher.mails) {
                this.selectedPublisher.mails = [];
            }
            if (mail.update) {
                this.selectedPublisher.mails[mail.index] = mail;
            }
            else {
                this.selectedPublisher.mails.push(mail);
            }
            this.api.update(this.updateurl, "mails", this.selectedPublisher).subscribe(function (data) { }, function (err) { });
        }
        if (send) {
            this.selectedPublisher.saved = true;
            this.selectedPublisher.sent = true;
            this.selectedPublisherSaved["sent"] = this.selectedPublisher;
        }
        else {
            this.selectedPublisher.saved = true;
            this.selectedPublisherSaved["saved"] = this.selectedPublisher;
        }
        this.selectedPublisherState(false);
        if (this.selectedState == "found" || (this.selectedState == "saved" && (!this.selectedPublisher.saved || this.selectedPublisher.sent)) || (this.selectedState == "sent" && !this.selectedPublisher.sent)) {
            if (this.selectedPublisherList.length > 0) {
                var newPublisher = this.selectedPublisherList[0];
                var publisherFound = false;
                for (var i = 0; i < this.publisherList.length; i++) {
                    if ((!this.publisherList[i].saved && this.selectedState == "found") || (!this.publisherList[i].saved && !this.publisherList[i].sent && this.selectedState == "sent")) {
                        newPublisher = this.publisherList[i];
                        if (publisherFound == true) {
                            break;
                        }
                    }
                    if (this.publisherList[i].RegistrantName === savedSelectedPublisher.RegistrantName) {
                        publisherFound = true;
                    }
                }
                this.selectPublisher(newPublisher);
            }
            else {
                this.selectPublisher({ _id: "", books: [], RegistrantName: "" });
            }
        }
    };
    ProductListComponent.prototype.filterEMail = function (agency) {
        return (agency.AdminEmail != "");
    };
    ProductListComponent.prototype.selectedPublisherState = function (changeSelected) {
        if (this.selectedState == "found") {
            this.selectedPublisherList = this.publisherList.filter(function (publisher) { return !publisher.saved && !publisher.sent && !publisher.deleted && publisher.RegistrantName != undefined && publisher.RegistrantName != ""; });
        }
        else if (this.selectedState == "saved") {
            this.selectedPublisherList = this.publisherList.filter(function (publisher) { return publisher.saved && !publisher.sent && !publisher.deleted && publisher.RegistrantName != undefined && publisher.RegistrantName != ""; });
        }
        else if (this.selectedState == "sent") {
            this.selectedPublisherList = this.publisherList.filter(function (publisher) { return publisher.sent && !publisher.deleted && publisher.RegistrantName != undefined && publisher.RegistrantName != ""; });
        }
        else if (this.selectedState == "deleted") {
            this.selectedPublisherList = this.publisherList.filter(function (publisher) { return publisher.deleted && publisher.RegistrantName != undefined && publisher.RegistrantName != ""; });
        }
        if (this.filterText) {
            var filterLowerCase = this.filterText.toLowerCase().trim().split(",");
            this.selectedPublisherList = this.selectedPublisherList.filter(function (publisher) {
                if (filterLowerCase) {
                    if (filterLowerCase.some(function (filterPart) {
                        if (filterPart) {
                            if (publisher.agencies.some(function (agency) {
                                var registrantNameLowerCase = agency.RegistrantName.toLowerCase().trim();
                                if (registrantNameLowerCase.indexOf(filterPart) != -1 || filterPart.indexOf(registrantNameLowerCase) != -1) {
                                    return true;
                                }
                            })) {
                                return true;
                            }
                            if (publisher.books.some(function (book) {
                                var titleLowerCase = book.title.toLowerCase().trim();
                                if (titleLowerCase.indexOf(filterPart) != -1 || filterPart.indexOf(titleLowerCase) != -1) {
                                    return true;
                                }
                            })) {
                                return true;
                            }
                            if (publisher.agencies.some(function (agency) {
                                var countryLowerCase = agency.Country.toLowerCase().trim();
                                if (countryLowerCase.indexOf(filterPart) != -1 || filterPart.indexOf(countryLowerCase) != -1) {
                                    return true;
                                }
                            })) {
                                return true;
                            }
                        }
                        else {
                            return false;
                        }
                    })) {
                        return true;
                    }
                }
                else {
                    return true;
                }
            });
        }
        if (changeSelected) {
            if (this.selectedPublisherList.length > 0) {
                if (this.selectedPublisherSaved[this.selectedState]) {
                    this.selectPublisher(this.selectedPublisherSaved[this.selectedState]);
                }
                else {
                    this.selectPublisher(this.selectedPublisherList[0]);
                }
            }
            else {
                this.selectPublisher({ _id: "", books: [], RegistrantName: "" });
            }
        }
    };
    ProductListComponent.prototype.sortSalesRank = function (a, b) {
        if (a.sales_rank <= 0 && b.sales_rank <= 0) {
            return 0;
        }
        else if (b.sales_rank <= 0) {
            return -1;
        }
        else if (a.sales_rank <= 0) {
            return 1;
        }
        else if (a.sales_rank < b.sales_rank) {
            return -1;
        }
        else if (a.sales_rank > b.sales_rank) {
            return 1;
        }
        else {
            return 0;
        }
    };
    ProductListComponent.prototype.preparePublisherList = function (publishers, statistics) {
        var _this = this;
        var filterPublisherList = ["FinanzBuch Verlag", "Unknown"];
        publishers = publishers.filter(function (publisher) {
            if (filterPublisherList.some(function (text) {
                if (publisher.RegistrantName && publisher.RegistrantName.indexOf(text) != -1) {
                    return true;
                }
            })) {
                console.log("FILTER OUT: " + publisher.RegistrantName);
                return false;
            }
            else {
                return true;
            }
        });
        var booksNum = 0;
        publishers.forEach(function (publisher) {
            var bestSalesRank = 100000000;
            if (!publisher.books) {
                publisher.books = [];
            }
            booksNum = booksNum + publisher.books.length;
            publisher.books.sort(_this.sortSalesRank);
            publisher.books.some(function (book) {
                if (book.sales_rank && book.sales_rank > 0) {
                    bestSalesRank = book.sales_rank;
                    return true;
                }
            });
            publisher.sales_rank = bestSalesRank;
            publisher.visibleBooks = publisher.books.slice(0, 50);
        });
        statistics.booksNum = booksNum;
        statistics.publishersNum = publishers.length;
        publishers.sort(this.sortSalesRank);
        console.log("preparePublisherList ready");
        return publishers;
    };
    ProductListComponent.prototype.onScroll = function () {
        if (this.selectedPublisher.books.length != this.selectedPublisher.visibleBooks.length) {
            var detailscontainer = document.getElementById('publisherDetailsContainer');
            if (detailscontainer.scrollHeight - detailscontainer.scrollTop <= detailscontainer.clientHeight + 300) {
                this.selectedPublisher.visibleBooks = this.selectedPublisher.books.slice(0, this.selectedPublisher.visibleBooks.length + 20);
            }
        }
    };
    ProductListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.api
            .getTemplate(this.url)
            .subscribe(function (data) {
            _this.template = data.template;
        }, function (err) {
            console.log(err);
        });
        this.api
            .getPublishers(this.url)
            .subscribe(function (data) {
            _this.statistics = {};
            data = _this.preparePublisherList(data, _this.statistics);
            _this.publisherList = data;
            _this.selectedPublisherState(false);
            if (_this.selectedPublisherList.length > 0) {
                _this.selectPublisher(_this.selectedPublisherList[0]);
            }
        }, function (err) {
            console.log(err);
        });
        this.publisherList = [];
        //onSendEMailClicked()
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelectionList"], { static: true }),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelectionList"])
    ], ProductListComponent.prototype, "publishers", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("accordion", { static: false }),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatAccordion"])
    ], ProductListComponent.prototype, "accordion", void 0);
    ProductListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product-list',
            template: __webpack_require__(/*! ./product-list.component.html */ "./src/app/product-list/product-list.component.html"),
            styles: [__webpack_require__(/*! ./product-list.component.css */ "./src/app/product-list/product-list.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"], _api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], ProductListComponent);
    return ProductListComponent;
}());

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 


/***/ }),

/***/ "./src/app/product-list/send-mail.html":
/*!*********************************************!*\
  !*** ./src/app/product-list/send-mail.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title style=\"font-size:18px\"> {{publisher.RegistrantName+ \"  -  E-Mail\"}}</h2>\r\n<mat-dialog-content class=\"mat-typography\" style=\"min-width:650px;\">\r\n\r\n      \r\n    <mat-card style=\"padding:8px;margin-bottom:8px;\">\r\n        <div style=\"height:20px;\">\r\n            <span style=\"float:left;color:grey;margin-right:10px;height:25px;\">Address: </span><span\r\n                style=\"float:left;height:25px;width:calc(100% - 70px)\"> <input matInput  style=\"height:20px;overflow:hidden\"\r\n                    type=\"text\" matInput   [(ngModel)]=\"data.mailaddress\"   /></span>\r\n        </div>\r\n        \r\n    </mat-card>\r\n\r\n    <mat-card style=\"padding:8px;margin-bottom:15px;\">\r\n\r\n        <div style=\"height:20px;\">\r\n            <span style=\"float:left;color:grey;margin-right:10px;height:25px;\">Subject: </span> <span\r\n                style=\"float:left;height:25px;width:calc(100% - 70px)\"><input matInput  style=\"height:20px;overflow:hidden\"\r\n                    type=\"text\" matInput [(ngModel)]=\"data.mailsubject\"  /></span>\r\n        </div>\r\n\r\n    </mat-card>\r\n \r\n\r\n\r\n    <mat-card >\r\n        <textarea  matInput [(ngModel)]=\"data.mailtext\" style=\"min-height:280px;\"></textarea>\r\n\r\n\r\n\r\n    </mat-card>\r\n    <br />\r\n    \r\n    <mat-menu #optionsMenu=\"matMenu\">\r\n            <button *ngIf=\"agencies.length>0\" mat-menu-item [matMenuTriggerFor]=\"adressMenu\">Select Mail Address</button>\r\n            <button *ngIf=\"publisher.books.length>0 && publisher.books.length < 1000\" mat-menu-item [matMenuTriggerFor]=\"bookMenu\">Select Book</button>\r\n            <button *ngIf=\"templateCount>0\" mat-menu-item [matMenuTriggerFor]=\"templateMenu\">Select Template</button>\r\n          </mat-menu>\r\n          <mat-menu #bookMenu=\"matMenu\">\r\n                <button (click)=\"selectBook(book)\" *ngFor=\"let book of publisher.books\" mat-menu-item>{{book.title}}</button>\r\n\r\n        </mat-menu>\r\n\r\n          <mat-menu #adressMenu=\"matMenu\">\r\n            <button (click)=\"selectAddress(agency.mail)\"   *ngFor=\"let agency of agencies\" mat-menu-item title= \"{{agency.name}}\">{{agency.mail}}</button> \r\n        </mat-menu>\r\n\r\n\r\n        <mat-menu #templateMenu=\"matMenu\">\r\n            <button (click)=\"selectTemplate(i)\"   *ngFor=\"let index of templateCountRange; let i = index \" mat-menu-item >{{\"Template \"+(i+1)}}</button> \r\n        </mat-menu>\r\n    \r\n\r\n\r\n\r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"end\">\r\n    <button *ngIf=\"(templateCount>0 || agencies.length>0 || (publisher.books.length>0 && publisher.books.length < 1000))\" style=\"margin-right:30px\" mat-button [matMenuTriggerFor]=\"optionsMenu\">Options</button>\r\n    <button mat-button [mat-dialog-close]=\"{action:'close'}\" mat-dialog-close >Cancel</button>\r\n    <button mat-button [mat-dialog-close]=\"{action:'save',data:data}\"  mat-dialog-close>Save</button>\r\n    <button mat-button [mat-dialog-close]=\"{action:'send',data:data}\"   mat-dialog-close>Send</button>\r\n</mat-dialog-actions>"

/***/ }),

/***/ "./src/app/product-list/statistics.html":
/*!**********************************************!*\
  !*** ./src/app/product-list/statistics.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title style=\"font-size:18px\">Statistics</h2>\r\n<mat-dialog-content class=\"mat-typography\" style=\"min-width:650px;\">\r\n        \r\n    {{data.statistics.publishersNum+\" Publishers\"}}<br/>\r\n    {{data.statistics.booksNum+\" Books\"}}<br/>\r\n\r\n    <br/>\r\n      \r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"end\">\r\n\r\n    <button mat-button [mat-dialog-close]=\"{action:'close',template:data.template}\" mat-dialog-close >OK</button>\r\n</mat-dialog-actions>"

/***/ }),

/***/ "./src/app/product-list/template-dialog.html":
/*!***************************************************!*\
  !*** ./src/app/product-list/template-dialog.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title style=\"font-size:18px\">Edit Mail Template</h2>\r\n<mat-dialog-content class=\"mat-typography\" style=\"min-width:650px;\">\r\n        <mat-card>\r\n             <textarea  matInput [(ngModel)]=\"data.template\" style=\"min-height:360px;\"></textarea>\r\n        </mat-card>\r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"end\">\r\n    <button style=\"margin-right:30px;\" mat-button (click)=\"addTemplate()\">Add Template</button>\r\n    <button mat-button [mat-dialog-close]=\"{action:'close',template:data.template}\" mat-dialog-close >OK</button>\r\n</mat-dialog-actions>"

/***/ }),

/***/ "./src/app/products.ts":
/*!*****************************!*\
  !*** ./src/app/products.ts ***!
  \*****************************/
/*! exports provided: products */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "products", function() { return products; });
var products = [
    {
        name: 'Phone XL',
        price: 799,
        description: 'A large phone with one of the best screens'
    },
    {
        name: 'Phone Mini',
        price: 699,
        description: 'A great phone with one of the best cameras'
    },
    {
        name: 'Phone Standard',
        price: 299,
        description: ''
    }
];
/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 


/***/ }),

/***/ "./src/app/top-bar/top-bar.component.css":
/*!***********************************************!*\
  !*** ./src/app/top-bar/top-bar.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n/*\r\nCopyright Google LLC. All Rights Reserved.\r\nUse of this source code is governed by an MIT-style license that\r\ncan be found in the LICENSE file at http://angular.io/license\r\n*/\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdG9wLWJhci90b3AtYmFyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7OztFQUlFIiwiZmlsZSI6InNyYy9hcHAvdG9wLWJhci90b3AtYmFyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi8qXHJcbkNvcHlyaWdodCBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG5Vc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0XHJcbmNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHA6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuKi8iXX0= */"

/***/ }),

/***/ "./src/app/top-bar/top-bar.component.html":
/*!************************************************!*\
  !*** ./src/app/top-bar/top-bar.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<a [routerLink]=\"['/']\">\r\n  <h1 style=\"margin-left:0px;\">E-Mail Marketing</h1>\r\n</a>\r\n\r\n\r\n\r\n<!-- \r\nCopyright Google LLC. All Rights Reserved.\r\nUse of this source code is governed by an MIT-style license that\r\ncan be found in the LICENSE file at http://angular.io/license\r\n-->"

/***/ }),

/***/ "./src/app/top-bar/top-bar.component.ts":
/*!**********************************************!*\
  !*** ./src/app/top-bar/top-bar.component.ts ***!
  \**********************************************/
/*! exports provided: TopBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopBarComponent", function() { return TopBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TopBarComponent = /** @class */ (function () {
    function TopBarComponent() {
    }
    TopBarComponent.prototype.ngOnInit = function () {
    };
    TopBarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-top-bar',
            template: __webpack_require__(/*! ./top-bar.component.html */ "./src/app/top-bar/top-bar.component.html"),
            styles: [__webpack_require__(/*! ./top-bar.component.css */ "./src/app/top-bar/top-bar.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TopBarComponent);
    return TopBarComponent;
}());

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"]);
/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\norbe\Projekte\EMailMarketing\client\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map