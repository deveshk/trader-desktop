describe("Testing App Module", function() {
    describe("App Module:", function() {

        var module;
        beforeEach(function() {
            module = angular.module("app");
        });

        it("should be registered", function() {
            expect(module).not.to.equal(null);
        });

        describe("Dependencies:", function() {

            var deps;
            var hasModule = function(m) {
                return deps.indexOf(m) >= 0;
            };
            beforeEach(function() {
                deps = module.value('appName').requires;
            });

            //you can also test the module's dependencies
            it("should have btford.socket-io as a dependency", function() {
                expect(hasModule('btford.socket-io')).to.equal(true);
            });

            it("should have ngStorage as a dependency", function() {
                expect(hasModule('ngStorage')).to.equal(true);
            });

            it("should have ui.router as a dependency", function() {
                expect(hasModule('ui.router')).to.equal(true);
            });

            it("should have vesparny.fancyModal as a dependency", function() {
                expect(hasModule('vesparny.fancyModal')).to.equal(true);
            });

            it("should have login as a dependency", function() {
                expect(hasModule('login')).to.equal(true);
            });
            it("should have dashboard as a dependency", function() {
                expect(hasModule('dashboard')).to.equal(true);
            });
        });
    });
});