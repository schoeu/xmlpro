/**
 * @file api.js
 * @description 接口测试文件
 * @author schoeu
 * */

var fs = require('fs');
var expect = require('chai').expect;
var xmlpro = require('../index');

var fileBuffer = fs.readFileSync(__dirname + '/xmls/test1.xml');

describe('api test.', function () {
    it('deep', function () {
        var dataPath = 'item.key';
        xmlpro.getDatas(fileBuffer.toString(), dataPath, function (err, rs) {
            expect(rs).to.be.deep.equal([['key1']]);
        });
    });
});
