import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
/**
 * shared configuration
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "../../../.env") });

/**
 * Logging Configuration
 * - level: The minimum level of logs to output (debug, info, warn, error).
 * - fileMaxSize: The maximum size of log files before rotation (e.g., "10m" for 10 megabytes).
 */
export interface LoggingConfig {
  level: "debug" | "info" | "warn" | "error";
  fileMaxSize: string;
  fileMaxFiles: string;
}

/**
 * Backend Configuration
 * - port: The port number on which the backend server will listen.
 */
export interface BackendConfig {
  port: number;
}

/**
 * UI Configuration
 * - port: The port number on which the UI development server will run.
 * - apiBaseUrl: The base URL for API requests from the UI to the backend.
 *  This allows the UI to be configured to point to different backend instances (e.g., local development vs. production).
 */
export interface UIConfig {
  port: number;
  apiBaseUrl: string;
}
export interface ICoreConfig {
  logging: LoggingConfig;
  backend: BackendConfig;
  ui: UIConfig;
}

export const config: ICoreConfig = {
  logging: {
    level: (process.env.LOG_LEVEL as LoggingConfig["level"]) || "info",
    fileMaxSize: process.env.LOG_FILE_MAX_SIZE || "10m",
    fileMaxFiles: process.env.LOG_FILE_MAX_FILES || "14d",
  },
  backend: {
    port: Number(process.env.BACKEND_PORT) || 3000,
  },
  ui: {
    port: Number(process.env.UI_PORT) || 5173,
    apiBaseUrl: process.env.UI_API_BASE_URL || "http://localhost:3000",
  },
};
