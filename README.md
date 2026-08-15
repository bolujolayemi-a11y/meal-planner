# 🥘 Pantry Guide

### Your Intelligent Kitchen Assistant

🔗 **Live Demo:** https://my-pantry-guide.vercel.app/

## 🌍 Overview

**Pantry Guide** is a smart meal discovery platform that helps users answer one everyday question:

> _“What can I cook with what I already have?”_

Unlike generic recipe apps, Pantry Guide is tailored for **Nigerian kitchens**, intelligently mapping local ingredients and suggesting both **authentic Nigerian meals** and **global recipes** in seconds.

## 🚀 Why This Project Stands Out

Most pantry apps focus on Western ingredients. Pantry Guide is different:

- 🇳🇬 Built around **Nigerian food culture**
- 🧠 Handles **ingredient variations and local naming**
- 🌍 Combines **local + global recipes in one system**
- 📱 Designed for **real everyday use on mobile**

## ✨ Core Features

### 🧺 Smart Pantry Mapping

Add the ingredients you have, and Pantry Guide intelligently matches them to recipes.
It understands local variations like:

- _Garri → Eba_
- _Cassava → Fufu_

### 🍲 Authentic Nigerian Recipes

Access a curated collection of local dishes such as:

- Jollof Rice
- Ayamase
- Fisherman Soup

Each recipe includes:

- Step-by-step instructions
- Nutritional information
- Serving size guidance

### 🌐 Global Recipe Integration

When local matches are limited, the app expands your options using the **TheMealDB API**, giving you access to a wide range of international meals.

### 🌍 Multilingual Support

Pantry Guide is accessible to a broader audience with support for:

- English
- Spanish
- Hindi
- French
- Korean

### 📱 Mobile-First Experience

Designed with a responsive, app-like interface:

- Smooth navigation
- Optimized layouts
- QR code sharing for quick mobile access

### ❤️ Personal Collections

Users can:

- Save favorite recipes
- Track cooked meals

Data is persisted using **CockroachDB** and local storage for a seamless experience.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **Backend:** Vercel Serverless Functions
- **Database:** CockroachDB
- **External API:** TheMealDB
- **State Management:** React Hooks
- **Deployment:** Vercel

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pantry-guide.git
cd meal_planner_app
```

### 2. Install Frontend Dependencies

```bash
cd meal-planner
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the frontend root directory and add:

```env
VITE_API_URL=
```

For Vercel deployment, set the following environment variables in your Vercel project settings:

```env
DATABASE_URL=your_cockroachdb_connection_string
DATABASE_SSL=true
```

### 4. Set up CockroachDB

Run the schema.sql file in your CockroachDB instance:

```bash
# From the api directory
cockroach sql < schema.sql
```

### 5. Deploy to Vercel

Install Vercel CLI and deploy:

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### 6. Local Development

For local development with serverless functions:

```bash
# Install Vercel CLI
npm install -g vercel

# Start local development environment
vercel dev
```

This will run both the frontend and serverless functions locally.

### 7. Production Build

```bash
npm run build
```

## 📲 Mobile Access

Pantry Guide includes a built-in **QR code sharing feature**.
Simply scan the generated code to open the app instantly on your mobile device.

## 🎯 Future Improvements

- AI-powered meal planning
- Budget-based recipe suggestions (₦-focused)
- Ingredient image recognition
- Expiry tracking & smart alerts

Coded with 🧡 by Jolayemi Boluwatife

## 📌 Final Note

Pantry Guide is more than a recipe app—it's a step toward building **locally relevant, intelligent digital tools** for everyday life.
