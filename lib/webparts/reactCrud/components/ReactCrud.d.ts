import * as React from "react";
import { IReactCrudProps } from "./IReactCrudProps";
import { IReactCrudState } from "./IReactCrudState";
export default class CrudWithReact extends React.Component<IReactCrudProps, IReactCrudState> {
    constructor(props: IReactCrudProps, state: IReactCrudState);
    private _selection;
    private _onItemsSelectionChanged;
    componentDidMount(): void;
    bindDetailsList(message: string): void;
    private _getListItems;
    productsList(message: string): void;
    private _getproducts;
    customersList(message: string): void;
    private _getcustomers;
    autopopulate(value: string): void;
    btnAdd_click(): void;
    btnUpdate_click(): void;
    btnDelete_click(): void;
    calculate_click(): void;
    btnReset_click(): void;
    render(): React.ReactElement<IReactCrudProps>;
}
//# sourceMappingURL=ReactCrud.d.ts.map