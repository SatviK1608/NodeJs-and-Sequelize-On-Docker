const { Sequelize } = require('sequelize');
const User = require('./User');
const Car = require('./Car');
const Rides = require('./Rides');
const Passenger = require('./Passenger');

const sequelize = new Sequelize('blaBla', 'postgres', '123', {
  host: 'db',
  dialect: 'postgres',
});

User.init(sequelize);
Car.init(sequelize);
Rides.init(sequelize);
Passenger.init(sequelize);

User.hasMany(Car, { foreignKey: 'owner_id' });
Car.belongsTo(User, { foreignKey: 'owner_id' });

Car.hasMany(Rides, { foreignKey: 'car_id' });
Rides.belongsTo(Car, { foreignKey: 'car_id' });

Rides.hasMany(Passenger, { foreignKey: 'ride_id' });
Passenger.belongsTo(Rides, { foreignKey: 'ride_id' });

User.hasMany(Passenger, { foreignKey: 'user_id' });
Passenger.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  Car,
  Rides,
  Passenger
};
