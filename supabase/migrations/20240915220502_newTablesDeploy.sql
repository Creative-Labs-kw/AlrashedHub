drop policy "allow All for order items" on "public"."order_items";

drop policy "make changes in order table" on "public"."orders";

drop policy "Allow Auth Users to Do CRUD" on "public"."products";

drop policy "Public profiles are viewable by everyone." on "public"."profiles";

drop policy "Users can insert their own profile." on "public"."profiles";

drop policy "Users can update own profile." on "public"."profiles";

revoke delete on table "public"."order_items" from "anon";

revoke insert on table "public"."order_items" from "anon";

revoke references on table "public"."order_items" from "anon";

revoke select on table "public"."order_items" from "anon";

revoke trigger on table "public"."order_items" from "anon";

revoke truncate on table "public"."order_items" from "anon";

revoke update on table "public"."order_items" from "anon";

revoke delete on table "public"."order_items" from "authenticated";

revoke insert on table "public"."order_items" from "authenticated";

revoke references on table "public"."order_items" from "authenticated";

revoke select on table "public"."order_items" from "authenticated";

revoke trigger on table "public"."order_items" from "authenticated";

revoke truncate on table "public"."order_items" from "authenticated";

revoke update on table "public"."order_items" from "authenticated";

revoke delete on table "public"."order_items" from "service_role";

revoke insert on table "public"."order_items" from "service_role";

revoke references on table "public"."order_items" from "service_role";

revoke select on table "public"."order_items" from "service_role";

revoke trigger on table "public"."order_items" from "service_role";

revoke truncate on table "public"."order_items" from "service_role";

revoke update on table "public"."order_items" from "service_role";

revoke delete on table "public"."products" from "anon";

revoke insert on table "public"."products" from "anon";

revoke references on table "public"."products" from "anon";

revoke select on table "public"."products" from "anon";

revoke trigger on table "public"."products" from "anon";

revoke truncate on table "public"."products" from "anon";

revoke update on table "public"."products" from "anon";

revoke delete on table "public"."products" from "authenticated";

revoke insert on table "public"."products" from "authenticated";

revoke references on table "public"."products" from "authenticated";

revoke select on table "public"."products" from "authenticated";

revoke trigger on table "public"."products" from "authenticated";

revoke truncate on table "public"."products" from "authenticated";

revoke update on table "public"."products" from "authenticated";

revoke delete on table "public"."products" from "service_role";

revoke insert on table "public"."products" from "service_role";

revoke references on table "public"."products" from "service_role";

revoke select on table "public"."products" from "service_role";

revoke trigger on table "public"."products" from "service_role";

revoke truncate on table "public"."products" from "service_role";

revoke update on table "public"."products" from "service_role";

alter table "public"."order_items" drop constraint "order_items_order_id_fkey";

alter table "public"."order_items" drop constraint "order_items_product_id_fkey";

alter table "public"."profiles" drop constraint "profiles_username_key";

alter table "public"."profiles" drop constraint "username_length";

alter table "public"."orders" drop constraint "orders_user_id_fkey";

alter table "public"."order_items" drop constraint "order_items_pkey";

alter table "public"."products" drop constraint "products_id_pkey";

alter table "public"."orders" drop constraint "orders_pkey";

drop index if exists "public"."order_items_pkey";

drop index if exists "public"."products_id_pkey";

drop index if exists "public"."profiles_username_key";

drop index if exists "public"."orders_pkey";

drop table "public"."order_items";

drop table "public"."products";

create table "public"."cart" (
    "cart_id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "total_price" numeric(10,2) default 0,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
);


create table "public"."cart_items" (
    "cart_item_id" uuid not null default gen_random_uuid(),
    "cart_id" uuid,
    "item_id" uuid,
    "quantity" integer default 1,
    "price" numeric(10,2) not null,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
);


create table "public"."family_notifications" (
    "notification_id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "message" text not null,
    "description" text,
    "reaction" text,
    "read" boolean default false,
    "timestamp" timestamp without time zone default now()
);


create table "public"."items" (
    "item_id" uuid not null default gen_random_uuid(),
    "store_id" uuid,
    "item_name" text not null,
    "item_description" text,
    "item_img" text,
    "price" numeric(10,2) not null,
    "quantity" integer default 1,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
);


create table "public"."stores" (
    "store_id" uuid not null default gen_random_uuid(),
    "store_name" text not null,
    "store_description" text,
    "phone_number" text,
    "instagram_url" text,
    "delivery_price" numeric(10,2),
    "delivery_time" text,
    "owner" uuid,
    "store_logo" text,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
);


alter table "public"."orders" drop column "id";

alter table "public"."orders" drop column "total";

alter table "public"."orders" add column "order_id" uuid not null default gen_random_uuid();

