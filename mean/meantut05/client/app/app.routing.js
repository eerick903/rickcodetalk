"use strict";
var router_1 = require('@angular/router');
var login_1 = require('./login');
var register_1 = require('./register');
var landing_1 = require('./landing');
var appRoutes = [
    {
        path: 'login',
        component: login_1.Login
    },
    {
        path: 'register',
        component: register_1.Register
    },
    {
        path: 'landing',
        component: landing_1.Landing
    },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map