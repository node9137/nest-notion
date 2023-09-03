CREATE TABLE `nest-notion`.`page` (
  `pageId` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(250) NULL,
  `subPages` JSON NULL,
  `breadcrumbs` JSON NULL,
  PRIMARY KEY (`pageId`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='nest-notion';
