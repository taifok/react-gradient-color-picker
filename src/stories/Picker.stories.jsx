import React, { useState } from 'react';
import { within, userEvent } from '@storybook/testing-library';
import { useStorybookState } from '@storybook/api';

import Picker from '../index';

export default {
  title: 'Example/Picker',
  component: Picker,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = (args) => {
    const [state, setState] = useState();
    return (
        <div style={{
            width: "400px"
        }}>
            <Picker value={state} onChange={setState}/>
        </div>
    )

};

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary = Template.bind({});