const filePathUrl = (fileName) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`;

const transitLogos = [
  { label: "MTA NYC", src: filePathUrl("MTA_NYC_logo.svg") },
  { label: "MBTA", src: filePathUrl("MBTA.svg") },
  { label: "BART", src: filePathUrl("Bart-logo.svg") },
  {
    label: "CTA",
    src: filePathUrl("Chicago_Transit_Authority_Logo.svg"),
  },
  { label: "WMATA", src: filePathUrl("WMATA_Metro_Logo.svg") },
  { label: "SEPTA", src: filePathUrl("SEPTA_Metro.svg") },
  { label: "Sound Transit", src: filePathUrl("Sound_Transit_logo.svg") },
  { label: "TriMet", src: filePathUrl("Trimet_logo.svg") },
  {
    label: "MARTA",
    src: filePathUrl(
      "Logo_of_the_Metropolitan_Atlanta_Rapid_Transit_Authority.svg",
    ),
  },
  {
    label: "DART",
    src: filePathUrl("Dallas_Area_Rapid_Transit_logo.svg"),
  },
];

const interstateLogos = [
  { label: "I-5", src: filePathUrl("I-5.svg") },
  { label: "I-10", src: filePathUrl("I-10.svg") },
  { label: "I-20", src: filePathUrl("I-20.svg") },
  { label: "I-35", src: filePathUrl("I-35.svg") },
  { label: "I-40", src: filePathUrl("I-40.svg") },
  { label: "I-45", src: filePathUrl("I-45.svg") },
  { label: "I-70", src: filePathUrl("I-70.svg") },
  { label: "I-75", src: filePathUrl("I-75.svg") },
  { label: "I-80", src: filePathUrl("I-80.svg") },
  { label: "I-90", src: filePathUrl("I-90.svg") },
  { label: "I-95", src: filePathUrl("I-95.svg") },
];

export const logoTickerItems = [...transitLogos, ...interstateLogos];
