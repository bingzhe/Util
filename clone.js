//克隆对象
function copy(obj) {
    var copy = Object.create(Object.getPrototypeOf(obj));
    var propNames = Object.getOwnPropertyNames(obj);

    propNames.forEach(function(name) {
        var desc = Object.getOwnPropertyDescriptor(obj, name); //获取指定对象的自身属性描述符
        Object.defineProperty(copy, name, desc);
    });

    return copy;
}