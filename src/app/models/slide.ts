
export class SlideField {
    id: string | undefined;
    name: string | undefined;
    value: any;
    type: string | undefined;
}

export class Slide {
    id: string | undefined;
    name: string | undefined;
    fields: SlideField[] = [];
    fadeOut: boolean = false;
}
