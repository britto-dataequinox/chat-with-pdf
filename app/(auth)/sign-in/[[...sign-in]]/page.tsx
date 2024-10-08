"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default function SignInPage() {
  return (
    <Box className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to-red-600">
      <Box className="bg-white mt-24 py-24 sm:py-32 rounded-md drop-shadow-xl">
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          px={2}
        >
          <Card
            variant="outlined"
            sx={{
              width: { xs: "100%", sm: "400px", xl: "50%" },
              height: { xs: "auto", sm: "auto", xl: "auto" },
              border: "2px solid",
              borderColor: "transparent",
              background: "linear-gradient(to bottom, red, white) border-box",
              backgroundClip: "padding-box, border-box",
              borderRadius: 2,
              p: 0,
              boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
              overflow: "hidden",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
                borderRadius: 2,
                padding: "2px",
                background: "inherit",
                mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "source-out",
                maskComposite: "subtract",
              },
            }}
          >
            <CardContent
              sx={{
                px: { xs: 2, sm: 4 },
                py: 4,
                background:
                  "linear-gradient(to bottom, rgba(255, 0, 0, 0.1), rgba(255, 255, 255, 0.1))",
              }}
            >
              <SignIn.Root>
                <SignIn.Step name="start">
                  <header className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 40 40"
                      className="mx-auto size-10"
                    >
                      <mask
                        id="a"
                        width="40"
                        height="40"
                        x="0"
                        y="0"
                        maskUnits="userSpaceOnUse"
                      >
                        <circle cx="20" cy="20" r="20" fill="#D9D9D9" />
                      </mask>
                      <g fill="black" mask="url(#a)">
                        <path d="M43.5 3a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V2ZM43.5 8a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V7ZM43.5 13a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 18a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 23a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 28a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 33a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 38a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1Z" />
                        <path d="M27 3.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 8.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM23 13.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM21.5 18.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM20.5 23.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM22.5 28.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 33.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM27 38.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2Z" />
                      </g>
                    </svg>
                    <Typography className="mt-4 text-xl font-medium tracking-tight text-black">
                      Sign in to Clover
                    </Typography>
                  </header>
                  <Clerk.GlobalError className="block text-sm text-red-400" />
                  <Box mt={4} className="space-y-2">
                    <Clerk.Connection
                      name="google"
                      className="flex w-full items-center justify-center gap-x-3 rounded-md bg-gradient-to-r from-red-600 to-red-800 px-3.5 py-1.5 text-sm font-medium text-white shadow-md hover:bg-gradient-to-r hover:from-red-700 hover:to-red-900 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-white active:bg-gradient-to-r active:from-red-900 active:to-black active:text-white/70"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 16"
                        className="w-4"
                        aria-hidden
                      >
                        <path
                          fill="currentColor"
                          d="M8.82 7.28v2.187h5.227c-.16 1.226-.57 2.124-1.192 2.755-.764.765-1.955 1.6-4.035 1.6-3.218 0-5.733-2.595-5.733-5.813 0-3.218 2.515-5.814 5.733-5.814 1.733 0 3.005.685 3.938 1.565l1.538-1.538C12.998.96 11.256 0 8.82 0 4.41 0 .705 3.591.705 8s3.706 8 8.115 8c2.382 0 4.178-.782 5.582-2.24 1.44-1.44 1.893-3.475 1.893-5.111 0-.507-.035-.978-.115-1.369H8.82Z"
                        />
                      </svg>
                      Login with Google
                    </Clerk.Connection>
                  </Box>
                </SignIn.Step>
              </SignIn.Root>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
