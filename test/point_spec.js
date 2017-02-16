import Point from '../src/point';
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import locatorMatchers from './matchers/locator_matchers';

chai.use(locatorMatchers);

describe('Point', function() {
  it('can be at the origin', function() {
    const originPoint = new Point(0, 0);
    const notOriginPoint = new Point(1, 1);
    expect(originPoint).to.be.locatedAt.origin;
    expect(notOriginPoint).to.not.be.locatedAt.origin;
  });

  it('is at a location', function() {
    const point1 = new Point(3, 4);
    const point2 = new Point(10, 10);

    expect(point1).to.be.locatedAt(3, 4);
    expect(point1).to.not.be.locatedAt(10, 10);
    expect(point2).to.be.locatedAt(10, 10);
  });

  it('must be a locator or the matcher fails', function() {
    const notALocator = {};

    expect(function() {
      expect(notALocator).to.be.locatedAt(3, 4);
    }).to.throw(chai.AssertionError);
  });

  it('can be a distance from another point', function() {
    const point = new Point(12, 0);
    const anotherPoint = new Point(0, 0);

    expect(point).to.be.atDistanceOf(12).inches.from(anotherPoint);
    expect(point).to.be.atDistanceOf(1).foot.from(anotherPoint);
    expect(point).to.not.be.atDistanceOf(1).inch.from(anotherPoint);
    expect(point).to.not.be.atDistanceOf(2).feet.from(anotherPoint);
  });

  describe('#distanceTo', function() {
    it('returns the distance from another point', function() {
      const point22 = new Point(2, 2);
      const point32 = new Point(3, 2);
      const point44 = new Point(4, 4);
      const point15 = new Point(1, 5);

      expect(point22.distanceTo(point32)).to.eq(1);
      expect(point22.distanceTo(point44)).to.be.closeTo(2*Math.SQRT2, Number.EPSILON);
    });
  });
});
