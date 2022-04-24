import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import baseStylesheetUrl from "./styles/base.css";
import { getUser } from "./session.server";

import Nav from "app/components/nav";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: baseStylesheetUrl },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100;200;300;400;500;600;700;800;900&display=swap",
      rel: "stylesheet",
    },
    {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png",
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "John Mosesman",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="p-6 md:mx-auto md:max-w-2xl lg:max-w-6xl">
        <div className="mb-24 md:mb-36 lg:mb-24">
          <Nav />
        </div>

        <div className="mb-12 md:mb-24">
          <Outlet />
        </div>

        <Nav />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
