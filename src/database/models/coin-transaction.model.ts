import {
  CreationOptional,
  DataTypes,
  Model,
  NonAttribute,
  Optional,
} from "sequelize";
import { sequelize } from "../sequelize";
import { User } from "./user.model";
import { GachaLog } from "./gacha-log.model";

export enum CoinTransactionType {
  INITIAL_BONUS = "INITIAL_BONUS",
  GACHA_COST = "GACHA_COST",
  ADMIN_ADJUSTMENT = "ADMIN_ADJUSTMENT",
}

export interface CoinTransactionAttributes {
  id: number;
  userId: number;
  type: CoinTransactionType;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  gachaLogId: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CoinTransactionCreationAttributes
  extends Optional<
    CoinTransactionAttributes,
    "id" | "gachaLogId" | "createdAt" | "updatedAt"
  > {}

export class CoinTransaction
  extends Model<
    CoinTransactionAttributes,
    CoinTransactionCreationAttributes
  >
  implements CoinTransactionAttributes
{
  declare id: CreationOptional<number>;

  declare userId: number;
  declare type: CoinTransactionType;
  declare amount: number;
  declare balanceBefore: number;
  declare balanceAfter: number;
  declare gachaLogId: number | null;

  declare user?: NonAttribute<User>;
  declare gachaLog?: NonAttribute<GachaLog>;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

CoinTransaction.init(
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

    type: {
      type: DataTypes.ENUM(...Object.values(CoinTransactionType)),
      allowNull: false,
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    balanceBefore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    balanceAfter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    gachaLogId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "coin_transactions",
    modelName: "CoinTransaction",
    timestamps: true,
    underscored: true,
  },
);