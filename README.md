# 👼 Little Angels Childcare

Welcome to **Little Angels Childcare**, a project built with **Next.js**, **PostgreSQL**, and **Docker**. This freelance project provides a functional web application running on a production server, hosted on a VPS with **Hostinger** and accessible at [littleangelspdx.com](http://littleangelspdx.com).

---

## 🚀 Project Overview

This project is designed for a childcare service and includes the following technologies:

- **🎨 UX/UI**: [Built with figma](https://www.figma.com/design/IX8DzbQVxrTqkvOoZHpx8k/LITTLE-ANGLES-CHILDCARE---Desktop?node-id=0-1&t=0FiNNWS0kdanluYu-1).
- **🖥️ Frontend**: Built with Next.js.
- **🐘 Database**: PostgreSQL for data storage.
- **🐳 Infrastructure**: Docker containers for the app, PostgreSQL, and Nginx for reverse proxy.
- **🌐 Hosting**: Deployed on a Hostinger VPS.
- **🔑 API Integration**: Includes API keys for services like Google Maps.

---

## 🛠️ Tech Stack

### **Frontend**
- [Next.js](https://nextjs.org/): A React-based framework for server-side rendering.

### **Backend**
- [PostgreSQL](https://www.postgresql.org/): Relational database.
- [PgAdmin](https://www.pgadmin.org/): Database management tool.

### **Infrastructure**
- [Docker](https://www.docker.com/): Containerized deployment.
- [Nginx](https://www.nginx.com/): Reverse proxy and load balancing.

---

## 📋 Features

### 🏫 **Childcare Services**
- Showcase childcare details and offerings.

### 🗺️ **Google Maps Integration**
- Displays location and other map-based services using Google Maps API.

### 🐳 **Dockerized Environment**
- Simplified setup and deployment using Docker Compose.

---

## 🛠️ Environment Variables

The application uses the following environment variables:

```plaintext
DB_USER="admin"
DB_PASSWORD="admin"
DB_NAME="childcare"
DB_HOST="db"
DB_PORT="5432"
MAPS_API_KEY="maps-api-key"
MAPS_PLACE_ID="maps-place-id"
PGADMIN_DEFAULT_EMAIL="admin@example.com"
PGADMIN_DEFAULT_PASSWORD="admin"
```

Ensure you update sensitive information (e.g., `DB_PASSWORD` and `MAPS_API_KEY`) before deploying to production.

---

## 🚀 Getting Started

### Prerequisites
- Docker
- Docker Compose

### Running the Application

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/little-angels-childcare.git
   cd little-angels-childcare
   ```

2. **Start the Application**:
   ```bash
   docker compose up -d
   ```

3. Access the application at [http://localhost](http://localhost).

---

## 🔄 Restarting and Rebuilding

To restart the app with a fresh build and reset the database:

```bash
docker compose down -v
docker compose up --build -d
```

---

## 📂 Folder Structure

- **`src/`**: Contains the application source code.
- **`public/`**: Static files served by the application.
- **`docker-compose.yml`**: Docker Compose configuration for the app, database, and reverse proxy.
- **`Dockerfile`**: Defines how the Next.js app is containerized.

---

## 📖 Future Enhancements

- Add user authentication for admin panels.
- Implement additional features like scheduling and parent portals.
- Enhance SEO performance.

---

## 🤝 Contributing

Feel free to fork the repository, make improvements, and submit pull requests. All contributions are welcome!

---

## 💬 Contact

For any questions or suggestions, reach out at [joaomarcospsnbr@gmail.com](mailto:joaomarcospsnbr@gmail.com).
