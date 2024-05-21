export interface Author {
  id: number;
  name: string;
  quotes?: Quote[];
}

export interface Quote {
  id: number;
  text: string;
  approved: boolean;
  likes: number;
  dislikes: number;
  authorId: number;
  author?: Author;
}
