import { DocsConfig } from "@/types";

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Marketplace",
      href: "/marketplace",
    },

    // {
    //   title: "About-Us",
    //   href: "/about-us",
    // },

    // {
    //   title: "Whitepaper",
    //   href: "#",
    // },

    // {
    //   title: "Faq's",
    //   href: "/faq",
    // },
    // {
    //   title: "Contact Us",
    //   href: "/contact-us",
    // },

    // {
    //   title: "Signinin",
    //   href: "/auth/signin",
    // },
    // {
    //   title: "Singup",
    //   href: "/auth/signup",
    // },
    // {
    //   title: "Pricing",
    //   href: "/pricing",
    // },
    // {
    //   title: "About",
    //   href: "/about",
    // },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
      ],
    },
    {
      title: "Documentation",
      items: [
        {
          title: "Introduction",
          href: "/docs/documentation",
        },
        {
          title: "Contentlayer",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Components",
          href: "/docs/documentation/components",
        },
        {
          title: "Code Blocks",
          href: "/docs/documentation/code-blocks",
        },
        {
          title: "Style Guide",
          href: "/docs/documentation/style-guide",
        },
        {
          title: "Search",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
    {
      title: "Blog",
      items: [
        {
          title: "Introduction",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Build your own",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Writing Posts",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
    {
      title: "Dashboard",
      items: [
        {
          title: "Introduction",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Layouts",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Server Components",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Authentication",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Database with Prisma",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "API Routes",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
    {
      title: "Marketing Site",
      items: [
        {
          title: "Introduction",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "File Structure",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Tailwind CSS",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Typography",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
  ],
};

export const allCategories: any = [
  {
    name: "Education",
    value: "education",
    url: "/marketplace?category=education",
    image: "/green_logo.png",
  },
  {
    name: "Science",
    value: "science",
    url: "/marketplace?category=science",
    image: "/green_logo.png",
  },
  {
    name: "Literature",
    value: "literature",
    url: "/marketplace?category=literature",
    image: "/green_logo.png",
  },
  {
    name: "Fantacy",
    value: "fantcy",
    url: "/marketplace?category=fantcy",
    image: "/green_logo.png",
  },
  {
    name: "Mystery",
    value: "mystery",
    url: "/marketplace?category=mystery",
    image: "/green_logo.png",
  },
  {
    name: "Cultural",
    value: "cultural",
    url: "/marketplace?category=cultural",
    image: "/green_logo.png",
  },
  {
    name: "Historical",
    value: "historical",
    url: "/marketplace?category=historical",
    image: "/green_logo.png",
  },
];
