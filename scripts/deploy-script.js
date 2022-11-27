const { ethers } = require('hardhat')
const hre = require('hardhat')

// Deploy function
async function deploy() {
  let deployer = await getDeployer()
  let deployerAddress = deployer.address

  //Deploy Factory
  const factory = await ethers.getContractFactory('OGXFactory')
  const factoryInstance = await factory.deploy(deployerAddress)
  await factoryInstance.deployed()
  const factoryAddress = factoryInstance.address

  console.log(`Factory deployed to: ${factoryAddress}`)

  await delay(20000)
  await verify(factoryAddress, deployerAddress)
}

async function getDeployer() {
  const [deployer] = await ethers.getSigners()
  console.log('Account :', deployer.address)

  return deployer
}

async function verify(_contractAddress, _deployerAddress) {
  try {
    console.log('Verifying contract...')
    await hre.run('verify:verify', {
      address: _contractAddress,
      constructorArguments: [_deployerAddress]
    })
  } catch (err) {
    if (err.message.includes('Reason: Already Verified')) {
      console.log('Contract is already verified!')
    } else {
      console.log(err)
    }
  }
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

deploy()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
