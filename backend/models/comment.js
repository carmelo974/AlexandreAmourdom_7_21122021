"use strict";
const { Model } = require("sequelize");
const User = require("../models/user");
const Post = require("../models/post");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post }) {
      // define association here
      // models.Comment.belongsTo(models.User, {
      //   onDelete: "cascade",
      //   hooks: true,
      //   foreignKey: "userId",
      //   as: "user",
      // });

      // models.Comment.belongsTo(models.Post, {
      //   onDelete: "cascade",
      //   hooks: true,
      //   foreignKey: "postId",
      //   as: "post",
      // });

      this.belongsTo(User, { foreignKey: "userId", as: "user" });
      this.belongsTo(Post, { foreignKey: "postId", as: "post" });
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
