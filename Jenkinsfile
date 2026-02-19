pipeline {

  environment {
    // Jenkins credential (Docker Hub)
    DOCKERHUB = credentials('dockerhub')

    // BuildKit endpoint (namespace default)
    BUILDKIT_HOST = 'tcp://buildkitd.default.svc.cluster.local:1234'
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
    command:
    - cat
    tty: true
    env:
    - name: DOCKER_BUILDKIT
      value: "1"
    - name: BUILDKIT_HOST
      value: tcp://buildkitd.default.svc.cluster.local:1234
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

    stage('Build & Push Backend') {
      steps {
        container('docker') {
          sh '''
            docker buildx build \
              --builder default \
              --progress=plain \
              --push \
              --tag docker.io/$DOCKERHUB_USR/mostrans-backend:${BUILD_NUMBER} \
              --tag docker.io/$DOCKERHUB_USR/mostrans-backend:latest \
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
              --builder default \
              --progress=plain \
              --push \
              --tag docker.io/$DOCKERHUB_USR/mostrans-frontend:${BUILD_NUMBER} \
              --tag docker.io/$DOCKERHUB_USR/mostrans-frontend:latest \
              frontend
          '''
        }
      }
    }
  }

  post {
    success {
      echo "✅ Images successfully built & pushed using BuildKit"
    }
    failure {
      echo "❌ Build failed"
    }
  }
}
