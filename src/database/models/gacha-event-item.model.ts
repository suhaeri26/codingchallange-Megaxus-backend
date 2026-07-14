import {
  CreationOptional,
  DataTypes,
  Model,
  NonAttribute,
  Optional,
} from "sequelize";
import { sequelize } from "../sequelize";
import { GachaEvent } from "./gacha-event.model";
import { Item } from "./item.model";

export interface GachaEventItemAttributes {
  id: number;
  eventId: number;
  itemId: number;
  dropRate: number;
  stock: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GachaEventItemCreationAttributes
  extends Optional<
    GachaEventItemAttributes,
    "id" | "stock" | "createdAt" | "updatedAt"
  > {}

export class GachaEventItem
  extends Model<
    GachaEventItemAttributes,
    GachaEventItemCreationAttributes
  >
  implements GachaEventItemAttributes
{
  declare id: CreationOptional<number>;

  declare eventId: number;
  declare itemId: number;
  declare dropRate: number;
  declare stock: number | null;

  declare event?: NonAttribute<GachaEvent>;
  declare item?: NonAttribute<Item>;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

GachaEventItem.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    eventId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    itemId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    dropRate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "gacha_event_items",
    modelName: "GachaEventItem",
    timestamps: true,
    underscored: true,
  },
);