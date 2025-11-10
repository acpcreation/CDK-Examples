import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { version } from 'os';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Get the default VPC
    const vpc = ec2.Vpc.fromLookup(this, 'DefaultVpc', { 
      isDefault: true 
    });

    // Create a security group for the EC2 instance
    const securityGroup = new ec2.SecurityGroup(this, 'Ec2SecurityGroup', {
      vpc,
      description: 'Security group for EC2 instance',
      allowAllOutbound: true,
    });

    // Allow SSH access
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'Allow SSH access'
    );

    // Allow HTTP access
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'Allow HTTP access'
    );

    // Parameter for environment  
    const environmentParam = new cdk.CfnParameter(this, 'Environment', {
      type: 'String',
      default: 'dev',
      description: 'Deployment environment (dev, staging, prod)',
      allowedValues: ['dev', 'staging', 'prod'],
    });

    // Create the EC2 instance
    const ec2Instance = new ec2.Instance(this, 'MyEc2Instance', {
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux2(),
      securityGroup,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      // keyName: 'your-key-pair-name', // Uncomment and add your key pair name for SSH access
    });

    cdk.Tags.of(ec2Instance).add('Name', "CloudFormation-Deployed-"+environmentParam.valueAsString);

    // Add user data to install and start a web server
    ec2Instance.addUserData(
      'yum update -y',
      'yum install -y httpd',
      'systemctl start httpd',
      'systemctl enable httpd',
      'echo "<h1>Hello from CDK EC2 Instance!</h1>" > /var/www/html/index.html'
    );

    // Output the public IP address
    new cdk.CfnOutput(this, 'InstancePublicIP', {
      value: ec2Instance.instancePublicIp,
      description: 'Public IP address of the EC2 instance',
    });

    // // L1 and L2 construct of S3 Bucket
    // // L1
    // const level1Bucket = new CfnBucket(this, 'myFirstLevel1ConstructBucket',{
    //     versioningConfiguration: {
    //         status: 'Enabled'
    //     }
    // });

    // // L2
    // const level2Bucket = new Bucket (this, 'myFirstLevel2ConstructBucket',{
    //     bucketName: "s3-bucket-with-cdk-level-2-hsducybweuye2gwg62363676363",
    //     versioned: true
    // });
  }
}
