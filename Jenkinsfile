pipeline {

    agent any

    tools {
        nodejs 'Node22'
        jdk 'jdk21'
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
            }
        }

        stage('Install Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {

        always {

            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true

            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }

        success {

            emailext(
                subject: "✅ SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                <h2>Playwright Automation Build Successful</h2>

                <p><b>Project:</b> ${env.JOB_NAME}</p>
                <p><b>Build:</b> #${env.BUILD_NUMBER}</p>
                <p><b>Status:</b> SUCCESS</p>

                <p>
                <a href="${env.BUILD_URL}">
                    View Build
                </a>
                </p>

                <p>
                <a href="${env.BUILD_URL}Playwright_Report/">
                    View Playwright Report
                </a>
                </p>
                """,
                mimeType: 'text/html',
                to: 'netstaffle@gmail.com'
            )
        }

        failure {

            emailext(
                subject: "❌ FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                <h2>Playwright Automation Failed</h2>

                <p><b>Project:</b> ${env.JOB_NAME}</p>
                <p><b>Build:</b> #${env.BUILD_NUMBER}</p>
                <p><b>Status:</b> FAILED</p>

                <p>
                <a href="${env.BUILD_URL}">
                    View Console Log
                </a>
                </p>
                """,
                mimeType: 'text/html',
                to: 'netstaffle@gmail.com'
            )
        }
    }
}