alter table "public"."orders" add column "store_id" uuid;

alter table "public"."orders" add column "total_price" numeric(10,2);

alter table "public"."orders" add column "updated_at" timestamp without time zone default now();

alter table "public"."orders" alter column "created_at" drop not null;

alter table "public"."orders" alter column "created_at" set data type timestamp without time zone using "created_at"::timestamp without time zone;

alter table "public"."orders" alter column "status" set default 'pending'::text;

alter table "public"."orders" disable row level security;

alter table "public"."profiles" drop column "expo_push-token";

alter table "public"."profiles" drop column "stripe_customer_id";

alter table "public"."profiles" drop column "username";

alter table "public"."profiles" drop column "website";

alter table "public"."profiles" add column "age" integer;

alter table "public"."profiles" add column "email" text;

alter table "public"."profiles" add column "expo_push_token" text;

alter table "public"."profiles" add column "reactions" jsonb;

alter table "public"."profiles" add column "sex" text;

alter table "public"."profiles" add column "stores" text;

alter table "public"."profiles" add column "stripe_customer" text;

alter table "public"."profiles" alter column "group" drop default;

alter table "public"."profiles" alter column "updated_at" set default now();

alter table "public"."profiles" alter column "updated_at" set data type timestamp without time zone using "updated_at"::timestamp without time zone;

alter table "public"."profiles" disable row level security;

drop sequence if exists "public"."order_items_id_seq";

CREATE UNIQUE INDEX cart_items_pkey ON public.cart_items USING btree (cart_item_id);

CREATE UNIQUE INDEX cart_pkey ON public.cart USING btree (cart_id);

CREATE UNIQUE INDEX family_notifications_pkey ON public.family_notifications USING btree (notification_id);

CREATE UNIQUE INDEX items_pkey ON public.items USING btree (item_id);

CREATE UNIQUE INDEX stores_pkey ON public.stores USING btree (store_id);

CREATE UNIQUE INDEX orders_pkey ON public.orders USING btree (order_id);

alter table "public"."cart" add constraint "cart_pkey" PRIMARY KEY using index "cart_pkey";

alter table "public"."cart_items" add constraint "cart_items_pkey" PRIMARY KEY using index "cart_items_pkey";

alter table "public"."family_notifications" add constraint "family_notifications_pkey" PRIMARY KEY using index "family_notifications_pkey";

alter table "public"."items" add constraint "items_pkey" PRIMARY KEY using index "items_pkey";

alter table "public"."stores" add constraint "stores_pkey" PRIMARY KEY using index "stores_pkey";

alter table "public"."orders" add constraint "orders_pkey" PRIMARY KEY using index "orders_pkey";

alter table "public"."cart" add constraint "cart_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."cart" validate constraint "cart_user_id_fkey";

alter table "public"."cart_items" add constraint "cart_items_cart_id_fkey" FOREIGN KEY (cart_id) REFERENCES cart(cart_id) ON DELETE CASCADE not valid;

alter table "public"."cart_items" validate constraint "cart_items_cart_id_fkey";

alter table "public"."cart_items" add constraint "cart_items_item_id_fkey" FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE not valid;

alter table "public"."cart_items" validate constraint "cart_items_item_id_fkey";

alter table "public"."family_notifications" add constraint "family_notifications_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."family_notifications" validate constraint "family_notifications_user_id_fkey";

alter table "public"."items" add constraint "items_store_id_fkey" FOREIGN KEY (store_id) REFERENCES stores(store_id) ON DELETE CASCADE not valid;

alter table "public"."items" validate constraint "items_store_id_fkey";

alter table "public"."orders" add constraint "orders_store_id_fkey" FOREIGN KEY (store_id) REFERENCES stores(store_id) ON DELETE CASCADE not valid;

alter table "public"."orders" validate constraint "orders_store_id_fkey";

alter table "public"."stores" add constraint "stores_owner_fkey" FOREIGN KEY (owner) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."stores" validate constraint "stores_owner_fkey";

alter table "public"."orders" add constraint "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."orders" validate constraint "orders_user_id_fkey";

grant delete on table "public"."cart" to "anon";

grant insert on table "public"."cart" to "anon";

grant references on table "public"."cart" to "anon";

grant select on table "public"."cart" to "anon";

grant trigger on table "public"."cart" to "anon";

grant truncate on table "public"."cart" to "anon";

grant update on table "public"."cart" to "anon";

grant delete on table "public"."cart" to "authenticated";

grant insert on table "public"."cart" to "authenticated";

grant references on table "public"."cart" to "authenticated";

grant select on table "public"."cart" to "authenticated";

grant trigger on table "public"."cart" to "authenticated";

grant truncate on table "public"."cart" to "authenticated";

grant update on table "public"."cart" to "authenticated";

