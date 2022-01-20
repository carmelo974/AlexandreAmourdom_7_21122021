"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.Comment.belongsTo(models.User, {
      //   onDelete: "cascade",
      //   hooks: true,
      //   foreignKey: "userId",
      //   as: "user",
      // });

      models.Comment.belongsTo(models.Post, {
        onDelete: "cascade",
        hooks: true,
        foreignKey: "postId",
        as: "post",
      });
    }
  }
  Comment.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userName: {
        type: DataTypes.STRING,
        references: {
          model: "User",
          key: "username",
        },
      },
      comment: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          min: 2,
        },
      },
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Post",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
      paranoid: true,
    }
  );
  return Comment;
};
