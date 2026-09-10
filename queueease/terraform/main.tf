terraform {
  required_version = ">= 1.0.0"
}

resource "terraform_data" "queueease_environment" {

  input = {
    project_name = var.project_name
    environment  = var.environment
    frontend_port = var.frontend_port
    backend_port  = var.backend_port
  }

  provisioner "local-exec" {
    command = "echo Deploying ${var.project_name} in ${var.environment} environment"
  }
}