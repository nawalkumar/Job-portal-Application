# 🚀 AI-Powered Talent Match & Job Retrieval System

A **high-performance, full-stack recruitment platform** that leverages **local neural embeddings, semantic vector search, and asynchronous system design** to match candidate resumes with job listings based on **contextual understanding**, not just keywords.

---

## 🧠 🔥 Why This Project Stands Out

Traditional job portals rely on **keyword matching**, which fails to capture meaning.

👉 This system uses:
- **Transformer-based embeddings**
- **Vector similarity search**
- **Efficient system-level optimizations**

to deliver **context-aware job recommendations** at scale.

---

## ⚡ Key Features 

### 🧠 Local Inference Engine
- Uses **MiniLM-L6-v2 (384-dim embeddings)** via Transformers.js
- Runs **fully locally** using ONNX Runtime  
- ❌ No external API calls → ✅ Low latency + zero cost

---

### 🔍 Semantic Vector Search
- Implemented using **MongoDB Atlas Vector Search**
- Uses **HNSW (Hierarchical Navigable Small World)** indexing- working
- Enables **fast approximate nearest neighbor (ANN)** search- working

---

### ⚙️ Decoupled Async Architecture
- Uses **node-cron** for scheduled background jobs
- Separates:
  - I/O-bound tasks (API fetching)
  - CPU-bound tasks (embedding generation)
  
👉 Improves scalability and system stability

---

### 🧩 Context-Aware Chunking
- Handles large resumes using:
  - **512-token windowing**
  - Recursive text splitting
  
👉 Works within transformer positional limits while preserving semantic context

---

## 🏗 System Architecture
```
External APIs (Jooble / Adzuna)
↓
[Ingestion Layer]
(node-cron every 6 hrs)
↓
[Data Cleaning Layer]
(HTML sanitization + regex)
↓
[Embedding Engine]
(MiniLM + ONNX Runtime)
↓
[Vector Database]
(MongoDB Atlas)
↓
[Matching Engine]
(Cosine Similarity)
↓
[REST API Layer]
↓
Frontend
```


---

## 🔄 Workflow

### 1. 📥 Data Ingestion
- Jobs fetched every **6 hours** from external APIs

### 2. 🧠 Vectorization
- Background worker:
  - Detects new jobs
  - Generates embeddings (384-dim vectors)

### 3. 🔍 Semantic Matching
- Resume → embedding
- Compared with job vectors using **cosine similarity**

### 4. 📊 Retrieval
- Jobs ranked based on similarity score
- Returned via REST API

---

## 🛠 Tech Stack

### 💻 Frontend
- React.js  
- Redux Toolkit  
- Tailwind CSS  
- Shadcn/UI  

### ⚙️ Backend
- Node.js  
- Express.js  

### 🗄 Database
- MongoDB Atlas (Vector Search)

### 🧠 Machine Learning
- Transformers.js  
- ONNX Runtime  
- MiniLM-L6-v2  

### 🔄 Automation
- Node-Cron  
- Axios  
- Jooble & Adzuna APIs  

---

## 📈 Performance & Optimizations

### 🧠 Memory Management
- Batch processing (20 jobs per cycle)
- Prevents memory overflow during ONNX inference

---

### ⚡ Latency Optimization
- Local embeddings → no API calls
- Vector search → sub-linear retrieval (HNSW)

---

### 🧹 Data Integrity
- HTML sanitization
- Regex-based cleaning

👉 Ensures high-quality embeddings (less noise)

---

## 🚦 Getting Started

### ✅ Prerequisites
- Node.js v18+
- MongoDB Atlas (Vector Search enabled)

---

### 📦 Installation

```bash
git clone https://github.com/nawalkumar/Job-portal-Application.git
cd Job-portal-Application
```

## ⚙️ Environment Setup

Create .env file:
```
  PORT=5001
  MONGO_URI=your_mongodb_uri
  JWT_SECRET=your_secret
  ADZUNA_APP_ID=your_id
  ADZUNA_APP_KEY=your_key
  JOOBLE_KEY=your_key
```
📥 Install Dependencies
# Backend
    npm install
    
# Frontend
    cd frontend
    npm install
▶️ Run Application
# Starts backend + cron jobs
npm run dev- both for frontend and Backend

# working on:
- Uses **HNSW (Hierarchical Navigable Small World)** indexing
- Enables **fast approximate nearest neighbor (ANN)** search

Author:

    Naval Kumar,
    NIT Sikkim exchange student
    @IIT Hyderabad Final Year
