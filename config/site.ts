export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "",
      href: "/",
    },
    {
      label: "Home",
      href: "/Home",
    },

    {
      label: "Downlaod",
      href: "/downlaod",
    },
  
    {
      label: "Signup",
      href: "/signup",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/Home",
    },
    {
      label:"Downlaod",
      href: "/downlaod",
    },
   
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
