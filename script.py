import boto3
import json

s3 = boto3.client('s3')

def lambda_handler(event, context):
    bucket_name = event['queryStringParameters']['bucket']
    key_object = event['queryStringParameters']['key']
    
    if bucket_name:
        try:
            response = s3.get_object(Bucket=bucket_name, Key=key_object)
            data = response['Body'].read().decode('utf-8')
            return {
                'statusCode': 200,
                'body': json.dumps(data)
            }
        except Exception as e:
            return {
                'statusCode': 404,
                'body': json.dumps(str(e))
            }
    else:
        try:
            response = s3.list_buckets()
            data = response['Buckets']
            return {
                'statusCode': 200,
                'body': json.dumps(data)
            }
        except Exception as e:
            return {
                'statusCode': 404,
                'body': json.dumps(str(e))
            }