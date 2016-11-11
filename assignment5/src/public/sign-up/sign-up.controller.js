(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService'];
function SignUpController(MenuService) {
	var signUpCtrl = this;

	
	signUpCtrl.formSubmit = function () {
		/*console.log(signUpCtrl.firstName);
		console.log(signUpCtrl.lastName);
		console.log(signUpCtrl.email);
		console.log(signUpCtrl.telephone);*/
		
		var promise = MenuService.getItemsByShrtName(signUpCtrl.menuCode);
		signUpCtrl.Message = "";

		promise.then(function (response) {
			var resultLength = response.data.length;

			if (response.data.short_name.length > 0)
			{
				signUpCtrl.Message = "Your information has been saved.";

				var signUpData = {
					firstName: signUpCtrl.firstName,
					lastName: signUpCtrl.lastName,
					email: signUpCtrl.email,
					telephone: signUpCtrl.telephone,
					menuItem: response.data
				}

				MenuService.StoreSignUpData(signUpData);
			}
			else
			{
				signUpCtrl.Message = "No such menu number exists.";
			}
		})
		.catch(function (error) {
			signUpCtrl.Message = "No such menu number exists.";
			//console.log(error);
		});


		
	};
}


})();
