import express from "express";
import knex from "../database_client.js";

const router = express.Router();

//Return all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await knex("reservation").select("*");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Add new reservation
router.post("/", async (req, res) => {
  try {
    const [id] = await knex("reservation").insert(req.body);
    res.status(201).json({ message: "Reservation created", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get reservation by id
router.get("/:id", async (req, res) => {
  try {
    const reservation = await knex("reservation")
      .where({ id: req.params.id })
      .first();
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update reservation
router.put("/:id", async (req, res) => {
  try {
    const result = await knex("reservation")
      .where({ id: req.params.id })
      .update(req.body);
    if (!result) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json({ message: "Reservation updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete reservation by id
router.delete("/:id", async (req, res) => {
  try {
    const result = await knex("reservation").where({ id: req.params.id }).del();
    if (!result) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
