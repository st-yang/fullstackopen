const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('counters', {
      id: {
        type: DataTypes.BOOLEAN,
        primaryKey: true,
        defaultValue: true,
      },
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    })
    await queryInterface.bulkInsert('counters', [
      {
        count: 0,
      },
    ])
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('counters')
  },
}
