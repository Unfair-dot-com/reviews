CREATE DATABASE IF NOT EXISTS reviews;

USE reviews;

CREATE TABLE user_reviews (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  url_id INT NOT NULL,
  name VARCHAR(15) NOT NULL,
  location VARCHAR(50) NOT NULL,
  date DATETIME NOT NULL,
  comment VARCHAR(8000) NOT NULL,
  rating INT NOT NULL,
  helpful INT DEFAULT 0,
  img VARCHAR(225),
  imgmedium VARCHAR(225)
);
