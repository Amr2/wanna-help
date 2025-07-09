
-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name TEXT,
    role VARCHAR(20) CHECK (role IN ('requester', 'provider')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    verification_token_expires TIMESTAMP,
    profile_picture TEXT,
    bio TEXT,
    location TEXT,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,    
);

-- Service Requests Table
CREATE TABLE requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    budget_range VARCHAR(50),
    status VARCHAR(20) CHECK (status IN ('open', 'matched', 'completed', 'archived')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    location VARCHAR(255),
    expires_at TIMESTAMP,
    active_bids_count INTEGER DEFAULT 0,
    total_bids_count INTEGER DEFAULT 0
);

-- Bids Table
CREATE TABLE bids (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID REFERENCES requests(id),
    provider_id UUID REFERENCES users(id),
    amount DECIMAL,
    description TEXT,
    message TEXT,
    status VARCHAR(20) CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    UNIQUE(request_id, provider_id)
);

-- Agreements Table
CREATE TABLE agreements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID REFERENCES requests(id),
    provider_id UUID REFERENCES users(id),
    requester_id UUID REFERENCES users(id),
    start_date TIMESTAMP,
    agreed_amount DECIMAL,
    end_date TIMESTAMP,
    status VARCHAR(20) CHECK (status IN ('in_progress', 'completed', 'disputed'))
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- Ratings Table
CREATE TABLE ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agreement_id UUID REFERENCES agreements(id),
    reviewer_id UUID REFERENCES users(id),
    target_id UUID REFERENCES users(id),
    request_id UUID REFERENCES requests(id),
    score INT CHECK (score BETWEEN 1 AND 5),
    comment TEXT
    created_at TIMESTAMP DEFAULT NOW()
);
