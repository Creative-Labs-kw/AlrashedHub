# AlrashedHub

-backend:

- you can got to auth / providers to change the protection like send email to verify the user
- in table editor (public) your tables
- SQL editor have ready code (User Management starts) this will connect the user table with the auth table
- database > schema visualizer TO see in mind map
- is then filed not NULL is required
- in database > Tables to make new table
- ex: price type in db is float4
- to add to the table rows > table editor new row
- the Policies auto nobody can do nothing
- to change the Policies to users to use CRUD og to > table Editor>click on the table > view Policies
- to check ready API function , go to Table in the site > API
- after finish the tables in DB you can Download the types from the site OR in CLI 0454 in video
- # by running the same code in terminal after changing table update the type file
- use the Chain icon in the nre Table to make relationships
- you can able the real time in TAbler editor inside a table chosen(after unable the real time you cn get example from the API in the table) (don't forget to add policies)
- npx supabase init (make supabase init to use it in doker)
- use `npx supabase status` to get all the URL Needed to do locally
- to use the local DB change the .env keys
- if you want to local supabase you have to add trigger in (databases , auth) then added the trigger to migrations

<!-- stripe 6:45 in video -->
- make account
- test mode
- get 2 keys
- create payment intend in server side using Edge Functions from supabase better in local first 
- `npx supabase functions new payment-sheet`
- locally use this to connect to stripe(`npx supabase functions serve --env-file .env payment-sheet`) (this for running the other one for testing the func)
-   ` curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/payment-sheet/payment-sheet' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"abdullah"} `
    - if all ok: `// answer if ok Info] Hello from Functions! + {"message":"Hello abdullah!"}%  `

# TO Deploy a need thing to the backend(Supabase) ` npx supabase functions deploy payment-sheet ` or name of the function - to check go to the production DB and in Edge functions and sse it
- in payment service they mostly have a way to show the card pay data `https://docs.expo.dev/versions/latest/sdk/stripe/`