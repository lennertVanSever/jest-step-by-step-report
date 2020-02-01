"use strict";
const jestUtils = require('jest-util');

const log = {
  type: {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
  },
  color: {
    black: '\x1b[30m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
  },
  backgroundColor: {
    white: '\x1b[47m'
  }
};

class stepByStepReport {
  constructor() {
    this._errorLogged = false;
  }
  removeFirstLine() {
    if (jestUtils.isInteractive) {
      jestUtils.clearLine(process.stderr);
    }
  }
  onRunStart() {
    this.removeFirstLine();
  }
  getStatusLog({ status }) {
    if (status === 'passed') return [log.color.green, '✓'];
    return [log.color.red, '✕'];
  }
  shouldLogResult({ status }) {
    if (this._errorLogged) return false;
    if (status === 'failed') this._errorLogged = true;
    return true;
  }
  getFullName({ fullName }) {
    return fullName.replace('\n', '').replace(/\n/gm, '\n\t');
  }
  logResults(testResult) {
    testResult.testResults.forEach((result, index) => {
      if (this.shouldLogResult(result)) {
        console.log(...this.getStatusLog(result), ` ${index}. `, this.getFullName(result));
      }
    });
  }
  onTestResult(test, testResult) {
    this.logResults(testResult);
  }
  finalLog({ numPassedTests, numTotalTests, numRuntimeErrorTestSuites }) {
    if (numRuntimeErrorTestSuites) {
      console.log(log.type.bold, log.color.red, 'Je hebt een syntax error, check je code! (╯°□°）╯︵ ┻━┻');
    } else {
      const completeness = numPassedTests / numTotalTests * 100;
      if (completeness === 100) {
        console.log(log.type.bold, log.color.green, 'Alle oefeningen correct opgelost! ᕦ(ò_ó*)ᕤ');
      }
      else {
        console.log(log.backgroundColor.white, log.color.black, `${completeness}% van alle oefeningen correct opgelost  `);
      }
    }
    console.log(log.type.reset);
  }
  onRunComplete(contexts, options) {
    this.finalLog(options);
  }
}

module.exports = stepByStepReport;