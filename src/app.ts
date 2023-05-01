import * as express from "express";
import * as cors from "cors";
import { errorHandler } from "./middlewares/error-handler";
import userRouter from "./users/users.routes";
import accommodationRouter from "./accommodations/accommodations.routes";
import reservationRouter from "./reservations/reservations.routes";
import { swaggerDocs } from "./utils/swagger";
import "dotenv/config";

export class Server {
  public app: express.Express;
  private port: number = Number(process.env.PORT);

  constructor() {
    const app: express.Express = express();
    this.app = app;
  }

  private setRoute() {
    this.app.get("/", async (req: express.Request, res: express.Response) => {
      res.json({ message: "Hello, Enko!" });
    });
    this.app.use("/api/users", userRouter);
    this.app.use("/api/accommodations", accommodationRouter);
    this.app.use("/api/reservations", reservationRouter);
  }

  private setMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());

    swaggerDocs(this.app);

    this.setRoute();

    //* 404 middleware
    this.app.use((req, res, next) => {
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

  // * 테스트 코드에 사용하기 위함
  public getExpressApp(): express.Express {
    return this.app;
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
