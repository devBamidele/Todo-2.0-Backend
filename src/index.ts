import { EnvVars } from './constants';
import './pre-start'; // Must be the first import

import server from './server';
import { logger } from './utils';

// **** Run **** //

const SERVER_START_MSG = ('Server started on port: ' + 
    EnvVars.Port.toString());

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
