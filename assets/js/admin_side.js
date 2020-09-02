$(function(){
    //声明截取后的URL的变量，为了获取点击了哪个slide页面
    var  locationUrl
    //如果url后面不存在参数
    if(location.href.indexOf('?')==-1)
    {
     locationUrl=location.href.substring(location.href.lastIndexOf('/')+1)
    }else //存在参数
    {
     locationUrl=location.href.substring(location.href.lastIndexOf('/')+1,location.href.indexOf('?'))
    }
    if(locationUrl=='posts'||locationUrl=='post-add'||locationUrl=='categories'){
      $('#menu-posts').addClass('in')
      $('#menu-posts').attr('aria-expanded','true')
    }else if(locationUrl=='nav-menus'||locationUrl=='slides'||locationUrl=='settings'){ 
      $('#menu-settings').addClass('in')
      $('#menu-settings').attr('aria-expanded','true')
    }
    $('[data-id='+locationUrl+']').addClass('active')
  })
