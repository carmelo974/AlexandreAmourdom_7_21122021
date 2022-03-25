"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Comment }) {
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
      this.hasMany(Comment);
    }
  }
  Post.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },

      post_content: {
        type: DataTypes.STRING,
        
        // validate: {
        //   //min: 4,
        //   notEmpty: false,
        // },
      },
      post_file: { type: DataTypes.STRING, allowNull: true },
      userName: {
        type: DataTypes.STRING,
        onDelete: "CASCADE",
      },
    },

    {
      sequelize,
      modelName: "Post",
      paranoid: true,
    }
  );
  return Post;
};
