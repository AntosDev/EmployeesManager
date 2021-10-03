CREATE TABLE `department` (
 `department_id` int NOT NULL AUTO_INCREMENT,
 `name` varchar(100) NOT NULL,
 `description` varchar(500) NOT NULL,
 `location` int(11) NOT NULL, 
 
 PRIMARY KEY (`department_id`)
);

CREATE TABLE `employment_type` (
 `employment_type_id` int NOT NULL AUTO_INCREMENT,
 `name` varchar(100) NOT NULL,
 `description` varchar(500) NOT NULL,
 
 PRIMARY KEY (`employment_type_id`)
);

CREATE TABLE `job_title` (
 `job_title_id` int NOT NULL AUTO_INCREMENT,
 `name` varchar(100) NOT NULL,
 `description` varchar(500) NOT NULL,
 `is_managerial` boolean not null,
 
 PRIMARY KEY (`job_title_id`)
);

CREATE TABLE `employee` (
 `employee_id` int NOT NULL AUTO_INCREMENT,
 `firtname` varchar(100) NOT NULL,
 `lastname` varchar(500) NOT NULL,
 `joining_date` int(11) NOT NULL,
 `phonenumber` int(11) NOT NULL,
 `company_email_adress` varchar(50) NOT NULL,
 `personal_email_address` varchar(50),
 
 PRIMARY KEY (`employee_id`)
);

CREATE TABLE `employee_path` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `job_title_id` VARCHAR(50),
    `department_id` INT NOT NULL,
    `employment_type_id` INT NOT NULL,
    
    PRIMARY KEY (`id`),
    
    CONSTRAINT fk_emploee_department FOREIGN KEY (department_id)
        REFERENCES department (department_id),
	CONSTRAINT fk_emploee_employemnt_type FOREIGN KEY (employment_type_id)
        REFERENCES employment_type (employment_type_id),
	CONSTRAINT fk_employee_job_title FOREIGN KEY (job_title_id)
        REFERENCES job_title (job_title_id)        
)