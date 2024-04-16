import { Menu } from "@headlessui/react";

const DropdownMenu = () => {
  return (
    <div>
      <Menu>
        <Menu.Button>More</Menu.Button>
        <Menu.Items>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${active && "bg-blue-500"}`}
                href="/account-settings"
              >
                Account settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${active && "bg-blue-500"}`}
                href="/account-settings"
              >
                Documentation
              </a>
            )}
          </Menu.Item>
          <Menu.Item disabled>
            <span className="opacity-75">Invite a friend (coming soon!)</span>
          </Menu.Item>
        </Menu.Items>
      </Menu>
      {/* <Dropdownbutton
              variant="secondary"
              id="dropdown-basic-button"
              title={variations[
                activeVariationIndex
              ].itemVariationData.name[0].toUpperCase()}
            >
              {variations.map(({ id, itemVariationData }, i) => (
                <Dropdown.Item
                  onClick={handleDropDownbuttonChange}
                  name={i}
                  key={id}
                  href="#/action-1"
                >
                  {itemVariationData.name[0].toUpperCase()}
                </Dropdown.Item>
              ))}
            </Dropdownbutton> */}
    </div>
  );
};

export default DropdownMenu;
