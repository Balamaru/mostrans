pipeline {
  agent {
    kubernetes {
      label 'kubeagent'
    }
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Backend Build') {
      steps {
        container('backend') {
          sh '''
            cd backend
            go mod tidy
            go test ./...
            go build -o app
          '''
        }
      }
    }

    stage('Frontend Build') {
      steps {
        container('frontend') {
          sh '''
            cd frontend
            npm install
            npm run build
          '''
        }
      }
    }
  }
}