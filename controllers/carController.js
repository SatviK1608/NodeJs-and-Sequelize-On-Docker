const { Car } = require('../models');


exports.viewYourCars = async (req, res) => {
  const ownerId = req.params.ownerId;
  try {
    const cars = await Car.findAll({ where: { ownerId } });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.createCar = async (req, res) => {
  const { carModelName, capacity, vehicleNo, ownerId } = req.body;
  try {
    const car = await Car.create({ carModelName, capacity, vehicleNo, ownerId });
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateCar = async (req, res) => {
  const carId = req.params.id;
  const { carModelName, capacity, vehicleNo } = req.body;
  try {
    const car = await Car.findByPk(carId);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    await car.update({ carModelName, capacity, vehicleNo });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteCar = async (req, res) => {
  const carId = req.params.id;
  try {
    const car = await Car.findByPk(carId);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    await car.destroy();
    res.json({ message: 'Car deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCarDetail=async(req,res)=>{
  const {id}=req.params;
  try {
    const car=await Car.findByPk(id);
    if(!car)return res.status(404).json({message:'Car not found'});
    return res.json(car);
  }catch(error){
    res.status(500).json({ message: 'Server error' });
  }
}
