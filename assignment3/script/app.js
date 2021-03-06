﻿(function () {
	'use strict';


	angular.module('ShoppingListSearchApp', [])
	.controller('SearchResultsController', SearchResultsController)
	.service('SearchService', SearchService)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
	.directive('searchList', SearchList);;


	SearchResultsController.$inject = ['SearchService'];
	function SearchResultsController(SearchService)
	{
		var searchResults = this;

		searchResults.searchTerm = "";
		searchResults.nothingFound = false;

		var searchPromise = SearchService.MenuItems();

		searchResults.narrowItDown = function () {

			searchResults.foundItems = [];

			if (searchResults.searchTerm.length > 0)
			{
				searchPromise.then(function (response) {
					searchResults.foundItems = GetShoppingList(response.data.menu_items, searchResults.searchTerm.trim());

					if (searchResults.foundItems.length > 0)
					{	
						searchResults.nothingFound = false;
					}
					else
					{
						searchResults.nothingFound = true;
					}
				})
				.catch(function (error) {
					console.log(error);
					searchResults.nothingFound = true;
				});
			}
			else
			{
				searchResults.nothingFound = true;
			}
		}

		searchResults.removeItem = function (index) {
			SearchService.removeItem(searchResults.foundItems, index);
		}
	}

	function GetShoppingList(list, matchText) {
		var matchedList = [];

		for (var i = 0; i < list.length; i++)
		{
			var item = list[i];
			
			if (MatchItem(item.description, matchText))
			{
				matchedList.push(item);
			}
		}

		return matchedList;
	}


	function MatchItem(item, matchText) {
		return (item.toLowerCase().indexOf(matchText.toLowerCase()) != -1);
	}

	SearchService.$inject = ['$http', 'ApiBasePath'];
	function SearchService($http, ApiBasePath)
	{
		var search = this;

		search.MenuItems = function () {
			var response = $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json")
			});

			return response;
		}

		search.removeItem = function(list, index)
		{
			return list.splice(index, 1);
		}
	}

	function SearchList() {
		var ddo = {
			restrict: "E",
			templateUrl: 'searchList.html'
		};

		return ddo;
	}

})();