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
  <nav className="container flex flex-wrap py-6 mb-4">
    <div>
      <h1 className="font-bold text-white text-lg uppercase tracking-widest">
        Content Jazz
      </h1>
      <p className="text-gray-300 italic text-sm tracking-wide">
        by GraphCMS GmbH
      </p>
    </div>
    <div className="ml-auto w-1/2">
      <ul className="flex justify-between text-gray-200">
        {links.map(({ key, href, label }) => (
          <li key={key}>
            <Link href={href}>
              <a className="text-current">{label}</a>
            </Link>
          </li>
        ))}
        <li>
          <Link href="/">
            <a className="px-6 py-4 text-current rounded-full bg-darkgray-900 shadow-lg">
              Subscribe Now
            </a>
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Nav;
