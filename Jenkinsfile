pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Information') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'whoami'
            }
        }
        stage('Build') {
            steps {
                sh 'docker'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                sh 'rm -rf /var/www/html/{*,.*}'
                sh 'cp -r .output /var/www/html'
            }
        }
    }
}
