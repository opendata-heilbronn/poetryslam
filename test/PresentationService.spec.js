describe('PresentationService', function () {
    beforeEach(module('psadmin'));
    var getSampleScores = function () {
        return [{value: 1}, {value: 1.45}, {value: 1.111}];
    };
    describe('sumScore', function () {
        it("should sum and round all values", inject(function (PresentationService) {
            expect(PresentationService.sumScore(getSampleScores())).toBe(3.6);
        }));

        it("should not sum scores with ignore true", inject(function (PresentationService) {
            var sampleScores = getSampleScores();
            sampleScores[0].ignored = true;
            expect(PresentationService.sumScore(sampleScores)).toBe(2.6);
        }));
    });
    describe('sumScoreSecond', function () {
        it("should sum and round all values", inject(function (PresentationService) {
            expect(PresentationService.sumScoreSecond(getSampleScores())).toBe(3.6);
        }));

        it("should also sum scores with ignore true", inject(function (PresentationService) {
            var sampleScores = getSampleScores();
            sampleScores[0].ignored = true;
            expect(PresentationService.sumScoreSecond(sampleScores)).toBe(3.6);
        }));
    });
    describe('markIgnoredScores', function () {
        //Normal Case:
        
        //Find Highest und Lowest value
        it("should find Highest und Lowest value", inject(function (PresentationService) {
            var sampleScores = [{value: 1}, {value: 1.45}, {value: 1.111}, {value: 1.111}];
            PresentationService.markIgnoredScores(sampleScores);

            expect(sampleScores[0].ignored).toBe(true);
            expect(sampleScores[1].ignored).toBe(true);
        }));
        it
            
        
        //make these as ignored
        //Special Cases:
        //what if all equal
        //if there 2 vales the same and there should one of them striked
        //what if one value is not set
        //what if there
        //remove strike vales if there are less then 4 scores
        it("should flag all striked scores ")
    });
});