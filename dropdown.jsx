"use client";

function SelectableDropdown(items, title, itemRenderer, showItemSelected, onChange, placement, itemSearch, itemSearchShow, getItemString, cancelSelect, menuClassName, titleClassName) {
  const dropdownRef = React.createRef();
  const buttonRef = React.createRef();

  const [show, setShow] = React.useState(false);
  const [selectedItemKey, setSelectedItemKey] = React.useState(null);

  const toggleDropdown = () => {
    setShow((p) => !p);
  };

  const getPlacementStyles = React.useCallback(() => {
    switch (placement) {
      case "top-left":
        return {
          bottom: `${buttonRef.current.clientHeight + 10}px`,
          right: 0,
        };
      case "top-right":
        return {
          bottom: `${buttonRef.current.clientHeight + 10}px`,
          left: 0,
        };
      case "top-middle":
        return {
          bottom: `${buttonRef.current.clientHeight + 10}px`,
        };
      case "left":
        return {
          right: `${buttonRef.current.clientWidth + 10}px`,
        };
      case "right":
        return {
          left: `${buttonRef.current.clientWidth + 10}px`,
        };
      case "bottom-left":
        return {
          top: `${buttonRef.current.clientHeight + 10}px`,
          right: 0,
        };
      case "bottom-right":
        return {
          top: `${buttonRef.current.clientHeight + 10}px`,
          left: 0,
        };
      case "bottom-middle":
        return {
          top: `${buttonRef.current.clientHeight + 10}px`,
        };
      default:
        return {};
    }
  }, [placement, buttonRef]);

  const Search = React.useMemo(() => {
    return ({ searchChangeHandler }) => {
      const [searchQuery, setSearchQuery] = React.useState("");

      const changeHandler = (e) => {
        setSearchQuery(e.target.value);
        searchChangeHandler(e.target.value);
      };

      return (
        <div className="w-full p-2 mid flex-col">
          <input
            type="text"
            placeholder="جستوجو"
            className="bg-white bg-opacity-10 py-1 px-2 rounded-lg outline-none"
            value={searchQuery}
            onChange={changeHandler}
            onFocus={(e) => e.target.select()}
            dir="rtl"
          />
          <div className="border-2 border-opacity-10 border-white rounded-md w-6/12 mt-2"></div>
        </div>
      );
    };
  }, [items]);

  const DropdownMenu = React.useMemo(() => {
    return () => {
      const [dropItems, setDropItems] = React.useState(
        itemSearch ? items.slice(0, itemSearchShow) : items
      );
      const [moreCount, setMoreCount] = React.useState(
        items.length - itemSearchShow
      );

      const searchChangeHandler = (e) => {
        const filteredItems = items.filter((item) => {
          return getItemString(item.value)
            .toLowerCase()
            .includes(e.toLowerCase());
        });
        setMoreCount(filteredItems.length - itemSearchShow);
        setDropItems(filteredItems.slice(0, itemSearchShow));
      };

      const handleItemClick = (key) => setSelectedItemKey(key);

      const unSelect = (e) => {
        e.stopPropagation();
        setSelectedItemKey(null);
      };

      return (
        <div
          className={cn(
            "fadein absolute flex flex-col border-2 border-white border-opacity-20 bg-black bg-opacity-30 z-50 backdrop-blur-lg rounded-lg overflow-hidden",
            menuClassName
          )}
          style={getPlacementStyles()}
        >
          {itemSearch && <Search searchChangeHandler={searchChangeHandler} />}
          {dropItems.map((e, i) => (
            <button
              key={i}
              className={`py-2 px-3 transition-all mid ${
                e.key === selectedItemKey
                  ? "bg-white bg-opacity-30"
                  : "hover:bg-white hover:bg-opacity-10"
              }`}
              onClick={() => handleItemClick(e.key)}
            >
              <div className="mx-auto">
                {itemRenderer ? itemRenderer(e.value) : <>{e.value}</>}
              </div>
              {cancelSelect && e.key === selectedItemKey && (
                <button
                  onClick={unSelect}
                  className="text-sm ms-2 text-red-600"
                >
                  X
                </button>
              )}
            </button>
          ))}
          {itemSearch && moreCount > 0 && (
            <div className="w-full mid text-sm opacity-80 mb-1">
              <div className="me-1">مقدار دیگر</div>
              {moreCount}
            </div>
          )}
        </div>
      );
    };
  }, [items, selectedItemKey]);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        show &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [show]);

  React.useEffect(() => {
    onChange(selectedItemKey);
  }, [selectedItemKey]);

  return (
    <>
      <div ref={dropdownRef} className="relative z-20 mid">
        <button
          onClick={toggleDropdown}
          ref={buttonRef}
          className={cn(
            "px-2 py-1 rounded-lg border-2 border-white border-opacity-20 bg-white bg-opacity-10 backdrop-blur-sm",
            titleClassName
          )}
        >
          {showItemSelected ? (
            selectedItemKey === null ? (
              title
            ) : itemRenderer ? (
              itemRenderer(
                items.filter((g) => g.key === selectedItemKey)[0].value
              )
            ) : (
              <>{items.filter((g) => g.key === selectedItemKey)[0].value}</>
            )
          ) : (
            title
          )}
        </button>
        {show && <DropdownMenu />}
      </div>
    </>
  );
}
