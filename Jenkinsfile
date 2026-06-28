def shouldRunStage(String stageName) {
  if (params && params.SUITE && params.SUITE != 'all') {
    return stageName == params.SUITE
  }

  def hour = Calendar.getInstance(TimeZone.getTimeZone('Asia/Kolkata')).get(Calendar.HOUR_OF_DAY)

  switch (stageName) {
    case 'smoke':
      return hour == 6
    case 'sanity':
      return hour == 12
    case 'regression':
      return hour == 20
    default:
      return false
  }
}

pipeline {
  agent any

  parameters {
    choice(
      name: 'SUITE',
      choices: ['all', 'smoke', 'sanity', 'regression'],
      description: 'Choose a suite to run manually. Scheduled runs use the time-based defaults.'
    )
  }

  triggers {
    cron('H 6 * * *')
    cron('H 12 * * *')
    cron('H 20 * * *')
  }

  tools {
    nodejs 'NodeJS-20'
  }

  environment {
    CI = 'true'
    BASE_URL = 'https://dev.baserahub.com/'
    HEADLESS = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'npm ci'
        bat 'npx playwright install --with-deps'
      }
    }

    stage('Smoke Tests') {
      when {
        expression { return shouldRunStage('smoke') }
      }
      steps {
        bat 'npm run test:smoke'
      }
    }

    stage('Sanity Tests') {
      when {
        expression { return shouldRunStage('sanity') }
      }
      steps {
        bat 'npm run test:sanity'
      }
    }

    stage('Regression Tests') {
      when {
        expression { return shouldRunStage('regression') }
      }
      steps {
        bat 'npm run test:regression'
      }
    }

    stage('Generate Allure Report') {
      steps {
        bat 'npm run report:allure:generate'
      }
    }
  }

  post {
    always {
      junit allowEmptyResults: true, testResults: 'reports/junit/results.xml'
      archiveArtifacts allowEmptyArchive: true, artifacts: 'reports/**/*'
      publishHTML([
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'reports/playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright HTML Report'
      ])
      publishHTML([
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'reports/allure-report',
        reportFiles: 'index.html',
        reportName: 'Allure Report'
      ])
    }
  }
}
