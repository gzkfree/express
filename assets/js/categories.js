$(function () {
    //发送获取所以目录的请求
    $.ajax({
        type: 'get',
        url: 'getAllCategories',
        dataType: 'json',
        success: function (result) {
            var html = template('categories', { categories: result })
            $('tbody').html(html)
        }
    })
    $('.checkAll').on('click', function () {
    //设置单个复选框的checked属性
      $('.checkone').prop('checked',$(this).prop('checked'))
      if( $('.checkAll').prop('checked'))
      {
          $('.btn-sm').fadeIn(500)
      }else{
        $('.btn-sm').fadeOut(500)
      }
    })

//单击单个复选框
   $('tbody').on('click','.checkone',function(){
       //获取tboy下所有被选中的复选框
       var allcheck=$('tbody .checkone:checked')
       var checkedNum=allcheck.length
       if(checkedNum==$('tbody .checkone').length){
            $('.checkAll').prop('checked','checked')
       }else
       {
            $('.checkAll').prop('checked',null)
       }
       if(checkedNum>1){
        $('.btn-sm').fadeIn(500)
       }else{
        $('.btn-sm').fadeOut(500)
       }
   })
//添加目录操作
   $('.btnAdd').on('click',function(){
        // 发送ajax请求
        $.ajax({
            type:'get',
            url:'/admin/addCategories',
            data:$('form').serialize(),
            dataType:'json',
            success:function(result){
                console.log(result)
            }
        })
   })
})
//编辑操作
$('tbody').on('click','.btn.btn-info.btn-xs',function(){
    //获取编辑按钮内的自定义属性的值为一个对象
    var btnEditMsg=$(this).data()
    $('.btnAdd').fadeOut()
    $('.btnEdit').fadeIn()
    $('#slug').val(btnEditMsg.slug)
    $('#name').val(btnEditMsg.name)
    $('#id').val(btnEditMsg.id)
})
//发送编辑的请求
$('.btnEdit').on('click',function(){
    console.log(1)
    $.ajax({
        type:'post',
        url:'/admin/editCategories',
        data:$('form').serialize(),
        dataType:'json',
        success:function(){
            $('.btnAdd').fadeIn()
            $('.btnEdit').fadeOut()
        }
    })
})
//删除请求 
   $('tbody').on('click','.btn.btn-danger.btn-xs',function(){
       //发送删除请求
       $.ajax({
           type:'get',
           url:'/admin/delCategories',
           data:{id:$(this).data().id},
           dataType:'json',
           success:function(result){
                location.href='/admin/categories'
           }
       })
   })  
$('.btn-dels').on('click',function(){
   var arr=[]
   for(var i=0;i<$('.checkone:checked').length;i++){
       arr.push($('.checkone:checked')[i].dataset.id)
   }
   $.ajax({
        type:'get',
        url:'/admin/delCategories',
        data:{id:arr.toString()},
        dataType:'json',
        success:function(){
            location.href='/admin/categories'
        }
   })
})