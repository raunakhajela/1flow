# Deployment

1. Commit all the current changes in the app
    ```shell
    git add .
    git commit -m "your commit message"
    ```
2. Bump the version
   ```shell
   # for major version (must be used first when launch for production)
   yarn bump:major
   
   # for minor version (some api change, with backward compatibility)
   yarn bump:minor
   
   # for patch version (some minor change like typo or etc)
   yarn bump:patch
   ```
   
   If you are not familiar with SemVer (Semantic Versioning), watching [this **1-MINUTE** video](https://www.youtube.com/watch?v=wmw36DX7YEE) is highly recommended for you.

3. Tag version
   ```shell
   yarn tag
   ```
   
   > **Warning** If you get the error related to `jq`, then install it based on your OS

4. Git push with tags
   ```shell
   git push origin main --tags
  
   # use the following command to submit force push
   git push origin main --tags --force
   ```

> **Note** CI build will only start if you push the tag, to skip CI build, omit `--tags` option
