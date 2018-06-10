/**
 * 一些常用的js设计模式
 */

 // AOP（面向切面编程）式的装饰者模式
 export const before = function(fn, beforefn) {
    return function () {
        beforefn.apply(this, arguments);
        return fn.apply(this, arguments);
    }
 }
 export const after = function(fn, afterfn) {
    return function () {
        return fn.apply(this, arguments);
        afterfn.apply(this, arguments);
    }
 }

 // 利用闭包实现的单例模式
  export const singleton  = function (fn) {
    var result;
    return function () {
        return result || ( result = fn.apply(this, arguments) );
    }
}

// 观察者模式
export const Ev = (function() {
    var clientList = {},
        on,
        emit,
        off;
        on = function(key,fn) {
            if(!clientList[key]){
                clientList[key] = [];
            }
            clientList[key].push(fn);
        }
        emit = function() {
            var key = Array.prototype.shift.call( arguments);
            var fns = clientList[key];
            if(!fns || fns.length === 0) return;
            for(var i =0,fn;fn = fns[i++];){
                fn.apply(this, arguments);
            }
        }
        off = function( key, fn ) {
            var fns = clientList[key];
            if(!fns) return false;
            if(!fn){
                fns&&( fns.length = 0 );
            } else {
                for(var j = fns.length - 1; j >= 0; j--){
                    var _fn = fns[j];
                    if(_fn === fn){
                        fns.splice( j,1 );
                    } 
                }
            }
        }

        return {
            on,
            emit,
            off
        }

} ());