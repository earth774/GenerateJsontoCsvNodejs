'use strict';

const fs = require('fs');

 

const express = require('express')
const app = express()
const port = 3000
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


app.get('/', (req, res) => {
    let rawdata = fs.readFileSync('sampran-organic-social-mover-export_data.json');  
    let student = JSON.parse(rawdata);  
    let data = [];
    // for (var key in student.users) {
    //     if (!student.users.hasOwnProperty(key)) continue;
    //     var obj = student.users[key];
        
    //    /*  code for check between */
    //     var moonLanding = new Date(obj.created_at);
    //     let data_check_month = moonLanding.getMonth()  == 10;
    //     let data_check_month1 = moonLanding.getMonth()  == 11;
    //     let date_check = moonLanding.getDate()>=23

    //     if(data_check_month){
    //         if(date_check){
    //             data.push(obj)
    //         }
    //     }

    //     if(data_check_month1){
    //             data.push(obj)
    //     }
    // }

    for (var key in student) {
        if (!student.hasOwnProperty(key)) continue;
        var obj = student[key];
        
       /*  code for check between */
        // var moonLanding = new Date(obj.created_at);
        // let data_check_month = moonLanding.getMonth()  == 10;
        // let data_check_month1 = moonLanding.getMonth()  == 11;
        // let date_check = moonLanding.getDate()>=23

        // if(data_check_month){
        //     if(date_check){
        //         data.push(obj)
        //     }
        // }

        // if(data_check_month1){
                data.push(obj)
        // }
    }
    const csvWriter = createCsvWriter({
        path: 'path/to/file.csv',
        header: [
            {id: 'firstname', title: 'ชื่อ'},
            {id: 'lastname', title: 'นามสกุล'},
            // {id: 'tel', title: 'เบอร์โทรศัพท์'},
            {id: 'email', title: 'อีเมล'},
        ]
    });
    csvWriter.writeRecords(data)       // returns a promise
    .then(() => {
        console.log('...Done');
    });
    res.json(data)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))