#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import { generatePrivateKey, generateMnemonic, english, mnemonicToAccount, privateKeyToAddress, privateKeyToAccount } from 'viem/accounts';

const newNemonic = () => {
    console.log(chalk.blue('Generating new mnemonic and printing the first 5 accounts...'))
    let mnemonic = generateMnemonic(english);
    const accounts = Array.from({ length: 5 }).map((_, index) => {
        return mnemonicToAccount(mnemonic, { accountIndex: index }).address
    })
    console.log(`Mnemonic: ${mnemonic}`)
    console.log('First 5 accounts derived from mnemonic')
    accounts.forEach((account, index) => {
        console.log(`[${index + 1}] ${account}`)
    })
}

const newPrivateKey = () => {
    console.log(chalk.blue('Generating new private key and printing the account...'))
    const privateKey = generatePrivateKey();
    const account = privateKeyToAccount(privateKey);
    console.log(`privateKey: ${privateKey}`)
    console.log('Account derived from private key')
    console.log(`[0] ${account.address}`)
}

program
    .version('1.0.0')
    .description('Ethereum wallet generator')
    .option('-m, --mnemonic', 'creates a new mnemonic')
    .option('-p, --privateKey', 'creates a new private key')


program.parse(process.argv)
const options = program.opts();

if (options.mnemonic) {
    newNemonic()
    process.exit(1)
}
if (options.privateKey) {
    newPrivateKey()
    process.exit(1)
}

program.help()