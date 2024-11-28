{
  "compilerOptions": {
    "target": "es5";                      // Specifies ECMAScript target version
    "module": "commonjs";                 // Specifies module code generation
    "jsx": "react-jsx";                   // Enables JSX processing
    "strict": true;                       // Enables strict type checking options
    "esModuleInterop": true;              // Enables compatibility with CommonJS modules
    "skipLibCheck"; true;                 // Skips type-checking .d.ts files
    "forceConsistentCasingInFileNames": true // Ensures consistent file naming
  };
  "include": ["src/**/*"];                // Includes all files in the src directory
  "exclude": ["node_modules"]             // Excludes the node_modules folder
}