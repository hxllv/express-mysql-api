# Simple Express and MySQL RESTful API

Uses the express and mysql2 package (also compatible with mysql package, although with potential errors (fix in .sql file)).

Run with `node` or `nodemon` after initializing with `npm i`.

Test with Postman or something similar.

## Supports all CRUD operations

  - GET all courses,
  - GET course with specific ID,
  - POST (INSERT) course,
  - PUT (UPDATE) course,
  - DELETE course.

## Customization

`index.js`:
  - edit `const conn` to specify DB,
  - edit method functions and queries to own specifications,
  - edit `evalResult()` and `evalBody()` to own specifications,

`db+table+insert+fix.sql`:
  - edit name of created DB, table, etc.,
  - also contains fix for mysql package error "MySQL 8.0 - Client does not support authentication protocol requested by server; 
consider upgrading MySQL client".
