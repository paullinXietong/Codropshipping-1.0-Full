/*
 * @Descripttion: 
 * @Author: Simple
 * @Date: 2022-10-27 09:02:05
 */

import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN' 
Validator.addLocale(zh)
const config = {
    locale: 'zh_CN',
    fieldsBagName: 'fieldBags'
}
Vue.use(VeeValidate, config)

const dictionary = {
    zh_CN: {
        messages: {
            // required: (field) => 'Please  ' + field,
            required: (field) => field,
            number: (field) => field + 'must be number',
        },
        attributes: {
            // defaultTip: 'cannot be empty',
            firstName: 'enter your firstname',
            lastName:'enter your lastName',
            phone: 'enter your phone number',
            email: 'enter your email',
            whatsapp: 'enter your whatsapp',
            authCode: 'enter the verification code you received',
            password:'enter your password',
            newPassword: 'enter a new login password',
            confirmPassword: 'enter a confirmation login password',
            addressName: 'enter address name',
            destinationType: 'select destination type',
            goodtypes: 'select goods types',
            fullName: 'enter your full name',
            city: 'enter your city',
            line1: 'enter your address line 1',
            line2: 'enter your address line 2',
            postalCode: 'enter your postal code',
            origin: 'select origin',
            destination: 'select destination',
            shippingMethod: 'select shipping method',
            incotermsSupplier: 'select one',
            addressType: 'select one',
            pickupDate: 'select pick up date',
            destinationAddress: 'enter destination Address',
            weight: 'enter total weight',
            volume: 'enter total volume',
            qty: 'enter total qty',
            account: 'enter your account',
            //order
            arrivalDate: 'select a pickup time',
            declaredValue: 'enter declared value',
            pickupPhone: 'enter contact phone number',
            cargoInfo: 'enter cargo information',
            orderCity: 'enter delivery city',
            orderPostcode: 'enter delivery postcode',
            cargoDesc: 'enter cargo description',
            cargoTitle: 'enter item name',
            Address: 'select a delivery address',
            Number: 'enter supplier contact number',
            //booking
            City: 'required',
            FBACode: 'required',
            toCountry: 'required',
            toCity: 'required',
            totalVolume: 'required',
            totalWeight: 'required',
            //rent
            rentVolume: 'required',
            rentTime: 'required',
            rentUnit: 'required',
            rentService: 'required',
            rentLabel: 'required',
            rentInspection: 'required',
            //ApplySpace
            mobiles: 'required',
            Province: 'required',
            supplier: 'Please select supplier',
            date: 'required',
            //ptp order
            ptpaddress: 'required',
            ptpNumber: 'required',
            ptpStuffing: 'required',
            ptpTime: 'required',
            //Request
            link: 'required',
            quantity: 'required',
        }
    }
}
Validator.updateDictionary(dictionary)
Validator.extend('addressName', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('destinationType', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('goodtypes', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('city', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('line1', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('line2', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('postalCode', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('origin', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('destination', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('authCode', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('fullName', {
    messages: {
        zh_CN: field => ' Do not allow special symbols'
    },
    validate: value => {
        return /^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$/.test(value)
    }
})
Validator.extend('firstName', {
    messages: {
        zh_CN: field => ' Do not allow special symbols'
    },
    validate: value => {
        return /^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$/.test(value)
    }
})
Validator.extend('lastName', {
    messages: {
        zh_CN: field => 'Do not allow special symbols'
    },
    validate: value => {
        return /^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$/.test(value)
    }
})
Validator.extend('phone', {
    messages: {
        zh_CN: field => 'The phone number is not in the correct format'
    },
    validate: value => {
        // return /^1[2-9]\d{9}$/.test(value)
        return /^\d+$/.test(value);
    }
})
Validator.extend('email', {
    messages: {
        zh_CN: field => 'Please enter a valid email address'
    },
    validate: value => {
        return /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/.test(value)
    }
})
Validator.extend('whatsapp', {
  messages: {
      zh_CN: field => 'The whatsapp number is not in the correct format'
  },
  validate: value => {
      // return /^1[2-9]\d{9}$/.test(value)
      return /^\+\d{1,3}\d{4,14}$/.test(value)
  }
})
Validator.extend('code', {
    messages: {
        zh_CN: field => 'The captcha format is incorrect'
    },
    validate: value => {
        return /^[0-9]*$/.test(value)
    }
})
Validator.extend('password', {
    messages: {
        zh_CN: field => 'Your password must be at 6-18 characters long'
    },
    validate: value => {
        return /^\S{6,18}$/.test(value)
    }
})

Validator.extend('see', {
    messages: {
        zh_CN: field => 'Please read the User Agreement and agree'
    },
    validate: value => {
        return true
    }
})
Validator.extend('newPassword', {
    messages: {
        zh_CN: field => 'The login password format is incorrect[6~18]'
    },
    validate: value => {
        return /^\S{6,18}$/.test(value)
    }
})
Validator.extend('confirmPassword', {
    messages: {
        zh_CN: field => 'The login password format is incorrect[6~18]'
    },
    validate: value => {
        return /^\S{6,18}$/.test(value)
    }
})
Validator.extend('shippingMethod', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('incotermsSupplier', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('addressType', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('pickupDate', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('destinationAddress', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('weight', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('volume', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('qty', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('account', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('arrivalDate', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('declaredValue', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('pickupPhone', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('cargoInfo', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('orderCity', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('orderPostcode', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})
Validator.extend('cargoDesc', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('cargoTitle', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('Address', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('Number', {
    messages: {
        zh_CN: field => ''
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('City', {
    messages: {
        zh_CN: field => 'Required'
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('FBACode', {
    messages: {
        zh_CN: field => 'Required'
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('toCountry', {
    messages: {
        zh_CN: field => 'Required'
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('toCity', {
    messages: {
        zh_CN: field => 'Required'
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('totalVolume', {
    messages: {
        zh_CN: field => 'Required'
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('totalWeight', {
    messages: {
        zh_CN: field => 'Required'
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('rentVolume', {
    messages: {
        zh_CN: field => 'greater than 0'
    },
    validate: value => {
        return /^[1-9][0-9]*|0\.\d*[1-9]\d*$/.test(value)
    }
})

Validator.extend('rentTime', {
    messages: {
        zh_CN: field => 'greater than 0'
    },
    validate: value => {
        return /^[1-9][0-9]*|0\.\d*[1-9]\d*$/.test(value)
    }
})

Validator.extend('rentUnit', {
    messages: {
        zh_CN: field => 'Integer greater than 0'
    },
    validate: value => {
        return /^[0-9]*[1-9][0-9]*$/.test(value)
    }
})

Validator.extend('rentService', {
    messages: {
        zh_CN: field => 'Required'
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('rentLabel', {
    messages: {
        zh_CN: field => 'Integer greater than 0'
    },
    validate: value => {
        return /^[0-9]*[1-9][0-9]*$/.test(value)
    }
})

Validator.extend('rentInspection', {
    messages: {
        zh_CN: field => 'Integer greater than 0'
    },
    validate: value => {
        return /^[0-9]*[1-9][0-9]*$/.test(value)
    }
})

Validator.extend('mobiles', {
    messages: {
        zh_CN: field => 'enter the correct number.'
    },
    validate: value => {
        return /^[0-9]*[1-9][0-9]*$/.test(value)
    }
})

Validator.extend('Province', {
    messages: {
        zh_CN: field => 'Required'
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('supplier', {
    messages: {
        zh_CN: field => 'Please select supplier'
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('date', {
    messages: {
        zh_CN: field => 'Required'
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('ptpaddress', {
    messages: {
        zh_CN: field => 'Required'
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('ptpNumber', {
    messages: {
        zh_CN: field => 'Required'
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('ptpStuffing', {
    messages: {
        zh_CN: field => 'Required'
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('ptpTime', {
    messages: {
        zh_CN: field => 'Required'
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('link', {
    messages: {
        zh_CN: field => 'Required'
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})

Validator.extend('quantity', {
    messages: {
        zh_CN: field => 'Required'
    },
    validate: value => {
        return /^.+$/.test(value)
    }
})