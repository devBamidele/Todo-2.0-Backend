import './pre-start'; // Must be the first import

import EnvVars from '@src/constants/EnvVars';
import server from './server';
import logger from './utils/logger';

// **** Run **** //

const SERVER_START_MSG = ('Server started on port: ' + 
    EnvVars.Port.toString());

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
