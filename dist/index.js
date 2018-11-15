;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Index = factory();
  }
}(this, function() {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countryForE164Number = countryForE164Number;

var i18nPhoneLib = _interopRequireWildcard(require("@sturdynut/i18n-phone-lib"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function countryForE164Number(phone) {
  debugger;
  var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
  var number = phoneUtil.parseAndKeepRawInput(phone);
  var output = new goog.string.StringBuffer();
  output = phoneUtil.getRegionCodeForNumber(number);
  return output.toString();
} // function countryForE164Number(phone) {
//   /*
//   Return the country code for an e164 formatted number
//   phone (String) phone number in e164 format to return the country code for
//   */
//   try {
//       var phone = cleanPhone(phone);
//       var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
//       var number = phoneUtil.parseAndKeepRawInput(phone);
//       var output = new goog.string.StringBuffer();
//       output = phoneUtil.getRegionCodeForNumber(number);
//       return output.toString();
//   } catch (e) {
//       return "";
//   }
// }
return Index;
}));
