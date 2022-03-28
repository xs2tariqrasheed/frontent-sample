const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');
/*eslint-disable */
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

var output;

console.log('Use latest solc compiler...\n');
console.log('Compiling Tournaments.sol');
const tournamentsContractPath = path.resolve(
  __dirname,
  'contracts',
  'Tournaments.sol',
);
const tournamentsContractSource = fs.readFileSync(
  tournamentsContractPath,
  'utf8',
);

const input2 = {
  language: 'Solidity',
  sources: {
    'Tournaments.sol': {
      content: tournamentsContractSource,
    },
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    },
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

output = JSON.parse(solc.compile(JSON.stringify(input2)));

console.log('compiled successfully!');

fs.ensureDirSync(buildPath);

console.log('\nOutputting Tournaments.sol JSON files:');

// `output` here contains the JSON output as specified in the documentation
for (const contractName in output.contracts['Tournaments.sol']) {
  fs.outputJsonSync(
    path.resolve(buildPath, `${contractName}.json`),
    output.contracts['Tournaments.sol'][contractName],
  );
  console.log(`${contractName}.json`);
}

console.log('\n\nFetch solc compiler v0.5.16...');
solc.loadRemoteVersion('v0.5.16+commit.9c3226ce', function (err, solcSnapshot) {
  if (err) {
    console.log("Could not compile version 0.5.16: " + err);
  } else {
    console.log('Compiling ArenaGolfMain.sol');
    const arenaGolfNFTContractPath = path.resolve(
      __dirname,
      'contracts',
      'ArenaGolfMain.sol',
    );
    const arenaGolfNFTContractSource = fs.readFileSync(
      arenaGolfNFTContractPath,
      'utf8',
    );

    console.log('Compiling GolferSales.sol');
    const GolferSalesContractPath = path.resolve(
      __dirname,
      'contracts',
      'GolferSales.sol',
    );
    const GolferSalesContractSource = fs.readFileSync(
      GolferSalesContractPath,
      'utf8',
    );

    console.log('Compiling GolferP2PSales.sol');
    const GolferP2PSalesContractPath = path.resolve(
      __dirname,
      'contracts',
      'GolferP2PSales.sol',
    );
    const GolferP2PSalesContractSource = fs.readFileSync(
      GolferP2PSalesContractPath,
      'utf8',
    );

    const input = {
      language: 'Solidity',
      sources: {
        'GolferP2PSales.sol': {
          content: GolferP2PSalesContractSource,
        },
        'GolferSales.sol': {
          content: GolferSalesContractSource,
        },
        'ArenaGolfMain.sol': {
          content: arenaGolfNFTContractSource,
        },
      },
      settings: {
        evmVersion: "constantinople",
        optimizer: {
          enabled: true,
          runs: 200
        },
        outputSelection: {
          '*': {
            '*': ['*'],
          },
        },
      },
    };

    output = JSON.parse(solcSnapshot.compile(JSON.stringify(input)));

    // console.log(output);
    console.log('compiled successfully!');

    console.log('\nOutputting GolferP2PSales.sol JSON files:');

    // `output` here contains the JSON output as specified in the documentation
    for (const contractName in output.contracts['GolferP2PSales.sol']) {
      fs.outputJsonSync(
        path.resolve(buildPath, `${contractName}.json`),
        output.contracts['GolferP2PSales.sol'][contractName],
      );
      console.log(`${contractName}.json`);
    }

    console.log('\nOutputting GolferSales.sol JSON files:');

    // `output` here contains the JSON output as specified in the documentation
    for (const contractName in output.contracts['GolferSales.sol']) {
      fs.outputJsonSync(
        path.resolve(buildPath, `${contractName}.json`),
        output.contracts['GolferSales.sol'][contractName],
      );
      console.log(`${contractName}.json`);
    }

    console.log('\nOutputting ArenaGolfMain.sol JSON files:');

    // `output` here contains the JSON output as specified in the documentation
    for (let contractName in output.contracts['ArenaGolfMain.sol']) {
      fs.outputJsonSync(
        path.resolve(buildPath, `${contractName}.json`),
        output.contracts['ArenaGolfMain.sol'][contractName],
      );
      console.log(`${contractName}.json`);
    }
    console.log('DONE');
  }
});

/* eslint-enable */
