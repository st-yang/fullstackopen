const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('todos', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          max: 140,
        },
      },
      done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    })
    await queryInterface.bulkInsert('todos', [
      {
        text: 'TODO 1',
      },
      {
        text: 'TODO 2',
      },
    ])
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('todos')
  },
}
