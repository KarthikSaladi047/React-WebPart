
import { ICustomersListItem } from "./ICustomersListItems";
import { IProductsListItem } from "./IProductsListItems";
import { ISalesPortalListItem } from "./ISalesPortalListItem";

export interface IReactCrudState {
    status: string;
    SalesPortalListItems: ISalesPortalListItem[];
    SalesPortalListItem: ISalesPortalListItem;
    ProductsListItems:IProductsListItem[];
    CustomersListItems:ICustomersListItem[];
    ProductOptions:any[];
    CustomerOptions:any[]; 
  }