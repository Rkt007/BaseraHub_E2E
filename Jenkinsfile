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
            name: 'TEST_TYPE',
            choices: ['smoke', 'regression', 'sanity','others'],
            description: 'Select which Playwright tests to run'
        )
    }

    triggers {
        cron('H 6,12,20 * * *')
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Rkt007/BaseraHub_E2E.git/'
            }
        }

        stage('Check Node & NPM') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    script {
                        def testType = params.TEST_TYPE ?: 'smoke'

                        if (testType == 'smoke') {
                            bat 'npx playwright test --grep @smoke'
                        }
                        else if (testType == 'regression') {
                            bat 'npx playwright test --grep @regression'
                        }
                        else if (testType == 'others') {
                            bat 'npx playwright test --grep-invert "@smoke|@regression"'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: true

            allure(
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            )
        }

        success {
            emailext(
                to: 'rahul.rkt007@gmail.com',
                subject: "✅ Jenkins SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """Hi Rahul,

Jenkins build SUCCESS ✅
No flaky tests detected.

Build URL:
${env.BUILD_URL}
"""
            )
        }

        unstable {
            emailext(
                to: 'rahul.rkt007@gmail.com',
                subject: "⚠️ Jenkins UNSTABLE (Flaky Tests): ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """Hi Rahul,

Some tests were flaky ⚠️
They passed after retries.

Please check Allure report.

Build URL:
${env.BUILD_URL}
"""
            )
        }

        failure {
            emailext(
                to: 'rahul.rkt007@gmail.com',
                subject: "❌ Jenkins FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """Hi Rahul,

Tests failed even after retries ❌

Please check Allure & Playwright reports.

Build URL:
${env.BUILD_URL}
"""
            )
        }
    }
}
