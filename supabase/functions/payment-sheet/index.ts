// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { serve } from "https://deno.land/std@0.132.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@13.10.0?target=deno&deno-std=0.132.0&no-check';

// Initialize Stripe
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  httpClient: Stripe.createFetchHttpClient(),
});

serve(async (req) => {
  try {
    const { amount } = await req.json();

    // Validate amount
    if (!amount || isNaN(amount)) {
      throw new Error('Invalid amount');
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount || 1099, // Default to 10.99 USD if amount is not provided
      currency: 'usd',
    });

    const response = {
      client_secret: paymentIntent.client_secret,
      PUBLISHABLE_KEY: Deno.env.get('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
    };

    return new Response(
      JSON.stringify(response),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});




// To invoke locally:

  // 1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  // 2. Make an HTTP request:

  // curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/payment-sheet/payment-sheet' \
  //   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
  //   --header 'Content-Type: application/json' \
  //   --data '{"amount":1000}'

// answer if ok Info] Hello from Functions! + {"message":"Hello abdullah!"}%    
