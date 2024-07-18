const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

router.get('/view-rides', rideController.viewRides);
router.get('/view-your-ride/:userId', rideController.viewYourRide);
router.get('/get-ride/:id',rideController.getRide)
router.post('/create-ride', rideController.createRide);
router.put('/update-ride/:id', rideController.updateRide);
router.put('/cancel-ride/:id', rideController.cancelRide);
router.post('/book-ride', rideController.bookRide);
router.delete('/delete-ride/:id', rideController.deleteRide);
router.get('/prev-rides/:userId', rideController.prevRides);
router.put('/complete-ride/:id', rideController.completeRide);
router.get('/view-all-rides',rideController.viewAllRides);

module.exports = router;
