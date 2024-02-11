# API Documentation

## Endpoints

1. Implemented endpoint `api/users`:

   - **GET** `api/users`

     - Returns all user records.
     - Response:
       - Status Code: 200
       - Body:
         ```
         [
             {
                 "id": "73d1123c-230b-42eb-93b8-f51496922ca3",
                 "username": "Ilya",
                 "age": "25",
                 "hobbies": ["Movies", "Poker"]
             },
             {
                 "id": "302e2131-43d6-4c92-b088-d1c9aaf54cdb",
                 "username": "Den",
                 "age": "15",
                 "hobbies": ["Horrors"]
             }
         ]
         ```

   - **GET** `api/users/{userId}`

     - Returns the user record with the specified `userId` if it exists.
     - Parameters:
       - `userId` (string, required) - The unique identifier of the user.
     - Responses:
       - Status Code: 200
         - Body: User record with `id === userId`
       - Status Code: 400
         - Body: Corresponding message if `userId` is invalid (not a valid UUID)
       - Status Code: 404
         - Body: Corresponding message if record with `id === userId` doesn't exist

   - **POST** `api/users`

     - Creates a new user record and stores it in the database.
     - Request Body:
       ```
       {
           "username": "John",
           "age": 30,
           "hobbies": ["Reading", "Sports"]
       }
       ```
     - Responses:
       - Status Code: 201
         - Body: Newly created user record
       - Status Code: 400
         - Body: Corresponding message if request body does not contain required fields

   - **PUT** `api/users/{userId}`

     - Updates an existing user record with the specified `userId`.
     - Parameters:
       - `userId` (string, required) - The unique identifier of the user.
     - Request Body:
       ```
       {
           "username": "John",
           "age": 35,
           "hobbies": ["Reading", "Sports", "Cooking"]
       }
       ```
     - Responses:
       - Status Code: 200
         - Body: Updated user record
       - Status Code: 400
         - Body: Corresponding message if `userId` is invalid (not a valid UUID)
       - Status Code: 404
         - Body: Corresponding message if record with `id === userId` doesn't exist

   - **DELETE** `api/users/{userId}`
     - Deletes an existing user record with the specified `userId` from the database.
     - Parameters:
       - `userId` (string, required) - The unique identifier of the user.
     - Responses:
       - Status Code: 204
         - No response body
       - Status Code: 400
         - Body: Corresponding message if `userId` is invalid (not a valid UUID)
       - Status Code: 404
         - Body: Corresponding message if record with `id === userId` doesn't exist

## User Object

Users are stored as objects with the following properties:

- `id` (string, uuid): Unique identifier generated on the server side.
- `username` (string, required): User's name.
- `age` (number, required): User's age.
- `hobbies` (array of strings or empty array, required): User's hobbies.

## Error Handling

- Requests to non-existing endpoints (e.g., `some-non/existing/resource`) should be handled. The server should respond with a status code 404 and a corresponding human-friendly message.

## Environment Configuration

The value of the `port` on which the application is running should be stored in the `.env` file.
