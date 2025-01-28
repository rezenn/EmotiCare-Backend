create table users(
    user_id uuid primary key default
    uuid_generate_v4(),
    user_name varchar(255) not null,
    user_email varchar(255) unique not null,
    birthday DATE,
    full_name varchar(255),
    gender varchar(255),
    profile_picture_url varchar(255),
    user_password varchar(255)  not null,
    last_reset_date DATE DEFAULT NULL,
    created_at date default current_date
);

CREATE TABLE moods (
    mood_id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    mood_date DATE NOT NULL,
    mood_emoji VARCHAR(10) NOT NULL,
    mood_label VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
    note_id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    note_desc text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE challenges (
    challenge_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    IsPreloaded BOOLEAN DEFAULT FALSE,
    CreatedBy uuid REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE userChallenges (
    user_challenge_id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    challenge_id INT NOT NULL REFERENCES Challenges(challenge_id) ON DELETE CASCADE,
    IsDone BOOLEAN DEFAULT FALSE
);

CREATE TABLE dailyChallenges (
    daily_challenge_id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    challenge_id INT NOT NULL REFERENCES Challenges(challenge_id) ON DELETE CASCADE,
    date_selected DATE NOT NULL
);
