/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env";
import type { NextConfig } from "next";

/** @type {import("next").NextConfig} */
const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "62966vzr5x.ufs.sh",
        port: "",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
      },
    ],
  },
};

export default config;
