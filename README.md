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




# Prep for StackGuadian
#### JSON:
    cdk synth --json --no-version-reporting > cloudformation/cf-template.json
    jq 'del(.Parameters.BootstrapVersion)' cloudformation/cf-template.json > cloudformation/cf-template-sg.json
    rm cloudformation/cf-template.json

#### YAML (Avoid): 
    cdk synth --no-version-reporting > cloudformation/cf-template.yaml

#### CONFIGURING TEMPLATE:
1. EDIT the change-set and apply-set, name it
2. Specify the cf-template-sg.json
3. For UI AI search this: "use the below snippet to create a React JSONSchema Form"
4. Remove unnecessary fields (like )
5. Save and publish revision

