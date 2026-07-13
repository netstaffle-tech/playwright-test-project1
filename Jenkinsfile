pipeline {

    agent any

    tools {
        nodejs 'Node22'
        jdk 'jdk21'
    }

    options {
        timestamps()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Node Version') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {

        always {

            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])

            archiveArtifacts(
                artifacts: 'reports/**',
                allowEmptyArchive: true
            )
        }

        success {

            emailext(
                to: 'netstaffle@gmail.com',
                subject: "✅ SUCCESS | ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                mimeType: 'text/html',
                body: """
                    <h2>Playwright Automation Build Successful</h2>

                    <table border="1" cellpadding="8" cellspacing="0">
                        <tr>
                            <th>Project</th>
                            <td>${env.JOB_NAME}</td>
                        </tr>
                        <tr>
                            <th>Build</th>
                            <td>#${env.BUILD_NUMBER}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td style="color:green;"><b>SUCCESS</b></td>
                        </tr>
                    </table>

                    <br>

                    <a href="${env.BUILD_URL}">
                        View Jenkins Build
                    </a>

                    <br><br>

                    <a href="${env.BUILD_URL}Playwright_Report/">
                        View Playwright HTML Report
                    </a>
                """
            )
        }

        failure {

            emailext(
                to: 'netstaffle@gmail.com',
                subject: "❌ FAILED | ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                mimeType: 'text/html',
                body: """
                    <h2>Playwright Automation Build Failed</h2>

                    <table border="1" cellpadding="8" cellspacing="0">
                        <tr>
                            <th>Project</th>
                            <td>${env.JOB_NAME}</td>
                        </tr>
                        <tr>
                            <th>Build</th>
                            <td>#${env.BUILD_NUMBER}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td style="color:red;"><b>FAILED</b></td>
                        </tr>
                    </table>

                    <br>

                    <a href="${env.BUILD_URL}">
                        View Console Output
                    </a>
                """
            )
        }
    }
}