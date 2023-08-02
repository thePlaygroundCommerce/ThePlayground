import HeaderNavigation from "./HeaderNavigation";
import HeaderActions from "./HeaderActions";
import Link from "next/link";

function Header() {
  return (
    <div className="flex justify-between content-center w-full px-8 py-6">
      <div className="flex align-items">
        <Link href="/">SWaNK</Link>
      </div>
      <HeaderNavigation />
      <HeaderActions />
      {/* <Overlay target={ref.current} show={show} placement="bottom">
        {(props) => (
          <div
            {...props}
            style={{
              position: "absolute",
              width: "30rem",
              borderRadius: 3,
              ...props.style,
            }}
            className="border p-3 bg-white"
          >
            {renderOverlay()}
          </div>
        )}
      </Overlay> */}
    </div>
  );
}

export default Header;
