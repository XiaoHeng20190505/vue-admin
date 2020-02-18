/**
 * 特殊字符的过滤，防止XSS等攻击操作
 * 将函数暴露出来给外部引用，使用export
 */
/**
 * 过滤特殊字符
 */
export function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&%*( )=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
/**
 * 验证用于邮箱格式，正确返回true，错误返回false
 */
export function checkUsername(str) {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (reg.test(str)) {
        return true;
    }else {
        return false;
    }
}
/**
 * 验证密码格式，正确返回true，错误返回false
 */
export function checkPassword(str) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    if (reg.test(str)) {
        return true;
    }else {
        return false;
    }
}
/**
 * 验证验证码是否正确，正确返回true，错误返回false
 */
export function checkVcode(str) {
    let reg = /^[a-z0-9]{6}$/;
    if (reg.test(str)) {
        return true;
    }else {
        return false;
    }
}