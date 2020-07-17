//入口函数
$(function () {
    //点击去注册账号
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show()
    });
    //点击去登录账号
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide()
    })
    //从layui中获取form对象
    let form = layui.form
    let layer = layui.layer
    //通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            let pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次输入的密码不一样'
            }
        }
    });

    // 注册表单的请求
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        let data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })

    // 登录表单的请求
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })

})