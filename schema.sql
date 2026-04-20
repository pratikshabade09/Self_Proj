CREATE DATABASE IF NOT EXISTS loginDB;
USE loginDB;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    role ENUM('student', 'teacher', 'admin') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
    sessionId VARCHAR(255) PRIMARY KEY,
    userId INT NOT NULL,
    lastActivity TIMESTAMP,
    expiresAt TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);

INSERT INTO users (username, passwordHash, role)
VALUES ('S246109043', '1234', 'student');
