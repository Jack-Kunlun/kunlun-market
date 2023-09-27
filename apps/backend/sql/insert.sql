DO $$ 
BEGIN 
  -- 判断表是否为空
  IF (select count(*) from role) = 0
THEN 
  -- 当表为空时的插入数据
  INSERT INTO role (id, role_name, description) VALUES (1, 'superAdministrator', '超级管理员');

END IF;

END $$;

DO $$ 
BEGIN 
  -- 判断表是否为空
  IF (select count(*) from "user") = 0
THEN 
  -- 当表为空时的插入数据
  INSERT INTO "user" (username, real_name, password, password_salt, phone, role_id) VALUES ('kunlun', '昆仑', 'h584e+d+Q4j6SCgujYaUmA==', 'c4F23QIAGnc8yUqEaR80BA==', 1, 1);

END IF;

END $$;

DO $$ 
BEGIN 
  -- 判断表是否为空
  IF (select count(*) from admin_user) = 0
THEN 
  -- 当表为空时的插入数据
  INSERT INTO admin_user (username, real_name, password, password_salt, phone, role_id) VALUES ('kunlun', '昆仑', 'Tjnz5wyttvZAv2XLIzVwXQ==', 'ovd56JBKHtb0ARpqytX4Cg==', 1, 1);

END IF;

END $$;

DO $$ 
BEGIN 
  -- 判断表是否为空
  IF (select count(*) from menu) = 0
THEN 
  -- 当表为空时的插入默认路由
  -- SELECT setval('menu_id_seq', (SELECT MAX(id) FROM menu));

  INSERT INTO menu (id, menu_name, menu_code, path, parent_id, sort, icon) 
  VALUES 
    (1, 'Home', '@/pages/Home', '/home', 0, 1, '1'),
    (2, 'User', '@/pages/User', '/user', 0, 2, '1'),
    (3, 'Role', '@/pages/Role', '/role', 0, 3, '1'),
    (4, 'Help', '@/pages/Help', '/help', 0, 4, '1'),
    (5, 'Setting', '@/pages/Settings', '/settings', 0, 5, '1')
  ON CONFLICT (id) DO UPDATE SET 
    menu_name = EXCLUDED.menu_name,
    menu_code = EXCLUDED.menu_code,
    path = EXCLUDED.path,
    parent_id = EXCLUDED.parent_id,
    sort = EXCLUDED.sort,
    icon = EXCLUDED.icon;

  INSERT INTO menu
    (menu_name, menu_code, path, parent_id, node_type, sort, hideMenu) 
  VALUES 
    ('User', 'index', '/user/index', 2, 2, 1, false),
    ('Role', 'index', '/role/index', 3, 2, 1, false),
    ('AddRole', '@/pages/Role/Add', '/role/add', 3, 2, 2, true),
    ('UserSetting', '@/pages/Settings/UserSetting', '/settings/user', 5, 2, 1, false);

END IF;

END $$;