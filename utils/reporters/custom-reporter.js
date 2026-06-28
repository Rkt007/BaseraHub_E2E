class CustomReporter {
  onBegin(config, suite) {
    console.log(`Starting Housing-Hunt suite with ${suite.allTests().length} tests`);
  }

  onTestEnd(test, result) {
    const icon = result.status === 'passed' ? 'PASS' : 'FAIL';
    console.log(`${icon}: ${test.title} [${result.status}] ${result.duration}ms`);
  }

  onEnd(result) {
    console.log(`Housing-Hunt suite finished with status: ${result.status}`);
  }
}

module.exports = CustomReporter;
