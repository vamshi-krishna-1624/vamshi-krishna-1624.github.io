---
title: "API Reference"
type: "docs" 
description: "Complete API documentation with examples"
date: 2024-01-03
weight: 30
---

# API Reference

This documentation provides detailed information about our REST API endpoints, including request/response formats, authentication, and examples.

## Authentication

All API requests require authentication using Bearer tokens:

```bash
Authorization: Bearer your-api-token
```

To obtain an API token, visit your [account dashboard](/dashboard/api-tokens).

## Base URL

```
https://api.example.com/v1
```

## Endpoints

### Users

#### Get User

```http
GET /users/{id}
```

Retrieves user information by ID.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `id` | string | User's unique identifier |

**Response:**

```json
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### Create User

```http
POST /users
```

Creates a new user.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password"
}
```

**Response:**

```json
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### Projects

#### List Projects

```http
GET /projects
```

Retrieves a list of projects.

**Query Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `page` | integer | Page number (default: 1) |
| `per_page` | integer | Items per page (default: 20) |
| `status` | string | Filter by status (optional) |

**Response:**

```json
{
  "data": [
    {
      "id": "proj_123",
      "name": "My Project",
      "description": "Project description",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 5,
    "total_count": 100
  }
}
```

## Error Handling

The API uses conventional HTTP response codes to indicate success or failure:

- 2xx: Success
- 4xx: Client errors
- 5xx: Server errors

Error responses follow this format:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "A detailed error message",
    "details": {
      "field": "Additional error context"
    }
  }
}
```

## Rate Limiting

API requests are limited to 100 requests per minute per API token. Rate limit information is included in the response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Webhooks

Webhooks allow you to receive real-time updates when certain events occur:

1. Create a webhook endpoint on your server
2. Register the webhook URL in your [dashboard](/dashboard/webhooks)
3. We'll send POST requests to your URL when events occur

Example webhook payload:

```json
{
  "event": "user.created",
  "data": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## SDK Support

We provide official SDKs for multiple languages:

- [JavaScript](https://github.com/your-org/js-sdk)
- [Python](https://github.com/your-org/python-sdk)
- [Ruby](https://github.com/your-org/ruby-sdk)
- [Go](https://github.com/your-org/go-sdk)

## Need Help?

- Join our [Discord community](https://discord.gg/your-project)
- Email support at api-support@example.com
- Check our [Status Page](https://status.example.com) for API uptime