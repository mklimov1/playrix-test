import PROJECT_DATA from "../model/project";

const { links } = PROJECT_DATA;

const getOS = () => {
  const { userAgent } = window.navigator;
  const { platform } = window.navigator;
  const macosPlatforms = [`Macintosh`, `MacIntel`, `MacPPC`, `Mac68K`];
  const windowsPlatforms = [`Win32`, `Win64`, `Windows`, `WinCE`];
  const iosPlatforms = [`iPhone`, `iPad`, `iPod`];
  let os = `Android`;

  if (/Android/.test(userAgent)) {
    os = `Android`;
  } else if (macosPlatforms.indexOf(platform) !== -1) {
    os = `Mac OS`;
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = `iOS`;
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = `Windows`;
  } else if (!os && /Linux/.test(platform)) {
    os = `Linux`;
  }

  return os;
};

export const toStore = () => {
  const linkMap = {
    'Mac OS': links.ios,
    iOS: links.ios,
    Windows: links.ms,
    Android: links.gp,
    Linux: links.gp,
  };
  const os = getOS();
  const link = linkMap[os] || links.gp;

  window.open(link);
};
