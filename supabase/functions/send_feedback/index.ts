import { z } from "https://deno.land/x/zod@v3.25/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const ContactSchema = z.object({
  from: z.string().email("Invalid email address").optional(),
  message: z
    .string()
    .min(10, "Message too short")
    .max(5000, "Message too long"),
});

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const result = ContactSchema.safeParse(body);

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error.format() }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { from, message } = result.data;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Campee <feedback@campee.app>",
        to: "hello@campee.app",
        subject: `New feedback`,
        reply_to: from,
        text: `From: ${from ?? "Undefined"}\n\nMessage:\n${message}`,
        html: `<strong>From:</strong> ${from ?? "Undefined"}<br><br><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}`,
      }),
    });

    if (!res.ok) {
      throw new Error("Email service error");
    }

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.log(error);

    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
};

Deno.serve(handler);
