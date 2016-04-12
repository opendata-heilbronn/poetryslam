function Participant(name, subtitle) {
    this.name = name;
    this.subtitle = subtitle;
    this.scores = [];
    this.audienceScore = 0;
    this.manualScore = 0;
    this.manualOrder = 0;
}

function Group() {
    this.participants = [];
    this.winners = 2;
    this.sacrifice = {};
}

function Competition(name) {
    this.name = name;
    this.groups = [];
    this.jurors = 10;
    this.settings = {};
}

function Event() {
    this.name = "BWSLAM16";
    this.competitions = [];
    this.participants = [];
}


