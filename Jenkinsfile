pipeline {
  agent {
    kubernetes {
      inheritFrom 'kube-agent'
    }
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Backend Image') {
      steps {
        container('kaniko') {
          sh '''
            /kaniko/executor \
              --context ${WORKSPACE}/backend \
              --dockerfile ${WORKSPACE}/Dockerfile.backend \
              --destination balamaru/mostrans-backend:${BUILD_NUMBER}
          '''
        }
      }
    }

    stage('Build Frontend Image') {
      steps {
        container('kaniko') {
          sh '''
            /kaniko/executor \
              --context ${WORKSPACE}/frontend \
              --dockerfile ${WORKSPACE}/Dockerfile.frontend \
              --destination balamaru/mostrans-frontend:${BUILD_NUMBER}
          '''
        }
      }
    }
  }
}
