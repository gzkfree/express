
$(function () {
  var pageNum = 1
  var pageSize =3
  //声明筛选对象
  var query = {}
  var category_id
  var status
  //点击筛选按钮
  $('#screen').on('click', function () {
    category_id= $('#categories option:selected').val()
    status= $('#status option:selected').val()
    //判断筛选是否选择所有分类，如果是就添加该对象，否则移除
    if (category_id != 'all') {
      query['category_id'] = category_id
    }else{
      delete query['category_id']
    }
    if (status != 'all') {
      query['status'] = status
    }else{
      delete query['status']
    }
    initData(query)
  })
  //发送请求获取总页数生成结构
  function initData(query = {}) {
    $.ajax({
      type: 'get',
      url: '/admin/getAllPosts',
      dataType: 'json',
      data: {
        pageNum,
        pageSize,
        ...query
      },
      success: function (resulut) {
        var html = template('posts', { posts: resulut.data })
        $('tbody').html(html)
        setPagnator(Math.ceil(resulut.total / pageSize))
      }
    })
  }
  initData()
  //分页插件自带函数
  function setPagnator(total) {
    $('.pagination').bootstrapPaginator({
      //版本号
      bootstrapMajorVersion: 3,
      //当前页码
      currentPage: pageNum,
      //总页数
      totalPages: total,
      onPageClicked: function (event, originalEvent, type, page) {
        //page就是当前需要获取数据的页码
        // console.log(page)
        //修改全局的pageNum,以让我们重新发起数据请求的时候能够获取到指定页码的数据
        pageNum = page
        initData(query)
      }
    })
  }
  //获取分类
  (function () {
    $.ajax({
      type: 'get',
      url: '/admin/getAllCategories',
      dataType: 'json',
      success: function (result) {
        var html = `<option value="all">所有分类</option>`
        for (i = 0; i < result.length; i++) {
          html += `<option value="${result[i].id}">${result[i].name}</option>`
        }
        $('#categories').html(html)
      }
    })
  })()
})
//发送删除请求
function del(id) {
  $.ajax({
    type: 'get',
    url: '/admin/delposts',
    dataType: 'json',
    data: { id: id },
    success: function (resulut) {
      location.href = '/admin/posts'
    }
  })
}