grant delete on table "public"."cart" to "service_role";

grant insert on table "public"."cart" to "service_role";

grant references on table "public"."cart" to "service_role";

grant select on table "public"."cart" to "service_role";

grant trigger on table "public"."cart" to "service_role";

grant truncate on table "public"."cart" to "service_role";

grant update on table "public"."cart" to "service_role";

grant delete on table "public"."cart_items" to "anon";

grant insert on table "public"."cart_items" to "anon";

grant references on table "public"."cart_items" to "anon";

grant select on table "public"."cart_items" to "anon";

grant trigger on table "public"."cart_items" to "anon";

grant truncate on table "public"."cart_items" to "anon";

grant update on table "public"."cart_items" to "anon";

grant delete on table "public"."cart_items" to "authenticated";

grant insert on table "public"."cart_items" to "authenticated";

grant references on table "public"."cart_items" to "authenticated";

grant select on table "public"."cart_items" to "authenticated";

grant trigger on table "public"."cart_items" to "authenticated";

grant truncate on table "public"."cart_items" to "authenticated";

grant update on table "public"."cart_items" to "authenticated";

grant delete on table "public"."cart_items" to "service_role";

grant insert on table "public"."cart_items" to "service_role";

grant references on table "public"."cart_items" to "service_role";

grant select on table "public"."cart_items" to "service_role";

grant trigger on table "public"."cart_items" to "service_role";

grant truncate on table "public"."cart_items" to "service_role";

grant update on table "public"."cart_items" to "service_role";

grant delete on table "public"."family_notifications" to "anon";

grant insert on table "public"."family_notifications" to "anon";

grant references on table "public"."family_notifications" to "anon";

grant select on table "public"."family_notifications" to "anon";

grant trigger on table "public"."family_notifications" to "anon";

grant truncate on table "public"."family_notifications" to "anon";

grant update on table "public"."family_notifications" to "anon";

grant delete on table "public"."family_notifications" to "authenticated";

grant insert on table "public"."family_notifications" to "authenticated";

grant references on table "public"."family_notifications" to "authenticated";

grant select on table "public"."family_notifications" to "authenticated";

grant trigger on table "public"."family_notifications" to "authenticated";

grant truncate on table "public"."family_notifications" to "authenticated";

grant update on table "public"."family_notifications" to "authenticated";

grant delete on table "public"."family_notifications" to "service_role";

grant insert on table "public"."family_notifications" to "service_role";

grant references on table "public"."family_notifications" to "service_role";

grant select on table "public"."family_notifications" to "service_role";

grant trigger on table "public"."family_notifications" to "service_role";

grant truncate on table "public"."family_notifications" to "service_role";

grant update on table "public"."family_notifications" to "service_role";

grant delete on table "public"."items" to "anon";

grant insert on table "public"."items" to "anon";

grant references on table "public"."items" to "anon";

grant select on table "public"."items" to "anon";

grant trigger on table "public"."items" to "anon";

grant truncate on table "public"."items" to "anon";

grant update on table "public"."items" to "anon";

grant delete on table "public"."items" to "authenticated";

grant insert on table "public"."items" to "authenticated";

grant references on table "public"."items" to "authenticated";

grant select on table "public"."items" to "authenticated";

grant trigger on table "public"."items" to "authenticated";

grant truncate on table "public"."items" to "authenticated";

grant update on table "public"."items" to "authenticated";

grant delete on table "public"."items" to "service_role";

grant insert on table "public"."items" to "service_role";

grant references on table "public"."items" to "service_role";

grant select on table "public"."items" to "service_role";

grant trigger on table "public"."items" to "service_role";

grant truncate on table "public"."items" to "service_role";

grant update on table "public"."items" to "service_role";

grant delete on table "public"."stores" to "anon";

grant insert on table "public"."stores" to "anon";

grant references on table "public"."stores" to "anon";

grant select on table "public"."stores" to "anon";

grant trigger on table "public"."stores" to "anon";

grant truncate on table "public"."stores" to "anon";

grant update on table "public"."stores" to "anon";

grant delete on table "public"."stores" to "authenticated";

grant insert on table "public"."stores" to "authenticated";

grant references on table "public"."stores" to "authenticated";

grant select on table "public"."stores" to "authenticated";

grant trigger on table "public"."stores" to "authenticated";

grant truncate on table "public"."stores" to "authenticated";

grant update on table "public"."stores" to "authenticated";

grant delete on table "public"."stores" to "service_role";

grant insert on table "public"."stores" to "service_role";

grant references on table "public"."stores" to "service_role";

grant select on table "public"."stores" to "service_role";

grant trigger on table "public"."stores" to "service_role";

grant truncate on table "public"."stores" to "service_role";

grant update on table "public"."stores" to "service_role";


