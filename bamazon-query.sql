
CREATE DATABASE bamazon;
​
CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(10,2),
  stock_quantity INTEGER(10)
);
​
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Doom', 'Games', '59.99', 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('The Witcher III', 'Games', '39.99', 12);​
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Overwatch', 'Games', '29.99', 8);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Animal Crossing', 'Games', '59.99', 13);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Luigis Mansion', 'Games', '49.99', 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Shirt', 'Clothes', '49.99', 6);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Pants', 'Clothes', '29.99', 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Socks', 'Clothes', '5.99', 8);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Hat','Clothes', '19.99', 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Sweater', 'Clothes', '59.99', 12);

SELECT * FROM products;