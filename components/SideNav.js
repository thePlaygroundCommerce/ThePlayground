"use client";

function SideNav({ catalogCategories }) {
  const splitNameArr = catalogCategories?.map(({ categoryData: { name } }) =>
    name.split(" ")
  );
  const makeCategoryTree = (arr) =>
    arr?.reduce((acc, cv) => {
      const cvLowercase = cv[0].toLowerCase();

      acc[cvLowercase] !== undefined
        ? acc[cvLowercase].push(makeCategoryTree([cv.slice(1)]))
        : (acc[cvLowercase] = []);

      return acc;
    }, {});
  const renderCategoryItems = (items) => {
    return items?.map(([itemName, itemChildren], i) => {
      const itemDisplayName = itemName[0].toUpperCase() + itemName.slice(1);
      const hasTree = itemChildren.length > 1;

      return (
        <div key={i} className="w-100 border-0">
          {hasTree ? (
            <div key={itemName + i} className=" w-100 border-0">
              <div>
                <div className="border-0">
                  <div className="border-0 p-1">{itemDisplayName}</div>
                  <div className="border-0 py-0">
                    <div>
                      {itemChildren?.map((item) =>
                        renderCategoryItems(Object.entries(item))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              style={{ paddingBlock: 16, paddingInline: 20 }}
              variant=""
              className="w-100 text-start"
            >
              {itemDisplayName}
            </button>
          )}
        </div>
      );
    });
  };

  return renderCategoryItems(Object.entries(makeCategoryTree(splitNameArr)));
}

export default SideNav;
