
/**
 * Created by lijinke on 16/12/29.
 */
let http = require('http'),
    express = require('express'),
    fs = require('fs'),
    multiparty= require('multiparty'),
    xml2js = require('xml2js').parseString,
    json2xls = require('json2xls');
let app = express();


app.use(express.static(`${__dirname}/public`));

app.post('/updateXml',(req,res,next)=>{
    const form = new multiparty.Form();
    form.parse(req,( err,fields,files )=>{
        if(err) throw  err;
        let {type} = fields;
        let filesInfo = [];
        files.file.forEach( file =>{
            let {path,originalFilename} = file;
            let xml = fs.readFileSync(path).toString();
            switch (type[0]){
                case "psgbehavior":
                    xml = xml.replace(/&(?=[^<]*>)/gm,'');
                    break;
                case "wifi":
                    xml = xml.replace(/(\<\/|\<)(\d*)/gm,function (a,b,c){if(c) {return b+'T'+c }else return a});
                    break;
            }
            xml2js(xml,(err,result)=>{
                if(!err){
                    result = result[getDataKeys(result)[0]];
                    let tableHead,excelData;
                    switch (type[0]){
                        case "feedback":
                            excelData = getFeedBackResultData(result);
                            break;
                        default :
                            tableHead = getDataKeys(result);
                            excelData = zipper(dataHandler(result),tableHead);
                    }
                    let xls = json2xls(excelData),
                        src = `${__dirname+"/xlsx/"+(originalFilename.replace(/(.*)(\.xml)$/,'$1'))}.xlsx`;
                    fs.writeFileSync(src, xls, 'binary');
                    filesInfo.push({
                        fileName:originalFilename
                    })
                }else{
                    console.log('XML change JSON error',err)
                }
            });
        });
        res.send(filesInfo);
    });

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
                x[i][tableHead[temp]] = v
            });
            return x
        },[])
    }
    //表头
    function getDataKeys( json ){
        return Object.keys(json);
    }
    //处理问卷调查数据结构
    function getFeedBackResultData ( result ) {
        let data = result[getDataKeys(result)[0]][0];
        data = data[getDataKeys(data)[0]];
        data.forEach( v =>{
             v['RESULT'] = JSON.stringify(v['RESULT']);
        });
        console.log(data)
        return data;
    }
});


app.set('port', process.env.PORT || 3030);
http.createServer(app).listen(app.get('port'), ()=> {
    console.log('Express server listening on port '+ app.get('port'));
});