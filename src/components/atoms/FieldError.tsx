type FieldErrorProps = { id?: string; message?: string };

export function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="field-error">
      {message}
    </p>
  );
}
