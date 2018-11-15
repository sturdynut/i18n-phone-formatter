import { goog, i18n } from '@sturdynut/i18n-phone-lib';

/**
 * Return the country code for an e164 formatted number
 *
 * @export
 * @param {string} phone
 * @returns string
 */
export function countryForE164Number(phone) {
  const phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
  const number = phoneUtil.parseAndKeepRawInput(phone);
  let output = new goog.string.StringBuffer();
  output = phoneUtil.getRegionCodeForNumber(number);
  return output.toString();
}

/**
 * Returns a number formatted in such a way that it can be dialed from a mobile
 * phone in a specific region. If the number cannot be reached from the region
 * (e.g. some countries block toll-free numbers from being called outside of the
 * country), the method returns an empty string.
 *
 * @export
 * @param {string} country
 * @param {string} phone
 * @returns string
 */
export function formatNumberForMobileDialing(country, phone) {
  const cleanPhoneNumber = cleanPhone(phone);
  const phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
  const number = phoneUtil.parseAndKeepRawInput(cleanPhoneNumber, country);
  let output = new goog.string.StringBuffer();
  output = phoneUtil.formatNumberForMobileDialing(number, country, true);
  return output.toString();
}