# Prompt Optimizer 

A Next.js application for optimizing prompts using Google's Gemini AI.

## Features
- User-friendly interface with a clean and responsive design.
- Tailored UI elements to match the dark/light mode preferences.
- Dockerized for easy deployment.

## Technologies Used
- **FastAPI** — Backend framework
- **Next.js** — React framework for building the front-end.
- **TypeScript** — Type-safe JavaScript.
- **Tailwind CSS** — Utility-first CSS framework.
- **Docker** — Containerization for deployment.

## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) installed on your system.

### Run with Docker
```bash
# Build the Docker image
docker build -t prompt-optimizer .

# Run the container
docker run -p 3000:3000 prompt-optimizer
```