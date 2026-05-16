-- Run this script inside a PostgreSQL database named cse340.
-- Example:
--   createdb cse340
--   psql -d cse340 -f cse340/src/setup.sql

DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS organizations;

CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    description TEXT,
    logo_file TEXT
);
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organizations(organization_id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    project_date DATE NOT NULL
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE project_categories (
    project_id INTEGER NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

INSERT INTO organizations (
    name,
    contact_email,
    description,
    logo_file
) VALUES
(
    'Green Earth',
    'greenearth@email.com',
    'Environmental conservation organization.',
    '/images/greenearth.png'
),
(
    'Water for All',
    'waterforall@email.com',
    'Provides clean water projects.',
    '/images/waterforall.png'
),
(
    'Bright Future',
    'brightfuture@email.com',
    'Supports schools and education.',
    '/images/brightfuture.png'
);
INSERT INTO projects (organization_id, title, description, location, project_date) VALUES
(1, 'Tree Planting', 'Plant trees in Kampala', 'Kampala', '2026-05-01'),
(2, 'Clean Water', 'Water project', 'Mukono', '2026-05-02'),
(3, 'School Repair', 'Fix classrooms', 'Jinja', '2026-05-03'),
(1, 'Health Camp', 'Medical support', 'Wakiso', '2026-05-04'),
(2, 'Road Cleanup', 'Clean roads', 'Entebbe', '2026-05-05');

INSERT INTO categories (name) VALUES
('Health'),
('Education'),
('Environment');

INSERT INTO project_categories (project_id, category_id) VALUES
(1, 3),
(2, 1),
(3, 2),
(4, 1),
(5, 3);
