const fs = require("fs");
const crypto = require("crypto");


crypto.pbkdf2("password", "salt", 100000, 64, "sha512", (err, derivedKey) => {
 console.log("crypto done ", 1)
})

crypto.pbkdf2("password", "salt", 100000, 64, "sha512", (err, derivedKey) => {
 console.log("crypto done ", 2)
})

crypto.pbkdf2("password", "salt", 100000, 64, "sha512", (err, derivedKey) => {
 console.log("crypto done ", 3)
})
crypto.pbkdf2("password", "salt", 100000, 64, "sha512", (err, derivedKey) => {
 console.log("crypto done ", 4)
})

crypto.pbkdf2("password", "salt", 100000, 64, "sha512", (err, derivedKey) => {
 console.log("crypto done ", 5)
})