const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Counter extends Model {}

Counter.init(
  {
    id: {
      type: DataTypes.BOOLEAN,
      primaryKey: true,
      defaultValue: true,
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'counter',
  },
)

module.exports = Counter
