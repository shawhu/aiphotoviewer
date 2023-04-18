// log the pageview with their URL
export const pageview = (url: any) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", "G-VWC01FW6XV", {
      page_path: url,
    });
  }
};

// log specific events happening.
export const event = ({ action, params }: any) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, params);
  }
};
