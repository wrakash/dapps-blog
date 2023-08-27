/**
 * Represents a response object from an Amazon S3 operation.
 */
export interface S3Response {
  status: string; // Status of the operation, e.g., 'success', 'error', etc.
  message? : string; 
  data?: {
    url: string; // URL associated with the S3 object, e.g., a downloadable link.
    name: string; // Name of the S3 object, e.g., the file name.
  };
}
