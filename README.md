# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template



# SET UP
1. npm install -g aws-cdk 
2. AWS CLI
3. npm install -g typescript
4. cdk init app --language typescript
5. cdk bootstrap


## Prep for SG
cdk synth > cloudformation/cf-template.json