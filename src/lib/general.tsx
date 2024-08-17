import parsePhoneNumber from "libphonenumber-js";
import * as z from "zod";

/**
 * Zod schema that validates a phone number using `libphonenumber-js`.
 * Attempts to parse the provided value with a default country of `FI`.
 *
 * If the phone number is valid, the schema transforms the phone number into
 * an international format (e.g. `+358401234567`).
 */
export const zPhoneNumber = z.string().transform((value, ctx) => {
  const phoneNumber = parsePhoneNumber(value, {
    defaultCountry: "VN",
  });

  if (!phoneNumber?.isValid()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Số điện thoại chưa đúng định dạng",
    });
    return z.NEVER;
  }

  return phoneNumber.formatInternational();
});
