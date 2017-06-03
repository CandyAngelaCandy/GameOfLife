/**
 * Created by dell on 2017/6/3.
 */
var applyRule=require('../src/js/GameOfLife');
import add from '../src/js/GameOfLife';
import cells from '../src/js/GameOfLife';
import cellXLen from '../src/js/GameOfLife';

var expect = require('C:\\Users\\dell\\WebstormProjects\\LifeGame\\GameOfLifeTest' +
    '\\node_modules\\chai').expect;

describe('生命游戏规则函数的测试', function() {
    it('(1,1)位置 应该等于 0', function() {
        expect(applyRule(1, 1)).to.be.equal(0);
    });
});

