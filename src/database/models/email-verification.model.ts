import {
  CreationOptional,
  DataTypes,
  Model,
  NonAttribute,
  Optional,
} from "sequelize";
import { sequelize } from "../sequelize";
import { User } from "./user.model";

export interface EmailVerificationAttributes {
  id: number;
  userId: number;
  token: string;
  expiredAt: Date;
  verifiedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EmailVerificationCreationAttributes
  extends Optional<
    EmailVerificationAttributes,
    "id" | "verifiedAt" | "createdAt" | "updatedAt"
  > {}

export class EmailVerification
  extends Model<
    EmailVerificationAttributes,
    EmailVerificationCreationAttributes
  >
  implements EmailVerificationAttributes
{
  declare id: CreationOptional<number>;

  declare userId: number;
  declare token: string;
  declare expiredAt: Date;
  declare verifiedAt: Date | null;

  declare user?: NonAttribute<User>;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

EmailVerification.init(
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

    token: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true,
    },

    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    verifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "email_verifications",
    modelName: "EmailVerification",
    timestamps: true,
    underscored: true,
  },
);