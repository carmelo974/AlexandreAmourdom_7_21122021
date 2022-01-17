"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Comment);
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },

       
        
        
      });
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
        validate: {
          min: 4,
          notEmpty: true,
        },
      },
      post_file: DataTypes.STRING,
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
