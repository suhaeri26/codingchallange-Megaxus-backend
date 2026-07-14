import {
  CreationOptional,
  DataTypes,
  Model,
  Optional,
} from "sequelize";
import { sequelize } from "../sequelize";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  coins: number;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
  isVerified?: boolean;
}

export interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "coins" | "role" | "createdAt" | "updatedAt" | "isVerified"
  > {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: CreationOptional<number>;

  declare name: string;
  declare email: string;
  declare password: string;
  declare coins: CreationOptional<number>;
  declare role: CreationOptional<UserRole>;
declare isVerified: CreationOptional<boolean>;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

User.init(
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

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    coins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 500,
    },

    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.USER,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
    timestamps: true,
    underscored: true,
  },
);