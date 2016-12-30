/**
 * Created by lijinke on 16/12/29.
 */
let http = require('http'),
    express = require('express'),
    fs = require('fs'),
    xml2js = require('xml2js').parseString,
    Busboy = require('busboy'),
    json2xls = require('json2xls');
let app = express();


app.post('/dev/xmlToExcelTest/updateXml',(req,res,next)=>{
	
    let busboy = new Busboy({
        headers: req.headers
    });
    res.setHeader("Access-Control-Allow-Origin", "*");//允许跨域请求
    let filesSrc = [];
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

        file.on('data', function(data) {
            let xml = data.toString();
            console.log(__dirname)
            xml = xml.replace(/(\<\/|\<)(\d*)/gm,function (a,b,c){if(c) {return b+'T'+c }else return a})
            xml2js(xml,(err,result)=>{
                if(!err){
                    const tableHead = getTableHead(result.WifiSystemParameters),
                          excelData = zipper(dataHandler(result.WifiSystemParameters),tableHead);
                    let xls = json2xls(excelData),
                        src = `${__dirname+"/xlsx/"+(filename.replace(/(.*)(\.xml)$/,'$1'))}.xlsx`;
                    fs.writeFileSync(src, xls, 'binary');
                    filesSrc.push(src);
                }else{
                    console.log('XML change JSON error',err)
                }
            });
            console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });
        file.on('end', function() {
            console.log('File [' + fieldname + '] Finished');
        });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    busboy.on('finish', function() {
        res.send(filesSrc);
        console.log('Done parsing form!');
    });
    req.pipe(busboy);

    //转换成2维数组
    function dataHandler (data) {
        let ind = 0,result=[];
        for (let key in data) {
            let arr = [];
            let o = data[key][0];
            for( let k in o ) {
                arr.push(k+':'+JSON.stringify(o[k][0]))
            }
            result[ind++] = arr
        }
        return result
    }
    //处理数据对应关系
    function zipper ( list , tableHead ) {
        //from [[1,2],[3,4,5,6]]
        //to [[1,3],[2,4],[5],[6]]
        let ind = 0;
        return list.reduce((x,y)=>{
            let temp = ind++;
            y.forEach((v,i)=>{
                (!(x[i] instanceof Object)) && (x[i]={});
                x[i][tableHead[temp]]=v
            });
            return x
        },[])
    }
    //表头
    function getTableHead( json ){
        return Object.keys(json);
    }
});

http.createServer(app).listen(3000, function () {
    console.log('info', 'Express server listening on port 3000' );
});
