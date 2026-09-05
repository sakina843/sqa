# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\api.spec.js >> Users API Automation >> 1 - Register User
- Location: tests\api.spec.js:22:7

# Error details

```
Error: apiRequestContext.post: Fixture { request } from beforeAll cannot be reused in a test.
  - Recommended fix: use a separate { request } in the test.
  - Alternatively, manually create APIRequestContext in beforeAll and dispose it in afterAll.
See https://playwright.dev/docs/api-testing#sending-api-requests-from-ui-tests for more details.
```

# Test source

```ts
  1   | const BASE_URL = 'https://api-testing-postman.vercel.app/api/v1';
  2   | 
  3   | export class UsersApi {
  4   | 
  5   |   constructor(request) {
  6   |     this.request = request;
  7   |   }
  8   | 
  9   |   // POST /users/register
  10  |   async registerUser(fullname, email, username, password) {
> 11  |     return await this.request.post(
      |                               ^ Error: apiRequestContext.post: Fixture { request } from beforeAll cannot be reused in a test.
  12  |       `${BASE_URL}/users/register`,
  13  |       {
  14  |         data: {
  15  |           fullname,
  16  |           email,
  17  |           username,
  18  |           password
  19  |         }
  20  |       }
  21  |     );
  22  |   }
  23  | 
  24  |   // POST /users/login
  25  |   async loginUser(username, email, password) {
  26  |     return await this.request.post(
  27  |       `${BASE_URL}/users/login`,
  28  |       {
  29  |         data: {
  30  |           username,
  31  |           email,
  32  |           password
  33  |         }
  34  |       }
  35  |     );
  36  |   }
  37  | 
  38  |   // GET /users/current-user
  39  |   async getCurrentUser(token) {
  40  |     return await this.request.get(
  41  |       `${BASE_URL}/users/current-user`,
  42  |       {
  43  |         headers: {
  44  |           Authorization: `Bearer ${token}`
  45  |         }
  46  |       }
  47  |     );
  48  |   }
  49  | 
  50  |   // PATCH /users/update-account
  51  |   async updateAccount(token, fullname, email) {
  52  |     return await this.request.patch(
  53  |       `${BASE_URL}/users/update-account`,
  54  |       {
  55  |         headers: {
  56  |           Authorization: `Bearer ${token}`
  57  |         },
  58  |         data: {
  59  |           fullname,
  60  |           email
  61  |         }
  62  |       }
  63  |     );
  64  |   }
  65  | 
  66  |   // PUT /users/replace-account
  67  |   async replaceAccount(token, fullname, email, username) {
  68  |     return await this.request.put(
  69  |       `${BASE_URL}/users/replace-account`,
  70  |       {
  71  |         headers: {
  72  |           Authorization: `Bearer ${token}`
  73  |         },
  74  |         data: {
  75  |           fullname,
  76  |           email,
  77  |           username
  78  |         }
  79  |       }
  80  |     );
  81  |   }
  82  | 
  83  |   // GET /users/user/{username}
  84  |   async getUserByUsername(username) {
  85  |     return await this.request.get(
  86  |       `${BASE_URL}/users/user/${username}`
  87  |     );
  88  |   }
  89  | 
  90  |   // GET /users/all-users
  91  |   async getAllUsers(token) {
  92  |     return await this.request.get(
  93  |       `${BASE_URL}/users/all-users`,
  94  |       {
  95  |         headers: {
  96  |           Authorization: `Bearer ${token}`
  97  |         }
  98  |       }
  99  |     );
  100 |   }
  101 | 
  102 |   // POST /users/change-password
  103 |   async changePassword(token, oldPassword, newPassword) {
  104 |     return await this.request.post(
  105 |       `${BASE_URL}/users/change-password`,
  106 |       {
  107 |         headers: {
  108 |           Authorization: `Bearer ${token}`
  109 |         },
  110 |         data: {
  111 |           oldPassword,
```