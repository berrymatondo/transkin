"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";

const signinFormSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty("Le mot de passe est requis"),
});

export default function SigninForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signinFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    await signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push("/auth");
          router.refresh();
        },
        onError: (error) => {
          toast.error(error?.error?.message);
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-6"
      >
        {/*         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <>
                    <Input
                      type="email"
                      className="pl-10 py-3 text-base bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transform transition-all duration-300 hover:bg-white/15"
                      placeholder="Adresse email"
                      {...field}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-200" />
                    </div>
                  </>
                </FormControl>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              {/*               <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="" {...field} />
                      </FormControl> */}

              <div className="relative">
                <FormControl>
                  <>
                    <Input
                      type="password"
                      className="pl-10 py-3 text-base bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transform transition-all duration-300 hover:bg-white/15"
                      placeholder="Mot de passe"
                      {...field}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-200" />
                    </div>
                  </>
                </FormControl>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Forgot Password */}
        <div className="text-right">
          <Link
            href="#"
            className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors duration-200"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        {/* Login Button */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300 animate-pulse"></div>
          <Button
            type="submit"
            className="relative w-full bg-yellow-400/90 backdrop-blur-md hover:bg-yellow-300/95 text-slate-900 font-semibold py-3 text-lg rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/20 active:scale-95 border border-transparent"
            size="lg"
          >
            Se connecter
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center text-gray-200">
          Vous n'avez pas de compte ?{" "}
          <Link
            href="/auth/signup"
            className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-200"
          >
            S'inscrire
          </Link>
        </div>
      </form>
    </Form>
  );
}
