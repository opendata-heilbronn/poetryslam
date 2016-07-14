describe('PresentationService', function () {
    beforeEach(module('psadmin'));

    describe('sumScore', function () {
        var getSampleScores = function () {
            return [{value: 1}, {value: 1.45}, {value: 1.111}];
        };

        it("should sum and round all values", inject(function (PresentationService) {
            expect(PresentationService.sumScore(getSampleScores())).toBe(3.6);
        }));

        it("should not sum scores with ignore true", inject(function (PresentationService) {
            var sampleScores = getSampleScores();
            sampleScores[0].ignored = true;
            expect(PresentationService.sumScore(sampleScores)).toBe(2.6);
        }));
    });
});