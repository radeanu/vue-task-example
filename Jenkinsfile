pipeline {
    agent any

    stages {
        stage('Information') {
            steps {
                sh 'sudo docker compose version'
            }
        }
        stage('Build') {
            steps {
                sh 'docker compose up --build --no-start'
                sh 'docker save nuxt > nuxt.tar'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                sh 'scp nuxt.tar 192.168.1.89:/home/neo/containers/'
            }
        }
    }
}
