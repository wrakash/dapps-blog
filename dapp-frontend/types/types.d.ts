export interface Author {
    name: string;
    designation: string;
    description: string;
    imageUrl: string;
    twitterUrl: string;
  }
  
  export interface FAQ {
    question: string;
    answer: string;
    _id: string;
  }
  
  export interface Paragraph {
    title: string;
    description: string;
    _id: string;
  }
  
  export interface Blog {
    _id: string;
    createdAt: string;
    updatedAt: string;
    url: string;
    title: string;
    description: string;
    keywords: string[];
    image: string;
    author: Author;
    faq: FAQ[];
    paragraphs: Paragraph[];
    indexing: string[];
  }