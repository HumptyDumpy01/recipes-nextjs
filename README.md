# Recipe App Frontend

This is a frontend application built with TypeScript, and Next.js for browsing and exploring recipes. It
interacts with a backend API to fetch recipe data.

## Getting Started

Follow these steps to set up and run the application:

### Prerequisites

* Node.js (version 18 or later recommended)
* npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>
   cd <your-frontend-directory>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

### Backend Setup

Before running the frontend, ensure the backend API is running. Follow the instructions in the `backend/README.md` file
to set up and run the backend.

**Note:** The backend should be running on `http://localhost:3005` by default.

### Environment Variables

1. Create a `.env` file in the root of your project.
2. Add the following environment variable to the `.env` file:

   ```
   NEXT_PUBLIC_BACKEND_URL=http://localhost:3005
   ```

   This variable tells the frontend where to find the backend API. If you're running the backend on a different port or
   host, adjust the URL accordingly.

### Running the Application

1. Start the development server:

   ```bash
   npm run build
   npm run start
   ```

2. Open your browser and navigate to `http://localhost:3000` (or the port specified by Next.js).