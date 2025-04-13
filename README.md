# AI Search Modal

AI Search Modal is a full-stack application that allows users to upload documents and perform AI-powered searches on them. The application uses React for the frontend and Node.js with Express for the backend.

## Features

- **Document Upload**: Upload `.txt` and `.pdf` files for indexing.
- **AI-Powered Search**: Perform semantic searches using OpenAI embeddings.
- **GitHub Authentication**: Login with GitHub for secure access.
- **Material-UI**: Modern and responsive UI components.

## Project Structure

```
ai-search-modal/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API service layer
│   │   ├── types/           # TypeScript type definitions
│   │   ├── App.tsx          # Main React app
│   │   └── index.tsx        # React entry point
│   ├── public/              # Static files (index.html, manifest.json)
│   └── package.json         # Client dependencies and scripts
├── server/                  # Express backend
│   ├── src/
│   │   ├── services/        # Backend services
│   │   ├── loaders/         # Document loaders
│   │   └── app.ts           # Main Express app
│   ├── package.json         # Server dependencies and scripts
├── package.json             # Root package.json for workspaces
└── README.md                # Project documentation
```

## Prerequisites

- **Node.js**: Version 18 or later
- **npm**: Version 7 or later
- **OpenAI API Key**: Required for AI-powered search

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ai-search-modal.git
   cd ai-search-modal
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the `server` directory with the following content:

   ```plaintext
   OPENAI_API_KEY=your_openai_api_key
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GITHUB_CALLBACK_URL=http://localhost:3001/auth/github/callback
   ```

4. Start the development servers:

   ```bash
   npm run dev
   ```

   - The frontend will run on `http://localhost:3000`
   - The backend will run on `http://localhost:3001`

## Usage

1. **Upload Documents**:
   - Navigate to the homepage.
   - Use the "Upload Documents" button to upload `.txt` or `.pdf` files.

2. **Search**:
   - Click the "Search" button in the navigation bar.
   - Enter your query in the search modal to get AI-powered results.

3. **Login with GitHub**:
   - Click the "Login with GitHub" button to authenticate.

## Scripts

- **`npm run dev`**: Starts both the client and server in development mode.
- **`npm run build`**: Builds the client and server for production.
- **`npm run start`**: Starts the server in production mode.

## Technologies Used

- **Frontend**:
  - React
  - TypeScript
  - Material-UI
  - Axios

- **Backend**:
  - Node.js
  - Express
  - OpenAI API
  - Passport.js (GitHub Authentication)

## Troubleshooting

### OpenSSL Error

If you encounter an OpenSSL error, use the following command to start the development server:

```bash
set NODE_OPTIONS=--openssl-legacy-provider && npm run dev
```

### Missing Files

Ensure the following files exist:
- `client/public/index.html`
- `client/src/index.tsx`
- `client/src/App.tsx`

### Dependencies

Run the following commands to ensure all dependencies are installed:

```bash
cd client
npm install
cd ../server
npm install
```

## License

This project is licensed under the MIT License.