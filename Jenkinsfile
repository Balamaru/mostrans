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

    stage('Debug kaniko auth') {
      steps {
        container('kaniko') {
          sh '''
            // mkdir -p /kaniko/.docker
            // cp /kaniko/.docker/config.json/.dockerconfigjson /kaniko/.docker/config.json
            // chmod 600 /kaniko/.docker/config.json
            ls -lah /kaniko/.docker
            // cat /kaniko/.docker/.dockerconfigjson
          '''
        }
      }
    }

    // stage('Build Backend Image') {
    //   steps {
    //     container('kaniko') {
    //       sh '''
    //         /kaniko/executor \
    //           --context ${WORKSPACE}/backend \
    //           --dockerfile ${WORKSPACE}/backend/Dockerfile.backend \
    //           --destination balamaru/mostrans-backend:${BUILD_NUMBER}
    //       '''
    //     }
    //   }
    // }

    // stage('Build Frontend Image') {
    //   steps {
    //     container('kaniko') {
    //       sh '''
    //         /kaniko/executor \
    //           --context ${WORKSPACE}/frontend \
    //           --dockerfile ${WORKSPACE}/frontend/Dockerfile.frontend \
    //           --destination balamaru/mostrans-frontend:${BUILD_NUMBER}
    //       '''
    //     }
    //   }
    // }
  }
}
