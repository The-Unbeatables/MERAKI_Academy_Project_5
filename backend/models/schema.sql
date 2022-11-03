CREATE TABLE roles(
  id SERIAL NOT NULL,
  role VARCHAR(255) NOT NULL,
  PRIMARY KEY (id) 
);
CREATE TABLE permissions (
  id SERIAL NOT NULL,
  permission VARCHAR(255) NOT NULL,
  PRIMARY KEY (id) 
);

CREATE TABLE role_permission ( 
  id SERIAL NOT NULL,
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id ) REFERENCES roles (id),
  FOREIGN KEY (permission_id) REFERENCES permissions (id), 
  PRIMARY KEY (id)
);

CREATE TABLE users(
  id SERIAL NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  gender VARCHAR(255),
  role_id INT,
  FOREIGN KEY (role_id ) REFERENCES roles (id),
  PRIMARY KEY (id) 
);

CREATE TABLE workers(
  id SERIAL NOT NULL,
  profession VARCHAR(255) ,
  Y.O.E INT,
  bio VARCHAR(255) ,
  image VARCHAR(255) ,
  user_id INT,
  FOREIGN KEY (user_id ) REFERENCES users (id),
  PRIMARY KEY (id) 
);
CREATE TABLE worker_reviews(
  id SERIAL NOT NULL,
  review VARCHAR(255) ,
  customer_id INT,
  worker_id INT,
  created_at TIMESTAMP DEFAULT(NOW) ,
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (customer_id ) REFERENCES users (id),
  FOREIGN KEY (worker_id ) REFERENCES workers (id),
  PRIMARY KEY (id) 
);
CREATE TABLE products(
  id SERIAL NOT NULL,
  title VARCHAR(255) ,
  price INT,
  category VARCHAR(255),
  items_left INT,
  image VARCHAR(255),
  is_deleted SMALLINT DEFAULT 0,
  PRIMARY KEY (id) 
);

CREATE TABLE product_comments(
  id SERIAL NOT NULL,
  comment VARCHAR(255) ,
  created_at TIMESTAMP DEFAULT(NOW) ,
  is_deleted SMALLINT DEFAULT 0,
  commenter_id INT,
  product_id INT,
  FOREIGN KEY (commenter_id ) REFERENCES users (id),
  FOREIGN KEY (product_id ) REFERENCES products (id),
  PRIMARY KEY (id) 
);
CREATE TABLE shopping_carts(
  id SERIAL NOT NULL,
  is_deleted SMALLINT DEFAULT 0,
  user_id INT,
  product_id INT,
  FOREIGN KEY (user_id ) REFERENCES users (id),
  FOREIGN KEY (product_id ) REFERENCES products (id),
  PRIMARY KEY (id) 
);
CREATE TABLE product_orders(
  id SERIAL NOT NULL,
  is_deleted SMALLINT DEFAULT 0,
  user_id INT,
  product_id INT,
  FOREIGN KEY (user_id ) REFERENCES users (id),
  FOREIGN KEY (product_id ) REFERENCES products (id),
  PRIMARY KEY (id) 
);
CREATE TABLE service_orders(
  id SERIAL NOT NULL,
  status VARCHAR(255),
  service_title VARCHAR(255),
  service_description VARCHAR(255),
  is_deleted SMALLINT DEFAULT 0,
  user_id INT,
  worker_id INT,
  FOREIGN KEY (user_id ) REFERENCES users (id),
  FOREIGN KEY (worker_id ) REFERENCES workers(id),
  PRIMARY KEY (id) 
);