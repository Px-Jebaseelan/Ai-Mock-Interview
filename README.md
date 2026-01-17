# AI Mock Interview

A sophisticated AI-powered mock interview platform designed to help job candidates prepare for technical and behavioral interviews. The application leverages cutting-edge AI technologies to provide realistic interview scenarios, intelligent feedback, and comprehensive performance analysis.

## 🎯 Features

- **AI-Powered Interview Generation**: Automatically generates tailored interview questions based on job descriptions and experience levels
- **Real-time Interview Simulation**: Experience realistic mock interviews with AI interactions
- **Intelligent Feedback**: Get AI-generated feedback on responses with detailed analysis
- **Resume Analysis**: Upload and analyze resumes for interview preparation
- **Job Info Management**: Create and manage multiple job profiles for targeted interview preparation
- **Question Bank**: Access a comprehensive database of interview questions organized by difficulty
- **User Authentication**: Secure authentication with Clerk
- **Responsive Design**: Beautiful, responsive UI built with modern React components

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.4.2 (Turbopack)
- **UI Library**: React 19+
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Form Management**: React Hook Form
- **Language**: TypeScript

### Backend
- **Runtime**: Node.js
- **API**: Next.js Server Actions
- **Database**: PostgreSQL (Supabase)
- **ORM**: Drizzle ORM
- **Authentication**: Clerk

### AI & APIs
- **LLM**: Google Gemini API
- **Emotional Intelligence**: Hume AI
- **Rate Limiting**: Arcjet

## 📋 Prerequisites

- Node.js 18+ or higher
- npm or yarn package manager
- PostgreSQL database (or Supabase account)
- Clerk account for authentication
- Google Gemini API key
- Hume AI API credentials

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Guru-Surya-Raja-J/AI_Mock_Interview.git
   cd AI_Mock_Interview
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the project root with the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@host:port/database"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/onboarding
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/onboarding

   # AI APIs
   GEMINI_API_KEY=your_gemini_api_key
   HUME_API_KEY=your_hume_api_key
   HUME_SECRET_KEY=your_hume_secret_key
   NEXT_PUBLIC_HUME_CONFIG_ID=your_hume_config_id

   # Security
   ARCJET_KEY=your_arcjet_key
   ```

4. **Set up the database**
   ```bash
   npm run db:migrate
   ```

## 💻 Running the Project

### Development Mode
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm run start
```

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── ai/                   # AI-related endpoints
│   │   └── webhooks/             # Webhook handlers
│   ├── app/                      # Main application pages
│   │   ├── job-infos/            # Job profile management
│   │   └── upgrade/              # Upgrade page
│   ├── onboarding/               # User onboarding flow
│   ├── sign-in/                  # Authentication pages
│   └── sign-up/
├── components/                   # Reusable React components
│   ├── ui/                       # Shadcn/ui components
│   └── custom components
├── features/                     # Feature modules
│   ├── interviews/               # Interview management
│   ├── jobInfos/                 # Job profile features
│   ├── questions/                # Question management
│   ├── users/                    # User management
│   └── resumeAnalyses/          # Resume analysis
├── services/                     # External service integrations
│   ├── ai/                       # AI service integration
│   ├── clerk/                    # Clerk authentication
│   └── hume/                     # Hume AI integration
├── drizzle/                      # Database schema and migrations
│   ├── schema/                   # Drizzle schema definitions
│   └── migrations/               # Database migrations
├── lib/                          # Utility functions
└── data/                         # Data and environment configs
```

## 🔐 Authentication

The application uses Clerk for secure user authentication. Users can:
- Sign up with email
- Sign in with existing credentials
- Manage their profile
- Authenticate with OAuth providers

## 🗄️ Database Schema

- **users**: User profiles and account information
- **job_info**: Job profiles for interview preparation
- **interviews**: Interview session records
- **questions**: Interview questions database

## 🤖 AI Features

### Interview Generation
- Generates contextual interview questions based on job descriptions
- Adapts difficulty levels to user experience
- Provides realistic scenario-based questions

### Resume Analysis
- Analyzes uploaded resumes
- Identifies key skills and experiences
- Provides interview preparation recommendations

### Feedback & Analysis
- Provides detailed feedback on interview responses
- Analyzes emotional intelligence using Hume AI
- Generates improvement suggestions

## 📊 Available Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack

# Building
npm run build           # Build for production
npm run start          # Start production server

# Database
npm run db:migrate     # Run database migrations
npm run db:generate    # Generate Drizzle schema

# Linting
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
```

## 🔄 Workflow

1. **Sign Up/Sign In**: Users authenticate via Clerk
2. **Onboarding**: New users sync their profile information
3. **Create Job Profile**: Users enter job details and requirements
4. **Generate Questions**: AI generates interview questions
5. **Mock Interview**: Users participate in guided interview sessions
6. **Get Feedback**: AI analyzes responses and provides feedback
7. **Track Progress**: Users can review past interviews and improvements

## 🚨 Error Handling

The application includes comprehensive error handling:
- Database query error logging
- Server action error management
- User-friendly error messages
- Automatic error recovery

## 🔒 Security

- **Authentication**: Clerk-managed user authentication
- **Environment Variables**: Sensitive data stored in `.env.local`
- **Database**: Secure PostgreSQL connection with Supabase
- **Rate Limiting**: Arcjet integration for API rate limiting
- **Server Actions**: Secure server-side execution of critical operations

## 📝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Guru Surya Raja J**

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Drizzle ORM](https://orm.drizzle.team/) - Type-safe ORM
- [Clerk](https://clerk.com/) - Authentication
- [Google Gemini](https://ai.google.dev/) - AI API
- [Hume AI](https://www.hume.ai/) - Emotional intelligence API
- [Shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## 📞 Support

For support, email support@aimockinterview.com or open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Mobile app support
- [ ] Video interview capability
- [ ] AI-powered interviewer
- [ ] Performance analytics dashboard
- [ ] Interview recording and playback
- [ ] Community question sharing
- [ ] Integration with job boards
- [ ] Multi-language support

---

**Last Updated**: January 2026  
**Version**: 1.0.0  
**Status**: In Development
