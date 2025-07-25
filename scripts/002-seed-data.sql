-- Insert sample organizations
INSERT INTO organizations (id, name, address, phone, email) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Sunshine Childcare Center', '123 Main St, Anytown, ST 12345', '(555) 123-4567', 'admin@sunshinechildcare.com'),
('550e8400-e29b-41d4-a716-446655440002', 'Little Stars Daycare', '456 Oak Ave, Somewhere, ST 67890', '(555) 987-6543', 'info@littlestars.com');

-- Insert sample users
INSERT INTO users (id, email, password_hash, first_name, last_name, role, organization_id, phone, address) VALUES
-- System Admin
('550e8400-e29b-41d4-a716-446655440010', 'admin@system.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System', 'Admin', 'system_admin', NULL, '(555) 000-0000', '789 Admin Blvd'),

-- Childcare Admins
('550e8400-e29b-41d4-a716-446655440011', 'admin@sunshinechildcare.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Sarah', 'Johnson', 'childcare_admin', '550e8400-e29b-41d4-a716-446655440001', '(555) 123-4567', '123 Main St'),
('550e8400-e29b-41d4-a716-446655440012', 'admin@littlestars.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Mike', 'Davis', 'childcare_admin', '550e8400-e29b-41d4-a716-446655440002', '(555) 987-6543', '456 Oak Ave'),

-- Guardians
('550e8400-e29b-41d4-a716-446655440020', 'parent1@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John', 'Smith', 'guardian', '550e8400-e29b-41d4-a716-446655440001', '(555) 111-2222', '321 Parent St'),
('550e8400-e29b-41d4-a716-446655440021', 'parent2@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Emily', 'Brown', 'guardian', '550e8400-e29b-41d4-a716-446655440001', '(555) 333-4444', '654 Guardian Ave'),
('550e8400-e29b-41d4-a716-446655440022', 'parent3@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'David', 'Wilson', 'guardian', '550e8400-e29b-41d4-a716-446655440002', '(555) 555-6666', '987 Family Rd');

-- Insert sample children
INSERT INTO children (id, first_name, last_name, date_of_birth, organization_id, guardian_id, enrollment_date) VALUES
('550e8400-e29b-41d4-a716-446655440030', 'Emma', 'Smith', '2020-03-15', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440020', '2023-01-15'),
('550e8400-e29b-41d4-a716-446655440031', 'Liam', 'Brown', '2019-07-22', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440021', '2023-02-01'),
('550e8400-e29b-41d4-a716-446655440032', 'Sophia', 'Wilson', '2021-01-10', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440022', '2023-03-01');

-- Insert sample services
INSERT INTO services (id, organization_id, name, description, rate, billing_frequency) VALUES
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440001', 'Full-Time Care', 'Full-time childcare services', 1200.00, 'monthly'),
('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440001', 'Part-Time Care', 'Part-time childcare services', 800.00, 'monthly'),
('550e8400-e29b-41d4-a716-446655440042', '550e8400-e29b-41d4-a716-446655440001', 'Extended Hours', 'After-hours care', 15.00, 'daily'),
('550e8400-e29b-41d4-a716-446655440043', '550e8400-e29b-41d4-a716-446655440002', 'Infant Care', 'Specialized infant care', 1400.00, 'monthly'),
('550e8400-e29b-41d4-a716-446655440044', '550e8400-e29b-41d4-a716-446655440002', 'Toddler Care', 'Toddler program', 1100.00, 'monthly');

-- Insert sample invoices
INSERT INTO invoices (id, invoice_number, organization_id, guardian_id, child_id, issue_date, due_date, subtotal, tax_rate, tax_amount, total_amount, status, notes) VALUES
('550e8400-e29b-41d4-a716-446655440050', 'INV-2024-001', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440030', '2024-01-01', '2024-01-15', 1200.00, 8.25, 99.00, 1299.00, 'paid', 'January 2024 childcare services'),
('550e8400-e29b-41d4-a716-446655440051', 'INV-2024-002', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440031', '2024-01-01', '2024-01-15', 800.00, 8.25, 66.00, 866.00, 'paid', 'January 2024 part-time care'),
('550e8400-e29b-41d4-a716-446655440052', 'INV-2024-003', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440030', '2024-02-01', '2024-02-15', 1200.00, 8.25, 99.00, 1299.00, 'pending', 'February 2024 childcare services');

-- Insert sample invoice items
INSERT INTO invoice_items (invoice_id, service_id, description, quantity, rate, amount, service_date) VALUES
('550e8400-e29b-41d4-a716-446655440050', '550e8400-e29b-41d4-a716-446655440040', 'Full-Time Care - January 2024', 1, 1200.00, 1200.00, '2024-01-01'),
('550e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440041', 'Part-Time Care - January 2024', 1, 800.00, 800.00, '2024-01-01'),
('550e8400-e29b-41d4-a716-446655440052', '550e8400-e29b-41d4-a716-446655440040', 'Full-Time Care - February 2024', 1, 1200.00, 1200.00, '2024-02-01');

-- Insert sample payments
INSERT INTO payments (invoice_id, amount, payment_date, payment_method, transaction_id, notes) VALUES
('550e8400-e29b-41d4-a716-446655440050', 1299.00, '2024-01-10', 'Credit Card', 'TXN-001-2024', 'Payment received via online portal'),
('550e8400-e29b-41d4-a716-446655440051', 866.00, '2024-01-12', 'Bank Transfer', 'TXN-002-2024', 'Direct bank transfer');
