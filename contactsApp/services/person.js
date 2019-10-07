
export default class Person { 
    constructor(name, surname, middleName, phoneNumber, site, key) { 
        this.name = name;
        this.surname = surname;
        this.middleName = middleName;
        this.phoneNumber = phoneNumber;
        this.site = site;
        this.key = key;
    }

    getFullName = () => { 
        return `${this.name} ${this.middleName} ${this.surname}`;
    }
}