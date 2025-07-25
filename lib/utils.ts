import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as localized currency, defaulting to USD.
 *
 * @param amount   The numeric value to format.
 * @param locale   Optional BCP-47 locale string. Defaults to "en-US".
 * @param currency Optional ISO-4217 currency code. Defaults to "USD".
 * @returns        A locale-aware currency string, e.g. "$1,299.00".
 */
export function formatCurrency(amount: number, locale = "en-US", currency = "USD"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
