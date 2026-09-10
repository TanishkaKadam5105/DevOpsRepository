variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Deployment environment such as QA, UAT, or PROD"
  type        = string
}

variable "frontend_port" {
  description = "Port used by the QueueEase frontend"
  type        = number
}

variable "backend_port" {
  description = "Port used by the QueueEase backend"
  type        = number
}