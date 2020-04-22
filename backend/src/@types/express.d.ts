declare namespace Express {
  export interface Request {
    // anexa ao que já existe do request
    user: {
      id: string;
    };
  }
}
