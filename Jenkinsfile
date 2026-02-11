pipeline {
  agent {
    kubernetes {
      label 'kube-agent'
    }
  }

  stages {

    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build Backend Image') {
      steps {
        container('kaniko') {
          sh '''
            /kaniko/executor \
              --context ${WORKSPACE}/backend \
              --dockerfile ${WORKSPACE}/Dockerfile.backend \
              --destination registry.example.com/mostrans/backend:${BUILD_NUMBER}
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
              --destination registry.example.com/mostrans/frontend:${BUILD_NUMBER}
          '''
        }
      }
    }
  }
}
