import Point from '../src/point';
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import locatorMatchers from './matchers/locator_matchers';

chai.use(locatorMatchers);

global.abc = 'def';

describe('Point', function() {
  it('is at a position in space', function() {
    const point1 = new Point(0, 0);
    const point2 = new Point(25, 0);
    const point3 = new Point(3, 0);

    expect(point2).to.be.within(3).feet.of.locator(point1);
    expect(point3).to.be.within(4).inches.of.locator(point1);
  });

  describe('#distance', function() {
    it('returns the distance from another point', function() {
      const point22 = new Point(2, 2);
      const point32 = new Point(3, 2);
      const point44 = new Point(4, 4);
      const point15 = new Point(1, 5);

      expect(point22.distance(point32)).to.eq(1);
      expect(point22.distance(point44)).to.be.closeTo(2*Math.SQRT2, Number.EPSILON);
    });
  });
});
