import { Lato } from "next/font/google";

export const latoRegular = Lato({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const latoHeavy = Lato({
  weight: "700",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "auto",
});

export const latoBlack = Lato({
  weight: "900",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "auto",
});

export const latoThin = Lato({
  weight: "100",
  style: ["normal", "italic",],
  subsets: ["latin", ],
  display: "swap",
});

export const latoLight = Lato({
  weight: "300",
  style: ["normal", "italic",],
  subsets: ["latin", ],
  display: "swap",
});
