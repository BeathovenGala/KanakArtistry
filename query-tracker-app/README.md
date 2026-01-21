# Query Tracker App

## Overview
The Query Tracker App is a web application designed to manage and track user queries and visitor statistics. It provides functionalities for storing queries, tracking visitor data, and sending daily email reports regarding new queries received.

## Features
- **Query Management**: Add, retrieve, and manage user queries.
- **Visitor Tracking**: Log visitor statistics and track unique visits.
- **Daily Reports**: Automatically send email reports at 6 AM summarizing new queries received the previous day.

## Project Structure
```
query-tracker-app
├── src
│   ├── app.ts                  # Entry point of the application
│   ├── config
│   │   ├── database.ts         # Database connection configuration
│   │   └── email.ts            # Email service configuration
│   ├── controllers
│   │   ├── queryController.ts   # Controller for query operations
│   │   └── visitorController.ts  # Controller for visitor statistics
│   ├── models
│   │   ├── Query.ts            # Query model definition
│   │   ├── Visitor.ts          # Visitor model definition
│   │   └── DailyReport.ts      # Daily report model definition
│   ├── routes
│   │   ├── queryRoutes.ts      # Routes for query-related operations
│   │   └── visitorRoutes.ts    # Routes for visitor-related operations
│   ├── services
│   │   ├── queryService.ts     # Business logic for managing queries
│   │   ├── visitorService.ts    # Business logic for managing visitors
│   │   ├── emailService.ts      # Service for sending emails
│   │   └── schedulerService.ts  # Service for scheduling tasks
│   ├── utils
│   │   └── logger.ts           # Logger utility
│   └── types
│       └── index.ts            # TypeScript types and interfaces
├── scripts
│   └── seedDatabase.ts         # Script to seed the database
├── .env.example                 # Example environment variables
├── package.json                 # npm configuration file
├── tsconfig.json               # TypeScript configuration file
└── README.md                   # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd query-tracker-app
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Configure environment variables by copying `.env.example` to `.env` and filling in the required values.

## Usage
To start the application, run:
```
npm start
```

## License
This project is licensed under the MIT License.