drop table if exists "admin_user";

CREATE TABLE "admin_user" (
  id SERIAL PRIMARY KEY,
  username varchar(30) UNIQUE NOT NULL,
  real_name varchar(20) NOT NULL,
  password varchar(30) NOT NULL,
  password_salt varchar(30) NOT NULL,
  phone varchar(20) UNIQUE NOT NULL,
  email varchar(30) DEFAULT '',
  status smallint DEFAULT 1,
  role_id smallint DEFAULT 1,
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

comment on column admin_user.status is '状态: 0-失效|1-有效|2-删除';

comment on column admin_user.role_id is '用户角色权限';

comment on column admin_user.create_by is '创建人ID, 0-系统创建';

comment on column admin_user.create_time is '创建时间';

comment on column admin_user.update_time is '更新时间';

drop table if exists "user";

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username varchar(30) UNIQUE NOT NULL,
  real_name varchar(20) NOT NULL,
  password varchar(30) NOT NULL,
  password_salt varchar(30) NOT NULL,
  phone varchar(20) UNIQUE NOT NULL,
  email varchar(30) DEFAULT '',
  status smallint DEFAULT 1,
  role_id smallint DEFAULT 1,
  create_by integer DEFAULT 0,
  create_time timestamp DEFAULT now(),
  update_time timestamp DEFAULT now()
);

comment on table user is '用户表';

comment on column user.id is '用户id';

comment on column user.username is '用户名';

comment on column user.real_name is '用户真实姓名';

comment on column user.password is '密码';

comment on column user.password_salt is '密码盐';

comment on column user.phone is '手机号';

comment on column user.email is '邮箱';

comment on column user.status is '状态: 0-失效|1-有效|2-删除';

comment on column user.role_id is '用户角色权限';

comment on column user.create_by is '创建人ID, 0-系统创建';

comment on column user.create_time is '创建时间';

comment on column user.update_time is '更新时间';