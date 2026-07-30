# DevTinder

DevTinder is a full-stack developer networking platform inspired by modern social networking applications. It enables developers to create professional profiles, discover other developers, send connection requests, and build meaningful professional relationships within the developer community.

The project is built to demonstrate modern full-stack web development practices using the MERN stack, with a focus on scalable architecture, secure authentication, and clean API design.

## Features

- User registration and authentication
- Secure login using JWT-based authentication
- Create, update, and manage developer profiles
- Discover and browse developer profiles
- Send, accept, reject, and manage connection requests
- View existing connections
- RESTful API architecture
- Responsive and intuitive user interface

## Technology Stack

### Frontend

- React
- React Router
- Axios
- Tailwind CSS (or your preferred CSS framework)

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

## Project Structure

```text
DevTinder/
├── frontend/
├── backend/
├── README.md
└── .gitignore
```

## Installation

### Clone the repository

```bash
git clone https://github.com/noddy911/DevTinder.git
cd DevTinder
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Environment Variables

Create a `.env` file inside the backend directory and configure the following variables:

```env
PORT=7777
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## API Overview

The backend exposes RESTful APIs for:

- Authentication
- User management
- Profile management
- Connection requests
- Connections

## Future Enhancements

- Real-time messaging
- Developer search and filtering
- Notifications
- Profile image uploads
- Skill-based recommendations
- Email verification
- Password reset
- Deployment with Docker and CI/CD

## Learning Objectives

This project demonstrates:

- REST API development with Express.js
- MongoDB data modeling with Mongoose
- Authentication and authorization using JWT
- Password hashing with bcrypt
- Frontend and backend integration
- State management in React
- Secure environment variable management
- Git and GitHub workflow

## Contributing

Contributions are welcome. If you would like to improve the project, please fork the repository, create a feature branch, commit your changes, and submit a pull request.

## License

This project is licensed under the MIT License.
