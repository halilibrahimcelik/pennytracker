# Penny Tracker

A modern, full-stack personal finance tracking application built with Next.js 15, featuring real-time transaction management, interactive data visualizations, and comprehensive financial analytics.

## ✨ Features

### 🔐 Authentication & Security

- Secure authentication with Better Auth
- Email verification and password reset functionality
- Protected routes with middleware
- Session management

### 💰 Transaction Management

- Create, read, update, and delete transactions
- Support for income and expense tracking
- Multiple transaction categories:
  - Leisure, Food, Transport, Utilities, Health
  - Salary, Freelance, Investments, Others
- Date-based transaction filtering
- Sortable and paginated transaction table

### 📊 Data Visualization & Analytics

- **Expense-Income Pie Chart**: Visual breakdown of income vs expenses
- **Category Bar Chart**: Transaction distribution by category
- **Monthly Flow Chart**: 12-month income and expense trends
- Interactive date range filtering
- Real-time data updates
- Empty state handling with user-friendly messages

### 💅 UI/UX

- Modern, responsive design with Tailwind CSS
- Dark/Light theme support with next-themes
- Shadcn UI components for consistent design
- Loading states and skeleton screens
- Toast notifications with Sonner
- Smooth animations with Motion
- Progress indicator with NextJS TopLoader

### 🧪 Testing

- End-to-end testing with Cypress
- Test coverage for authentication flow
- Dashboard and route protection tests
- Transaction management tests

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.5.4 (App Router)
- **UI Library**: React 19.1.0
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4
- **Components**: Shadcn UI + Radix UI
- **Charts**: Recharts 2.15.4
- **Icons**: Lucide React + React Icons
- **Forms**: React Hook Form (via tRPC)
- **Validation**: Zod 4.1.11

### Backend

- **API**: tRPC 11.7.0
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM 0.44.6
- **Authentication**: Better Auth 1.3.26
- **Email**: Resend 6.1.2
- **Date Utils**: date-fns 4.1.0

### Development Tools

- **Package Manager**: pnpm
- **Linting**: ESLint 9
- **Testing**: Cypress 15.5.0
- **Database Tool**: Drizzle Kit 0.31.5
- **Type Safety**: Full TypeScript coverage

## 📋 Prerequisites

- Node.js 20.x or higher
- pnpm (recommended) or npm
- PostgreSQL database (Neon recommended)
- Email service account (Resend)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/halilibrahimcelik/finance-tracker-app.git
cd finance-tracker-app
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=your_postgresql_connection_string

# Better Auth
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=your_resend_api_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set up the database

Generate and run migrations:

```bash
# Generate migration files
pnpm db:generate

# Push schema to database
pnpm db:push

# (Optional) Seed the database with sample data
pnpm db:seed
```

### 5. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

| Script             | Description                             |
| ------------------ | --------------------------------------- |
| `pnpm dev`         | Start development server with Turbopack |
| `pnpm build`       | Build production bundle                 |
| `pnpm start`       | Start production server                 |
| `pnpm lint`        | Run ESLint                              |
| `pnpm db:generate` | Generate Drizzle migrations             |
| `pnpm db:push`     | Push schema changes to database         |
| `pnpm db:migrate`  | Run migrations                          |
| `pnpm db:studio`   | Open Drizzle Studio (database GUI)      |
| `pnpm db:seed`     | Seed database with sample data          |
| `pnpm cy:open`     | Open Cypress test runner                |

## 🗂️ Project Structure

```
finance-tracker/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── api/               # API routes
│   │   └── actions/           # Server actions
│   ├── components/            # React components
│   │   ├── auth/              # Authentication components
│   │   ├── dashboard/         # Dashboard components
│   │   ├── features/          # Feature components
│   │   ├── layout/            # Layout components
│   │   └── ui/                # Shadcn UI components
│   ├── db/                    # Database
│   │   ├── schema.ts          # Drizzle schema
│   │   ├── migrations/        # Migration files
│   │   └── seed.ts            # Seed script
│   ├── lib/                   # Utility libraries
│   │   ├── auth/              # Auth configuration
│   │   └── trpc/              # tRPC client/server setup
│   ├── server/                # Server-side code
│   │   └── routers/           # tRPC routers
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript types
│   ├── constants/             # App constants
│   └── middleware.ts          # Next.js middleware
├── cypress/                   # E2E tests
├── public/                    # Static assets
├── migrations/                # Database migrations
└── ...config files
```

## 🎨 Key Features in Detail

### Transaction Categories

The app supports 9 transaction categories:

- **Expense**: Leisure, Food, Transport, Utilities, Health
- **Income**: Salary, Freelance, Investments
- **Both**: Others

### Dashboard Analytics

1. **Summary Cards**: Total income, total expense, and net balance
2. **Pie Chart**: Visual breakdown of income vs expenses with customizable date range
3. **Bar Chart**: Monthly flow showing 12-month trends
4. **Category Distribution**: Transactions grouped by category with toggle for income/expense

### Data Management

- **Real-time Updates**: All charts and tables update immediately after CRUD operations
- **Date Filtering**: Custom date range selection for all analytics
- **Sorting & Pagination**: Efficient data handling for large transaction lists
- **Responsive Design**: Optimized for mobile, tablet, and desktop

## 🧪 Testing

Run Cypress tests:

```bash
# Open Cypress Test Runner
pnpm cy:open

# Run tests in headless mode
pnpm cypress run
```

Test coverage includes:

- User signup and authentication flow
- Dashboard access and data display
- Route protection
- Transaction CRUD operations

## 🔒 Security Features

- Secure session management
- Password hashing with Better Auth
- CSRF protection
- SQL injection prevention with Drizzle ORM
- Type-safe API with tRPC
- Protected API routes

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- AWS
- DigitalOcean

Ensure your environment variables are properly configured.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Halil Ibrahim Celik**

- GitHub: [@halilibrahimcelik](https://github.com/halilibrahimcelik)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Shadcn UI](https://ui.shadcn.com/) - Beautiful UI components
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Better Auth](https://www.better-auth.com/) - Authentication solution
- [Recharts](https://recharts.org/) - Data visualization

## 📧 Support

For support, email or open an issue in the GitHub repository.

---

Built with ❤️ using Next.js and TypeScript
