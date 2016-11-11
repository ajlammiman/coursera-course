(function () {
	"use strict";

	angular.module('public')
	.controller('MyInfoController', MyInfoController);

	MyInfoController.$inject = ['signUpData', 'chosenItem'];
	function MyInfoController(signUpData, chosenItem) {
		var $ctrl = this;

		$ctrl.signUpData = signUpData;
		
		$ctrl.chosenItem = chosenItem.data;
	}


})();
