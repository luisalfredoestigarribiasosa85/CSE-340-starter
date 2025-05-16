INSERT INTO profile(user_id, name, email)
VALUES (4, 'Render.com', 'render@mail.com');

UPDATE profile
SET name = 'Render Updated'
WHERE user_id = 4;

-- DELETE Operation
DELETE FROM profile
WHERE user_id = 4;

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);