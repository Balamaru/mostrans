pipeline {

  environment {
    DOCKERHUB = credentials('dockerhub')
    BUILDKIT_HOST = "tcp://buildkitd.default.svc.cluster.local:1234"
  }

  agent {
    kubernetes {
      yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: docker
    image: waynewu411/docker-cli:1.0
    command: ["cat"]
    tty: true
    env:
    - name: DOCKER_BUILDKIT
      value: "1"
    volumeMounts:
    - name: certs
      mountPath: /certs
      readOnly: true
  volumes:
  - name: certs
    secret:
      secretName: buildkit-client-certs
'''
    }
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Docker Login') {
      steps {
        container('docker') {
          sh '''
            echo "$DOCKERHUB_PSW" | docker login \
              -u "$DOCKERHUB_USR" \
              --password-stdin
          '''
        }
      }
    }

    stage('Setup Buildx') {
      steps {
        container('docker') {
          sh '''
            docker buildx rm buildkit-remote || true

            docker buildx create \
              --name buildkit-remote \
              --driver remote \
              --driver-opt cacert=/certs/ca.pem \
              --driver-opt cert=/certs/cert.pem \
              --driver-opt key=/certs/key.pem \
              --driver-opt servername=buildkitd \
              $BUILDKIT_HOST || true

            docker buildx use buildkit-remote
            docker buildx inspect --bootstrap
          '''
        }
      }
    }

    stage('Build & Push Backend') {
      steps {
        container('docker') {
          sh '''
            docker buildx build \
              --platform linux/amd64 \
              --progress=plain \
              --push \
              -f backend/Dockerfile.backend \
              -t docker.io/balamaru/mostrans-backend:${BUILD_NUMBER} \
              -t docker.io/balamaru/mostrans-backend:latest \
              backend
          '''
        }
      }
    }

    stage('Build & Push Frontend') {
      steps {
        container('docker') {
          sh '''
            docker buildx build \
              --platform linux/amd64 \
              --progress=plain \
              --push \
              -f frontend/Dockerfile.frontend \
              -t docker.io/balamaru/mostrans-frontend:${BUILD_NUMBER} \
              -t docker.io/balamaru/mostrans-frontend:latest \
              frontend
          '''
        }
      }
    }
  }

  post {
    success {
      echo "✅ Build & Push SUCCESS"
    }
    failure {
      echo "❌ Build FAILED"
    }
  }
}
