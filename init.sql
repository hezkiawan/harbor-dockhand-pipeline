CREATE TABLE IF NOT EXISTS metrics (
    id SERIAL PRIMARY KEY,
    budget VARCHAR(50) NOT NULL,
    current_usage VARCHAR(50) NOT NULL,
    upcoming_usage VARCHAR(50) NOT NULL,
    total_estimation VARCHAR(50) NOT NULL,
    usage_percent INT NOT NULL,
    contacts INT NOT NULL,
    broadcasts INT NOT NULL
);

INSERT INTO metrics (budget, current_usage, upcoming_usage, total_estimation, usage_percent, contacts, broadcasts)
VALUES ('Rp1,000,004', 'Rp73,263.59', 'Rp0', 'Rp73,263.59', 7, 21637, 276);