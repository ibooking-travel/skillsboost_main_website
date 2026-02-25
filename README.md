# SkillsBoost — Dynamic EdTech Platform

A modern, full-stack online learning platform built with Next.js 15, MongoDB, and Prisma. Features a public-facing course marketplace with an intuitive admin CMS for complete course management.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-Latest-38b2ac?style=flat-square)

## 🚀 Features

### Public Interface
- **Course Discovery** — Responsive grid with filtering by category and level
- **Dynamic Course Pages** — Individual course pages with ISR (Incremental Static Regeneration)
- **Detailed Curriculum** — Expandable module structure with topics and durations
- **Student Testimonials** — Real reviews and ratings per course
- **Responsive Design** — Mobile-first with Tailwind CSS
- **Performance Optimized** — Framer Motion animations, lazy loading, image optimization

### Admin Dashboard
- **Course Management** — Create, edit, delete, and publish/unpublish courses
- **Curriculum Builder** — Add structured modules with topics and durations
- **Category Management** — Organize courses with dynamic category system
- **Authentication** — JWT-based auth with bcryptjs password hashing
- **Stats Dashboard** — Overview of courses, students, and performance metrics
- **Bulk Operations** — Edit multiple course metadata fields

## 📋 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS, Framer Motion |
| **Backend** | Next.js API Routes, Node.js |
| **Database** | MongoDB with Prisma ORM |
| **Authentication** | JWT (jose), bcryptjs |
| **Validation** | Zod schemas |
| **Performance** | ISR, Image optimization, Code splitting |

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ (use `node --version` to check)
- MongoDB (local or MongoDB Atlas cloud)
- npm or yarn

### 1. Clone & Install

```bash
git clone <repository-url>
cd skillsboost-mongo
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/skillsboost?retryWrites=true&w=majority"
# Or for local MongoDB:
# DATABASE_URL="mongodb://localhost:27017/skillsboost"

# Authentication
JWT_SECRET="your-secret-key-at-least-32-characters-long"
ADMIN_EMAIL="admin@skillsboost.in"
ADMIN_PASSWORD="AdminPassword123!"

# Optional: API endpoints
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

**Note:** Keep `JWT_SECRET` secure and use a strong password. For production, use environment variable management tools.

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to MongoDB
npm run db:push

# Seed initial data (5 courses + admin user)
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin/login
- **Admin Email:** admin@skillsboost.in
- **Admin Password:** AdminPassword123! (or your configured password)

## 📁 Project Structure

```
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── (public)/                 # Public pages layout
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── about/
│   │   │   ├── courses/[slug]/       # Dynamic course pages (ISR)
│   │   │   ├── contact/
│   │   │   └── privacy-policy/
│   │   ├── admin/
│   │   │   ├── login/                # Admin login (public)
│   │   │   ├── (protected)/          # Protected admin routes
│   │   │   │   ├── dashboard/        # Stats & overview
│   │   │   │   ├── courses/          # Course management
│   │   │   │   │   ├── page.tsx      # Course list
│   │   │   │   │   ├── new/          # Create course
│   │   │   │   │   └── [id]/edit/    # Edit course
│   │   │   │   └── categories/       # Category management
│   │   │   └── layout.tsx            # Admin sidebar layout
│   │   ├── api/admin/                # REST API endpoints
│   │   │   ├── auth/route.ts         # Login/logout
│   │   │   ├── courses/route.ts      # CRUD courses
│   │   │   │   └── [id]/route.ts
│   │   │   └── categories/route.ts   # CRUD categories
│   │   └── layout.tsx                # Root layout
│   ├── components/
│   │   ├── admin/                    # Admin-specific components
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── CourseForm.tsx
│   │   │   ├── CategoryManager.tsx
│   │   │   └── LoginForm.tsx
│   │   ├── courses/                  # Course-related components
│   │   │   ├── CoursePageClient.tsx  # Curriculum, FAQs, testimonials
│   │   │   └── CoursesGrid.tsx
│   │   ├── layout/                   # Shared layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PageLoader.tsx
│   │   ├── sections/                 # Homepage sections
│   │   ├── ui/                       # Reusable UI components
│   │   ├── forms/
│   │   └── modals/
│   ├── lib/
│   │   ├── auth.ts                   # JWT utilities, token generation
│   │   ├── db.ts                     # Database query helpers
│   │   ├── prisma.ts                 # Prisma singleton instance
│   │   ├── validations.ts            # Zod validation schemas
│   │   ├── utils.ts                  # Helper utilities
│   │   └── perf.ts                   # Performance monitoring
│   ├── types/
│   │   └── index.ts                  # TypeScript interfaces & types
│   ├── hooks/
│   │   ├── useScrollProgress.ts      # Scroll tracking
│   │   ├── useInView.ts              # Intersection observer
│   │   └── useTypewriter.ts          # Typewriter animation
│   ├── data/
│   │   ├── courses.ts                # Course seed data
│   │   └── testimonials.ts
│   └── styles/
│       └── globals.css               # Global styles
├── prisma/
│   ├── schema.prisma                 # MongoDB schema definition
│   └── seed.ts                       # Database seed script
├── public/                           # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/admin/auth` — Login with email/password
- Returns JWT token in httpOnly cookie

