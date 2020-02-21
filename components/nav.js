import React, { useState, useContext } from "react";
import Link from "next/link";
import { NewsletterContext } from "../context/NewsletterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";

const LogoBlock = ({ toggleMenu }) => {
  const onClick = e => {
    e.preventDefault();
    toggleMenu(previous => !previous);
  };

  return (
    <div className="flex w-full text-gray-300 md:w-auto">
      <div>
        <h1 className="text-lg font-bold tracking-widest text-white uppercase">
          Content Jazz
        </h1>
        <p className="text-sm italic tracking-wide text-current">
          by GraphCMS GmbH
        </p>
      </div>
      <div className="visible ml-auto md:invisible">
        <button onClick={onClick}>
          <FontAwesomeIcon icon={faHamburger} width="24" />
        </button>
      </div>
    </div>
  );
};

const MenuBlock = ({ menuIsOpen }) => {
  const { toggleSubscriberBox } = useContext(NewsletterContext);
  const links = [
    { href: "/", label: "Episodes" },
    { href: "/about", label: "About" },
    { href: "/newsletter", label: "Newsletter" },
    { href: "/resources", label: "Resources" }
  ].map(link => ({
    ...link,
    key: `nav-link-${link.href}-${link.label}`
  }));

  return (
    <div className="flex flex-wrap w-full text-gray-200 md:ml-auto md:w-1/2">
      <ul
        className={`flex flex-wrap justify-around flex-grow items-center bg-darkgray-800 md:bg-transparent -mx-8 md:mx-0 px-8 md:px-0 my-4 md:my-0 w-full md:w-auto ${
          menuIsOpen ? "" : "h-0 overflow-hidden md:overflow-auto md:h-auto"
        }`}
      >
        {links.map(({ key, href, label }) => (
          <li key={key} className="w-full py-2 md:w-auto md:py-auto">
            <Link href={href}>
              <a className="text-current">{label}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button
        onClick={() => toggleSubscriberBox(true)}
        className="px-6 py-4 transform rounded-full shadow-lg text-current bg-darkgray-900 hover:shadow-xl animate hover:-translate-y-2 md:ml-auto"
      >
        Subscribe Now
      </button>
    </div>
  );
};

const Nav = () => {
  const [menuIsOpen, toggleMenu] = useState(false);

  return (
    <div className="">
      <div className="w-full h-2 mb-4 main-gradient" />
      <nav className="container flex flex-wrap py-6 mb-4">
        <LogoBlock toggleMenu={toggleMenu} />
        <MenuBlock menuIsOpen={menuIsOpen} />
      </nav>
    </div>
  );
};

export default Nav;
