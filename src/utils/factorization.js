// ===============================
// ALGORITMA ASLI DARI KODE KAMU
// ===============================

export function primeFactors(n) {
  const factors = [];
  let i = 2;

  while (i * i <= n) {
    while (n % i === 0) {
      factors.push(i);
      n = n / i;
    }
    i++;
  }

  if (n > 1) {
    factors.push(n);
  }

  return factors;
}

export function printFactorTree(n, indent = "") {
  console.log(indent + n);

  const factors = primeFactors(n);

  if (factors.length <= 1) return;

  const left = factors[0];
  const right = n / left;

  console.log(indent + "├── " + left);

  printFactorTree(right, indent + "│   ");
}

export function getFactorMap(factors) {
  const map = {};

  for (const f of factors) {
    map[f] = (map[f] || 0) + 1;
  }

  return map;
}

export function formatFactorMap(map) {
  return Object.entries(map)
    .map(([base, exp]) => `${base}^${exp}`)
    .join(" × ");
}

export function computeGCDDetails(factorsA, factorsB) {
  const mapA = getFactorMap(factorsA);
  const mapB = getFactorMap(factorsB);

  const commonFactors = Object.keys(mapA).filter((f) => mapB[f]);

  let gcd = 1;
  const gcdSteps = [];

  // Tambahan untuk kebutuhan tabel UI.
  // Ini tidak mengubah algoritma hitung FPB.
  const items = [];

  for (const f of commonFactors) {
    const minExp = Math.min(mapA[f], mapB[f]);

    gcd *= Math.pow(f, minExp);
    gcdSteps.push(`${f}^${minExp}`);

    items.push({
      factor: Number(f),
      expA: mapA[f],
      expB: mapB[f],
      selectedExp: minExp,
      value: Math.pow(f, minExp),
    });
  }

  return {
    gcd,
    steps: gcdSteps.length > 0 ? gcdSteps.join(" × ") : "1",
    mapA,
    mapB,
    items,
  };
}

// ===============================
// ADAPTASI UNTUK REACT UI
// BUKAN ALGORITMA BARU
// ===============================

// Ini versi data dari printFactorTree.
// Karena React tidak bisa menampilkan console.log sebagai UI,
// maka struktur pohonnya diubah menjadi object.
export function buildFactorTree(n) {
  const factors = primeFactors(n);

  if (factors.length <= 1) {
    return {
      value: n,
      type: "prime",
      left: null,
      right: null,
    };
  }

  const left = factors[0];
  const right = n / left;

  return {
    value: n,
    type: "composite",
    left: {
      value: left,
      type: "prime",
      left: null,
      right: null,
    },
    right: buildFactorTree(right),
  };
}

// Ini versi teks dari printFactorTree.
// Polanya sama:
// console.log(indent + n)
// console.log(indent + "├── " + left)
// recursive ke right.
export function getFactorTreeLines(n, indent = "") {
  const lines = [];

  lines.push(indent + n);

  const factors = primeFactors(n);

  if (factors.length <= 1) {
    return lines;
  }

  const left = factors[0];
  const right = n / left;

  lines.push(indent + "├── " + left);

  return [...lines, ...getFactorTreeLines(right, indent + "│   ")];
}

// ===============================
// MAIN VERSI REACT
// ===============================

export function calculateFPB(numA, numB) {
  console.clear();

  console.log(`\nFaktor pohon dari ${numA}:`);
  printFactorTree(numA);

  const factorsA = primeFactors(numA);
  const mapA = getFactorMap(factorsA);

  console.log(
    `\nFaktorisasi prima dari ${numA}: ${formatFactorMap(mapA)}`
  );

  console.log(`\nFaktor pohon dari ${numB}:`);
  printFactorTree(numB);

  const factorsB = primeFactors(numB);
  const mapB = getFactorMap(factorsB);

  console.log(
    `\nFaktorisasi prima dari ${numB}: ${formatFactorMap(mapB)}`
  );

  const { gcd, steps, items } = computeGCDDetails(factorsA, factorsB);

  console.log(`\nFPB = ${steps} = ${gcd}`);
  console.log(`\nFPB dari ${numA} dan ${numB} adalah: ${gcd}`);

  return {
    numA,
    numB,

    factorsA,
    factorsB,

    mapA,
    mapB,

    factorizationA: formatFactorMap(mapA),
    factorizationB: formatFactorMap(mapB),

    treeA: buildFactorTree(numA),
    treeB: buildFactorTree(numB),

    treeLinesA: getFactorTreeLines(numA),
    treeLinesB: getFactorTreeLines(numB),

    gcd,
    steps,
    items,
  };
}

export function validateInput(value, label) {
  const cleanValue = String(value).trim();

  if (cleanValue === "") {
    return `${label} belum diisi.`;
  }

  const number = Number(cleanValue);

  if (!Number.isInteger(number)) {
    return `${label} harus berupa bilangan bulat.`;
  }

  if (number < 2) {
    return `${label} minimal 2.`;
  }

  return "";
}