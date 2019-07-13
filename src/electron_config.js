const fillingOrder = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p', '7s', '5f', '6d', '7p'];
const level2sublevels = {
  's': 1,
  'p': 3,
  'd': 5,
  'f': 7, // This is all we need until 2019/Element 118
  'g': 9,
  'b': 11,
  'i': 13,
};
const elements = [
  'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er',
  'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn', 'Fr', 'Ra', 'Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'
];

function compute(electrons, startSublevelIdx) {
  const configurations = [];
  let i = startSublevelIdx;
  while (electrons > 0) {
    const filling = fillingOrder[i];
    const sublevels = level2sublevels[filling.charAt(1)]

    // Based on the Pauli Exclusion Principle, each sublevel can hold 2 electrons maximum
    const placedElectrons = electrons - Math.max(electrons - sublevels * 2, 0);
    electrons -= placedElectrons;
    configurations.push(filling + placedElectrons);
    ++i;
  }
  return configurations;
}

function unabbriviatedConfiguration(atomicNumber) {
  return compute(atomicNumber, 0);
}

const nobleGases = [
  { symbol: "He", atomicNumber: 2 },
  { symbol: "Ne", atomicNumber: 10 },
  { symbol: "Ar", atomicNumber: 18 },
  { symbol: "Kr", atomicNumber: 36 },
  { symbol: "Xe", atomicNumber: 54 },
  { symbol: "Rn", atomicNumber: 86 },
  { symbol: "Og", atomicNumber: 118 },
];
// Calculate additional information about noble gases
for (const gas of nobleGases) {
  const configuration = unabbriviatedConfiguration(gas.atomicNumber);
  gas.lastSublevel = configuration[configuration.length - 1].substring(0, 2);
  gas.lastSublevelIdx = fillingOrder.indexOf(gas.lastSublevel);
}

function abbriviatedConfiguration(atomicNumber) {
  let electrons = atomicNumber;
  for (let i = nobleGases.length - 1; i >= 0; --i) {
    const gas = nobleGases[i];
    const am = gas.atomicNumber;
    if (electrons > am) {
      electrons -= am;
      const r = compute(electrons, gas.lastSublevelIdx + 1);
      r.unshift(`[${gas.symbol}]`)
      return r;
    }
  }
  // Anything is or below Helium (basically H and He)
  return unabbriviatedConfiguration(atomicNumber);
}

const textUnabbriviatedConfiguration = atomicNumber => unabbriviatedConfiguration(atomicNumber).join(' ');
const textAbbriviatedConfiguration = atomicNumber => abbriviatedConfiguration(atomicNumber).join(' ');

export { unabbriviatedConfiguration, abbriviatedConfiguration, textUnabbriviatedConfiguration, textAbbriviatedConfiguration };