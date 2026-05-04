import { IconType } from "react-icons";
import {
  FaSquareFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa6";

export type SocialMediaIcons = {
  facebook: IconType;
  instagram: IconType;
  youtube: IconType;
  tiktok: IconType;
  twitter: IconType;
};

export default {
  facebook: FaSquareFacebook,
  instagram: FaInstagram,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  twitter: FaTwitter,
} as SocialMediaIcons;
