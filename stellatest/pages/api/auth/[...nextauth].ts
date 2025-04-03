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
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        try {
          const res = await fetch(`https://devapi.surigaocity.gov.ph/api/account/auth/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          console.log(res);

          const user = await res.json();

          if (!res.ok) {
            throw new Error(`API responded with status ${res.status}`);
          }

          return {
            ...user.data.user,
            token: user.data.user.login.token,
            profile: user.data.profile,
            employee_info: user.data.employee_info,
          };
        } catch (error) {
          throw new Error("Authorization failed. Please try again.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.user = user;
        token.profile = user.profile;
        token.accessToken = user.token;
        token.employee_info = user.employee_info;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user = token.user;
        session.profile = token.profile;
        session.accessToken = token.accessToken;
        session.employee_info = token.employee_info;
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
