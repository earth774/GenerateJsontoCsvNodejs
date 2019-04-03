'use strict';

const fs = require('fs');



const express = require('express')
const app = express()
const port = 3000
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


app.get('/', (req, res) => {
    let rawdata = fs.readFileSync('sampran-organic-social-mover-export.json');
    let student = JSON.parse(rawdata);
    let data = [];
    for (let key in student.users) {
        if (!student.users.hasOwnProperty(key)) continue;
        let obj = student.users[key];
        // Join 
        obj.career_name = JoinFunc(student, obj.career_id, 'career')
        obj.age_name = JoinFunc(student, obj.ageID, 'age')
        obj.income_name = JoinFunc(student, obj.income_id, 'income')
        obj.sex_name = JoinFunc(student, obj.sex_id, 'sex')
        obj.education_level_name = JoinFunc(student, obj.education_level_id, 'education_level')
        obj.contribute_ever_name = JoinFunc(student, obj.contribute_ever_id, 'contribute_ever')
        obj.outcome_food_name = JoinFunc(student, obj.outcome_food, 'outcome_food')
        obj.outcome_travel_name = JoinFunc(student, obj.outcome_travel, 'outcome_travel')

        // join table user 
        obj.role_name = JoinFuncUser(student, obj, 'role')
        obj.channel_name = JoinFuncUser(student, obj, 'channel')
        obj.factor_effect_name = JoinFuncUser(student, obj, 'factor_effect')
        obj = JoinFuncUser(student, obj, 'interesting_reason')
        obj = JoinFuncUser(student, obj, 'activity_interesting')
        obj.contribute_activity_name = JoinFuncUser(student, obj, 'contribute_activity')
        obj.contribute_type_name = JoinFuncUser(student, obj, 'contribute_type')
        obj.contribute_reason_name = JoinFuncUser(student, obj, 'contribute_reason')
        obj.contribute_social_movement_name = JoinFuncUser(student, obj, 'contribute_social_movement')

        /*  code for check between */

        data.push(obj)
    }


    const csvWriter = createCsvWriter({
        path: 'path/to/file.csv',
        header: [{
                id: 'firstname',
                title: 'ชื่อ'
            },
            {
                id: 'lastname',
                title: 'นามสกุล'
            },
            {
                id: 'tel',
                title: 'เบอร์โทรศัพท์'
            },
            {
                id: 'email',
                title: 'อีเมล'
            },
            {
                id: 'line_id',
                title: 'Line id'
            },
            {
                id: 'address',
                title: 'ที่อยู่'
            },
            {
                id: 'district',
                title: 'ตำบล/แขวง'
            },
            {
                id: 'amphoe',
                title: 'อำเภอ/เขต'
            },
            {
                id: 'province',
                title: 'จังหวัด'
            },
            {
                id: 'zipcode',
                title: 'รหัสไปรษณีย์'
            },
            {
                id: 'country',
                title: 'ประเทศ'
            },
            {
                id: 'sex_name',
                title: 'เพศ'
            },
            {
                id: 'age_name',
                title: 'ช่วงอายุของผู้ใช้ '
            },
            {
                id: 'education_level_name',
                title: 'ระดับการศึกษา '
            },
            {
                id: 'career_name',
                title: 'อาชีพหลักในปัจจุบัน '
            },
            {
                id: 'role_name',
                title: 'บทบาทหลักของท่านในระบบอาหารอินทรีย์ '
            },
            {
                id: 'income_name',
                title: 'รายได้ครัวเรือนต่อเดือน (บาท) '
            },
            {
                id: 'outcome_food_name',
                title: 'ค่าใช้จ่ายในด้านอาหารต่อเดือน (บาท) '
            },
            {
                id: 'outcome_travel_name',
                title: 'ค่าใช้จ่ายในด้านการท่องเที่ยวต่อเดือน (บาท) '
            },
            {
                id: 'channel_name',
                title: 'ช่องทางที่ต้องการใช้ในการรับข่าวสารจากสามพรานโมเดล '
            },
            {
                id: 'factor_effect_name',
                title: 'รับปัจจัยใดที่มีผลต่อการบริโภคอาหารอินทรีย์ '
            },
            {
                id: 'ir1',
                title: 'ต้องการมีสุขภาพที่ดี '
            },
            {
                id: 'ir2',
                title: 'ต้องการมีชีวิตที่สมดุล '
            },
            {
                id: 'ir3',
                title: 'เป็นของดีมีคุณภาพ '
            },
            {
                id: 'ir4',
                title: 'เป็นทางเลือกที่คุ้มค่า '
            },
            {
                id: 'ir5',
                title: 'รู้แหล่งวัตถุดิบ เชื่อมั่นได้ '
            },
            {
                id: 'ir6',
                title: 'มีระบบการทำงานโปร่งใส เป็นธรรม '
            },
            {
                id: 'ir7',
                title: 'ร่วมรักษาสิ่งแวดล้อม '
            },
            {
                id: 'ir8',
                title: 'อยากมีส่วนร่วมสร้างระบบอาหารยั่งยืน '
            },
            {
                id: 'ir9',
                title: 'ช่วยสนับสนุนชุมชนเกษตรกร '
            },
            {
                id: 'ir10',
                title: 'เป็นไลฟ์สไตล์ของคนปัจจุบัน '
            },
            {
                id: 'ir10',
                title: 'เป็นไลฟ์สไตล์ของคนปัจจุบัน '
            },
            {
                id: 'contribute_ever_name',
                title: 'ท่านได้มีส่วนร่วมในกิจกรรมขับเคลื่อนสังคมบ้างหรือไม่ '
            },
            {
                id: 'contribute_activity_name',
                title: 'ประเภทกิจกรรมที่ท่านเข้าไปมีส่วนร่วม(เลือกได้มากกว่าหนึ่งคำตอบ)านได้มีส่วนร่วมในกิจกรรมขับเคลื่อนสังคมบ้างหรือไม่ '
            },
            {
                id: 'contribute_type_name',
                title: 'ประเภทงานขับเคลื่อนสังคมที่คุณเข้าไปมีส่วนร่วม(เลือกได้มากกว่าหนึ่งคำตอบ) '
            },
            {
                id: 'contribute_reason_name',
                title: 'เหตุผลสำคัญที่ทำให้เข้าไปมีส่วนร่วมในกิจกรรมดังกล่าว(เลือกได้มากกว่าหนึ่งคำตอบ) '
            },
            {
                id: 'contribute_social_movement_name',
                title: 'รับข่าวสารและเข้าร่วมกิจกรรม Social Movement '
            },
            {
                id: 'ai1',
                title: 'กิจกรรมฝึกอบรม/ Workshop '
            },
            {
                id: 'ai2',
                title: 'กิจกรรมเสวนาแลกเปลี่ยนเรียนรู้ '
            },
            {
                id: 'ai3',
                title: 'การเป็นสมาชิกเพื่อซื้อสินค้าผ่าน Online Market และรับข่าวสาร '
            },
            {
                id: 'ai4',
                title: 'กิจกรรมการท่องเที่ยวเชิงเกษตรอินทรีย์ '
            },
            {
                id: 'ai5',
                title: 'การมีส่วนร่วมให้ความคิดเห็น '
            },
            {
                id: 'ai6',
                title: 'การเรียนรู้เรื่องมาตรฐานเกษตรอินทรีย์ '
            },
            {
                id: 'ai7',
                title: 'การเรียนรู้และมีส่วนร่วมในระบบ PGS (ระบบรับรองแบบมีส่วนร่วม) เช่น ร่วมประชุมกลุ่มเกษตรกร '
            },
            {
                id: 'ai8',
                title: 'การร่วมสนับสนุนมาตรการรักษาสิ่งแวดล้อม'
            },
            {
                id: 'ai9',
                title: 'การรับคำปรึกษาแบบ Consulting หรือ Coaching จากสามพรานโมเดล'
            },
            {
                id: 'ai10',
                title: 'การร่วมกิจกรรมออนไลน์ เช่น ตอบคำถาม เกม โดยสามารถสะสมแต้มแลกรับรางวัล'
            },
            {
                id: 'ai11',
                title: 'การทำธุรกิจ Franchise ภายใต้แบรนด์ “ร้านตลาดสุขใจ by สามพรานโมเดล” '
            },
            {
                id: 'ai12',
                title: 'การนำความรู้หรืองานที่ทำมาร่วมขับเคลื่อนสามพรานโมเดล '
            },
        ]
    });
    csvWriter.writeRecords(data) // returns a promise
        .then(() => {
            console.log('...Done');
        });
    res.json(data)
})

