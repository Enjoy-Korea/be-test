import * as express from "express";
import * as cors from "cors";

class Server {
  public app: express.Application;
  private port = 5000;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    this.app.get("/", async (req, res) => {
      res.send("hello enko");
    });
  }

  private setMiddleware() {
    this.app.use(cors());

    // json middleware
    this.app.use(express.json());

    // Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
    this.app.use(express.urlencoded({ extended: false }));

    this.setRoute();

    // 404 middleware
    this.app.use((req, res, next) => {
      console.log("this is error middleware");
      res.send({ error: "404 not found error" });
    });
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
