export default function(chai, utils) {
  chai.Assertion.addMethod('within', function(distance) {
    utils.flag(this, 'distance', distance);
  });

  chai.Assertion.addProperty('inches', function() {
    utils.flag(this, 'multiplier', 1);
    utils.flag(this, 'unit', 'inches');
  });

  chai.Assertion.addProperty('feet', function() {
    utils.flag(this, 'multiplier', 12);
    utils.flag(this, 'unit', 'feet');
  });

  chai.Assertion.addMethod('locator', function(point) {
    const obj = utils.flag(this, 'object');
    const unit = utils.flag(this, 'unit');
    const multiplier = utils.flag(this, 'multiplier');
    const distance = obj.distanceTo(point);
    const maximum = utils.flag(this, 'distance');
    const assertion = new chai.Assertion(distance);
    assertion.assert(
      distance < maximum * multiplier,
      `expected ${obj} to be within ${maximum} ${unit} of ${point}`,
      `expected ${obj} to not be within ${maximum} ${unit} of ${point}`
    )
  });
}
