# API Documentation

## Base URL

The base URL for all API endpoints is: `http://localhost:{PORT}`

## Endpoints

### GET /api/users

Get a list of all users.

#### Response

- Status Code: 200
- Content Type: application/json

```
[

    {
        "id": "73d1123c-230b-42eb-93b8-f51496922ca3",
        "username": "Ilya",
        "age": "25",
        "hobbies": "Movies"
    },
    {
        "id": "302e2131-43d6-4c92-b088-d1c9aaf54cdb",
        "username": "Den",
        "age": "15",
        "hobbies": "Horrors"
    }
]
```

### GET /api/users/{userId}

- Get a specific user by their ID.

#### Parameters

- {userId}: The ID of the user to retrieve.

#### Response

- Status Code: 200
- Content Type: application/json

```
 {
     "id": "302e2131-43d6-4c92-b088-d1c9aaf54cdb",
     "username": "Den",
     "age": "15",
     "hobbies": "Horrors"
 }
```

### POST /api/users

- Create a new user.

#### Request Body

- Content Type: application/json

```
{
  "username": "John Doe",
  "age": 25,
  "hobbies": ["Reading", "Gardening"]
}
```

#### Response

- Status Code: 201
- Content Type: application/json

```
{
  "id": "3",
  "username": "John Doe",
  "age": 25,
  "hobbies": ["Reading", "Gardening"]
}
```

### PUT /api/users/{userId}

Update an existing user.

#### Parameters

- {userId}: The ID of the user to update.

#### Request Body

Content Type: application/json

```
{
  "username": "Updated Name",
  "age": 30,
  "hobbies": ["Painting", "Cooking"]
}
```

#### Response

- Status Code: 200
- Content Type: application/json

```
{
  "id": "3",
  "username": "Updated Name",
  "age": 30,
  "hobbies": ["Painting", "Cooking"]
}
```

### DELETE /api/users/{userId}

Delete a user.

#### Parameters

- {userId}: The ID of the user to delete.
  ####Response
- Status Code: 204
