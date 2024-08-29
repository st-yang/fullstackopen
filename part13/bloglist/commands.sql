CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Dan Abramov', '', 'On let vs const');
insert into blogs (author, url, title) values ('Laurenz Albe', '', 'Gaps in sequences in PostgreSQL');