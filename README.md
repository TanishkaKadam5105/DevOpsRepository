QueueEase — CI/CD, Kubernetes and Monitoring

 1. Project Overview

QueueEase is a digital token and queue management application. It helps users generate tokens, view queue status, and serve the next token.

This project extends FA1 by adding automated testing, CI/CD, Docker image building, Kubernetes deployment configuration, and monitoring configuration.

2. Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js and Express.js
- Version Control: Git and GitHub
- CI/CD: GitHub Actions
- Automated Testing: Jest
- Containerization: Docker
- Orchestration: Kubernetes
- Monitoring: Prometheus and Grafana
- Infrastructure as Code: Terraform

3. Application Architecture

The frontend communicates with the backend API. Docker packages the frontend and backend into separate images. GitHub Actions automatically tests the code and builds both images when changes are pushed to the main branch.

Kubernetes Deployment and Service manifests define how the application should run and how its components can be accessed. Prometheus and Grafana are intended to provide application monitoring and visualization.

4. CI/CD Pipeline

The GitHub Actions workflow is located at `.github/workflows/ci.yml`.

Pipeline steps:

1. A developer pushes code to GitHub.
2. GitHub Actions checks out the repository.
3. Node.js is configured.
4. Dependencies are installed using `npm ci`.
5. Jest runs automated tests.
6. Docker builds the backend image.
7. Docker builds the frontend image.

If testing or image building fails, the workflow fails. The images built by GitHub Actions are created on its runner; publishing images or deploying them to a Kubernetes cluster requires additional configuration.

5. Automated Testing

Jest is used to test the `add()` function in `app.js`.

Run the tests locally:

```bash
npm test
```

The test verifies that adding 2 and 3 returns 5. The test passed in the local environment and in the successful CI run.

6. Docker

Dockerfiles are located at:

- `queueease/docker/backend/Dockerfile`
- `queueease/docker/frontend/Dockerfile`

Build the backend image:

```bash
docker build -t queueease-backend:latest ./queueease/docker/backend
```

Build the frontend image:

```bash
docker build -t queueease-frontend:latest ./queueease/docker/frontend
```

These commands require the Docker Engine to be running.

7. Kubernetes

Kubernetes manifests are located in `queueease/kubernetes/`.

- `backend.yaml` defines the backend Deployment and Service.
- `frontend.yaml` defines the frontend Deployment and Service.

Apply the manifests after a Kubernetes cluster is running and the required images are available to that cluster:

```bash
kubectl apply -f queueease/kubernetes/backend.yaml
kubectl apply -f queueease/kubernetes/frontend.yaml
kubectl get deployments
kubectl get pods
kubectl get services
```

A successful deployment must be verified using the commands above. Creating YAML files alone does not mean the application has been deployed.

8. Monitoring

Prometheus is intended to collect metrics, and Grafana is intended to display them in dashboards. The monitoring configuration and live metrics must be verified before claiming monitoring is operational.

9. Current Status

- Git repository and push: completed.
- Jest automated test: passed.
- GitHub Actions workflow: passed for the test and Docker image build steps.
- Kubernetes: local cluster startup has encountered connection errors and needs verification.
- Prometheus and Grafana: setup and metric visualization still need to be completed and verified.

10. Conclusion

QueueEase demonstrates the use of version control, automated testing, CI/CD, Docker containerization, Kubernetes configuration, and monitoring concepts. Successful deployment and monitoring will be confirmed after the required services are running and verified.
