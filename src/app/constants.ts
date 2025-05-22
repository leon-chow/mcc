export const DATA_URL = "https://maplestory.io/api/";
export const NAV_LINKS: INavLink[] = [
  {
    title: "Home",
    url: "/"
  },
  {
    title: "Scroll Probability",
    url: "/scroll-probability",
  },
  {
    title: "Grinding",
    url: "/grinding"
  },
  {
    title: "Events",
    url: "/events",
  },
  {
    title: "Accuracy Calculator",
    url: "/accuracy"
  },
  {
    title: "Music",
    url: "/music",
  }
]

export interface INavLink {
  title: string,
  url: string,
}
 