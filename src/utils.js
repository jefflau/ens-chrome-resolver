import { addressUtils } from '@0xproject/utils'

export const parseSearchTerm = term => {
  let regex = /(?<=\.|^)[^.]+$/

  if (term.indexOf('.') !== -1) {
    const tld = term.match(regex) ? term.match(regex)[0] : ''

    if (tlds[tld] && tlds[tld].supported) {
      return tld
    }

    return 'unsupported'
  } else if (addressUtils.isAddress(term)) {
    return 'address'
  } else {
    try {
      validateName(term)
      return 'search'
    } catch (e) {
      return 'invalid'
    }
  }
}
