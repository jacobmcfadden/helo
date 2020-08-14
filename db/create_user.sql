INSERT INTO users (username, password, profile_pic)
VALUES
($1, $2, CONCAT('https://robohash.org/',$1))
RETURNING *;