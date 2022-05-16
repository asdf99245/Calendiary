'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Diary_attaches', {
      file_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      file_name: {
        type: Sequelize.STRING,
      },
      file_origin_name: {
        type: Sequelize.STRING,
      },
      file_path: {
        type: Sequelize.STRING,
      },
      file_size: {
        type: Sequelize.INTEGER,
      },
      diary_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'diaries',
          key: 'id',
        },
        onDelete: 'cascade',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Diary_attaches');
  },
};
