const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.get('/view-your-cars/:ownerId', carController.viewYourCars);
router.get('/get-car-detail/:id',carController.getCarDetail)
router.post('/create-car', carController.createCar);
router.put('/update-car/:id', carController.updateCar);
router.delete('/delete-car/:id', carController.deleteCar);

module.exports = router;
