const projects = [
  {
    id: 1,
    title: "SpiceSpark",
    description: "A full-stack recipe app with cart, auth, and payments.", // ← Short description for card
    readme: `# Recipe App

A comprehensive full-stack recipe application built with modern web technologies. This platform provides a complete cooking experience with user authentication, secure payment processing, and an intuitive admin dashboard.

## 🚀 Features

- **User Authentication**: Secure login/signup google and email/password authentication
- **Shopping Cart**: Add, remove, and manage recipe ingredients in a cart
- **Payment Integration**: Stripe payment processing
- **Product Management**: Dynamic recipe listings with admin control
- **Order Tracking**: Real-time RECEIPT generation and recipe recommendations
- **Admin Dashboard**: Complete backend management system
- **Responsive Design**: Mobile-first approach with modern UI

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, Styled Components
- **Backend**: Node.js, firebase-admin
- **Authentication**: JWT, bcrypt
- **Payments**: Stripe API
- **Deployment**: Docker, AWS

## 📦 Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/timothyasuke-prog/SpiceSpark

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
\`\`\`

## 🔗 Links

- **Live Demo**: [View Live](https://spicespark.onrender.com)
- **GitHub**: [Source Code](https://github.com/timothyasuke-prog/SpiceSpark)
`, // ← Detailed readme for modal
    techStack: ["HTML", "Node.js", "Firebase", "Stripe"],
    liveUrl: "https://spicespark.onrender.com",
    githubUrl: "https://github.com/timothyasuke-prog/SpiceSpark",
    featured: true,
    image: "",
  },
 
module.exports = projects;