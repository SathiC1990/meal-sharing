import express from "express";
import knex from "../database_client.js";

const router = express.Router();

// Get all meals
router.get("/", async (req, res) => {
  try {
    const meals = await knex("meal").select("*");
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get meal by ID
router.get("/:id", async (req, res) => {
  try {
    const meal = await knex("meal").where({ id: req.params.id }).first();
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new meal
router.post("/", async (req, res) => {
  try {
    const [id] = await knex("meal").insert(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a meal
router.put("/:id", async (req, res) => {
  try {
    const result = await knex("meal")
      .where({ id: req.params.id })
      .update(req.body);
    if (result) {
      res.json({ message: "Meal updated successfully" });
    } else {
      res.status(404).json({ error: "Meal not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a meal
router.delete("/:id", async (req, res) => {
  try {
    const result = await knex("meal").where({ id: req.params.id }).del();
    if (result) {
      res.json({ message: "Meal deleted successfully" });
    } else {
      res.status(404).json({ error: "Meal not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
