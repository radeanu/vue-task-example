pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'docker compose up --build --no-start'
                sh 'docker save nuxt_app > nuxt_app.tar'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                sh 'scp nuxt_app.tar 192.168.1.89:/home/neo/containers/'
            }
        }
    }
}
