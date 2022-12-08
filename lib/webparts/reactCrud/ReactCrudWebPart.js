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
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'ReactCrudWebPartStrings';
import ReactCrud from './components/ReactCrud';
var ReactCrudWebPart = /** @class */ (function (_super) {
    __extends(ReactCrudWebPart, _super);
    function ReactCrudWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReactCrudWebPart.prototype.render = function () {
        var element = React.createElement(ReactCrud, {
            description: this.properties.description,
            context: this.context,
            siteUrl: this.context.pageContext.web.absoluteUrl
        });
        ReactDom.render(element, this.domElement);
    };
    ReactCrudWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(ReactCrudWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    ReactCrudWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return ReactCrudWebPart;
}(BaseClientSideWebPart));
export default ReactCrudWebPart;
//# sourceMappingURL=ReactCrudWebPart.js.map