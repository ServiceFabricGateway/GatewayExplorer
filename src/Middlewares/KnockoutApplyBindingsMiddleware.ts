
import * as ko from "knockout";
import { Middleware, AppFunc } from "si-appbuilder";
import { AppContext, AppMiddleware } from "../index";
import * as NProgress from "nprogress";
 
ko.bindingHandlers.react = {
    init: function () {
        return { controlsDescendantBindings: true }; // important
    },

    update: function (el, valueAccessor, allBindings) {
        let reactModule = ko.unwrap(valueAccessor());
        let Component = reactModule.component;
        var props = ko.toJS(reactModule.props);
        console.log(reactModule);

        require(["react-dom", "react"], (ReactDom: any, React: any) => {
            // tell react to render/re-render
            ReactDom.render(React.createElement(Component, props), el);
        });
    }
};

interface processcapable {
    processRequest(ctx: any): PromiseLike<void>;
}
function isProcesscapable(layout: any): layout is processcapable {
    return layout && "processRequest" in layout;
}

async function onhashchange(this: AppContext) {

    if (isProcesscapable(this.rootLayout)) {
        await this.rootLayout.processRequest({ hash: location.hash });
    }

}
export interface Initiable {
    init(): PromiseLike<any>;
}

function hasInit(layout: any): layout is Initiable {
    return layout && "init" in layout;
}

export async function KnockoutApplyBindingsMiddleware(ctx: AppContext, next: AppFunc<AppContext>) {

    if (ctx.rootLayout) {
        if (hasInit(ctx.rootLayout)) {
            await ctx.rootLayout.init();
        }

        ko.applyBindings(ctx.rootLayout);

    }
    await onhashchange.call(ctx);

    window.onhashchange = onhashchange.bind(ctx);


    NProgress.done();

    if (!document.body.classList.contains("keep-loading")) {
        document.body.classList.remove('loading');
    }


    return await next(ctx);
}