import { addParameters } from '@storybook/react';
import "../styles/index.scss";
import { configure } from '@storybook/react';


import { setConsoleOptions } from '@storybook/addon-console';

setConsoleOptions({
    panelExclude: [],
});
/** Вешаем дефолтный класс на body для применения цветовой схемы */
function loadStories () {
    document.body.className = 'theme-default';
}

configure(loadStories, module)

import {
    INITIAL_VIEWPORTS,
    // or MINIMAL_VIEWPORTS,
} from '@storybook/addon-viewport';

const customViewports = {
    kindleFire2: {
        name: 'Kindle Fire 2',
        styles: {
            width: '600px',
            height: '963px',
        },
    },
    kindleFireHD: {
        name: 'Kindle Fire HD',
        styles: {
            width: '533px',
            height: '801px',
        },
    },
};

addParameters({
    viewport: {
        viewports: {
            ...INITIAL_VIEWPORTS,
            // or ...MINIMAL_VIEWPORTS,
            ...customViewports,
        },
    },
});