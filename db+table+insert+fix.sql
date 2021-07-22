create database express_sql_api;

use express_sql_api;
create table courses (
	id INT(6) unsigned auto_increment primary key,
	name varchar(255) not null
);

insert into courses (id, name) values (1, "course 1");
insert into courses (id, name) values (2, "course 2");
insert into courses (id, name) values (3, "course 3");

/* 
run if 
{{ MySQL 8.0 - Client does not support authentication protocol requested by server; 
consider upgrading MySQL client }} error

!! with npm's mysql2 this shouldn't be a problem !!
*/

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'passwd';
flush privileges;