





import * as ko from "knockout";
import { KoLayout, IKoLayout, KnockoutTemplateBindingHandlerOptions } from "si-kolayout";

import { defaults, Factory,observable } from "si-decorators";
 

import * as LoadingLeftTemplate from "template!./templates/LoadingLeftTemplate.html";
 

import * as anime from "animejs";

import { AppContext } from "../index";
import { JSXLayout, KnockoutJsxFactory } from "si-kolayout-jsx"
import { SplitLayout, SplitLayoutOptions } from "si-splitlayout";


import "css!./content/LoadingLayout.less";


export interface LoadingLayoutOptions  {
    context: AppContext;
}

const LoadingLayoutDefaults = {
    context: () => undefined
} as Factory<LoadingLayoutOptions>;



export class RightLayout extends JSXLayout<any> {
    constructor(context: any) {
        super({}, <div>hello</div>)
    }
}
 

@defaults(LoadingLayoutDefaults,true)
export class LoadingLayout extends SplitLayout {

    context: AppContext;

    constructor(layoutOptions: LoadingLayoutOptions ) {
        super();
        //console.log(LoadingLayout.prototype);
        //console.log(SplitLayout.prototype);
       // debugger;
        this.rightLayout = new RightLayout(this.context);
        this.leftLayout = new KoLayout({ name: LoadingLeftTemplate});
    }
          


    signIn() {
        console.log(arguments);
        this.context.userManager.signinRedirect();
    }

    protected afterRender(nodes: HTMLElement[], layout: this) {
       
        nodes[0].classList.add("signup");
        super.afterRender(nodes,layout);
    }
}


export default LoadingLayout;