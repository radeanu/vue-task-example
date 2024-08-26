pipeline {
    agent any

    tools {
        nodejs 'NodeJs'
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
                sh 'sudo rm -rf /var/www/html/{*,.*}'
                sh 'sudo cp -r .output /var/www/html'
            }
        }
    }
}
