type ActionError = {
  error?:
    | {
        code: "AUTH_ERROR";
        message: string;
      }
    | {
        code: "EXISTS_ERROR";
        key: string;
        message: string;
      }
    | {
        code: "INTERNAL_ERROR";
        message: string;
      }
    | {
      code: "VALIDATION_ERROR";
      fieldErrors: {
        [field: string]: string[];
      };
    };
}