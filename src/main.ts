import * as module from "module";
console.log(module.id);

function indexModule(name){
    return {
        name: name,
        location: "libs/"+name,
        main: "index"
    }   ;
}
requirejs.config({
    shim:{
        "oidc-client": {
            exports: "Oidc"
        }
    },
    paths:{
    "css": "libs/requirejs/css",
    "text": "libs/requirejs/text",
    "nprogress": "libs/nprogress/nprogress",
    "knockout": ["//cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-min", "libs/knockout/knockout-latest"],
    "template": "libs/si-kolayout/src/template",
    "stringTemplateEngine": "libs/si-kolayout/src/stringTemplateEngine",
    "si-appbuilder-application-insights-middleware": "libs/si-appbuilder-application-insights-middleware/ApplicationInsightsMiddleware",
    "si-appbuilder-oidcmiddleware": "libs/si-appbuilder-oidcmiddleware/OidcMiddleware",
    "oidc-client": ["//cdnjs.cloudflare.com/ajax/libs/oidc-client/1.4.1/oidc-client.min", "libs/oidc-client/oidc-client.min"],
    "animejs": "libs/animejs/anime.min",
    },
    packages:[
        {
            name: "ServiceFabricGateway",
            location: "src",
            main: "index"
        },
        indexModule("si-appbuilder"),
        indexModule("si-dependency-injection"),
        indexModule("si-kolayout"),
        indexModule("si-decorators"),
        indexModule("si-kolayout-jsx"),
        indexModule("si-splitlayout")
    ]
});

require(["nprogress"], function (NProgress) {
    NProgress.configure({ minimum: 0.1 });
    NProgress.start();
    require([module.config().rootModule]);
});