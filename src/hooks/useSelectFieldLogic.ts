"use client";

import {
  type UIEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Option<T extends string> = { label: string; value: T; code?: string };

type UseSelectFieldLogicParams<T extends string> = {
  value: T | "";
  options: Option<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
  pageSize?: number;
};

export function useSelectFieldLogic<T extends string>({
  value,
  options,
  onChange,
  disabled,
  pageSize,
}: UseSelectFieldLogicParams<T>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(
    () => pageSize ?? options.length,
  );
  const [loadingMore, setLoadingMore] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const loadingMoreTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const visible = open && !disabled;
  const selected = options.find((option) => option.value === value);

  /**
   * Filters the options based on the current query. 
   * The filtering is case-insensitive and checks if the option's label includes the query string.
   */
  const filtered = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase()),
      ),
    [options, query],
  );
  const visibleOptions = pageSize
    ? filtered.slice(0, visibleCount)
    : filtered;
  const hasMoreOptions = visibleOptions.length < filtered.length;

  /**
   * Resets the visible count to the initial page size or the total number of options if page size is not defined. 
   * This function is used when the dropdown is closed or when the query is updated to ensure that 
   * the correct number of options are displayed when the dropdown is opened again.
   */
  const resetVisibleCount = useCallback(() => {
    setVisibleCount(pageSize ?? options.length);
  }, [options.length, pageSize]);

  /**
   * Closes the dropdown and resets the query. This function is used when the user clicks outside the dropdown or presses the Escape key.
   * It also resets the visible count to ensure that the correct number of options are displayed when the dropdown is opened again.
   */
  const closeDropdown = useCallback(() => {
    setOpen(false);
    setQuery("");
    resetVisibleCount();
  }, [resetVisibleCount]);

  /**
   * Toggles the dropdown open state. If the dropdown is disabled, it will not toggle.
   * When opening the dropdown, it does not reset the query to allow users to see the filtered options based on their last input.
   * When closing the dropdown, it resets the query and visible count to ensure a fresh start when the dropdown is opened again.
   */
  const toggleDropdown = () => {
    if (disabled) return;

    if (open) setQuery("");
    resetVisibleCount();
    setOpen(!open);
  };

  /**
   * Updates the query state with the user's input and resets the visible count to show the correct number of options based on the new query.
   * This function is called when the user types in the search input to filter the options.
   * By resetting the visible count, it ensures that if the user has scrolled through multiple pages of options, they will see the first page of results for their new query.
   */
  const updateQuery = (nextQuery: string) => {
    setQuery(nextQuery);
    resetVisibleCount();
  };

  /**
   * Selects an option and closes the dropdown.
   * @param nextValue - The value of the option to select.
   */
  const selectOption = (nextValue: T) => {
    onChange(nextValue);
    closeDropdown();
    buttonRef.current?.focus();
  };

  /**
   * Loads the next page of options when the user scrolls to the bottom of the options list. 
   * It checks if there are more options to load and if a loading operation is already in progress to prevent multiple simultaneous loads.
   * If conditions are met, it sets a timeout to simulate loading time and updates the visible count to show more options.
   */
  const loadNextPage = () => {
    if (
      !pageSize ||
      loadingMore ||
      loadingMoreTimeoutRef.current ||
      !hasMoreOptions
    ) {
      return;
    }

    setLoadingMore(true);
    loadingMoreTimeoutRef.current = setTimeout(() => {
      setVisibleCount((currentCount) =>
        Math.min(currentCount + pageSize, filtered.length),
      );
      setLoadingMore(false);
      loadingMoreTimeoutRef.current = null;
    }, 200);
  };

  /**
   * Handles the scroll event for the options list.
   * @param event - The scroll event.
   */
  const handleOptionsScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
    const reachedBottom = scrollHeight - scrollTop - clientHeight < 24;

    if (reachedBottom) loadNextPage();
  };

  useEffect(() => {
    if (!visible) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDropdown();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeDropdown, visible]);

  useEffect(() => {
    return () => {
      if (loadingMoreTimeoutRef.current) {
        clearTimeout(loadingMoreTimeoutRef.current);
      }
    };
  }, []);

  return {
    buttonRef,
    filtered,
    handleOptionsScroll,
    loadingMore,
    query,
    selected,
    selectOption,
    toggleDropdown,
    updateQuery,
    visible,
    visibleOptions,
    wrapperRef,
  };
}
