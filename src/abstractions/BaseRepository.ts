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
import { IRepository } from "./IRepository";

export abstract class BaseRepository<TModel extends Model>
  implements IRepository<TModel>
{
  constructor(private model: { new (): TModel } & typeof Model) {}

  async get(
    id: string,
    options?: FindOptions<Attributes<TModel>>
  ): Promise<TModel> {
    const entity = await this.model.findByPk<TModel>(id, options);

    if (entity) return entity;
    else throw Error("Entity not found");
  }

  async getAll(options?: FindOptions<Attributes<TModel>>): Promise<TModel[]> {
    return this.model.findAll<TModel>(options);
  }

  async create(
    newEntity: CreationAttributes<TModel>,
    options?: CreateOptions<Attributes<TModel>>
  ): Promise<TModel> {
    return this.model.create<TModel>(newEntity, options);
  }

  async updateOne(
    id: string,
    updateValues: Partial<Attributes<TModel>>,
    transaction?: Transaction
  ): Promise<TModel> {
    await this.model.update<TModel>(updateValues, {
      transaction,
      where: { id },
    } as unknown as UpdateOptions<TModel>);
    return this.get(id);
  }

  async updateMany(
    updateValues: Partial<Attributes<TModel>>,
    options: UpdateOptions<Attributes<TModel>>
  ): Promise<TModel[]> {
    await this.model.update<TModel>(updateValues, options);
    return this.getAll({ where: options.where });
  }

  async deleteOne(id: string, transaction?: Transaction): Promise<TModel> {
    const entity = await this.get(id);
    await this.model.destroy({
      transaction,
      where: { id },
    } as unknown as DestroyOptions<TModel>);
    return entity;
  }

  async deleteMany(
    options?: DestroyOptions<Attributes<TModel>>
  ): Promise<TModel[]> {
    const allEntity = await this.getAll({ where: options?.where });
    await this.model.destroy(options);
    return allEntity;
  }
}
