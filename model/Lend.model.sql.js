const sql = require("./db");

//constructor ตัวสร้าง object
//Lend เป็น class
//lend ตัวเล็กคือพารามิเตอร์

module.exports = Lend = function (lend) {
    //atrributes
    this.name = lend.name;
    this.type = lend.type;
    this.img = lend.img;
};

//Methods
Lend.create = (newLend, result) => {
    //INSERT INTO lend SET name,  img VALUES ("ปลั๊กไฟ",  "url")
    sql.query("INSERT INTO re SET ?", newLend, (err, res) => {
        //มี error เกิดขึ้น
        if (err) {
            console.log("err", err);
            result(err, null);
            return
        }
        //ไม่มี error
        console.log("new Lend cerated");
        result(null, { id: res.id, ...newLend });
    });

}

//get all lend
Lend.getAll = (result) => {
    //SELECT * FROM lend
    sql.query("SELECT * FROM re", (err, res) => {
        //มี error เกิดขึ้น
        if (err) {
            console.log("err", err);
            result(err, null);
            return;
        }
        //ไม่มี error
        console.log("get All lend");
        result(null, res);
    });
};

//
Lend.getById = (reId, result) => {
    //SELECT * FROM re WHERE id = lendId
    sql.query(
        `SELECT * FROM re WHERE id = ${reId}`,

        (err, res) => {
            //มี error เกิดขึ้น
            if (err) {
                console.log("err", err);
                result(err, null);
                return;
            }
            //ไม่มี error
            console.log("get lend by Id");
            if (res.length) {
                result(null, res[0]);
            }
            result({ kind: "nod_found" }, null);

        }
    );
};


//
Lend.deleteById = (reId, result) => {
    // DELETE FROM re WHERE id = lendId
    sql.query(
        `DELETE FROM re WHERE id = ${reId}`,
        (err, res) => {

            if (err) {
                console.log("err", err);
                result(err, null);
                return;
            }

            console.log("delete lend by Id");

            if (res.affectedRows === 1) {
                result(null, { message: "Lend deleted successfully." });
            } else {

                result({ kind: "not_found" }, null);
            }
        }
    );
};

//update
Lend.updateById = (reId, result) => {
    //UPDATE re SET nam = "name",  img = "img" WHERE id = "id"
    console.log ("reId",reId,"result",result)
    sql.query(" UPDATE re SET name = ?,  img = ?,  WHERE id =? ",
        [result.name, result.type, result.img, reId],
        (err, res) => {
            if (err) {
                // console.log(res);
                // result(err, null)
                return 0 ;
            }
            if (res.affectedRows === 0) {
                // result({ kind: "not_found" }, null)
                // result;
                return 0;
            }
            result(null, { id: id, ...res });
        }
    );
};



//  = Lend;