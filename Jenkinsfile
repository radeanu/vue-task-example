pipeline {
    agent any

    stages {
        stage('Information') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
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
