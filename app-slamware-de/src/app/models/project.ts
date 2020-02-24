import { Slide } from "./slide";

export class ProjectAppData {

    public name: string;
    public lastOpened: Date;
    public path: string;
    public projectfile: string;
}

export class Project extends ProjectAppData {
    public version: string;
    public title: string;
    public primaryColor: string;
    public secondaryColor: string;

    public numberJurors: number;
    public numberWinners: number;
    public elimniateTopLow: boolean = true;
    public height: number = 1024;
    public width: number = 1920;

    public groups: Group[];
    public poets: Poet[];
    public slides: Slide[];


    /**
     *
     */
    constructor() {
        super();

        if (!this.groups) { this.groups = []; }
        if (!this.poets) { this.poets = []; }
        if (!this.slides) { this.slides = []; }
        
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
    public id: string;
    public name: string;
    public slam: string;
}
