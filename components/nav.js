import React from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Episodes" },
  { href: "/", label: "About" },
  { href: "/", label: "Newsletter" },
  { href: "/", label: "Resources" }
].map(link => ({
  ...link,
  key: `nav-link-${link.href}-${link.label}`
}));

const Nav = () => (
  <div className="">
    <div className="w-full h-2 main-gradient mb-4" />
    <nav className="container flex flex-wrap px-4 md:px-0 py-6 mb-4">
      <div className="w-full md:w-auto">
        <h1 className="font-bold text-white text-lg uppercase tracking-widest">
          Content Jazz
        </h1>
        <p className="text-gray-300 italic text-sm tracking-wide">
          by GraphCMS GmbH
        </p>
      </div>
      <div className="lg:ml-auto lg:w-1/2">
        <ul className="flex justify-between text-gray-200">
          {links.map(({ key, href, label }) => (
            <li key={key} className="w-full lg:w-auto">
              <Link href={href}>
                <a className="text-current">{label}</a>
              </Link>
            </li>
          ))}
          <li className="block lg:inline-block w-full lg:w-auto">
            <Link href="/">
              <a className="px-6 py-4 text-current rounded-full bg-darkgray-900 hover:shadow-xl shadow-lg transform animate hover:-translate-x-2">
                Subscribe Now
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Nav;
