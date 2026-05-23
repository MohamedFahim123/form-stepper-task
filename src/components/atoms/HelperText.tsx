type HelperTextProps = { id?: string; children: React.ReactNode };

export function HelperText({ id, children }: HelperTextProps) {
  return (
    <p id={id} className="field-helper">
      {children}
    </p>
  );
}
