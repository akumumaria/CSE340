-- Run this script inside a PostgreSQL database named cse340
DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS organizations;
-- =========================
-- ORGANIZATIONS TABLE
-- =========================
CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    description TEXT,
    logo_file TEXT
);
-- =========================
-- PROJECTS TABLE
-- =========================
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organizations(organization_id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    project_date DATE NOT NULL
);
-- =========================
-- CATEGORIES TABLE
-- =========================
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);
-- =========================
-- MANY-TO-MANY TABLE
-- =========================
CREATE TABLE project_categories (
    project_id INTEGER NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);
-- =========================
-- ORGANIZATIONS DATA
-- =========================
INSERT INTO organizations (name, contact_email, description, logo_file)
VALUES (
        'Red Cross',
        'info@redcross.org',
        'Humanitarian organization',
        'images/redcross.webp'
    ),
    (
        'UNICEF',
        'info@unicef.org',
        'Child support organization',
        'images/unicef.webp'
    );
-- =========================
-- PROJECTS DATA
-- =========================
INSERT INTO projects (
        organization_id,
        title,
        description,
        location,
        project_date
    )
VALUES (
        1,
        'Clean Water Project',
        'Provide clean water to villages',
        'Kampala',
        '2026-05-01'
    ),
    (
        1,
        'Medical Supplies',
        'Distribute medical supplies to clinics',
        'Gulu',
        '2026-05-05'
    ),
    (
        1,
        'Food Distribution',
        'Distribute food to families in need',
        'Lira',
        '2026-05-10'
    ),
    (
        1,
        'Emergency Shelter',
        'Build emergency shelters for displaced people',
        'Arua',
        '2026-05-15'
    ),
    (
        1,
        'Health Education',
        'Teach health education in communities',
        'Mbale',
        '2026-05-20'
    ),
    (
        2,
        'School Support',
        'Support education for children',
        'Jinja',
        '2026-05-02'
    ),
    (
        2,
        'Library Construction',
        'Build a community library',
        'Mbarara',
        '2026-05-07'
    ),
    (
        2,
        'Teacher Training',
        'Train teachers in rural areas',
        'Fort Portal',
        '2026-05-12'
    ),
    (
        2,
        'School Supplies',
        'Provide supplies to schools',
        'Kabale',
        '2026-05-17'
    ),
    (
        2,
        'Scholarship Program',
        'Provide scholarships to students',
        'Soroti',
        '2026-05-22'
    );
-- =========================
-- CATEGORIES DATA
-- =========================
INSERT INTO categories (name)
VALUES ('Health'),
    ('Education'),
    ('Environment');
-- =========================
-- PROJECT ↔ CATEGORY LINKS
-- =========================
INSERT INTO project_categories (project_id, category_id)
VALUES (1, 1),
    (2, 2);