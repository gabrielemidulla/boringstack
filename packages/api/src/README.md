# API Source Layout

- `core`: application bootstrapping, environment config, global HTTP setup, and shared API error handling.
- `http`: request-facing feature modules, controllers, and local services.
- `integrations`: modules and helpers for external systems such as Better Auth, Drizzle/MySQL, and OpenAPI generation.

The package root exports only the API application entry points used by app runners.
Controllers, services, and integration details stay internal to their modules.
