/**
 * Copyright 2016-2021 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see http://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const AbstractJDLOption = require('./abstract_jdl_option');
const BinaryOptions = require('./jhipster/binary_options');
const { join } = require('../utils/set_utils');

/**
 * For options like the DTO, the service, etc.
 */
class JDLBinaryOption extends AbstractJDLOption {
  constructor(args) {
    super(args);
    if (args.value == null) {
      throw new Error('A binary option must have a value.');
    }
    this.value = args.value;
  }

  getType() {
    return 'BINARY';
  }

  /**
   *
   * @returns このオプションがもつ情報を文字列にする
   */
  toString() {
    const entityNames = join(this.entityNames, ', ');
    entityNames.slice(1, entityNames.length - 1);

    let optionName = this.name;
    if (this.name === BinaryOptions.Options.PAGINATION) {
      // このオプションがページネーションの場合

      optionName = 'paginate';
    } else if (this.name === BinaryOptions.Options.SEARCH) {
      // このオプションがサーチの場合

      optionName = 'search';
    }
    // あれ？DTOがないなぁ

    const firstPart = `${optionName} ${entityNames} with ${this.value}`;
    if (this.excludedNames.size === 0) {
      // 除外する名称が設定されていない場合

      return firstPart;
    }
    // 除外する名称が設定されている場合

    const excludedNames = join(this.excludedNames, ', ');
    excludedNames.slice(1, this.excludedNames.length - 1);
    return `${firstPart} except ${excludedNames}`;
  }
}

module.exports = JDLBinaryOption;
