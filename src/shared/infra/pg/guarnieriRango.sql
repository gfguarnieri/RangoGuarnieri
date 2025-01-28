-- Em desenvolvimento 

CREATE TABLE restaurant(
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    address VARCHAR(150),
    neighborhood VARCHAR(50),
    number VARCHAR(20),
    city VARCHAR(50),
    state VARCHAR(2),
    postalCode VARCHAR(8)
);