
export abstract class Publication{
    id!: number;
    autorId!: number;
    content!: string;
    date!: Date;

    constructor(id: number, autorId: number, content: string, date: Date){
        this.id = id;
        this.autorId = autorId;
        this.content = content;
        this.date = date;
    }
}
