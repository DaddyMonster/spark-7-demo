declare global {
  namespace Express {
    interface Session {
      user?: unknown;
    }
  }
}
export {};
