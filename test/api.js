/**
 * @file api.js
 * @description 接口测试文件
 * @author schoeu
 * */

var fs = require('fs');
var expect = require('chai').expect;
var xmlpro = require('../index');

describe('api test.', function () {
    var fFile = fs.readFileSync(__dirname + '/xmls/test1.xml');
    var sFile = fs.readFileSync(__dirname + '/xmls/test2.xml');
    var tFile = fs.readFileSync(__dirname + '/xmls/test3.xml');

    it('deep 1', function () {
        var dataPath = 'item.key';
        xmlpro.getDatas(fFile.toString(), dataPath, function (err, rs) {
            expect(rs).to.be.deep.equal([['key1']]);
        });
    });

    it('deep 2', function () {
        var dataPath = 'item.display.title';
        xmlpro.getDatas(fFile.toString(), dataPath, function (err, rs) {
            expect(rs).to.be.deep.equal([['title1']]);
        });
    });

    it('deep 3', function () {
        var dataPath = 'item.display.list.name';
        xmlpro.getDatas(fFile.toString(), dataPath, function (err, rs) {
            expect(rs).to.be.deep.equal([['name1']]);
        });
    });

    it('mux deep 3', function () {
        var dataPath = 'item.display.list.name';
        xmlpro.getDatas(sFile.toString(), dataPath, function (err, rs) {
            expect(rs).to.be.deep.equal([['name1'], ['name2'], ['name3']]);
        });
    });

    it('mux deep 4', function () {
        var dataPath = 'item.display.imgs.attr.src';
        xmlpro.getDatas(sFile.toString(), dataPath, function (err, rs) {
            expect(rs).to.be.deep.equal([['jpg'], ['png']]);
        });
    });

    it('invalid xml data.', function () {
        var dataPath = 'item.display.imgs.attr.src';
        xmlpro.getDatas(tFile.toString(), dataPath, function (err, rs) {
            expect(!!err).to.be.ok;
            expect(!!rs).to.not.be.ok;
        });
    });
});
