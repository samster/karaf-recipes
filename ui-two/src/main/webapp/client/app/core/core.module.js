(function() {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngMaterial',
        /*
         * Our reusable cross app code modules
         */
        'blocks.router',
        'blocks.logger',
        /*
         * 3rd Party modules
         */
        'ui.router'
    ]);
})();
