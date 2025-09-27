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
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lock, Mail, Phone, User } from "lucide-react";

const signupFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(50, "Le nom ne peut pas dépasser 50 caractères")
      .trim(),

    email: z.string().email("Adresse email invalide").toLowerCase().trim(),

    phone: z
      .string()
      .regex(/^(\+?\d{1,3})?[ .-]?\d{6,14}$/, "Numéro de téléphone invalide")
      .optional()
      .or(z.literal("")), // permet de laisser vide si facultatif

    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
      .regex(
        /[@$!%*?&]/,
        "Le mot de passe doit contenir au moins un caractère spécial (@$!%*?&)"
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export default function SignupForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    await signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              {/*               <FormLabel>Name</FormLabel>
               */}{" "}
              <div className="relative">
                <FormControl>
                  <>
                    <Input
                      className="pl-10 py-3 text-base bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transform transition-all duration-300 hover:bg-white/15"
                      placeholder="Nom complet"
                      {...field}
                    />{" "}
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-200" />
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
          name="email"
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
          name="phone"
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
                      type="tel"
                      className="pl-10 py-3 text-base bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transform transition-all duration-300 hover:bg-white/15"
                      placeholder="Numéro de téléphone"
                      {...field}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-200" />
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

        <FormField
          control={form.control}
          name="confirmPassword"
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
                      placeholder="Confirmer le mot de passe"
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

        {/*         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button
          className="relative w-full bg-yellow-400/90 backdrop-blur-md hover:bg-yellow-300/95 text-slate-900 font-semibold py-3 text-lg rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/20 active:scale-95 border border-transparent"
          size="lg"
          type="submit"
        >
          S'inscrire
        </Button>
      </form>
    </Form>
  );
}
