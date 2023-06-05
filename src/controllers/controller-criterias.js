const Pool = require('pg').Pool
const db = require('../configs/database');
const pool = new Pool(db);

const getAllCriterias = (request, response) => {
  pool.query(
    `
    SELECT * FROM criteria
    `, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getCriteriaById = (request, response) => {
  const id = request.params.id;
  pool.query(
    `
    SELECT * FROM criteria WHERE criteria_id = $1
    `, [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const addCriteria = (request, response) => {
  const { name, used, impact, weight } = request.body;

  pool.query(`
    INSERT INTO criteria (name, used, impact, weight) 
    VALUES ($1, $2, $3, $4) RETURNING *
  `, [name, used, impact, weight], (error, results) => {
    if (error) throw error;
    response.status(201).send(`Criteria berhasil ditambahkan dengan ID : ${results.rows[0].criteria_id}`);
  })
}

const updateCriteria = (request, response) => {
  const id = request.params.id;
  const { name, used, impact, weight } = request.body;

  pool.query(`
    UPDATE criteria SET
    name = $1,
    used = $2,
    impact = $3,
    weight = $4
    WHERE criteria_id = $5
  `, [name, used, impact, weight, id], 
  (error, results) => {
    if (error) throw error;
    response.status(200).send(`Criteria dengan ID : ${id} berhasil diubah`);
  })
}

const deleteCriteria = (request, response) => {
  const id = request.params.id;

  pool.query(`
    DELETE FROM criteria
    WHERE criteria_id = $1
  `, [id], (error, results) => {
    if (error) throw error;
    response.status(200).send(`Criteria dengan ID : ${id} berhasil dihapus`);
  })
}


module.exports = {
  getAllCriterias,
  getCriteriaById,
  addCriteria,
  updateCriteria,
  deleteCriteria,
}