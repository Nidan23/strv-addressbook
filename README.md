# Installation

 - Install docker on your machine
 - Replace `${DOCKER_IP}` with your IP
 - Run `./run.bat`

# Tests

Tests are in folder `./test`. To run tests use this command `npm run test:e2e` in the `./test` directory

# API Documentation

All necessary documentation & types is in `./src/interface`. 

## List of endpoints:
 - `/auth/register` - Register
 - `/auth/login` - Login
 - `/contacts/addContacts` - Add Contacts

## Register & Login endpoint:

```typescript
export interface User {
    email: string
    password: string
}
```

## Add Contacts endpoint:
Endpoint accepts only array of this type, so it suppouse 2 look like this:
```typescript
{
        token: string, 
        data:Contact[]
}
```
```typescript
export interface Contact {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address: string
}
```

## Response schema is:
```typescript
export interface ServerResponse {
    error: boolean,
    message: string,
    token?: string
}
```

# Examples

You can find all examples in `./test/assets/test_data.json`

# Where is deployed?

// TODO