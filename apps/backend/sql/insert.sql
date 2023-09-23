DO $$ 
BEGIN 
  -- 判断表是否为空
  IF (select count(*) from role) = 0
THEN 
  -- 当表为空时的插入数据
  INSERT INTO role (id, role_name) VALUES (1, 'superAdministrator');

END IF;

END $$;

DO $$ 
BEGIN 
  -- 判断表是否为空
  IF (select count(*) from "user") = 0
THEN 
  -- 当表为空时的插入数据
  INSERT INTO "user" (username, real_name, password, password_salt, phone, role_id) VALUES ('kunlun', '昆仑', 'h584e+d+Q4j6SCgujYaUmA==', 'c4F23QIAGnc8yUqEaR80BA==', '13366778899', 1);

END IF;

END $$;

DO $$ 
BEGIN 
  -- 判断表是否为空
  IF (select count(*) from "admin_user") = 0
THEN 
  -- 当表为空时的插入数据
  INSERT INTO "admin_user" (username, real_name, password, password_salt, phone, role_id) VALUES ('kunlun', '昆仑', 'Tjnz5wyttvZAv2XLIzVwXQ==', 'ovd56JBKHtb0ARpqytX4Cg==', '13366778899', 1);

END IF;

END $$;