# AWS CloudFormation Infrastructure

This repository contains AWS CloudFormation templates for deploying various AWS resources. The provided CloudFormation template in this repository is focused on creating EC2 related resources, RDS database resources, and AWS ECR repositories, among other related resources.

## Resources Created

1. **VPC** - A virtual private cloud (VPC) with its own CIDR block, DNS support, and DNS hostnames.
2. **Internet Gateway** - To allow the resources in the VPC to communicate with the internet.
3. **Subnets** - Public subnets spread across two Availability Zones.
4. **Route Tables** - Separate route tables for public and private subnets.
5. **NAT Gateway** - To allow instances in the private subnet to initiate outbound traffic to the internet.
6. **Network Access Control Lists (NACLs)** - To provide stateless network traffic filtering.
7. **Security Groups** - Rules that act as a virtual firewall for associated EC2 instances, controlling both inbound and outbound traffic.
8. **RDS DBInstance** - Amazon RDS instance running MySQL.
9. **ECR Repository** - Amazon Elastic Container Registry for Docker images.
10. **CloudWatch Log Group** - For capturing logs from ECS.

## Parameters

- `DbUsername`: Database User Name.
- `DbPassword`: Database Password (Concealed in outputs).
- `VPCId`: VPC ID for related resources.
- `EcsServiceName`: Name of the ECS service.

## Outputs

- **RepositoryUrl**: URL of the ECR repository.
- **DBEndpoint**: Endpoint for the RDS instance.

## Usage

1. Clone this repository.
2. Navigate to the directory containing the CloudFormation template.
3. Use the AWS CLI or AWS Management Console to deploy the CloudFormation stack.

For AWS CLI:
```bash
aws cloudformation create-stack --stack-name MyStackName --template-body file://path_to_template.json --parameters ParameterKey=DbUsername,ParameterValue=mydbuser ParameterKey=DbPassword,ParameterValue=mypassword

