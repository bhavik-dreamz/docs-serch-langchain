# README.md

# Document Search AI

Document Search AI is a TypeScript application that leverages OpenAI's capabilities to search and retrieve information from various document formats, including PDFs. This project is designed to facilitate efficient document management and retrieval through advanced AI-driven search functionalities.

## Features

- Load and process documents from specified directories.
- Support for PDF document loading and processing.
- Manage document vectors for enhanced search capabilities.
- Interact with OpenAI API for generating responses based on document content.
- Comprehensive search functionality to find relevant information quickly.

## Project Structure

```
doc-search-ai
├── src
│   ├── config
│   │   └── env.ts
│   ├── loaders
│   │   ├── documentLoader.ts
│   │   └── pdfLoader.ts
│   ├── models
│   │   └── vectorStore.ts
│   ├── services
│   │   ├── openaiService.ts
│   │   └── searchService.ts
│   ├── types
│   │   └── index.ts
│   ├── utils
│   │   └── textProcessing.ts
│   └── app.ts
├── docs
│   └── sample
├── tests
│   └── search.test.ts
├── .env
├── package.json
└── tsconfig.json
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/doc-search-ai.git
   ```

2. Navigate to the project directory:
   ```
   cd doc-search-ai
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up your environment variables in the `.env` file.

## Usage

To start the application, run:
```
npm start
```

## Running Tests

To run the unit tests, use:
```
npm test
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.