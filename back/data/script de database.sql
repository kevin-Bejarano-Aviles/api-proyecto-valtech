create database valtechelearning;
use valtechelearning;

create table admins(
	id int not null auto_increment,
    fullName varchar(100),
    email varchar(100),
    avatar varchar(100),
    password varchar(250),
    createdAt DATE,
    updatedAt DATE,
    primary key(id)
);
CREATE TABLE news(
	id int not null auto_increment,
    title varchar(100),
    content varchar(500),
    image varchar(250),
    createdAt DATE,
    updatedAt DATE,
    primary key(id)
);

CREATE TABLE advisers(
	id int not null auto_increment,
    fullName varchar(500),
    email varchar(500),
    avatar varchar(100),
    phoneNumber int,
    createdAt DATE,
    updatedAt DATE,
    primary key(id)
);

create table events(
	id int not null auto_increment,
    name varchar(200),
    date DATE,
    time TIME,
    createdAt DATE,
    updatedAt DATE,
    detail varchar(500),
    duration INT,
    adviser_event_id int,
    primary key(id),
    constraint fk_adviser foreign key(adviser_event_id) references advisers(id) on update cascade on delete cascade
);

create table students(
	id int not null auto_increment,
    fullName varchar(500),
    email varchar(500),
    phoneNumber int,
    program varchar(100),
    avatar varchar(100),
    dni int,
    school varchar(500),
    age int,
    address varchar(500),
    motive varchar(500),
    user varchar(45),
    password varchar(500),
    createdAt DATE,
    updatedAt DATE,
    adviserId int,
    eventId int,
    primary key(id),
    constraint fk_adviser_id foreign key(adviserId) references advisers(id) on update cascade on delete cascade,
    constraint fk_envent foreign key(eventId) references events(id) on update cascade on delete cascade
);

