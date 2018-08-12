import { addressUtils } from '@0xproject/utils'
import uts46 from 'idna-uts46'
import tlds from './tlds.json'

export function validateName(name) {
  try {
    return uts46.toUnicode(name, {
      useStd3ASCII: true,
      transitional: false
    })
  } catch (e) {
    throw e
  }
}

export const parseSearchTerm = term => {
  let regex = /(?<=\.|^)[^.]+$/
  if (term == ""){ return 'empty';}
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
