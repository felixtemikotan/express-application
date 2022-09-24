import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface CourseAttributes {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  userId: string;
}

export class CourseInstance extends Model<CourseAttributes> {}

CourseInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },

    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "courseTable",
  }
);
