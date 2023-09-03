CREATE TABLE `nest-notion`.`page` (
  `page_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `content` VARCHAR(45) NULL,
  `subpages` VARCHAR(45) NULL,
  PRIMARY KEY (`page_id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='nest-notion';
