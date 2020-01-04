const Employee = require("./Employee");

class Manager extends Employee{
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole(){
        return "Manager";
    };

    getOffice(){
        return this.officeNumber;
    };

    getIcon(){
        return "fa-briefcase";
    };
};


module.exports = Manager; 