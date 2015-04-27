(function () {
    'use strict';

    angular
        .module('blocks.logger')
        .factory('logger', logger);

    logger.$inject = ['$log', '$mdToast', '$animate'];

    /* @ngInject */
    function logger($log, $mdToast, $animate) {
        var service = {
            showToasts: true,
            error: error,
            info: info,
            success: success,
            warning: warning,
            // straight to console; bypass toastr
            log: $log.log
        };

        return service;
        /////////////////////

        function error(message, data) {
            toast(message);
            $log.error('Error: ' + message, data);
        }

        function info(message, data) {
            toast(message);
            $log.info('Info: ' + message, data);
        }

        function success(message, data) {
            toast(message);
            $log.info('Success: ' + message, data);
        }

        function warning(message, data) {
            toast(message);
            $log.warn('Warning: ' + message, data);
        }

        function toast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content(message)
                    .position('bottom right')
                    .hideDelay(2000)
            );
        }

    }
}());
