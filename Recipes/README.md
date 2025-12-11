# Recipes - Rails App with Docker

A simple Ruby on Rails web application using PostgreSQL, configured to run entirely with Docker.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. **Build and start the containers:**
   ```bash
   docker-compose build
   docker-compose up
   ```

2. **In a separate terminal, set up the database:**
   ```bash
   docker-compose exec web rails db:create
   docker-compose exec web rails db:migrate
   ```

3. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`

## Available Commands

- **Start containers:** `docker-compose up`
- **Start in background:** `docker-compose up -d`
- **Stop containers:** `docker-compose down`
- **View logs:** `docker-compose logs -f web`
- **Run Rails console:** `docker-compose exec web rails console`
- **Run migrations:** `docker-compose exec web rails db:migrate`
- **Run tests:** `docker-compose exec web rails test`

## Project Structure

- `Dockerfile` - Configuration for the Rails application container
- `docker-compose.yml` - Orchestrates Rails and PostgreSQL services
- `config/database.yml` - Database configuration for Docker environment

## Database

The PostgreSQL database is configured with:
- **User:** recipes_user
- **Password:** recipes_password
- **Database:** recipes_development
- **Host:** db (internal Docker network)

The database data is persisted in a Docker volume, so it will persist even if containers are stopped.

