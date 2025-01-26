import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../../../utils/db";
import Member from "../../../../../models/Member";
import bcrypt from "bcryptjs";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;
                console.log("Authorization request:", { email, password, req });
                try {
                    await connectDB();

                    const member = await Member.findOne({ email });
                    if (!member) {
                        throw new Error("No user found with this email.");
                    }

                    const passwordMatch = await bcrypt.compare(password, member.password);
                    if (!passwordMatch) {
                        throw new Error("Invalid password.");
                    }

                    console.log("Authenticated Member:", member);
                    return member;
                } catch (error) {
                    console.error("Authentication error:", error.message);
                    throw new Error("Invalid email or password.");
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/Sections/authentication/register",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.studentid = user.studentid;
            }

            console.log("JWT Token:", token);
            return token;
        },
        async session({ session, token }) {
            session.user.studentid = token.studentid;
            console.log("Session Data:", session);
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
