/*
 * Wazuh app - React component for Logtest.
 * Copyright (C) 2015-2020 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Logtest } from '../logtest/logtest';
import './logtest.less';
import {
  EuiPage,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiBadge
} from '@elastic/eui';

export class LogtestFlyout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      docked: false,
      testing: false,
      logTypeSelect: 'log',
    };
  }

  componentWillUnmount() {  
    $('body').removeClass('euiBody--logtestIsOpen');
  }

  dockLogtestFlyout() {
    this.setState({ docked: !this.state.docked }, () => {
      if (this.state.docked) {
        $('body').addClass('euiBody--logtestIsOpen');
      } else {
        $('body').removeClass('euiBody--logtestIsOpen');
      }
    })
  }

  render() {
    const container = document.getElementById('kibana-body');
    return ReactDOM.createPortal(
      <EuiFlyout
        className="logtest-flyout"
        aria-labelledby="flyoutSmallTitle"
        hideCloseButton
        onClose={() => $('body').removeClass('euiBody--logtestIsOpen')}
      >
        <EuiFlyoutHeader
          hasBorder
          style={{ padding: 8 }}>
          <EuiFlexGroup>
            <EuiFlexItem grow={false} style={{ padding: '6px 0' }}>
              <EuiBadge color='#BD271E' iconType="clock">Test session started at 2020/02/07 12:56:32</EuiBadge>
            </EuiFlexItem>
            <EuiFlexItem />
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                size="s"
                onClick={() => this.dockLogtestFlyout()}
                iconType={this.state.docked && 'lockOpen' || 'lock'}>
                {this.state.docked && 'Undock Logtest' || 'Dock Logtest'}
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                size="s"
                onClick={() => this.props.switchLogtestFlyout()}
                iconType={'cross'}>
                Close
              </EuiButtonEmpty>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <div style={{ padding: 16 }}>
            <Logtest onFlyout={true}></Logtest>
          </div>
        </EuiFlyoutBody>
      </EuiFlyout>,
      container
    );
  }
}