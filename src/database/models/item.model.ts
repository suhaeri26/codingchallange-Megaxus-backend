import {
  CreationOptional,
  DataTypes,
  Model,
  Optional,
} from "sequelize";
import { sequelize } from "../sequelize";

export interface ItemAttributes {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ItemCreationAttributes
  extends Optional<
    ItemAttributes,
    "id" | "description" | "imageUrl" | "createdAt" | "updatedAt"
  > {}

export class Item
  extends Model<ItemAttributes, ItemCreationAttributes>
  implements ItemAttributes
{
  declare id: CreationOptional<number>;

  declare name: string;
  declare description: string | null;
  declare imageUrl: string | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Item.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "items",
    modelName: "Item",
    timestamps: true,
    underscored: true,
  },
);