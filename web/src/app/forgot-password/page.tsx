"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForgotPasswordMutation } from "../../gql/graphql";
import { useRouter } from "next/navigation";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const formSchema = z.object({
  email: z.string(),
});

type FormFields = keyof z.infer<typeof formSchema>;

export default function Page() {
  const [forgotPassword, { data, loading, error }] =
    useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const response = await forgotPassword({
      variables: {
        email: values.email,
      },
      onCompleted: () => {
        setComplete(true);
      },
    });
  };

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-xl items-center justify-between font-mono text-sm">
        <h1 className="text-3xl mb-10">Forgotten Password Request</h1>
        {complete ? (
          <Alert className="mt-10">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Check your inbox!</AlertTitle>
            <AlertDescription>
              If an account is associated with this email, we've sent you a link
              to proceed.
            </AlertDescription>
          </Alert>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Forgot Password</Button>
            </form>
          </Form>
        )}
      </div>
    </main>
  );
}