# Code Rex Marketing Automation APP

## Setting up Django with PostgreSQL using Docker

### Introduction

This repository provides a Dockerized environment for running a Django project with a PostgreSQL database. This README will guide you through the setup process.

### Prerequisites

- Docker and Docker Compose should be installed on your system.

### Getting Started

1. **Clone the repository:**

    ```bash
    git clone git@github.com:CODEREXLTD/marketing-app.git
    ```
    ````bash
    cd closez
    ````

1. **Build the Docker image and start the containers::**

    ```bash
    docker-compose up -d --build
    ```
    ```bash
    docker-compose exec web python manage.py migrate
    ```
    ```bash
    docker-compose exec web python manage.py createsuperuser
    ```

### How to install package for backend app: ###

1. **Install package**
    ```bash
    docker-compose exec web pip install PACKAGE_NAME
    ```

1. **Update requirements.txt**
    ```bash
    docker-compose exec web pip freeze > backend/requirements.txt
    ```

