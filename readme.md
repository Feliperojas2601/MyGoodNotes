### MyGoodNotes

MyGoodNotes is a personal note management application that allows users to create, edit, and organize their notes using the Markdown format. With MyGoodNotes, users can write their notes easily, including the ability to add multimedia and links. In addition, the application provides a search function to quickly find specific notes and content.

### Stack Tecnológico

- **Angular with SSR (Server-Side Rendering)**: Angular was chosen as the frontend framework because of its robustness and ability to build web applications with a level of complexity. The incorporation of SSR ensures that pages are rendered on the server before being sent to the client, which improves performance and indexability of the content by search engines.

- **NestJS**: NestJS is used for the creation of the MyGoodNotes backend API. The choice of this is based on its power and versatility, as well as the wide range of tools and libraries available for web application development.

- **MongoDB**: MongoDB is the database of choice for storing user notes. The decision to use MongoDB is due to its schema flexibility and scalability, as well as its ability to handle unstructured data.

- **Redis**: Redis has been integrated into the application to improve the performance of frequent searches. By using Redis as a caching layer, frequent search results are stored in memory, allowing faster access and reducing the load on the main database.