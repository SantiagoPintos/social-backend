
export abstract class Publication{
    id?: number;
    autorId!: number;
    content!: string;
    date!: Date;

    constructor(autorId: number, content: string){
        this.autorId = autorId;
        this.content = content;
        this.date = new Date();
    }
}
