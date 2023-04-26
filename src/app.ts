import * as express from "express";
import * as cors from "cors";
import { errorHandler } from "./middlewares/error-handler";
import userRouter from "./users/users.routes";

class Server {
  public app: express.Application;
  private port = 5000;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    this.app.get("/", async (req: express.Request, res: express.Response) => {
      res.json({ message: "Hello, Enko!" });
    });
    this.app.use("/users", userRouter);
  }

  private setMiddleware() {
    this.app.use(cors());

    // json middleware
    this.app.use(express.json());

    this.setRoute();

    //* 404 middleware
    this.app.use((req, res, next) => {
      console.log("haha");
      res.status(404).send("404 NOT FOUND");
    });

    //* 400 error handling
    this.app.use(errorHandler);
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(this.port, () => {
      console.log(`정상적으로 서버를 시작하였습니다. http://localhost:${this.port}`);
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
