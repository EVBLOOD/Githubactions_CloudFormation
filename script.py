import boto3
import json
def lambda_handler(event, context):
  s3 = boto3.client('s3')
  if 'queryStringParameters' in event and event['queryStringParameters'] is not None and 'bucket' in event['queryStringParameters'] :
    bucket_name = event['queryStringParameters']['bucket']
    if 'key' in event['queryStringParameters'] :
      object_key = event['queryStringParameters']['key']
      try:
        response = s3.get_object(Bucket=bucket_name, Key=object_key)
        return {
          'statusCode': 200,
          'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': 'http://localhost:5173',
            'Access-Control-Allow-Methods': 'GET'
          },
          'body':  json.loads(json.dumps(str(response['Body'].read())))
        }
      except Exception as e:
        return {
            'statusCode': 404,
            'headers': {
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Origin': 'http://localhost:5173',
              'Access-Control-Allow-Methods': 'GET'
            },
            'body': json.dumps(str(e))
        }
    else :
      try:
        response = [object_key['Key'] for object_key in s3.list_objects_v2(Bucket=bucket_name)['Contents']]
        return {
            'statusCode': 200,
            'headers': {
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Origin': 'http://localhost:5173',
              'Access-Control-Allow-Methods': 'GET'
            },
            'body': json.loads(json.dumps(str(response)))
            }
      except Exception as e:
        return {
          'statusCode': 404,
          'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': 'http://localhost:5173',
            'Access-Control-Allow-Methods': 'GET'
          },
          'body': json.loads(json.dumps(str(e)))
        }
  else :
    try:
      response = s3.list_buckets()
      print(response)
      data = [bucket['Name'] for bucket in response['Buckets']]
      return {
        'statusCode': 200,
        'headers': {
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Origin': 'http://localhost:5173',
          'Access-Control-Allow-Methods': 'GET'
        },
        'body': json.loads(json.dumps(str(data)))
      }
    except Exception as e:
      return {
          'statusCode': 404,
          'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': 'http://localhost:5173',
            'Access-Control-Allow-Methods': 'GET'
          },
          'body': json.dumps(str(e))
      }
