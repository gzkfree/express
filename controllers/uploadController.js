//引入文件上传模块
var formidable=require('formidable')
var path=require('path')
exports.doUpload=(req,res)=>{
    //实例化新的文件上传空间
    var from=new formidable.IncomingForm()
    from.encoding='utf-8'
    from.uploadDir=__dirname+'/../assets/uploads'
    from.keepExtensions=true
    from.parse(req,(err,fileds,files)=>{
    var fileName=path.basename(files.img.path)
        if(err){
            res.json({
                code:'201',
                msg:'上传失败'
            })
        }else{
            res.json({
                code:'200',
                msg:'上传成功',
                img:fileName
            })
        }
    })
}