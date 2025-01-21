create table users(
    user_id uuid primary key default
    uuid_generate_v4(),
    user_name varchar(255) not null,
    user_email varchar(255) unique not null,
    user_password varchar(255)  not null,
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
