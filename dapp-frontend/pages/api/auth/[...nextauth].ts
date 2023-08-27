import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter" },
        password: { label: "Password", type: "password", placeholder: "Enter" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/signin`,
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        };

        const { data: response } = await axios.request(config);

        if (response.status === "success") {
          return response.data;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl + "/manage";
    },
  },

  pages: {
    signIn: "/auth/signIn",
    signOut: "/",
  },
});
