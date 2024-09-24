import {
  Attributes,
  CreateOptions,
  CreationAttributes,
  DestroyOptions,
  FindOptions,
  Model,
  Transaction,
  UpdateOptions,
} from "sequelize";

export interface IRepository<T extends Model> {
  get(id: string, options?: FindOptions<Attributes<T>>): Promise<T>;

  getAll(options?: FindOptions<Attributes<T>>): Promise<T[]>;

  create(
    newEntity: CreationAttributes<T>,
    options?: CreateOptions<Attributes<T>>
  ): Promise<T>;

  updateOne(
    id: string,
    updateValues: Partial<Attributes<T>>,
    transaction?: Transaction
  ): Promise<T>;

  updateMany(
    updateEntity: Partial<Attributes<T>>,
    options: UpdateOptions<Attributes<T>>
  ): Promise<T[]>;

  deleteOne(id: string, transaction?: Transaction): Promise<T>;

  deleteMany(options?: DestroyOptions<Attributes<T>>): Promise<T[]>;
}
