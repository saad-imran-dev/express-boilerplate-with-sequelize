import express, { Express } from "express";
import Database from "./database";
import { handleErrors } from "./utils/helpers.utils";

export class App {
  private app: Express = express();
  private database = Database.instance;

  constructor() {
    this.setupApp();
  }

  private setupApp() {
    this.setupMiddlewares();
    this.setupRoutes();
    /** Setup `Error handler` after all middlewares & routes  */
    this.app.use(handleErrors);
  }

  private setupRoutes() {
    // Only for testing, to be removed after testing setup
    this.app.get("/", (req, res) => {
      res.send("Hello, World!");
    });
  }

  private setupMiddlewares() {
    this.app.use(express.json());
  }

  public async startServer(port: number) {
    try {
      await this.database.authenticate(); // Authenticates the database connection
      this.app.listen(port, () => {
        // Starts the server on port
        console.log("Server started on port", port);
      });
    } catch (error) {
      console.error(error); // Logs any errors that occur
      process.exit(1); // Exits the process with an error status code
    }
  }
}
