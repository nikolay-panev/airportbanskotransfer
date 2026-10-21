const lowercase = 'abcdefghijklmnopqrstuvwxyz'
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789@.+'

const regexNumber = /[0-9@.+]/
const regexUppercase = /[A-Z]/
const regexLowercase = /[a-z]/

export const useCoder = () => {
    const encode = (data) => {
        const encoded = data.split('')
        let index = -1

        for (let i = 0; i < encoded.length; i++) {
            if (regexNumber.test(encoded[i])) {
                index = numbers.indexOf(encoded[i])
                encoded[i] = numbers[(index + 5) % 13]
            }
            else if (regexLowercase.test(encoded[i])) {
                index = lowercase.indexOf(encoded[i])
                encoded[i] = lowercase[(index + 13) % 26]
            }
            else if (regexUppercase.test(encoded[i])) {
                index = uppercase.indexOf(encoded[i])
                encoded[i] = uppercase[(index + 13) % 26]
            }
        }

        return encoded.join('')
    }

    const decode = (data) => {
        const decoded = data.split('')
        let index = -1

        for (let i = 0; i < decoded.length; i++) {
            if (regexNumber.test(decoded[i])) {
                index = numbers.indexOf(decoded[i])
                decoded[i] = numbers[(index - 5 + 13) % 13]
            }
            else if (regexLowercase.test(decoded[i])) {
                index = lowercase.indexOf(decoded[i])
                decoded[i] = lowercase[(index - 13 + 26) % 26]
            }
            else if (regexUppercase.test(decoded[i])) {
                index = uppercase.indexOf(decoded[i])
                decoded[i] = uppercase[(index - 13 + 26) % 26]
            }
        }

        return decoded.join('')
    }

  return {
    encode,
    decode
  }
}
