export interface IdeaType{
    idea: {
        id?: number,
        title: string,
        description: string,
        username: string,
        date: Date,
        comments?: CommentType[],
        userID?: number,
        User?: any,
        
    }
        upvotes: number,
        downvotes: number
}

export interface CommentType{
    id?: number
    text: string;
    author: string;
    date: Date;
    ideaID: number,
    userID: number
}