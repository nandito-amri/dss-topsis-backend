const Pool = require('pg').Pool;
const db = require('../configs/database');
const { 
  normalizeMatrix, 
  multiplyMatrixByWeights,
  findIdealSolutions,
  calculateDistances,
  calculateRankings,
} = require('../utils/topsis');
const pool = new Pool(db);

const getNormalizedMatrix = async () => {
  try {
    const { rows } = await pool.query(`
      SELECT processor, ram, harddisk, screen_size, battery_life, weight, warranty, price
      FROM alternatives
    `);

    const alternativesMatrix = rows.map((row) => Object.values(row));
    const normalizedMatrix = normalizeMatrix(alternativesMatrix);

    return normalizedMatrix;
  } catch (error) {
    console.error('Error:', error);
  }
}

const getWeightMatrix = async () => {
  try {
    const { rows } = await pool.query(`
      SELECT weight FROM criteria
    `);

    const weight = rows.map((row) => Object.values(row));
    return weight;
  } catch (error) {
    console.log('Error : ', error);
  }
}

const getIdealSolution = async (matrix) => {
  try {
    const { rows } = await pool.query(`
      SELECT impact FROM criteria
    `);

    const impact = rows.map((row) => Object.values(row));
    // console.log(impact);
    const idealSolution = findIdealSolutions(matrix, impact);
    return idealSolution;
  } catch (error) {
    console.log('Error : ', error);
  }
}

const getTopsisModelResult = async (request, response) => {
  const normalizedmatrix = await getNormalizedMatrix();
  const weight = await getWeightMatrix();

  const weightedMatrix = multiplyMatrixByWeights(normalizedmatrix, weight);
  
  const idealSolution = await getIdealSolution(weightedMatrix);

  const distances = calculateDistances(weightedMatrix, idealSolution);
  const rankings = calculateRankings(distances);
  response.status(200).json(rankings)
}

module.exports = {
  getTopsisModelResult,
}