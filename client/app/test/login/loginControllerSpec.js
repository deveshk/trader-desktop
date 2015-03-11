describe("Unit: Login Module", function() {



    beforeEach(module('login'));

    it('should have loginController available', inject(function($rootScope, $controller) {
        var scope = $rootScope.$new();
        var loginController = $controller('loginController', {
            $scope: scope
        });
        expect(loginController).to.not.be.undefined;
        expect(loginController.activate).to.not.be.undefined;
    }));

    it('should contain an loginservice service',
        inject(function(loginservice) {
            expect(loginservice).not.to.equal(null);
        }));

    it('should contain an $location service',
        inject(function($location) {
            expect($location).not.to.equal(null);
        }));

});
