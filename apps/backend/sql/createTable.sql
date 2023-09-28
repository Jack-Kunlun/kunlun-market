-- create table if exists 'admin_user';
do $$ BEGIN 
IF (
  select
    count(*)
  from
    information_schema.tables
  where
    table_name = 'admin_user'
) = 0 
THEN 
CREATE TABLE "admin_user" (
  id SERIAL PRIMARY KEY,
  username varchar(30) UNIQUE NOT NULL,
  real_name varchar(20) DEFAULT '',
  password varchar(30) NOT NULL,
  password_salt varchar(30) NOT NULL,
  phone varchar(20) UNIQUE NOT NULL,
  email varchar(30) DEFAULT '',
  status smallint DEFAULT 1,
  role_id smallint NOT NULL,
  create_by integer DEFAULT 0,
  create_time timestamp DEFAULT now(),
  update_time timestamp DEFAULT now()
);

comment on table admin_user is '后台用户表';

comment on column admin_user.id is '用户id';

comment on column admin_user.username is '用户名';

comment on column admin_user.real_name is '用户真实姓名';

comment on column admin_user.password is '密码';

comment on column admin_user.password_salt is '密码盐';

comment on column admin_user.phone is '手机号';

comment on column admin_user.email is '邮箱';

comment on column admin_user.status is '状态: 0-失效|1-有效|-1-删除';

comment on column admin_user.role_id is '用户角色权限';

comment on column admin_user.create_by is '创建人ID, 0-系统创建';

comment on column admin_user.create_time is '创建时间';

comment on column admin_user.update_time is '更新时间';

END IF;

END $$;

-- create table if exists 'user';
do $$ BEGIN 
IF (
  select
    count(*)
  from
    information_schema.tables
  where
    table_name = 'user'
) = 0 
THEN 
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username varchar(30) UNIQUE NOT NULL,
  real_name varchar(20) DEFAULT '',
  password varchar(30) NOT NULL,
  password_salt varchar(30) NOT NULL,
  phone varchar(20) UNIQUE NOT NULL,
  email varchar(30) DEFAULT '',
  status smallint DEFAULT 1,
  role_id smallint NOT NULL,
  create_by integer DEFAULT 0,
  create_time timestamp DEFAULT now(),
  update_time timestamp DEFAULT now()
);

comment on table "user" is '用户表';

comment on column "user".id is '用户id';

comment on column "user".username is '用户名';

comment on column "user".real_name is '用户真实姓名';

comment on column "user".password is '密码';

comment on column "user".password_salt is '密码盐';

comment on column "user".phone is '手机号';

comment on column "user".email is '邮箱';

comment on column "user".status is '状态: 0-失效|1-有效|-1-删除';

comment on column "user".role_id is '用户角色权限';

comment on column "user".create_by is '创建人ID, 0-系统创建';

comment on column "user".create_time is '创建时间';

comment on column "user".update_time is '更新时间';

END IF;

END $$;

-- create table if exists 'role';
do $$ BEGIN 
IF (
  select
    count(*)
  from
    information_schema.tables
  where
    table_name = 'role'
) = 0 
THEN 
CREATE TABLE "role" (
  id SERIAL PRIMARY KEY,
  role_name varchar(64) UNIQUE NOT NULL,
  auth_list jsonb [] DEFAULT ARRAY [] :: jsonb [],
  description varchar(100) DEFAULT NULL,
  status smallint DEFAULT 1,
  create_by integer DEFAULT 0,
  create_time timestamp DEFAULT now(),
  update_time timestamp DEFAULT now()
);

comment on table "role" is '角色表';

comment on column "role".id is '角色id';

comment on column "role".role_name is '角色名称';

comment on column "role".auth_list is '角色权限列表';

comment on column "role".status is '角色状态 0 - 失效 | 1 - 有效 | -1 - 删除';

comment on column "role".description is '角色描述';

comment on column "role".create_by is '创建人';

comment on column "role".create_time is '创建时间';

comment on column "role".update_time is '更新时间';

END IF;

END $$;

-- create table if exists 'menu';
do $$ BEGIN 
IF (
  select
    count(*)
  from
    information_schema.tables
  where
    table_name = 'menu'
) = 0 
THEN 
CREATE TABLE "menu" (
  id SERIAL PRIMARY KEY,
  menu_name varchar(64) NOT NULL,
  menu_code varchar(100) DEFAULT NULL,
  path varchar(100) UNIQUE NOT NULL,
  description varchar(100) DEFAULT NULL,
  parent_id integer DEFAULT 0,
  node_type smallint DEFAULT 1,
  sort smallint DEFAULT 1,
  hide_menu boolean DEFAULT false,
  icon varchar(255) DEFAULT NULL,
  status smallint DEFAULT 1,
  create_by integer DEFAULT 0,
  create_time timestamp DEFAULT now(),
  update_time timestamp DEFAULT now()
);

comment on table "menu" is '菜单表';

comment on column "menu".id is '菜单id';

comment on column "menu".menu_name is '菜单名称，不能重复';

comment on column "menu".menu_code is '菜单编码';

comment on column "menu".path is '菜单url';

comment on column "menu".description is '菜单描述';

comment on column "menu".parent_id is '父节点 0 表示为根节点';

comment on column "menu".node_type is '节点类型 1 - 菜单 | 2 - 页面 | 3 - 按钮';

comment on column "menu".sort is '菜单顺序';

comment on column "menu".hide_menu is '是否不显示在菜单列表';

comment on column "menu".icon is '图标地址';

comment on column "menu".status is '菜单状态 0 - 失效 | 1 - 有效 | -1 - 删除';

comment on column "menu".create_by is '创建人';

comment on column "menu".create_time is '创建时间';

comment on column "menu".update_time is '更新时间';

END IF;

END $$;