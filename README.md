
# Social-backend


## Social-backend is a backend for a social networking application (such as Twitter/X) created for educational purposes.


### Features:
- User register
- Login
- Create posts (Text only)
- Delete posts [WIP]
- Create comments
- Delete comments [WIP]
- Follow users [WIP]
- Block users [WIP]



## Run Locally

Clone the project

```bash
  git clone git@github.com:SantiagoPintos/social-backend.git
```

Go to the project directory

```bash
  cd social-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET`




## API Reference

#### Register a user

```http
  POST /users/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.|
| `lastName` | `string` | **Required**.|
| `username` | `string` | **Required**.|
| `email` | `string` | **Required**.|
| `password` | `string` | **Required**.|

#### Login

```http
  POST /users/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. |
| `password`      | `string` | **Required**. |

Returns a unique token per device por login.

Example:

```http
{
    "message": "User successfully logged in.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJzYW50aWFnbyIsImVtYWlsIjoic2FudGlhZ29AZ21haWwuY29tIiwiaWF0IjoxNzEyNDMwOTE2fQ.S-CpQ1OrjwsI0RlIKotC-opz8EXEW3B5U2lH1p460q8"
}
```

#### Follow/Unfollow user

```http
  POST /users/follow/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization header` | `string` | **Required**.|

Returns a message with the confirmation/error.

Example:

```http
{
    "message": "User followed",
}
```



#### Upload profile picture

```http
  POST /users/profile-image
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization header` | `string` | **Required**.|
| `File` | `image` | **Required**.|

Returns a message with the confirmation/error.

Example:

```http
{
    "message": "Profile image updated successfully",
}
```


#### Delete profile picture

```http
  DELETE /users/profile-image
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization header` | `string` | **Required**.|

Returns a message with the confirmation/error.

Example:

```http
{
    "message": "Profile image deleted successfully",
}
```


#### Create a new post

```http
  POST /publications
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization header` | `string` | **Required**.|
| `content` | `string` | **Required**.|
| `userId` | `string` | **Required**. |

Returns an object with the content of the new post.

```http
{
    "message": "Post created successfully",
    "post": {
        "autorId": 2,
        "content": "Hey! This is my first post!",
        "date": "2024-04-06T19:19:05.290Z",
        "likes": 0,
        "id": 1
    }
}
```

#### Get a user's posts

```http
  GET /publications
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization header`      | `string` | **Required**. |
| `numberOfPosts`      | `number` | **Optional**. |
| `postId`      | `number` | **Optional**. |

Returns a list of the user's posts.

```http
{
    "posts": [
        {
            "id": 1,
            "autorId": 2,
            "content": "Hey! This is my first post!",
            "date": "2024-04-06T19:19:05.290Z",
            "likes": 0,
            "comments": []
        }
    ]
}
```

#### Create a new comment

```http
  POST /publications/comments
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization header`      | `string` | **Required**. |
| `userId` | `string` | **Required**. |
| `comment`      | `string` | **Required**. |
| `parentPostId`      | `string` | **Required**. |

Returns an object with the comment and its parent post.

```http
{
    "message": "Comment created successfully",
    "post": {
        "autorId": 2,
        "content": "This is the first comment to my post!",
        "date": "2024-04-06T19:57:24.623Z",
        "likes": 0,
        "parentPost": {
            "id": 1,
            "autorId": 2,
            "content": "Hey! This is my first post!",
            "date": "2024-04-06T19:19:05.290Z",
            "likes": 0
        },
        "id": 3
    }
}
```


#### Add or remove like to post or comments

```http
  POST /like/{type}/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization header`      | `string` | **Required**. |
| `userId` | `string` | **Required**. |

Returns an object with the confirmation message

```http
{
    "message": "Like removed"
}
```
Or

```http
{
    "message": "Like created successfully",
    "like": {
        "userId": 1,
        "publicationId": 1,
        "date": "2024-05-17T19:20:46.171Z"
    }
}
```

#### Get user timeline

```http
  GET /timeline
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization header`      | `string` | **Required**. |

Returns an object with a lists of posts

```http
{
    "message": "User timeline",
    "timeline": [
        {
            "id": 14,
            "autorId": 8,
            "content": "I love rainy days",
            "date": "2024-05-23T22:12:35.151Z",
            "likes": [],
            "comments": []
        },
        {
            "id": 3,
            "autorId": 3,
            "content": "Rain... Again....",
            "date": "2024-05-23T22:11:50.999Z",
            "likes": [],
            "comments": [
              {
                "autorId": 2,
                "content": "Yeah, I hate it!",
                "date": "2024-05-23T22:11:59.999Z",
                "likes": 0,
              }
            ]
        }
      ]
}
```

## Roadmap

- Support publications with multimedia content


## Tech Stack

**Server:** Node, Express, TypeScript, TypeORM, SQLite


## Author

- [Santiago Pintos](https://github.com/SantiagoPintos)

