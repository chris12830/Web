-- Insert sample age ranges for organizations
INSERT INTO age_ranges (id, organization_id, name, min_age_months, max_age_months, monthly_rate, description) VALUES
-- Sunshine Childcare Center age ranges
('550e8400-e29b-41d4-a716-446655440060', '550e8400-e29b-41d4-a716-446655440001', 'Infant Care (6-18 months)', 6, 18, 1500.00, 'Specialized care for infants with low child-to-caregiver ratios'),
('550e8400-e29b-41d4-a716-446655440061', '550e8400-e29b-41d4-a716-446655440001', 'Toddler Care (18-36 months)', 18, 36, 1300.00, 'Active toddler program with structured activities'),
('550e8400-e29b-41d4-a716-446655440062', '550e8400-e29b-41d4-a716-446655440001', 'Preschool (3-4 years)', 36, 48, 1200.00, 'Educational preschool program preparing for kindergarten'),
('550e8400-e29b-41d4-a716-446655440063', '550e8400-e29b-41d4-a716-446655440001', 'Pre-K (4-5 years)', 48, 60, 1100.00, 'Advanced pre-kindergarten curriculum'),

-- Little Stars Daycare age ranges
('550e8400-e29b-41d4-a716-446655440064', '550e8400-e29b-41d4-a716-446655440002', 'Infant Care (6-18 months)', 6, 18, 1600.00, 'Premium infant care with certified specialists'),
('550e8400-e29b-41d4-a716-446655440065', '550e8400-e29b-41d4-a716-446655440002', 'Toddler Care (18-36 months)', 18, 36, 1400.00, 'Comprehensive toddler development program'),
('550e8400-e29b-41d4-a716-446655440066', '550e8400-e29b-41d4-a716-446655440002', 'Preschool (3-5 years)', 36, 60, 1250.00, 'Full preschool and pre-K combined program');

-- Update existing children with age ranges based on their current age
UPDATE children SET age_range_id = '550e8400-e29b-41d4-a716-446655440062' 
WHERE id = '550e8400-e29b-41d4-a716-446655440030'; -- Emma Smith (4 years old)

UPDATE children SET age_range_id = '550e8400-e29b-41d4-a716-446655440063' 
WHERE id = '550e8400-e29b-41d4-a716-446655440031'; -- Liam Brown (5 years old)

UPDATE children SET age_range_id = '550e8400-e29b-41d4-a716-446655440065' 
WHERE id = '550e8400-e29b-41d4-a716-446655440032'; -- Sophia Wilson (3 years old)

-- Insert sample support tickets
INSERT INTO support_tickets (id, ticket_number, requester_id, assigned_to_id, organization_id, subject, description, priority, status, category) VALUES
('550e8400-e29b-41d4-a716-446655440070', 'TICK-2024-001', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440001', 'Unable to generate monthly reports', 'The monthly report generation feature is not working properly. When I click generate, it shows an error message.', 'high', 'open', 'Technical Issue'),
('550e8400-e29b-41d4-a716-446655440071', 'TICK-2024-002', '550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440001', 'Question about payment methods', 'I would like to know what payment methods are accepted for invoice payments. Can I pay with bank transfer?', 'medium', 'resolved', 'General Inquiry'),
('550e8400-e29b-41d4-a716-446655440072', 'TICK-2024-003', '550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440001', 'Invoice not received', 'I have not received my invoice for this month. Could you please check and resend it?', 'medium', 'in_progress', 'Billing Issue');

-- Insert sample support messages
INSERT INTO support_messages (ticket_id, sender_id, message, is_internal) VALUES
('550e8400-e29b-41d4-a716-446655440070', '550e8400-e29b-41d4-a716-446655440011', 'The monthly report generation feature is not working properly. When I click generate, it shows an error message.', false),
('550e8400-e29b-41d4-a716-446655440070', '550e8400-e29b-41d4-a716-446655440010', 'Thank you for reporting this issue. I will investigate the report generation system and get back to you within 24 hours.', false),

('550e8400-e29b-41d4-a716-446655440071', '550e8400-e29b-41d4-a716-446655440020', 'I would like to know what payment methods are accepted for invoice payments. Can I pay with bank transfer?', false),
('550e8400-e29b-41d4-a716-446655440071', '550e8400-e29b-41d4-a716-446655440011', 'We accept credit cards, debit cards, and ACH bank transfers. You can set up bank transfer payments in your parent portal under Payment Methods.', false),

('550e8400-e29b-41d4-a716-446655440072', '550e8400-e29b-41d4-a716-446655440021', 'I have not received my invoice for this month. Could you please check and resend it?', false),
('550e8400-e29b-41d4-a716-446655440072', '550e8400-e29b-41d4-a716-446655440011', 'I am checking our system for your invoice. I will resend it to your email address within the next hour.', false);
