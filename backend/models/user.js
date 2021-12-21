"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.hasMany(Post, { foreignKey: "userId" });
    }

    // toJSON() {
    //   return { ...this.get(), id: undefined };
    // }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "L'utilisateur doit avoir un pseudo" },
          notEmpty: { msg: "Pseudo ne peut pas être vide" },
        },
      },
      password: DataTypes.STRING,
      picture: DataTypes.STRING,
      bio: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
