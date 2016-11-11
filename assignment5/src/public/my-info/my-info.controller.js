(function () {
	"use strict";

	angular.module('public')
	.controller('MyInfoController', MyInfoController);

	MyInfoController.$inject = ['signUpData'];
	function MyInfoController(signUpData) {
		var $ctrl = this;

		$ctrl.signUpData = signUpData;
	}


})();
