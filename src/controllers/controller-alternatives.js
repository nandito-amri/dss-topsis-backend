const Pool = require('pg').Pool
const db = require('../configs/database');
const pool = new Pool(db);

const getAllAlternatives = (request, response) => {
  pool.query(
    `
    SELECT * FROM alternatives 
    `, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getAlternativeById = (request, response) => {
  const id = request.params.id;
  pool.query(`SELECT * FROM alternatives WHERE alter_id = ${id}`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const addAlternative = (request, response) => {
  const {
    name, 
    processor, 
    ram, 
    harddisk,
    screen_size,
    battery_life,
    weight, 
    warranty, 
    price,
  } = request.body;

  pool.query(`
    INSERT INTO alternatives (name, processor, ram, harddisk, screen_size, battery_life, weight, warranty, price)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
  `, [name, processor, ram, harddisk, screen_size, battery_life, weight, warranty, price], (error, results) => {
    if (error) throw error;
    response.status(201).send(`Alternative berhasil ditambahkan dengan ID : ${results.rows[0].alter_id}`)
  })
}

const updateAlternative = (request, response) => {
  const id = request.params.id;
  const {
    name, 
    processor, 
    ram, 
    harddisk, 
    screen_size,
    battery_life,
    weight, 
    warranty, 
    price,
  } = request.body;

  pool.query(`
    UPDATE alternatives SET 
    name = $1, 
    processor = $2, 
    ram = $3, 
    harddisk = $4, 
    screen_size = $5, 
    battery_life = $6, 
    weight = $7, 
    warranty = $8, 
    price = $9 
    WHERE alter_id = $10
  `, [name, processor, ram, harddisk, screen_size, battery_life, weight, warranty, price, id],
  (error, results) => {
    if (error) throw error;
    response.status(200).send(`Alternative dengan ID : ${id} berhasil diubah`);
  })
}

const deleteAlternatives = (request, response) => {
  const id = request.params.id;
  pool.query(`
    DELETE FROM alternatives WHERE alter_id = $1
  `, [id], (error, results) => {
    if (error) throw error;
    response.status(200).send(`Alternatives dengan ID : ${id} berhasil dihapus`);
  })
}

module.exports = {
  getAllAlternatives,
  getAlternativeById,
  addAlternative,
  updateAlternative,
  deleteAlternatives,
}