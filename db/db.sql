CREATE  DATABASE blogMMA;



USE blogMMA;

create table post(
    id int AUTO_INCREMENT PRIMARY KEY,
    title varchar(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author varchar(100),
    img LONGBLOB
);

