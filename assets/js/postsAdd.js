$(function(){
    //获取分类
    $.ajax({
        type: 'get',
        url: 'getAllCategories',
        dataType: 'json',
        success: function (result) {
            var html = template('categoryList', { categories: result })
            $('#category').html(html)
        }
    })
    //上传图片
    $('#feature').on('change',function(){
        var formdata=new FormData()
        var myfile=$("#feature")[0].files[0]
        formdata.append('img',myfile)
        console.log(myfile)
        $.ajax({
            type:'post',
            url:'uploadFile',
            data:formdata,
            dataType:'json',
            processData:false,
            contentType:false,
            success:function(reslut){
               $('.help-block.thumbnail').attr('src','/uploads/'+reslut.img)
               $('.help-block.thumbnail').css('display','block')
               $('.postimg').val('/uploads/'+reslut.img)
            }
        })
    })
    CKEDITOR.replace('content')

  //添加文章
    $('#btnSave').on('click',function(){
    CKEDITOR.instances.content.updateElement()
        if(location.href.indexOf('id')==-1){
            pot('addPost')
        }else{
            pot('editPost')
        }
    })
  //判断是否为编辑状态,如果是就为编辑状态
   if(location.href.indexOf('id')!=-1){
       var query=location.href.substring(location.href.lastIndexOf('?')+1)
       var arr= query.split('=')
       $('#postid').val(arr[1])
    $.ajax({
        type:'get',
        url:'getPostByID',
        data:{id:arr[1]},
        dataType:'json',
        success:function(result){
            $('.page-title > h1').text('编辑文章') 
            //编辑状态给表单赋值
            $('#title').val(result.data.title)
            $('.help-block.thumbnail').css('display','block')
            $('.help-block.thumbnail').attr('src',result.data.feature)
            $('#slug').val(result.data.slug)
            $('#status').val(result.data.status)
            $('#category').val(result.data.category_id)
            //拼接合适的时间格式，去掉S
            // var mydata=result.data.created.substring(0,result.data.created.lastIndexOf(':'))
            console.log(result.data.created)
            $('.postimg').val(result.data.feature)
            $('#created').val(result.data.created)
            $('#content').val( result.data.content)
        }
      })
   }
})
//封装编辑请求
function pot(url){
    $.ajax({
        type:'post',
        url:url,
        data:$('form').serialize(),
        dataType:'json',
        success:function(reslut){
            location.href='/admin/posts'
        }
    })
}