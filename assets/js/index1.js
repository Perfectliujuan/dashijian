//入口函数
$(function () {
    //调用封装获取用户信息的函数
    getUserInfo()
})
//封装一个函数获取用户信息 发送ajax请求
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            //把返回的数据传进去
            renderAvatar(res.data)
        }
    });
    // 获取layer对象
    var layer = layui.layer;
    //给退出按钮注册点击事件
    $('#btnlogout').on('click', function () {

        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '../../login1.html'

            // 关闭 confirm 询问框
            layer.close(index)
        })
    })
};

// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}