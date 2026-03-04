# Album Browser (Lab 6)

This Angular 17 application was built as part of the **Album Browser — Routing, HTTP & Services** lab assignment.

## Setup

```bash
cd lab6/album-browser
npm install
```

## Running

```bash
ng serve
```

Navigate to `http://localhost:4200` (or 4201 if you changed the port).

## Features

- Router configuration with home, about, albums, album detail, and photo list pages.
- Uses `HttpClient` within a service to fetch data from JSONPlaceholder (a `USE_MOCKS` flag allows returning a local mock set).
- Components use observables with `async` pipe (albums list) and loading/error handling.
- Editable album title, deletion, and navigation.
- Responsive CSS for album list and photo grid.

This project corresponds to Lab 6 of the web development course.
