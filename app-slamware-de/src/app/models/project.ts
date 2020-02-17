export class ProjectAppData {

    public name: string;
    public lastOpened: Date;
    public path: string;
    public projectfile: string;
}

export class Project extends ProjectAppData {
    public title: string;
    public primaryColor: string;
}
