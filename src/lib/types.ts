export interface Author {
  id: string;
  name: string;
  quotes: Quote[];
}

export interface Quote {
  id: string;
  text: string;
  approved: boolean;
  likes: number;
  dislikes: number;
  authorId: string | number;
  author: Author;
}
