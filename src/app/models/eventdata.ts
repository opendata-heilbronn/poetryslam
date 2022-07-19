import { Asset } from "./asset";
import { Config } from "./config";
import { Group } from "./group";
import { Poet } from "./poet";

export class Eventdata {
    config: Config = new Config();
    poets: Poet[] = [];
    groups: Group[] = [];
    assets: Asset[] = [];
    slidePreview: any;
    slideProgram: any;
}
