import * as React from "react";
import styles from "./ReactCrud.module.scss";
import { IReactCrudProps } from "./IReactCrudProps";
import { escape } from "@microsoft/sp-lodash-subset";

import { ISalesPortalListItem } from "./ISalesPortalListItem";
import { IReactCrudState } from "./IReactCrudState";
import { IProductsListItem } from "./IProductsListItems";
import { ICustomersListItem } from "./ICustomersListItems";
import {
  ISPHttpClientOptions,
  SPHttpClient,
  SPHttpClientResponse,
} from "@microsoft/sp-http";

import {
  TextField,
  autobind,
  PrimaryButton,
  DetailsList,
  DetailsListLayoutMode,
  CheckboxVisibility,
  SelectionMode,
  Dropdown,
  IDropdown,
  IDropdownOption,
  ITextFieldStyles,
  IDropdownStyles,
  Selection,
  Label,
} from "office-ui-fabric-react";
import * as ReactDOM from "react-dom";

//~~~~~~~~~~~~~~~~~Configure the columns for the DetailsList component~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let _salesPortalListColumns = [
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

const textFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: { width: 300 },
};
const narrowDropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Main class component~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export default class CrudWithReact extends React.Component<
  IReactCrudProps,
  IReactCrudState
> {
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Constructors~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  constructor(props: IReactCrudProps, state: IReactCrudState) {
    super(props);
    this.state = {
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

    this._selection = new Selection({
      onSelectionChanged: this._onItemsSelectionChanged,
    });
  }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Selection of list item~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    private _selection: Selection;
    private _onItemsSelectionChanged = () => {
      this.setState({
        SalesPortalListItem:
          this._selection.getSelection()[0] as ISalesPortalListItem,
      });
    }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~DidMount~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  public componentDidMount(): void {
    this.bindDetailsList("All Records have been loaded Successfully");
    this.productsList(
      "All Records have been loaded Successfull & products are also ready"
    );
    this.customersList(
      " All Records have been loaded Successfull & customers are ready"
    );
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~getting list items~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  public bindDetailsList(message: string): void {
    this._getListItems().then((listItems) => {
      this.setState({ SalesPortalListItems: listItems, status: message });
    });
  }
  private _getListItems(): Promise<ISalesPortalListItem[]> {
    const url: string =
      this.props.siteUrl +
      "/_api/web/lists/getbytitle('Orders')/items";
    return this.props.context.spHttpClient
      .get(url, SPHttpClient.configurations.v1)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json.value;
      }) as Promise<ISalesPortalListItem[]>;
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~products names~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  public productsList(message: string): void {
    this._getproducts().then((listItems) => {
      this.setState({ ProductsListItems: listItems, status: message });
      this.state.ProductsListItems.forEach((c) => {
        this.state.ProductOptions.push({
          key: c.ID,
          text: c.ProductName,
        });
      });
    });
  }
  private _getproducts(): Promise<IProductsListItem[]> {
    const url: string =
      this.props.siteUrl +
      "/_api/web/lists/getbytitle('Products')/items";
    return this.props.context.spHttpClient
      .get(url, SPHttpClient.configurations.v1)
      .then((response) => {
        return response.json();
      })
      .then((json) => json.value) as Promise<IProductsListItem[]>;
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Customer Names~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  public customersList(message: string): void {
    this._getcustomers().then((listItems) => {
      this.setState({ CustomersListItems: listItems, status: message });
      this.state.CustomersListItems.forEach((c) => {
        this.state.CustomerOptions.push({
          key: c.ID,
          text: c.CustomerName,
        });
      });
    });
  }
  private _getcustomers(): Promise<ICustomersListItem[]> {
    const url: string =
      this.props.siteUrl +
      "/_api/web/lists/getbytitle('Customers')/items";
    return this.props.context.spHttpClient
      .get(url, SPHttpClient.configurations.v1)
      .then((response) => {
        return response.json();
      })
      .then((json) => json.value) as Promise<ICustomersListItem[]>;
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Auto Populate~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  @autobind
  public autopopulate(value: string): void {
    this.state.ProductsListItems.forEach((c) => {
      if (value == c.ProductName) {
        this.setState(() => ({
          SalesPortalListItem: {
            ID: this.state.SalesPortalListItem.ID,
            CustomerName: this.state.SalesPortalListItem.CustomerName,
            ProductName: c.ProductName,
            ProductType: c.ProductType,
            ProductExpireData: c.ProductExpiryDate.toString(),
            UnitPrice: c.ProductUnitPrice,
            UnitsSold: this.state.SalesPortalListItem.UnitsSold,
            SaleValue: 0,
          },
        }));
      }
    });
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Add items~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  @autobind
  public btnAdd_click(): void {
    const url: string =
      this.props.siteUrl +
      "/_api/web/lists/getbytitle('Orders')/items";

    const spHttpClientOptions: ISPHttpClientOptions = {
      body: JSON.stringify(this.state.SalesPortalListItem),
    };

    this.props.context.spHttpClient
      .post(url, SPHttpClient.configurations.v1, spHttpClientOptions)
      .then((response: SPHttpClientResponse) => {
        if (response.status === 201) {
          this.bindDetailsList(
            "Record added and All Records were loaded Successfully"
          );
        } else {
          let errormessage: string =
            "An error has occured i.e.  " +
            response.status +
            " - " +
            response.statusText;
          this.setState({ status: errormessage });
        }
      });
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Update itemss~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  @autobind
  public btnUpdate_click(): void {
    let id: number = this.state.SalesPortalListItem.ID;

    const url: string = `${this.props.siteUrl}/_api/web/lists/getbytitle('Orders')/items(${id})`;

    const headers: any = {
      "X-HTTP-Method": "MERGE",
      "IF-MATCH": "*",
    };

    const spHttpClientOptions: ISPHttpClientOptions = {
      headers: headers,
      body: JSON.stringify(this.state.SalesPortalListItem),
    };

    this.props.context.spHttpClient
      .post(url, SPHttpClient.configurations.v1, spHttpClientOptions)
      .then((response: SPHttpClientResponse) => {
        if (response.status === 204) {
          this.bindDetailsList(
            "Record Updated and All Records were loaded Successfully"
          );
        } else {
          let errormessage: string =
            "An error has occured i.e.  " +
            response.status +
            " - " +
            response.statusText;
          this.setState({ status: errormessage });
        }
      });
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Delete items~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  @autobind
  public btnDelete_click(): void {
    let id: number = this.state.SalesPortalListItem.ID;

    const url: string = `${this.props.siteUrl}/_api/web/lists/getbytitle('Orders')/items(${id})`;

    const headers: any = { "X-HTTP-Method": "DELETE", "IF-MATCH": "*" };

    const spHttpClientOptions: ISPHttpClientOptions = {
      headers: headers,
    };

    this.props.context.spHttpClient
      .post(url, SPHttpClient.configurations.v1, spHttpClientOptions)
      .then((response: SPHttpClientResponse) => {
        if (response.status === 204) {
          alert("record got deleted successfully....");
          this.bindDetailsList(
            "Record deleted and All Records were loaded Successfully"
          );
        } else {
          let errormessage: string =
            "An error has occured i.e.  " +
            response.status +
            " - " +
            response.statusText;
          this.setState({ status: errormessage });
        }
      });
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Calculate items~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  @autobind
  public calculate_click(): void {
    this.setState(() => ({
      SalesPortalListItem: {
        ID: this.state.SalesPortalListItem.ID,
        CustomerName: this.state.SalesPortalListItem.CustomerName,
        ProductName: this.state.SalesPortalListItem.ProductName,
        ProductType: this.state.SalesPortalListItem.ProductType,
        ProductExpireData: this.state.SalesPortalListItem.ProductExpireData,
        UnitPrice: this.state.SalesPortalListItem.UnitPrice,
        UnitsSold: this.state.SalesPortalListItem.UnitsSold,
        SaleValue:
          this.state.SalesPortalListItem.UnitPrice *
          this.state.SalesPortalListItem.UnitsSold,
      },
    }));
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Reset items~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  @autobind
  public btnReset_click(): void {
    this.setState(() => ({
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
    }));
  }
 
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Rendering items~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  public render(): React.ReactElement<IReactCrudProps> {
    const dropdownRef = React.createRef<IDropdown>();
    return (
      <div className={styles.firstdiv}>
        <div className={styles.crudWithReact}>
          <div className={styles.header}>
            <img className={styles.img} src="https://i.imgur.com/CI8ZFdd.png" />
            <Label className={styles.headerlabel}>
              <strong>SP Motors ~ Sales Order Form ♥</strong>
            </Label>
          </div>
          <div className={styles.main}>
            <label className={styles.text}>ID</label>
            <TextField
              className={styles.Mystyle}
              required={false}
              readOnly
              value={this.state.SalesPortalListItem.ID.toString()}
              styles={textFieldStyles}
              onChanged={(e) => {
                this.state.SalesPortalListItem.ID = e;
              }}
            />
            <Label className={styles.text}>Customer Name</Label>
            <Dropdown
              className={styles.Mystyle}
              componentRef={dropdownRef}
              options={this.state.CustomerOptions}
              placeholder="Select Customer Name"
              defaultSelectedKey={this.state.SalesPortalListItem.CustomerName}
              required
              styles={narrowDropdownStyles}
              onChanged={(e) => {
                this.state.SalesPortalListItem.CustomerName = e.text;
              }}
            />
            <Label className={styles.text}>Product Name</Label>
            <Dropdown
              className={styles.Mystyle}
              componentRef={dropdownRef}
              options={this.state.ProductOptions}
              defaultSelectedKey={this.state.SalesPortalListItem.ProductName}
              required
              placeholder="Select Product Name"
              styles={narrowDropdownStyles}
              onChanged={(e) => {
                this.state.SalesPortalListItem.ProductName = e.text;
                this.autopopulate(e.text);
              }}
            />
            <Label className={styles.text}>Product Type</Label>
            <TextField
              className={styles.Mystyle}
              readOnly
              value={this.state.SalesPortalListItem.ProductType}
              styles={textFieldStyles}
              onChanged={(e) => {
                this.state.SalesPortalListItem.ProductType = e;
              }}
            />
            <Label className={styles.text}>Product Expire Date</Label>
            <TextField
              className={styles.Mystyle}
              dateTime="DD/MM/YYYY"
              readOnly
              value={this.state.SalesPortalListItem.ProductExpireData}
              styles={textFieldStyles}
              placeholder="DD/MM/YYYY"
              onChanged={(e) => {
                this.state.SalesPortalListItem.ProductExpireData = e;
              }}
            />
            <Label className={styles.text}>Unit Price</Label>
            <TextField
              className={styles.Mystyle}
              readOnly
              value={this.state.SalesPortalListItem.UnitPrice.toString()}
              styles={textFieldStyles}
              onChanged={(e) => {
                this.state.SalesPortalListItem.UnitPrice = e;
              }}
            />
            <Label className={styles.text}>Units Sold</Label>
            <TextField
              className={styles.Mystyle}
              required={true}
              placeholder="Enter no.of units sold"
              value={this.state.SalesPortalListItem.UnitsSold.toString()}
              styles={textFieldStyles}
              onChanged={(e) => {
                this.state.SalesPortalListItem.UnitsSold = e;
              }}
            />
            <Label className={styles.text}>Sale Value</Label>
            <TextField
              className={styles.Mystyle}
              readOnly
              value={this.state.SalesPortalListItem.SaleValue.toString()}
              styles={textFieldStyles}
              onChanged={(e) => {
                this.state.SalesPortalListItem.SaleValue = e;
              }}
            />
            <PrimaryButton text="Calculate" onClick={this.calculate_click} />
          </div>
          <p className={styles.title}>
            <PrimaryButton text="Add" title="Add" onClick={this.btnAdd_click} />

            <PrimaryButton text="Update" onClick={this.btnUpdate_click} />

            <PrimaryButton text="Delete" onClick={this.btnDelete_click} />

            <PrimaryButton text="Reset" onClick={this.btnReset_click} />
          </p>
          <h3 id="divStatus" className={styles.Status}>
            <strong>{this.state.status}</strong>
          </h3>
        </div>
        <div>
          <div className={styles.heading}>
            <strong>Orders List</strong>
          </div>
          <DetailsList
            className={styles.totallist}
            items={this.state.SalesPortalListItems}
            columns={_salesPortalListColumns}
            setKey="ID"
            checkboxVisibility={CheckboxVisibility.onHover}
            selectionMode={SelectionMode.single}
            layoutMode={DetailsListLayoutMode.fixedColumns}
            compact={true}
            selection={this._selection}
          />
        </div>
      </div>
    );
  }
}


