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

                console.log(req)
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

                    // Logging member data to check that studentID is correct
                    console.log("Member Data:", member);

                    return member

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
            // If user exists, add studentID to the token
            if (user) {
                token.studentid = user.studentid;
            }

            // Log token to verify studentID is added
            console.log("JWT Token:", token);

            return token;
        },
        async session({ session, token }) {
            // Add studentID from token to session
            session.user.studentid = token.studentid;

            // Log session data to verify studentID is available
            console.log("Session Data:", session);

            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
