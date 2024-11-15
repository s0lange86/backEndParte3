import bcrypt from 'bcrypt';

const plainPassword = '123';
const hashedPassword = '$2b$10$jaYMBwto85a.ZhQHa2n0Q.Nua.RkVwVML/mxzacgRNehunaylu38a'; // Hash que aparece en tu base de datos

bcrypt.compare(plainPassword, hashedPassword)
    .then(result => {
        console.log({ plainPassword, hashedPassword, result }); // result debería ser true
    })
    .catch(err => {
        console.error(err);
    });
