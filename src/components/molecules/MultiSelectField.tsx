"use client";

import { AlertTriangle, Check, ChevronDown, Search, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { FormField } from "@/components/molecules/FormField";
import { cn } from "@/utils/twMerge";

type Option<T extends string> = { label: string; value: T };

type MultiSelectFieldProps<T extends string> = {
  label: string;
  values: T[];
  options: Option<T>[];
  onChange: (values: T[]) => void;
  placeholder?: string;
  max?: number;
  required?: boolean;
  hint?: string;
  error?: string;
  disabled?: boolean;
};

export function MultiSelectField<T extends string>({
  label,
  values,
  options,
  onChange,
  placeholder = "Select interests",
  max = 5,
  required,
  hint,
  error,
  disabled,
}: MultiSelectFieldProps<T>) {
  const id = useId();
  const listId = `${id}-listbox`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selected = options.filter((option) => values.includes(option.value));
  const visible = open && !disabled;
  const maxSelected = values.length >= max;
  const filtered = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase()),
      ),
    [options, query],
  );
  const toggle = (value: T) => {
    if (values.includes(value)) onChange(values.filter((v) => v !== value));
    else if (values.length < max) onChange([...values, value]);
  };

  const removeValue = (value: T) => {
    onChange(values.filter((currentValue) => currentValue !== value));
  };

  useEffect(() => {
    if (!visible) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [visible]);

  return (
    <FormField
      id={id}
      label={label}
      required={required}
      hint={hint}
      error={error}
      helperText={`Selected: ${values.length} of ${options.length}(Max: ${max})`}
    >
      <div ref={wrapperRef} className="relative">
        <button
          ref={triggerRef}
          type="button"
          id={id}
          aria-haspopup="listbox"
          aria-expanded={visible}
          aria-controls={listId}
          disabled={disabled}
          onClick={() => {
            if (!disabled) setOpen((v) => !v);
          }}
          className={cn(
            "form-input flex h-auto min-h-11 items-center justify-between text-left",
            visible && "border-primary-600 ring-2 ring-primary-600/20",
            error && "form-input-error",
          )}
        >
          <span className="flex flex-wrap gap-2">
            {selected.length ? (
              selected.map((item) => (
                <Badge key={item.value}>
                  {item.label}
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label={`Remove ${item.label}`}
                    className="ml-1 inline-flex rounded-full outline-none focus:ring-2 focus:ring-primary-600/30"
                    onClick={(event) => {
                      event.stopPropagation();
                      removeValue(item.value);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        event.stopPropagation();
                        removeValue(item.value);
                      }
                    }}
                  >
                    <X size={12} aria-hidden />
                  </span>
                </Badge>
              ))
            ) : (
              <span className="text-slate-400">{placeholder}</span>
            )}
          </span>
          <span className="flex items-center gap-2 text-slate-400">
            {selected.length > 0 && (
              <span
                role="button"
                tabIndex={0}
                aria-label="Clear selected interests"
                className="inline-flex rounded-full outline-none focus:ring-2 focus:ring-primary-600/30"
                onClick={(event) => {
                  event.stopPropagation();
                  onChange([]);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    event.stopPropagation();
                    onChange([]);
                  }
                }}
              >
                <X size={16} aria-hidden />
              </span>
            )}
            <ChevronDown
              size={16}
              className={cn("transition", visible && "rotate-180")}
              aria-hidden
            />
          </span>
        </button>
        {visible && (
          <div className="dropdown-panel absolute left-0 right-0 z-20 mt-1 max-h-64 overflow-auto">
            <div className="relative mb-2">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <input
                className="form-input h-9 pl-9"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>
            {maxSelected && (
              <div
                role="status"
                aria-live="polite"
                className="mb-2 flex items-center gap-2 px-4 text-caption text-danger"
              >
                <AlertTriangle size={14} aria-hidden />
                Maximum of {max} selections reached.
              </div>
            )}
            <ul id={listId} role="listbox" aria-multiselectable="true">
              {filtered.map((option) => {
                const checked = values.includes(option.value);
                const disabled = !checked && maxSelected;
                return (
                  <li key={option.value} role="option" aria-selected={checked}>
                    <button
                      type="button"
                      disabled={disabled}
                      className={cn(
                        "dropdown-item w-full justify-start gap-3 disabled:cursor-not-allowed disabled:opacity-50",
                        checked && "dropdown-item-active",
                      )}
                      onClick={() => toggle(option.value)}
                    >
                      <span
                        className={cn(
                          "flex size-4 items-center justify-center rounded border border-input",
                          checked &&
                            "border-primary-600 bg-primary-600 text-white",
                        )}
                      >
                        {checked && <Check size={12} aria-hidden />}
                      </span>
                      {option.label}
                    </button>
                  </li>
                );
              })}
              {!filtered.length && (
                <li className="px-4 py-3 text-body-sm text-slate-500">
                  No results found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </FormField>
  );
}
