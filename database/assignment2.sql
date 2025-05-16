--Insert new data
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');
-- Update data
UPDATE account 
SET account_type = 'Admin'
WHERE account_id = 1;
-- Delete record from the database
DELETE from account
WHERE account_id = 1;
SELECT * FROM inventory ORDER BY inv_id;
--Replace data from description
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_id = 10;
-- Use of INNER JOIN
SELECT 
	inventory.inv_make, 
	inventory.inv_model,
	classification.classification_name
FROM
	inventory
INNER JOIN
	classification
ON
	inventory.classification_id = classification.classification_id
WHERE
	classification.classification_name = 'Sport';
-- Update all records in the inventory to add "/vehicles" to the middle of the file path in the inv_image and inv_thumbnail columns
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
	inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');