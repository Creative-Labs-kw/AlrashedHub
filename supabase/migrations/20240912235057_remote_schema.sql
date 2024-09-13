-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();


create policy "Allow upload product images 16wiy3a_0"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'product-images'::text));


create policy "Allow upload product images 16wiy3a_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check ((bucket_id = 'product-images'::text));


create policy "Anyone can upload an avatar."
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'avatars'::text));


create policy "Avatar images are publicly accessible."
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'avatars'::text));



