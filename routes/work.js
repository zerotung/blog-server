var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/paiban', function(req, res, next) {

    let date = [];

    fs.readFile('./data/paiban.json', (err, data) => {
        if (err) {
            return res.send({
                status: 0,
                info: '读取文件失败'
            });
        }

        date = JSON.parse(data.toString());

        res.render('work/paiban/index', {
            date: date
        });
    });
});

router.post('/paiban', function(req, res, next) {

    let name = req.body.name || '';
    let tel = req.body.tel || '';
    let date = req.body.date || '';

    if (!name) {
        return res.send({
            status: 0,
            info: '请输入您的名字'
        });
    }
    if (!tel || (tel.length != 11 && tel.length != 5)) {
        return res.send({
            status: 0,
            info: '请输入正确格式的电话'
        });
    }
    if (date == -1) {
        return res.send({
            status: 0,
            info: '请选择日期'
        })
    }
    fs.readFile('./data/paiban.json', (err, data) => {
        if (err) {
            return res.send({
                status: 0,
                info: '读取文件失败'
            });
        }

        let newData = JSON.parse(data.toString());
        if (newData[date].name == '') {
            newData[date].name = name;
            newData[date].tel = tel;

            stringData = JSON.stringify(newData);

            fs.writeFile('./data/paiban.json', stringData, err => {
                if (err) {
                    return res.send({
                        status: 0,
                        info: '文件写入失败'
                    });
                }

                return res.send({
                    status: 1,
                    info: '提交成功'
                });
            });

        } else {
            return res.send({
                status: 0,
                info: '刚刚被人抢走了，请重新选择'
            });
        }
    })
})

module.exports = router;