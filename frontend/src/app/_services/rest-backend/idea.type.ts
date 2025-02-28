/**
 * The type of the object that is received from the server when an idea is requested
 */
export interface IdeaType {
  id: number;
  title: string;
  description: string;
  dateTime: Date;
  userId: number;
  createdAt: string;
  updatedAt: string;
  Comments: CommentType[];
  User: UserType;
  upvotes: number;
  downvotes: number;
}

export interface UserType {
  username: string;
}

/**
 * The type of the object that is sent to the server when a new idea is published
 */
export interface IdeaPublishType {
  title: string;
  description: string;
  username: string;
}

/**
 * The type of the object that is sent to the server when a new comment is published
 */
export interface CommentType {
  id?: number;
  text: string;
  ideaID: number;
  User: UserType;
}

/**
 * The type of the object that is received from the server when votes and comments are published
 */
export interface ResponseType {
  message: string;
}

/**
 * The type of the object that is sent to the server when a vote is cast
 */
export interface VoteRequest {
  ideaID: number;
  username: string;
  vote: string;
}
