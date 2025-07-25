-- Add proper password hashing functionality
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Function to hash passwords using pgcrypto
CREATE OR REPLACE FUNCTION hash_password(password TEXT) 
RETURNS TEXT AS $$
BEGIN
  RETURN crypt(password, gen_salt('bf', 10));
END;
$$ LANGUAGE plpgsql;

-- Function to verify passwords
CREATE OR REPLACE FUNCTION verify_password(password TEXT, hashed_password TEXT) 
RETURNS BOOLEAN AS $$
BEGIN
  RETURN hashed_password = crypt(password, hashed_password);
END;
$$ LANGUAGE plpgsql;

-- Update existing users with properly hashed passwords
UPDATE users 
SET password_hash = hash_password('admin123') 
WHERE email LIKE '%admin%';

UPDATE users 
SET password_hash = hash_password('password') 
WHERE email LIKE '%parent%';

-- Add a trigger to automatically hash passwords on insert/update
CREATE OR REPLACE FUNCTION hash_password_trigger()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.password_hash IS NOT NULL AND length(NEW.password_hash) < 50 THEN
    NEW.password_hash := hash_password(NEW.password_hash);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER hash_password_on_insert_update
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION hash_password_trigger();
