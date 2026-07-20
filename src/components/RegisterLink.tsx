type RegisterLinkProps = {
  href: string;
  className: string;
  children: React.ReactNode;
};

/**
 * Renders a real link (opens the Google Form in a new tab) when href is
 * set, or a visually-matching disabled state when it's still an empty
 * string in src/lib/googleForms.ts.
 */
export function RegisterLink({ href, className, children }: RegisterLinkProps) {
  if (!href) {
    return (
      <span
        className={`cursor-not-allowed opacity-60 ${className}`}
        aria-disabled="true"
        title="This link will be activated once the form is ready"
      >
        {children}
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
