
CREATE TABLE products(
    ProdID INT PRIMARY KEY AUTO_INCREMENT,
    ProdName VARCHAR(255),
    ProdDescription TEXT,
    ProdPrice DECIMAL(10,2),
    ProdImageURL VARCHAR(255)
);

CREATE TABLE rooms(
    RoomID INT PRIMARY KEY AUTO_INCREMENT,
    RoomCode VARCHAR(255)
);

CREATE TABLE room_products(
    RoomProdID INT PRIMARY KEY AUTO_INCREMENT,
    RoomProdQuantity INT,
    RoomID INT,
    ProdID INT,
    FOREIGN KEY (RoomID) REFERENCES rooms(RoomID),
    FOREIGN KEY (ProdID) REFERENCES products(ProdID)
);

INSERT INTO products(ProdName, ProdDescription, ProdPrice, ProdImageURL) VALUES
    ('Banana', 'A banana is a fruit', '0.99', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Banana.jpg/220px-Banana.jpg'),
    ('Orange', 'An orange is a fruit', '1.99', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Orange-fruit-avocado.jpg/220px-Orange-fruit-avocado.jpg'),
    ('Apple', 'An apple is a fruit', '2.99', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Apple_with_dice.jpg/220px-Apple_with_dice.jpg'),
    ('Pear', 'A pear is a fruit', '4.99', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Pear.jpg/220px-Pear.jpg');