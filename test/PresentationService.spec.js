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
        //make these as ignored
        it("should find Highest und Lowest value", inject(function (PresentationService) {
            var sampleScores = [{value: 1}, {value: 1.45}, {value: 1.111}, {value: 1.111}];
            PresentationService.markIgnoredScores(sampleScores);

            expect(sampleScores[0].ignored).toBe(true);
            expect(sampleScores[1].ignored).toBe(true);
        }));

        //Special Cases:

        //what if all equal
        it("should find Highest und Lowest value, if all values are equal", inject(function (PresentationService) {
            var sampleScores = [{value: 1}, {value: 1}, {value: 1}, {value: 1}];
            PresentationService.markIgnoredScores(sampleScores);
            var counterIgnored = 0;
            var counterNormalScore = 0;
            sampleScores.forEach( function(score) {
                if (score.ignored == true){
                    counterIgnored++;
                }else {
                    counterNormalScore++;
                }
            });
            expect(counterIgnored).toBe(2);
            expect(counterNormalScore).toBe(2);
        }));
        //if there 2 vales the same and there should one of them striked
        it("should strike just 2 values even, if there 2 critical vales the same", inject(function (PresentationService) {
            var sampleScores = [{value: 1}, {value: 1}, {value: 2}, {value: 3}];
            PresentationService.markIgnoredScores(sampleScores);
            var counterIgnored = 0;
            var counterNormalScore = 0;
            sampleScores.forEach( function(score) {
                if (score.ignored == true){
                    counterIgnored++;
                }else {
                    counterNormalScore++;
                }
            });
            expect(sampleScores[3].ignored).toBe(true);
            expect(sampleScores[0].ignored || sampleScores[1].ignored).toBe(true);
            expect(counterIgnored).toBe(2);
            expect(counterNormalScore).toBe(2);
        }));
        //what if one value is not set
        it("should strike just 2 values even, if there is one value not set", inject(function (PresentationService) {
            var sampleScores = [{value: null}, {value: 1}, {value: 2}, {value: 3}, {value: 4}];
            PresentationService.markIgnoredScores(sampleScores);
            var counterIgnored = 0;
            sampleScores.forEach( function(score)  {
                if (score.ignored == true){
                    counterIgnored++;
                }
            });
            expect(sampleScores[4].ignored).toBe(true);
            expect(sampleScores[1].ignored).toBe(true);
            expect(counterIgnored).toBe(2);
        }));
        //remove strike vales if there are less then 4 scores
        it("should not strike something if there are less then 4 actual scores", inject(function (PresentationService) {
            var sampleScores = [{value: null}, {value: 1}, {value: 2}, {value: 3}];
            var sampleScores2 = [{value: 1}, {value: 2}, {value: 3}];
            PresentationService.markIgnoredScores(sampleScores);
            PresentationService.markIgnoredScores(sampleScores2);
            sampleScores.forEach( function(score) {
                expect(score.ignored).not.toBe(true);
            });
            sampleScores2.forEach(function (score) {
                expect(score.ignored).not.toBe(true);
            });
        }));
    });
});