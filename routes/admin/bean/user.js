class User{
    constructor(uid,pass,mobile,email,idcard,address){
        this.uid = uid;
        this.pass = pass;
        this.mobile = mobile;
        this.email = email;
        this.idcard = idcard;
        this.address = address;
    }
}
module.exports = User;