### Courses (Admin Only)
- `GET /api/admin/courses` — List all courses
- `POST /api/admin/courses` — Create new course
- `GET /api/admin/courses/[id]` — Get course details
- `PUT /api/admin/courses/[id]` — Update course
- `DELETE /api/admin/courses/[id]` — Delete course

### Categories (Admin Only)
- `GET /api/admin/categories` — List categories
- `POST /api/admin/categories` — Create category
- `PUT /api/admin/categories/[id]` — Update category
- `DELETE /api/admin/categories/[id]` — Delete category

## 📚 Admin Features

| Feature | Description |
|---------|-------------|
| **Dashboard** | Overview statistics, recent courses, enrollment metrics |
| **Course Management** | Full CRUD operations with rich form validation |
| **Curriculum Builder** | Add/edit module structure with topics and durations |
| **Category Management** | Create categories, reorder, activate/deactivate |
| **Publish Control** | Draft/publish courses for visibility control |
| **Authentication** | JWT-protected routes with server-side validation |

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Platforms

**Vercel** (Recommended)
```bash
npm install -g vercel
vercel
```

**Netlify**
```bash
npm run build
# Deploy the .next folder
```

**Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Environment Variables on Production:**
- Set all `.env.local` variables in your deployment platform
- Use MongoDB Atlas for production database
- Use a strong, randomly generated `JWT_SECRET`

## 📊 Database Schema

### Course
- `id` — ObjectId primary key
- `title`, `slug` — Course metadata
- `description`, `tagline`
- `curriculum` — JSON array of modules with topics
- `faqs` — JSON array of Q&A
- `instructor` — Instructor details
- `highlights`, `skills` — JSON arrays
- `isPublished` — Draft/publish control
- `createdAt`, `updatedAt` — Timestamps

### Category
- `id` — ObjectId primary key
- `name`, `slug` — Category metadata
- `icon`, `description`
- `isActive` — Visibility toggle
- `order` — Display order

### Admin (User)
- `id` — ObjectId primary key
- `email`, password (bcrypt hashed)
- `role` — User role
- `createdAt` — Registration timestamp

## 🔒 Security

- ✅ Password hashing with bcryptjs
- ✅ JWT authentication with httpOnly cookies
- ✅ Server-side validation with Zod schemas
- ✅ CSRF protection via Next.js middleware
- ✅ Secure Prisma queries (parameterized)
- ✅ Input sanitization

**Best Practices:**
- Never commit `.env.local` (add to `.gitignore`)
- Use environment variables for all secrets
- Enable HTTPS in production
- Regularly update dependencies: `npm update`

## 📦 NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run type-check` | Run TypeScript type checking |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Sync schema to MongoDB |
| `npm run db:seed` | Seed initial data |
| `npm run db:studio` | Open Prisma Studio (GUI) |

## 🐛 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` in `.env.local`
- For MongoDB Atlas: Check IP whitelist (allow 0.0.0.0/0 for dev)
- Check network connectivity: `ping cluster0.xxxxx.mongodb.net`

### Admin Login Fails
- Ensure database is seeded: `npm run db:seed`
- Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`
- Clear browser cookies and try again

### Typography/Styling Issues
- Run `npm install` to ensure all dependencies installed
- Clear `.next` folder: `rm -rf .next` then `npm run dev`
- Check Tailwind classes are applied: Inspect element in DevTools

### Curriculum Not Showing
- Verify curriculum data in database: Open Prisma Studio
- Check `curriculum` field is valid JSON array
- Ensure course is published: `isPublished: true`

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/my-feature`
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 💬 Support

For issues or questions:
- Check [Troubleshooting](#troubleshooting) section
- Review existing GitHub issues
- Create a new issue with detailed description

---

**Made with ❤️ using Next.js and MongoDB**

---

## Deployment (Vercel + MongoDB Atlas)

1. Create free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Add `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` to Vercel env
3. Set build command in Vercel:
   ```
   npx prisma generate && next build
   ```
