"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      comment: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userName: {
        allowNull: false,
        type: DataTypes.STRING,
        onDelete: "CASCADE",
      },
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Posts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt:{
        allowNull: true,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("Comments");
  },
};
