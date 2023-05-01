import { Request, Response, NextFunction } from "express";

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): void {
  // 터미널에 노란색으로 출력
  console.log("\x1b[33m%s\x1b[0m", error.stack);

  res.status(400).json({ result: "error", reason: error.message });
}

export { errorHandler };
