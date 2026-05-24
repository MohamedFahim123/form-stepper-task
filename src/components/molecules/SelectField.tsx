"use client";

import { Check, ChevronDown, LoaderCircle, Search } from "lucide-react";
import {
  type UIEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/utils/twMerge";
import { FormField } from "@/components/molecules/FormField";

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
  const selected = options.find((option) => option.value === value);
  const visible = open && !disabled;
  const canPaginate = Boolean(pageSize);
  const filtered = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase()),
      ),
    [options, query],
  );
  const visibleOptions = canPaginate
    ? filtered.slice(0, visibleCount)
    : filtered;
  const hasMoreOptions = visibleOptions.length < filtered.length;
  const resetVisibleCount = useCallback(() => {
    setVisibleCount(pageSize ?? options.length);
  }, [options.length, pageSize]);

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

  const handleOptionsScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
    const reachedBottom = scrollHeight - scrollTop - clientHeight < 24;

    if (reachedBottom) loadNextPage();
  };

  useEffect(() => {
    if (!visible) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
        resetVisibleCount();
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
        resetVisibleCount();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [resetVisibleCount, visible]);

  useEffect(() => {
    return () => {
      if (loadingMoreTimeoutRef.current) {
        clearTimeout(loadingMoreTimeoutRef.current);
      }
    };
  }, []);

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
          onClick={() => {
            if (!disabled) {
              if (open) setQuery("");
              resetVisibleCount();
              setOpen(!open);
            }
          }}
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
                  onChange={(e) => {
                    setQuery(e.target.value);
                    resetVisibleCount();
                  }}
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
                          onClick={() => {
                            onChange(option.value);
                            setOpen(false);
                            setQuery("");
                            resetVisibleCount();
                            buttonRef.current?.focus();
                          }}
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
