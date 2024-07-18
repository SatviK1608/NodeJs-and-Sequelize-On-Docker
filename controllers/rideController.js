const { Rides, Passenger } = require('../models');
const { Car } = require('../models');

exports.viewRides = async (req, res) => {
  try {
    const rides = await Rides.findAll({where:{"isActive":"true"}});
    res.json(rides);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.viewYourRide = async (req, res) => {
  const userId = req.params.userId;
  try {
    const rides = await Rides.findAll({
      include: {
        model: Passenger,
        where: { userId }
      },
      where: { isActive: true }
    });
    
    if(rides.length==0)
      return res.json(rides)
    const car=await Car.findOne({where:{carId:rides[0].dataValues.carId}})
    if(car.dataValues.ownerId==userId){
      rides[0].dataValues.isOwner=true;
    }
    else{
      rides[0].dataValues.isOwner=false;
    }
    return res.json(rides);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createRide = async (req, res) => {
  const { carId, startingPoint, destinationPoint, fare, availableSeats,userId } = req.body;

  try {
    const activeRides = await Passenger.findAll({
      where: {
        userId: userId
      },
      include: {
        model: Rides,
        where: {
          isActive: true
        }
      }
    });

    if (activeRides.length > 0) {
      return res.status(400).json({ message: 'User is already associated with an active ride' });
    }

    const ride = await Rides.create({ carId, startingPoint, destinationPoint, fare, availableSeats, isActive:true });
    const passenger=await Passenger.create({rideId:ride.rideId,userId})
    res.status(201).json(ride);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateRide = async (req, res) => {
    const rideId = req.params.id;
    const { startingPoint, destinationPoint, fare, availableSeats } = req.body;
    try {
      let ride = await Rides.findByPk(rideId);
      if (!ride) return res.status(404).json({ message: 'Ride not found' });
  
      if (startingPoint) ride.startingPoint = startingPoint;
      if (destinationPoint) ride.destinationPoint = destinationPoint;
      if (fare) ride.fare = fare;
      if (availableSeats) ride.availableSeats = availableSeats;
  
      await ride.save();
  
      res.json(ride);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.cancelRide = async (req, res) => {
    const rideId = req.params.id;
    const userId = req.body.userId; 
    try {
      let ride = await Rides.findByPk(rideId);
      if (!ride) return res.status(404).json({ message: 'Ride not found' });
  
      const passenger = await Passenger.findOne({
        where: { ride_id: rideId, user_id: userId }
      });
      if (!passenger) return res.status(404).json({ message: 'Passenger not found for this ride' });
  
      await passenger.destroy();
  
      ride.availableSeats += 1;
      await ride.save();
  
      res.json({ message: 'Ride canceled successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  
  exports.bookRide = async (req, res) => {
    const { rideId,userId } = req.body;
  
    try {
      const activeRides = await Passenger.findAll({
        where: {
          userId: userId
        },
        include: {
          model: Rides,
          where: {
            isActive: true
          }
        }
      });
  
      
      if (activeRides.length > 0) {
        return res.status(400).json({ message: 'User is already associated with an active ride' });
      }
  
      const ride = await Rides.findByPk(rideId);
      if (!ride) return res.status(404).json({ message: 'Ride not found' });
      if (ride.availableSeats <= 0) return res.status(400).json({ message: 'No available seats' });
  
  
      await Passenger.create({ rideId, userId });
      ride.availableSeats -= 1;
      await ride.save();
  
      res.json({ message: 'Ride booked successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  exports.deleteRide = async (req, res) => {
    const rideId = req.params.id;
    try {
      const ride = await Rides.findByPk(rideId);
      if (!ride) return res.status(404).json({ message: 'Ride not found' });
  
      await Passenger.destroy({
        where: {
          ride_id: rideId
        }
      });
  
      
      await ride.destroy();
  
      res.json({ message: 'Ride and associated passengers deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
 
  exports.prevRides = async (req, res) => {
    const userId = req.params.userId;
    try {
      const rides = await Rides.findAll({
        include: {
          model: Passenger,
          where: { userId }
        },
        where: { isActive: false }
      });
      res.json(rides);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  exports.completeRide = async (req, res) => {
    const rideId = req.params.id;
    try {
      let ride = await Rides.findByPk(rideId);
      if (!ride) return res.status(404).json({ message: 'Ride not found' });
  
      ride.isActive = false;
      await ride.save();
  
      res.json({ message: 'Ride completed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  exports.getRide=async(req,res)=>{
    const rideId=req.params.id;
    try{
      let ride=await Rides.findByPk(rideId);
      if(!ride)return res.status(404).json({message:'Ride not found'});
      res.json(ride);
      }catch(error){
        console.error(error);
        res.status(500).json({message:'Server error'});
        }
  }
exports.viewAllRides=async(req,res)=>{
  try{
    const rides=await Rides.findAll();
    res.json(rides)
  }
  catch(error){
    res.status(500).json({message:'Server error'})
  }
}