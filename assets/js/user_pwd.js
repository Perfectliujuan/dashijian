$(function () {
    //从layui中获取form对象
    let form = layui.form;
    let layer = layui.layer;
    //通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            // 判断新密码于原密码
            if (value == $('[name="oldPwd"]').val()) {
                return '新密码与原密码相同'
            };
        },
        rePwd: function (value) {
            if (value !== $('[name="newPwd"]').val()) {
                return '确认密码与新密码不一致'
            }
        }
    });

    //监听表单的submit事件，发送ajax请求
    $('.layui-form').on('submit', function (e) {
        console.log(666);
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！');
                //重置表单 只有原生的dom元素才可以调用reset这个方法
                $('.layui-form')[0].reset()
            }
        })
    })
})