
-- Insert sample users
INSERT INTO users (id, email, password, name, role) VALUES
(gen_random_uuid(), 'requester@example.com', 'hashed_password', 'Alice', 'requester'),
(gen_random_uuid(), 'provider@example.com', 'hashed_password', 'Bob', 'provider');

-- Insert a sample request
INSERT INTO requests (id, user_id, title, description, category, status) VALUES
(gen_random_uuid(), (SELECT id FROM users WHERE role = 'requester' LIMIT 1),
'Fix my sink', 'Need urgent plumbing help', 'home_services', 'open');

-- Insert a sample bid
INSERT INTO bids (id, request_id, provider_id, amount, message, status) VALUES
(gen_random_uuid(), 
 (SELECT id FROM requests LIMIT 1),
 (SELECT id FROM users WHERE role = 'provider' LIMIT 1),
 150.00, 'I can come within 2 hours', 'pending');
