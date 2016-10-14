(function () {
	'use strict';

	angular.module('LunchBoxApp', [])
	.controller('LunchBoxController', LunchBoxController);

	LunchBoxController.inject = '$scope';

	function LunchBoxController($scope)
	{
		
		$scope.check = function () {
			var items = CreateMenuArray($scope.menu);

			var filteredItems = RemoveEmptyItems(items);

			var mLength = MenuLength(filteredItems);

			var rMsg = ResultMessage(mLength);

			var rColour = ResultColour(mLength);

			$scope.messageColour = 'message-' + rColour;
			$scope.message = rMsg;
		};

		

	}

	function CreateMenuArray(menuVal) {
		var menuItems = [];
		
		if (menuVal != null && menuVal != '') {
			menuItems = menuVal.split(",");
		}

		return menuItems;
	}

	function RemoveEmptyItems(menuItems)
	{
		var returnItems = [];

		for (var i = 0; i < menuItems.length; i++) {
			if (menuItems[i] != '')
			{
				returnItems.push(menuItems[i]);
			}
		}

		return returnItems;
	}

	function MenuLength(items) {
			return items.length;
	}
	
	function ResultMessage(menuCount) {
			var resultMsg = '';

			if (menuCount == 0) {
				resultMsg = 'Please enter data first'
			}
			else if (menuCount > 0 && menuCount <= 3) {
				resultMsg = 'Enjoy!'
			}
			else {
				resultMsg = 'Too Much!'
			}

			return resultMsg;
	}

	function ResultColour(menuCount)
	{
		var colour = "red";

		if (menuCount != 0)
		{
			colour = "green"
		}

		return colour;
	}

})();