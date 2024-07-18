const { Model, DataTypes } = require('sequelize');

class Passenger extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rideId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'rides',
          key: 'ride_id'
        },
        field: 'ride_id'
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        },
        field: 'user_id'
      }
    }, {
      sequelize,
      modelName: 'Passenger',
      tableName: 'passengers',
      timestamps: false,
      indexes: [
        {
          unique: false,
          fields: ['ride_id']
        },
        {
          unique: false,
          fields: ['user_id']
        }
      ]
    });
  }
}

module.exports = Passenger;
