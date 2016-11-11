(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };

  
  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getItemsByShrtName = function (shrtName) {

  	var response = $http({
  		method: 'GET',
  		url: (ApiPath + '/menu_items/' + shrtName.trim() + '.json')
  	});

  	return response;
  }

  var signUpData = {
  	firstName: "",
  	lastName: "",
  	email: "",
  	telephone: "",
  	menuItem: ""
  }
	
  service.StoreSignUpData = function(signUpResponse) {
  	signUpData = signUpResponse;
  }

  service.RetrieveSignUpData = function () {
  	/*console.log(signUpData.firstName);
  	console.log(signUpData.lastName);
  	console.log(signUpData.email);
  	console.log(signUpData.telephone);*/
  	console.log(signUpData.menuItem);

  	return signUpData;
  }

}



})();
