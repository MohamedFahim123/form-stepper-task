"use client";

import { Check, ChevronDown, LoaderCircle, Search } from "lucide-react";
import { useId } from "react";
import { cn } from "@/utils/twMerge";
import { FormField } from "@/components/molecules/FormField";
import { useSelectFieldLogic } from "@/hooks/useSelectFieldLogic";

type Option<T extends string> = { label: string; value: T; code?: string };

type SelectFieldProps<T extends string> = {
  id?: string;
  label: string;
  value: T | "";
  options: Option<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  searchable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  pageSize?: number;
};

export function SelectField<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = "Select option",
  required,
  optional,
  error,
  searchable,
  disabled,
  loading,
  loadingText = "Loading options...",
  pageSize,
}: SelectFieldProps<T>) {
  const reactId = useId();
  const fieldId = id ?? reactId;
  const listId = `${fieldId}-listbox`;
  const {
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
  } = useSelectFieldLogic({
    value,
    options,
    onChange,
    disabled,
    pageSize,
  });

  return (
    <FormField
      id={fieldId}
      label={label}
      required={required}
      optional={optional}
      error={error}
    >
      <div ref={wrapperRef} className="relative">
        <button
          ref={buttonRef}
          type="button"
          id={fieldId}
          aria-haspopup="listbox"
          aria-expanded={visible}
          aria-controls={listId}
          disabled={disabled}
          onClick={toggleDropdown}
          className={cn(
            "form-input flex items-center justify-between text-left",
            visible && "border-primary-600 ring-2 ring-primary-600/20",
            error && "form-input-error",
          )}
        >
          <span className={selected ? "text-foreground" : "text-slate-400"}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            size={16}
            aria-hidden
            className={cn("transition", visible && "rotate-180")}
          />
        </button>
        {visible && (
          <div className="dropdown-panel absolute left-0 right-0 z-20 mt-1">
            {searchable && (
              <div className="relative m-2">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <input
                  className="form-input h-9 pl-9"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => updateQuery(e.target.value)}
                  autoFocus
                />
              </div>
            )}
            <div
              className="max-h-52 overflow-auto"
              onScroll={handleOptionsScroll}
            >
              <ul
                id={listId}
                role="listbox"
                aria-labelledby={fieldId}
                tabIndex={-1}
              >
                {loading ? (
                  <li className="flex items-center gap-2 px-4 py-3 text-body-sm text-slate-500">
                    <LoaderCircle
                      size={16}
                      className="animate-spin text-primary-600"
                      aria-hidden
                    />
                    {loadingText}
                  </li>
                ) : (
                  visibleOptions.map((option) => {
                    const active = option.value === value;
                    return (
                      <li
                        key={option.value}
                        role="option"
                        aria-selected={active}
                      >
                        <button
                          type="button"
                          className={cn(
                            "dropdown-item w-full",
                            active && "dropdown-item-active",
                          )}
                          onClick={() => selectOption(option.value)}
                        >
                          <span>
                            {option.code && (
                              <span className="mr-1 text-caption uppercase">
                                {option.code}
                              </span>
                            )}
                            {option.label}
                          </span>
                          {active && <Check size={16} aria-hidden />}
                        </button>
                      </li>
                    );
                  })
                )}
                {!loading && !filtered.length && (
                  <li className="px-4 py-3 text-body-sm text-slate-500">
                    No results found
                  </li>
                )}
                {!loading && loadingMore && (
                  <li className="flex items-center gap-2 px-4 py-3 text-body-sm text-slate-500">
                    <LoaderCircle
                      size={16}
                      className="animate-spin text-primary-600"
                      aria-hidden
                    />
                    Loading more...
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </FormField>
  );
}
