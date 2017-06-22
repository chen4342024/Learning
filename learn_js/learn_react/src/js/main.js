import React from 'react';
import {render} from 'react-dom';

import styles from '../css/main.scss';//使用require导入css文件

let container = document.getElementById('root');

render(
    <h1 className={styles.root}>Hello, world!222333</h1>, container
);
