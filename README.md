# Alankrit Aggarwal — Creative AI Designer & Developer Portfolio

A modern, high-performance developer portfolio showcasing AI motion reels, full-stack web applications, UI/UX designs, and creative visual experiences.

![Portfolio Banner](/frontend/public/3d_portfolio.PNG)

---

## 🌟 Key Features

- 🎬 **AI Video Reels Showcase**: Interactive vertical 9:16 multi-clip video player featuring AI-generated shorts created with Kling AI, Flow, and ChatGPT prompt engineering.
- 🎨 **Sleek Modern UI/UX**: Built with dark mode aesthetics, glassmorphism, dynamic particle backgrounds, and subtle micro-animations.
- ⚡ **Dynamic Project Highlights**: Detailed project breakdowns featuring custom technology badges, interactive feature cards, and visual workflow pipelines.
- 📱 **Fully Responsive Layout**: Mobile-first design with smooth section scrolling and an active section scroll spy navigation header.
- ✉️ **Contact Form**: Direct contact integration with backend processing.

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: React.js
- **Styling**: Tailwind CSS & Vanilla CSS
- **Icons & UI**: Radix UI Primitives, Lucide React
- **State & Routing**: React Router DOM v6

### **Backend**
- **Framework**: Python FastAPI
- **Server**: Uvicorn ASGI Server
- **Database / Services**: Python Services Architecture

### **AI & Motion Design**
- **AI Video Models**: Kling AI, Flow
- **Prompt Engineering**: ChatGPT
- **Post-Production**: Adobe Premiere Pro

---

## 📁 Repository Structure

```text
LatestPortfolio/
├── frontend/
│   ├── public/
│   │   ├── Videos/          # 9:16 Vertical AI Reels (.mp4)
│   │   └── ...              # Images, icons & static assets
│   ├── src/
│   │   ├── components/      # React section components (Hero, About, Projects, Experience, ProjectDetail, etc.)
│   │   ├── contexts/        # Theme & App contexts
│   │   ├── utils/           # Portfolio mock data & project definitions
│   │   ├── App.js           # App router & layout entry point
│   │   └── index.css        # Global CSS & Tailwind styling
│   └── package.json
│
├── backend/
│   ├── database/            # Database configurations
│   ├── models/              # Data schemas & models
│   ├── services/            # API business logic
│   ├── server.py            # FastAPI main entry point
│   └── requirements.txt
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v16+
- **Python**: 3.10+
- **npm** or **yarn**

---

### Installation & Local Setup

#### 1. Clone the repository
```bash
git clone https://github.com/codewithalankrit/LatestPortfolio.git
cd LatestPortfolio
```

#### 2. Run the Frontend
```bash
cd frontend
npm install
npm start
```
The application will launch locally at `http://localhost:3000`.

#### 3. Run the Backend (Optional for local API features)
```bash
cd ../backend
pip install -r requirements.txt
python -m uvicorn server:app --port 8000 --reload
```

---

## 📬 Contact & Links

- **Portfolio**: [Alankrit Aggarwal Portfolio](https://github.com/codewithalankrit/LatestPortfolio)
- **GitHub**: [@codewithalankrit](https://github.com/codewithalankrit)

---

Developed with ❤️ by **Alankrit Aggarwal**.
