import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    // GitHubProvider({
    //   profile(profile) {
    //     console.log("Profile GitHub: ", profile);

    //     let userRole = "GitHub User";
    //     if (profile?.email == "jake@claritycoders.com") {
    //       userRole = "admin";
    //     }

    //     return {
    //       ...profile,
    //       role: userRole,
    //     };
    //   },
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_Secret,
    // }),
    // GoogleProvider({
    //   profile(profile) {
    //     console.log("Profile Google: ", profile);

    //     let userRole = "Google User";
    //     return {
    //       ...profile,
    //       id: profile.sub,
    //       role: userRole,
    //     };
    //   },
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    CredentialsProvider({
      name: "account",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        try {
          // const foundUser = await User.findOne({ email: credentials.email })
          //   .lean()
          //   .exec();
          // if (foundUser) {
          //   console.log("User Exists");
          //   const match = await bcrypt.compare(
          //     credentials.password,
          //     foundUser.password
          //   );

          const user = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_HOST}${
              process.env.API_LOGIN
            }`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                // email: "marketing@yuada.com",
                // password: "M2u3a20ar11",
                email: credentials.email,
                password: credentials.password,
              }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                console.log("iniiiii dataaa : ", data.data.user.name);
                // return {
                //   email: "budi@gmail.com",
                //   role: JSON.stringify(data.success.token),
                // };
                // return data.data;
                return {
                  id: "42",
                  name: data.data.user.name,
                  password: "nextauth",
                  role: data.data.permissions,
                  token: data.data.token,
                };
              }
            });

          return user;
          // if (match) {
          console.log("Good Pass");
          // delete foundUser.password;
          // const user = {
          //   id: "42",
          //   name: "Dave",
          //   password: "nextauth",
          //   role: "manager",
          // };
          // return user;
          // foundUser["role"] = ;

          // }
          // }
        } catch (error) {
          console.log("ini error ", error);
        }
        return null;
      },
    }),
  ],
  // pages: {
  //   signIn: "/auth/signin",
  // },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      session.user.token = token.token;
      return session;
    },
  },
};
