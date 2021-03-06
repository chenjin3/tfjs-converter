/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as tfc from '@tensorflow/tfjs-core';

import {NamedTensorsMap} from '../../data/index';
import {Node} from '../index';

import {OpExecutor} from './types';
import {getParamValue} from './utils';

export let executeOp: OpExecutor = (node: Node, tensorMap: NamedTensorsMap):
                                       tfc.Tensor[] => {
  switch (node.op) {
    case 'max': {
      const axis = getParamValue('axis', node, tensorMap) as number[];
      const keepDims = getParamValue('keepDims', node, tensorMap) as boolean;
      return [tfc.max(
          getParamValue('x', node, tensorMap) as tfc.Tensor, axis, keepDims)];
    }
    case 'mean': {
      const axis = getParamValue('axis', node, tensorMap) as number[];
      const keepDims = getParamValue('keepDims', node, tensorMap) as boolean;
      return [tfc.mean(
          getParamValue('x', node, tensorMap) as tfc.Tensor, axis, keepDims)];
    }
    case 'min': {
      const axis = getParamValue('axis', node, tensorMap) as number[];
      const keepDims = getParamValue('keepDims', node, tensorMap) as boolean;
      return [tfc.min(
          getParamValue('x', node, tensorMap) as tfc.Tensor, axis, keepDims)];
    }
    case 'sum': {
      const axis = getParamValue('axis', node, tensorMap) as number[];
      const keepDims = getParamValue('keepDims', node, tensorMap) as boolean;
      return [tfc.sum(
          getParamValue('x', node, tensorMap) as tfc.Tensor, axis, keepDims)];
    }
    case 'argMax': {
      const axis = getParamValue('axis', node, tensorMap) as number;
      return [tfc.argMax(
          getParamValue('x', node, tensorMap) as tfc.Tensor, axis)];
    }
    case 'argMin': {
      const axis = getParamValue('axis', node, tensorMap) as number;
      return [tfc.argMin(
          getParamValue('x', node, tensorMap) as tfc.Tensor, axis)];
    }
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};

export const CATEGORY = 'reduction';
