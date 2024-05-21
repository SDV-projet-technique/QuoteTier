export interface Author {
  id: number;
  name: string;
  quotes?: Quote[] | null;
}

export interface Quote {
  id: number;
  text: string;
  approved: boolean;
  likes: number;
  dislikes: number;
  authorId: string | number;
  author?: Author;
}
