"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Posts", {
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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,

        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      userName: {
        allowNull: false,
        type: DataTypes.STRING,
        onDelete: "CASCADE",
      },
      post_content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      post_file: {
        type: DataTypes.STRING,
        allowNull: true,
        onDelete: "CASCADE",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("Posts");
  },
};
