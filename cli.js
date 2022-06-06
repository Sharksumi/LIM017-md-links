#! /usr/bin/env node

// import { chalk } from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { mdLinks } from './index.js';

const cli = yargs(hideBin(process.argv))
  .usage('Usage: md-links <path> [options]')
  .option('validate', {
    alias: 'v',
    describe: 'Shows if the links on markdowns are valid',
    type: 'boolean',
    default: false
  })
  .option('stats', {
    alias: 's',
    describe: 'Shows the links stats',
    type: 'boolean',
    default: false
  })
  .help('h')
  .alias('h', 'help')
  .argv;

const [route] = cli._;
const options = { validate: cli.validate, stats: cli.stats };

mdLinks(route, options)
  .then(links => {
    console.log(links);
}).catch(error => console.log(error));
