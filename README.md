# Task Management Project

## Overview
This Task Management Project is designed to help users manage their tasks effectively. It allows users to create, update, and delete tasks, set priorities, and track deadlines.

## Features
- **Create Tasks**: Add new tasks with details such as title, description, deadline, and priority.
- **Update Tasks**: Modify existing task details.
- **Delete Tasks**: Remove tasks that are no longer needed.
- **Priority Management**: Automatically update task priorities based on deadlines.

## Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB
- **Others**: Fetch API, Environment Variables

## Setup and Installation
1. **Clone the repository**:
    ```sh
    git clone https://github.com/bulkhead1tech/taskbackend.git
    ```

2. **Navigate to the project directory**:
    ```sh
    cd taskbackend
    ```

3. **Install dependencies**:
    ```sh
    npm install
    ```

4. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following:
    ```env
    MONGO_URI=your-mongodb-uri
    PORT=your-port
    ```

5. **Run the application**:
    ```sh
    npm run dev
    ```

## API Endpoints
- **GET /tasks**: Retrieve all tasks.
- **POST /tasks**: Create a new task.
- **PUT /tasks/:id**: Update an existing task.
- **DELETE /tasks/:id**: Delete a task by ID.

## Usage
1. **Create a Task**:
    ```sh
    curl -X POST -H "Content-Type: application/json" -d '{"title":"Task 1", "description":"This is task 1", "deadline":"2025-02-28", "priority":1}' http://localhost:4001/tasks
    ```

2. **Update a Task**:
    ```sh
    curl -X PUT -H "Content-Type: application/json" -d '{ "request":2}' http://localhost:4001/tasks/your-task-id
    ```
    request value = 2 for completed status, 3 for expired status, 4 for on progress.

3. **Delete a Task**:
    ```sh
    curl -X DELETE http://localhost:4001/tasks/your-task-id
    ```





