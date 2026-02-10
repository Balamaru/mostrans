pipeline {
  agent {
    docker {
      image 'docker:26-cli'
      args '-v /var/run/docker.sock:/var/run/docker.sock'
    }
  }

  environment {
    BACKEND_IMAGE  = "mostrans-backend"
    FRONTEND_IMAGE = "mostrans-frontend"
    IMAGE_TAG      = "${BUILD_NUMBER}"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Backend Image') {
      steps {
        dir('backend') {
          sh '''
            docker build \
              -t ${BACKEND_IMAGE}:${IMAGE_TAG} \
              -t ${BACKEND_IMAGE}:latest .
          '''
        }
      }
    }

    stage('Build Frontend Image') {
      steps {
        dir('frontend') {
          sh '''
            docker build \
              -t ${FRONTEND_IMAGE}:${IMAGE_TAG} \
              -t ${FRONTEND_IMAGE}:latest .
          '''
        }
      }
    }

    stage('Docker Images') {
      steps {
        sh 'docker images | grep mostrans'
      }
    }
  }

  post {
    success {
      echo "✅ Build sukses"
    }
    failure {
      echo "❌ Build gagal"
    }
  }
}
