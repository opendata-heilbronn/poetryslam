
export enum MessageType {
    Any,
    DataUpdate,
    NextSlide
}

export class Message {
    type: MessageType = MessageType.Any;
    data: any;
}
