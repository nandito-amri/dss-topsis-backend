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
    response.status(200).json(results)
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

const updateWeightCriteria = async (request, response) => {
  try {
    const id = request.params.id;
    const updatedData = request.body;

    // Construct and execute the update query
    const query = {
      text: `UPDATE criteria SET weight = $1 WHERE criteria_id = $2`,
      values: [updatedData.weight, id],
    };

    await pool.query(query);

    response.json({ message: 'Data updated successfully.' });
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'An error occurred while updating the data.' });
  }
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
  updateWeightCriteria,
  deleteCriteria,
}