function JoinFunc(student, id, name) {
    if ((id == undefined) || (student[name][id] == undefined)) return " ไม่มีเนื้อหา"
    if (name == "interesting_reason") {
        if (student[name][id] > 0 && student[name][id] <= 10) {
            return student[name][id].name;
        }
    }
    if (name == "activity_interesting") {
        if (student[name][id] > 0 && student[name][id] <= 12) {
            return student[name][id].name;
        }
    }
    return student[name][id].name;
}

function JoinFuncUser(student, data, name) {
    let dataArr = [];
    for (let key in student[name + "_user"]) {
        if (!student[name + "_user"].hasOwnProperty(key)) continue;
        let obj = student[name + "_user"][key];
        if (obj.uid == data.uid) {

            if (name == "interesting_reason") {
                if (obj[name + "_id"] == 1) {
                    data.ir1 = obj.score;
                } else if (obj[name + "_id"] == 2) {
                    data.ir2 = obj.score;
                } else if (obj[name + "_id"] == 3) {
                    data.ir3 = obj.score;
                } else if (obj[name + "_id"] == 4) {
                    data.ir4 = obj.score;
                } else if (obj[name + "_id"] == 5) {
                    data.ir5 = obj.score;
                } else if (obj[name + "_id"] == 6) {
                    data.ir6 = obj.score;
                } else if (obj[name + "_id"] == 7) {
                    data.ir7 = obj.score;
                } else if (obj[name + "_id"] == 8) {
                    data.ir8 = obj.score;
                } else if (obj[name + "_id"] == 9) {
                    data.ir9 = obj.score;
                } else if (obj[name + "_id"] == 10) {
                    data.ir10 = obj.score;
                }
            } else if (name == "activity_interesting") {
                if (obj[name + "_id"] == 1) {
                    data.ai1 = obj.score;
                } else if (obj[name + "_id"] == 2) {
                    data.ai2 = obj.score;
                } else if (obj[name + "_id"] == 3) {
                    data.ai3 = obj.score;
                } else if (obj[name + "_id"] == 4) {
                    data.ai4 = obj.score;
                } else if (obj[name + "_id"] == 5) {
                    data.ai5 = obj.score;
                } else if (obj[name + "_id"] == 6) {
                    data.ai6 = obj.score;
                } else if (obj[name + "_id"] == 7) {
                    data.ai7 = obj.score;
                } else if (obj[name + "_id"] == 8) {
                    data.ai8 = obj.score;
                } else if (obj[name + "_id"] == 9) {
                    data.ai9 = obj.score;
                } else if (obj[name + "_id"] == 10) {
                    data.ai10 = obj.score;
                } else if (obj[name + "_id"] == 11) {
                    data.ai11 = obj.score;
                } else if (obj[name + "_id"] == 12) {
                    data.ai12 = obj.score;
                }
            } else {
                dataArr.push(JoinFunc(student, obj[name + "_id"], name))
            }
        }
    }
    if (name == "interesting_reason" || name == "activity_interesting") {
        return data
    } else {
        return dataArr;
    }
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))