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
    TAG      = "${BUILD_NUMBER}"
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
              -f Dockerfile.backend \
              -t ${BACKEND_IMAGE}:${TAG} \
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
              -f Dockerfile.frontend \
              -t ${FRONTEND_IMAGE}:${TAG} \
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

    stage('Deploy Containers') {
        environment {
            MAGE_BACKEND  = 'mostrans-backend'
            IMAGE_FRONTEND = 'mostrans-frontend'
            TAG = "${BUILD_NUMBER}"
        }
        steps {
            sh '''
                echo "🚀 Deploying containers with docker run"
                docker rm -f backend-app frontend-app || true

                docker network inspect appnet >/dev/null 2>&1 || docker network create appnet

                docker run -d --name backend-app --network appnet -p 4000:4000 ${IMAGE_BACKEND}:${TAG}
                sleep 5
                docker run -d --name frontend-app --network appnet -p 8080:80 ${IMAGE_FRONTEND}:${TAG}
                docker ps
            '''
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
