(function() {
    'use strict';

    angular
        .module('app.home')
        .run(appRun);

    // appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureStates(getRoutes());
    }

    function getRoutes() {
        return [
            {
                state: 'home',
                config: {
                    templateUrl: 'app/home/home.html',
                    url: '/home'
                }
            }
        ];
    }
})();
