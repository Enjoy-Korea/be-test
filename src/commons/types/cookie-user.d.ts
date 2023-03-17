import { TokenPayload } from './token-payload';

declare global {
  namespace Express {
    interface Request {
      currentUser?: TokenPayload;
    }
  }
}
