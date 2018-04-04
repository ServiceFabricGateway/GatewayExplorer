
import * as module from "module";
import { AppBuilder, Middleware } from "si-appbuilder";
import { KoLayout } from "si-kolayout";
import * as ko from "knockout";
import { AppInsightsManager, AppInsightsContext, ApplicationInsightsOptions, ApplicationInsightsMiddleware } from "si-appbuilder-application-insights-middleware";
import { OidcMiddleware, OIDCAppContext, Subscription, AppContextAuthorizationSuccess, AppContextAuthorizationFailed } from "si-appbuilder-oidcmiddleware";
import { endpoints, EndpointsConfiguration } from "./endpoints";
import { ServiceCollection } from "si-dependency-injection";
import { LayoutMiddleware } from "./Middlewares/LayoutMiddleware";
import { KnockoutApplyBindingsMiddleware } from "./Middlewares/KnockoutApplyBindingsMiddleware";

import "css!./core.less";
export interface AppContext extends AppInsightsContext, OIDCAppContext {

    rootLayout?: KoLayout
    endpoints: EndpointsConfiguration,
    serviceCollection?: ServiceCollection
}
export type AppMiddleware = Middleware<AppContext>;

let config = module.config();
console.log(module);
console.log(config);
let appFunc = new AppBuilder<AppContext>()

    .use(ApplicationInsightsMiddleware)
    .use(OidcMiddleware)
    .use(LayoutMiddleware)
    .use(KnockoutApplyBindingsMiddleware)
    .build();

    appFunc({
        endpoints :endpoints,
        oidcOptions :config.oidc,
        appInsightsOptions : config.applicationInsights,
        serviceCollection : new ServiceCollection(),
    });
