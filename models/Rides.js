const { Model, DataTypes } = require('sequelize');

class Rides extends Model {
  static init(sequelize) {
    super.init({
      rideId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'ride_id'
      },
      carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'cars',
          key: 'car_id'
        },
        field: 'car_id'
      },
      startingPoint: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'starting_point'
      },
      destinationPoint: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'destination_point'
      },
      fare: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      availableSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'available_seats'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'is_active'
      }
    }, {
      sequelize,
      modelName: 'Rides',
      tableName: 'rides',
      timestamps: false,
      indexes: [
        {
          unique: false,
          fields: ['car_id']
        },
        {
          unique: false,
          fields: ['starting_point']
        },
        {
          unique: false,
          fields: ['destination_point']
        },
        {
          unique: false,
          fields: ['is_active']
        }
      ]
    });
  }
}

module.exports = Rides;
