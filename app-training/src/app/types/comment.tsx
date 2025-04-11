export interface Comment {
    id: number;
    Body: string;
    MovieId: number;
  }
  
  export interface CreateCommentDTO {
    Body: string;
    MovieId: number;
  }
  