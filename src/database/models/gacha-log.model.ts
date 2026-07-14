import {
  CreationOptional,
  DataTypes,
  Model,
  NonAttribute,
  Optional,
} from "sequelize";
import { sequelize } from "../sequelize";
import { User } from "./user.model";
import { GachaEvent } from "./gacha-event.model";
import { GachaEventItem } from "./gacha-event-item.model";

export interface GachaLogAttributes {
  id: number;
  userId: number;
  eventId: number;
  eventItemId: number;
  cost: number;
  dropRate: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GachaLogCreationAttributes
  extends Optional<
    GachaLogAttributes,
    "id" | "cost" | "createdAt" | "updatedAt"
  > {}

export class GachaLog
  extends Model<GachaLogAttributes, GachaLogCreationAttributes>
  implements GachaLogAttributes
{
  declare id: CreationOptional<number>;

  declare userId: number;
  declare eventId: number;
  declare eventItemId: number;
  declare cost: CreationOptional<number>;
  declare dropRate: number;

  declare user?: NonAttribute<User>;
  declare event?: NonAttribute<GachaEvent>;
  declare eventItem?: NonAttribute<GachaEventItem>;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

GachaLog.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    eventId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    eventItemId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },

    dropRate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "gacha_logs",
    modelName: "GachaLog",
    timestamps: true,
    underscored: true,
  },
);