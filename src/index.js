import { goog, i18n } from '@sturdynut/i18n-phone-lib';

/**
 * Remove any non numeric characters from the phone number but leave any plus sign at the beginning
 *
 * @export
 * @param {string} phone
 * @returns string
 */
export function cleanPhone(phone) {
  phone = phone.replace(/[^\d\+]/g, '');
  if (phone.substr(0, 1) == '+') {
    phone = '+' + phone.replace(/[^\d]/g, '');
  } else {
    phone = phone.replace(/[^\d]/g, '');
  }
  return phone;
}

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

/**
 * Tests whether a phone number matches a valid pattern. Note this doesn't
 * verify the number is actually in use, which is impossible to tell by just
 * looking at a number itself.
 *
 * @param {string} phone
 * @param {string} country
 * @param {string} type - One of FIXED_LINE:0, MOBILE:1, FIXED_LINE_OR_MOBILE:2, TOLL_FREE:3, PREMIUM_RATE:4, SHARED_COST:5, VOIP:6, PERSONAL_NUMBER:7, PAGER:8, UAN:9, VOICEMAIL:10, UNKNOWN:-1
 * @returns
 */
export function isValidNumber(phone, country, type) {
  try {
    const cleanPhoneNumber = cleanPhone(phone);
    const phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    const number = phoneUtil.parseAndKeepRawInput(cleanPhoneNumber, country);
    if (typeof type === 'string') {
      const type = type.toUpperCase();
      if (
        phoneUtil.isValidNumber(number) &&
        phoneUtil.getNumberType(number) ===
          i18n.phonenumbers.PhoneNumberType[type]
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return phoneUtil.isValidNumber(number);
    }
  } catch {
    return false;
  }
}
