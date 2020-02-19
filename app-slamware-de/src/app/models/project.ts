export class ProjectAppData {

    public name: string;
    public lastOpened: Date;
    public path: string;
    public projectfile: string;
}

export class Project extends ProjectAppData {
    public title: string;
    public primaryColor: string;

    public numberJurors: number;
    public numberWinners: number;
    public elimniateTopLow: boolean = true;

    public groups: Group[];

    /**
     *
     */
    constructor() {
        super();

        if (!this.groups) {
            this.groups = [];
        }
        
    }
}

export class Group {
    public id: string;
    public name: string;

    public poets: Poet[] = [];


    /**
     *
     */
    constructor() {
        if (!this.poets) {
            this.poets = [];
        }        
    }
}

export class Poet {
    public name: string;
}
