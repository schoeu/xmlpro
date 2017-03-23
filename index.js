/**
 * Created by schoeu on 2017/3/22.
 */
var parseString = require('xml2js').parseString;

var filterCtt = [];
var keyLength;

module.exports = {
    getDatas: function (xmlString, keys, cb) {
        var me = this;
        parseString(xmlString, function (err, result) {
            if (err) {
                cb.call(this, err);
            }
            else if (result) {
                cb.call(this, null, me.getKeys(result, keys));
            }
        });
    },
    getKeys: function (data, keys) {
        filterCtt = [];
        keyLength = keys.length;
        dataAlasis(data, keys, 0);
        return filterCtt;
    }
};

/**
 * xml递归解析函数
 *
 * @param {Object} d xml数据对象
 * @param {Array} k 环境属性路径
 * @param {int} l 数据层级
 * */
function dataAlasis(d, k, l) {
    k = k || [];
    if (Array.isArray(d)) {
        var key = k[l];
        for (var i = 0; i < d.length; i++) {
            var item = d[i];
            var crtData = item[key] || [];
            l && (l = k.indexOf(key));
            if (l == keyLength - 1) {
                filterCtt.push(crtData);
            }
            else {
                l++;
                arguments.callee(crtData, k, l);
            }
        }
    }
    else {
        var subData = d[k[l]];
        l++;
        if (subData) {
            arguments.callee(subData, k, l);
        }
    }
}
