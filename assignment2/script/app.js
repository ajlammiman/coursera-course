(function () {
	'use strict';


	angular.module('ShoppingListCheckOffApp', [])
	.controller('ShoppingListToBuyController', ShoppingListToBuyController)
	.controller('ShoppingAlreadyBoughtController', ShoppingAlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ShoppingListToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ShoppingListToBuyController(ShoppingListCheckOffService) {
		var toBuy = this;

		toBuy.items = ShoppingListCheckOffService.GetToBuyItems();
	
		toBuy.switchList = function (itemIndex) {
			toBuy.items = ShoppingListCheckOffService.MovedToBoughtList(toBuy.items[itemIndex], itemIndex);
		}
	}


	ShoppingAlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function ShoppingAlreadyBoughtController(ShoppingListCheckOffService) {
		var alreadyBought = this;

		alreadyBought.items = ShoppingListCheckOffService.GetBoughtList();
	}

	

	function ShoppingListCheckOffService()
	{
		var listService = this;

		var toBuyList = CreateToBuyList();
		
		listService.GetToBuyItems = function () {
			return toBuyList;
		};

		var boughtList = [];
		
		listService.MovedToBoughtList = function (item, itemIndex) {
			boughtList.push(AddToList(item.quantity, item.name));
			RemoveFromList(itemIndex, toBuyList);
			
			return toBuyList;
		}

		listService.GetBoughtList = function () {
			return boughtList;
		};

		
	}

	function CreateToBuyList()
	{
		var buyList = [];

		buyList.push(AddToList('10', 'Broccoli'));
		buyList.push(AddToList('5', 'Carrots'));
		buyList.push(AddToList('2', 'Lecttuce'));
		buyList.push(AddToList('1', 'Tofu'));
		buyList.push(AddToList('20', 'Cheeseburgers'));
		
		return buyList;
	}


	function AddToList(quantity, itemName)
	{
		var item = {
			name: itemName,
			quantity: quantity
		};

		return item;
	}

	function RemoveFromList(index, list) {
		list.splice(index, 1);

		return list;
	}

})();