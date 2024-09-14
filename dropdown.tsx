"use client";
import {
  ChangeEvent,
  MouseEvent as ME,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export default function SelectableDropdown<TV, TK>({
  items,
  title,
  itemRenderer = undefined,
  showItemSelected = false,
  onChange,
  placement = "bottom-middle",
  itemSearch = false,
  itemSearchShow = 5,
  getItemString = undefined,
  cancelSelect = false,
  menuClassName,
  titleClassName,
}: {
  items: { value: TV; key: TK }[];
  title: ReactNode;
  itemRenderer: ((itemValue: TV) => ReactNode) | undefined;
  showItemSelected: boolean;
  onChange: (key: TK | null) => void;
  placement:
    | "top-left"
    | "top-right"
    | "top-middle"
    | "right"
    | "left"
    | "bottom-left"
    | "bottom-right"
    | "bottom-middle";
  itemSearch: boolean;
  itemSearchShow: number;
  getItemString: ((itemValue: TV) => string) | undefined;
  cancelSelect: boolean;
  menuClassName: string;
  titleClassName: string;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [show, setShow] = useState(false);
  const [selectedItemKey, setSelectedItemKey] = useState<TK | null>(null);

  const toggleDropdown = () => {
    setShow((p) => !p);
  };

  const getPlacementStyles = useCallback(() => {
    switch (placement) {
      case "top-left":
        return {
          bottom: `${buttonRef.current!.clientHeight + 10}px`,
          right: 0,
        };
      case "top-right":
        return {
          bottom: `${buttonRef.current!.clientHeight + 10}px`,
          left: 0,
        };
      case "top-middle":
        return {
          bottom: `${buttonRef.current!.clientHeight + 10}px`,
        };
      case "left":
        return {
          right: `${buttonRef.current!.clientWidth + 10}px`,
        };
      case "right":
        return {
          left: `${buttonRef.current!.clientWidth + 10}px`,
        };
      case "bottom-left":
        return {
          top: `${buttonRef.current!.clientHeight + 10}px`,
          right: 0,
        };
      case "bottom-right":
        return {
          top: `${buttonRef.current!.clientHeight + 10}px`,
          left: 0,
        };
      case "bottom-middle":
        return {
          top: `${buttonRef.current!.clientHeight + 10}px`,
        };
      default:
        return {};
    }
  }, [placement, buttonRef]);

  const Search = useMemo(() => {
    return ({
      searchChangeHandler,
    }: {
      searchChangeHandler: (e: string) => void;
    }) => {
      const [searchQuery, setSearchQuery] = useState("");

      const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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

  const DropdownMenu = useMemo(() => {
    return () => {
      const [dropItems, setDropItems] = useState<{ value: TV; key: TK }[]>(
        itemSearch ? items.slice(0, itemSearchShow) : items
      );
      const [moreCount, setMoreCount] = useState<number>(
        items.length - itemSearchShow
      );

      const searchChangeHandler = (e: string) => {
        const filteredItems = items.filter((item) => {
          return getItemString!(item.value)
            .toLowerCase()
            .includes(e.toLowerCase());
        });
        setMoreCount(filteredItems.length - itemSearchShow);
        setDropItems(filteredItems.slice(0, itemSearchShow));
      };

      const handleItemClick = (key: TK) => setSelectedItemKey(key);

      const unSelect = (e: ME<HTMLButtonElement>) => {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        show &&
        event.target instanceof Node &&
        !dropdownRef.current!.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [show]);

  useEffect(() => {
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
