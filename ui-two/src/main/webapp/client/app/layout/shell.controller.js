(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', 'logger', '$state'];
    /* @ngInject */
    function ShellController($rootScope, logger, $state) {
        var vm = this;
        vm.navigateTo = navigateTo;
        vm.activeState = 'home';
        vm.isActiveNavItem = isActiveNavItem;

        activate();

        function activate() {
            logger.success('My App loaded!', null);
            vm.isActiveNavItem(vm.activeState);
        }

        function navigateTo(state) {
            logger.success('Navigating to ' + state + '!', null);
            vm.activeState = state;
            $state.go(state);

        }

        function isActiveNavItem(currentNavItem) {
            if (vm.activeState === currentNavItem) {
                return true;
            } else {
                return false;
            }
        }
    }
})();
