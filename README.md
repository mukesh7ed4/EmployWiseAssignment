# EmployWise User Management Application

Live link:https://employ-wise-assignments.netlify.app

## Project Overview
This is a React-based user management application that integrates with the Reqres API to perform authentication and user-related operations. The application allows users to log in, view a paginated list of users, edit user details, and delete users.

## Features
- User Authentication
- Paginated User List
- User Edit Functionality
- User Delete Functionality
- Responsive Design

## Technologies Used
- React
- React Router
- Axios
- Tailwind CSS
- Context API for state management
- Lucide React Icons

## Prerequisites
- Node.js (v14 or later)
- npm or Yarn

## Installation

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd employwise-user-management
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
No additional environment variables are required for this project. The application uses the Reqres API directly.

### 4. Run the Application
```bash
npm start
# or
yarn start
```

## API Credentials
- Email: eve.holt@reqres.in
- Password: cityslicka

## Project Structure
```
src/
│
├── components/
│   ├── EditUserModal.js
│   ├── LoginForm.js
│   ├── PrivateRoute.js
│   ├── UserCard.js
│   └── UserList.js
│
├── context/
│   └── AuthContext.js
│
├── services/
│   ├── api.js
│   └── authService.js
│
└── App.js
```

## Key Features and Implementation

### Authentication
- Implemented using Context API
- Token stored in localStorage
- Protected routes using PrivateRoute component

### User Management
- Fetch users with pagination
- Edit user details
- Delete users with confirmation

## Error Handling
- Graceful error handling in API calls
- User-friendly error messages
- Form validation implemented

## Responsive Design
- Tailwind CSS used for responsive layout
- Works on desktop and mobile devices

## Bonus Features
- React Router for navigation
- Client-side pagination

## Assumptions and Considerations
- The application uses the Reqres mock API for authentication and user management
- Token is stored in localStorage for simplicity
- Basic error handling is implemented
- Pagination is handled client-side

## Potential Improvements
- Implement more robust error handling
- Add more comprehensive form validation
- Create loading states for API calls
- Implement client-side search and filtering



## Contact
Name: Mukesh Kumar
Email: sihagmukesh9977@gmail.com
```
