/** Accepts international numbers, including common display punctuation. */
export function getWhatsappUrl(number: string | null | undefined, message?: string): string | null {
  if (!number?.trim() || !/^[+\d\s().-]+$/.test(number)) return null;

  const digits = number.replace(/\D/g, '');
  // Structural validation only: this cannot verify whether an account exists.
  if (!/^[1-9]\d{7,14}$/.test(digits)) return null;

  const url = `https://wa.me/${digits}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}
