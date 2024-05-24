const Reservation = require('../models/Reservation');

// Créer une réservation
exports.createReservation = async (req, res) => {
  const { catwayNumber, clientName, boatName, checkIn, checkOut } = req.body;
  try {
    const newReservation = new Reservation({ catwayNumber, clientName, boatName, checkIn, checkOut });
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Récupérer toutes les réservations
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Récupérer une réservation par ID
exports.getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    console.error('Error fetching reservation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Supprimer une réservation par ID
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};