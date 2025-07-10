import { Dispatch, ReactElement, SetStateAction } from "react";
import {
  CalculateOrderRequest,
  CatalogImage,
  CatalogObject,
  Order,
  OrderLineItem,
} from "square";

declare global {
  interface Window {
    fbq: (...a) => void;
  }
}

export declare interface AppProps<T = HTMLElement> {
  className?: string;
  key?: React.Key;
  children?: React.ReactNode; // best, accepts everything React can render
  childrenElement?: React.JSX.Element; // A single React element
  style?: React.CSSProperties; // to pass through style props
  onClick?: React.MouseEventHandler<T>; // form events! the generic parameter is the type of event.target
  onChange?: React.FormEventHandler<HTMLInputElement>; // form events! the generic parameter is the type of event.target
  //  more info: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
  // props: Props & React.ComponentPropsWithoutRef<"button">; // to impersonate all the props of a button element and explicitly not forwarding its ref
  // props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>; // to impersonate all the props of MyButtonForwardedRef and explicitly forwarding its ref
}

export type CategoryTree = {
  [key: string]: {
    id: string;
    categoryList: CategoryTree[];
  };
};

export type SplitCategoryNameWithId = {
  id: string;
  category: string;
};

export type NavigationContextType = {
  accountNavigation: [
    AccountNavigation,
    Dispatch<SetStateAction<AccountNavigation>>,
  ];
  apparelNavigation: [
    ApparelNavigation,
    Dispatch<SetStateAction<ApparelNavigation>>,
  ];
  apparelCategories: CatalogObject[];
  handleNavigationChange: React.ChangeEventHandler<HTMLInputElement>;
};

export type PageProps<
  A = { [slug: string]: any },
  B = { [slug: string]: any },
> = {
  params: Promise<A>;
  searchParams: Promise<B>;
};

export type AccountNavigation = {
  activeIndex: number;
  formattedCategories: CategoryTree[];
  components: React.FC[];
  As: string;
  // onNavChange: e => onNavIndexChange(e.target.id),
};
export type ApparelNavigation = {
  activeIndex: number;
  unformattedCategories: CatalogObject[];
  formattedCategories: CategoryTree;
  currentCategoryId: string;
};

export type ICartContext = {
  cart: Order;
  options: CatalogObject[];
  cartItemImages: {
    [index: string]: CatalogImage;
  };
  mutators: {
    updateCart: ({
      lineItems,
      fieldsToClear,
      lineItemImageData,
    }: {
      lineItems?: OrderLineItem[];
      fieldsToClear?: string[];
      lineItemImageData?: { [id: string]: CatalogImage };
    }) => void;
    createCart: (
      catalogOrder: any,
      lineItemImageData?: CatalogImage,
      checkout?: boolean
    ) => void;
  };
  calculation: {
    subtotal: number;
    discounts: number;
    shipping: number;
    taxes: number;
    calculateCart: (req: CalculateOrderRequest) => void;
  };
  toggleCartOverlay?: [boolean, Dispatch<SetStateAction<boolean>>];
};

export type CheckoutContextType = {
  checkout: () => void;
  checkoutItem: (catalogObjectId: string, quantity: string) => void;
};

export type UIKitContextType = {
  // drawerKit: {
  //   open: boolean;
  // };
  // handleUIChange: ({ open }: { open: boolean }, e?: any) => void;
};

declare global {
  interface UserPrivateMetadata {
    squareId: string | undefined;
  }
}

export type ImageProps = Omit<
  JSX.IntrinsicElements["img"],
  "src" | "srcSet" | "ref" | "alt" | "width" | "height" | "loading"
> & {
  src?: string | null | StaticImport;
  alt: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  fill?: boolean;
  loader?: ImageLoader;
  quality?: number | `${number}`;
  priority?: boolean;
  loading?: LoadingValue;
  placeholder?: PlaceholderValue;
  blurDataURL?: string;
  unoptimized?: boolean;
  overrideSrc?: string;
  /**
   * @deprecated Use `onLoad` instead.
   * @see https://nextjs.org/docs/app/api-reference/components/image#onload
   */
  onLoadingComplete?: OnLoadingComplete;
  /**
   * @deprecated Use `fill` prop instead of `layout="fill"` or change import to `next/legacy/image`.
   * @see https://nextjs.org/docs/api-reference/next/legacy/image
   */
  layout?: string;
  /**
   * @deprecated Use `style` prop instead.
   */
  objectFit?: string;
  /**
   * @deprecated Use `style` prop instead.
   */
  objectPosition?: string;
  /**
   * @deprecated This prop does not do anything.
   */
  lazyBoundary?: string;
  /**
   * @deprecated This prop does not do anything.
   */
  lazyRoot?: string;
};

export type Modify<T, R> = Omit<T, keyof R> & R;

export type ContentImage = ImageProps | NonNullable<ReactElement>;
export type ContentVideo = {
  playback_id?: string
  src?: string
}
export type ContentData = {
  title: ReactElement | string | null;
  description?: ReactElement | string | null;
  headline?: ReactElement | string | null;
  social_media_handles?: unknown;
  form?: ReactElement;
  cta?: Omit<CtaEmailDocumentData, "slices">;
  link?: KeyTextField;
  linkLabel?: KeyTextField;
  last_publication_date?: string;
  price?: number | bigint | string;
};
export type Content = {
  image: ContentImage;
  video?: ContentVideo;
  content?: ContentData | ReactElement;
  contentStyles?: {
    classes?: string;
    content_alignment?: KeyTextField;
    text_content_position?: KeyTextField;
  };
};
