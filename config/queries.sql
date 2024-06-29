DROP TABLE IF EXISTS skaters;


CREATE TABLE skaters (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL, 
    anos_experiencia INT NOT NULL,
    especialidad VARCHAR(100) NOT NULL,
    foto VARCHAR(255) NOT NULL,
    estado BOOLEAN NOT NULL
);

-- seedesr
INSERT INTO skaters (id, email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES 
('1','luis@skate.com', 'Luis Martinez', 'luis123', 7, 'Kickflip', 'assets/img/luis.jpg', true); 



SELECT * FROM skaters;
