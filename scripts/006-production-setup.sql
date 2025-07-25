-- Clear all existing demo data
TRUNCATE TABLE payments CASCADE;
TRUNCATE TABLE invoice_items CASCADE;
TRUNCATE TABLE invoices CASCADE;
TRUNCATE TABLE children CASCADE;
TRUNCATE TABLE services CASCADE;
TRUNCATE TABLE users CASCADE;
TRUNCATE TABLE organizations CASCADE;
TRUNCATE TABLE age_ranges CASCADE;
TRUNCATE TABLE support_tickets CASCADE;

-- Reset sequences
ALTER SEQUENCE IF EXISTS organizations_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS users_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS children_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS services_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS invoices_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS invoice_items_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS payments_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS age_ranges_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS support_tickets_id_seq RESTART WITH 1;

-- Insert your business organization
INSERT INTO organizations (id, name, address, phone, email, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Your Child Care Business', 'Your Business Address', 'Your Phone Number', 'your-email@domain.com', NOW());

-- Insert your admin account (can access all three portals)
-- Password: admin123 (you should change this after first login)
INSERT INTO users (id, email, password_hash, first_name, last_name, role, organization_id, phone, address, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'admin@yourbusiness.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 'system_admin', '550e8400-e29b-41d4-a716-446655440001', 'Your Phone', 'Your Address', NOW());

-- Insert basic age ranges for your business
INSERT INTO age_ranges (organization_id, name, min_age_months, max_age_months, half_day_rate, full_day_rate, monthly_rate, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Infant (6-18 months)', 6, 18, 35.00, 65.00, 1200.00, NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'Toddler (18-30 months)', 18, 30, 32.00, 60.00, 1100.00, NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'Preschool (30+ months)', 30, 60, 30.00, 55.00, 1000.00, NOW());

-- Insert basic services for your business
INSERT INTO services (id, organization_id, name, description, rate, billing_frequency, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440001', 'Full-Time Care', 'Full-time childcare services', 1200.00, 'monthly', NOW()),
('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440001', 'Part-Time Care', 'Part-time childcare services', 800.00, 'monthly', NOW()),
('550e8400-e29b-41d4-a716-446655440042', '550e8400-e29b-41d4-a716-446655440001', 'Extended Hours', 'After-hours care', 15.00, 'daily', NOW());
