export class Config {
    id: string | undefined;
    name: string | undefined;

    textColor1: string | undefined;
    textColor2: string | undefined;
    backgroundColor1: string | undefined;
    backgroundColor2: string | undefined;
    backgroundImage: string | undefined;

    countWinners: number | undefined;
    countJury: number | undefined;



    private randomColor() {
        var makeColorCode = '0123456789ABCDEF';
        var code = '#';
        for (var count = 0; count < 6; count++) {
            code = code + makeColorCode[Math.floor(Math.random() * 16)];
        }
        return code;
    }

    constructor() {

        this.id = crypto.randomUUID();
        this.name = "PoetrySlam " + this.id;

        this.textColor1 = "#fff"; // this.randomColor();
        this.textColor2 = "#dc809d"; // this.randomColor();
        this.backgroundColor1 = "rgba(255,255,255,0.1)"; // this.randomColor();
        this.backgroundColor2 = "rgba(0,0,0,0)"; // this.randomColor();
        this.backgroundImage = "";
        this.countJury = 0;
        this.countWinners = 0;
    }
}
    