output "project_name" {
  description = "QueueEase project name"
  value       = var.project_name
}

output "environment" {
  description = "Current deployment environment"
  value       = var.environment
}

output "frontend_url" {
  description = "Frontend URL"
  value       = "http://localhost:${var.frontend_port}"
}

output "backend_url" {
  description = "Backend URL"
  value       = "http://localhost:${var.backend_port}"
}