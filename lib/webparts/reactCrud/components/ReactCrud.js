var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from "react";
import styles from "./ReactCrud.module.scss";
import { SPHttpClient, } from "@microsoft/sp-http";
import { TextField, autobind, PrimaryButton, DetailsList, DetailsListLayoutMode, CheckboxVisibility, SelectionMode, Dropdown, Selection, Label, } from "office-ui-fabric-react";
//~~~~~~~~~~~~~~~~~Configure the columns for the DetailsList component~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var _salesPortalListColumns = [
    {
        key: "ID",
        name: "ID",
        fieldName: "ID",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true,
    },
    {
        key: "CustomerName",
        name: "CustomerName",
        fieldName: "CustomerName",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true,
    },
    {
        key: "ProductName",
        name: "ProductName",
        fieldName: "ProductName",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true,
    },
    {
        key: "ProductExpireData",
        name: "ProductExpireData",
        fieldName: "ProductExpireData",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true,
    },
    {
        key: "UnitPrice",
        name: "UnitPrice",
        fieldName: "UnitPrice",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true,
    },
    {
        key: "UnitsSold",
        name: "UnitsSold",
        fieldName: "UnitsSold",
        minWidth: 50,
        maxWidth: 150,
        isResizable: true,
    },
    {
        key: "SaleValue",
        name: "SaleValue",
        fieldName: "SaleValue",
        minWidth: 50,
        maxWidth: 150,
        isResizable: true,
    },
];
var textFieldStyles = {
    fieldGroup: { width: 300 },
};
var narrowDropdownStyles = {
    dropdown: { width: 300 },
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Main class component~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var CrudWithReact = /** @class */ (function (_super) {
    __extends(CrudWithReact, _super);
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Constructors~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    function CrudWithReact(props, state) {
        var _this = _super.call(this, props) || this;
        _this._onItemsSelectionChanged = function () {
            _this.setState({
                SalesPortalListItem: _this._selection.getSelection()[0],
            });
        };
        _this.state = {
            SalesPortalListItem: {
                ID: 0,
                CustomerName: "",
                ProductName: "",
                ProductType: "",
                ProductExpireData: "",
                UnitPrice: 0,
                UnitsSold: 0,
                SaleValue: 0,
            },
            status: "Ready",
            SalesPortalListItems: [],
            ProductOptions: [],
            CustomerOptions: [],
            ProductsListItems: [],
            CustomersListItems: [],
        };
        _this._selection = new Selection({
            onSelectionChanged: _this._onItemsSelectionChanged,
        });
        return _this;
    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~DidMount~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    CrudWithReact.prototype.componentDidMount = function () {
        this.bindDetailsList("All Records have been loaded Successfully");
        this.productsList("All Records have been loaded Successfull & products are also ready");
        this.customersList(" All Records have been loaded Successfull & customers are ready");
    };
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~getting list items~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    CrudWithReact.prototype.bindDetailsList = function (message) {
        var _this = this;
        this._getListItems().then(function (listItems) {
            _this.setState({ SalesPortalListItems: listItems, status: message });
        });
    };
    CrudWithReact.prototype._getListItems = function () {
        var url = this.props.siteUrl +
            "/_api/web/lists/getbytitle('Orders')/items";
        return this.props.context.spHttpClient
            .get(url, SPHttpClient.configurations.v1)
            .then(function (response) {
            return response.json();
        })
            .then(function (json) {
            return json.value;
        });
    };
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~products names~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    CrudWithReact.prototype.productsList = function (message) {
        var _this = this;
        this._getproducts().then(function (listItems) {
            _this.setState({ ProductsListItems: listItems, status: message });
            _this.state.ProductsListItems.forEach(function (c) {
                _this.state.ProductOptions.push({
                    key: c.ID,
                    text: c.ProductName,
                });
            });
        });
    };
    CrudWithReact.prototype._getproducts = function () {
        var url = this.props.siteUrl +
            "/_api/web/lists/getbytitle('Products')/items";
        return this.props.context.spHttpClient
            .get(url, SPHttpClient.configurations.v1)
            .then(function (response) {
            return response.json();
        })
            .then(function (json) { return json.value; });
    };
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Customer Names~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    CrudWithReact.prototype.customersList = function (message) {
        var _this = this;
        this._getcustomers().then(function (listItems) {
            _this.setState({ CustomersListItems: listItems, status: message });
            _this.state.CustomersListItems.forEach(function (c) {
                _this.state.CustomerOptions.push({
                    key: c.ID,
                    text: c.CustomerName,
                });
            });
        });
    };
    CrudWithReact.prototype._getcustomers = function () {
        var url = this.props.siteUrl +
            "/_api/web/lists/getbytitle('Customers')/items";
        return this.props.context.spHttpClient
            .get(url, SPHttpClient.configurations.v1)
            .then(function (response) {
            return response.json();
        })
            .then(function (json) { return json.value; });
    };
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Auto Populate~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    CrudWithReact.prototype.autopopulate = function (value) {
        var _this = this;
        this.state.ProductsListItems.forEach(function (c) {
            if (value == c.ProductName) {
                _this.setState(function () { return ({
                    SalesPortalListItem: {
                        ID: _this.state.SalesPortalListItem.ID,
                        CustomerName: _this.state.SalesPortalListItem.CustomerName,
                        ProductName: c.ProductName,
                        ProductType: c.ProductType,
                        ProductExpireData: c.ProductExpiryDate.toString(),
                        UnitPrice: c.ProductUnitPrice,
                        UnitsSold: _this.state.SalesPortalListItem.UnitsSold,
                        SaleValue: 0,
                    },
                }); });
            }
        });
    };
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Add items~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    CrudWithReact.prototype.btnAdd_click = function () {
        var _this = this;
        var url = this.props.siteUrl +
            "/_api/web/lists/getbytitle('Orders')/items";
        var spHttpClientOptions = {
            body: JSON.stringify(this.state.SalesPortalListItem),
        };
        this.props.context.spHttpClient
            .post(url, SPHttpClient.configurations.v1, spHttpClientOptions)
            .then(function (response) {
            if (response.status === 201) {
                _this.bindDetailsList("Record added and All Records were loaded Successfully");
            }
            else {
                var errormessage = "An error has occured i.e.  " +
                    response.status +
                    " - " +
                    response.statusText;
                _this.setState({ status: errormessage });
            }
        });
    };
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Update itemss~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    CrudWithReact.prototype.btnUpdate_click = function () {
        var _this = this;
        var id = this.state.SalesPortalListItem.ID;
        var url = this.props.siteUrl + "/_api/web/lists/getbytitle('Orders')/items(" + id + ")";
        var headers = {
            "X-HTTP-Method": "MERGE",
            "IF-MATCH": "*",
        };
        var spHttpClientOptions = {
            headers: headers,
            body: JSON.stringify(this.state.SalesPortalListItem),
        };
        this.props.context.spHttpClient
            .post(url, SPHttpClient.configurations.v1, spHttpClientOptions)
            .then(function (response) {
            if (response.status === 204) {
                _this.bindDetailsList("Record Updated and All Records were loaded Successfully");
            }
            else {
                var errormessage = "An error has occured i.e.  " +
                    response.status +
                    " - " +
                    response.statusText;
                _this.setState({ status: errormessage });
            }
        });
    };
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Delete items~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    CrudWithReact.prototype.btnDelete_click = function () {
        var _this = this;
        var id = this.state.SalesPortalListItem.ID;
        var url = this.props.siteUrl + "/_api/web/lists/getbytitle('Orders')/items(" + id + ")";
        var headers = { "X-HTTP-Method": "DELETE", "IF-MATCH": "*" };
        var spHttpClientOptions = {
            headers: headers,
        };
        this.props.context.spHttpClient
            .post(url, SPHttpClient.configurations.v1, spHttpClientOptions)
            .then(function (response) {
            if (response.status === 204) {
                alert("record got deleted successfully....");
                _this.bindDetailsList("Record deleted and All Records were loaded Successfully");
            }
            else {
                var errormessage = "An error has occured i.e.  " +
                    response.status +
                    " - " +
                    response.statusText;
                _this.setState({ status: errormessage });
            }
        });
    };
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Calculate items~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    CrudWithReact.prototype.calculate_click = function () {
        var _this = this;
        this.setState(function () { return ({
            SalesPortalListItem: {
                ID: _this.state.SalesPortalListItem.ID,
                CustomerName: _this.state.SalesPortalListItem.CustomerName,
                ProductName: _this.state.SalesPortalListItem.ProductName,
                ProductType: _this.state.SalesPortalListItem.ProductType,
                ProductExpireData: _this.state.SalesPortalListItem.ProductExpireData,
                UnitPrice: _this.state.SalesPortalListItem.UnitPrice,
                UnitsSold: _this.state.SalesPortalListItem.UnitsSold,
                SaleValue: _this.state.SalesPortalListItem.UnitPrice *
                    _this.state.SalesPortalListItem.UnitsSold,
            },
        }); });
    };
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Reset items~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    CrudWithReact.prototype.btnReset_click = function () {
        this.setState(function () { return ({
            SalesPortalListItem: {
                ID: 0,
                CustomerName: "",
                ProductName: "",
                ProductType: "",
                ProductExpireData: "",
                UnitPrice: 0,
                UnitsSold: 0,
                SaleValue: 0,
            },
        }); });
    };
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Rendering items~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    CrudWithReact.prototype.render = function () {
        var _this = this;
        var dropdownRef = React.createRef();
        return (React.createElement("div", { className: styles.firstdiv },
            React.createElement("div", { className: styles.crudWithReact },
                React.createElement("div", { className: styles.header },
                    React.createElement("img", { className: styles.img, src: "https://i.imgur.com/CI8ZFdd.png" }),
                    React.createElement(Label, { className: styles.headerlabel },
                        React.createElement("strong", null, "SP Motors ~ Sales Order Form \u2665"))),
                React.createElement("div", { className: styles.main },
                    React.createElement("label", { className: styles.text }, "ID"),
                    React.createElement(TextField, { className: styles.Mystyle, required: false, readOnly: true, value: this.state.SalesPortalListItem.ID.toString(), styles: textFieldStyles, onChanged: function (e) {
                            _this.state.SalesPortalListItem.ID = e;
                        } }),
                    React.createElement(Label, { className: styles.text }, "Customer Name"),
                    React.createElement(Dropdown, { className: styles.Mystyle, componentRef: dropdownRef, options: this.state.CustomerOptions, placeholder: "Select Customer Name", defaultSelectedKey: this.state.SalesPortalListItem.CustomerName, required: true, styles: narrowDropdownStyles, onChanged: function (e) {
                            _this.state.SalesPortalListItem.CustomerName = e.text;
                        } }),
                    React.createElement(Label, { className: styles.text }, "Product Name"),
                    React.createElement(Dropdown, { className: styles.Mystyle, componentRef: dropdownRef, options: this.state.ProductOptions, defaultSelectedKey: this.state.SalesPortalListItem.ProductName, required: true, placeholder: "Select Product Name", styles: narrowDropdownStyles, onChanged: function (e) {
                            _this.state.SalesPortalListItem.ProductName = e.text;
                            _this.autopopulate(e.text);
                        } }),
                    React.createElement(Label, { className: styles.text }, "Product Type"),
                    React.createElement(TextField, { className: styles.Mystyle, readOnly: true, value: this.state.SalesPortalListItem.ProductType, styles: textFieldStyles, onChanged: function (e) {
                            _this.state.SalesPortalListItem.ProductType = e;
                        } }),
                    React.createElement(Label, { className: styles.text }, "Product Expire Date"),
                    React.createElement(TextField, { className: styles.Mystyle, dateTime: "DD/MM/YYYY", readOnly: true, value: this.state.SalesPortalListItem.ProductExpireData, styles: textFieldStyles, placeholder: "DD/MM/YYYY", onChanged: function (e) {
                            _this.state.SalesPortalListItem.ProductExpireData = e;
                        } }),
                    React.createElement(Label, { className: styles.text }, "Unit Price"),
                    React.createElement(TextField, { className: styles.Mystyle, readOnly: true, value: this.state.SalesPortalListItem.UnitPrice.toString(), styles: textFieldStyles, onChanged: function (e) {
                            _this.state.SalesPortalListItem.UnitPrice = e;
                        } }),
                    React.createElement(Label, { className: styles.text }, "Units Sold"),
                    React.createElement(TextField, { className: styles.Mystyle, required: true, placeholder: "Enter no.of units sold", value: this.state.SalesPortalListItem.UnitsSold.toString(), styles: textFieldStyles, onChanged: function (e) {
                            _this.state.SalesPortalListItem.UnitsSold = e;
                        } }),
                    React.createElement(Label, { className: styles.text }, "Sale Value"),
                    React.createElement(TextField, { className: styles.Mystyle, readOnly: true, value: this.state.SalesPortalListItem.SaleValue.toString(), styles: textFieldStyles, onChanged: function (e) {
                            _this.state.SalesPortalListItem.SaleValue = e;
                        } }),
                    React.createElement(PrimaryButton, { text: "Calculate", onClick: this.calculate_click })),
                React.createElement("p", { className: styles.title },
                    React.createElement(PrimaryButton, { text: "Add", title: "Add", onClick: this.btnAdd_click }),
                    React.createElement(PrimaryButton, { text: "Update", onClick: this.btnUpdate_click }),
                    React.createElement(PrimaryButton, { text: "Delete", onClick: this.btnDelete_click }),
                    React.createElement(PrimaryButton, { text: "Reset", onClick: this.btnReset_click })),
                React.createElement("h3", { id: "divStatus", className: styles.Status },
                    React.createElement("strong", null, this.state.status))),
            React.createElement("div", null,
                React.createElement("div", { className: styles.heading },
                    React.createElement("strong", null, "Orders List")),
                React.createElement(DetailsList, { className: styles.totallist, items: this.state.SalesPortalListItems, columns: _salesPortalListColumns, setKey: "ID", checkboxVisibility: CheckboxVisibility.onHover, selectionMode: SelectionMode.single, layoutMode: DetailsListLayoutMode.fixedColumns, compact: true, selection: this._selection }))));
    };
    __decorate([
        autobind
    ], CrudWithReact.prototype, "autopopulate", null);
    __decorate([
        autobind
    ], CrudWithReact.prototype, "btnAdd_click", null);
    __decorate([
        autobind
    ], CrudWithReact.prototype, "btnUpdate_click", null);
    __decorate([
        autobind
    ], CrudWithReact.prototype, "btnDelete_click", null);
    __decorate([
        autobind
    ], CrudWithReact.prototype, "calculate_click", null);
    __decorate([
        autobind
    ], CrudWithReact.prototype, "btnReset_click", null);
    return CrudWithReact;
}(React.Component));
export default CrudWithReact;
//# sourceMappingURL=ReactCrud.js.map