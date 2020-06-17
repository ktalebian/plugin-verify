import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import { VerifyButtonContainer, VerifyBannerContainer } from './components/Verify/Verify.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'VerifyPlugin';

export default class VerifyPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);

    const options = { sortOrder: -1 };
    flex.AgentDesktopView
      .Panel1
      .Content
      .add(<VerifyBannerContainer key="verify-banner" />, options);

    // const Img = <img src="https://twilio-cms-prod.s3.amazonaws.com/images/verify-logo-red.original.png" />; 
  
    // flex.TaskCanvasTabs.Content.add(
    //   <Tab icon={Img} iconActive={Img} key="my-new-tab">
    //     <VerifyContainer/>
    //   </Tab>
    // );

    // flex.TaskCanvasHeader.Content.add(
    //   <VerifyContainer key="verify-component-2" />
    // )

    flex.TaskCanvasHeader.Content.add(
      <VerifyButtonContainer key="verify-button" />
    )
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
