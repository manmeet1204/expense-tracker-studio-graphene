# Coding Standards

General

- Use descriptive names
- Small reusable functions
- Avoid magic numbers
- Prefer early returns
- Handle all errors

Frontend

- Functional components only
- Hooks only
- One responsibility per component

Backend

- Route -> Controller -> Service

No business logic inside routes

Validation

All inputs validated

Error Responses

{
  "success": false,
  "message": "error message"
}

Success Responses

{
  "success": true,
  "data": {}
}