# Angular Uers dashboard app (NGRX)

I have created a simple web application that consumes a RESTful web service from [https://reqres.in/](https://reqres.in/) through the following endpoints:

- Login and authentication (Login view)
- Listing users (Users list view)
- Viewing a single user (Single user view)
- Creating a user (User creation view)
- Deleting a user (User removal modal)
- Updating a user (User updating view)

The application is built using Angular version 13, Angular NGRX as a state management system, and Bootstrap.

## Implementation Details

- Built by Bootstrap, responsiveness tested and guaranteed.
- Created table pagination and items length changer to improve app performance.
- Created a full authentication system.
- Created guarded and secured routes.
- Separated common logic and components into a shared module.
- Created lazy-loaded modules
- Each action (login, create, update, delete) displays a success or failure message.
- Used Redux (NGRX) was integrated for state management.
- Created Unit tests for almost all components, guards, and services.
- Created interfaces for strongly typing the app with genic types

## App Modules:

- Auth module
- Users module
- Shared module
  
## Notes:

There was a small issue regarding the API that was provided (https://reqres.in/), it didn't provide a proper interface for posting user data, it was a different interface for getting user data the interfaces were not compatible with each other, so I sent a static data to complete the app flow.
