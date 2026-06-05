-- Database setup script for CSE340 project

DROP TABLE IF EXISTS project_categories CASCADE;

-- Drop dependent tables first
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Drop parent table last
DROP TABLE IF EXISTS organizations CASCADE;

-- Drop user and role tables (must drop users first due to foreign key)
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- Reset sequences to start from 1
ALTER SEQUENCE IF EXISTS organizations_organization_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS projects_project_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS categories_category_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS roles_role_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS users_user_id_seq RESTART WITH 1;

-- Create tables
CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    description TEXT,
    website TEXT
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

-- Junction table for many-to-many relationship between projects and categories
CREATE TABLE project_categories (
    project_id INTEGER NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

-- ROLES TABLE (For role-based access control)
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

-- USERS TABLE (For authentication and authorization)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- STEP 3: INSERT ORGANIZATIONS DATA
-- =====================================================
INSERT INTO organizations (name, contact_email, description, website)
VALUES
    (
        'Red Cross',
        'info@redcross.org',
        'Humanitarian organization providing emergency assistance and disaster relief',
        'https://www.redcross.org'
    ),
    (
        'UNICEF',
        'info@unicef.org',
        'Child support organization focused on children''s rights and wellbeing',
        'https://www.unicef.org'
    );

-- Insert projects data
INSERT INTO projects (
    organization_id,
    title,
    description,
    location,
    project_date
)
VALUES
    -- Red Cross Projects (organization_id = 1)
    (
        1,
        'Clean Water Project',
        'Provide clean water to villages in need',
        'Kampala',
        '2026-05-01'
    ),
    (
        1,
        'Medical Supplies',
        'Distribute medical supplies to rural clinics',
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
        'Teach health education in local communities',
        'Mbale',
        '2026-05-20'
    ),
    -- UNICEF Projects (organization_id = 2)
    (
        2,
        'School Support',
        'Support education for underprivileged children',
        'Jinja',
        '2026-05-02'
    ),
    (
        2,
        'Library Construction',
        'Build a community library for children',
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
        'Provide educational supplies to schools',
        'Kabale',
        '2026-05-17'
    ),
    (
        2,
        'Scholarship Program',
        'Provide scholarships to deserving students',
        'Soroti',
        '2026-05-22'
    );

-- =====================================================
-- STEP 5: INSERT ROLES DATA
-- =====================================================
INSERT INTO roles (role_name, role_description) VALUES
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

-- =====================================================
-- STEP 6: INSERT CATEGORIES DATA
-- =====================================================
INSERT INTO categories (name)
VALUES
    ('Health'),
    ('Education'),
    ('Environment'),
    ('Emergency Relief'),
    ('Infrastructure');

-- =====================================================
-- STEP 7: LINK PROJECTS TO CATEGORIES
-- =====================================================
INSERT INTO project_categories (project_id, category_id)
VALUES
    -- Red Cross Projects
    (1, 1),  -- Clean Water Project -> Health
    (1, 3),  -- Clean Water Project -> Environment
    (2, 1),  -- Medical Supplies -> Health
    (3, 3),  -- Food Distribution -> Environment
    (4, 4),  -- Emergency Shelter -> Emergency Relief
    (5, 1),  -- Health Education -> Health

    -- UNICEF Projects
    (6, 2),  -- School Support -> Education
    (7, 2),  -- Library Construction -> Education
    (7, 5),  -- Library Construction -> Infrastructure
    (8, 2),  -- Teacher Training -> Education
    (9, 2),  -- School Supplies -> Education
    (10, 2); -- Scholarship Program -> Education

-- =====================================================
-- STEP 8: VERIFY DATA (Shows record counts)
-- =====================================================
SELECT 'Organizations' as Table_Name, COUNT(*) as Record_Count FROM organizations
UNION ALL
SELECT 'Projects', COUNT(*) FROM projects
UNION ALL
SELECT 'Categories', COUNT(*) FROM categories
UNION ALL
SELECT 'Project_Categories', COUNT(*) FROM project_categories
UNION ALL
SELECT 'Roles', COUNT(*) FROM roles
UNION ALL
SELECT 'Users', COUNT(*) FROM users;