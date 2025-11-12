# 👼 Little Angels Childcare

Welcome to **Little Angels Childcare**, a comprehensive childcare management web application built for **Mariana Ricci's** preschool in Oregon, USA. This full-stack application features a Next.js frontend, PostgreSQL database, AWS S3 integration for image management, and a complete admin CMS for content management.

🌐 **Live Website**: [littleangelspdx.com](http://littleangelspdx.com)
🎨 **Design**: [Figma Design](https://www.figma.com/design/IX8DzbQVxrTqkvOoZHpx8k/LITTLE-ANGLES-CHILDCARE---Desktop?node-id=0-1&t=0FiNNWS0kdanluYu-1)

---

## 🚀 Project Overview

This project is a complete childcare website solution with:

- **🎨 Modern UI/UX**: Responsive design with Tailwind CSS
- **🖥️ Frontend**: Next.js with TypeScript
- **🐘 Database**: PostgreSQL with custom schema
- **☁️ Cloud Storage**: AWS S3 for image management
- **🔧 Admin CMS**: Complete content management system
- **🐳 Infrastructure**: Docker containers with Nginx
- **🌐 Hosting**: Deployed on Hostinger VPS

---

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14**: React framework with TypeScript
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **React Hooks**: Custom hooks for state management

### **Backend & Database**
- **PostgreSQL**: Primary database
- **Node.js**: Runtime environment
- **Custom APIs**: RESTful endpoints for all operations

### **Cloud & Storage**
- **AWS S3**: Image storage and management
- **AWS SDK v3**: Modern AWS integration

### **Infrastructure**
- **Docker**: Containerized deployment
- **Nginx**: Reverse proxy and load balancing
- **Docker Compose**: Multi-container orchestration

### **Development Tools**
- **TypeScript**: Type-safe development
- **ESLint**: Code quality and consistency
- **Formidable**: File upload handling

---

## 📋 Features

### 🏫 **Public Website**
- **Hero Section**: Dynamic content with skeleton loading
- **About Page**: Childcare philosophy and mission
- **Gallery**: Image showcase with lazy loading
- **Contact Form**: Direct messaging to admin
- **Reviews Section**: Google-style reviews display
- **Responsive Design**: Mobile-first approach

### 🔧 **Admin CMS**
- **�️ Image Management**: Upload, edit, replace, and delete images with S3
- **📝 Content Management**: Edit all website text content
- **💬 Review Management**: Show/hide reviews with toggle controls
- **📧 Contact Management**: View and manage contact form submissions
- **🔐 Secure Authentication**: Password-protected admin panel

### ⚡ **Performance Features**
- **Skeleton Loading**: Smooth loading states
- **Image Optimization**: Lazy loading and responsive images
- **Database Indexing**: Optimized queries
- **Caching Strategy**: Efficient data fetching

---

## 📂 Project Structure

```
little-angels-childcare/
├── src/
│   ├── application/          # Business logic
│   │   └── useCases/        # Application use cases
│   ├── domain/              # Domain entities
│   │   ├── entities/        # Data models
│   │   └── repositories/    # Repository interfaces
│   ├── infrastructure/      # External services
│   │   ├── database/        # PostgreSQL client
│   │   ├── services/        # AWS S3 service
│   │   └── repositories/    # Repository implementations
│   ├── interfaces/          # UI components and hooks
│   │   ├── hooks/          # Custom React hooks
│   │   └── styles/         # Global styles
│   ├── pages/              # Next.js pages
│   │   ├── admin/          # Admin panel pages
│   │   ├── api/            # API endpoints
│   │   └── components/     # React components
│   └── shared/             # Shared utilities
├── db-init/                # Database initialization
├── public/                 # Static assets
├── docker-compose.yml      # Docker configuration
├── dockerfile             # Application container
└── nginx.conf             # Nginx configuration
```

---

## 🛠️ Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### **Database Configuration**
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=little_angels_db
DB_USER=postgres
DB_PASSWORD=your_database_password
```

### **AWS S3 Configuration**
```env
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
S3_BUCKET_NAME=little-angels-images
```

### **Admin Authentication**
```env
ADMIN_PASSWORD=your_secure_admin_password
```

### **Next.js Configuration**
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

**⚠️ Security Note**: Never commit your `.env.local` file. Use `.env.example` as a template.

---

## 🔧 Setup Instructions

### **Prerequisites**
- **Node.js** (v18+ recommended)
- **Docker & Docker Compose** (for containerized setup)
- **PostgreSQL** (if running locally without Docker)
- **AWS Account** (for S3 image storage)

### **1. Clone the Repository**

```bash
git clone https://github.com/jmlandi/little-angels-childcare.git
cd little-angels-childcare
```

### **2. Environment Setup**

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your environment variables in `.env.local`:
   - Database credentials
   - AWS S3 configuration
   - Admin password
   - Next.js secrets

### **3. AWS S3 Setup**

1. **Create S3 Bucket**:
   - Login to AWS Console
   - Create a new S3 bucket (e.g., `little-angels-images`)
   - Enable public read access for images
   - Note the region and bucket name

2. **Create IAM User**:
   - Create IAM user with S3 permissions
   - Generate access key and secret key
   - Add keys to `.env.local`

### **4. Development Setup**

#### **Option A: Docker (Recommended)**

```bash
# Start the full stack (app + database)
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# PgAdmin: http://localhost:5050
```

#### **Option B: Local Development**

```bash
# Install dependencies
npm install

# Start PostgreSQL (Docker)
docker-compose up postgres pgadmin

# Run database migrations
# Import db-init/init.sql to your PostgreSQL database

# Start development server
npm run dev

# Access at http://localhost:3000
```

### **5. Database Initialization**

The database will be automatically initialized with:
- Required tables (contacts, images, site_content, reviews)
- Sample data for content and reviews
- Proper indexes and constraints

---

## 🗂️ Database Schema

### **Contacts** - Contact form submissions
| Column     | Type      | Description           |
|------------|-----------|----------------------|
| id         | UUID      | Primary key          |
| name       | VARCHAR   | Contact name         |
| email      | VARCHAR   | Contact email        |
| message    | TEXT      | Contact message      |
| created_at | TIMESTAMP | Submission timestamp |

### **Images** - S3-stored images
| Column     | Type      | Description          |
|------------|-----------|---------------------|
| id         | UUID      | Primary key         |
| name       | VARCHAR   | Image name          |
| url        | TEXT      | S3 URL              |
| alt_text   | TEXT      | Accessibility text  |
| created_at | TIMESTAMP | Upload timestamp    |
| updated_at | TIMESTAMP | Last modified       |

### **Site Content** - Editable website content
| Column     | Type      | Description         |
|------------|-----------|---------------------|
| id         | SERIAL    | Primary key         |
| section    | VARCHAR   | Content section     |
| key        | VARCHAR   | Content key         |
| value      | TEXT      | Content value       |
| updated_at | TIMESTAMP | Last modified       |

### **Reviews** - Customer reviews
| Column      | Type      | Description          |
|-------------|-----------|----------------------|
| id          | SERIAL    | Primary key          |
| author_name | VARCHAR   | Review author        |
| rating      | SMALLINT  | 1-5 star rating      |
| text        | TEXT      | Review content       |
| visible     | BOOLEAN   | Display on website   |
| created_at  | TIMESTAMP | Review timestamp     |

### **Pages Content** - Legacy JSON content
| Column     | Type    | Description       |
|------------|---------|------------------|
| id         | SERIAL  | Primary key      |
| page_name  | TEXT    | Page identifier  |
| content    | JSONB   | JSON content     |

---

## 🔐 Admin Panel Usage

### **Access**
1. Navigate to `/admin/login`
2. Enter the admin password (from `.env.local`)
3. Access admin dashboard

### **Features**

#### **📧 Contact Management** (`/admin/contacts`)
- View all contact form submissions
- Search and filter contacts
- Export contact data
- Pagination and sorting

#### **🖼️ Image Management** (`/admin/images`)
- Upload new images to S3
- Edit image names and alt text
- Replace existing images
- Delete images (removes from S3 and database)
- Preview images in modal

#### **📝 Content Management** (`/admin/content`)
- Edit all website text content
- Organized by sections (hero, about, contact, etc.)
- Inline editing capabilities
- Add new content fields
- Delete unused content

#### **💬 Review Management** (`/admin/reviews`)
- View all customer reviews
- Toggle review visibility
- Add new reviews manually
- Edit existing reviews
- Delete inappropriate reviews
- Star rating display

---

## 🚀 Deployment

### **Production Deployment on VPS**

1. **Server Setup**:
   ```bash
   # Install Docker and Docker Compose
   sudo apt update
   sudo apt install docker.io docker-compose
   
   # Clone repository
   git clone https://github.com/jmlandi/little-angels-childcare.git
   cd little-angels-childcare
   ```

2. **Environment Configuration**:
   ```bash
   # Create production environment file
   cp .env.example .env
   # Edit .env with production values
   ```

3. **SSL and Domain**:
   - Configure Nginx with SSL certificates
   - Point domain to server IP
   - Update Nginx configuration

4. **Deploy**:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### **Environment-Specific Considerations**

- **Development**: Use local PostgreSQL and development S3 bucket
- **Staging**: Separate S3 bucket and database
- **Production**: Production S3 bucket, SSL, and security hardening

---

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build production version
npm run build
```

---

## 🔧 API Endpoints

### **Images API** (`/api/images`)
- `GET` - List all images
- `POST` - Upload new image
- `PUT` - Update image metadata
- `DELETE` - Delete image

### **Content API** (`/api/content`)
- `GET` - Get site content (public)
- `PUT` - Update content (admin)
- `POST` - Create content (admin)
- `DELETE` - Remove content (admin)

### **Reviews API** (`/api/reviews`)
- `GET` - List reviews (filter by visibility)
- `POST` - Create review (admin)
- `PUT` - Update review (admin)
- `PATCH` - Toggle visibility (admin)
- `DELETE` - Delete review (admin)

### **Contacts API** (`/api/contacts`)
- `GET` - List contacts (admin)
- `POST` - Submit contact form (public)

---

## 🤝 Contributing

This is a proprietary project for Little Angels Childcare. For issues or feature requests:

1. Contact the project maintainers
2. Submit detailed bug reports
3. Follow the existing code style
4. Include tests for new features

---

## 📄 License

© 2024 Little Angels Childcare. All rights reserved.

This project is proprietary software developed for Little Angels Childcare in Oregon, USA. Unauthorized copying, modification, or distribution is prohibited.

---

## 👨‍💻 Developer

**Developed by**: [Your Name]  
**Client**: Mariana Ricci - Little Angels Childcare  
**Location**: Oregon, USA  
**Website**: [littleangelspdx.com](http://littleangelspdx.com)

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
