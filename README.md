
# Expense Tracker

A full-stack Expense Tracker application developed using Java Spring Boot, React.js, and PostgreSQL. This application helps users manage daily expenses, monitor monthly spending, and visualize expenses through category-wise charts.

## Features

- Add new expenses
- Edit existing expenses
- Delete expenses
- View total expenses
- View monthly expenses
- View total transaction count
- Category-wise spending visualization
- Search expenses by title
- Filter expenses by category
- Filter expenses by date range
- Real-time dashboard updates
- PostgreSQL database integration

## Technology Stack

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- REST APIs

### Frontend
- React.js
- Vite
- JavaScript
- Axios
- Recharts
- Lucide React
- CSS

### Database
- PostgreSQL

### Development Tools
- IntelliJ IDEA
- Visual Studio Code
- Postman
- Git and GitHub

## Project Structure

```text
expense-tracker/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── services/
│   │   │   └── expenseService.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/expensetracker/expense_tracker/
│       │       ├── controller/
│       │       ├── exception/
│       │       ├── model/
│       │       ├── repository/
│       │       └── service/
│       │
│       └── resources/
│           └── application.properties
│
├── pom.xml
├── .gitignore
└── README.md
```

## Backend API Endpoints

Base URL: `http://localhost:8080/api/expenses`

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Retrieve all expenses |
| POST | `/` | Add a new expense |
| GET | `/{id}` | Retrieve expense by ID |
| PUT | `/{id}` | Update an expense |
| DELETE | `/{id}` | Delete an expense |
| GET | `/total` | Calculate total expenses |
| GET | `/monthly` | Calculate monthly expenses |
| GET | `/category-summary` | Get category-wise summary |
| GET | `/category/{category}` | Filter by category |
| GET | `/filter` | Filter by date range |

## Installation and Setup

### Prerequisites

- Java JDK
- Node.js and npm
- PostgreSQL
- IntelliJ IDEA or another Java IDE

### 1. Clone the Repository

```bash
git clone https://github.com/23012238/expense-tracker.git
cd expense-tracker
```

### 2. Configure the Database

Create a PostgreSQL database and configure the connection in:

`src/main/resources/application.properties`

Set your database password using the `DB_PASSWORD` environment variable.

### 3. Run the Backend

Open the project in IntelliJ IDEA and run the Spring Boot application.

Backend URL:

`http://localhost:8080`

### 4. Run the Frontend

Open a terminal inside the frontend directory.

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend URL:

`http://localhost:5173`

## Application Workflow

1. The user opens the Expense Tracker dashboard.
2. React frontend requests expense information from the Spring Boot REST API.
3. Spring Boot processes requests using the service and repository layers.
4. PostgreSQL stores and retrieves expense records.
5. The dashboard displays updated expenses, totals, and category charts.

## Future Enhancements

- User authentication and authorization
- Monthly budget planning
- Advanced expense analytics
- Export expense reports to PDF and Excel
- Recurring expense management

## Author

Developed as a Full Stack Development Project.
