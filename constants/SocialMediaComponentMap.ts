import { IconType } from "react-icons";
import {
  BsFacebook,
  BsInstagram,
  BsYoutube,
  BsTiktok,
  BsTwitter,
} from "react-icons/bs";

export type SocialMediaIcons = {
  facebook: IconType;
  instagram: IconType;
  youtube: IconType;
  tiktok: IconType;
  twitter: IconType;
};

export default {
  facebook: BsFacebook,
  instagram: BsInstagram,
  youtube: BsYoutube,
  tiktok: BsTiktok,
  twitter: BsTwitter,
} as SocialMediaIcons;
