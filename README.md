
# Backend Technical Task
## Rules
1. The task must be completed using your coding skills and debugging issues through web research. Reading documentation is allowed.
2. Generating code from ChatGPT is not allowed.
3. NodeJS/ExpressJS is preferred for implementation.
4. Submission: Zip the code and email it (Exclude secrets and node_modules).
5. Do not upload code to GitHub.
6. Any form of cheating will disqualify you from the interview process.

## Task

### APIs

1. Generate a 100M random numbers between 0 to 1 and save to a local db (SQL, MongoDB, or file-based DBs like SQLite are acceptable).
   
2. Create an Express server with the following APIs:

    - **GET /get-csv:** Reads data from the database and returns a CSV with columns S.No and value. S.No. is the index of the random value, and value is the value itself.

    - **POST /upload-csv:** Uploads the CSV downloaded in the above API to a local directory of the server. (Add Google Auth to this API.)

    - **GET /compute/single_thread:** Reads the data from the database and performs the following operation:
        1. `const INITIAL_FACTOR = 100000000;`
        2. Let `FACTOR = INITIAL_FACTOR;`
        3. For each item value in the database, reduce the `FACTOR` by dividing it with the value (i.e., `FACTOR = FACTOR/item`). The output is assigned to `FACTOR` itself.
        4. Now, multiply `FACTOR` by generating another random number.
        5. Perform step 3 again on the updated factor value.
        6. Return the final factor value along with the time computed in seconds to run this math.
        - Example:
        ```javascript
        // Imagine, you have data as x = [0.1, 0.2, 0.3…]
        for (let i=0; i<x.length; ++i) {
            FACTOR /= x[i];
            FACTOR *= Math.random();
            FACTOR /= x[i];
        }
        ```
    - **GET /compute/multi_thread:** Performs the same computation as above but distributes computation to utilize multiple CPU threads to reduce time. Returns the value along with the time taken.

## Running with Docker

To run the application using Docker, follow these steps:

1. Build the Docker image:
    ```bash
    docker build -t your-image-name .
    ```

2. Run the Docker container:
    ```bash
    docker run -p 5000:5000 -d your-image-name
    ```

3. The application should now be accessible at [http://localhost:5000](http://localhost:5000).
