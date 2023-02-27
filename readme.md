# Overview

Welcome to F22Labs Node.js assessment test.

You are required to pass the Node.js test to prove your skills;

## Initialize the Project

To start your assessment, the candidate should clone the project into a local machine. This project runs mainly with Node.js and the version required is `8.9.4`. The candidate should make sure the local machine has this node.js version (or above) installed.

Initialize the project by running

```bash
npm install
```

To start the installation of the project dependencies to the local machine.

now...

**It's all set!**

## Assessment Submission

After finishing your assessment, the candidate must do the following:

1. Delete the `node_modules` folders.
2. Create repo in github and upload initial code into `main` branch
3. Commit your code with proper message in another branch and raise PR to main.
4. Add `shubham@f22labs.com` as collaborator to repo.

**Please note that**, editing any of the irrelevant files (Outside of `routes`) may affect your assessment result.

# TASK

Backend skill. This will focus on Node.js common widely use libraries and how to implement them.

## Prerequisites

The main materials are in `routes/`. This contains an ecosystem project built base on the Node.js popular web server, [Express.js](https://expressjs.com/). Your task would be to write API(s) for each of the assessments, most of the setup had been prepared fairly well. Be sure to understand the setup and write your assessment from the setup. Further instruction will be given upon each assessment.

## Evaluation

The project is set up with Express.js, and it can run via

```bash
npm run start
```

The Web server will start through port 3000, and you are good to go.

The evaluation can execute through

```bash
npm run test
```

## 1. A bunch of readmes

In the folder `files/readme` contains several text files with a specific name, write an API with the spec.

```
GET /files/:filename
```

The `filename` should be the file name in the `files/readme` folder on which the API should read.

The response should return file name, string character count, and the content of the file in JSON format like this:

```json
{
  "filename": "the-file-name",
  "length": "as string character count of the file",
  "content": "...the content of the file"
}
```

for example,

```
GET /files/hello-world.txt
```

should return

```json
{
  "filename": "hello-world.txt",
  "length": 12,
  "content": "hello world!"
}
```

In case the file name does not exist in the folder, the API should return with _http status code_ 404 with this error.

```json
{
  "error": "file not found!",
  "code": 404
}
```

## 2. A RESTful way

In the `./routes/users.js`, there is an unfinished Restful API that needs to be improved!
Currently, the users API returns a set of user data persisting in our database.

### A. Enhance user list

The API get users list is the following:

```
GET /users
```

At the moment, the API only return dump user object.

```json
[
  {
    "_id": "the-id",
    "isActive": true,
    "firstName": "Some-one",
    "lastName": "Good-name",
    "balance": "$200"
  }
]
```

Ideally, this API should return the list of users contains in the database as an array list.

For the sake of this assessment, we provide a function which virtually gets users from the persistent storage. The `getUsers()` function read database with delay time about 300-800 millisecond. Therefore, it returns a [Promise](https://scotch.io/tutorials/javascript-promises-for-dummies) that resolve the array of all Users.

```json
[
  {
    "_id": "5b90fa3ae3d7a39f2fbe3d91",
    "isActive": true,
    "firstName": "Maxine",
    "lastName": "Maddox",
    "balance": "$2,658.41",
    "age": 34,
    "eyeColor": "blue",
    "company": "RUGSTARS",
    "email": "maxine.maddox@rugstars.me",
    "phone": "+1 (812) 587-3466",
    "address": "914 Summit Street, Taycheedah, Minnesota, 3908",
    "registered": "Saturday, April 19, 2014 4:04 AM"
  },
  {
    "_id": "5b90fa3aca1af2169ef51371",
    "isActive": true,
    "firstName": "Lamb",
    "lastName": "Ellison",
    "balance": "$1,901.51",
    "age": 40,
    "eyeColor": "green",
    "company": "HOTCAKES",
    "email": "lamb.ellison@hotcakes.net",
    "phone": "+1 (896) 487-2570",
    "address": "781 Jaffray Street, Emory, Palau, 6471",
    "registered": "Saturday, April 26, 2014 11:29 AM"
  },
  {
    "_id": "5b90fa3a54b581637584983b",
    "isActive": false,
    "firstName": "Lourdes",
    "lastName": "Dickerson",
    "balance": "$3,631.70",
    "age": 37,
    "eyeColor": "green",
    "company": "PERMADYNE",
    "email": "lourdes.dickerson@permadyne.name",
    "phone": "+1 (801) 569-3468",
    "address": "206 Coleman Street, Vicksburg, Utah, 9241",
    "registered": "Monday, March 10, 2014 12:07 PM"
  },
  ...
]
```

However, for this API endpoint, we _do not_ want all the detail object to return with this API. The API we actually want should look like this:

```javascript
// GET /users
// will return
[
  {
    "_id": "5b90fa3ae3d7a39f2fbe3d91",
    "isActive": true,
    "firstName": "Maxine",
    "lastName": "Maddox",
    "balance": "$2,658.41"
  },
  {
    "_id": "5b90fa3aca1af2169ef51371",
    "isActive": true,
    "firstName": "Lamb",
    "lastName": "Ellison",
    "balance": "$1,901.51"
  },
  {
    "_id": "5b90fa3a54b581637584983b",
    "isActive": false,
    "firstName": "Lourdes",
    "lastName": "Dickerson",
    "balance": "$3,631.70"
  },
  ...
]
```

Write this API to return data from users accordingly.

### B. Get only one user!

Now, the data that we hide for each user should be exposed to the consumer. However, this time, instead of returning all user, we will allow the API caller to call a URL and get only _one_ User (resource).

Write a new API that follows [RESTful](https://restfulapi.net/resource-naming/) convention. This API should return a _single_ user object which matches `_id` param specify in the API endpoint.

**Note:** For this API, you do not need to hide any user information, since we return only 1 user, we need to expose as many details as possible!
