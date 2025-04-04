import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { getDjangoApiHost } from "@/functions/env";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("authorize starting 1");
        if (!credentials) {
          console.log("authorize starting 2");
          throw new Error("Missing credentials");
        }

        console.log("authorize starting 3");
        try {
          console.log("authorize starting 4");
          const res = await fetch(`${getDjangoApiHost()}/api/account/auth/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          console.log("authorize starting 5");

          const user = await res.json();

          console.log("authorize starting 6");

          if (!res.ok) {
            console.log("authorize starting 7");
            throw new Error(`API responded with status ${res.status}`);
          }

          console.log("authorize starting 8");
          return {
            ...user.data.user,
            token: user.data.user.login.token,
            profile: user.data.profile,
            employee_info: user.data.employee_info,
          };
        } catch (error) {
          console.log("authorize starting 9");
          throw new Error("Authorization failed. Please try again.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      console.log("callback jwt 1");
      if (user) {
        token.user = user;
        token.profile = user.profile;
        token.accessToken = user.token;
        token.employee_info = user.employee_info;
        console.log("callback jwt 2");
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      console.log("callback session 1");
      if (token) {
        session.user = token.user;
        session.profile = token.profile;
        session.accessToken = token.accessToken;
        session.employee_info = token.employee_info;
        console.log("callback session 2");
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signOut: "/login",
    signIn: "/login",
  },
  debug: true,
};

export default function authHandler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions);
}
