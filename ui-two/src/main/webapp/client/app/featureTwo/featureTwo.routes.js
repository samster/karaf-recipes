(function() {
    'use strict';

    angular
        .module('app.featureTwo')
        .run(appRun);

    // appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureStates(getRoutes());
    }

    function getRoutes() {
        return [
            {
                state: 'featureTwoLookup',
                config: {
                    templateUrl: 'app/featureTwo/lookup.html',
                    url: '/featureTwo/lookup'
                }
            },
            {
                state: 'featureTwoSearch',
                config: {
                    templateUrl: 'app/featureTwo/search.html',
                    url: '/featureTwo/search'
                }
            },
            {
                state: 'featureTwoResult',
                config: {
                    templateUrl: 'app/featureTwo/result.html',
                    url: '/featureTwo/result'
                }
            }
        ];
    }
})();
