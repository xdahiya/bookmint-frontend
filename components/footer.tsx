import Image from "next/image";
import Link from "next/link";

import React from "react";

const LINKS = {
  youtube: "https://youtube.com/@nftspace8556?si=McKfKrF_LrtQj6jI",
  twitter: "https://x.com/NFTSpace__?t=KO-I2e0lXHeCVSRjDK1wag&s=09",
  discord: "https://discord.com",
  telegram: "https://t.me/nftspaceHQ",
  instagram:
    "https://www.instagram.com/nftspace_gallery/?igsh=NWtvd3NtZ2pyNWQx",
  facebook: "https://facebook.com/people/NFT-SPACE/100083331393168/",
};

export const Footer = () => {
  return (
    <>
      <div className="m-4 bg-[url('/bg-pattern2.png')] bg-no-repeat bg-bottom bg-contain lg:bg-cover bg-fixed">
        <div className="relative isolate overflow-hidden  px-6 py-24 shadow-md rounded-2xl sm:rounded-3xl sm:px-24 xl:py-32">
          <h2 className="mx-auto max-w-4xl text-center text-3xl font-bold tracking-tight sm:text-3xl">
            Join the NFTSPACE Community & Connect With Collectors & Creators
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 ">
            At NFTspace, we believe in the power of collaboration with diverse
            communities. We invite artists, traders, gamers, and investors
            through connections, knowledge sharing, and market insights that
            enhance the value and utility of assets traded on our platform.
          </p>
          <form className="mx-auto mt-10 flex max-w-md gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2  shadow-sm ring-1  ring-inset focus:outline-[#ffb701] ring-[#18977F] sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="flex-none rounded-md  px-3.5 py-2.5 text-sm font-semibold  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#18977F]"
            >
              Notify me
            </button>
          </form>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            ></circle>
            <defs>
              <radialGradient
                id="759c1415-0410-454c-8f7c-9a820de03641"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                <stop stopColor="#18977F" />
                <stop offset={1} stopColor="#189597" stopOpacity={0} />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="relative mt-8  bg-[url('/bg-pattern.png')] bg-no-repeat bg-bottom bg-contain lg:bg-cover bg-fixed">
        <svg
          className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-deep-purple-accent-400"
          preserveAspectRatio="none"
          viewBox="0 0 1440 54"
        >
          {/* <path
            fill="currentColor"
            d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
          /> */}
        </svg>
        <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
            <div className="md:max-w-md lg:col-span-2">
              <Link
                href="/"
                className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
              >
                <Image
                  width={250}
                  height={50}
                  src="/logo.png"
                  className="h-16"
                  alt="Flowbite Logo"
                />
                {/* <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                  NFTSpace
                </span> */}
              </Link>
              <div className="mt-4 lg:max-w-sm">
                <p className="text-lg text-deep-purple-50">
                  Our mission is to revolutionize the way the world experiences
                  digital art by leveraging cutting-edge AI technology and
                  embracing the boundless possibilities of non-fungible tokens
                  (NFTs).
                </p>
                {/* <p className="mt-4 text-sm text-deep-purple-50">
                  Eaque ipsa quae ab illo inventore veritatis et quasi
                  architecto beatae vitae dicta sunt explicabo.
                </p> */}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
              <div>
                <p className="font-semibold tracking-wide text-primary">
                  Maketplace
                </p>
                <ul className="mt-2 space-y-2">
                  <li>
                    <a
                      href="/"
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      Art
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      Domain Names
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      Gaming
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      Membership
                    </a>
                  </li>

                  <li>
                    <a
                      href="/marketplace"
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      Virtual Worlds
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about-us"
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      Sports Collectibles
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      PFPs
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold tracking-wide text-primary">Info</p>
                <ul className="mt-2 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      AI
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about-us"
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      Metaverse
                    </a>
                  </li>
                  <li>
                    <a
                      href="/roadmap"
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      Roadmap
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      Whitepaper
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      Blogs
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold tracking-wide text-primary">Help</p>
                <ul className="mt-2 space-y-2">
                  <li>
                    <a
                      href="/faq"
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      Faq
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact-us"
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>

                <a
                  href="mailto:info@nftspace.gallery"
                  className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400 "
                >
                  <div className="pt-20">Support</div>
                  <div className="text-primary ">Info@nftspace.gallery</div>
                </a>
              </div>
              <div>
                <p className="font-semibold tracking-wide text-primary">
                  Social Media
                </p>
                <ul className="mt-2 space-y-2">
                  <li>
                    <a
                      href={LINKS.youtube}
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      Youtube
                    </a>
                  </li>
                  <li>
                    <a
                      href={LINKS.twitter}
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href={LINKS.facebook}
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href={LINKS.instagram}
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href={LINKS.telegram}
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      Telegram
                    </a>
                  </li>
                  <li>
                    <a
                      href={LINKS.discord}
                      className="transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400"
                    >
                      Discord
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between pt-5 pb-10 border-t border-deep-purple-accent-200 sm:flex-row">
            <p className="text-sm">
              © Copyright 2024 NFTSpace. All rights reserved.
            </p>
            <div className="flex items-center mt-4 space-x-4 sm:mt-0">
              <a
                href={LINKS.twitter}
                className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                </svg>
              </a>
              <a
                href={LINKS.youtube}
                className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
              >
                <svg viewBox="0 0 30 30" fill="currentColor" className="h-5">
                  <path d="M 15 4 C 10.814 4 5.3808594 5.0488281 5.3808594 5.0488281 L 5.3671875 5.0644531 C 3.4606632 5.3693645 2 7.0076245 2 9 L 2 15 L 2 15.001953 L 2 21 L 2 21.001953 A 4 4 0 0 0 5.3769531 24.945312 L 5.3808594 24.951172 C 5.3808594 24.951172 10.814 26.001953 15 26.001953 C 19.186 26.001953 24.619141 24.951172 24.619141 24.951172 L 24.621094 24.949219 A 4 4 0 0 0 28 21.001953 L 28 21 L 28 15.001953 L 28 15 L 28 9 A 4 4 0 0 0 24.623047 5.0546875 L 24.619141 5.0488281 C 24.619141 5.0488281 19.186 4 15 4 z M 12 10.398438 L 20 15 L 12 19.601562 L 12 10.398438 z"></path>
                </svg>
              </a>
              <a
                href={LINKS.instagram}
                className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
              >
                <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                  <circle cx="15" cy="15" r="4" />
                  <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                </svg>
              </a>
              <a
                href={LINKS.facebook}
                className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                </svg>
              </a>
              <a
                href={LINKS.discord}
                className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
              >
                <svg viewBox="0 0 48 48" fill="currentColor" className="h-6">
                  <path d="M 41.625 10.769531 C 37.644531 7.566406 31.347656 7.023438 31.078125 7.003906 C 30.660156 6.96875 30.261719 7.203125 30.089844 7.589844 C 30.074219 7.613281 29.9375 7.929688 29.785156 8.421875 C 32.417969 8.867188 35.652344 9.761719 38.578125 11.578125 C 39.046875 11.867188 39.191406 12.484375 38.902344 12.953125 C 38.710938 13.261719 38.386719 13.429688 38.050781 13.429688 C 37.871094 13.429688 37.6875 13.378906 37.523438 13.277344 C 32.492188 10.15625 26.210938 10 25 10 C 23.789063 10 17.503906 10.15625 12.476563 13.277344 C 12.007813 13.570313 11.390625 13.425781 11.101563 12.957031 C 10.808594 12.484375 10.953125 11.871094 11.421875 11.578125 C 14.347656 9.765625 17.582031 8.867188 20.214844 8.425781 C 20.0625 7.929688 19.925781 7.617188 19.914063 7.589844 C 19.738281 7.203125 19.34375 6.960938 18.921875 7.003906 C 18.652344 7.023438 12.355469 7.566406 8.320313 10.8125 C 6.214844 12.761719 2 24.152344 2 34 C 2 34.175781 2.046875 34.34375 2.132813 34.496094 C 5.039063 39.605469 12.972656 40.941406 14.78125 41 C 14.789063 41 14.800781 41 14.8125 41 C 15.132813 41 15.433594 40.847656 15.621094 40.589844 L 17.449219 38.074219 C 12.515625 36.800781 9.996094 34.636719 9.851563 34.507813 C 9.4375 34.144531 9.398438 33.511719 9.765625 33.097656 C 10.128906 32.683594 10.761719 32.644531 11.175781 33.007813 C 11.234375 33.0625 15.875 37 25 37 C 34.140625 37 38.78125 33.046875 38.828125 33.007813 C 39.242188 32.648438 39.871094 32.683594 40.238281 33.101563 C 40.601563 33.515625 40.5625 34.144531 40.148438 34.507813 C 40.003906 34.636719 37.484375 36.800781 32.550781 38.074219 L 34.378906 40.589844 C 34.566406 40.847656 34.867188 41 35.1875 41 C 35.199219 41 35.210938 41 35.21875 41 C 37.027344 40.941406 44.960938 39.605469 47.867188 34.496094 C 47.953125 34.34375 48 34.175781 48 34 C 48 24.152344 43.785156 12.761719 41.625 10.769531 Z M 18.5 30 C 16.566406 30 15 28.210938 15 26 C 15 23.789063 16.566406 22 18.5 22 C 20.433594 22 22 23.789063 22 26 C 22 28.210938 20.433594 30 18.5 30 Z M 31.5 30 C 29.566406 30 28 28.210938 28 26 C 28 23.789063 29.566406 22 31.5 22 C 33.433594 22 35 23.789063 35 26 C 35 28.210938 33.433594 30 31.5 30 Z"></path>
                </svg>
              </a>
              <a
                href={LINKS.telegram}
                className="transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400"
              >
                <svg viewBox="0 0 48 48" fill="currentColor" className="h-6">
                  <path d="M46.137,6.552c-0.75,-0.636 -1.928,-0.727 -3.146,-0.238h-0.002c-1.281,0.514 -36.261,15.518 -37.685,16.131c-0.259,0.09 -2.521,0.934 -2.288,2.814c0.208,1.695 2.026,2.397 2.248,2.478l8.893,3.045c0.59,1.964 2.765,9.21 3.246,10.758c0.3,0.965 0.789,2.233 1.646,2.494c0.752,0.29 1.5,0.025 1.984,-0.355l5.437,-5.043l8.777,6.845l0.209,0.125c0.596,0.264 1.167,0.396 1.712,0.396c0.421,0 0.825,-0.079 1.211,-0.237c1.315,-0.54 1.841,-1.793 1.896,-1.935l6.556,-34.077c0.4,-1.82 -0.156,-2.746 -0.694,-3.201zM22,32l-3,8l-3,-10l23,-17z"></path>
                </svg>
              </a>
            </div>
            <div className="flex items-center mt-4 space-x-4 sm:mt-0">
              <Link href={"/privacy-policy"}>Privacy Policy</Link>
              <Link href={"/terms-of-service"}>Terms Of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
