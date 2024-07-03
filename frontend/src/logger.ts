// import pino from 'pino';  

// const logger = pino(
//   {
//     level: process.env.PINO_LOG_LEVEL || 'info',
//     formatters: {
//       level: (label) => {
//         return { level: label.toUpperCase() };
//       },
//     },
//     transport: {
//       target: 'pino/file',
//       options: { destination: `/home/rmoliveira/coding/books/frontend/app.log` }, // 
//     },
//     timestamp: pino.stdTimeFunctions.isoTime,
//   },
// );

// export default logger;