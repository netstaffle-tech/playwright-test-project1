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
            subject: "✅ ${env.JOB_NAME} #${env.BUILD_NUMBER} SUCCESS",
            body: "Playwright tests completed successfully."
        )
    }

    failure {
        emailext(
            to: 'netstaffle@gmail.com',
            subject: "❌ ${env.JOB_NAME} #${env.BUILD_NUMBER} FAILED",
            body: "Please check the Jenkins console log."
        )
    }
}