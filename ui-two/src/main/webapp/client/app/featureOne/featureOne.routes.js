(function() {
    'use strict';

    angular
        .module('app.featureOne')
        .run(appRun);

    // appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureStates(getRoutes());
    }

    function getRoutes() {
        return [
            {
                state: 'featureOneSearch',
                config: {
                    templateUrl: 'app/featureOne/search.html',
                    url: '/featureOne/search',
                    controller: 'SearchController',
                    controllerAs: 'vm'
                }
            },
            {
                state: 'featureOneScan',
                config: {
                    templateUrl: 'app/featureOne/scan.html',
                    url: '/featureOne/scan'
                }
            },
            {
                state: 'featureOneResult',
                config: {
                    templateUrl: 'app/featureOne/result.html',
                    url: '/featureOne/result'
                }
            }
        ];
    }
})();
