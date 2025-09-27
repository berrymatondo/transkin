    import React from "react";
    import { Button } from "../ui/button";
    import { auth } from "@/lib/auth";
    import { headers } from "next/headers";
    import { redirect } from "next/navigation";
    import { LogOut } from "lucide-react";

    const SignoutForm = () => {
    return (
        <div>
        <form>
            <Button
            className="flex items-center gap-2 w-full"
            formAction={async () => {
                "use server";
                // Implement logout logic here
                // For example, clear the session or token
                await auth.api.signOut({
                headers: await headers(),
                });
                redirect("/auth/signin");
            }}
            >
            <LogOut className="size-6 mr-2" />
            Logout
            </Button>
        </form>
        </div>
    );
    };

    export default SignoutForm;
