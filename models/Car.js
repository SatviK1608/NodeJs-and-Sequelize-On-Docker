const { Model, DataTypes } = require('sequelize');

class Car extends Model {
  static init(sequelize) {
    super.init({
      carId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'car_id'
      },
      carModelName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'car_model_name'
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      vehicleNo: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'vehicle_no'
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        },
        field: 'owner_id'
      }
    }, {
      sequelize,
      modelName: 'Car',
      tableName: 'cars',
      timestamps: false,
      indexes: [
        {
          fields: ['car_id']
        },
        {
          fields: ['owner_id']
        }
      ]
    });
  }
}

module.exports = Car;
