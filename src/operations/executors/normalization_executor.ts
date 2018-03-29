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
import {GraphExecutor} from '../../executor';
import {Node} from '../index';

import {OpExecutor} from './types';
import {getParamValue} from './utils';

export let executeOp: OpExecutor = (node: Node, tensorMap: NamedTensorsMap,
                                    executor: GraphExecutor): tfc.Tensor[] => {
  switch (node.op) {
    case 'batchNormalization': {
      return [tfc.batchNormalization(
          getParamValue('x', node, tensorMap, executor) as tfc.Tensor,
          getParamValue('mean', node, tensorMap, executor) as tfc.Tensor,
          getParamValue('variance', node, tensorMap, executor) as tfc.Tensor,
          getParamValue('epislon', node, tensorMap, executor) as number,
          getParamValue('scale', node, tensorMap, executor) as tfc.Tensor,
          getParamValue('offset', node, tensorMap, executor) as tfc.Tensor)];
    }
    case 'localResponseNormalization': {
      return [tfc.localResponseNormalization(
          getParamValue('x', node, tensorMap, executor) as tfc.Tensor3D |
              tfc.Tensor4D,
          getParamValue('radius', node, tensorMap, executor) as number,
          getParamValue('bias', node, tensorMap, executor) as number,
          getParamValue('alpha', node, tensorMap, executor) as number,
          getParamValue('beta', node, tensorMap, executor) as number)];
    }
    case 'softmax': {
      return [tfc.softmax(
          getParamValue('x', node, tensorMap, executor) as tfc.Tensor)];
    }
    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};

export const CATEGORY = 'normalization';
