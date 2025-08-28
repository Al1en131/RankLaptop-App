export function topsis(
  alternatives: any[],
  weights: number[],
  impacts: ("+" | "-")[]
) {
  const n = alternatives.length;
  const m = weights.length;

  // Normalisasi
  const normMatrix = Array.from({ length: n }, (_, i) =>
    Array.from(
      { length: m },
      (_, j) =>
        alternatives[i].criteria[j] /
        Math.sqrt(
          alternatives.reduce(
            (sum, alt) => sum + Math.pow(alt.criteria[j], 2),
            0
          )
        )
    )
  );

  // Bobotkan
  const weighted = normMatrix.map((row) =>
    row.map((val, j) => val * weights[j])
  );

  // Ideal positif & negatif
  const idealPos = weighted[0].map((_, j) =>
    impacts[j] === "+"
      ? Math.max(...weighted.map((row) => row[j]))
      : Math.min(...weighted.map((row) => row[j]))
  );

  const idealNeg = weighted[0].map((_, j) =>
    impacts[j] === "+"
      ? Math.min(...weighted.map((row) => row[j]))
      : Math.max(...weighted.map((row) => row[j]))
  );

  // Jarak ke ideal
  const scores = weighted.map((row) => {
    const dPlus = Math.sqrt(
      row.reduce((sum, val, j) => sum + Math.pow(val - idealPos[j], 2), 0)
    );
    const dMinus = Math.sqrt(
      row.reduce((sum, val, j) => sum + Math.pow(val - idealNeg[j], 2), 0)
    );
    return dMinus / (dPlus + dMinus);
  });

  // Ranking
  return alternatives
    .map((alt, i) => ({ name: alt.name, score: scores[i] }))
    .sort((a, b) => b.score - a.score);
}
