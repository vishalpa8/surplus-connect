# 🍽️ SurplusConnect

**Turning Food Waste into Community Impact**

SurplusConnect is a modern web platform that bridges the gap between food waste and food insecurity by connecting food vendors, consumers, and NGOs. Built with Next.js 14, TypeScript, and Tailwind CSS, it provides a seamless experience for rescuing surplus food and building stronger communities.

![SurplusConnect Banner](https://via.placeholder.com/1200x400/74b366/ffffff?text=SurplusConnect+-+Fighting+Food+Waste)

## 🌟 Features

### 🏪 **For Vendors**
- **Surplus Food Listings**: Easy-to-use interface for listing surplus food items
- **Inventory Management**: Real-time inventory tracking and updates
- **Analytics Dashboard**: Insights into sales, waste reduction, and customer engagement
- **Customer Communication**: Built-in messaging system for pickup coordination
- **Revenue Recovery**: Turn waste into revenue with discounted pricing

### 🛒 **For Consumers**
- **Food Discovery**: Browse available surplus food in your area
- **Smart Search & Filters**: Find exactly what you need with advanced filtering
- **Reservation System**: Reserve items for pickup with flexible scheduling
- **Savings Tracking**: Monitor your savings and environmental impact
- **Mobile-Friendly**: Responsive design for shopping on the go

### 🤝 **For NGOs**
- **Food Rescue Operations**: Streamlined process for claiming surplus food donations
- **Volunteer Management**: Tools for coordinating pickup and distribution
- **Impact Reporting**: Track meals rescued and community impact
- **Priority Access**: Special access to food donations for verified organizations
- **Grant Reporting**: Assistance with impact reporting for funding applications

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Unstyled, accessible UI components
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Elegant notifications

### **UI/UX**
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG compliant components
- **Modern Design System** - Consistent styling and components
- **Interactive Maps** - Leaflet integration for location services
- **Smooth Animations** - Enhanced user experience

### **Development Tools**
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **Tailwind Forms** - Enhanced form styling
- **Sharp** - Image optimization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/surplus-connect.git
   cd surplus-connect
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   # Add other required environment variables
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
surplus-connect/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (static)/          # Static pages group
│   │   ├── about/             # About page
│   │   ├── auth/              # Authentication pages
│   │   │   ├── demo/          # Demo authentication
│   │   │   ├── login/         # Login page
│   │   │   └── register/      # Registration page
│   │   ├── dashboard/         # Dashboard pages
│   │   │   ├── ngo/          # NGO-specific dashboard
│   │   │   └── vendor/       # Vendor-specific dashboard
│   │   ├── listings/          # Food listings page
│   │   ├── ngos/             # NGO landing page
│   │   ├── pricing/          # Pricing page
│   │   ├── vendors/          # Vendor landing page
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/            # Reusable components
│   │   ├── auth/             # Authentication components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── landing/          # Landing page components
│   │   ├── layout/           # Layout components
│   │   ├── providers/        # Context providers
│   │   └── ui/               # UI components
│   ├── context/              # React contexts
│   ├── hooks/                # Custom React hooks
│   ├── services/             # API services
│   ├── utils/                # Utility functions
│   └── middleware.ts         # Next.js middleware\n├── public/                   # Static assets\n│   └── images/              # Image assets\n├── tailwind.config.mjs      # Tailwind configuration\n├── tsconfig.json           # TypeScript configuration\n└── next.config.js          # Next.js configuration\n```\n\n## 🎨 Design System\n\n### **Color Palette**\n- **Primary**: Green tones (#74b366) - Representing sustainability and growth\n- **Secondary**: Orange tones (#ff5a1f) - Representing energy and community\n- **Accent**: Cream (#f8f7f4) - Warm, welcoming background\n- **Semantic**: Success, warning, error colors for user feedback\n\n### **Typography**\n- **Display Font**: Poppins - For headings and important text\n- **Body Font**: Nunito - For readable body text\n- **Responsive Scaling**: Fluid typography across all devices\n\n### **Components**\n- **Consistent Styling**: Unified design language across all components\n- **Accessibility**: ARIA labels, keyboard navigation, screen reader support\n- **Responsive**: Mobile-first design with breakpoint optimization\n\n## 🔐 Authentication System\n\n### **Multi-Role Support**\n- **Consumer**: Individual users looking for surplus food\n- **Vendor**: Businesses listing surplus food\n- **NGO**: Non-profit organizations rescuing food\n\n### **Features**\n- **Role-based Registration**: Tailored signup flows for each user type\n- **Smart Redirects**: Automatic routing to appropriate dashboards\n- **Session Management**: Secure authentication with persistent sessions\n- **Demo Accounts**: Pre-configured accounts for testing\n\n### **Security**\n- **Route Protection**: Middleware-based access control\n- **Role Validation**: Server-side role verification\n- **Session Security**: Secure cookie-based authentication\n\n## 📱 Key Pages\n\n### **Landing Pages**\n- **Home** (`/`) - Main landing page with hero, features, stats, and testimonials\n- **For Vendors** (`/vendors`) - Vendor-focused landing page\n- **For NGOs** (`/ngos`) - NGO-focused landing page\n- **About** (`/about`) - Comprehensive company story and team information\n- **Pricing** (`/pricing`) - Transparent pricing for all user types\n\n### **Authentication**\n- **Login** (`/auth/login`) - User authentication with demo accounts\n- **Register** (`/auth/register`) - Multi-step registration with role selection\n- **Demo** (`/auth/demo`) - Authentication system demonstration\n\n### **Application**\n- **Listings** (`/listings`) - Browse available surplus food\n- **Dashboard** (`/dashboard`) - Role-specific user dashboards\n- **Profile** (`/profile`) - User profile management\n\n## 🌍 Environmental Impact\n\n### **Mission**\nSurplusConnect addresses the paradox of food waste existing alongside food insecurity. Our platform enables:\n\n- **Food Waste Reduction**: Diverting surplus food from landfills\n- **Community Support**: Connecting food with those who need it\n- **Economic Opportunity**: Helping businesses recover costs from surplus\n- **Environmental Sustainability**: Reducing the carbon footprint of food waste\n\n### **Impact Metrics**\n- 50,000+ meals rescued\n- 2,500+ lbs of food waste prevented\n- $125K+ saved by consumers\n- $85K+ revenue recovered by vendors\n\n## 🤝 Contributing\n\nWe welcome contributions to SurplusConnect! Please read our contributing guidelines before submitting pull requests.\n\n### **Development Workflow**\n1. Fork the repository\n2. Create a feature branch\n3. Make your changes\n4. Add tests if applicable\n5. Submit a pull request\n\n### **Code Standards**\n- Follow TypeScript best practices\n- Use ESLint configuration\n- Maintain consistent code formatting\n- Write meaningful commit messages\n\n## 📄 License\n\nThis project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.\n\n## 🙏 Acknowledgments\n\n- **Next.js Team** - For the amazing React framework\n- **Tailwind CSS** - For the utility-first CSS framework\n- **Vercel** - For hosting and deployment platform\n- **Open Source Community** - For the incredible tools and libraries\n\n## 📞 Contact\n\n- **Website**: [surplusconnect.com](https://surplusconnect.com)\n- **Email**: hello@surplusconnect.com\n- **GitHub**: [github.com/surplus-connect](https://github.com/surplus-connect)\n\n---\n\n**Built with ❤️ for a more sustainable future**\n\n*SurplusConnect - Where good food finds good homes*"