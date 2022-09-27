require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')
require('dotenv').config()

const { PRIVATE_KEY, ETHERSCAN } = process.env

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    mainnet: {
      url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      accounts: [PRIVATE_KEY],
      gasPrice: 26 * 1e9,
      chainId: 1
    },
    gtonTestnet: {
      url: 'https://testnet.gton.network',
      accounts: [PRIVATE_KEY],
      gasPrice: 40 * 1e9,
      gasMultiplier: 1
    },
    gton: {
      url: 'https://rpc.gton.network',
      accounts: [PRIVATE_KEY],
      gasPrice: 40 * 1e9,
      gasMultiplier: 1
    },
    goerli: {
      url: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      accounts: [PRIVATE_KEY]
    },
    ropsten: {
      url: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      accounts: [PRIVATE_KEY],
      gasPrice: 12 * 1e9,
      gasMultiplier: 1
    }
  },
  etherscan: {
    apiKey: ETHERSCAN
  },
  solidity: {
    version: '0.5.16',
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999
      }
    },
    evmVersion: 'istanbul'
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts'
  },
  mocha: {
    timeout: 20000
  }
}
