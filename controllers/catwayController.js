const Catway = require('../models/Catway');

exports.createCatway = async (req, res) => {
  try {
    const newCatway = new Catway(req.body);
    await newCatway.save();
    res.status(201).json(newCatway);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.status(200).json(catways);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCatway = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).json({ error: 'Catway not found' });
    res.status(200).json(catway);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCatway = async (req, res) => {
  try {
    const catway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!catway) return res.status(404).json({ error: 'Catway not found' });
    res.status(200).json(catway);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCatway = async (req, res) => {
  try {
    const catway = await Catway.findByIdAndDelete(req.params.id);
    if (!catway) return res.status(404).json({ error: 'Catway not found' });
    res.status(200).json({ message: 'Catway deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};