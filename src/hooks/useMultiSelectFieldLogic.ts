"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Option<T extends string> = { label: string; value: T };

type UseMultiSelectFieldLogicParams<T extends string> = {
  values: T[];
  options: Option<T>[];
  onChange: (values: T[]) => void;
  max: number;
  disabled?: boolean;
};

export function useMultiSelectFieldLogic<T extends string>({
  values,
  options,
  onChange,
  max,
  disabled,
}: UseMultiSelectFieldLogicParams<T>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selected = options.filter((option) => values.includes(option.value));
  const visible = open && !disabled;
  const maxSelected = values.length >= max;

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

  /**
   * Toggles the dropdown open state. If the dropdown is disabled, it will not toggle.
   */
  const toggleDropdown = () => {
    if (!disabled) setOpen((currentOpen) => !currentOpen);
  };

  /**
   * Closes the dropdown and resets the query. This function is used when the user clicks outside the dropdown or presses the Escape key.
   */
  const closeDropdown = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  /**
   * Toggles the selection of a value. If the value is already selected, it will be removed from the selection.
   *  If the value is not selected and the maximum number of selections has not been reached, it will be added to the selection.
   * @param value - The value to toggle in the selection.
   */
  const toggleValue = (value: T) => {
    if (values.includes(value)) {
      onChange(values.filter((currentValue) => currentValue !== value));
      return;
    }

    if (values.length < max) onChange([...values, value]);
  };

  /**
   * Removes a value from the selection. This function is used when the user clicks the remove button on a selected option.
   * @param value - The value to remove from the selection.
   */
  const removeValue = (value: T) => {
    onChange(values.filter((currentValue) => currentValue !== value));
  };

  /**
   * Clears all selected values. This function is used when the user clicks the clear button to remove all selections.
   */
  const clearValues = () => {
    onChange([]);
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
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeDropdown, visible]);

  return {
    clearValues,
    filtered,
    maxSelected,
    query,
    removeValue,
    selected,
    setQuery,
    toggleDropdown,
    toggleValue,
    triggerRef,
    visible,
    wrapperRef,
  };
}
