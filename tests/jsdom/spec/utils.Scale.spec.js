import React from 'react';
import {
  scaleLinear,
  scaleTime,
  scaleOrdinal,
  scaleLog,
  scalePoint,
  scalePow,
} from 'd3-scale';
import { expect } from 'chai';

import {
  scaleTypeFromDataType,
  dataTypeFromScaleType,
  inferScaleType,
  initScale,
  isValidScale,
  invertPointScale,
  indexOfClosestNumberInList,
} from '../../../src/utils/Scale';

describe('Scale utils', () => {
  describe('scaleTypeFromDataType', () => {
    it('returns scale types given data types', () => {
      expect(scaleTypeFromDataType('number')).to.equal('linear');
      expect(scaleTypeFromDataType('time')).to.equal('time');
      expect(scaleTypeFromDataType('categorical')).to.equal('ordinal');
    });

    it('returns `ordinal` for unknown data types', () => {
      expect(scaleTypeFromDataType('chewbacca')).to.equal('ordinal');
    });
  });

  describe('dataTypeFromScaleType', () => {
    it('returns data types given scale types', () => {
      expect(dataTypeFromScaleType('linear')).to.equal('number');
      expect(dataTypeFromScaleType('log')).to.equal('number');
      expect(dataTypeFromScaleType('pow')).to.equal('number');
      expect(dataTypeFromScaleType('time')).to.equal('time');
      expect(dataTypeFromScaleType('ordinal')).to.equal('categorical');
    });

    it('returns `categorical` for unknown scale types', () => {
      expect(dataTypeFromScaleType('chewbacca')).to.equal('categorical');
    });
  });

  describe('inferScaleType', () => {
    it('infers the correct scale type, given a scale', () => {
      expect(inferScaleType(scaleLinear())).to.equal('linear');
      expect(inferScaleType(scaleTime())).to.equal('time');
      expect(inferScaleType(scaleOrdinal())).to.equal('ordinal');
      expect(inferScaleType(scaleLog())).to.equal('log');
      expect(inferScaleType(scalePow())).to.equal('pow');
    });
  });

  describe('initScale', () => {
    it('creates a scale of the correct type, given a scale type', () => {
      const linearScale = initScale('linear')
        .domain([0, 1])
        .range([100, 200]);
      expect(inferScaleType(linearScale)).to.equal('linear');
      expect(linearScale(0.5)).to.equal(150);

      expect(inferScaleType(initScale('time'))).to.equal('time');
      expect(inferScaleType(initScale('ordinal'))).to.equal('ordinal');
      expect(inferScaleType(initScale('log'))).to.equal('log');
      expect(inferScaleType(initScale('pow'))).to.equal('pow');
    });
  });

  describe('isValidScale', () => {
    it('returns true for all known scale types', () => {
      expect(isValidScale(scaleLinear())).to.equal(true);
      expect(isValidScale(scaleTime())).to.equal(true);
      expect(isValidScale(scaleOrdinal())).to.equal(true);
      expect(isValidScale(scaleLog())).to.equal(true);
      expect(isValidScale(scalePow())).to.equal(true);
    });
    it('returns false for non-scale things', () => {
      expect(isValidScale(9)).to.equal(false);
      expect(isValidScale(true)).to.equal(false);
      expect(isValidScale([4, 5])).to.equal(false);
      expect(isValidScale({ range: [0, 100], domain: [500, 1000] })).to.equal(
        false,
      );
    });
  });

  describe('indexOfClosestNumberInList', () => {
    it('returns index of closest to the number in the array', () => {
      expect(indexOfClosestNumberInList(1.5, [5, 4, 3, 2, 1])).to.equal(3);
      expect(indexOfClosestNumberInList(1.5, [1, 2, 3, 4, 5])).to.equal(0);
    });
  });

  describe('invertPointScale', () => {
    it('returns a valid value for given rangeValue', () => {
      const scale = scalePoint()
        .domain(['a', 'b', 'c', 'd', 'e'])
        .range([0, 100]);

      expect(invertPointScale(scale, 0)).to.equal('a');
      expect(invertPointScale(scale, 26)).to.equal('b');
      expect(invertPointScale(scale, 51)).to.equal('c');
      expect(invertPointScale(scale, 76)).to.equal('d');
      expect(invertPointScale(scale, 101)).to.equal('e');
    });
  });
});
