import {
  CreationOptional,
  DataTypes,
  Model,
  NonAttribute,
  Optional,
} from "sequelize";
import { sequelize } from "../sequelize";
import { User } from "./user.model";

export interface GachaEventAttributes {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
  createdBy: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GachaEventCreationAttributes
  extends Optional<
    GachaEventAttributes,
    "id" | "description" | "isActive" | "createdAt" | "updatedAt"
  > {}

export class GachaEvent
  extends Model<
    GachaEventAttributes,
    GachaEventCreationAttributes
  >
  implements GachaEventAttributes
{
  declare id: CreationOptional<number>;

  declare name: string;
  declare description: string | null;
  declare isActive: CreationOptional<boolean>;
  declare createdBy: number;

  declare creator?: NonAttribute<User>;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

GachaEvent.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "gacha_events",
    modelName: "GachaEvent",
    timestamps: true,
    underscored: true,
  },
);