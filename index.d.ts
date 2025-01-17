import { Dispatch, SetStateAction } from "react";
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

export type CartContextType = {
  cart: Order;
  options: CatalogObject[];
  cartItemImages: {
    [index: string]: CatalogImage;
  };
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
  calculateCart: (req: CalculateOrderRequest) => void;
  toggleCartOverlay: [boolean, Dispatch<SetStateAction<boolean>>];
};

export type CheckoutContextType = {
  checkout: () => void;
  checkoutItem: (catalogObjectId: string, quantity: string) => void;
};

export type UIKitContextType = {
  drawerKit: {
    open: boolean;
  };
  handleUIChange: ({ open }: { open: boolean }, e?: any) => void;
};

declare global {
  interface UserPrivateMetadata {
    squareId: string | undefined;
  }
}
