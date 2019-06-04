CREATE DATABASE TestGigigo;

USE TestGigigo;

CREATE TABLE teams(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE members(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name varchar (100) NOT NULL,
    email varchar (50) NOT NULL,
    image varchar (200) NOT NULL,
    team_id INT(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (id),
    FOREIGN KEY (team_id) REFERENCES teams(id)
);
