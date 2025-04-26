"use client";
import { register, signin } from "@/lib/api";
import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "./Card";
import Button from "./Button";
import Input from "./Input";
import { delay } from "@/lib/async";

const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create an account",
  subheader: "Just some information to get you started",
  buttonText: "Register",
};

const signinContent = {
  linkUrl: "/register",
  linkText: "You don't have an account yet ?",
  header: "Happy to see you again !",
  subheader: "Enter your login details to access your account",
  buttonText: "Sign in",
};

const initial = { email: "", password: "", firstName: "", lastName: "" };

export default function AuthForm({ mode }) {

  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const router = useRouter();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true)
      try {
        if (mode === "register") {
          await register(formState);
        } else {
          await signin(formState)
        }
        setErrorMessage("")
        router.replace("/home");
        setFormState({ ...initial })
      }
      catch (e) {
        setError(`Could not ${mode}`);
        if (mode === "signin")
          setErrorMessage("Email or password undefined")
        if (mode === "register")
          setErrorMessage("Email already used")
      }
      setIsLoading(false)
    },
    [
      formState.email,
      formState.password,
      formState.firstName,
      formState.lastName,
    ]
  );

  const content = mode === "register" ? registerContent : signinContent;

  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className="pt-10 pb-5 w-full">
          {mode === "register" && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <Input
                  required
                  placeholder="Prénom"
                  value={formState.firstName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, firstName: e.target.value }))
                  }
                  disabled={isLoading ? true : false}
                />
              </div>
              <div className="pl-2">
                <Input
                  required
                  placeholder="Nom de famille"
                  value={formState.lastName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, lastName: e.target.value }))
                  }
                  disabled={isLoading ? true : false}
                />
              </div>
            </div>
          )}
          <p className="text-red-500">{errorMessage}</p>
          <div className="mb-8">
            <Input
              required
              type="email"
              placeholder="Email"
              value={formState.email}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
              disabled={isLoading ? true : false}
            />
          </div>
          <div className="mb-4">
            <Input
              required
              value={formState.password}
              type="password"
              placeholder="Mot de passe"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, password: e.target.value }))
              }
              disabled={isLoading ? true : false}
            />
          </div>
          <div className="flex items-center justify-between flex-col">
            <div className="mb-10">
              <span>
                <Link
                  href={content.linkUrl}
                  className="text-blue-600 font-bold hover:underline"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" intent={isLoading ? "loading" : "secondary"} disabled={isLoading ? true : false}>
                {isLoading ? "Loading" : content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}