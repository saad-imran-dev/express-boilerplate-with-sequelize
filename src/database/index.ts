import { Sequelize } from "sequelize";

class Database {
  static #instance: Database;

  private sequelize: Sequelize;

  private constructor() {
    this.sequelize = new Sequelize(process.env.DATABASE_URL!, {
      logging: false, // Disables logging of SQL queries,
    });
  }

  public static get instance() {
    if (!Database.#instance) {
      Database.#instance = new Database();
    }
    return Database.#instance.sequelize;
  }
}

export default Database;
