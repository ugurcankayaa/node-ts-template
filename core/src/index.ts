/**
 * @module application-core
 * @description shared library for configuration, logging, common interfaces.
 */

//logger
export { Logger } from "./logger/Logger.js";
export { ILogger } from "./logger/ILogger.js";

//default configuration
export { config } from "./config/default.js";
export type {
  ICoreConfig,
  LoggingConfig,
  BackendConfig,
  UIConfig,
} from "./config/default.js";

//module names
export { AppModule } from "./enums/Module.js";

//interfaces
