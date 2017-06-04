export class Message {
    content: string;
    username: string;
    messageId?: string;
    userId?: string;

    constructor(content: string,
    username: string, 
    messageId?: string,
    userId?: string){
        this.content = content;
        this.username = username;
        this.userId = userId;
        this.messageId = messageId;
    }

}