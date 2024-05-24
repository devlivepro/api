const Catway = require("../models/Catway");

// Créer un nouveau catway
exports.createCatway = async (req, res) => {
  const { number, type, state } = req.body;
  try {
    const newCatway = new Catway({ number, type, state });
    await newCatway.save();
    res.status(201).json(newCatway);
  } catch (error) {
    console.error("Error adding catway:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Récupérer tous les catways
exports.getCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (error) {
    console.error("Error fetching catways:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Récupérer un catway par ID
exports.getCatway = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) {
      return res.status(404).send("Catway not found");
    }
    res.json(catway);
  } catch (error) {
    console.error("Error fetching catway:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Mettre à jour un catway par ID
exports.updateCatway = async (req, res) => {
  try {
    const catway = await Catway.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!catway) {
      return res.status(404).send("Catway not found");
    }
    res.json(catway);
  } catch (error) {
    console.error("Error updating catway:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Supprimer un catway par ID
exports.deleteCatway = async (req, res) => {
  try {
    const catway = await Catway.findByIdAndDelete(req.params.id);
    if (!catway) {
      return res.status(404).send("Catway not found");
    }
    res.json({ message: "Catway deleted" });
  } catch (error) {
    console.error("Error deleting catway:", error);
    res.status(500).send("Internal Server Error");
  }
};