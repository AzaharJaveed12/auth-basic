const monk=require("monk");

const db=monk("localhost/auth-basic");

module.exports=db;