import winston from 'winston';

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.prettyPrint(),
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf(({ level, message, timestamp }) => {
                    return `${timestamp} [${level}]: ${message}`;
                })
            )
        }),
        new winston.transports.File({ filename: 'Messages.log', level: "error" }),
    ]
});

process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Promise Rejection:', reason);
});

process.on('uncaughtException', (ex) => {
    logger.error('Uncaught Exception:', ex);
    process.exit(1);
});

export default logger;
