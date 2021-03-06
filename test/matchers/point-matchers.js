import Point from '../../src/point';

export default function locatorMatchers(chai, utils) {
  chai.Assertion.addChainableMethod('locatedAt', function(x, y) {
    const object = utils.flag(this, 'object');
    this.assert(
      object.x() === x && object.y() === y,
      `expected ${object} to be located at (${x}, ${y})`,
      `expected ${object} to not be located at (${x}, ${y})`,
    );
  }, function() {
    const object = utils.flag(this, 'object');
    new chai.Assertion(object).instanceOf(Point);
  });

  chai.Assertion.addProperty('origin', function() {
    const object = utils.flag(this, 'object');
    this.assert(
      object.x() === 0 && object.y() === 0,
      `expected ${object} to be located at origin`,
      `expected ${object} to not be located at origin`
    );
  });

  chai.Assertion.addMethod('atDistanceOf', function(distance) {
    utils.flag(this, 'distance', distance);
  });

  chai.Assertion.addProperty('inch', function() {
    utils.flag(this, 'distanceMultiplier', 1);
    utils.flag(this, 'humanDistanceUnit', 'inch');
  });

  chai.Assertion.addProperty('inches', function() {
    utils.flag(this, 'distanceMultiplier', 1);
    utils.flag(this, 'humanDistanceUnit', 'inches');
  });

  chai.Assertion.addProperty('foot', function() {
    utils.flag(this, 'distanceMultiplier', 12);
    utils.flag(this, 'humanDistanceUnit', 'foot');
  });

  chai.Assertion.addProperty('feet', function() {
    utils.flag(this, 'distanceMultiplier', 12);
    utils.flag(this, 'humanDistanceUnit', 'feet');
  });

  chai.Assertion.addMethod('from', function(target) {
    const object = utils.flag(this, 'object');
    const multiplier = utils.flag(this, 'distanceMultiplier');
    const humanUnit = utils.flag(this, 'humanDistanceUnit');
    const expectedDistance = utils.flag(this, 'distance');
    const actualDistance = object.distanceTo(target);

    this.assert(
      actualDistance === expectedDistance * multiplier,
      `expected ${object} to be ${expectedDistance} ${humanUnit} from ${target}, but was ${actualDistance/multiplier}`,
      `expected ${object} to not be ${expectedDistance} ${humanUnit} from ${target}`
    )
  });
}
