-- update_timestamp(): 为你定义函数的名称。
-- update_time: 为你表中更新时间戳字段名称（pg sql不可以大写的）
CREATE OR REPLACE FUNCTION "public"."update_timestamp"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
begin
    new.update_time = current_timestamp;
    return new;
end
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- 创建触发器
-- update_timestamp: 触发器名称，可以随意设置，但是不要设置成中文的。
-- user: 表名
-- update_timestamp()：触发器所要用的函数名称，与第一步函数名称保持一致。
create trigger update_timestamp before update on "admin_user" for each row execute procedure update_timestamp();
