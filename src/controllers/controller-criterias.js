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

module.exports = {
  getAllCriterias,
  getCriteriaById,
}