
    // Funkce pro generování náhodného emailu
    export function generateRandomEmail() {
        const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
        let email = '';
        for (let i = 0; i < 10; i++) {
            email += chars[Math.floor(Math.random() * chars.length)];
        }
        email += '@czechitas.cz';
        return email;
    }

   
    // // Generování náhodného jména a emailu
    // const randomName = faker.person.fullName();
    // const randomEmail = faker.internet.email();
  

    
    




    



