import JSEncrypt from 'jsencrypt'
const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArlFqTW29hgltNLE7zC/dSTqKJr8pAZL/oLRYhZcbU6KygBJWLHNzQE9wXbRGFQ5zdN+OfK1BTHhCMHjg2IdN0dOvn8e+2Mw8z+Bq8l8BeXTuCHwU5OXhkXa0k0cY8SLuKeg6rJCoU6IXK8nzDV0XkG/TniCX/o9vyDB6WqOpIClb1mb5uhGBl3dwwmQPxiFgw/TjPJkpYLM0OSWZ7bGaBXHRB3iv32gGuaTK6RWtoSWmpyoiSVThhRH9nqZ0wrYdWCmDadSrpPFSSJJ6hyjLLAfUVlmt8mx8y0iSk51wVI0KJBpmKuYV5qvnOqIrMnEsvtOeSS2pzu4tqg1UaqXXcQIDAQAB'
const privateKey = 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCuUWpNbb2GCW00sTvML91JOoomvykBkv+gtFiFlxtTorKAElYsc3NAT3BdtEYVDnN03458rUFMeEIweODYh03R06+fx77YzDzP4GryXwF5dO4IfBTk5eGRdrSTRxjxIu4p6DqskKhTohcryfMNXReQb9OeIJf+j2/IMHpao6kgKVvWZvm6EYGXd3DCZA/GIWDD9OM8mSlgszQ5JZntsZoFcdEHeK/faAa5pMrpFa2hJaanKiJJVOGFEf2epnTCth1YKYNp1Kuk8VJIknqHKMssB9RWWa3ybHzLSJKTnXBUjQokGmYq5hXmq+c6oisycSy+055JLanO7i2qDVRqpddxAgMBAAECggEBAJGt9Lr0xXjpE9z/aUwBjFuQkrhC9ZAdO4kgbwJmAC5rP+YMbPwFGAJc4TlOWWtrgk3gLwI/AN1Ze2dq/e23Ve/Pi2xq0DH6ra/Ei1w2zdKlR/DLUeLhwxuAKvUSa+PKH2PicnaZBjOuuNKdmYRHklPhQOdbserKEM8qxHZPZB49UMUMmNI1sQI5uuKNjnRlhYq9GbZMRpMGFZGABeDdW6658Rx/W5COcyPtoAbaJdS8WEjUKZi1/QOm+PXSA18ua1hkM/SvRt5aPZFVxQnUg6pGRJP/zx+pQ/WrcAxBAT3nHRW4v4BCoYCZjCKHOTmzVtBL07foOCjtZadc4fOwFqkCgYEA3a7nNS8Z/elUmV6+NPrVLkJQqGR8C8pQwpwBT6u3x8PnDwF14HAW17M7w7ax/wiSsiHbTvIo5PYfDiIH3ySpMSNEDsIdVf9F5PlPKB7f6zDs+MtX5l3SrjcdFS5p1bo4kGlvowlW5wj5XRXYBNHwXXul18XvsJgL7HW/yTzmQzsCgYEAyU15cIuvLCTrheGQ2pt9u81NfsyICTiU8J7FLz8lnXA6hfDOnnz3JLZUhLZw5aveLNtT6xcVJnVo6B3hY+0b6io5CUJR6w+WtjfUhoZ9oQuTpDgdY46w4UobZyXo0iB3JK9RskWHzvdyXslW4OzMTZrVb17BpHCQbWYitELkzUMCgYEA2/p4km0IBM9qVLsQUjBqJPpHYaI8+dIsa8E1B+MlfoTmnxxa5Xk1IZxI/QApByNxtnQkVOW2MOYOkQ6x8vtFLW6KVX7Ib5Ldv8aphu2EU7V8IbJeqkmGC7zDDka9XQnqoVsPHaDh7GcaVAWeE8JkG8/cFQ7kt79Zba62vrHA6QsCgYA/cMkq7PrB4MjRIqtyGbrgau1XXsIolcpqor7mCvKh0XLAL4oObLe+vC+au5yM5UNZw62I03d47Vuoe3JC+cDoZXIgNuR2Pi1zM9kopE4HaQyYno60h427Eo3cThg30L97sjz+/+azFUzYDn/w1u/0LS3CsYw5dLgvohah1Msi3QKBgGyd5BLsq4DpV60mcNvUMWh6COlhADYbqGM7DF8GZ81PrSli897C246YFifMINJxez0W6NAGZBfeQ20vT2louxPegYEDVUJ0eFoGikSKspcN405LJDXcMwOZEy9Jlo0OHpxpq363zbXcbZi5CkhNsMiS25JoLo/FQO8L2yu17Vn0'

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}