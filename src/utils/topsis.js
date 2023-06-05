const normalizeMatrix = (matrix) => {
  const normalizedMatrix = [];
  const columnSums = [];

  // Calculate column sums
  for (let i = 0; i < matrix[0].length; i++) {
    let sum = 0;
    for (let j = 0; j < matrix.length; j++) {
      sum += matrix[j][i] ** 2;
    }
    columnSums.push(Math.sqrt(sum));
  }

  // Normalize the matrix
  for (let i = 0; i < matrix.length; i++) {
    const normalizedRow = [];
    for (let j = 0; j < matrix[i].length; j++) {
      normalizedRow.push(matrix[i][j] / columnSums[j]);
    }
    normalizedMatrix.push(normalizedRow);
  }

  return normalizedMatrix;
}

// Function to multiply the normalized matrix by the weights
const multiplyMatrixByWeights = (matrix, weights) => {
  const weightedMatrix = [];

  for (let i = 0; i < matrix.length; i++) {
    const weightedRow = [];
    for (let j = 0; j < matrix[i].length; j++) {
      weightedRow.push(matrix[i][j] * weights[j]);
    }
    weightedMatrix.push(weightedRow);
  }

  return weightedMatrix;
}

const findIdealSolutions = (data, impacts) => {
  var idealPositive = [];
  var idealNegative = [];

  // Iterate over each column (criterion)
  for (var j = 0; j < data[0].length; j++) {
    var column = data.map(function (row) {
      return row[j];
    });

    // Determine if the criterion is a benefit or a cost
    var impact = impacts[j][0];

    // Find the ideal solution based on the impact
    if (impact === 1) {
      // Benefit criterion: find the maximum value
      idealPositive.push(Math.max.apply(null, column));
      idealNegative.push(Math.min.apply(null, column));
    } else if (impact === -1) {
      // Cost criterion: find the minimum value
      idealPositive.push(Math.min.apply(null, column));
      idealNegative.push(Math.max.apply(null, column));
    } else {
      throw new Error("Invalid impact value for criterion " + j);
    }
  }

  return {idealPositive, idealNegative};
}

// Function to calculate the Euclidean distances
const calculateDistances = (matrix, idealSolutions) => {
  const { idealPositive, idealNegative } = idealSolutions;
  const distances = [];

  for (let i = 0; i < matrix.length; i++) {
    let positiveDistance = 0;
    let negativeDistance = 0;

    for (let j = 0; j < matrix[i].length; j++) {
      positiveDistance += (matrix[i][j] - idealPositive[j]) ** 2;
      negativeDistance += (matrix[i][j] - idealNegative[j]) ** 2;
    }

    positiveDistance = Math.sqrt(positiveDistance);
    negativeDistance = Math.sqrt(negativeDistance);

    distances.push({ alternative: i + 1, positiveDistance, negativeDistance });
  }

  return distances;
}

// Function to calculate the TOPSIS rankings
const calculateRankings = (distances) => {
  const performanceScore = [];
  for (let i = 0; i < distances.length; i++) {
    score = distances[i].negativeDistance / (distances[i].negativeDistance + distances[i].positiveDistance);
    performanceScore.push({ alternative: i + 1, score});
  }

  const rankings = performanceScore.sort((a, b) => (b.score - a.score));

  return rankings;
}

module.exports = {
  normalizeMatrix,
  multiplyMatrixByWeights,
  findIdealSolutions,
  calculateDistances,
  calculateRankings
};
